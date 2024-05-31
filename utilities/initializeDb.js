const bcrypt = require('bcrypt');
const input = require('./input');
const RolesEnum = require('../models/enums/roles.enum');
const User = require('../models/users/user');
const Role = require('../models/users/role');
const Permission = require('../models/users/permission');
const { PermissionsEnum, HttpPermissionsEnum } = require('../models/enums/permissions.enum');

async function createAdminPermissions() {
    const permissions = [
        ...Object.keys(PermissionsEnum).map((permission) => {
            return new Permission({ description: "all", type: permission })
        }),
        ...Object.keys(HttpPermissionsEnum).map((permission) => {
            return new Permission({ description: "all", type: permission })
        }),
    ];

    Permission.insertMany(permissions).then((obj) => {
        console.log("Admin permissions created.");
    }).catch((exc) => {
        console.error("Admin permissions couldn't be created.", exc);
        throw "Admin permissions couldn't be created";
    });
}

async function createAdminRole() {
    const permissions = await Permission.find({ "description": "all" });
    const role = new Role({
        description: "ADMIN",
        status: true,
        permissions: permissions.map((permission) => permission._id),
    });

    role.save().then((obj) => {
        console.log("Role 'ADMIN' created.");
    }).catch((exc) => {
        // console.error("Role 'ADMIN' couldn't be created.");
        throw "Role 'ADMIN' couldn't be created";
    });
}

async function createAdminUser() {
    const salt = await bcrypt.genSalt(10);

    console.log("Create an admin user to manage the db.")
    const username = await input("username: ");
    const email = await input("email: ");
    const password = await input("password: ");
    const passwordHash = await bcrypt.hash(password, salt);

    const roleAdmin = await Role.findOne({ "description": "ADMIN" });
    const user = new User({
        username,
        email,
        password: passwordHash,
        roles: [roleAdmin]
    });

    user.save().then((obj) => {
        console.log("Admin created.")
    }).catch((exc) => {
        console.error("Admin couln't be created.");
        throw "Admin couln't be created";
    });
}

const initializeAdminIfNeeded = async () => {
    return new Promise(async (resolve, reject) => {
        const count = await User.find().populate("_roles").countDocuments({ "role.description": RolesEnum.ADMIN });
        console.log("Admin counter:", count, await User.find().populate("_roles"))
        if (count <= 0) {
            createAdminPermissions().then(async() => {
                return await createAdminPermissions();
            }).then(async() => {
                return await createAdminRole();
            }).then(async() => {
                return await createAdminUser().then(() => {
                    resolve(true);
                });
            }).catch((exc) => {
                console.error(exc);
                reject(exc);
            });
        } else {
            resolve(false);
        }
    });
};

module.exports = { initializeAdminIfNeeded };
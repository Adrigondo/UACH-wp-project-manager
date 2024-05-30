//seed.js
const RolesEnum = require('../models/enums/roles.enum');
var User = require('../models/users/user');
const Role = require('../models/users/role');
const input = require('./input');
const Permission = require('../models/users/permission');
const permission = require('../models/users/permission');
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

    Model.insertMany(permissions).then((obj) => {
        console.log("Admin permissions created.");
    }).catch((exc) => {
        console.error("Admin permissions couldn't be created.");
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
        console.error("Role 'ADMIN' couldn't be created.");
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
    return new Promise((resolve, reject) => {
        User.find().populate("_roleId").countDocuments({ "role.description": RolesEnum.ADMIN }, function (err, count) {
            if (count <= 0) {
                createAdminPermissions().then(() => {
                    return createAdminPermissions();
                }).then(() => {
                    return createAdminRole();
                }).then(() => {
                    return createAdminUser().then(() => {
                        resolve(true);
                    });
                }).catch((err) => {
                    reject(err);
                });
            } else {
                resolve(false);
            }
        });
    })
};

module.exports = { initializeAdminIfNeeded };
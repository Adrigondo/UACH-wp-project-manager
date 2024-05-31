const bcrypt = require('bcrypt');
const input = require('./input');
const RolesEnum = require('../models/enums/roles.enum');
const User = require('../models/users/user');
const Role = require('../models/users/role');
const Permission = require('../models/users/permission');
const { PermissionsEnum, HttpPermissionsEnum } = require('../models/enums/permissions.enum');

async function createAdminPermissions(permissionsEnum) {
    return new Promise(async (resolve, reject) => {
        const existentPermissions=await Permission
        const permissions = Object.keys(permissionsEnum).map((permission) => {
            return { description: "all", type: permission }
        });

        await Permission.insertMany(permissions).then((obj) => {
            console.log("Admin permissions created.");
            resolve();
        }).catch((exc) => {
            reject({
                msg: "Admin permissions couldn't be created",
                exc
            });
        });
    });
}

async function createAdminRole() {
    return new Promise(async (resolve, reject) => {
        const permissions = await Permission.find({ "description": "all" });
        const role = new Role({
            description: "ADMIN",
            status: true,
            permissions: permissions.map((permission) => permission._id),
        });

        role.save().then((obj) => {
            console.log("Role 'ADMIN' created.");
            resolve();
        }).catch((exc) => {
            reject({
                msg: "Role 'ADMIN' couldn't be created",
                exc
            });
        });

    });
}

function createAdminUser() {
    return new Promise(async (resolve, reject) => {

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
            resolve();
        }).catch((exc) => {
            reject({
                msg: "Admin couln't be created",
                exc
            });
        });
    });
}

const doesPermissionExist = async (permission) => {
    return new Promise(async (resolve, reject) => {
        const count = await Permission.find({
            _description: "all",
            _type: permission
        }).countDocuments().catch((exc) => reject({
            msg: "Couldn't count Permissions",
            exc
        }));

        if (count > 0) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
}
const doesRoleExist = async (role) => {
    return new Promise(async (resolve, reject) => {
        const count = await Role.find({
            _description: role,
        }).countDocuments().catch((exc) => reject({
            msg: "Couldn't count Permissions",
            exc
        }));

        if (count > 0) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
}
const doesAdminExist = async () => {
    return new Promise(async (resolve, reject) => {
        const count = await User.find().populate("_roles").countDocuments({ "role.description": RolesEnum.ADMIN }).catch((exc) => reject({
            msg: "Couldn't count Users",
            exc
        }));
        console.log("Admin counter:", count, await User.find().populate("_roles"))
        if (count <= 0) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
}
const initializeAdminIfNeeded = async () => {
    return new Promise(async (resolve, reject) => {
        const count = await User.find().populate("_roles").countDocuments({ "role.description": RolesEnum.ADMIN });
        console.log("Admin counter:", count, await User.find().populate("_roles"))
        if (count <= 0) {
            doesPermissionExist(PermissionsEnum.CREATE).then(async (exists) => {
                if (!exists)
                    await createAdminPermissions(PermissionsEnum);
            }).then(async () => {
                await doesPermissionExist(HttpPermissionsEnum.POST).then(async (exists) => {
                    if (!exists)
                        await createAdminPermissions(HttpPermissionsEnum);
                });
            }).then(async () => {
                await doesRoleExist(RolesEnum.ADMIN).then(async (exists) => {
                    if (!exists)
                        await createAdminRole(HttpPermissionsEnum);
                });
            }).then(async () => {
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
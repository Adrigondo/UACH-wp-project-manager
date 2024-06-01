const bcrypt = require('bcrypt');
const input = require('./input');
const RolesEnum = require('../models/enums/roles.enum');
const User = require('../models/users/user');
const Role = require('../models/users/role');
const Permission = require('../models/users/permission');
const { PermissionsEnum, HttpPermissionsEnum } = require('../models/enums/permissions.enum');

const getRoleByEnum = async (role) => {
    return await Role.findOne({
        _description: role,
    }).populate("_permissions");
}

const getAdminPermissionByEnum = async (permission) => {
    return await Permission.findOne({
        _description: "all",
        _type: permission
    });
}

function createAdminPermissions(permissionsEnum) {
    return new Promise(async (resolve, reject) => {
        const permissions = Object.keys(permissionsEnum).map((permission) => {
            return { _description: "all", _type: permission }
        });
        const permissionsToCreate = (await Promise.all(
            permissions.map(async (permission) => {
                const permissionExistent = await Permission.findOne(permission);
                return permissionExistent || permission;
            })
        )).filter((permission) => {
            return !permission.id
        });
        if (permissionsToCreate.length == 0) {
            console.log("Admin permissions already exists.");
            resolve(false);
            return;
        }
        await Permission.insertMany(permissionsToCreate).then((obj) => {
            console.log("Admin permissions created.");
            resolve(true);
        }).catch((exc) => {
            reject({
                msg: "Admin permissions couldn't be created",
                exc
            });
        });
    });
}

function updateRoleWithPermissions(role) {
    return new Promise(async (resolve, reject) => {
        let hasUpdatedPermissions = false;
        const isCreatePermissionInRole = role.permissions.find(
            (rolePermission) => {
                return rolePermission._description === "all" && rolePermission._type === PermissionsEnum.CREATE;
            }
        );
        if (!isCreatePermissionInRole) {
            const createPermission = await getAdminPermissionByEnum(PermissionsEnum.CREATE);
            role._permissions = [
                ...role._permissions,
                createPermission._id,
            ];
            hasUpdatedPermissions = true;
        }

        const isPostPermissionInRole = role.permissions.find(
            (rolePermission) => {
                return rolePermission._description === "all" && rolePermission._type === HttpPermissionsEnum.POST;
            }
        );
        if (!isPostPermissionInRole) {
            const postPermission = await getAdminPermissionByEnum(HttpPermissionsEnum.POST);
            role._permissions = [
                ...role._permissions,
                postPermission._id,
            ];
            hasUpdatedPermissions = true;
        }
        if (!hasUpdatedPermissions) {
            console.log("Role 'ADMIN' has already minimum necessary permissions");
            resolve(false);
            return;
        }

        role.save().then((obj) => {
            console.log("Role 'ADMIN' updated with permissions");
            resolve(true);
        }).catch((exc) => {
            reject({
                msg: "Role 'ADMIN' couldn't be updated with permissions",
                exc,
            });
        });
    })
}

function createAdminRole() {
    return new Promise(async (resolve, reject) => {
        const roleExistent = await getRoleByEnum(RolesEnum.ADMIN);

        if (roleExistent) {
            updateRoleWithPermissions(roleExistent).then((result)=>{
                resolve(result);
            }).catch((errorMessage)=>{
                reject(errorMessage);
            });
        } else {
            const createPermission = await getAdminPermissionByEnum(PermissionsEnum.CREATE);
            const postPermission = await getAdminPermissionByEnum(HttpPermissionsEnum.POST);
            
            const role = new Role({
                description: "ADMIN",
                status: true,
                permissions: [createPermission.id, postPermission.id],
            });
            role.save().then((obj) => {
                console.log("Role 'ADMIN' created with permissions");
                resolve();
            }).catch((exc) => {
                reject({
                    msg: "Role 'ADMIN' couldn't be created with permissions",
                    exc
                });
            });
        }
    });
}

function createAdminUser() {
    return new Promise(async (resolve, reject) => {
        const roleAdmin = await getRoleByEnum(RolesEnum.ADMIN);
        const adminExists = await User.findOne({ "_roles": roleAdmin.id });
        
        if (adminExists) {
            console.log("At least an Admin user already exists.")
            resolve(false);
            return;
        }
        const salt = await bcrypt.genSalt(10);

        console.log("Create an admin user to manage the db.")
        const username = await input("username: ");
        const email = await input("email: ");
        const password = await input("password: ");
        const passwordHash = await bcrypt.hash(password, salt);
        
        const user = new User({
            username,
            email,
            salt,
            password: passwordHash,
            roles: [roleAdmin]
        });

        user.save().then((obj) => {
            console.log("Admin created.")
            resolve(true);
        }).catch((exc) => {
            reject({
                msg: "Admin couln't be created",
                exc
            });
        });
    });
}

const initializeAdminIfNeeded = async () => {
    return new Promise(async (resolve, reject) => {
        await createAdminPermissions(PermissionsEnum).then(
            async () => await createAdminPermissions(HttpPermissionsEnum)
        ).then(
            async () => await createAdminRole()
        ).then(
            async () => {
                return await createAdminUser().then((result) => {
                    resolve(result);
                });
            }
        ).catch(
            (exc) => {
                console.error(exc);
                reject(exc);
            }
        );
    });
};

module.exports = { initializeAdminIfNeeded };
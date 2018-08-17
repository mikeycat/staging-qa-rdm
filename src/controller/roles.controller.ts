/* src/controller/roles.controller.ts */

import { getManager } from "typeorm";
import { logger } from "../logger";

import { Role } from "../entity";

export class RolesController {
    static getAll():Promise<Role[]> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(Role);
            repository.find({ relations: ["users"] }).then(roles => {
                resolve(roles);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static getById(id: number):Promise<Role> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(Role);
            repository.findOne(id, { relations: ["users"] }).then(role => {
                resolve(role);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static insert(role: Role):Promise<number> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(Role);
            const newRole = repository.create(role);
            repository.save(newRole).then(role => {
                resolve(role.id);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static update(role: Role):Promise<boolean> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(Role);
            repository.findOne(role.id).then(selectedRole => {
                if (role.name != null) {
                    selectedRole.name = role.name;
                }
                repository.save(selectedRole).then(() => {
                    resolve(true);
                }).catch(err => {
                    logger.error(err);
                    reject(err);
                });
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static delete(role: Role):Promise<boolean> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(Role);
            repository.findOne(role.id).then(selectedRole => {
                repository.remove(selectedRole).then(() => {
                    resolve(true);
                }).catch(err => {
                    logger.error(err);
                    reject(err);
                });
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
}
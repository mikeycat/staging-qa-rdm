/* src/controller/users.controller.ts */

import { getManager } from "typeorm";
import { logger } from "../logger";

import { User } from "../entity";

export class UsersController {
    static getAll():Promise<User[]> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(User);
            repository.find({ relations: ["roles"] }).then(users => {
                resolve(users);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static getById(id: number):Promise<User> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(User);
            repository.findOne(id, { relations: ["roles"] }).then(role => {
                resolve(role);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static getOrInsert(user: User):Promise<User> {
        return new Promise((resolve, reject) => {
            let params: User = {};
            if (user.id) { params.id = user.id; }
            if (user.uid) { params.uid = user.uid; }
            if (user.roles) { params.roles = user.roles; }

            const repository = getManager().getRepository(User);
            repository.findOne(params, { relations: ["roles"] }).then(user => {
                if (typeof user == "undefined") {
                    this.insert(user).then(newUser => {
                        console.log("1", newUser);
                        resolve(newUser);
                    }).catch(err => {
                        logger.error(err);
                        reject(err);
                    });
                }
                console.log("2", user);
                resolve(user);
            }).catch(err => {
                logger.error(err);
                reject(err);
            })
        })
    }
    static insert(user: User):Promise<User> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(User);
            const newUser = repository.create(user);
            repository.save(newUser).then(user => {
                resolve(user);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static update(user: User):Promise<boolean> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(User);
            repository.findOne(user.id).then(selectedUser => {
                if (user.uid != null) {
                    selectedUser.uid = user.uid;
                }
                if (user.roles != null) {
                    selectedUser.roles = user.roles;
                }
                repository.save(selectedUser).then(() => {
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
    static delete(user: User):Promise<boolean> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(User);
            repository.findOne(user.id).then(selectedUser => {
                repository.remove(selectedUser).then(() => {
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
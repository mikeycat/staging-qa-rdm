/* src/controller/notifications.controller.ts */

import { getManager } from "typeorm";
import { logger } from "../logger";

import { Notification, User, TestCase } from '../entity';

export class NotificationsController {
    static getAll():Promise<Notification[]> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(Notification);
            repository.find({ relations: ["user", "test_case"] }).then(Notifications => {
                resolve(Notifications);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static getAllByUser(user: User):Promise<Notification[]> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(Notification);
            repository.find({
                where: {
                    user: user
                },
                relations: ["user", "test_case"]
            }).then(Notifications => {
                resolve(Notifications);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static getAllByTestCase(test_case: TestCase):Promise<Notification[]> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(Notification);
            repository.find({
                where: {
                    test_case: test_case
                },
                relations: ["user", "test_case"]
            }).then(Notifications => {
                resolve(Notifications);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static getById(id: number):Promise<Notification> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(Notification);
            repository.findOne(id, { relations: ["user", "test_case"] }).then(Notification => {
                resolve(Notification);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static insert(notification: Notification):Promise<number> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(Notification);
            const newNotification = repository.create(notification);
            repository.save(newNotification).then(Notification => {
                resolve(Notification.id);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    static update(notification: Notification):Promise<boolean> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(Notification);
            repository.findOne(notification.id).then(selectedNotification => {
                if (notification.test_case != null) {
                    selectedNotification.test_case = notification.test_case;
                }
                if (notification.user != null) {
                    selectedNotification.user = notification.user;
                }
                repository.save(selectedNotification).then(() => {
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
    static delete(notification: Notification):Promise<boolean> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(Notification);
            repository.findOne(notification.id).then(selectedNotification => {
                repository.remove(selectedNotification).then(() => {
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
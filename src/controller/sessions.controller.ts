/* src/controller/sessions.controller.ts */

import { getManager } from "typeorm";
import { logger } from "../logger";
var secureRandom = require("secure-random");

import { Session } from '../entity';
import { resolve } from "path";

export class SessionsController {
    /**
     * Get All Sessions.
     *
     * @returns Array of Sessions.
     */
    static getAll():Promise<Session[]> {
        return new Promise((resolve, reject) => {
            const sessionsRepository = getManager().getRepository(Session);
            sessionsRepository.find().then(sessions => {
                resolve(sessions);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    /**
     * Get Session with given id value.
     *
     * @param id id value for Session wanted.
     * @returns Session
     */
    static getById(id: number):Promise<Session> {
        return new Promise((resolve, reject) => {
            const sessionsRepository = getManager().getRepository(Session);
            sessionsRepository.findOne(id).then(session => {
                resolve(session);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    /**
     * Get Session by given session value
     *
     * @param session session value for session wanted
     * @returns Session
     */
    static getBySession(session: string):Promise<Session> {
        return new Promise((resolve, reject) => {
            const repository = getManager().getRepository(Session);
            repository.findOne({session: session}, { relations: ["user", "user.roles"] }).then(session => {
                resolve(session);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    /**
     * Insert a Session
     *
     * @param result Session values to insert
     * @return id value of newly created session
     */
    static insert(session: Session):Promise<Session> {
        return new Promise((resolve, reject) => {
            const sessionsRepository = getManager().getRepository(Session);
            if (!session.session) {
                let arr: Array<any> = secureRandom.randomArray(10);
                session.session = arr.join('');
            }
            const newSession = sessionsRepository.create(session);
            sessionsRepository.save(newSession).then(session => {
                resolve(session);
            }).catch(err => {
                logger.error(err);
                reject(err);
            });
        });
    }
    /**
     * Update a Session
     *
     * @param session Session values to update
     * @return boolean of successful update of a session
     */
    static update(session: Session):Promise<boolean> {
        return new Promise((resolve, reject) => {
            const sessionsRepository = getManager().getRepository(Session);
            sessionsRepository.findOne(session.id).then(selectedSession => {
                if (session.session != null) {
                    selectedSession.session = session.session;
                }
                if (session.user != null) {
                    selectedSession.user = session.user;
                }
                sessionsRepository.save(selectedSession).then(() => {
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
    /**
     * Delete a Session
     *
     * @param session Session to delete
     * @return boolean of successful delete of a session
     */
    static delete(session: Session):Promise<boolean> {
        return new Promise((resolve, reject) => {
            const sessionsRepository = getManager().getRepository(Session);
            sessionsRepository.findOne(session.id).then(selectedSession => {
                sessionsRepository.remove(selectedSession).then(() => {
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
    /**
     * Get Current Session or Generate a Session
     *
     * @param session Session Cookie from a request
     * @return session value
     */
    static getOrGenerateSession(sessionCookie: any):Promise<Session> {
        return new Promise((resolve, reject) => {
            if (!sessionCookie.session) {       // If there is no current session value stored in cookies
                this.insert({}).then(session => {
                    resolve(session);
                }).catch(err => {
                    logger.error(err);
                    reject(err);
                });
            } else {                            // If there is a current session value stored
                this.getBySession(sessionCookie.session).then(session => {
                    resolve(session);
                }).catch(err => {
                    logger.error(err);
                    reject(err);
                });
            }
        });
    }
}
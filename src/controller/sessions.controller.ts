/* src/controller/sessions.controller.ts */

import { getManager } from "typeorm";
import { logger } from "../logger";

import { Session } from '../entity';

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
     * Insert a Session
     * 
     * @param result Session values to insert
     * @return id value of newly created session   
     */
    static insert(session: Session):Promise<number> {
        return new Promise((resolve, reject) => {
            const sessionsRepository = getManager().getRepository(Session);
            const newSession = sessionsRepository.create(session);
            sessionsRepository.save(newSession).then(session => {
                resolve(session[0].id);
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
                if (session.token != null) {
                    selectedSession.token = session.token;
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
}
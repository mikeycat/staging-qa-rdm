/* src/router/auth.router.ts */

import { Router, Request, Response } from 'express';
import { logger } from '../logger';

import { User, Role } from '../entity';
import { UsersController, RolesController, SessionsController } from '../controller';

// Assign router to the express.Router() instance
const router: Router = Router();

/* GET /api/auth */
/* Verify session cookie */
router.get('/', (req: any, res: Response) => {
    SessionsController.getOrGenerateSession(req.session).then(session => {
        req.session.session = session.session;
        res.send(session);
    }).catch(err => {
        logger.error(err);
        res.sendStatus(500);
    });
});

/* GET /api/login */
/* Assign user to session cookie */
router.post('/login', (req: any, res: Response) => {
    SessionsController.getOrGenerateSession(req.session).then(session => {
        req.session.session = session.session;
        UsersController.getOrInsert(req.body).then(user => {
            session.user = user;
            SessionsController.update(session).then(result => {
                res.send(result);
            }).catch(err => {
                logger.error(err);
                res.sendStatus(500);
            });
        }).catch(err => {
            logger.error(err);
            res.sendStatus(500);
        });
    }).catch(err => {
        logger.error(err);
        res.sendStatus(500);
    });
});


// Export the express.Router() instance to be used by server.ts
export const AuthRouter: Router = router;
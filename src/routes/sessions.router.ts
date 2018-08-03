/* src/routes/sessions.router.ts */

import { Router, Request, Response } from 'express';
import { logger } from "../logger";

import { Session } from '../entity';
import { SessionsController } from '../controller';


// Assign router to the express.Router() instance
const router: Router = Router();

/* GET /api/sessions */
/* Get All Sessions */
router.get('/', (req: Request, res: Response) => {
    SessionsController.getAll().then((sessions: Session[]) => {
        // respond with all sessions
        res.status(200).json(sessions);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* GET /api/sessions/:id */
/* Get Session with ID */
router.get('/:id', (req: Request, res: Response) => {
    SessionsController.getById(parseInt(req.params.id)).then((session: Session) => {
        // resond with session
        res.status(200).json(session);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/sessions/insert */
/* Insert Session */
router.post('/insert', (req: Request, res: Response) => {
    SessionsController.insert(req.body).then((id: number) => {
        // resond with id of new session
        res.status(200).json({id: id});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/sessions/update */
/* Update Session */
router.post('/update', (req: Request, res: Response) => {
    SessionsController.update(req.body).then((success: boolean) => {
        // respond with successful update
        res.status(200).json({success: success});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/sessions/delete */
/* Delete Session */
router.post('/delete', (req: Request, res: Response) => {
    SessionsController.delete(req.body).then((success: boolean) => {
        // respond with successful delete
        res.status(200).json({success: success});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

// Export the express.Router() instance to be used by server.ts
export const SessionsRouter: Router = router;
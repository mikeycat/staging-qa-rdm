/* src/routes/notifications.router.ts */

import { Router, Request, Response } from 'express';
import { logger } from "../logger";

import { Notification } from '../entity';
import { NotificationsController } from '../controller';


// Assign router to the express.Router() instance
const router: Router = Router();

/* GET /api/notifications */
/* Get All Notifications */
router.get('/', (req: Request, res: Response) => {
    NotificationsController.getAll().then((notifications: Notification[]) => {
        // respond with all notifications
        res.status(200).json(notifications);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* GET /api/notifications/:id */
/* Get Notification with ID */
router.get('/:id', (req: Request, res: Response) => {
    NotificationsController.getById(parseInt(req.params.id)).then((notification: Notification) => {
        // resond with notification
        res.status(200).json(notification);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/notifications/insert */
/* Insert Notification */
router.post('/insert', (req: Request, res: Response) => {

    console.log(req.body);
    NotificationsController.insert(req.body).then((id: number) => {
        // resond with notification id
        res.status(200).json({id: id});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/notifications/update */
/* Update Notification */
router.post('/update', (req: Request, res: Response) => {
    NotificationsController.update(req.body).then((success: boolean) => {
        // respond with successful update
        res.status(200).json({success: success});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/notifications/delete */
/* Delete Notification */
router.post('/delete', (req: Request, res: Response) => {
    NotificationsController.delete(req.body).then((success: boolean) => {
        // respond with successful delete
        res.status(200).json({success: success});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

// Export the express.Router() instance to be used by server.ts
export const NotificationsRouter: Router = router;
/* src/routes/operating-systems.router.ts */

import { Router, Request, Response } from 'express';
import { logger } from "../logger";

import { OperatingSystem } from '../entity';
import { OperatingSystemsController } from '../controller';


// Assign router to the express.Router() instance
const router: Router = Router();

/* GET /api/operating-systems */
/* Get All Operating Systems */
router.get('/', (req: Request, res: Response) => {
    OperatingSystemsController.getAll().then((operatingSystems: OperatingSystem[]) => {
        // respond with all operating systems
        res.status(200).json(operatingSystems);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* GET /api/operating-systems/:id */
/* Get Operating System with ID */
router.get('/:id', (req: Request, res: Response) => {
    OperatingSystemsController.getById(parseInt(req.params.id)).then((operatingSystem: OperatingSystem) => {
        // resond with operating system
        res.status(200).json(operatingSystem);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/operating-systems/insert */
/* Insert Operating System */
router.post('/insert', (req: Request, res: Response) => {
    OperatingSystemsController.insert(req.body).then((id: number) => {
        // resond with id of new operating system
        res.status(200).json({id: id});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/operating-systems/update */
/* Update Operating System */
router.post('/update', (req: Request, res: Response) => {
    OperatingSystemsController.update(req.body).then((success: boolean) => {
        // respond with successful update
        res.status(200).json({success: success});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/operating-systems/delete */
/* Delete Operating System */
router.post('/delete', (req: Request, res: Response) => {
    OperatingSystemsController.delete(req.body).then((success: boolean) => {
        // respond with successful delete
        res.status(200).json({success: success});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

// Export the express.Router() instance to be used by server.ts
export const OperatingSystemsRouter: Router = router;
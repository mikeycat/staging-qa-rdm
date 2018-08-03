/* src/routes/active-tests.router.ts */

import { Router, Request, Response } from 'express';
import { logger } from "../logger";

import { Platform } from '../entity';
import { PlatformsController } from '../controller';


// Assign router to the express.Router() instance
const router: Router = Router();

/* GET /api/platforms */
/* Get All Platforms */
router.get('/', (req: Request, res: Response) => {
    PlatformsController.getAll().then((platforms: Platform[]) => {
        res.status(200).json(platforms);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* GET /api/platforms/:id */
/* Get Platform with ID */
router.get('/:id', (req: Request, res: Response) => {
    PlatformsController.getById(parseInt(req.params.id)).then((platform: Platform) => {
        // resond with active test
        res.status(200).json(platform);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/platforms/insert */
/* Insert Platform */
router.post('/insert', (req: Request, res: Response) => {
    PlatformsController.insert(req.body).then((id: number) => {
        // resond with new platform id
        res.status(200).json({id: id});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/platforms/update */
/* Update Platform */
router.post('/update', (req: Request, res: Response) => {
    PlatformsController.update(req.body).then((success: boolean) => {
        // respond with successful update
        res.status(200).json({success: success});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/platforms/delete */
/* Delete Platform */
router.post('/delete', (req: Request, res: Response) => {
    PlatformsController.delete(req.body).then((success: boolean) => {
        // respond with successful delete
        res.status(200).json({success: success});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

// Export the express.Router() instance to be used by server.ts
export const PlatformsRouter: Router = router;

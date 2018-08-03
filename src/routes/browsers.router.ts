/* src/routes/browsers.router.ts */

import { Router, Request, Response } from 'express';
import { logger } from "../logger";

import { Browser } from '../entity';
import { BrowsersController } from '../controller';


// Assign router to the express.Router() instance
const router: Router = Router();

/* GET /api/browsers */
/* Get All Browsers */
router.get('/', (req: Request, res: Response) => {
    BrowsersController.getAll().then((browsers: Browser[]) => {
        // respond with all browsers
        res.status(200).json(browsers);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* GET /api/browsers/:id */
/* Get Browser with ID */
router.get('/:id', (req: Request, res: Response) => {
    BrowsersController.getById(parseInt(req.params.id)).then((browser: Browser) => {
        // resond with browser
        res.status(200).json(browser);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/browsers/insert */
/* Insert Browser */
router.post('/insert', (req: Request, res: Response) => {

    console.log(req.body);
    BrowsersController.insert(req.body).then((id: number) => {
        // resond with all active tests
        res.status(200).json({id: id});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/browsers/update */
/* Update Browser */
router.post('/update', (req: Request, res: Response) => {
    BrowsersController.update(req.body).then((success: boolean) => {
        // respond with successful update
        res.status(200).json({success: success});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/browsers/delete */
/* Delete Browser */
router.post('/delete', (req: Request, res: Response) => {
    BrowsersController.delete(req.body).then((success: boolean) => {
        // respond with successful delete
        res.status(200).json({success: success});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

// Export the express.Router() instance to be used by server.ts
export const BrowsersRouter: Router = router;
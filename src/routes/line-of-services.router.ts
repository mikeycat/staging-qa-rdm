/* src/routes/line-of-service.router.ts */

import { Router, Request, Response } from 'express';
import { logger } from "../logger";

import { LineOfService } from '../entity';
import { LineOfServicesController } from '../controller';


// Assign router to the express.Router() instance
const router: Router = Router();

/* GET /api/lines-of-service */
/* Get All Lines of Service */
router.get('/', (req: Request, res: Response) => {
    LineOfServicesController.getAll().then((linesOfService: LineOfService[]) => {
        res.status(200).json(linesOfService);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* GET /api/lines-of-service/:id */
/* Get Line of Service with ID */
router.get('/:id', (req: Request, res: Response) => {
    LineOfServicesController.getById(parseInt(req.params.id)).then((lineOfService: LineOfService) => {
        // resond with line of service
        res.status(200).json(lineOfService);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/lines-of-service/insert */
/* Insert Line of Service */
router.post('/insert', (req: Request, res: Response) => {
    LineOfServicesController.insert(req.body).then((id: number) => {
        // resond with new line of service id
        res.status(200).json({id: id});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/lines-of-service/update */
/* Update Line of Service */
router.post('/update', (req: Request, res: Response) => {
    LineOfServicesController.update(req.body).then((success: boolean) => {
        // respond with successful update
        res.status(200).json({success: success});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/lines-of-service/delete */
/* Delete Line of Service */
router.post('/delete', (req: Request, res: Response) => {
    LineOfServicesController.delete(req.body).then((success: boolean) => {
        // respond with successful delete
        res.status(200).json({success: success});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

// Export the express.Router() instance to be used by server.ts
export const LinesOfServiceRouter: Router = router;

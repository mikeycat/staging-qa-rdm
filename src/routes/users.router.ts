/* src/routes/users.router.ts */

import { Router, Request, Response } from 'express';
import { logger } from "../logger";

import { User } from '../entity';
import { UsersController } from '../controller';


// Assign router to the express.Router() instance
const router: Router = Router();

/* GET /api/users */
/* Get All Users */
router.get('/', (req: Request, res: Response) => {
    UsersController.getAll().then((users: User[]) => {
        // respond with all users
        res.status(200).json(users);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* GET /api/users/:id */
/* Get User with ID */
router.get('/:id', (req: Request, res: Response) => {
    UsersController.getById(
        parseInt(req.params.id)
    ).then((user: User) => {
        // resond with user
        res.status(200).json(user);
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/users/insert */
/* Insert User */
router.post('/insert', (req: Request, res: Response) => {
    UsersController.insert(req.body).then((user: User) => {
        // resond with id of new user
        res.status(200).json({id: user.id});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/users/update */
/* Update User */
router.post('/update', (req: Request, res: Response) => {
    UsersController.update(req.body).then((success: boolean) => {
        // respond with successful update
        res.status(200).json({success: success});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

/* POST /api/users/delete */
/* Delete User */
router.post('/delete', (req: Request, res: Response) => {
    UsersController.delete(req.body).then((success: boolean) => {
        // respond with successful delete
        res.status(200).json({success: success});
    }).catch(err => {
        // log error and return with status 500 to the client
        logger.error(err);
        res.sendStatus(500);
    });
});

// Export the express.Router() instance to be used by server.ts
export const UsersRouter: Router = router;
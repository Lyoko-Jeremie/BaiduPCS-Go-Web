import express from "express";
import {NextFunction, Request, Response} from "express-serve-static-core";

const router = express.Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
    res.redirect('/pages');
});

export default router;

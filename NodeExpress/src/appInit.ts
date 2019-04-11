import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import logger from "morgan";
import enableWs from "express-ws";

const expressApp = express();
export const expressWsApp = enableWs(expressApp);
const app = expressWsApp.app;

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cookieParser());

// https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '50m'}));

app.use(express.static(path.join(__dirname, 'public')));


export default app;

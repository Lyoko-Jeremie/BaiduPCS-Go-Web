import express from "express";
import WebSocket from "ws";
import {expressWsApp} from "../appInit";
import {pick} from "lodash";
import {CallProcess} from "../controller/processController";

const showData: string[] = [
    'binaryType',
    'bufferedAmount',
    'extensions',
    'protocol',
    'readyState',
    'url',
];

const router = express.Router();

expressWsApp.applyTo(router);

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a api');
});

//https://stackoverflow.com/questions/50662333/how-to-implement-express-ws-route

router.ws('/test', (ws, req, next) => {
    console.log("====================================");
    console.log('ws connecting...');
    console.log(pick(ws, showData));
    console.log("++++++++++++++++++++++++++++++++++++");
    ws.on("ping", function (data: WebSocket.Data) {
        console.log("====================================");
        console.log("pinging.");
        console.log(data);
        console.log(pick(this, showData));
        console.log("++++++++++++++++++++++++++++++++++++");
    });
    ws.on("message", function (data: WebSocket.Data) {
        console.log("====================================");
        console.log("message:");
        console.log(data);
        console.log(pick(this, showData));
        this.send(data);
        console.log("++++++++++++++++++++++++++++++++++++");
    });
    ws.on("close", function (code: number, reason: string) {
        console.log("====================================");
        console.log("close.");
        console.log(pick(this, showData));
        console.log("++++++++++++++++++++++++++++++++++++");
    });
});

router.ws('/', (ws, req, next) => {
    console.log("====================================");
    console.log('ws connecting...');
    console.log(pick(ws, showData));
    console.log("++++++++++++++++++++++++++++++++++++");
    ws.on("ping", function (data: WebSocket.Data) {
        console.log("====================================");
        console.log("pinging.");
        console.log(data);
        console.log(pick(this, showData));
        console.log("++++++++++++++++++++++++++++++++++++");
    });
    ws.on("message", function (data: WebSocket.Data) {
        console.log("====================================");
        console.log("message:");
        console.log(data);
        console.log(pick(this, showData));
        this.send(data);
        console.log("++++++++++++++++++++++++++++++++++++");
    });

    const cp = new CallProcess();
    cp.stdout.subscribe(
        value => {
            console.log(value);
            ws.send(value);
        },
        error => {
            console.log(error);
        },
        () => {
            console.log('close');
            if (ws.readyState !== WebSocket.CLOSED)
                ws.close();
        });

    ws.on("close", function (code: number, reason: string) {
        console.log("====================================");
        console.log("close.");
        console.log(pick(this, showData));
        console.log("++++++++++++++++++++++++++++++++++++");

        cp.stop();
    });

});

export default router;

import { version as appVersion, name as appName } from '../package.json';
import * as express from 'express';
import bodyParser = require('body-parser');                

console.log(`${appName} v${appVersion} (${process.env.NODE_ENV})`);
console.log('------------------------');

const config = require('config');
const PORT = process.env.PORT || config.get('port');

const app = express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))  
  .get('/', (_: express.Request, res: express.Response) => {
    res.json({ up: true, name: appName, version: appVersion, environment: process.env.NODE_ENV });
  })
  .get('/webhook', (req: express.Request, res: express.Response) => {
    let VERIFY_TOKEN = "VERY_SECRET_TOKEN";
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
  })
  .post('/webhook', (req: express.Request, res: express.Response) => {
    let body = req.body;
    if (body.object === 'page') {
        body.entry.forEach(function(entry: any) {
          //Your code goes here
        });
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
  })  
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

process.on('SIGINT', () => {
  console.log('Bye-bye...');
  process.exit(1);
});

process.on('warning', warning => {
  console.warn(warning.name); // Print the warning name
  console.warn(warning.message); // Print the warning message
  console.warn(warning.stack); // Print the stack trace
});

export { app };

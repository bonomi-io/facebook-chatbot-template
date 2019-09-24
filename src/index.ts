require('dotenv').config();
import { version as appVersion, name as appName } from '../package.json';
import * as express from 'express';
import bodyParser = require('body-parser');
import MyLogger from './lib/logger/logging';
import { ChatbotController } from './lib/controllers/ChatbotController';

console.log(`${appName} v${appVersion} (${process.env.NODE_ENV})`);
console.log('------------------------');

const PORT = process.env.PORT || 5001;
const logger = new MyLogger(__filename);

//https://wit.ai/eshton/jsconfbp2019
const app = express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .get('/', ChatbotController.home)
  .get('/webhook', ChatbotController.handleVerification)
  .post('/webhook', ChatbotController.handleMessage)
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

process.on('SIGINT', () => {
  logger.info('Bye-bye...');
  process.exit(1);
});

process.on('warning', warning => {
  console.warn(warning.name); // Print the warning name
  console.warn(warning.message); // Print the warning message
  console.warn(warning.stack); // Print the stack trace
});

export { app };

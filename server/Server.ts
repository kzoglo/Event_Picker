import { Server } from "http";
import { Connection } from "mongoose";
import * as listeners from "../tools/listeners";
import * as middlewares from "../tools/middlewares";
import { MongooseDB } from "../tools/mongoose";

import express, { Express } from 'express';
import { IConfigApp } from './types';

export class AppServer {
  private configApp: IConfigApp;
  app: Express;
  mongooseConnection: Connection;
  server: Server;

  constructor(configApp: IConfigApp) {
    this.configApp = configApp;
    this.app = express();
  }

  /**
   * - (1) Start Listeners
   * - (2) Start Middlewares
   * - (3) initMongooose
   * - (4) StartApp
   */

  initListeners(): AppServer {
    listeners.mongooseConnected();
    return this;
  }

  initMiddlewares(): AppServer {
    middlewares.setParsers(this.app);
    middlewares.setHeaders(this.app);
    middlewares.router.setRoutes(this.app);
    middlewares.errorHandling(this.app);   
    return this;
  }

  async initMongoose(): Promise<AppServer> {
    this.mongooseConnection = await new MongooseDB().connect();
    return this;
  }

  async startApp(): Promise<AppServer> {
    this.server = this.app.listen(this.configApp.port, () => {
      console.log(`Application has started. Listenning on port ${this.configApp.port}`);
    });
    return this;
  }
}

import { Server } from "http";
import { AppServer } from './Server';
import config from 'config';
import { IConfigApp } from '../config';
const { port } = config.get<IConfigApp>('app');

export async function ServerFactory(): Promise<AppServer> {
  const configApp = {
    port,
  }
  const appServer = new AppServer(configApp);
  appServer.initListeners();
  appServer.initMiddlewares();
  await appServer.initMongoose();
  await appServer.startApp();
  return appServer;
}

export async function AppFactory(): Promise<Server> {
  const appServer = await ServerFactory();
  return appServer.server;
}

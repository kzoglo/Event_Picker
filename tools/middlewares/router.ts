import { Express } from 'express';
import event from '../../modules/Event/routes';

export function setRoutes(app: Express): void {
  app.use(event);
}

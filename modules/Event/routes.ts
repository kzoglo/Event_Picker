import { Router } from 'express';
import { ControllerEventFactory as controller } from './ControllerEvent';
import { validatorEventFactory as validator } from './valid';

const router = Router();

router.post('/event/add', validator().generic.postEvent, controller().postEvent);

export default router;

import { Server } from 'http';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import request from 'supertest';
chai.use(chaiAsPromised);
const expect = chai.expect;


import EventModel from '../../../modules/Event/model';
import { AppFactory } from '../../../server/App';
import { IEventCreate } from '../../../modules/Event/types';
import { Times } from '../../../tools/validator/enums';
import ValidatorEvent from '../../../modules/Event/valid';

let server: Server;

describe('E2E - Event', () => {
  before(async () => {
    server = await AppFactory();
  });

  after(() => {
    server.close();
  });

  afterEach(async () => {
    await EventModel.deleteMany({});
  });

  describe('POST /event/add', () => {
    const URI = '/event/add';

    it('201 - successful', async () => {
      const event: IEventCreate = { 
        firstName: 'Kamil',
        lastName: 'Żogło',
        email: 'kmilzglo@gmail.com',
        eventDate: Date.now() + Times.DAY,
      };
      
      await request(server)
        .post(URI)
        .send(event)
        .set('Content-Type', 'application/json')
        .expect(201)
        .then(res => {
          expect(res.body).to.have.key('message');
        });
    });

    it('422 - firstName specific validation error (min length)', async () => {
      const event: IEventCreate = {
        firstName: `${'k'.repeat(ValidatorEvent.validationValues.firstName.min - 1)}`,
        lastName: 'Żogło',
        email: 'kmilzglo@gmail.com',
        eventDate: Date.now(),
      };

      await request(server)
        .post(URI)
        .send(event)
        .set('Content-Type', 'application/json')
        .expect(422)
        .then(res => {
          expect(res.body).to.have.key('message');
        });
    });

    it('422 - firstName specific validation error (max length)', async () => {
      const event: IEventCreate = { 
        firstName: `${'k'.repeat(ValidatorEvent.validationValues.firstName.max + 1)}`,
        lastName: 'Żogło',
        email: 'kmilzglo@gmail.com',
        eventDate: Date.now(),
      };

      await request(server)
        .post(URI)
        .send(event)
        .set('Content-Type', 'application/json')
        .expect(422)
        .then(res => {
          expect(res.body).to.have.key('message');
        });
    });

    it('422 - firstName specific validation error (illegal chars)', async () => {
      const event: IEventCreate = { 
        firstName: 'Ka432mil$',
        lastName: 'Żogło',
        email: 'kmilzglo@gmail.com',
        eventDate: Date.now(),
      };

      await request(server)
        .post(URI)
        .send(event)
        .set('Content-Type', 'application/json')
        .expect(422)
        .then(res => {
          expect(res.body).to.have.key('message');
        });
    });

    it('422 - firstName specific validation error (property absent)', async () => {
      const event = {
        lastName: 'Żogło',
        email: 'kmilzglo@gmail.com',
        eventDate: Date.now(),
      };

      await request(server)
        .post(URI)
        .send(event)
        .set('Content-Type', 'application/json')
        .expect(422)
        .then(res => {
          expect(res.body).to.have.key('message');
        });
    });

    it('422 - lastName specific validation error (min length)', async () => {
      const event: IEventCreate = {
        firstName: 'Kamil',
        lastName: `${'k'.repeat(ValidatorEvent.validationValues.lastName.min - 1)}`,
        email: 'kmilzglo@gmail.com',
        eventDate: Date.now(),
      };

      await request(server)
        .post(URI)
        .send(event)
        .set('Content-Type', 'application/json')
        .expect(422)
        .then(res => {
          expect(res.body).to.have.key('message');
        });
    });

    it('422 - lastName specific validation error (max length)', async () => {
      const event: IEventCreate = { 
        firstName: 'Kamil',
        lastName: `${'k'.repeat(ValidatorEvent.validationValues.lastName.max + 1)}`,
        email: 'kmilzglo@gmail.com',
        eventDate: Date.now(),
      };

      await request(server)
        .post(URI)
        .send(event)
        .set('Content-Type', 'application/json')
        .expect(422)
        .then(res => {
          expect(res.body).to.have.key('message');
        });
    });

    it('422 - lastName specific validation error (illegal chars)', async () => {
      const event: IEventCreate = { 
        firstName: 'Kamil',
        lastName: 'Żo1g---ł$o',
        email: 'kmilzglo@gmail.com',
        eventDate: Date.now(),
      };

      await request(server)
        .post(URI)
        .send(event)
        .set('Content-Type', 'application/json')
        .expect(422)
        .then(res => {
          expect(res.body).to.have.key('message');
        });
    });

    it('422 - lastName specific validation error (property absent)', async () => {
      const event = {
        firstName: 'Kamil',
        email: 'kmilzglo@gmail.com',
        eventDate: Date.now(),
      };

      await request(server)
        .post(URI)
        .send(event)
        .set('Content-Type', 'application/json')
        .expect(422)
        .then(res => {
          expect(res.body).to.have.key('message');
        });
    });

    it('422 - email specific validation error (min length)', async () => {
      const event: IEventCreate = {
        firstName: 'Kamil',
        lastName: 'Żogło',
        email: `${'k'.repeat(ValidatorEvent.validationValues.email.min - 1)}`,
        eventDate: Date.now(),
      };

      await request(server)
        .post(URI)
        .send(event)
        .set('Content-Type', 'application/json')
        .expect(422)
        .then(res => {
          expect(res.body).to.have.key('message');
        });
    });

    it('422 - email specific validation error (max length)', async () => {
      const event: IEventCreate = { 
        firstName: 'Kamil',
        lastName: 'Żogło',
        email: `${'k'.repeat(ValidatorEvent.validationValues.email.max + 1)}`,
        eventDate: Date.now(),
      };

      await request(server)
        .post(URI)
        .send(event)
        .set('Content-Type', 'application/json')
        .expect(422)
        .then(res => {
          expect(res.body).to.have.key('message');
        });
    });

    it('422 - email specific validation error (wrong email format)', async () => {
      const event: IEventCreate = { 
        firstName: 'Kamil',
        lastName: 'Żogło',
        email: 'kamilkamil',
        eventDate: Date.now(),
      };

      await request(server)
        .post(URI)
        .send(event)
        .set('Content-Type', 'application/json')
        .expect(422)
        .then(res => {
          expect(res.body).to.have.key('message');
        });
    });

    it('422 - email specific validation error (property absent)', async () => {
      const event = {
        firstName: 'Kamil',
        lastName: 'Żogło',
        eventDate: Date.now(),
      };

      await request(server)
        .post(URI)
        .send(event)
        .set('Content-Type', 'application/json')
        .expect(422)
        .then(res => {
          expect(res.body).to.have.key('message');
        });
    });

    it('422 - eventDate generic validation error (integer)', async () => {
      const event = {
        firstName: 'Kamil',
        lastName: 'Żogło',
        email: 'zoglo@wp.pl',
        eventDate: 'kamilkamil',
      };

      await request(server)
        .post(URI)
        .send(event)
        .set('Content-Type', 'application/json')
        .expect(422)
        .then(res => {
          expect(res.body).to.have.key('message');
        });
    });

    it('422 - eventDate specific validation error (min value)', async () => {
      const event: IEventCreate = { 
        firstName: 'Kamil',
        lastName: 'Żogło',
        email: 'zoglo@wp.pl',
        eventDate: 1,
      };

      await request(server)
        .post(URI)
        .send(event)
        .set('Content-Type', 'application/json')
        .expect(422)
        .then(res => {
          expect(res.body).to.have.key('message');
        });
    });

    it('422 - eventDate specific validation error (max value)', async () => {
      const event: IEventCreate = { 
        firstName: 'Kamil',
        lastName: 'Żogło',
        email: 'kamil@onet.com',
        eventDate: Date.now() + Times.YEAR * 100,
      };

      await request(server)
        .post(URI)
        .send(event)
        .set('Content-Type', 'application/json')
        .expect(422)
        .then(res => {
          expect(res.body).to.have.key('message');
        });
    });

    it('422 - eventDate specific validation error (property absent)', async () => {
      const event = {
        firstName: 'Kamil',
        lastName: 'Żogło',
        email: 'kamil@onet.com',
      };

      await request(server)
        .post(URI)
        .send(event)
        .set('Content-Type', 'application/json')
        .expect(422)
        .then(res => {
          expect(res.body).to.have.key('message');
        });
    });
  });
});

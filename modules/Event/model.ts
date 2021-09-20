import { Schema, model } from 'mongoose';
import { IEventDocument } from './types';
import ValidatorEvent from './valid';

const eventSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    min: ValidatorEvent.validationValues.firstName.min,
    max: ValidatorEvent.validationValues.firstName.max,
    match: ValidatorEvent.validationValues.firstName.regex,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    min: ValidatorEvent.validationValues.lastName.min,
    max: ValidatorEvent.validationValues.lastName.max,
    match: ValidatorEvent.validationValues.lastName.regex,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    min: ValidatorEvent.validationValues.email.min,
    max: ValidatorEvent.validationValues.email.max,
    match: ValidatorEvent.validationValues.email.regex,
  },
  eventDate: {
    type: Date,
    required: true,
    min: ValidatorEvent.validationValues.eventDate.min,
    max: ValidatorEvent.validationValues.eventDate.max,
  },
});

const EventModel = model<IEventDocument>('Event', eventSchema);

export default EventModel;

import mongoose, { ConnectOptions } from 'mongoose';
import config from 'config';
import { IConfigDb } from '../../config';
const { host, name, port } = config.get<IConfigDb>('db');
mongoose.Promise = global.Promise;

const mongooseTransformer = {
  virtuals: false,
  transform(doc, ret) {
    delete ret.__v;
  },
};

export class MongooseDB {
  private config: ConnectOptions;
  private uri: string;
  
  constructor() {
    this.config = {
      socketTimeoutMS: 60000,
      connectTimeoutMS: 60000,
    };
    switch(process.env.NODE_ENV) {
      case 'test': 
        this.uri = `mongodb://${host}:${port}/${name}`;
        break;
      default:
        this.uri = `mongodb://${host}:${port}/${name}`;
    }
  }

  async connect(): Promise<mongoose.Connection> {
    mongoose.set('runValidators', true);
    mongoose.set('toJSON', mongooseTransformer);
    mongoose.set('toObject', mongooseTransformer);
    const connection = await mongoose
      .connect(this.uri, this.config)
      .then(mongoose => mongoose.connection);
    return connection;
  }
}

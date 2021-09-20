import mongoose from 'mongoose';

export function mongooseConnected(): void {
  const db = mongoose.connection;
  db.once('open', () => {
    console.log("Listener: Mongo", "successfully connected to mongo database");
  });
}

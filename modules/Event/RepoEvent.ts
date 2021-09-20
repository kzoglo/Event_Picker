import * as types from './types'; 
import EventModel from './model';
class RepoEvent implements types.IRepoEvent {
  async create(body: types.IEventCreate): Promise<void> {
    const event = new EventModel(body);
    await event.save();
  }

}

export default RepoEvent;

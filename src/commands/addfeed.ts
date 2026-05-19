import { type User, type Feed } from 'src/lib/db/schema';
import { createFeed } from 'src/lib/db/queries/feeds';
import { createFeedFollow } from 'src/lib/db/queries/feed_follows';
import { UserCommandHandler } from 'src/lib/middlewares/middleware-logged-in';

export const handlerAddFeed: UserCommandHandler = async (cmdName, user, ...args) => {
  if (!args || args.length !== 2) {
    throw Error('addfeed handler expects 2 args, name and url');
  }
  
  const name = args[0]
  const url = args[1]
  
  const feed = await createFeed(name, url, user.id)
  if (!feed) {
    throw new Error(`Failed to create feed`);
  }
  await createFeedFollow(feed.id, user.id)
}

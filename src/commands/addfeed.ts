import { readConfig } from 'src/config';
import { CommandHandler } from './index';
import { getUserByName } from 'src/lib/db/queries/users';
import { type User, type Feed } from 'src/lib/db/schema';
import { createFeed } from 'src/lib/db/queries/feeds';
import { createFeedFollow } from 'src/lib/db/queries/feed_follows';

export const handlerAddFeed: CommandHandler = async (cmdName, ...args) => {
  if (!args || args.length !== 2) {
    throw Error('addfeed handler expects 2 args, name and url');
  }

  const config = readConfig();
  const user = await getUserByName(config.currentUserName)

  if (!user) {
    throw Error('current user not found');
  }
  
  const name = args[0]
  const url = args[1]
  
  const feed = await createFeed(name, url, user.id)
  if (!feed) {
    throw new Error(`Failed to create feed`);
  }
  await createFeedFollow(feed.id, user.id)
}

function printFeed(feed: Feed, user: User) {
  console.log(feed, user)
}

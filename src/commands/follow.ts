import { createFeedFollow } from 'src/lib/db/queries/feed_follows';
import { CommandHandler } from './index';
import { readConfig } from 'src/config';
import { getUserByName } from 'src/lib/db/queries/users';
import { getFeedByUrl } from 'src/lib/db/queries/feeds';

export const handlerFollow: CommandHandler = async (cmdName, ...args) => {
  if (!args || args.length === 0) {
    throw Error('follow handler expects a single argument, the url');
  }
  const config = readConfig()
  const user = await getUserByName(config.currentUserName)

  if (!user) {
    throw new Error(`User ${config.currentUserName} not found`);
  }

  const feedUrl = args[0]
  const feed = await getFeedByUrl(feedUrl)
  if (!feed) {
    throw new Error(`Feed not found: ${feedUrl}`);
  }

  const newFeedFollow = await createFeedFollow(feed.id, user.id)

  console.log(newFeedFollow.feedName);
  console.log(newFeedFollow.userName);
}

import { getFeedFollowsForUser } from 'src/lib/db/queries/feed_follows';
import { CommandHandler } from './index';
import { readConfig } from 'src/config';
import { getUserByName } from 'src/lib/db/queries/users';

export const handlerFollowing: CommandHandler = async (cmdName, ...args) => {
  const config = readConfig()
  const user = await getUserByName(config.currentUserName)

  const feedFollows = await getFeedFollowsForUser(user.id);
  if (feedFollows.length === 0) {
    console.log(`No feed follows found for this user.`);
    return;
  }

  for (const follow of feedFollows) {
    console.log(follow.feedName)
  }
}

export function printFeedFollow(username: string, feedname: string) {
  console.log(`* User:          ${username}`);
  console.log(`* Feed:          ${feedname}`);
}
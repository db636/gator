import { createFeedFollow } from 'src/lib/db/queries/feed_follows';
import { getFeedByUrl } from 'src/lib/db/queries/feeds';
import { UserCommandHandler } from 'src/lib/middlewares/middleware-logged-in';

export const handlerFollow: UserCommandHandler = async (cmdName, user, ...args) => {
  if (!args || args.length === 0) {
    throw Error('follow handler expects a single argument, the url');
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

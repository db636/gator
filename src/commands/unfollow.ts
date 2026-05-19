import { deleteFeedFollow } from 'src/lib/db/queries/feed_follows';
import { getFeedByUrl } from 'src/lib/db/queries/feeds';
import { UserCommandHandler } from 'src/lib/middlewares/middleware-logged-in';

export const handlerUnfollow: UserCommandHandler = async (cmdName, user, ...args) => {
  if (!args || args.length === 0) {
    throw Error('unfollow handler expects a single argument, the url');
  }

  const feedUrl = args[0]
  const feed = await getFeedByUrl(feedUrl)
  if (!feed) {
    throw new Error(`Feed not found: ${feedUrl}`);
  }

  try {
    await deleteFeedFollow(feed.id, user.id);
    
    console.log(`Feed ${feedUrl} is unfollowed`);
  } catch(e) {
    console.log('Error happened during feed unfollowing.');
  }
}

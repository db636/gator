import { CommandHandler } from './index';
import { getFeeds } from 'src/lib/db/queries/feeds';

export const handlerFeeds: CommandHandler = async () => {
  const data = await getFeeds()
  console.log(data)
}

import { CommandHandler } from './index';
import { fetchFeed } from 'src/lib/db/rss';

export const handlerAgg: CommandHandler = async (cmdName, ...args) => {
  const data = await fetchFeed("https://www.wagslane.dev/index.xml")
  console.log(data);
}

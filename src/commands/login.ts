import { setUser } from 'src/config';
import { CommandHandler } from './index';
import { getUserByName } from 'src/lib/db/queries/users';

export const handlerLogin: CommandHandler = async (cmdName, ...args) => {
  if (!args || args.length === 0) {
    throw Error('login handler expects a single argument, the username');
  }

  const userName = args[0]

  const userExists = await getUserByName(userName)

  if (!userExists) {
    throw Error('User doesnt exist');
  }

  setUser(userName);
  console.log('User ' + userName + ' has been set.');
}

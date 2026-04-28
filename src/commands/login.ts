import { setUser } from 'src/config';
import {CommandHandler} from './index';

export const handlerLogin: CommandHandler = (cmdName, ...args) => {
  if (!args || args.length === 0) {
    throw Error('login handler expects a single argument, the username');
  }

  setUser(args[0]);
  console.log('User ' + args[0] + ' has been set.');
}

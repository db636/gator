import { setUser } from 'src/config';
import { CommandHandler } from './index';
import { createUser, getUserByName } from 'src/lib/db/queries/users';

export const handlerRegister: CommandHandler = async (cmdName, ...args) => {
  if (!args || args.length === 0) {
    throw Error('register handler expects a single argument, the username');
  }
  
  const userName = args[0]
  
  const userExists = await getUserByName(userName)
  if (userExists) {
    throw Error(`User with name ${userName} already exists.`);
  }

  const newUser = await createUser(args[0]);


  setUser(newUser.name);

  console.log('User ' + args[0] + ' was created.');
  console.log(newUser);
}

import { readConfig, setUser } from 'src/config';
import { CommandHandler } from './index';
import { getUsers } from 'src/lib/db/queries/users';

export const handlerUsers: CommandHandler = async (cmdName, ...args) => {
  const users = await getUsers()
  const config = readConfig()

  for(const u of users) {
    console.log(`* ${u.name}${u.name === config.currentUserName ? " (current)" : ""}`)
  }
}

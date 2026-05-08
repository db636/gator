import { CommandHandler } from './index';
import { resetUsersTable } from 'src/lib/db/queries/users';

export const handlerReset: CommandHandler = async () => {
  await resetUsersTable()
  console.log('User table was truncated.');
}

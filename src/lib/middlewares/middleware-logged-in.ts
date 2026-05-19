import { CommandHandler } from 'src/commands';
import { User } from '../db/schema';
import { readConfig } from 'src/config';
import { getUserByName } from '../db/queries/users';

export type UserCommandHandler = (
  cmdName: string,
  user: User,
  ...args: string[]
) => Promise<void>;
export type MiddlewareLoggedIn = (handler: UserCommandHandler) => CommandHandler;

export const middlewareLoggedIn: MiddlewareLoggedIn = (handler) => {
  return async (cmdName: string, ...args: string[]) => {
    const config = readConfig()
    const user = await getUserByName(config.currentUserName)
  
    if (!user) {
      throw new Error(`User ${config.currentUserName} not found`);
    }

    return await handler(cmdName, user, ...args)
  }
}
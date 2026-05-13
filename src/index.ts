import { CommandsRegistry, runCommand } from './commands';
import { handlerLogin } from './commands/login';
import { handlerRegister } from './commands/register';
import { argv } from 'node:process';
import { handlerReset } from './commands/reset';
import { handlerUsers } from './commands/users';
import { handlerAgg } from './commands/agg';
import { handlerAddFeed } from './commands/addfeed';

async function main() {
  const registry: CommandsRegistry = {
    login: handlerLogin,
    register: handlerRegister,
    reset: handlerReset,
    users: handlerUsers,
    agg: handlerAgg,
    addfeed: handlerAddFeed
  }

  const [, , ...args] = argv;

  if (!args.length) {
    console.log('Argument required');
    process.exit(1);
  }

  const [cmdName, ...rest] = args;

  await runCommand(registry, cmdName, ...rest);
  process.exit(0);
}

await main();
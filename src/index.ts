import { CommandsRegistry, runCommand } from './commands';
import { handlerLogin } from './commands/login';
import { handlerRegister } from './commands/register';
import { argv } from 'node:process';
import { handlerReset } from './commands/reset';

async function main() {
  const registry: CommandsRegistry = {
    login: handlerLogin,
    register: handlerRegister,
    reset: handlerReset
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
import { CommandsRegistry, runCommand } from './commands';
import { handlerLogin } from './commands/login';
import { setUser, readConfig } from "./config";
import { argv, exit } from 'node:process';

function main() {
  const registry: CommandsRegistry = {
    login: handlerLogin
  }

  const [, , ...args] = argv;

  if (!args.length) {
    console.log('Argument required');
    exit(1);
  }

  const [cmdName, ...rest] = args;

  runCommand(registry, cmdName, ...rest);
}

main();
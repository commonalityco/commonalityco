#!/usr/bin/env node
import { Command } from 'commander';
import { publish } from './commands/publish.js';
import { login } from './commands/login.js';
import { logout } from './commands/logout.js';
import { link } from './commands/link.js';

const program = new Command();

program
	.name('commonality')
	.description('A toolchain for your monorepo')
	.version('1.0.0');

program.addCommand(publish);
program.addCommand(link);
program.addCommand(login);
program.addCommand(logout);

program.parse();

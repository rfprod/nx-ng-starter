/**
 * This example commands.js shows you how to
 * create various custom commands and overwrite
 * existing commands.
 *
 * For more comprehensive examples of custom
 * commands please read more here:
 * https://on.cypress.io/custom-commands
 */

import { customCommands } from './config/commands.config';

const commandNames = Object.keys(customCommands) as (keyof typeof customCommands)[];
for (const commandName of commandNames) {
  Cypress.Commands.add(commandName, customCommands[commandName]);
}

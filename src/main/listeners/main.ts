/* eslint-disable no-case-declarations */
import { Client } from 'discord.js';
import { makeShowFeaturesController } from '../factories';
import { musicListeners } from './music';

export default (client: Client): void => {
  const botPrefix = 'k.';

  client.on('ready', () => {
    console.log('Connected to discord with success');
  });

  client.on('messageCreate', async message => {
    if (!message.guild) return;

    if (!message.content.startsWith(botPrefix)) return;

    // eslint-disable-next-line no-unused-vars
    const [prefix, data] = message.content.split(botPrefix);
    const [commandKey, ...commandValue] = data.split(' ');
    const command = commandKey.trim();

    await musicListeners({
      client,
      command,
      commandValue: commandValue.join(' '),
      message,
    });

    if (command === 'help') {
      const featuresList = makeShowFeaturesController().handle();
      message.reply(featuresList);
    }
  });
};

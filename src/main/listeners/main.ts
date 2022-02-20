import { Client } from 'discord.js';

export default (client: Client): void => {
  const botPrefix = '!k';
  console.log('listener loaded');

  client.on('ready', () => {
    console.log('Connected to discord with success');
  });

  client.on('messageCreate', message => {
    if (message.content.startsWith(botPrefix)) {
      // eslint-disable-next-line no-unused-vars
      const [prefix, commandKey, commandValue] =
        message.content.split(botPrefix);
      const command = commandKey.trim();

      if (command === 'help') {
        message.reply('Hey');
      }
    }
  });
};

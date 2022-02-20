/* eslint-disable no-case-declarations */
import { Client } from 'discord.js';
import {
  makePlayMusicController,
  makeShowFeaturesController,
  makeStopMusicController,
} from '../factories';

export default (client: Client): void => {
  const botPrefix = 'k.';
  const playMusicController = makePlayMusicController();
  const stopMusicController = makeStopMusicController();

  client.on('ready', () => {
    console.log('Connected to discord with success');
  });

  client.on('messageCreate', async message => {
    if (!message.guild) return;

    if (!message.content.startsWith(botPrefix)) return;

    // eslint-disable-next-line no-unused-vars
    const [prefix, data] = message.content.split(botPrefix);
    const [commandKey, commandValue] = data.split(' ');
    const command = commandKey.trim();

    switch (command) {
      case 'help':
        const featuresList = await makeShowFeaturesController().handle();
        message.reply(featuresList);
        break;

      case 'play':
        playMusicController.handle({
          audioUrl: commandValue,
          message,
        });
        break;
      case 'stop':
        stopMusicController.handle();
        break;
      default:
        message.reply(
          `Comando não encontrado use **${botPrefix}help** para ver a lista de comandos disponíveis`,
        );
        break;
    }
  });
};

/* eslint-disable no-case-declarations */
import { Client, Message } from 'discord.js';
import {
  makePlayMusicController,
  makeShowFeaturesController,
  makeLeaveVoiceChannelController,
  makePauseMusicController,
  makeResumeMusicController,
  makeStopMusicController,
  makeNextMusicController,
} from '../factories';

type MusicListenersProps = {
  client: Client;
  command: string;
  commandValue: string;
  message: Message;
};

export const musicListeners = async ({
  command,
  commandValue,
  message,
}: MusicListenersProps) => {
  switch (command) {
    case 'help':
      const featuresList = makeShowFeaturesController().handle();
      message.reply(featuresList);
      break;

    case 'play':
      await makePlayMusicController().handle({
        source: commandValue,
        message,
      });
      break;
    case 'pause':
      makePauseMusicController().handle();
      break;
    case 'resume':
      makeResumeMusicController().handle();
      break;
    case 'leave':
      makeLeaveVoiceChannelController().handle();
      break;
    case 'stop':
      makeStopMusicController().handle();
      break;
    case 'next':
      makeNextMusicController().handle();
      break;
  }
};

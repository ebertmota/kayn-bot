import { StopMusicController } from '@/application/controllers';
import { makeAudioHandler } from '../..';

export const makeStopMusicController = (): StopMusicController => {
  return new StopMusicController(makeAudioHandler());
};

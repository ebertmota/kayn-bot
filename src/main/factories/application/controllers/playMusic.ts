import { PlayMusicController } from '@/application/controllers';
import { makeAudioHandler } from '../..';

export const makePlayMusicController = (): PlayMusicController => {
  return new PlayMusicController(makeAudioHandler());
};

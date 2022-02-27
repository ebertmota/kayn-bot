import { NextMusicController } from '@/application/controllers';
import { makeAudioHandler } from '../..';

export const makeNextMusicController = (): NextMusicController => {
  return new NextMusicController(makeAudioHandler());
};

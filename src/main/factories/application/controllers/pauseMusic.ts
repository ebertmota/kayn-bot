import { PauseMusicController } from '@/application/controllers';
import { makeAudioHandler } from '../..';

export const makePauseMusicController = (): PauseMusicController => {
  return new PauseMusicController(makeAudioHandler());
};

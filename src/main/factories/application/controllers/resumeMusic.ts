import { ResumeMusicController } from '@/application/controllers';
import { makeAudioHandler } from '../..';

export const makeResumeMusicController = (): ResumeMusicController => {
  return new ResumeMusicController(makeAudioHandler());
};

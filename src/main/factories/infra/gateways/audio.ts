import { AudioHandler } from '@/infra/gateways';

export const makeAudioHandler = (): AudioHandler => {
  return AudioHandler.getInstance();
};

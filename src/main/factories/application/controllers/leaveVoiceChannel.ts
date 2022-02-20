import { LeaveVoiceChannelController } from '@/application/controllers';
import { makeAudioHandler } from '../..';

export const makeLeaveVoiceChannelController =
  (): LeaveVoiceChannelController => {
    return new LeaveVoiceChannelController(makeAudioHandler());
  };

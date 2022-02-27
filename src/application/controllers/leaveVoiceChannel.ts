import { Leave } from '@/domain/contracts';
import { Controller } from '../protocols';

export class LeaveVoiceChannelController implements Controller {
  constructor(private readonly audio: Leave) {}

  handle(): void {
    this.audio.leave();
  }
}

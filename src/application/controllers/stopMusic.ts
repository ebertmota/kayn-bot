import { JoinChannel, Stop } from '@/domain/contracts';
import { Controller } from '../protocols';

export class StopMusicController implements Controller {
  constructor(private readonly audio: JoinChannel & Stop) {}

  async handle(): Promise<void> {
    await this.audio.stop();
  }
}

import { Stop } from '@/domain/contracts';
import { Controller } from '../protocols';

export class StopMusicController implements Controller {
  constructor(private readonly audio: Stop) {}

  handle(): void {
    this.audio.stop();
  }
}

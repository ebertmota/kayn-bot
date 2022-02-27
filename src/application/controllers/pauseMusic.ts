import { Pause } from '@/domain/contracts';
import { Controller } from '../protocols';

export class PauseMusicController implements Controller {
  constructor(private readonly audio: Pause) {}

  handle(): void {
    this.audio.pause();
  }
}

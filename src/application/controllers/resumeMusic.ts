import { Resume } from '@/domain/contracts';
import { Controller } from '../protocols';

export class ResumeMusicController implements Controller {
  constructor(private readonly audio: Resume) {}

  handle(): void {
    this.audio.resume();
  }
}

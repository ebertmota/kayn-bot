import { Next } from '@/domain/contracts';
import { Controller } from '../protocols';

export class NextMusicController implements Controller {
  constructor(private readonly audio: Next) {}

  handle(): void {
    this.audio.next();
  }
}

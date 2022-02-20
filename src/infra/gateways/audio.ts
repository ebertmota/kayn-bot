import {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  VoiceConnection,
} from '@discordjs/voice';
import ytdl from 'ytdl-core';

import { JoinChannel, Play, Leave } from '@/domain/contracts';

export class AudioHandler implements JoinChannel, Play, Leave {
  private static instance?: AudioHandler;
  private connection: VoiceConnection | null;

  constructor() {
    this.connection = null;
  }

  static getInstance(): AudioHandler {
    if (!AudioHandler.instance) {
      AudioHandler.instance = new AudioHandler();
    }

    return AudioHandler.instance;
  }

  async join({ channelId, guild }: JoinChannel.Input) {
    const canProceedWithConnection = guild;

    if (canProceedWithConnection) {
      this.connection = joinVoiceChannel({
        channelId,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
      });
    } else {
      throw new Error('Channel connection fails');
    }
  }

  async play({ audioUrl, channelId, guild }: Play.Input) {
    const isDisconnected = this.connection?.state.status === 'disconnected';
    if (!this.connection || isDisconnected) {
      console.log('Join');
      this.join({
        channelId,
        guild,
      });
    }

    const stream = ytdl(audioUrl, {
      filter: 'audioonly',
    });
    const player = createAudioPlayer();
    const resource = createAudioResource(stream);

    player.play(resource);

    this.connection?.subscribe(player);
  }

  async leave(): Promise<void> {
    if (this.connection) {
      this.connection.disconnect();
    }
  }
}

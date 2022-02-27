import {
  AudioPlayer,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  VoiceConnection,
} from '@discordjs/voice';
import ytdl from 'ytdl-core';

import {
  JoinChannel,
  Play,
  Leave,
  Pause,
  Resume,
  Stop,
  Next,
  ListQueueSongs,
} from '@/domain/contracts';

type AudioHandlerMethods = JoinChannel &
  Play &
  Leave &
  Pause &
  Resume &
  Stop &
  Next &
  ListQueueSongs;

export class AudioHandler implements AudioHandlerMethods {
  private static instance?: AudioHandler;
  private connection: VoiceConnection | null;
  private player: AudioPlayer;
  private queue: string[] = [];

  constructor() {
    this.connection = null;
    this.player = createAudioPlayer({
      debug: true,
    });

    this.player.addListener('stateChange', (oldState, newState) => {
      if (oldState.status === 'playing' && newState.status === 'idle') {
        if (this.queue.length) {
          this.playMusic(this.queue[0]);
        }
      }
    });
  }

  static getInstance(): AudioHandler {
    if (!AudioHandler.instance) {
      AudioHandler.instance = new AudioHandler();
    }

    return AudioHandler.instance;
  }

  join({ channelId, guild }: JoinChannel.Input) {
    const canProceedWithConnection = guild;

    if (canProceedWithConnection) {
      this.connection = joinVoiceChannel({
        channelId,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
      });
      this.connection.subscribe(this.player);
    } else {
      throw new Error('Channel connection fails');
    }
  }

  playMusic(source: string) {
    const stream = ytdl(source, {
      filter: 'audioonly',
    });
    const resource = createAudioResource(stream);
    this.player.play(resource);
    this.queue.shift();
  }

  play({ source, channelId, guild }: Play.Input): void {
    const isDisconnected = this.connection?.state.status === 'disconnected';
    if (!this.connection || isDisconnected) {
      this.join({
        channelId,
        guild,
      });
    }

    console.log('added to queue');

    this.queue.push(source);

    const playerStatus = this.player.state.status;
    if (playerStatus !== 'playing') {
      this.playMusic(source);
    }
  }

  listQueueSongs(): string {
    return this.queue.toString();
  }

  leave(): void {
    if (this.connection) {
      this.connection.disconnect();
    }
  }

  pause(): void {
    this.player.pause();
  }

  stop(): void {
    this.queue = [];
    this.player.stop();
  }

  resume(): void {
    this.player.unpause();
  }

  next(): void {
    if (this.queue.length) {
      this.player.stop();
    }
  }
}

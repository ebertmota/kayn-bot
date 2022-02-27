import {
  AudioPlayer,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  VoiceConnection,
} from '@discordjs/voice';
import ytdl from 'ytdl-core';
import YouTube from 'discord-youtube-api';

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
import { env } from '@/main/config/env';

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
  private youtube: YouTube;
  private queue: string[] = [];

  constructor(private readonly googleApiKey: string) {
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

    this.youtube = new YouTube(this.googleApiKey);
  }

  static getInstance(): AudioHandler {
    if (!AudioHandler.instance) {
      AudioHandler.instance = new AudioHandler(env.google.apiKey);
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

  async play({ source, channelId, guild, type }: Play.Input): Promise<void> {
    const isDisconnected = this.connection?.state.status === 'disconnected';
    if (!this.connection || isDisconnected) {
      this.join({
        channelId,
        guild,
      });
    }

    console.log('added to queue');
    let sourceLink = source;

    if (type === 'search') {
      const songLink = await this.searchInYoutube(source);
      sourceLink = songLink;
    }

    this.queue.push(sourceLink);

    const playerStatus = this.player.state.status;
    if (playerStatus !== 'playing') {
      this.playMusic(sourceLink);
    }
  }

  listQueueSongs(): string {
    return this.queue.toString();
  }

  private async searchInYoutube(text: string): Promise<string> {
    const video = await this.youtube.searchVideos(text);
    return String(video.url);
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

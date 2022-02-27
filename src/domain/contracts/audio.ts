import { Guild } from 'discord.js';

export namespace JoinChannel {
  export type Input = {
    channelId: string;
    guild: Guild;
  };
}

export interface JoinChannel {
  join(params: JoinChannel.Input): void;
}

export type SourceType = 'spotify' | 'youtube' | 'search' | 'unknown';

export namespace Play {
  export type Input = {
    source: string;
    type: SourceType;
    channelId: string;
    guild: Guild;
  };
}

export interface Play {
  play(input: Play.Input): Promise<void>;
}

export interface ListQueueSongs {
  listQueueSongs(): string;
}

export interface Leave {
  leave(): void;
}

export interface Pause {
  pause(): void;
}

export interface Resume {
  resume(): void;
}

export interface Stop {
  stop(): void;
}

export interface Next {
  next(): void;
}

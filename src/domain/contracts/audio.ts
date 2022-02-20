import { Guild } from 'discord.js';

export namespace JoinChannel {
  export type Input = {
    channelId: string;
    guild: Guild;
  };
}

export interface JoinChannel {
  join(params: JoinChannel.Input): Promise<void>;
}

export namespace Play {
  export type Input = {
    audioUrl: string;
    channelId: string;
    guild: Guild;
  };
}

export interface Play {
  play(input: Play.Input): Promise<void>;
}

export interface Stop {
  stop(): Promise<void>;
}

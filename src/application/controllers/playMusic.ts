import { ListQueueSongs, Play, SourceType } from '@/domain/contracts';
import { Message } from 'discord.js';
import { Controller } from '../protocols';

type Input = {
  source: string;
  message: Message;
};

export class PlayMusicController implements Controller {
  constructor(private readonly audio: Play & ListQueueSongs) {}

  async handle({ message, source }: Input): Promise<void> {
    const member = message.member;
    const canJoinToChannel = member?.voice.channel?.joinable;
    const channelId = member?.voice?.channel?.id;
    const guild = message.guild;

    if (!canJoinToChannel || !channelId || !guild) {
      message.reply('something is wrong, try again later');
      return;
    }

    if (!source || !source.length) {
      message.reply('you need to provided a link to play some music');
      return;
    }

    const isUrl = source.startsWith('https://');
    let sourceType: SourceType = 'unknown';

    if (!isUrl) {
      sourceType = 'search';
    }

    const isFromSpotify = source.includes('spotify.com');
    const isFromYoutube =
      source.includes('youtube.com') || source.includes('youtu.be');

    if (isFromSpotify) {
      sourceType = 'spotify';
      message.reply('spotify musics are not supported');
      return;
    }

    if (isFromYoutube) {
      sourceType = 'youtube';
    }

    if (sourceType === 'unknown') {
      message.reply('invalid link, please try again');
      return;
    }

    await this.audio.play({
      source,
      channelId,
      guild,
      type: sourceType,
    });

    message.reply(`music added to queue`);
  }
}

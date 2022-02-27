import { ListQueueSongs, Play } from '@/domain/contracts';
import { Message } from 'discord.js';
import { Controller } from '../protocols';

type Input = {
  source: string;
  message: Message;
};

type UrlType = 'spotify' | 'youtube' | 'unknown';

export class PlayMusicController implements Controller {
  constructor(private readonly audio: Play & ListQueueSongs) {}

  handle({ message, source }: Input): void {
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

    if (!isUrl) {
      message.reply(
        'music search is not supported, please provided a youtube link',
      );
      return;
    }

    const isFromSpotify = source.includes('spotify.com');
    const isFromYoutube =
      source.includes('youtube.com') || source.includes('youtu.be');

    let urlType: UrlType = 'unknown';

    if (isFromSpotify) {
      urlType = 'spotify';
      message.reply('spotify musics are not supported');
      return;
    }

    if (isFromYoutube) {
      urlType = 'youtube';
    }

    if (urlType === 'unknown') {
      message.reply('invalid link, please try again');
      return;
    }

    this.audio.play({
      source,
      channelId,
      guild,
      type: urlType,
    });

    message.reply(`music added to queue`);
  }
}

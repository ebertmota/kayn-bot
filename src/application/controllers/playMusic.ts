import { Play } from '@/domain/contracts';
import { Message } from 'discord.js';
import { Controller } from '../protocols';

type Input = {
  audioUrl: string;
  message: Message;
};

export class PlayMusicController implements Controller {
  constructor(private readonly audio: Play) {}

  async handle({ message, audioUrl }: Input): Promise<void> {
    const member = message.member;
    const canJoinToChannel = member?.voice.channel?.joinable;
    const channelId = member?.voice?.channel?.id;
    const guild = message.guild;

    if (!canJoinToChannel || !channelId || !guild) {
      message.reply('Erro ao reproduzir música');
      return;
    }

    await this.audio.play({
      audioUrl,
      channelId,
      guild,
    });
  }
}

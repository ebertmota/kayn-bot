import { GatewayIntentBits } from 'discord-api-types/v9';
import { Client } from 'discord.js';
import { env } from './env';
import registerListeners from '../listeners/main';

export const setupListeners = (): void => {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildVoiceStates,
    ],
  });
  client.login(env.discord.token);

  registerListeners(client);
};

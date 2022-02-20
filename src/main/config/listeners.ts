import { GatewayIntentBits } from 'discord-api-types/v9';
import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import { env } from './env';

export const setupListeners = (): void => {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  });
  client.login(env.discord.token);

  readdirSync(join(__dirname, '../listeners'))
    .filter(file => !file.endsWith('.map'))
    .map(async file => {
      (await import(`../listeners/${file}`)).default(client);
    });
};

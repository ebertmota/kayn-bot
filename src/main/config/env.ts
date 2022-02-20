export const env = {
  port: process.env.APP_PORT || 3333,
  discord: {
    token: process.env.DISCORD_TOKEN || '',
    client_id: process.env.DISCORD_CLIENT_ID || '',
    channel_id: process.env.DISCORD_CHANNEL_ID || '',
  },
};

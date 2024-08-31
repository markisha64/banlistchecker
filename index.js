'use strict'

import { Client, GatewayIntentBits } from 'discord.js';

// Create a new Discord client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// When the client is ready, run this code (only once)
client.once('ready', async () => {
    console.log('Ready!')
    const channel = await client.channels.fetch(process.env.CHANNEL_ID)

    if (channel) {
        console.log('Channel found!')

        setInterval(async () => {
            console.log(`[${new Date().toLocaleTimeString()}] Checking now`)
            const current = await (await fetch('https://www.yugioh-card.com/eu/_data/fllists/current.json')).json()

            if (current.from !== '22/04/2024') {
                await channel.send(`<@${process.env.USER_ID}> [NEW BANLIST](https://www.yugioh-card.com/eu/play/forbidden-and-limited-list/) DROPPED!!!!`)

                process.exit(0)
            }
        }, 120 * 1000)
    }
});

// Login to Discord with your app's token
client.login(process.env.TOKEN);


const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
const app = express();

let bot = null;

app.use(express.json());

app.post('/start', async (req, res) => {
  const token = req.body.token;

  if (bot) return res.send("Bot already running.");

  bot = new Client({ intents: [GatewayIntentBits.Guilds] });

  bot.once('ready', () => {
    console.log(`Logged in as ${bot.user.tag}`);
  });

  try {
    await bot.login(token);
    res.send("Bot started");
  } catch (err) {
    console.error(err);
    bot = null;
    res.status(500).send("Failed to start bot");
  }
});

app.post('/stop', async (req, res) => {
  if (!bot) return res.send("Bot not running.");
  await bot.destroy();
  bot = null;
  res.send("Bot stopped");
});

app.listen(3000, () => {
  console.log("Bot server running on port 3000");
});

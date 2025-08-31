const axios = require('axios');
const os = require('os');
const fs = require('fs');
const path = require('path');
const { lite, commands } = require('../lite');
const { runtime } = require('../lib/functions');

lite({
  pattern: 'version',
  alias: ["changelog", "cupdate", "checkupdate"],
  react: '🩸',
  desc: "Check bot's version, system stats, and update info.",
  category: 'main',
  filename: __filename
}, async (conn, mek, m, {
  from, sender, pushname, reply
}) => {
  try {
    // Read local version data
    const localVersionPath = path.join(__dirname, '../data/version.json');
    let localVersion = 'Unknown';
    let changelog = 'No changelog available.';
    if (fs.existsSync(localVersionPath)) {
      const localData = JSON.parse(fs.readFileSync(localVersionPath));
      localVersion = localData.version;
      changelog = localData.changelog;
    }

    const rawVersionUrl = 'https://raw.githubusercontent.com/NaCkS-ai/Makima-XD/main/data/version.json';
    let latestVersion = 'Unknown';
    let latestChangelog = 'No changelog available.';
    try {
      const { data } = await axios.get(rawVersionUrl);
      latestVersion = data.version;
      latestChangelog = data.changelog;
    } catch (error) {
      console.error('Failed to fetch latest version:', error);
    }

    // Count total plugins
    const pluginPath = path.join(__dirname, '../plugins');
    const pluginCount = fs.readdirSync(pluginPath).filter(file => file.endsWith('.js')).length;

    // Count total registered commands
    const totalCommands = commands.length;

    // System info
    const uptime = runtime(process.uptime());
    const ramUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const totalRam = (os.totalmem() / 1024 / 1024).toFixed(2);
    const hostName = os.hostname();
    const lastUpdate = fs.statSync(localVersionPath).mtime.toLocaleString();

    // GitHub stats
    const githubRepo = 'https://github.com/NaCkS-ai/Sung-Suho-MD';

    // Check update status
    let updateMessage = `🔗 *Makima whispers:* Your bot obeys — it’s up to date.`;
    if (localVersion !== latestVersion) {
      updateMessage = `🩸 *Makima tilts her head...* Your bot is falling behind.\n\n` +
        `🔹 *Current Version:* ${localVersion}\n📲 *Latest Version:* ${latestVersion}\n\n` +
        `⚡ Use *.update* to catch up before she loses interest.`;
    }

    const statusMessage = `
╭─❍『 🩸 ᴍᴀᴋɪᴍᴀ ꜱʏꜱᴛᴇᴍ ꜱᴛᴀᴛᴜꜱ 』❍─
│
│ 🌙 *Good ${new Date().getHours() < 12 ? 'Morning' : 'Night'}, ${pushname}*
│
│ 📌 *Bot Name:* MAKIMA-XD
│ 🔖 *Current Version:* ${localVersion}
│ 📢 *Latest Version:* ${latestVersion}
│ 📂 *Plugins:* ${pluginCount}
│ 🔢 *Commands:* ${totalCommands}
│
│ 💾 *System Info:*
│ ⏳ Uptime: ${uptime}
│ 📟 RAM: ${ramUsage}MB / ${totalRam}MB
│ ⚙️ Host: ${hostName}
│ 📅 Last Update: ${lastUpdate}
│
│ 📝 *Changelog:*
│ ${latestChangelog}
│
╰─⭓ *Under Makima’s Control* 🩸

${updateMessage}

⭐ Repo: ${githubRepo}
👤 Owner: [Mr Sung Suho](https://github.com/NaCkS-ai)
`;

    // Send the status message with an image
    await conn.sendMessage(from, {
      image: { url: config.MENU_IMAGE_URL },
      caption: statusMessage,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363402507750390@newsletter',
          newsletterName: 'ᴍᴀᴋɪᴍᴀ ᴄᴏɴᴛʀᴏʟ',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });
  } catch (error) {
    console.error('Error fetching version info:', error);
    reply('💔 *Makima sighs...* I couldn’t check the version this time.');
  }
});

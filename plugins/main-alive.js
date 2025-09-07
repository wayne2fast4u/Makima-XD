const { lite } = require('../lite');
const os = require('os');
const { runtime } = require('../lib/functions');
const config = require('../settings');

lite({
    pattern: "alive",
    alias: ["status", "online", "a"],
    desc: "Check if bot is alive and running",
    category: "main",
    react: "👁️",
    filename: __filename
}, async (conn, mek, m, { from, sender, reply }) => {
    try {
        const heapUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const totalMem = (os.totalmem() / 1024 / 1024).toFixed(2);
        const uptime = runtime(process.uptime());

        const caption = `
╔═══ ❖ • ✦ • ❖ ═══╗
        🩸 *ᴍᴀᴋɪᴍᴀ sʏsᴛᴇᴍ ᴏɴʟɪɴᴇ* 🩸
╚═══ ❖ • ✦ • ❖ ═══╝

👁 *Status:* Online & Watching
👑 *Owner:* ${config.OWNER_NAME}
📌 *Version:* ${config.version}
🔖 *Prefix:* ${config.PREFIX}
⚙️ *Mode:* ${config.MODE}

💾 *RAM:* ${heapUsed}MB / ${totalMem}MB
🖥 *Host:* ${os.hostname()}
⏱ *Uptime:* ${uptime}

🩸 *Remember:* Makima is always in control...
> ${config.DESCRIPTION}
        `.trim();

        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL },
            caption,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363398430045533@newsletter',
                    newsletterName: '👁️ ᴍᴀᴋɪᴍᴀ ɴᴇᴛᴡᴏʀᴋ',
                    serverMessageId: 101
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Alive Error:", e);
        reply(`❌ *Makima whispers:* ${e.message}`);
    }
});

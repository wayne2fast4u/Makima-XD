const { lite } = require('../lite');
const os = require('os');
const { runtime } = require('../lib/functions');
const config = require('../settings');

lite({
    pattern: "live",
    alias: ["diagnose","sys"],
    desc: "Makima system diagnostic report",
    category: "main",
    react: "👁️",
    filename: __filename
}, async (conn, mek, m, { from, sender, reply }) => {
    try {
        const heapUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const totalMem = (os.totalmem() / 1024 / 1024).toFixed(2);
        const uptime = runtime(process.uptime());

        const caption = `
━━━━━━━👁️ *ᴍᴀᴋɪᴍᴀ ʟɪᴠᴇ sᴛᴀᴛᴜs* 🩸━━━━━━━

🔴 *STATUS:* Online — monitoring targets  
👑 *OWNER:* ${config.OWNER_NAME}  
⚡ *VERSION:* ${config.version}  
🛠️ *PREFIX:* ${config.PREFIX}  
⚙️ *MODE:* ${config.MODE}  

💾 *Memory:* ${heapUsed} MB / ${totalMem} MB  
⏱️ *Uptime:* ${uptime}  
🖥️ *Host:* ${os.hostname()}  

━━━━━━━━━━━━━━━━━━━━━━━━━━━
🩸 *Makima whispers:*  
“You exist only under my command…”
━━━━━━━━━━━━━━━━━━━━━━━━━━━
        `.trim();

        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL || "https://files.catbox.moe/qsy2xx.jpg" },
            caption,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 888,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363398430045533@newsletter',
                    newsletterName: '👁️ ᴍᴀᴋɪᴍᴀ ʟɪᴠᴇ',
                    serverMessageId: 777
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Live Error:", e);
        reply(`❌ *Makima whispers:* ${e.message}`);
    }
});

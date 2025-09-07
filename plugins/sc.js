const { lite } = require('../lite');
const config = require('../settings');

lite({
    pattern: "sc",
    alias: ["source","repo","code"],
    desc: "Displays bot source code and repository information",
    category: "main",
    react: "👁️",
    filename: __filename
}, async (conn, mek, m, { from, sender, reply }) => {
    try {
        const caption = `
╭─❖『 👁️ ᴍᴀᴋɪᴍᴀ sᴏᴜʀᴄᴇ 』❖─╮

🤖 *Bot Name:* ${config.BOT_NAME || "Makima-XD"}
👑 *Owner:* ${config.OWNER_NAME}  
💾 *Version:* ${config.version}
🛠️ *Prefix:* ${config.PREFIX}
⚙️ *Mode:* ${config.MODE}

📦 *Repository:*  
${config.BOT_REPO || "https://github.com/NaCkS-ai/Makima-xd"}

━━━━━━━━━━━━━━━━━━
🩸 *Makima whispers:*  
"All knowledge flows through my design…  
Do not misuse the code, or suffer the consequences."
━━━━━━━━━━━━━━━━━━
        `.trim();

        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL || "https://files.catbox.moe/qsy2xx.jpg" },
            caption,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 888,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402507750390@newsletter',
                    newsletterName: '👁️ ᴍᴀᴋɪᴍᴀ ʀᴇᴘᴏ',
                    serverMessageId: 303
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in sc command:", e);
        reply(`❌ *Makima whispers:* ${e.message}`);
    }
});

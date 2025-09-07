const { lite, commands } = require('../lite');
const config = require('../settings');

lite({
    pattern: "menu2",
    alias: ["altmenu","help2"],
    desc: "Makima’s alternate command menu",
    category: "main",
    react: "👁️",
    filename: __filename
}, async (conn, mek, m, { from, sender, reply }) => {
    try {
        let menuText = `
╔═══ ❖ • ✦ • ❖ ═══╗
      👁️ *ᴍᴀᴋɪᴍᴀ ᴄᴏɴᴛʀᴏʟ ᴍᴇɴᴜ* 🩸
╚═══ ❖ • ✦ • ❖ ═══╝

⚡ *System Online* | Mode: ${config.MODE}
👑 Owner: ${config.OWNER_NAME}
🛠 Prefix: ${config.PREFIX}
📌 Version: ${config.version}

━━━━━━━━━━━━━━━━━━━
🩸 *Categories of Obedience*  
━━━━━━━━━━━━━━━━━━━
`;

        // Group commands by category
        let grouped = {};
        for (let cmd of commands) {
            if (!grouped[cmd.category]) grouped[cmd.category] = [];
            grouped[cmd.category].push(cmd.pattern);
        }

        // Format grouped categories
        for (let category in grouped) {
            menuText += `\n🔻 *${category.toUpperCase()}*\n`;
            menuText += grouped[category].map(c => `   ✦ ${config.PREFIX}${c}`).join("\n");
            menuText += `\n`;
        }

        menuText += `
━━━━━━━━━━━━━━━━━━━
👁️ *Makima whispers:*  
"Your will is mine to command."
━━━━━━━━━━━━━━━━━━━
        `.trim();

        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL || "https://files.catbox.moe/qsy2xx.jpg" }, // fallback Makima art
            caption: menuText,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402507750390@newsletter',
                    newsletterName: '👁️ ᴍᴀᴋɪᴍᴀ ᴍᴇɴᴜ',
                    serverMessageId: 222
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in menu2:", e);
        reply(`❌ *Makima whispers:* ${e.message}`);
    }
});

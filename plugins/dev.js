const { lite, commands } = require('../lite');
const config = require('../settings'); // Make sure MENU_IMAGE_URL is defined in settings.js

lite({
    pattern: "owner",
    alias: ["developer", "dev"],
    desc: "Displays the developer info",
    category: "owner",
    react: "👹", // Makima vibe instead of 👨‍💻
    filename: __filename
}, async (conn, mek, m, {
    from, reply, pushname
}) => {
    try {
        const name = pushname || "Human";

        const text = `
╭─❍『 🩸 ᴍᴀᴋɪᴍᴀ's ᴄᴏɴᴛʀᴀᴄᴛ 』❍─
│
│ 👁 Hello, *${name}*...
│
│ 🔗 You seek *my master*?
│    Then listen carefully.
│
│ 👨‍💻 *OWNER DETAILS:*
│ ───────────────
│ 🧠 *Name* : Mr Sung (Suho)
│ 🕯️ *Age* : +20
│ ☎️ *Contact* : wa.me/1(236)362-1958
│ ▶️ *YouTube* :
│    https://youtube.com/@malvintech2
│
│ 🩸 Power flows only through him.
╰─⭓ ᴏʙᴇʏ ᴍᴀᴋɪᴍᴀ ──────⭓`.trim();

        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/qsy2xx.jpg' }, // Makima art
            caption: text,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402507750390@newsletter',
                    newsletterName: '『 ᴍᴀᴋɪᴍᴀ x sᴜʜᴏ 』',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in .dev command:", e);
        reply(`❌ Error: ${e.message}`);
    }
});

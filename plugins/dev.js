const { lite, commands } = require('../lite');
const config = require('../settings'); // Make sure MENU_IMAGE_URL is defined in settings.js

lite({
    pattern: "owner",
    alias: ["developer", "dev"],
    desc: "Displays the developer info",
    category: "owner",
    react: "👁️", // Ominous Makima vibe
    filename: __filename
}, async (conn, mek, m, {
    from, reply, pushname
}) => {
    try {
        const name = pushname || "Human";

        const text = `
╔═══ ❖ • ✦ • ❖ ═══╗
       🩸 *ᴍᴀᴋɪᴍᴀ's ᴄᴏɴᴛʀᴀᴄᴛ* 🩸
╚═══ ❖ • ✦ • ❖ ═══╝

👁 Greetings, *${name}*...
You dare to seek *my master*?

👨‍💻 *OWNER DETAILS*
──────────────────
🧠 *Name:* Mr Sung (Suho)  
🕯️ *Age:* +20  
☎️ *Contact:* wa.me/12363621958  
▶️ *YouTube:*  
   https://youtube.com/@malvintech2  

🩸 *Power flows only through him...*  
Obey, or be consumed.
        `.trim();

        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/qsy2xx.jpg' }, // Makima art fallback
            caption: text,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 1000,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402507750390@newsletter',
                    newsletterName: '👁️ ᴍᴀᴋɪᴍᴀ ɴᴇᴛᴡᴏʀᴋ',
                    serverMessageId: 666
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in .owner command:", e);
        reply(`❌ *Makima whispers:* ${e.message}`);
    }
});

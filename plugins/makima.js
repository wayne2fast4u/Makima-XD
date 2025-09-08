const { lite } = require('../lite');
const config = require('../settings');
const axios = require('axios');

lite({
    pattern: "makima",
    desc: "Summon Makima wallpaper with your name.",
    category: "fun",
    react: "🩸",
    filename: __filename
}, async (conn, mek, m, { from, sender, reply, pushname, args }) => {
    try {
        const name = args.length > 0 ? args.join(" ") : pushname || "Human";

        // Example: using lolhuman API textprome endpoint
        const apiUrl = `https://api.lolhuman.xyz/api/textprome2/metallic?apikey=YOUR_API_KEY&text=${encodeURIComponent(name)}`;

        const caption = `
╭─❍『 👁 ᴍᴀᴋɪᴍᴀ 』❍─
│
│ 🩸 Summoning contract complete...
│ 🔗 Name bound: *${name}*
│
╰─⭓ ᴏʙᴇʏ ᴍᴀᴋɪᴍᴀ ──────⭓`;

        await conn.sendMessage(from, {
            image: { url: apiUrl },
            caption,
            contextInfo: {
                mentionedJid: [sender]
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in makima cmd:", e);
        reply(`❌ Error: ${e.message}`);
    }
});

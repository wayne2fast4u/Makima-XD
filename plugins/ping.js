const config = require('../settings');
const { lite, commands } = require('../lite');

lite({
    pattern: "ping",
    alias: ["speed","pong"],
    use: ".ping",
    desc: "Check bot's response time.",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        const start = new Date().getTime();

        // Makima/Chainsaw Man themed emojis
        const reactionEmojis = ['🩸','👁️','💀','⚡','🔥','🕷️','☠️','💥','🎭','🕐'];
        const textEmojis = ['🩸','👁️','💀','⚡','🔥','🕷️','☠️','💨','✨','🎯'];

        let reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
        let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];

        // Avoid duplicates
        while (textEmoji === reactionEmoji) {
            textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
        }

        // React first
        await conn.sendMessage(from, { react: { text: reactionEmoji, key: mek.key } });

        const end = new Date().getTime();
        const responseTime = (end - start) / 1000;

        // Darker Makima-styled caption
        const text = `
╔═══ ❖ • ✦ • ❖ ═══╗
      👁️ *ᴍᴀᴋɪᴍᴀ ᴘɪɴɢ* 👁️
╚═══ ❖ • ✦ • ❖ ═══╝

⚡ *Response Time:* ${responseTime.toFixed(2)} s  
🩸 *Random Seal:* ${textEmoji}  

「 Chainsaw Domain • Makima is watching 」
        `.trim();

        await conn.sendMessage(from, {
            text,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 777,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402507750390@newsletter',
                    newsletterName: "👁️ ᴍᴀᴋɪᴍᴀ ɴᴇᴛᴡᴏʀᴋ",
                    serverMessageId: 999
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in ping command:", e);
        reply(`❌ *Makima whispers:* ${e.message}`);
    }
});

// themed by malvin king

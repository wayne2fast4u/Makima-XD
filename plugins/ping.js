const config = require('../settings');
const { lite, commands } = require('../lite');

lite({
    pattern: "ping",
    alias: ["speed","pong"],
    use: '.ping',
    desc: "Check bot's response time.",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        const start = new Date().getTime();

        // Makima/Chainsaw Man themed emojis
        const reactionEmojis = ['🩸', '💀', '⚡', '🔥', '🕷️', '💥', '☠️', '🩸', '🕐', '🔹'];
        const textEmojis = ['💀', '🩸', '⚡️', '💨', '🕷️', '🎯', '🛡️', '✨', '🔥', '☠️'];

        let reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
        let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];

        // Ensure reaction and text emojis are different
        while (textEmoji === reactionEmoji) {
            textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
        }

        // Send reaction first
        await conn.sendMessage(from, {
            react: { text: reactionEmoji, key: mek.key }
        });

        const end = new Date().getTime();
        const responseTime = (end - start) / 1000;

        const text = `
╔══════════════════════╗
║ ⚡ ᴘɪɴɢ ʀᴇsᴘᴏɴsᴇ ⚡
╠══════════════════════╣
║ 🚨 Response Time: ${responseTime.toFixed(2)} s
║ 🩸 Emoji: ${textEmoji}
╚══════════════════════╝
> 🕷️ *Chainsaw Makima monitoring speed...*`;

        await conn.sendMessage(from, {
            text,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402507750390@newsletter',
                    newsletterName: "ᴍʀ sᴜɴɢ",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in ping command:", e);
        reply(`❌ An error occurred: ${e.message}`);
    }
});

// created by malvin king

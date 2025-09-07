const { lite } = require('../lite');
const config = require('../settings');

lite({
    pattern: "speed",
    alias: ["velocity", "latency", "fast"],
    desc: "Test Makima Bot's reaction speed.",
    category: "main",
    react: "👁️",
    filename: __filename
}, async (conn, mek, m, { from, sender, reply }) => {
    try {
        const start = new Date().getTime();

        // Makima reacts first
        await conn.sendMessage(from, {
            react: { text: "🩸", key: mek.key }
        });

        const end = new Date().getTime();
        const responseTime = (end - start);

        // Random Makima quotes
        const quotes = [
            "“Power flows only through obedience.”",
            "“The slow are devoured first.”",
            "“Speed reveals your true worth.”",
            "“Do not falter… or be discarded.”",
            "“Chains tighten around the weak.”",
            "“Only the swift survive under my gaze.”",
            "“Your hesitation is already your downfall.”"
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

        // Caption with dramatic layout
        const caption = `
╭─❖『 ⚡ *ᴍᴀᴋɪᴍᴀ sᴘᴇᴇᴅ ᴛᴇsᴛ* ⚡ 』❖─╮

⏱️ *Response Time:* ${responseTime} ms  
👁️ *Judgement:* ${
            responseTime <= 200 ? "⚡ Lightning Fast" :
            responseTime <= 500 ? "🔥 Deadly Sharp" :
            responseTime <= 1000 ? "💀 Acceptable" :
            "🐌 Too Slow, Human..."
        }

━━━━━━━━━━━━━━━━━━━━━━
🩸 *Makima whispers:*  
${randomQuote}
━━━━━━━━━━━━━━━━━━━━━━
        `.trim();

        // Use MENU_IMAGE_URL or fallback Makima art
        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL || "https://files.catbox.moe/qsy2xx.jpg" },
            caption,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402507750390@newsletter',
                    newsletterName: '👁️ ᴍᴀᴋɪᴍᴀ ᴛᴇsᴛ',
                    serverMessageId: 201
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in speed command:", e);
        reply(`❌ *Makima whispers:* ${e.message}`);
    }
});

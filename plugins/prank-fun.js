const { lite } = require('../lite');

lite({
    pattern: "hack",
    desc: "Makima-themed playful 'Hacking' message.",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { 
    from, senderNumber, reply 
}) => {
    try {
        // Get the bot owner's number dynamically from conn.user.id
        const botOwner = conn.user.id.split(":")[0]; // Extract the bot owner's number
        if (senderNumber !== botOwner) {
            return reply("❌ *Only Makima’s true master may run this ritual.*");
        }

        const steps = [
            '👁 *MAKIMA PROTOCOL INITIATED...* 🩸',
            '*Summoning Control Devils...* 🔗',
            '*Binding contracts with souls...* 🕷️',
            '```[█▒▒▒▒▒▒] 10%``` ⏳',
            '```[██▒▒▒▒▒] 30%``` ⏳',
            '```[████▒▒▒] 50%``` ⏳',
            '```[██████▒] 70%``` ⏳',
            '```[████████] 90%``` ⏳',
            '```[████████] 100%``` ✅',
            '🩸 *Obedience Protocol: Successful!* 💀',
            '👁 *Executing Makima’s will...* 🪄',
            '*📡 Controlling networks...* 🌐',
            '_💤 Erasing free will..._ 🩸',
            '*🔧 Finalizing domination...* 🏁',
            '⚠️ *Note:* This is a fun roleplay command — no real hacking.',
            '> *CONTRACT SEALED ☣ — OBEY MAKIMA*'
        ];

        for (const line of steps) {
            await reply(line);
            await new Promise(resolve => setTimeout(resolve, Math.random() * 1500 + 500)); // Randomized delay for realism
        }
    } catch (e) {
        console.error(e);
        reply(`❌ *Error:* ${e.message}`);
    }
});

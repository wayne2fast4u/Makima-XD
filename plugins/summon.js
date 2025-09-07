const { lite } = require('../lite');
const config = require('../settings');

lite({
    pattern: "summon",
    alias: ["summonchar","call"],
    desc: "Summon a Chainsaw Man character",
    category: "fun",
    react: "👁️",
    filename: __filename
}, async (conn, mek, m, { from, args, reply, sender }) => {
    try {
        // Character database (add more for variety)
        const characters = [
            {
                name: "Makima",
                role: "Controller / Devil",
                power: "Chains of control",
                img: "https://i.ibb.co/3dHz2vC/makima.jpg"
            },
            {
                name: "Denji",
                role: "Chainsaw Man / Human Devil",
                power: "Chainsaw transformation",
                img: "https://i.ibb.co/bdNZJkM/denji.jpg"
            },
            {
                name: "Power",
                role: "Blood Fiend",
                power: "Blood manipulation",
                img: "https://i.ibb.co/6b5R2TZ/power.jpg"
            },
            {
                name: "Aki Hayakawa",
                role: "Public Safety Devil Hunter",
                power: "Fox Devil contract",
                img: "https://i.ibb.co/6BzvYx6/aki.jpg"
            },
            {
                name: "Kishibe",
                role: "Veteran Devil Hunter",
                power: "Expert combat skills",
                img: "https://i.ibb.co/YTk4jzY/kishibe.jpg"
            }
        ];

        let character;

        if (args && args.length > 0) {
            // Try to find by name (case-insensitive)
            const nameQuery = args.join(" ").toLowerCase();
            character = characters.find(c => c.name.toLowerCase().includes(nameQuery));

            if (!character) {
                return await reply(`❌ Character not found. Available: ${characters.map(c => c.name).join(", ")}`);
            }
        } else {
            // Pick a random character
            character = characters[Math.floor(Math.random() * characters.length)];
        }

        const caption = `
╭─❖『 👁️ ᴄʜᴀʀᴀᴄᴛᴇʀ sᴜᴍᴍᴏɴed 』❖─╮
│
│ 🩸 Name: ${character.name}
│ ⚔️ Role: ${character.role}
│ 💥 Power: ${character.power}
│
╰─⭓ *Makima observes your summon…* 🩸
        `.trim();

        await conn.sendMessage(from, {
            image: { url: character.img },
            caption,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402507750390@newsletter',
                    newsletterName: '👁️ ᴍᴀᴋɪᴍᴀ ʀᴇᴘᴏʀᴛ',
                    serverMessageId: 404
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in summon command:", e);
        reply(`❌ *Makima whispers:* ${e.message}`);
    }
});

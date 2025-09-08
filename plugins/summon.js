const { lite } = require('../lite');
const config = require('../settings');

lite({
    pattern: "summon",
    alias: ["summonchar","call"],
    desc: "Summon a Chainsaw Man character as a collectible card",
    category: "fun",
    react: "👁️",
    filename: __filename
}, async (conn, mek, m, { from, args, reply, sender }) => {
    try {
        // Character database
        const characters = [
            { name: "Makima", role: "Controller / Devil", basePower: 95 },
            { name: "Denji", role: "Chainsaw Man / Human Devil", basePower: 85 },
            { name: "Power", role: "Blood Fiend", basePower: 80 },
            { name: "Aki Hayakawa", role: "Public Safety Devil Hunter", basePower: 78 },
            { name: "Kishibe", role: "Veteran Devil Hunter", basePower: 90 }
        ];

        // Backgrounds for randomization
        const backgrounds = [
            "https://i.ibb.co/3dHz2vC/makima.jpg",
            "https://i.ibb.co/bdNZJkM/denji.jpg",
            "https://i.ibb.co/6b5R2TZ/power.jpg",
            "https://i.ibb.co/6BzvYx6/aki.jpg",
            "https://i.ibb.co/YTk4jzY/kishibe.jpg"
        ];

        // Rarity tiers
        const rarities = ["Common", "Rare", "Epic", "Legendary", "Mythic"];

        let character;

        if (args && args.length > 0) {
            const nameQuery = args.join(" ").toLowerCase();
            character = characters.find(c => c.name.toLowerCase().includes(nameQuery));

            if (!character) {
                return await reply(`❌ Character not found. Available: ${characters.map(c => c.name).join(", ")}`);
            }
        } else {
            character = characters[Math.floor(Math.random() * characters.length)];
        }

        // Random stats modifiers
        const powerModifier = Math.floor(Math.random() * 21) - 10; // -10 to +10
        const finalPower = character.basePower + powerModifier;

        // Random rarity
        const rarity = rarities[Math.floor(Math.random() * rarities.length)];

        // Random background
        const bg = backgrounds[Math.floor(Math.random() * backgrounds.length)];

        const caption = `
╭─❖『 👁️ ᴄʜᴀʀᴀᴄᴛᴇʀ sᴜᴍᴍᴏɴed 』❖─╮
│
│ 🩸 Name: ${character.name}
│ ⚔️ Role: ${character.role}
│ 💥 Power: ${finalPower}
│ 🌟 Rarity: ${rarity}
│
╰─⭓ *Makima observes your summon…* 🩸
        `.trim();

        await conn.sendMessage(from, {
            image: { url: bg },
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

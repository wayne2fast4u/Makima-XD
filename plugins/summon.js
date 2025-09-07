const { lite } = require('../lite');
const { createCanvas, loadImage } = require('canvas');
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
            { name: "Makima", role: "Controller / Devil", basePower: 95, img: "https://i.ibb.co/3dHz2vC/makima.jpg" },
            { name: "Denji", role: "Chainsaw Man / Human Devil", basePower: 85, img: "https://i.ibb.co/bdNZJkM/denji.jpg" },
            { name: "Power", role: "Blood Fiend", basePower: 80, img: "https://i.ibb.co/6b5R2TZ/power.jpg" },
            { name: "Aki Hayakawa", role: "Public Safety Devil Hunter", basePower: 78, img: "https://i.ibb.co/6BzvYx6/aki.jpg" },
            { name: "Kishibe", role: "Veteran Devil Hunter", basePower: 90, img: "https://i.ibb.co/YTk4jzY/kishibe.jpg" }
        ];

        const rarities = ["Common", "Rare", "Epic", "Legendary", "Mythic"];
        let character;

        if (args && args.length > 0) {
            const nameQuery = args.join(" ").toLowerCase();
            character = characters.find(c => c.name.toLowerCase().includes(nameQuery));
            if (!character) return await reply(`❌ Character not found. Available: ${characters.map(c => c.name).join(", ")}`);
        } else {
            character = characters[Math.floor(Math.random() * characters.length)];
        }

        // Random stats modifiers
        const powerModifier = Math.floor(Math.random() * 21) - 10; // -10 to +10
        const finalPower = character.basePower + powerModifier;
        const rarity = rarities[Math.floor(Math.random() * rarities.length)];

        // Create canvas
        const width = 600;
        const height = 900;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        // Load character image
        const bg = await loadImage(character.img);
        ctx.drawImage(bg, 0, 0, width, height);

        // Overlay semi-transparent dark layer for text
        ctx.fillStyle = "rgba(0,0,0,0.4)";
        ctx.fillRect(0, height - 250, width, 250);

        // Text style
        ctx.fillStyle = "#FFD700"; // golden text
        ctx.font = "bold 30px Sans";
        ctx.fillText(character.name, 30, height - 200);
        ctx.font = "22px Sans";
        ctx.fillText(`Role: ${character.role}`, 30, height - 160);
        ctx.fillText(`Power: ${finalPower}`, 30, height - 120);
        ctx.fillText(`Rarity: ${rarity}`, 30, height - 80);

        // Makima footer
        ctx.fillStyle = "#FF0000";
        ctx.font = "italic 18px Sans";
        ctx.fillText("👁️ Makima observes your summon…", 30, height - 40);

        // Convert canvas to buffer
        const buffer = canvas.toBuffer();

        await conn.sendMessage(from, {
            image: buffer,
            caption: `╭─❖『 👁️ ᴄʜᴀʀᴀᴄᴛᴇʀ sᴜᴍᴍᴏɴed 』❖─╮\nName: ${character.name}\nRole: ${character.role}\nPower: ${finalPower}\nRarity: ${rarity}\n╰─⭓ Makima watches...`
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in summon command:", e);
        reply(`❌ *Makima whispers:* ${e.message}`);
    }
});

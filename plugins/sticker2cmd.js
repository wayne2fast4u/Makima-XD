const { lite } = require('../lite');
const fs = require('fs');
const path = require('path');
const config = require('../settings');

const stickerCmdDB = path.join(__dirname, '../stickerCmd.json');

// Ensure the stickerCmd.json exists
if (!fs.existsSync(stickerCmdDB)) fs.writeFileSync(stickerCmdDB, JSON.stringify({}));

lite({
    pattern: "sticker2cmd",
    alias: ["st2cmd","stick2cmd"],
    desc: "Bind a sticker to a command (Makima observes your obedience)",
    category: "fun",
    react: "🩸",
    filename: __filename
}, async (conn, mek, m, { from, reply, args, quoted }) => {
    try {
        if (!quoted || !quoted.message.stickerMessage) {
            return await reply("❌ Please reply to a sticker with this command.");
        }

        if (!args || args.length === 0) {
            return await reply("❌ Please specify the command you want this sticker to trigger.\nExample: .sticker2cmd hello");
        }

        const cmdName = args[0].toLowerCase();
        const stickerId = quoted.message.stickerMessage.fileId || quoted.key.id;

        // Load database
        const db = JSON.parse(fs.readFileSync(stickerCmdDB));

        // Bind sticker to command
        db[stickerId] = cmdName;

        // Save
        fs.writeFileSync(stickerCmdDB, JSON.stringify(db, null, 2));

        await reply(`✅ Sticker is now bound to command: ${cmdName}\n👁️ Makima watches your obedience.`);

    } catch (e) {
        console.error("Error in sticker2cmd:", e);
        reply(`❌ *Makima whispers:* ${e.message}`);
    }
});

// Listener: Execute command when sticker is sent
lite({
    pattern: ".*",
    react: "🩸",
    category: "internal",
    filename: __filename
}, async (conn, mek, m, { from }) => {
    try {
        if (!mek.message || !mek.message.stickerMessage) return;

        const stickerId = mek.message.stickerMessage.fileId || mek.key.id;

        // Load database
        const db = JSON.parse(fs.readFileSync(stickerCmdDB));

        if (db[stickerId]) {
            const cmd = db[stickerId];
            // Execute command
            if (conn.commands.has(cmd)) {
                conn.commands.get(cmd)(conn, mek, m, { from, sender: mek.sender, reply: async (text) => conn.sendMessage(from, { text }, { quoted: mek }) });
            } else {
                await conn.sendMessage(from, { text: `❌ Command ${cmd} not found.` }, { quoted: mek });
            }
        }

    } catch (e) {
        console.error("Error executing sticker2cmd:", e);
    }
});

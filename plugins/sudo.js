const fs = require("fs");
const path = require("path");
const { lite } = require("../lite");

const OWNER_PATH = path.join(__dirname, "../lib/sudo.json");

// Ensure the sudo.json file exists
const ensureOwnerFile = () => {
  if (!fs.existsSync(OWNER_PATH)) {
    fs.writeFileSync(OWNER_PATH, JSON.stringify([]));
  }
};

// Command: Add a temporary owner
lite({
    pattern: "setsudo",
    alias: ["addsudo", "addowner","sudo"],
    desc: "Add a temporary owner",
    category: "owner",
    react: "🩸", // Makima vibe
    filename: __filename
}, async (conn, mek, m, { from, args, q, isCreator, reply }) => {
    try {
        if (!isCreator) return reply("❗ *Only Makima’s true master can use this command.*");

        let target = m.mentionedJid?.[0] 
            || (m.quoted?.sender ?? null)
            || (args[0]?.replace(/[^0-9]/g, '') + "@s.whatsapp.net");

        if (!target) return reply("🔗 *Obey Makima... Provide a number or mention/reply a user.*");

        let owners = JSON.parse(fs.readFileSync(OWNER_PATH, "utf-8"));

        if (owners.includes(target)) {
            return reply("👁 *This soul already belongs to Makima.*");
        }

        owners.push(target);
        const uniqueOwners = [...new Set(owners)];
        fs.writeFileSync(OWNER_PATH, JSON.stringify(uniqueOwners, null, 2));

        const successMsg = `
╭─❍『 ᴄᴏɴᴛʀᴀᴄᴛ ꜱᴇᴀʟᴇᴅ 』❍─
│ ✅ User is now bound as a *Sudo Owner*.
╰───────────────────────⭓
`.trim();

        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/eeeypw.jpg" }, // Makima art
            caption: successMsg
        }, { quoted: mek });
    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
});

// Command: Remove a temporary owner
lite({
    pattern: "delsudo",
    alias: ["delowner", "deletesudo"],
    desc: "Remove a temporary owner",
    category: "owner",
    react: "⚰️",
    filename: __filename
}, async (conn, mek, m, { from, args, q, isCreator, reply }) => {
    try {
        if (!isCreator) return reply("❗ *Only Makima’s true master can revoke contracts.*");

        let target = m.mentionedJid?.[0] 
            || (m.quoted?.sender ?? null)
            || (args[0]?.replace(/[^0-9]/g, '') + "@s.whatsapp.net");

        if (!target) return reply("🔗 *Provide a number or mention/reply a user to release their contract.*");

        let owners = JSON.parse(fs.readFileSync(OWNER_PATH, "utf-8"));

        if (!owners.includes(target)) {
            return reply("👁 *This soul was never under Makima’s control.*");
        }

        const updated = owners.filter(x => x !== target);
        fs.writeFileSync(OWNER_PATH, JSON.stringify(updated, null, 2));

        const successMsg = `
╭─❍『 ᴄᴏɴᴛʀᴀᴄᴛ ʙʀᴏᴋᴇɴ 』❍─
│ ⚰️ User has been released from *Sudo Owner*.
╰───────────────────────⭓
`.trim();

        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/eeeypw.jpg" },
            caption: successMsg
        }, { quoted: mek });
    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
});

// Command: List all temporary owners
lite({
    pattern: "listsudo",
    alias: ["listowner"],
    desc: "List all temporary owners",
    category: "owner",
    react: "📜",
    filename: __filename
}, async (conn, mek, m, { from, isCreator, reply }) => {
    try {
        if (!isCreator) return reply("❗ *Only Makima’s true master can see the contract list.*");

        let owners = JSON.parse(fs.readFileSync(OWNER_PATH, "utf-8"));
        owners = [...new Set(owners)];

        if (owners.length === 0) {
            return reply("📭 *No souls are currently bound under Makima.*");
        }

        let listMessage = `
╭─❍『 ᴍᴀᴋɪᴍᴀ’s ᴄᴏɴᴛʀᴀᴄᴛᴇᴅ 』❍─
`.trim();

        owners.forEach((owner, i) => {
            listMessage += `\n│ ${i + 1}. wa.me/${owner.replace("@s.whatsapp.net", "")}`;
        });

        listMessage += `\n╰───────────────────────⭓`;

        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/eeeypw.jpg" },
            caption: listMessage
        }, { quoted: mek });
    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
});

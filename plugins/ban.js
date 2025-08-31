const fs = require("fs");
const path = require("path");
const { lite } = require("../lite");

lite({
    pattern: "ban",
    alias: ["blockuser", "addban"],
    desc: "Ban a user from using the bot",
    category: "owner",
    react: "🩸",
    filename: __filename
}, async (conn, mek, m, { from, args, isCreator, reply }) => {
    try {
        if (!isCreator) return reply("🩸 *Makima’s command belongs only to her Master.*");

        let target = m.mentionedJid?.[0] 
            || (m.quoted?.sender ?? null)
            || (args[0]?.replace(/[^0-9]/g, '') + "@s.whatsapp.net");

        if (!target) return reply("❌ *Makima tilts her head...* Provide a number or tag/reply a user.");

        let banned = JSON.parse(fs.readFileSync("./lib/ban.json", "utf-8"));

        if (banned.includes(target)) {
            return reply("⚠️ *Makima smirks:* This soul is already under my control.");
        }

        banned.push(target);
        fs.writeFileSync("./lib/ban.json", JSON.stringify([...new Set(banned)], null, 2));

        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/eeeypw.jpg" },
            caption: `🩸 *Makima whispers:* This user is now forbidden from touching me...`
        }, { quoted: mek });

    } catch (err) {
        console.error(err);
        reply("💔 *Makima sighs...* Error: " + err.message);
    }
});

lite({
    pattern: "unban",
    alias: ["removeban"],
    desc: "Unban a user",
    category: "owner",
    react: "🔮",
    filename: __filename
}, async (conn, mek, m, { from, args, isCreator, reply }) => {
    try {
        if (!isCreator) return reply("🩸 *Only my Master may revoke control.*");

        let target = m.mentionedJid?.[0] 
            || (m.quoted?.sender ?? null)
            || (args[0]?.replace(/[^0-9]/g, '') + "@s.whatsapp.net");

        if (!target) return reply("❌ *Makima tilts her head...* Provide a number or tag/reply a user.");

        let banned = JSON.parse(fs.readFileSync("./lib/ban.json", "utf-8"));

        if (!banned.includes(target)) {
            return reply("⚠️ *Makima smirks:* This one was never bound to my chains.");
        }

        const updated = banned.filter(u => u !== target);
        fs.writeFileSync("./lib/ban.json", JSON.stringify(updated, null, 2));

        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/eeeypw.jpg" },
            caption: `🔮 *Makima allows this soul to be free again...*`
        }, { quoted: mek });

    } catch (err) {
        console.error(err);
        reply("💔 *Makima sighs...* Error: " + err.message);
    }
});

lite({
    pattern: "listban",
    alias: ["banlist", "bannedusers"],
    desc: "List all banned users",
    category: "owner",
    react: "📜",
    filename: __filename
}, async (conn, mek, m, { from, isCreator, reply }) => {
    try {
        if (!isCreator) return reply("🩸 *Makima doesn’t obey anyone else.*");

        let banned = JSON.parse(fs.readFileSync("./lib/ban.json", "utf-8"));
        banned = [...new Set(banned)];

        if (banned.length === 0) return reply("✨ *Makima smiles faintly:* No souls are bound under my control.");

        let msg = "🩸 *Makima’s List of Controlled Souls:*\n\n";
        banned.forEach((id, i) => {
            msg += `${i + 1}. ${id.replace("@s.whatsapp.net", "")}\n`;
        });

        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/eeeypw.jpg" },
            caption: msg
        }, { quoted: mek });
    } catch (err) {
        console.error(err);
        reply("💔 *Makima sighs...* Error: " + err.message);
    }
});

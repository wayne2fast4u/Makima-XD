const { lite } = require('../lite');

lite({
    pattern: "block",
    desc: "Blocks a person",
    category: "owner",
    react: "🩸",
    filename: __filename
},
async (conn, m, { reply, q, react }) => {
    // Get the bot owner's number dynamically
    const botOwner = conn.user.id.split(":")[0] + "@s.whatsapp.net";
    
    if (m.sender !== botOwner) {
        await react("❌");
        return reply("🩸 *Makima stares coldly...* Only my Master may command me to block.");
    }

    let jid;
    if (m.quoted) {
        jid = m.quoted.sender;
    } else if (m.mentionedJid.length > 0) {
        jid = m.mentionedJid[0];
    } else if (q && q.includes("@")) {
        jid = q.replace(/[@\s]/g, '') + "@s.whatsapp.net";
    } else {
        await react("❌");
        return reply("🔮 *Makima whispers:* Mention or reply to the one you want erased.");
    }

    try {
        await conn.updateBlockStatus(jid, "block");
        await react("✅");
        reply(`🩸 *Makima has cut the connection.*\n@${jid.split("@")[0]} is now blocked.`, { mentions: [jid] });
    } catch (error) {
        console.error("Block command error:", error);
        await react("❌");
        reply("💔 *Makima sighs...* I couldn’t block this soul.");
    }
});

lite({
    pattern: "unblock",
    desc: "Unblocks a person",
    category: "owner",
    react: "🔮",
    filename: __filename
},
async (conn, m, { reply, q, react }) => {
    // Get the bot owner's number dynamically
    const botOwner = conn.user.id.split(":")[0] + "@s.whatsapp.net";

    if (m.sender !== botOwner) {
        await react("❌");
        return reply("🩸 *Makima tilts her head...* Only my Master can release souls from my grasp.");
    }

    let jid;
    if (m.quoted) {
        jid = m.quoted.sender;
    } else if (m.mentionedJid.length > 0) {
        jid = m.mentionedJid[0];
    } else if (q && q.includes("@")) {
        jid = q.replace(/[@\s]/g, '') + "@s.whatsapp.net";
    } else {
        await react("❌");
        return reply("🔮 *Makima whispers:* Mention or reply to the one you want freed.");
    }

    try {
        await conn.updateBlockStatus(jid, "unblock");
        await react("✅");
        reply(`🔮 *Makima loosens her chains.*\n@${jid.split("@")[0]} has been unblocked.`, { mentions: [jid] });
    } catch (error) {
        console.error("Unblock command error:", error);
        await react("❌");
        reply("💔 *Makima sighs...* I couldn’t release this soul.");
    }
});

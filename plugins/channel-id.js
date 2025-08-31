const { lite } = require("../lite");

lite({
  pattern: "newsletter",
  alias: ["cjid", "id"],
  react: "🩸",
  desc: "Get WhatsApp Channel info from link",
  category: "whatsapp",
  filename: __filename
}, async (conn, mek, m, { from, args, q, reply }) => {
  try {
    if (!q)
      return reply(`🩸 *Makima tilts her head...* Provide a valid WhatsApp Channel link.\n\n📌 Example:\n.newsletter https://whatsapp.com/channel/xxxxxxxxxx`);

    const match = q.match(/whatsapp\.com\/channel\/([\w-]+)/);
    if (!match)
      return reply(`⚠️ *Makima smirks:* That doesn’t look like a proper channel link...\nIt should be like:\nhttps://whatsapp.com/channel/xxxxxxxxx`);

    const inviteId = match[1];
    let metadata;

    try {
      metadata = await conn.newsletterMetadata("invite", inviteId);
    } catch {
      return reply("💔 *Makima sighs...* I couldn’t fetch this channel’s soul. Check the link again.");
    }

    if (!metadata?.id)
      return reply("❌ *Makima whispers:* This channel doesn’t exist, or is hidden from me.");

    const infoText = `
╭─❍『 🩸 ᴍᴀᴋɪᴍᴀ’ꜱ ᴄʜᴀɴɴᴇʟ ɪɴꜰᴏ 』❍─
│
│ 🆔 *ID:* ${metadata.id}
│ 🗂️ *Name:* ${metadata.name}
│ 👥 *Followers:* ${metadata.subscribers?.toLocaleString() || "N/A"}
│ ⏳ *Created:* ${metadata.creation_time ? new Date(metadata.creation_time * 1000).toLocaleString("en-US") : "Unknown"}
│
╰─⭓ *Under Makima’s Control*
`;

    if (metadata.preview) {
      await conn.sendMessage(from, {
        image: { url: `https://pps.whatsapp.net${metadata.preview}` },
        caption: infoText
      }, { quoted: m });
    } else {
      reply(infoText);
    }

  } catch (err) {
    console.error("❌ Newsletter Error:", err);
    reply("💔 *Makima sighs softly...* Something went wrong while fetching channel info.");
  }
});

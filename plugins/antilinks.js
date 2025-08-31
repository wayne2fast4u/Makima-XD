const { lite } = require('../lite');
const config = require("../settings");

// Configurable lists
const badWords = [
  "wtf", "mia", "xxx", "fuck", "sex", "huththa", "pakaya", "ponnaya", "hutto"
];

const linkPatterns = [
  /https?:\/\/(?:chat\.whatsapp\.com|wa\.me)\/\S+/gi,
  /https?:\/\/(?:t\.me|telegram\.me)\/\S+/gi,
  /https?:\/\/(?:www\.)?(youtube|facebook|instagram|twitter|tiktok|linkedin|snapchat|pinterest|reddit|discord|twitch|vimeo|dailymotion|medium)\.com\/\S+/gi,
  /https?:\/\/fb\.me\/\S+/gi,
  /https?:\/\/youtu\.be\/\S+/gi,
  /wa\.me\/\S+/gi,
  /https?:\/\/ngl\/\S+/gi
];

lite({
  on: "body"
}, async (conn, m, store, { from, body, sender, isGroup, isAdmins, isBotAdmins, reply }) => {
  try {
    if (!isGroup || isAdmins || !isBotAdmins || sender === conn.user?.id) return;

    const text = body.toLowerCase();
    const hasBadWord = config.ANTI_BAD_WORD === "true" && badWords.some(word => text.includes(word));
    const hasLink = config.ANTI_LINK === "true" && linkPatterns.some(pattern => pattern.test(body));

    if (hasBadWord) {
      await conn.sendMessage(from, { delete: m.key });
      await conn.sendMessage(from, {
        text: `🩸 *Makima’s Command:*\nYour tongue displeases me...\n\n@${sender.split('@')[0]} dared to use forbidden words.`,
        mentions: [sender]
      }, { quoted: m });
      return;
    }

    if (hasLink) {
      await conn.sendMessage(from, { delete: m.key });
      await conn.sendMessage(from, {
        text: `🔮 *Makima’s Control:* Links are forbidden in my domain.\n\n@${sender.split('@')[0]} has been *removed* under my order.`,
        mentions: [sender]
      }, { quoted: m });

      await conn.groupParticipantsUpdate(from, [sender], "remove");
    }
  } catch (error) {
    console.error(error);
    reply("💔 *Makima sighs...* Something went wrong while enforcing control.");
  }
});

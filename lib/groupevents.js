const { isJidGroup } = require('@whiskeysockets/baileys');
const config = require('../settings');

// Default context info for mentions and forwarding
const getContextInfo = (m) => ({
    mentionedJid: [m.sender],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363402507750390@newsletter',
        newsletterName: 'ᴍᴀʟᴠɪɴ ᴋɪɴɢ',
        serverMessageId: 143,
    },
});

// Fallback profile pictures
const ppUrls = [
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
];

const GroupEvents = async (conn, update) => {
    try {
        if (!isJidGroup(update.id)) return;
        const metadata = await conn.groupMetadata(update.id);
        const participants = update.participants;
        const desc = metadata.desc || "No Description";
        const groupMembersCount = metadata.participants.length;

        // Try to fetch group profile picture
        let ppUrl;
        try {
            ppUrl = await conn.profilePictureUrl(update.id, 'image');
        } catch {
            ppUrl = ppUrls[Math.floor(Math.random() * ppUrls.length)];
        }

        for (const num of participants) {
            const userName = num.split("@")[0];
            const timestamp = new Date().toLocaleString();

            if (update.action === "add" && config.WELCOME === "true") {
                const welcomeText = `
🌹 *Makima greets you, @${userName}* 🌹

You have been chosen to enter *${metadata.subject}* 🏢  
Member #${groupMembersCount}. Obey the rules and do not disappoint.

🕒 *Arrival Time:* ${timestamp}
📌 *Group Info:* ${desc}

Remember… I am always watching.  
> 🔥 *Authority enforced by ${config.BOT_NAME}*`;

                await conn.sendMessage(update.id, {
                    image: { url: ppUrl },
                    caption: welcomeText,
                    mentions: [num],
                    contextInfo: getContextInfo({ sender: num }),
                });

            } else if (update.action === "remove" && config.WELCOME === "true") {
                const goodbyeText = `
💀 *Makima notices @${userName} has left...* 💀

🕒 *Departure Time:* ${timestamp}
👥 *Remaining members:* ${groupMembersCount}

May you not forget who watches you.  
> 👋 *${config.BOT_NAME} whispers goodbye.*`;

                await conn.sendMessage(update.id, {
                    image: { url: ppUrl },
                    caption: goodbyeText,
                    mentions: [num],
                    contextInfo: getContextInfo({ sender: num }),
                });

            } else if (update.action === "demote" && config.ADMIN_EVENTS === "true") {
                const demoter = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `
⚠️ *Admin Notice* ⚠️

@${demoter} has stripped @${userName} of admin privileges.  
Power is fleeting; remember your place.

🕒 *Time:* ${timestamp}
📢 *Group:* ${metadata.subject}`,
                    mentions: [update.author, num],
                    contextInfo: getContextInfo({ sender: update.author }),
                });

            } else if (update.action === "promote" && config.ADMIN_EVENTS === "true") {
                const promoter = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `
🔥 *Admin Notice* 🔥

@${promoter} has promoted @${userName} to admin status.  
With great power comes obedience to me.

🕒 *Time:* ${timestamp}
📢 *Group:* ${metadata.subject}

Respect the chain of command.`,
                    mentions: [update.author, num],
                    contextInfo: getContextInfo({ sender: update.author }),
                });
            }
        }
    } catch (err) {
        console.error('Group event error:', err);
    }
};

module.exports = GroupEvents;

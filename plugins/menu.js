

const fs = require('fs');
const config = require('../settings');
const { lite, commands } = require('../lite');
const axios = require('axios');
const { getPrefix } = require('../lib/prefix');
const { runtime } = require('../lib/functions');
const moment = require("moment-timezone"); // Use timezone-aware moment


lite({
    pattern: "menu",
    react: "🤖",
    alias: ["allmenu"],
    desc: "Get command list",
    category: "main",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, pushname, reply
}) => {
    try {
        let menu = {
            download: '', group: '', fun: '', owner: '',
            ai: '', anime: '', convert: '', reaction: '',
            main: '', logo: '', settings: '', other: ''
        };

        for (let i = 0; i < commands.length; i++) {
            let cmd = commands[i];
            if (cmd.pattern && !cmd.dontAddCommandList && menu.hasOwnProperty(cmd.category)) {
                menu[cmd.category] += `│ ⬡ ${cmd.pattern}\n`;
            }
        }
        const currentTime = moment().tz("Africa/Harare").format("HH:mm:ss");
        const currentDate = moment().tz("Africa/Harare").format("dddd, MMMM Do YYYY");
        const prefix = getPrefix();

        let madeMenu = `
╭─❍ 👑 ${config.BOT_NAME} ❍
│ 👤 ᴜsᴇʀ: ${pushname}
│ 🌐 ᴍᴏᴅᴇ: [${config.MODE}]
│ ✨ ᴘʀᴇғɪx: [${prefix}]
│ 🕒 ᴛɪᴍᴇ   : ${currentTime}
│ 📆 ᴅᴀᴛᴇ   : ${currentDate}
│ 🔁 ᴜᴘᴛɪᴍᴇ : ${runtime(process.uptime())}
│ 📲 ᴛᴏᴛᴀʟ ᴄᴍᴅs: ${commands.length}
│  👑 ᴏᴡɴᴇʀ: ᴍʀ sᴜɴɢ 
│ 📌 ᴠᴇʀsɪᴏɴ: ${config.version}-ᴀʟᴘʜᴀ
╰─────────────✦

┌──『 😹 ᴍᴀɪɴ ᴄɴᴅs 😿  』
${menu.main || '│ (No commands found)'}
└────────────✦

┌──『 📥 ᴅᴏᴡɴʟᴏᴀᴅ ᴄᴍᴅs 📥 』
${menu.download || '│ (No commands found)'}
└────────────✦

┌──『 🧑‍💻 ᴏᴡɴᴇʀ ᴄᴍᴅs 🧑‍💻 』
${menu.owner || '│ (No commands found)'}
└────────────✦

┌──『 🧠 ᴀɪ ᴄᴍᴅs 🧠』
${menu.ai || '│ (No commands found)'}
└────────────✦

┌──『 👥 ɢʀᴏᴜᴘ ᴄᴍᴅs 👥 』
${menu.group || '│ (No commands found)'}
└────────────✦

┌──『 ✨ Logo/Anime Commands 』
${menu.anime || '│ (No commands found)'}
└────────────✦

┌──『 🔄 ᴄᴏɴᴠᴇʀᴛ ᴄᴍᴅs 🔄 』
${menu.convert || '│ (No commands found)'}
└────────────✦

┌──『 🎭 ʀᴇᴀᴄᴛɪᴏɴ ᴄᴍᴅs 🎭 』
${menu.reaction || '│ (No commands found)'}
└────────────✦

┌──『 🎉 ғᴜɴ ᴄᴍs 🎉 』
${menu.fun || '│ (No commands found)'}
└────────────✦

┌──『 🎨 ʟᴏɢᴏ ᴄᴍᴅs 🎨 』
${menu.logo || '│ (No commands found)'}
└─────────────✦

┌──『 🪄 sᴇᴛᴛɪɴɢs ᴄᴍᴅs 🪄 』
${menu.settings || '│ (No commands found)'}
└─────────────✦

┌──『 🕵️‍♂️ ᴏᴛʜᴇʀ ᴄᴍᴅs 🕵️‍♂️ 』
${menu.other || '│ (No commands found)'}
└─────────────✦

> ${config.DESCRIPTION}
`;

        await conn.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGE_URL },
                caption: madeMenu,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402507750390@newsletter',
                        newsletterName: 'sᴜɴɢ sᴜʜᴏ ᴍᴅ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );


        await conn.sendMessage(from, {
            audio: fs.readFileSync('./all/menu.m4a'),
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`${e}`);
    }
});

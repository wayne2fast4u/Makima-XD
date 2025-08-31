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

        // Makima-themed menu formatting
        let madeMenu = `
╔════════════════════════════╗
║ 🩸 suho x ${config.BOT_NAME} 🩸 ║
╠════════════════════════════╣
║ 👤 User       : ${pushname}
║ 🌐 Mode       : [${config.MODE}]
║ ✨ Prefix     : [${prefix}]
║ 🕒 Time       : ${currentTime}
║ 📆 Date       : ${currentDate}
║ 🔁 Uptime     : ${runtime(process.uptime())}
║ 📲 Total Cmds : ${commands.length}
║ 👑 Owner      : ᴍᴀᴋɪᴍᴀ x ᴍʀ sᴜɴɢ
║ 📌 Version    : ${config.version}-ᴀʟᴘʜᴀ
╚════════════════════════════╝

─────❖ MAIN COMMANDS ❖─────
${menu.main || 'No commands found'}

─────❖ DOWNLOAD COMMANDS ❖─────
${menu.download || 'No commands found'}

─────❖ OWNER COMMANDS ❖─────
${menu.owner || 'No commands found'}

─────❖ AI COMMANDS ❖─────
${menu.ai || 'No commands found'}

─────❖ GROUP COMMANDS ❖─────
${menu.group || 'No commands found'}

─────❖ LOGO/ANIME COMMANDS ❖─────
${menu.anime || 'No commands found'}

─────❖ CONVERT COMMANDS ❖─────
${menu.convert || 'No commands found'}

─────❖ REACTION COMMANDS ❖─────
${menu.reaction || 'No commands found'}

─────❖ FUN COMMANDS ❖─────
${menu.fun || 'No commands found'}

─────❖ LOGO COMMANDS ❖─────
${menu.logo || 'No commands found'}

─────❖ SETTINGS COMMANDS ❖─────
${menu.settings || 'No commands found'}

─────❖ OTHER COMMANDS ❖─────
${menu.other || 'No commands found'}

💀 🩸 Makima watches over all commands 🩸 💀
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

const { lite, commands } = require('../lite');
const os = require('os');
const { runtime } = require('../lib/functions');
const config = require('../settings');

lite({
    pattern: "menu1",
    alias: ["altmenu", "help1"],
    desc: "Minimal stylish quoted menu with categories",
    category: "main",
    react: "📜",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        // System info
        const heapUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const totalMem = (os.totalmem() / 1024 / 1024).toFixed(2);
        const uptime = runtime(process.uptime());

        // Header
        let stats = `
⟡ ${config.BOT_NAME || "Makima-XD"} ⟡

👑 Owner: ${config.OWNER_NAME}
⌨️ Prefix: ${config.PREFIX}
⚙️ Mode: ${config.MODE}
💾 RAM: ${heapUsed}MB / ${totalMem}MB
⏱️ Uptime: ${uptime}
        `.trim();

        // Group commands by category
        let categories = {};
        for (let cmd of commands) {
            if (!categories[cmd.category]) categories[cmd.category] = [];
            categories[cmd.category].push(cmd.pattern);
        }

        let menuText = "";

        if (!args[0]) {
            // Main menu (just categories)
            menuText += `${stats}\n\n> 𝗠𝗘𝗡𝗨 📜\n`;
            for (let category in categories) {
                menuText += `> ☆ ${category}\n`;
            }
            menuText += `\n「 Chainsaw Domain • Makima is watching 」`;
        } else {
            // Specific category requested
            const category = args[0].toLowerCase();
            if (categories[category]) {
                menuText += `${stats}\n\n> ☆ ${category.toUpperCase()} CMDS\n`;
                categories[category].forEach(cmd => {
                    menuText += `> ${config.PREFIX}${cmd}\n`;
                });
                menuText += `\n「 Chainsaw Domain • Makima is watching 」`;
            } else {
                menuText += `❌ Category *${category}* not found.\nType *.menu1* to see available categories.`;
            }
        }

        // Send
        await conn.sendMessage(from, {
            text: menuText,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Menu1 Error:", e);
        reply(`❌ Error: ${e.message}`);
    }
});

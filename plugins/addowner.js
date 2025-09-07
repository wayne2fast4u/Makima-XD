const { lite } = require('../lite');
const config = require('../settings');
const fs = require('fs');
const path = require('path');

lite({
    pattern: "addowner",
    alias: ["addadmin","grantowner"],
    desc: "Give permanent owner privileges (works in private mode)",
    category: "owner",
    react: "👑",
    filename: __filename
}, async (conn, mek, m, { from, sender, reply, args }) => {
    try {
        // Only current owner can use this
        if (!config.OWNER_NUMBER.includes(sender)) {
            return await reply("❌ You are not authorized to grant owner privileges.");
        }

        if (!args || args.length === 0) {
            return await reply("❌ Provide the number to grant owner access. Example:\n.addowner 1234567890");
        }

        const newOwner = args[0].replace(/[^0-9]/g, '');

        // Create SUPER_OWNERS array if it doesn't exist
        if (!Array.isArray(config.SUPER_OWNERS)) {
            config.SUPER_OWNERS = [];
        }

        if (config.SUPER_OWNERS.includes(newOwner)) {
            return await reply("❌ This number already has owner privileges.");
        }

        // Add the number to SUPER_OWNERS
        config.SUPER_OWNERS.push(newOwner);

        // Update settings.js
        const settingsPath = path.join(__dirname, '../settings.js');
        let settingsFile = fs.readFileSync(settingsPath, 'utf-8');

        // Replace or create SUPER_OWNERS array
        if (settingsFile.includes("SUPER_OWNERS")) {
            const updatedSettings = settingsFile.replace(
                /SUPER_OWNERS\s*=\s*\[([^\]]*)\]/,
                `SUPER_OWNERS = [${config.SUPER_OWNERS.map(n => `'${n}'`).join(', ')}]`
            );
            fs.writeFileSync(settingsPath, updatedSettings, 'utf-8');
        } else {
            // Add SUPER_OWNERS if not present
            fs.writeFileSync(settingsPath, settingsFile + `\nSUPER_OWNERS = [${config.SUPER_OWNERS.map(n => `'${n}'`).join(', ')}]`, 'utf-8');
        }

        await reply(`✅ +${newOwner} has been granted permanent owner access.\n👑 Makima approves their authority even in private mode.`);

    } catch (e) {
        console.error("Error in addowner command:", e);
        reply(`❌ *Makima whispers:* ${e.message}`);
    }
});

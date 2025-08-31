const { lite } = require('../lite');
const { getAnti, setAnti } = require('../data/antidel');

lite({
    pattern: "antidelete",
    alias: ['antidel', 'del'],
    desc: "Toggle anti-delete feature",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, reply, text, isCreator }) => {
    if (!isCreator) return reply('🩸 Only my Master can use this command... – Makima');

    try {
        const currentStatus = await getAnti();
        
        if (!text || text.toLowerCase() === 'status') {
            return reply(`🔮 *Makima’s Control Panel*\n\n📌 *Anti-Delete Status:* ${currentStatus ? '✨ ACTIVE' : '⚫ INACTIVE'}\n\n💠 Usage:\n• .antidelete on – Obey Makima\n• .antidelete off – Release Control\n• .antidelete status – Check Status`);
        }
        
        const action = text.toLowerCase().trim();
        
        if (action === 'on') {
            await setAnti(true);
            return reply('🔴 Makima whispers: "Your messages belong to me now." – Anti-Delete Enabled ✅');
        } 
        else if (action === 'off') {
            await setAnti(false);
            return reply('⚫ Makima smiles faintly... "You’re free, for now." – Anti-Delete Disabled ❌');
        } 
        else {
            return reply('❓ Makima tilts her head...\n\nUsage:\n• .antidelete on – Activate Control\n• .antidelete off – Break Free\n• .antidelete status – Current State');
        }
    } catch (e) {
        console.error("Error in antidelete command:", e);
        return reply("💔 Makima sighs... Something went wrong while processing your request.");
    }
});

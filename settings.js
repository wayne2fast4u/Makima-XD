const fs = require('fs');
const path = require('path');
const { getConfig } = require('./lib/configdb');

if (fs.existsSync(path.resolve('config.env'))) {
  require('dotenv').config({ path: path.resolve('config.env') });
}

// Helper to convert "true"/"false" strings to actual boolean
function convertToBool(text, trueValue = 'true') {
  return text === trueValue;
}

module.exports = {
  // ===== BOT CORE SETTINGS =====
  SESSION_ID: process.env.SESSION_ID || "suho~Xd00AKIA#4AEeW91-ZJ5LQpzU-ztK1Y_WMLt8KyN8MxdgvZ9K6e8", // Your bot's session ID 
  PREFIX: getConfig("PREFIX") || ".", // Command prefix (e.g., ., /, !, *)
  CHATBOT: getConfig("CHATBOT") || "off", // Chatbot mode: on/off
  BOT_NAME: process.env.BOT_NAME || getConfig("BOT_NAME") || "Makima-XD", // Bot display name
  MODE: getConfig("MODE") || process.env.MODE || "private", // Bot mode: public/private/group/inbox
  REPO: process.env.REPO || "https://github.com/NaCkS-ai/Makima-XD", // Bot GitHub repo dont change this❗️
  BAILEYS: process.env.BAILEYS || "@whiskeysockets/baileys", // Baileys version

  // ===== OWNER & DEVELOPER SETTINGS =====
  OWNER_NUMBER: process.env.OWNER_NUMBER || "27847505856", // Owner WhatsApp number
  OWNER_NAME: process.env.OWNER_NAME || getConfig("OWNER_NAME") || "W̴̧̨̢̢̢̢̢̨̢̧̢̧̧̧̧̡̧̡̡̧̡̢̨̢̢̡̛̳̺̺͔͍͈̬̱͇̼̪̠̹̣͔͓͔̘͔̳͈͚̦̣̘͈̪͓̬̟̦̥͙̭̬̪̻̼̼̝̫̠̙̬̰̲̠͖̼͚̤̻̬̠̼̰̱̲̯̞̣͕͓͉̺̰͔͕̱̻̲̞̥̙͙̬̭̥̹̮̮̦̱̦̥̰̖͔͇̜̤͓̫̩̖͎̩̙͉̹̮̬̝̱̯̰̺̠̱̱̣͈̺̥̻̜̲̤̰̬̤̟͇̩͈̜͇̖̮̙̟̦͈̬̫̤̙̮͓̺̟͎̰̺̝̻̯̼̺̠̞̼̫͔̳͕͕̦͎̞̰̠̜͙̤̹̬͈̣̮̳͓̞̳̣͍͔̹͕̟͉͍̪͎̗̱͖͎̼̱̭͖̳̘̻̮͕̙̮̭̘̹̬̤̼̯͖̼̻͈̗̥̜̱̹̝͎̻̫̜̺̺̟̟̤͇͖̰̥̭̦̝̪͔͓͕̹̟̃̽̐̏̐̏̇̌̈͗̿̅̎̆͂̂̀̓͂̌̓́̀̀̂̃̆͛͗̄̓̅͋̆̑͘͘̚̚͜͜͜͜͜͜͜͜͜͜͜͜͝͝͝͠ͅͅͅͅͅͅͅA̶̢̧̧̡̨̧̢̛̛̛̛̛͕̪͖̠͕̬̭͕̲͍͓̟͎͕̩͇̤̦̺̮͉͕̭̖̳͔̼͔͖͈̞̖̝̠̝̘̜̬̫̫͙̫̮͓̦̥̱̟̰̖̺̺͙͔͓̰̤̣̲̳̯̬̦͚̙̪̝͎̞͖̘̼̙̖̬͕͂͛͌̍́͑̓̏͌̽͋͐̉̽̅͛̀̆̌̎͊̃̃̒͗͊̈́̈́̉̋̑͛̆͂̆̔̾̎̐͊̐̏̂̑̊̑̌͑̆͋̇̋̀̕̕̚̕͘̚̕͜͜͜͝͝͝͝ͅY̴̨̧̨̢̧̨̧̧̧̧̢̨̡̛̛̛͇̥̮̺͔̥͓͍͉̭̥̯̥̻͖̹̯̠͔͎͙̼̣͈̯̤͓̘̰̭̻͈̫̥͚̭͎̗͖̳̣͔͍͇̗̖͖̬͙͚̭͉̲̞̱̗̗̲̳̯͚͕͉͕̣͍͚̮͔͚͎̬̤̝̩͍̳͎͔̣͓̹͚̭̰̭̤͙̣̙͕̱̭̻̝̫͍͎̥̣̦͙̭̟̳̤̪͙̩̜̥͇̺̣̜͕͍̰͓̰͉̮̳̤̻͍͎̲͕͔̰͈̼͇̤͉̱̱̲̲͖͖̻̲͈͇͔͎̱͓͇̱̼̟̫̯͕̰͈̳͓̘̭͙͔͓̖̻̱͕͍͙̠̤̦̜̻̙͇̫̳̱̮̥̦̣̟̲̗͈̜̟̩̜̭͎̜̻̝̗͓̹͒͌̽̇̌͌͋́̄̇́̑̀̌̋̀̓̍͗́̇͐́̋͒̊̀͐̄̀̀̈́͊͑͊̈́̐̀̎̈́̍̽̿̊̇͐̍̈́̈́͆̄͛̔̈͂̓͛̈́̇̓͆̎̌̾͌̌̒̽̿͂͒̋͌̿͘̕͘̕̚̕̕͘̚̚͜͜͜͜͜͜͝͠͝͝ͅͅN̵̡̨̢̨̨̢̨̨̧̛̛̻̗̱̳̼͈̬͎̬̹̝̭̗̺̳̝̗̠͇̼̳̻͖͇̝̟̠̱͚̯̜̘̖̩̻͚͈͉̪͇̪͔̬͚̦͕̘̭̣̫̜͙̭͍͖̝̺͇̜͔͙͕̻̦̦͉̝̻̼͇͙̞͚͈̯̱̫͎͔̳̫̥͙͚̠̹͓͕̜͓̟͕̬̠̺͇͙̮̬̼̰̖̜͙̜̦͈̩̘̮̘̭̖̫̫̮͚̼͚̮̫̬̹͍̗̲̯͎̣͉̜̺͕̤̰̺̼͖̰̝̲̺̗̗͍͚̟͔̖̖̺̗̟̠̘͙̱̺̥̩͖̑̄̏͌̉͒̌͒̐͒̓̊̔̍̒̔͗̾̏̇͛̾͑̑̾̒̽̿̈́̉̎̎͆͐̆͌̃̾̄̈́̋̔͑̑̀̊̈́͑̈́̆̊͊̔͒̂̐̾̆͋͐̏̓̊̐̈́̉̈̂̇̆̄͛̿̊̽̆̌̈́̉̐̎͆͑̅̿͂̊͆̃́͑̊̉̈́̈̆͑̆̅̏͊̿̐̊̋̈̒͗̉͗̆͋̈́̀̈́́̋͋̇́̋̕̚͘͘͘̕̚͜͜͝͝͝͝͝͠͝͝͝͝͠͝ͅͅͅȨ̴̨̨̧̡̨̡̨̧̢̧̢̢̨̧̢̢̡̛̛͔̝̮̻̬̬͚̥̙͎̘͎̮̟̬̜͖͖̦͎͓̬͉̺͕̣̜̙̜̥͉͙̖̗̞̱̲̺͖̥̬̥̫̤̲̠̜͚̤͚͕͎̙̹̼̜̳̤̭̜̙̗͎͍̹̱̘̤̗͚̜͍͉͓̙͇̭̝̰̫̬̗͍̥̘̟̪̳̺̬͖͕̗͍̰̭̫͖͍͚̥̠͓̟̬̤͍̼̘͈͖͉̝̞̻͉̫͈͍̬̼̱͉͔̹̞͇̱̼͔̦̪̺̮̜͎̙̝̤̭̲̬̦̝̖̱̦̥̦͈͈̰̝̮̥̘̫̱̰̞͕͈̞̪͍̖͚͓͔̘̣͎͉̲̩͔̟̹͕͉̺̼̩̤͍̠͔͖̱͉̠͎͇̩̬̱͉̘́̓̿̌̃̏̉́͛̌́̉͌̈́̎́̀͋̀̐͊͗̃͂̀̾̓̐̎͌̒͌͊͊̅̆̋̓̐̈́͊̈́̅͊͑͂̄̓̌̅͌̏͒̓̌̕͘͘͘̕̕͘̕͜͜͜͜͜͜͜͜͝ͅͅͅͅͅͅͅͅͅ", // Owner name
  DEV: process.env.DEV || "27847505856", // Developer contact number
  DEVELOPER_NUMBER: '27847505856@s.whatsapp.net', // Developer WhatsApp ID

  // ===== AUTO-RESPONSE SETTINGS =====
  AUTO_REPLY: process.env.AUTO_REPLY || "false", // Enable auto-reply
  AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false", // Reply to status updates?
  AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*Just seen ur status 😆 🤖*", // Status reply message
  READ_MESSAGE: process.env.READ_MESSAGE || "false", // Mark messages as read automatically?
  REJECT_MSG: process.env.REJECT_MSG || "*📵 Calls are not allowed on this number unless you have permission. 🚫*", // Message on rejected call
  ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/8vq804.jpg",
// add img for alive msg

  LIVE_MSG: process.env.LIVE_MSG || "> ʙᴏᴛ ɪs sᴘᴀʀᴋɪɴɢ ᴀᴄᴛɪᴠᴇ ᴀɴᴅ ᴀʟɪᴠᴇ\n\n\nᴋᴇᴇᴘ ᴜsɪɴɢ ✦Sung-Suho-MD✦ ғʀᴏᴍ sung ᴛᴇᴄʜ ɪɴᴄ⚡\n\n\n*© ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ - ᴍᴅ\n\n> ɢɪᴛʜᴜʙ :* github.com/NaCkS-ai/Sung-Suho-MD",
// add alive msg here 

  // ===== REACTION & STICKER SETTINGS =====
  AUTO_REACT: process.env.AUTO_REACT || "false", // Auto-react to messages
  OWNER_REACT: process.env.OWNER_REACT || "true, // Owner-specific reacts
  CUSTOM_REACT: process.env.CUSTOM_REACT || "false", // Use custom emoji reactions
  CUSTOM_REACT_EMOJIS: getConfig("CUSTOM_REACT_EMOJIS") || process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍", // Custom react emojis
  STICKER_NAME: process.env.STICKER_NAME || "ᴋʜᴀɴ-ᴍᴅ", // Sticker pack name
  AUTO_STICKER: process.env.AUTO_STICKER || "false", // Auto-send stickers

  // ===== MEDIA & AUTOMATION =====
  AUTO_RECORDING: process.env.AUTO_RECORDING || "false", // Auto-record voice notes
  AUTO_TYPING: process.env.AUTO_TYPING || "false", // Show typing indicator
  MENTION_REPLY: process.env.MENTION_REPLY || "false", // Reply when mentioned
  MENU_IMAGE_URL: getConfig("MENU_IMAGE_URL") || "https://files.catbox.moe/8vq804.jpg", // Menu image URL

  // ===== SECURITY & ANTI-FEATURES =====
  ANTI_DELETE: process.env.ANTI_DELETE || "true", // Recover deleted messages
  ANTI_CALL: process.env.ANTI_CALL || "false", // Automatically reject calls
  ANTI_BAD_WORD: process.env.ANTI_BAD_WORD || "false", // Block bad words
  ANTI_LINK: process.env.ANTI_LINK || "true", // Block links in groups
  ANTI_VV: process.env.ANTI_VV || "true", // Block view-once messages
  DELETE_LINKS: process.env.DELETE_LINKS || "false", // Auto-delete links
  ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "same", // Where to log deleted messages ('inbox' or 'same')
  ANTI_BOT: process.env.ANTI_BOT || "true", // Block other bots?
  PM_BLOCKER: process.env.PM_BLOCKER || "true", // Block private messages?

  // ===== BOT BEHAVIOR & APPEARANCE =====
  DESCRIPTION: process.env.DESCRIPTION || "*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ makima-md*", // Bot description/footer
  PUBLIC_MODE: process.env.PUBLIC_MODE || "true", // Allow public commands?
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false", // Show bot always online
  AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true", // React to status updates
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true", // Mark status as seen
  AUTO_BIO: process.env.AUTO_BIO || "false", // Automatically update bio
  WELCOME: process.env.WELCOME || "false", // Enable welcome messages
  GOODBYE: process.env.GOODBYE || "false", // Enable goodbye messages
  ADMIN_ACTION: process.env.ADMIN_ACTION || "false", // Show admin activity notifications
  
version: process.env.version || "1.0.0",
};

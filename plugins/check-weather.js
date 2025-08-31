const axios = require('axios');
const config = require('../settings');
const { lite, commands } = require('../lite');

lite({
    pattern: "weather",
    desc: "🌤 Get weather information for a location",
    react: "🌤",
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❗ *Makima tilts her head...* Tell me the city. Usage: `.weather Tokyo`");

        const apiKey = '2d61a72574c11c4f36173b627f8cb177'; 
        const city = q;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);
        const data = response.data;

        const weather = `
╭─❍『 🩸 ᴍᴀᴋɪᴍᴀ ᴡᴇᴀᴛʜᴇʀ ʀᴇᴘᴏʀᴛ 』❍─
│
│ 🌍 *Location:* ${data.name}, ${data.sys.country}
│ 🌡️ *Temperature:* ${data.main.temp}°C
│ 🩸 *Feels Like:* ${data.main.feels_like}°C
│ 🔽 *Min Temp:* ${data.main.temp_min}°C
│ 🔼 *Max Temp:* ${data.main.temp_max}°C
│ 💧 *Humidity:* ${data.main.humidity}%
│ ☁️ *Condition:* ${data.weather[0].main}
│ 🌫️ *Details:* ${data.weather[0].description}
│ 💨 *Wind Speed:* ${data.wind.speed} m/s
│ ⚙️ *Pressure:* ${data.main.pressure} hPa
│
╰─⭓ *Obey Makima. Stay informed.* 🩸
`;

        return reply(weather);
    } catch (e) {
        console.error("Weather Error:", e);
        if (e.response && e.response.status === 404) {
            return reply("🚫 *Makima sighs...* That city doesn’t exist. Check spelling.");
        }
        return reply("⚠️ *Makima whispers:* Something went wrong. Try again later.");
    }
});

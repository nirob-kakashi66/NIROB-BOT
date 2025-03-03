const { GoatWrapper } = require("fca-liane-utils");
 module.exports = {
  config: {
    name: "upt",
    aliases: ["up"],
    version: "1.3",
    author: "Arafat", // Author is fixed as "Arafat"
    role: 0,
    shortDescription: {
      en: "Displays the total number of users of the bot and check uptime."
    },
    longDescription: {
      en: "Displays the total number of users who have interacted with the bot and check uptime."
    },
    category: "UPTIME",
    guide: {
      en: "Type {pn}"
    }
  },
  onStart: async function ({ api, event, usersData, threadsData }) {
    try {
      // Add the new emojis at the top
      const greeting = `			┌═[ 𝐘𝐎𝐔𝐑 𝐕𝐎𝐃𝐑𝐎 𝐔𝐏𝐓𝐈𝐌𝐄 ]═☻
┣‌‣	👑 𝑶𝑾𝑵𝑬𝑹 : ❨𝐌𝐑_𝐀𝐑𝐀𝐅𝐀𝐓❩
┣‣ 🛠️prefix  : ❨!❩
┣‣🔎Trying  : ❨help❩
┣‣🎬mygc   : ❨supportgc❩							 ┣‣🔗 fb link:☺︎︎
┣‣❨https://m.me/vex.arafat.404❩	`;

      const allUsers = await usersData.getAll();
      const allThreads = await threadsData.getAll();
      const uptime = process.uptime();
      const memoryUsage = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);  // Memory usage in MB
      const cpuLoad = (process.cpuUsage().user / 1000).toFixed(2); // CPU load in milliseconds

      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);
      const days = Math.floor(uptime / (3600 * 24));  // Calculate days

      // Get OS info
      const os = require("os");
      const osType = os.type();
      const osPlatform = os.platform();
      const osArch = os.arch();
      const cpuInfo = os.cpus()[0].model;  // CPU model

      // Get Node.js version
      const nodeVersion = process.version;

      // Get active threads count
      const activeThreads = allThreads.filter(thread => thread.active).length;

      // Get network latency (mock value)
      const networkLatency = Math.floor(Math.random() * 100); // Mock value for network latency (in ms)

      const uptimeString = `┣───────═━┈━═───────☺︎︎
┣‣🗓️ ᴅᴀʏs : ❨${days}❩  			    
┣‣⏱️ ʜᴏᴜʀs : ❨${hours}❩ 		  
┣‣🕤 ᴍɪɴᴜᴛᴇ : ❨${minutes}❩
┣‣⏳ sᴇᴄᴏɴᴅ : ❨${seconds}❩
┣──────═━┈━═─────┐`;

      api.sendMessage(`
${greeting}
${uptimeString}
┣‣👥 𝐓𝐨𝐭𝐚𝐥 𝗨𝘀𝗲𝗿𝘀 : ❨${allUsers.length}❩   ║
┣‣🗂️ 𝐓𝐨𝐭𝐚𝐥 𝗧𝗵𝗿𝗲𝗮𝗱𝘀 : ❨${allThreads.length}❩ ║
╚══━═━═─━┈━═━═━══╝
`, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("❌ **Error**: Something went wrong while fetching the data.", event.threadID);
    }
  }
};
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });

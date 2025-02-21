const { GoatWrapper } = require("fca-liane-utils");
module.exports = {
  config: {
    name: "upt",
aliases: ["up"],
    version: "1.0",
    author: "Arafat",
    role: 0,
    shortDescription: {
      en: "Displays the total number of users of the bot and check uptime "
    },
    longDescription: {
      en: "Displays the total number of users who have interacted with the bot and check uptime."
    },
    category: "BOT-RUNNING",
    guide: {
      en: "Use {p}totalusers to display the total number of users of the bot and check uptime."
    }
  },
  onStart: async function ({ api, event, args, usersData, threadsData }) {
    try {
      const allUsers = await usersData.getAll();
      const allThreads = await threadsData.getAll();
      const uptime = process.uptime();
      

      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);

      const uptimeString = `${hours}Hrs ${minutes}min ${seconds}sec`;

      api.sendMessage(`╭─────✰\n│  『 𝗨𝗣𝗧𝗜𝗠𝗘 』  \n├❁𝙷𝙴𝙻𝙻𝙾 𝙴𝚅𝙴𝚁𝚈𝙾𝙽𝙴\n│\n├─⏰ 𝗛𝗼𝘂𝗿𝘀 ${hours}\n├─🕑 𝗠𝗶𝗻𝘂𝘁𝗲𝘀 ${minutes}\n├─⌚𝗦𝗲𝗰𝗼𝗻𝗱 ${seconds}\n├─👥 𝗧𝗼𝘁𝗮𝗹 𝗨𝘀𝗲𝗿𝘀 ${allUsers.length}\n├─📬 𝗧𝗼𝘁𝗮𝗹 𝗧𝗵𝗿𝗲𝗮𝗱𝘀 ${allThreads.length}\n╰───────────✰`, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while retrieving data.", event.threadID);
    }
  }
};
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });

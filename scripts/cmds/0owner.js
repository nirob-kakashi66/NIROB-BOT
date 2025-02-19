const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
config: {
  name: "owner",
  aurthor:"Tokodori",// Convert By Goatbot Tokodori 
   role: 0,
  shortDescription: " ",
  longDescription: "",
  category: "admin",
  guide: "{pn}"
},

  onStart: async function ({ api, event }) {
  try {
    const ownerInfo = {
      name: '𝐄𝐬𝐭𝐞𝐢𝐯𝐞𝐫𝐱𝐞 𝐋𝐨𝐦𝐢𝐧𝐨𝐮𝐬 𝐈𝐈',
      gender: '𝐌𝐚𝐥𝐞',
      age: '17+',
      height: '𝐔𝐧𝐤𝐧𝐨𝐰𝐧',
      facebookLink: 'https://www.facebook.com/xnxx.com500k?mibextid=ZbWKwL',
      nick: '𝐑𝐀𝐅𝐈'
    };

    const bold = 'https://i.imgur.com/DDO686J.mp4'; // Replace with your Google Drive videoid link https://drive.google.com/uc?export=download&id=here put your video id

    const tmpFolderPath = path.join(__dirname, 'tmp');

    if (!fs.existsSync(tmpFolderPath)) {
      fs.mkdirSync(tmpFolderPath);
    }

    const videoResponse = await axios.get(bold, { responseType: 'arraybuffer' });
    const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

    fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

    const response = `
🔰𝗢𝘄𝗻𝗲𝗿 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻:🧾
➪𝐍𝐚𝐦𝐞: ${ownerInfo.name}
➪𝐆𝐞𝐧𝐝𝐞𝐫: ${ownerInfo.gender}
➪𝐀𝐠𝐞: ${ownerInfo.age}
➪𝐇𝐞𝐢𝐠𝐣𝐭: ${ownerInfo.height}
➪𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤: ${ownerInfo.facebookLink}
➪𝐍𝐢𝐜𝐤: ${ownerInfo.nick}
`;


    await api.sendMessage({
      body: response,
      attachment: fs.createReadStream(videoPath)
    }, event.threadID, event.messageID);

    if (event.body.toLowerCase().includes('ownerinfo')) {
      api.setMessageReaction('🚀', event.messageID, (err) => {}, true);
    }
  } catch (error) {
    console.error('Error in ownerinfo command:', error);
    return api.sendMessage('An error occurred while processing the command.', event.threadID);
  }
},
};

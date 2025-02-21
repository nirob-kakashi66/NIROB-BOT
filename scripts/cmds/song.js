const { GoatWrapper } = require("fca-liane-utils");
const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const yts = require("yt-search");
const tinyurl = require('tinyurl');

module.exports = {
  config: {
    name: "song",
    version: "1.6", 
    author: "ArYAN",
    countDown: 60,
    role: 0,
    category: "MUSIC",
  },

  onStart: async function ({ api, event, message }) {
    try {
      const downloadBaseURL = "https://auandvi.onrender.com"; 
      let songName, youTubeUrl;

      if (event.type === "message_reply" && ["audio", "video"].includes(event.messageReply.attachments[0].type)) {
        youTubeUrl = event.messageReply.attachments[0].url;
        const shortURL = await tinyurl.shorten(youTubeUrl);
        const resp = await axios.get(`https://www.api.vyturex.com/songr?url=${shortURL}`);

        if (resp.data && resp.data.title) {
          songName = resp.data.title; 

       
          const searchResults = await yts(songName); 
          if (!searchResults.videos.length) api.setMessageReaction("❌", event.messageID, (err) => {}, true);
          youTubeUrl = searchResults.videos[0].url;

        } else {
          api.setMessageReaction("❌", event.messageID, (err) => {}, true);
        }

      } else {
        songName = event.body.slice(event.body.indexOf(" ") + 1).trim(); 
        if (!songName) return message.reply("Please provide a song name.");
        const searchResults = await yts(songName);
        if (!searchResults.videos.length) api.setMessageReaction("❌", event.messageID, (err) => {}, true);
        youTubeUrl = searchResults.videos[0].url; 
      }

      const downloadURL = `${downloadBaseURL}/download?url=${encodeURIComponent(youTubeUrl)}&type=mp3`;

      const loadingMessage = api.setMessageReaction("✅", event.messageID, (err) => {}, true);
      console.log("Download URL:", downloadURL); 

      const { data: downloadData } = await axios.get(downloadURL);
      console.log("Download Data:", downloadData); 

      if (!downloadData.download_url) {
        api.setMessageReaction("❌", event.messageID, (err) => {}, true);
      }

      const fileName = downloadData.download_url.split("/").pop();
      const filePath = path.join(__dirname, "tmp", fileName);

      const fileDownloadURL = `${downloadBaseURL}/${downloadData.download_url}`;

      await downloadFile(fileDownloadURL, filePath);
      console.log("File Downloaded to:", filePath); 

      message.reply({
        body: `${fileName.split('.').slice(0, -1).join('.')}`, 
        attachment: fs.createReadStream(filePath),
      }, () => fs.unlinkSync(filePath));

      await api.unsendMessage(loadingMessage.messageID); 
      
    } catch (error) {
      console.error('[ERROR]', error);
      message.reply(`.`); 
    }
  },
};

async function downloadFile(url, path) {
  const writer = fs.createWriteStream(path);
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });

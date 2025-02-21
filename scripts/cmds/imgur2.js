const { GoatWrapper } = require("fca-liane-utils");
const axios = require("axios");

module.exports = {
  config: {
    name: "imgur2",
    aliases: [],
    version: "1.0",
    author: "Mahi--",
    shortDescription: "Upload media to Imgur.",
    longDescription: "Uploads an image or video (via reply) to Imgur and returns the public Imgur link.",
    category: "LINK",
    guide: "{p}imgur (reply to an image or video message)",
  },
  onStart: async function ({ api, event }) {
    try {
      if (!event.messageReply || !event.messageReply.attachments || event.messageReply.attachments.length === 0) {
        return api.sendMessage(
          "❌ Please reply to an image or video message to upload it to Imgur.",
          event.threadID,
          event.messageID
        );
      }

      const attachment = event.messageReply.attachments[0];
      const mediaUrl = attachment.url;

      api.sendMessage("➜⚙", event.threadID, event.messageID);

      const response = await axios.post(
        "https://api.imgur.com/3/upload",
        { image: mediaUrl },
        {
          headers: {
            Authorization: "Bearer edd3135472e670b475101491d1b0e489d319940f",
            "Content-Type": "application/json",
          },
        }
      );

      const imgurData = response.data;
      if (!imgurData || !imgurData.data || !imgurData.data.link) {
        throw new Error("Failed to retrieve Imgur link.");
      }

      const imgurLink = imgurData.data.link;

      api.sendMessage(
        `${imgurLink}`,
        event.threadID,
        event.messageID
      );
    } catch (error) {
      console.error("Error uploading to Imgur:", error.message);
      api.sendMessage(
        `❌ Error uploading to Imgur: ${error.message}`,
        event.threadID,
        event.messageID
      );
    }
  },
};
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });

const { GoatWrapper } = require("fca-liane-utils");
 const axios = require("axios");

const baseApiUrl = async () => {
  const base = await axios.get(
    `https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`
  );
  return base.data.api;
};

(module.exports = {
  config: {
    name: "quiz",
    aliases: ["qz"],
    version: "1.0",
    author: "asif | Tarif",
    countDown: 0,
    role: 0,
    category: "GAME",
    guide: "{p}quiz2 \n{pn}quiz2 bn \n{p}quiz2 en",
  },

  onStart: async function ({ api, event, usersData, args }) {
    const input = args.join('').toLowerCase() || "bn";
    let timeout = 300;
    let category = "bangla";
    if (input === "bn" || input === "bangla") {
      category = "bangla";
    } else if (input === "en" || input === "english") {
      category = "english";
 }

    try {
      const response = await axios.get(
        `${await baseApiUrl()}/quiz2?category=${category}&q=random`,
      );

      const quizData = response.data.question;
      const { question, correctAnswer, options } = quizData;
      const { a, b, c, d } = options;
      const namePlayerReact = await usersData.getName(event.senderID);
      const quizMsg = {
        body: `\n ⚙ 𝗤𝘂𝗶𝘇 ( 𝖻𝖾𝗍𝖺 )
━━━━━━━━━━━━━
Please reply with the letter corresponding to your answer
━━━━━━━━━━━━━ 
${question}\n 
A. ${a}\nB. ${b}\nC. ${c}\nD. ${d}\n\n`,
      };

      api.sendMessage(
        quizMsg,
        event.threadID,
        (error, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            type: "reply",
            commandName: this.config.name,
            author: event.senderID,
            messageID: info.messageID,
            dataGame: quizData,
            correctAnswer,
            nameUser: namePlayerReact,
            attempts: 0
          });
          setTimeout(() => {
            api.unsendMessage(info.messageID);
          }, timeout * 1000);
        },
        event.messageID,
      );
    } catch (error) {
      console.error("❌ | Error occurred:", error);
      api.sendMessage(error.message, event.threadID, event.messageID);
    }
  },

  onReply: async ({ event, api, Reply, usersData }) => {
const { correctAnswer, nameUser, author } = Reply;
    if (event.senderID !== author)
      return api.sendMessage(
        "⚙ 𝗤𝘂𝗶𝘇 ( 𝖻𝖾𝗍𝖺 )					━━━━━━━━━━━━━ 							    	 	 ⚠ You are not the player of this question!",
        event.threadID,
        event.messageID
      );
    const maxAttempts = 2;

    switch (Reply.type) {
      case "reply": {
        let userReply = event.body.toLowerCase();
        if (Reply.attempts >= maxAttempts) {
          await api.unsendMessage(Reply.messageID);
          const incorrectMsg = `⚙ 𝗤𝘂𝗶𝘇 ( 𝖻𝖾𝗍𝖺 )
━━━━━━━━━━━━━												 🚫 | ${nameUser}, you have reached the maximum number of attempts (2).\nThe correct answer is: ${correctAnswer}`;
          return api.sendMessage(incorrectMsg, event.threadID, event.messageID);
        }
        if (userReply === correctAnswer.toLowerCase()) {
          api.unsendMessage(Reply.messageID)
          .catch(console.error);
          let rewardCoins = 3000;
          let rewardExp = 1000;
          let userData = await usersData.get(author);
          await usersData.set(author, {
          money: userData.money + rewardCoins,
            exp: userData.exp + rewardExp,
            data: userData.data,
          });
          let correctMsg = `⚙ 𝗤𝘂𝗶𝘇 ( 𝖻𝖾𝗍𝖺 )
━━━━━━━━━━━━━
Congratulations, ${nameUser}! 🌟🎉\nYou're a Quiz Champion! 🏆\n\You've earned ${rewardCoins} Coins 💰 			and ${rewardExp} EXP 🌟\nKeep up the great work! 🚀`;
          api.sendMessage(correctMsg, event.threadID, event.messageID);
        } else {
          Reply.attempts += 1;
global.GoatBot.onReply.set(Reply.messageID, Reply);
          api.sendMessage(
            `⚙ 𝗤𝘂𝗶𝘇 ( 𝖻𝖾𝗍𝖺 )
━━━━━━━━━━━━━

Oops, that's not quite right. Could you try again?`,
            event.threadID,
            event.messageID,
          );
        }
        break;
      }
      default:
        break;
    }
  },
});
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });

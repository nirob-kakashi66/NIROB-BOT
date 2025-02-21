const { GoatWrapper } = require("fca-liane-utils");
module.exports = {
  config: {
    name: "ma",
    version: "7.0",
    author: "Arafat",
    countDown: 5,
    role: 0,
    shortDescription: "all video ðŸ“·",
    longDescription: "",
    category: "Video",
    guide: "{pn}"
  },
   onStart: async function ({ message }) {
   var TARIF= ["",
"https://vt.tiktok.com/ZS6ax18yq/",
"https://vt.tiktok.com/ZS6a93oe7/",
"https://vt.tiktok.com/ZS6ax8fua/",
"https://i.imgur.com/BpPGCMk.mp4",
"https://i.imgur.com/vTerGNU.mp4",
"https://i.imgur.com/XlI0uka.mp4",
"https://i.imgur.com/zw5fkxr.mp4",
"https://i.imgur.com/mEFe4A2.mp4",
"https://i.imgur.com/Mw1PXQh.mp4",
"https://i.imgur.com/rwl5RYk.mp4",
 "https://i.imgur.com/wgNQ98R.mp4",
"https://i.imgur.com/0NpXj8v.mp4",
"https://i.imgur.com/hRzbBtB.mp4",
"https://i.imgur.com/mmsfobs.mp4",
"https://i.imgur.com/cQ6ayew.mp4",
"https://i.imgur.com/Xd1ZN9Z.mp4",
"https://i.imgur.com/FuDDXBO.mp4",
"https://i.imgur.com/28Hljjv.mp4",
"https://i.imgur.com/i1P085p.mp4",
"https://i.imgur.com/zoDCCEr.mp4",
"https://i.imgur.com/PppsKQe.mp4",
"https://i.imgur.com/q4zwVw9.mp4",
"https://i.imgur.com/xuIzG9O.mp4",
"https://i.imgur.com/0r6gN9E.mp4",
]

let msg = TARIF[Math.floor(Math.random()*TARIF.length)]
message.send({
  body: '	🗂️───═══━𝙈𝘼━═══────		┌─────═══━┈━═══─────┐			🪫:𝙊𝙒𝙉𝙀𝙍 𝘿𝙀𝙑 : 亗 ɱʀ ƬʌʀᎥʆ 亗 └─────═══━┈━═══─────┘',attachment: await global.utils.getStreamFromURL(msg)
})
}
     }
const wrapper = new GoatWrapper(module.exports);
wrapper.applyNoPrefix({ allowPrefix: true });

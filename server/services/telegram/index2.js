const telegrambot = require("node-telegram-bot-api");
require("dotenv").config();
const { citates } = require('./citates');

const token = process.env.TELEGRAM_BOT;
const chat_id = process.env.TELEGRAM_CHAT_ID;
console.log('token: ', token);
console.log('Chat id: ', chat_id);

const bot = new telegrambot(token, {polling:true});

function* Message(citates) {
    for(const citate of citates) yield citate;
};

const gen = Message(citates);

let text = '';

bot.on("message",(message) => {
    if(message.text === "start") {
        let id = 0;
        while(id != 1){
            id++;
            text = gen.next().value;
            text.text = `${text.text}\n` + `<b>This is bold text</b>\n
<i>This is italic text</i>\n
<u>This is underlined text</u>\n
<s>This is strikethrough text</s>\n
<code>This is code</code>\n
<pre>This is preformatted text</pre>\n
<a href="http://example.com">This is a link</a>\n
<a href="tg://user?id=123456789">Mentioning a user</a>`

            console.log(text.text);

            // Sending text message
            bot.sendMessage(chat_id, text.text, { parse_mode: 'HTML' })
                .then(() => {
                    // Sending an image
                    bot.sendPhoto(chat_id, './content/image.jpg', { caption: text.text, parse_mode: 'HTML' })
                        .then(() => {
                            // Sending a document
                            bot.sendDocument(chat_id, './content/document.pdf', { caption: text.text, parse_mode: 'HTML'})
                                .then(() => {
                                    // Sending a video
                                    bot.sendVideo(chat_id, './content/video.mp4', { caption: text.text, parse_mode: 'HTML' })
                                        .catch((error) => console.error("Error sending video:", error));
                                })
                                .catch((error) => console.error("Error sending document:", error));
                        })
                        .catch((error) => console.error("Error sending photo:", error));
                })
                .catch((error) => console.error("Error sending message:", error));
        }
    }
});

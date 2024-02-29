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
        let id = 10;
        while(id != 11){
            id++;
            text = gen.next().value;
            text.text = `${text.text}\n` + `<b>This is bold text</b>\n
<i>This is italic text</i>\n
<u>This is underlined text</u>\n
<s>This is strikethrough text</s>\n
<pre>
const gen = Message(citates);
let text = '';
</pre>\n
<pre>This is preformatted text</pre>\n
<a href="http://example.com">This is a link</a>\n
<a href="tg://user?id=123456789">Mentioning a user</a>`;

            console.log(text.text);

            // Sending the text message
            bot.sendMessage(chat_id, text.text, { parse_mode: 'HTML' })
                .then(() => {
                    // Sending the media group
                    bot.sendMediaGroup(chat_id, [
                        {
                            type: 'photo',
                            media: './content/image.jpg',
                            caption: text.text,
                            parse_mode: 'HTML'
                        },
                        // {
                        //     type: 'document',
                        //     media: './content/document.pdf',
                        //     caption: text.text,
                        //     parse_mode: 'HTML'
                        // },
                        {
                            type: 'video',
                            media: './content/video.mp4',
                            parse_mode: 'HTML'
                        }
                    ])
                    .then(() => console.log("Media group sent successfully"))
                    .catch((error) => console.error("Error sending media group:", error));
                })
                .catch((error) => console.error("Error sending message:", error));
        }
    }
});

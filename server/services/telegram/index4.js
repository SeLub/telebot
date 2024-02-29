const telegrambot = require("node-telegram-bot-api");
require("dotenv").config();
const { citates } = require('./citates');

const token = process.env.TELEGRAM_BOT_TOKEN;
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
🏠
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
                        // {
                        //     type: 'photo',
                        //     media: 'https://s3.tebi.io/telegram.backet/images/Siemiradzki-Nimfa-bfde1635-e28b-4027-ba21-15ddb26e00fd.jpg',
                        //     caption: text.text,
                        //     parse_mode: 'HTML',
                        //     has_spoiler: true
                        // },
                        // {
                        //     type: 'document',
                        //     media: 'https://s3.tebi.io/telegram.backet/images/document-a0313a43-aa70-426a-a089-1903805e334e.pdf',
                        //     caption: text.text,
                        //     parse_mode: 'HTML'
                        // },
                        // {
                        //     type: 'audio',
                        //     media: 'https://s3.tebi.io/telegram.backet/images/sample-71f65e8a-39fe-4419-b067-cc473114c312.mp3',
                        //     caption: text.text,
                        // },
                        // {
                        //     type: 'video',
                        //     media: 'https://s3.tebi.io/telegram.backet/images/video-14feae6e-feb8-4103-a2ef-d0dfaba6e4f0.mp4',
                        //     parse_mode: 'HTML'
                        // }
                    ])
                    .then(() => console.log("Media group sent successfully"))
                    .catch((error) => console.error("Error sending media group:", error));
                })
                .catch((error) => console.error("Error sending message:", error));
        }
    }
});

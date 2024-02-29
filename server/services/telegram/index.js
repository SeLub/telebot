const telegrambot = require("node-telegram-bot-api");
require("dotenv").config();
const { citates } = require('./citates');

const token = process.env.TELEGRAM_BOT;
const chat_id = process.env.TELEGRAM_CHAT_ID;
console.log('token: ', token);
console.log('Chat id: ', chat_id);

const bot = new telegrambot(token, {polling:true});

function* Message(citates){
      for(const citate of citates) yield citate;
};

const gen = Message(citates);

let text = '';

bot.on("message",(message) => {
      if(message.text === "start") {
      let id = 0;
      while(id != 5){
            id++;
            text = gen.next().value;
            console.log(text.text);
            bot.sendMessage(chat_id, text.text);
      }
}
});
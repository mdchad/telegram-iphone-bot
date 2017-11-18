const chalk = require('chalk')
const TelegramBot = require('node-telegram-bot-api')
const telegram = require('./config')
const token = telegram.ACCESS
const bot = new TelegramBot(token, {polling: true})
const stock = require('./index')

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Hello fellow human. Type 'stock' to get the stock updates for iphone x.");
});
stock().then(val => {
    bot.on('message', (msg) => {
        let stock = "stock";
        if (msg.text.toString().toLowerCase().indexOf(stock) === 0) {
            bot.sendMessage(msg.chat.id, "Please wait while we are checking the iphone stock");
            if (val) {
                let stockInfo = ''
                val.forEach((x, i) => {
                    stockInfo +=  "<strong>" + x.location + "</strong> \n\n*<i>iphone 64gb</i>* \n   space gray: " + x.iphone64gb.spaceGrey + "\n             silver: " + x.iphone64gb.silver + "\n\n*<i>iphone 256gb</i>* \n   space gray: " + x.iphone256gb.spaceGrey + "\n             silver: " + x.iphone256gb.silver + "\n\n"
                });
                bot.sendMessage(msg.chat.id, stockInfo, { parse_mode: "HTML"});
            }
        }
    }); 
}).catch(err => {
    throw err
})

console.log(chalk.bgGreen("Live") + " " + ("Bot is up and running"))
console.log(process.env)
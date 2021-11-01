const { Telegraf, Markup} = require('telegraf')
const text = require('./const')

require('dotenv').config()
const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => onstart(ctx))
bot.help((ctx) => help(ctx))
bot.on('sticker', (ctx) => stic(ctx))
bot.hears('hi', (ctx) => ctx.reply(ctx.message))

bot.command('course', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Ссылка</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Редакторы', 'btn_1')]
            ]
        ))
    }
    catch (e){
        console.error(e)
    }

})

function addAction(btn, src, text) {
    bot.action(btn, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            if (src !== false) {
                await ctx.replyWithPhoto({
                    source: src
                })
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview: true
            })
        } catch (e) {
            console.error(e)
        }
    })
}

addAction('btn_1', './img/itachi.jpg', text.text)


// bot.action('btn_1', async (ctx) => {
//     try {
//         await ctx.answerCbQuery()
//         await ctx.replyWithHTML('<a href="https://youtu.be/YxHWfDdjIek">Ссылка</a>', {
//             disable_web_page_preview: true
//         })
//     } catch (e) {
//         console.error(e)
//     }
// })

function onstart(ctx) {
    ctx.reply(`Hello ${ctx.message.from.first_name }!`)
    console.log(ctx);
}
function help(ctx) {
    ctx.reply(text.commands)
    console.log(ctx);
}
function stic(ctx) {
    ctx.reply('fuck off bitch')
    console.log(ctx);
}

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
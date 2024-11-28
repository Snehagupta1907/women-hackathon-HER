/* eslint-disable no-undef */
import dotenv from "dotenv";
import app from "./app.js";
import createDebug from "debug";
import { development } from "./utils/development.js";
import { production } from "./utils/production.js";
import { Telegraf } from "telegraf";

dotenv.config();

const debug = createDebug("bot:greeting_text");

const replyToMessage = (ctx, messageId, string) =>
  ctx.reply(string, {
    reply_parameters: { message_id: messageId },
  });

const greeting = () => async (ctx) => {
  try {
    debug('Triggered "greeting" text command');

    const messageId = ctx.message?.message_id;
    const userName = `${ctx.message?.from.first_name} ${ctx.message?.from.last_name}`;
    const text = ctx.message.text;

    console.log(text, messageId, userName, ctx);

    if (messageId) {
      await replyToMessage(ctx, messageId, `Hello, ${userName}!`);
    }
  } catch (error) {
    console.error(error);
    ctx.reply(
      "An error occurred while sending the greeting. Please try again later."
    );
  }
};

const PORT = process.env.PORT || 8000;

const token = process.env.BOT_TOKEN;
const ENVIRONMENT = process.env.NODE_ENV;

console.log(process.env.BOT_TOKEN);

export const web_link = process.env.WEB_APP_LINK;
const bot = new Telegraf(token);

bot.start((ctx) =>
  ctx.reply("Welcome to Roomzy", {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
    },
  })
);

bot.help(async (ctx) =>
  ctx.reply(`
🤖 *Snacky-snake Bot Help* 

/start - Greet the bot

Need assistance with anything else? Feel free to reach out! 🚀
`)
);

bot.hears(/hi+|hello+|hey+/, greeting());

bot.hears("Good Morning", (ctx) => ctx.reply("Hey, Good Morning"));
bot.hears("Namaste", (ctx) => ctx.reply("Namaste ji!"));
bot.hears("Bye", async (ctx) => {
  ctx.reply("Byeee buddy");
});
bot.on("sticker", (ctx) => ctx.reply("👍"));

export const startVercel = async (req, res) => {
  await production(req, res, bot);
};

bot.catch((err, ctx) => {
  console.error(`Error for ${ctx.updateType}`, err);
  ctx.reply("An unexpected error occurred. Please try again later.");
});

// // Development mode
ENVIRONMENT !== "PRODUCTION" && development(bot);

export default async function handle(req, res) {
  try {
    await startVercel(req, res);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Server Error</h1><p>Sorry, there was a problem</p>");
    console.error(e.message);
  }
}

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});


app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});

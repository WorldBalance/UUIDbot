// import Context from "telegraf";
import bot from "./telegram";
import { Context } from "telegraf";

bot.create((ctx: Context) => ctx.reply("Find"));
bot.find((ctx: Context) => ctx.reply("Create"));
bot.launch();

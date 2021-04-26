import {Telegraf} from "telegraf";
import {BOT_TOKEN} from "./config";

const bot = new Telegraf(BOT_TOKEN);
export default bot;

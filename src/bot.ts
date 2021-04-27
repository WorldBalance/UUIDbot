import {Context} from "telegraf";
import getArguments from "./middlewares/get-arguments";
import {CommandWithArgs} from "./model/command-with-args";
import {BotReplies} from "./model/replies";
import bot from "./telegram";
import {findByName} from "./utils/find-by-name";
import {findByValue} from "./utils/find-by-value";

const masks = new Map<string, string>();

bot.start((ctx: Context) => ctx.reply(`Доступные команды:
    /create <UUID_Mask><name> - создать UUID,
    /find <UUID_Mask or name> - найти UUID,
`));

bot.use(getArguments);

const UUID_MASK = /^[0-9a-f\?\*]{1,36}$/i;

bot.command("create", (ctx: Context) => {
    const args = (ctx.state.command as CommandWithArgs).args;
    try {
        if (args.name) {
            const existedMask = findByName(args.name, masks);
            if (existedMask) {
                ctx.reply(BotReplies.MASK_EXISTS + existedMask);
            } else if (args.mask.match(UUID_MASK)) {
                masks.set(args.mask, args.name);
                ctx.reply(BotReplies.MASK_IS_SAVED);
            } else {
                ctx.reply(BotReplies.MASK_IS_WRONG);
            }
        } else {
            ctx.reply(BotReplies.INPUT_NAME);
        }
    } catch (e) {
        if (e.message && e.message === "Cannot read property 'match' of undefined") {
            ctx.reply(BotReplies.INPUT_MASK);
        } else {
            throw e;
        }
    }
});

bot.command("find", (ctx: Context) => {
    const args = (ctx.state.command as CommandWithArgs).args;
    if (args.name) {
        let result = findByName(args.name, masks);
        if (result) {
            ctx.reply(BotReplies.MASK_IS_FOUND + result);
        } else {
            ctx.reply(BotReplies.MASK_IS_NOT_FOUND);
        }
    } else {
        let result = findByValue(args.mask, masks);
        if (args.mask.match(UUID_MASK) && result.length) {
            let reply: string;
            if (result.length > 1) {
                reply = BotReplies.MASKS_ARE_FOUND;
                result.forEach((mask: string) => reply += `${mask}\n`);
            } else {
                reply = BotReplies.MASK_IS_FOUND + result[0];
            }
            ctx.reply(reply);
        } else if (result.length) {
            ctx.reply(BotReplies.MASK_IS_WRONG);
        } else {
            const reply = findByName(args.mask, masks);
            if (result) {
                ctx.reply(BotReplies.MASK_IS_FOUND + reply);
            } else {
                ctx.reply(BotReplies.MASK_IS_NOT_FOUND);
            }
        }
    }
});

bot.launch();

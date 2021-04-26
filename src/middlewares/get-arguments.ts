import {Context} from "telegraf/typings/context";
import {Message} from "typegram";
import {Update} from "typegram/update";
import {CommandWithArgs} from "../model/command-with-args";

const getArguments = (ctx: Context, next: () => Promise<void>) => {
    if (ctx.updateType === "message") {
        const text = ((ctx.update as Update.MessageUpdate).message as Message.TextMessage).text.toLowerCase();
        const match = text.match(/^\/([^\s]+)\s?(.+)?/);
        let response: CommandWithArgs = {raw: text, args: {}} as CommandWithArgs;
        if (text.startsWith("/create")) {
            let args: string[] = [];
            let command;
            if (match !== null) {
                if (match[1]) {
                    command = match[1];
                }
                if (match[2]) {
                    args = match[2].split(" ");
                }
            }
            response = {
                ...response, command, args: {
                    mask: args[0],
                    name: args.splice(1, args.length - 1).join(" ")
                }
            };
        } else if (text.startsWith("/find")) {
            const arg = match.splice(2, match.length - 1).join(" ");
            if (arg.includes(" ")) {
                response.args.name = arg;
            } else {
                response.args.mask = arg;
            }
        }
        ctx.state.command = response;
    }
    return next();
};

export default getArguments;

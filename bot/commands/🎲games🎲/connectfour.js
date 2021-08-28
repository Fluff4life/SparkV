const Discord = require(`discord.js`);

function CheckLine(a, b, c, d) {
    return a !== null && a === b && a === c && a === d;
}

function HasWon(board) {
    for (let b = 0; b < 3; b++) {
        for (let bb = 0; bb < 7; bb++) {
            if (
                CheckLine(
                    board[b][bb],
                    board[b + 1][bb],
                    board[b + 2][bb],
                    board[b + 3][bb]
                )
            ) {
                return board[b][bb];
            }
        }
    }

    for (let b = 0; b < 6; b++) {
        for (let bb = 0; bb < 4; bb++) {
            if (
                CheckLine(
                    board[b][bb],
                    board[b][bb + 1],
                    board[b][bb + 2],
                    board[b][bb + 3]
                )
            ) {
                return board[b][bb];
            }
        }
    }

    for (let b = 0; b < 3; b++) {
        for (let bb = 0; bb < 4; bb++) {
            if (
                CheckLine(
                    board[b][bb],
                    board[b + 1][bb + 1],
                    board[b + 2][bb + 2]
                )
            ) {
                return board[b][bb];
            }
        }
    }

    for (let b = 3; b < 6; b++) {
        for (let bb = 0; bb < 4; bb++) {
            if (
                CheckLine(
                    board[b][bb],
                    board[b - 1][bb + 1],
                    board[b - 2][bb + 2],
                    board[b - 3][bb + 3]
                )
            ) {
                return board[b][bb];
            }
        }
    }

    return null;
}

function DisplayBoard(board) {
    const Map = board
        .map((row) =>
            row
                .map((turn) => {
                    if (turn === `user`) {
                        return `🟡`;
                    } else if (turn === `opponent`) {
                        return `🔴`;
                    }

                    return `⚪`;
                })
                .join(``)
        )
        .join(`\n`);

    return Map;
}

(exports.run = async (bot, message, args, command, data) => {
    const Opponent =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);

    if (!Opponent) {
        return message.reply(
            `${bot.config.bot.Emojis.error} | This command doesn't support API yet. Please mention someone to challenge.`
        );
    }

    if (Opponent.user.bot) {
        return message.reply(
            `${bot.config.bot.Emojis.error} | That user is a bot lol.`
        );
    }

    if (Opponent.user.id === message.author.id) {
        return message.reply(
            `${bot.config.bot.Emojis.error} | You cannot play against yourself lol.`
        );
    }

    const VerificationEmbed = new Discord.MessageEmbed()
        .setTitle(`⚔ Connect Four Duel`)
        .setDescription(
            `${Opponent}, ${message.author} challenged you to a duel! React to this message to accpet or decline.`
        )
        .setFooter(`Canceling in 60 seconds. • ${bot.config.bot.Embed.Footer}`)
        .setColor(bot.config.bot.Embed.Color);

    const Array = [];

    for (let i = 0; i < 6; i++) {
        Array.push([null, null, null, null, null, null, null]);
    }

    const Board = Array;
    const ColLevels = [5, 5, 5, 5, 5, 5, 5];

    var UserTurn = true;
    var Winner = null;
    var LastTurnDebounce = false;

    var GameEmbed = new Discord.MessageEmbed()
        .setTitle(`**${message.author} V.S ${Opponent}**`)
        .setDescription(`${DisplayBoard(Board)}`)
        .setColor(bot.config.bot.Embed.Color)
        .setTimestamp();

    const GameMessage = await message.reply(GameEmbed);

    while (!Winner && Board.some((row) => row.includes(null))) {
        const User = UserTurn ? message.author : Opponent;
        const Sign = UserTurn ? `user` : `opponent`;

        GameEmbed = new Discord.MessageEmbed();

        await GameMessage.edit(
            GameEmbed.setTitle(
                `**${message.author.username} V.S ${Opponent.user.username}**`
            )
                .setDescription(
                    `${DisplayBoard(Board)}\n${User}, which column do you pick?`
                )
                .setFooter(
                    `Type \`end\` to forfeit. • ${bot.config.bot.Embed.Footer}`
                )
                .setColor(bot.config.bot.Embed.Color)
                .setTimestamp()
        );

        const Filter = async (response) => {
            if (response.author.id !== User.id) {
                return false;
            }

            const Choice = response.content;

            if (Choice.toLowerCase() === `end`) {
                await response.delete();

                return true;
            }

            const spot = parseInt(Choice, 10) - 1;
            await response.delete();
            return (
                Board[ColLevels[spot]] &&
                Board[ColLevels[spot]][spot] !== undefined
            );
        };
        const Turn = await message.channel.awaitMessages(Filter, {
            max: 1,
            time: 350 * 1000,
        });

        if (!Turn.size) {
            if (LastTurnDebounce) {
                Winner = `time`;
                break;
            } else {
                LastTurnDebounce = true;
                UserTurn = !UserTurn;
                continue;
            }
        }

        const Choice = Turn.first().content;

        if (Choice.toLowerCase() === `end`) {
            Winner = UserTurn ? Opponent : message.author;

            return GameMessage.edit(`${DisplayBoard(Board)}\n🎉${Winner} won!`);
        }

        const Spot = parseInt(Choice, 10) - 1;
        Board[ColLevels[Spot]][Spot] = Sign;
        ColLevels[Spot] -= 1;

        if (Winner === `time`) {
            GameMessage.edit(
                GameEmbed.setTitle(`❔ Game expired`)
                    .setDescription(DisplayBoard(Board))
                    .setFooter(
                        `Game expired due to inactivity. • ${bot.config.bot.Embed.Footer}`
                    )
            );

            return;
        }

        if (HasWon(Board)) {
            Winner = UserTurn ? message.author : Opponent;
        }

        if (LastTurnDebounce) {
            LastTurnDebounce = false;
        }

        UserTurn = !UserTurn;
    }
    GameMessage.edit(
        GameEmbed.setTitle(Winner ? `${Winner} won!` : `It's a draw!`)
            .setDescription(DisplayBoard(Board))
            .setFooter(
                `${message.author} V.S. ${Opponent} • ${bot.config.bot.Embed.Footer}`
            )
    );
}),
    (exports.config = {
        name: `ConnectFour`,
        description: `Play a game of ConnectFour with me or mention someone to play with!`,
        aliases: [`cf`],
        usage: `<optional user>`,
        category: `🎲Games🎲`,
        bot_permissions: [
            `SEND_MESSAGES`,
            `READ_MESSAGE_HISTORY`,
            `EMBED_LINKS`,
            `VIEW_CHANNEL`,
        ],
        member_permissions: [],
        enabled: true,
        cooldown: 60,
    });

const Discord = require("discord.js");

const Numbers = [
  "1⃣",
  "2⃣",
  "3⃣",
  "4⃣",
  "5⃣",
  "6⃣",
  "7⃣",
  "🔚"
]

const GenerateBoard = () => {
  const Array = []

  for (let i = 0; i < 6; i++){
    Array.push([null, null, null, null, null, null, null, null])
  }

  return Array
}

const CheckLine = (a, b, c, d) => {
  return (a !== null) && (a === b) && (a === c) && (a === d)
}

const HasWon = (board) => {
  for (let b = 0; b < 3; b++){
    for (let bb = 0; bb < 7; bb++){
      if (CheckLine(board[b][bb], board[b + 1][bb], board[b + 2][bb], board[b + 3][bb])){
        return board[b][bb]
      }
    }
  }

  for (let b = 0; b < 6; b++){
    for (let bb = 0; bb < 4; bb++){
      if (CheckLine(board[b][bb], board[b][bb + 1], board[b][bb + 2], board[b][bb + 3])){
        return board[b][bb]
      }
    }
  }

  for (let b = 0; b < 3; b++){
    for (let bb = 0; bb < 4; bb++){
      if (CheckLine(board[b][bb], board[b + 1][bb + 1], board[b + 2][bb + 2])){
        return board[b][bb]
      }
    }
  }

  for (let b = 3; b < 6; b++){
    for (let bb = 0; bb < 4; bb++){
      if (CheckLine(board[b][bb], board[b - 1][bb + 1], board[b - 2][bb + 2], board[b - 3][bb + 3])){
        return board[b][bb]
      }
    }
  }

  return null
}

const DisplayBoard = (board) => {
  const Map = board.map(row => row.map(turn => {
    if (turn === "user"){
      return "🟡"
    } else if (turn === "opponent"){
      return "🔴"
    }

    return "⚪"
  }).join("")).join("\n")

  return Map
}

exports.run = async (Bot, message, Arguments) => {
  const Opponent = message.mentions.members.first() || message.guild.members.cache.get(Arguments[0])

  if (!Arguments) {
    return message.channel.send("This command doesn't support API yet. Please mention someone to challenge.")
  }

  if (Opponent.user.bot) {
    return message.channel.send("That user is a bot lol.")
  }

  if (Opponent.user.id === message.author.id) {
    return message.channel.send("You cannot play against yourself lol.")
  }

  try {
    const VerificationEmbed = new Discord.MessageEmbed()
      .setTitle("Convermination Prompt")
      .setDescription(`${Opponent}, do you accept this challenge?`)
      .setFooter("Canceling in 60 seconds.")

    const VerificationMessage = await message.channel.send(VerificationEmbed)
    const Emoji = await Bot.PromptMessage(VerificationMessage, Opponent.user, ["✅", "❌"], 60)

    if (Emoji === "❌") {
      await VerificationMessage.delete()

      return message.channel.send(`${Opponent} doesn't want to play. What a noob!`)
    } else if (Emoji === "✅") {
      await VerificationMessage.delete()

      const Board = GenerateBoard()
      const ColLevels = [5, 5, 5, 5, 5, 5, 5]

      var UserTurn = true
      var Winner

      const GameMessage = await message.channel.send(`${DisplayBoard(Board)}\nLoading reactions. Please wait...`)

      for (const emoji of Numbers) {
        try {
          await GameMessage.react(emoji)
        } catch (err) {
          GameMessage.edit("Error occured!")
        }
      }

      GameMessage.edit(`${DisplayBoard(Board)}\nLoading comeplete!`)

      while (!Winner && Board.some(row => row.includes(null))){
        const User = UserTurn ? message.author : Opponent
        const Sign = UserTurn ? "user" : "opponent"

        const Filter = (reaction, user) => Numbers.includes(reaction.emoji.name) && user.id === User.id
        const ReactionCollector = GameMessage.createReactionCollector(Filter, {
          time: 600 * 1000
        })

        ReactionCollector.on("collect", async (reaction) => {
          reaction.users.remove(message.author)

          if (reaction.emoji.name) {
            if (reaction.emoji.name === Numbers[11]) {
              // TODO: Add end button
            } else if (Numbers[reaction.emoji.name]) {
              const number = Number.parseInt(Numbers[reaction.emoji.name], 10) - 1
              Board[ColLevels[number]][number] = Sign
              ColLevels[number] -= 1

              if (HasWon(Board)) {
                winner = UserTurn ? message.author : Opponent
              }

              UserTurn = !UserTurn
            } else {
              return
            }
          }
        })

        ReactionCollector.on("end", () => {
          if (GameMessage.deleted) {
            return
          }

          GameMessage.reactions.removeAll()
          winner = UserTurn ? Opponent : message.author
          GameMessage.edit(`Game ended because of inactivity. ${winner} won!`)
        })
      }

      message.channel.send(Winner ? `Congrats, ${Winner}. You won!` : "It's a draw!")
    }
  } catch (err){
    console.error(err)
    message.channel.send("Uh oh! An error occured.")
  }
},

  exports.config = {
    name: "ConnectFour",
    description: "Play a game of ConnectFour with me or mention someone to play with!",
    aliases: ["cf"],
    usage: "<optional user>",
    category: "🎲games🎲",
    bot_permissions: ["SEND_MESSAGES", "READ_MESSAGE_HISTORY", "EMBED_LINKS", "VIEW_CHANNEL"],
    member_permissions: [],
    enabled: true,
    cooldown: 60
  }
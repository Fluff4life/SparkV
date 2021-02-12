const { readdir } = require("fs")

module.exports = async (Bot) => {
readdir("../commands/", (err, cats) => {
    cats.forEach(cat => {
      Bot.categories.set(cat, cat)
  
      readdir(`../commands/${cat}`, (err, files) => {
        files.forEach(file => {
          if (!file.endsWith(".js")) {
            return
          }
  
          let FileJs = require(`../commands/${cat}/${file}`)
          let commandname = file.split(".")[0]
  
          Bot.commands.set(commandname, FileJs)
  
          if (process.env.ConsoleLog || false) {
            console.log(`✅Successfully loaded command: ${commandname}!`)
          }
        })
      })
    })
  })
}
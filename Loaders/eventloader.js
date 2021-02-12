const { readdir } = require("fs")

module.exports = async (Bot) => {
readdir("../events/", (err, files) => {
    if (err) {
      return console.log(`Error! ${err}`)
    }
  
    files.forEach(file => {
      let FileEvent = require(`../events/${file}`)
      let EventName = file.split(".")[0]
  
      if (process.env.ConsoleLog || false){
        console.log(`✅Successfully loaded Event ${EventName}`)
      }
  
      Bot.on(EventName, (...args) => FileEvent.run(Bot, ...args))
    })
  })
}
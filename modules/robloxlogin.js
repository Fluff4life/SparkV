const noblox = require("noblox.js");

module.exports = bot => {
  noblox
    .setCookie(process.env.RobloxBotCookie)
    .then(function() {
      // Idk do somthing lol
    })
    .catch(function(err) {
      console.log("Failed to log into Roblox account.");
      process.exit(1);
    }); 
};

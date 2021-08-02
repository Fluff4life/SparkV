const Discord = require('discord.js');
const Express = require('express');

const Router = Express.Router();

const CheckAuth = require('../../utils/CheckAuth');
const Render = require('../../utils/Render');

Router.get('/', CheckAuth, (request, response) => {
  const MainEmbed = new Discord.MessageEmbed()
    .setTitle('User Logged Out')
    .setDescription(`**${request.user.username}${`#${request.user.discriminator}`}** just logged Out.`)
    .setFooter(`Ch1ll Notifier | ${request.user.username}${`#${request.user.discriminator}`}`)
    .setColor('RED');

  MainWebhook.send({
    username: 'Ch1ll Notifier',
    avatarURL: `https://cdn.discordapp.com/avatars/${request.user.id}/${request.user.avatar}.png?size=1024`,
    embeds: [MainEmbed],
  });

  request.session.destroy(() => {
    request.logout();
    response.redirect('/home');
  });
});

module.exports = Router;

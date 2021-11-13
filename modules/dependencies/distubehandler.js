const Discord = require("discord.js");
const EasyPages = require("discordeasypages");

module.exports = async bot => {
	const { DisTube, Queue } = require("distube");
	const { SpotifyPlugin } = require("@distube/spotify");
	const { SoundCloudPlugin } = require("@distube/soundcloud");

	bot.distube = new DisTube(bot, {
		searchSongs: 20,
		searchCooldown: 30,
		leaveOnFinish: true,
		leaveOnEmpty: true,
		leaveOnStop: true,
		plugins: [new SpotifyPlugin(), new SoundCloudPlugin()],
		youtubeDL: true,
		updateYouTubeDL: true,
	});

	bot.distube
		.on("playSong", async (queue, song) => {
			let NowPlayingEmbed = new Discord.MessageEmbed()
				.setTitle(`${bot.config.emojis.music} | Now Playing ${song.playlist?.name || song.name} by ${song.uploader.name}`)
				.setURL(song.url)
				.setImage(song.playlist?.thumbnail || song.thumbnail)
				.addField("`👍` Likes", `\`${bot.functions.formatNumber(song.likes)}\``, true)
				.addField("`👎` Dislikes", `\`${bot.functions.formatNumber(song.dislikes)}\``, true)
				.addField("`⏳` Duration", `\`${song.formattedDuration}\``, true)
				.addField("`🔉` Volume", `\`${queue.volume}%\``, true)
				.addField("`🔁` Loop", `\`${queue.repeatMode ? (queue.repeatMode === 2 ? "Server Queue" : "Current Song") : "`❎`"}\``, true)
				.addField("`🔂` AutoPlay", `\`${queue.autoplay ? "`✅`" : "`❎`"}\``, true)
				.setColor(bot.config.embed.color)
				.setTimestamp();

			if (song.playlist) {
				NowPlayingEmbed = NowPlayingEmbed
					.setFooter(`${song.user.tag} • (${song.playlist.songs.length} songs) - Now Playing ${song.name} • ${bot.config.embed.footer}`, song.user.displayAvatarURL());
			} else {
				NowPlayingEmbed = NowPlayingEmbed
					.setFooter(`Requested by ${song.user.tag} • ${bot.config.embed.footer}`, song.user.displayAvatarURL());
			}

			queue.textChannel.send({
				embeds: [NowPlayingEmbed],
			});
		})
		.on("addSong", async (queue, song) => {
			const SongAddedQueue = new Discord.MessageEmbed()
				.setTitle(`${bot.config.emojis.music} | Added Song To Queue`)
				.setDescription(song.name)
				.setImage(playlist.thumbnail)
				.addField("`👍` Likes", `\`${bot.functions.formatNumber(song.likes)}\``, true)
				.addField("`👎` Dislikes", `\`${bot.functions.formatNumber(song.dislikes)}\``, true)
				.addField("`⏳` Duration", `\`${song.formattedDuration}\``, true)
				.addField("`🔉` Volume", `\`${queue.volume}%\``, true)
				.addField("`🔁` Loop", `\`${queue.repeatMode ? (queue.repeatMode === 2 ? "Server Queue" : "Current Song") : "`❎`"}\``, true)
				.addField("`🔂` AutoPlay", `\`${queue.autoplay ? "`✅`" : "`❎`"}\``, true)
				.setURL(song.url)
				.setColor(bot.config.embed.color)
				.setFooter(`Requested by ${song.user.tag} • ${bot.config.embed.footer}`, song.user.displayAvatarURL())
				.setTimestamp();

			queue.textChannel.send({
				embeds: [SongAddedQueue]
			});
		})
		.on("addList", async (queue, playlist) => {
			const SongAddedQueue = new Discord.MessageEmbed()
				.setTitle(`${bot.config.emojis.music} | Added Playlist To Queue`)
				.setDescription(playlist.name)
				.setImage(playlist.thumbnail)
				.addFields(
					{
						name: `⚙︱Audio Stats`,
						value: `\`\`\`👍︱Likes: ${bot.functions.formatNumber(
							song.likes,
						)}\n👎︱Dislikes: ${bot.functions.formatNumber(
							song.dislikes,
						)}\n▶︱Views: ${bot.functions.formatNumber(song.views)}\n📼︱Duration: ${
							song.formattedDuration
						}\`\`\``,
						inline: true,
					},

					{
						name: `🔊︱Audio Settings`,
						value: `\`\`\`🔉︱Volume: ${queue.volume}%\n🔁︱Loop: \`${
							queue.repeatMode ? (queue.repeatMode === 2 ? "Server Queue" : "Current Song") : "❎"
						}\n🔂︱AutoPlay: ${queue.autoplay ? "✅" : "❎"}\`\`\``,
						inline: true,
					},
				)
				.setURL(song.url)
				.setColor(bot.config.embed.color)
				.setFooter(
					`📼 ${song.user.username} (${song.user.tag}) • ${bot.config.embed.footer}`,
					bot.user.displayAvatarURL(),
				)
				.setTimestamp();

			queue.textChannel.send(SongAddedQueue);
		})
		.on("searchResult", (message, results) => {
			try {
				const Pages = [];

				const CreatePage = Song => {
					const NewEmbed = new Discord.MessageEmbed()
						.setTitle(`${Song.formattedDuration} | ${Song.name}`)
						.setColor(bot.config.embed.color)
						.setURL(Song.url)
						.setImage(Song.thumbnail);

					Pages.push(NewEmbed);
				};

				results.map(song => CreatePage(song));

				EasyPages(
					message,
					Pages,
					["⬅", "➡"],
					"⚡ - To select this song, send the current page number. For example, to select page 1 send 1.",
				);
			} catch (err) {
				console.error(err);
			}
		})
		.on("searchDone", (message, answer, query) => {})
		.on("searchCancel", async message => await message.replyT(`Searching canceled.`))
		.on("searchInvalidAnswer", async message =>
			await message.replyT(
				"Search answer invalid. Make sure you're sending your selected song's page number. For example, if I wanted to play a song on the 5th page, I would send the number 5.",
			),
		)
		.on("searchNoResult", async message => await message.replyT("No result found!"))
		.on("finish", queue => queue.textChannel.send("No songs left in queue."))
		.on("noRelated", async message =>
			await message.replyT("I cannot find a related video to play. I am stopping the music."),
		)
		.on("empty", queue => queue.textChannel.send("Voice chat is empty. I'm going to leave the voice chat now."))
		.on("disconnect", queue => queue.textChannel.send("Disconnected from voice chat."))
		.on("error", (channel, err) => {
			console.error(err);

			channel.textChannel?.send(`❎︱Uh oh! An error occured. Please try again later. ${err}`);
		});
};

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
	});

	bot.distube
		.on("playSong", async (queue, song) => {
			let NowPlayingEmbed = new Discord.MessageEmbed()
				.setURL(song.url)
				.setColor(bot.config.embed.color)
				.setTimestamp();

			if (song.playlist) {
				NowPlayingEmbed = NowPlayingEmbed
					.setTitle(`🎵 Now Playing a Playlist 🎵`)
					.setDescription(song.playlist.name)
					.setThumbnail(song.playlist.thumbnail.url)
					.addField("`<:members:852268403934101535>` Creator", `\`${song.playlist.uploader}\``, true)
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
					.setFooter(
						`📼 ${song.user.username} (${song.user.tag}) • (${song.playlist.songs.length} songs) - Now Playing ${song.name} • ${bot.config.embed.footer}`,
						bot.user.displayAvatarURL(),
					);
			} else {
				NowPlayingEmbed = NowPlayingEmbed
					.setTitle(`🎵 Now Playing a Song 🎵`)
					.setDescription(song.name)
					.setThumbnail(song.thumbnail)
					.addField("<:members:852268403934101535> Creator", `\`${song.uploader}\``, true)
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
							value: `\`\`\`🔉︱Volume: ${queue.volume}%\n🔁︱Loop: ${
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
			}

			queue.textChannel.send({
				embeds: [NowPlayingEmbed],
			});
		})
		.on("addSong", async (queue, song) => {
			const SongAddedQueue = new Discord.MessageEmbed()
				.setTitle("➕ Added Song To Queue")
				.setDescription(song.name)
				.setThumbnail(song.thumbnail)
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
					`📼 Added by ${song.user.username} (${song.user.tag}) • ${bot.config.embed.footer}`,
					bot.user.displayAvatarURL(),
				)
				.setTimestamp();

			queue.textChannel.send(SongAddedQueue);
		})
		.on("addList", async (queue, playlist) => {
			const SongAddedQueue = new Discord.MessageEmbed()
				.setTitle("➕ Added Playlist To Queue")
				.setDescription(playlist.name)
				.setThumbnail(playlist.thumbnail)
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
				console.log(message);
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
		.on("searchDone", (message, answer, query) => {
			console.log(message, answer, query);
		})
		.on("searchCancel", async message => await message.replyT(`Searching canceled.`))
		.on("searchInvalidAnswer", message =>
			message.replyT(
				"Search answer invalid. Make sure you're sending your selected song's page number. For example, if I wanted to play a song on the 5th page, I would send the number 5.",
			),
		)
		.on("searchNoResult", async message => await message.replyT("No result found!"))
		.on("finish", queue => queue.textChannel.send("No songs left in queue."))
		.on("finishSong", queue => queue.textChannel.send("Hope you enjoyed the song!"))
		.on("noRelated", message =>
			message.replyT("I cannot find a related video to play. I am stopping the music."),
		)
		.on("empty", queue => queue.textChannel.send("Voice chat is empty. I'm going to leave the voice chat now."))
		.on("disconnect", queue => queue.textChannel.send("Disconnected from voice chat."))
		.on("error", (channel, err) => {
			console.error(err);

			channel.textChannel?.send(`❎︱Uh oh! An error occured. Please try again later. ${err}`);
		});
};

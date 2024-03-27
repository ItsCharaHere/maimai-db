
const getRatingLabel = require("./../Helpers/getRatingLabel.js");
const getTagsStringified = require("./../Helpers/getTagsStringified.js");
const getSearchArguments = require("./../Helpers/getSearchArguments.js");
const getVersionAndUsers = require("./../Helpers/getVersionAndUsers.js");
const handleDbLogReply = require("./../Helpers/handleDbLogReply.js");
const handleSetPresence = require("./../Helpers/handleSetPresence.js");
const handlePageButtons = require("./../Helpers/handlePageButtons.js");
const handleApiCalls = require("./../Helpers/handleApiCalls.js");
const grpc = require('@grpc/grpc-js');
const Secrets = require("./../Secrets/secrets.js");
const { SearchArgs, Constants, Commands, GameVersion, Locale, Ranks, CommandMai } = require("./../constants.js");
const { IntentsBitField, AttachmentBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ActivityType } = require('discord.js');




async function maiUser(game, msg, increment = 0, cache = null){
	
	
	
	getCardAsync(game, msg, cache, increment);
	
}



async function getCardAsync(game, msg, cache, increment = 0){
	let queryLog = ``;
	card = msg.content.substring(9)
	proto = handleApiCalls("cards","cards")
	
	try {
	var client = new proto.Cards(Secrets.MYTHOS,grpc.credentials.createSsl());
	} catch {
		msg.reply("Oops! The administrator has not set up Mythos API support yet, please contact your local dev!")
		return;
	}
	const requestMetadata = new grpc.Metadata();
	requestMetadata.add('Authorization', `${Secrets.MYTHOS_API}`)

	client.Lookup({access_code:card, titles:["maimai"]}, requestMetadata, async function(err, response) {
		try {
		title = response.titles[0].title_api_id
		msg.reply("your maimai title id is: " + title)
		
		} catch {
			console.log(err)
			msg.reply("Oops! Something went wrong! please contact your local dev!")
			return;
		}
		
		return 
	
	
	if (cache == null){
		cache = new SearchArgs();
		cache.command = CommandMai.LEADERBOARD;
		cache.page = 0;
		cache.game_version = userParams.version.id;
		cache.diff_version = userParams.version.id;
		cache.userParams = userParams;
		game.requestsCache[msg.author.id] = cache;


	
		

		

		handleSetPresence(game.discord, users.length);
		let cached_users = [];
		for (var i = 0; i < users.length; i++){
			let user = users[i];
			if (cached_users[user.user_name] == undefined){
				let username = user.user_name
				cached_users[user.user_name] = username;
			}
		}

		cache.users = users;
		cache.cached_users = cached_users;

		if (cache.users == null){
			cache.users = [];
		}
	}

	let last_page = Math.floor(cache.users.length / Constants.DefaultPageSize);
	if (cache.users.length % Constants.DefaultPageSize == 0 && cache.users.length > 0){
		last_page --;
	}
	cache.page += increment;
	cache.page = Math.min(last_page, Math.max(0, cache.page));

	let msgTitle = `🏅 - Mythos Rating Leaderboards`;
	let description = ``;
	let userCount = 0;
	
		for (var i = 0; i < Constants.DefaultPageSize; i++)
		{
			var index = i + cache.page * Constants.DefaultPageSize;
			if (index >= cache.users.length){
				break;
			}

			let user = cache.users[index];
			let rating_cur = user.player_rating;
			userCount++;

			

			let ratingLabel = getRatingLabel(rating_cur, "maimai");
			let submitted = user.scores_submitted == null ? 0 : user.scores_submitted;
			description += `${cache.page * Constants.DefaultPageSize + i + 1}. \`${cache.cached_users[user.user_name]}\`  Mythos Rating: ${ratingLabel.label}\n`;
		}

		let pre_description = `Viewing the current Mythos leaderboards. Type \`${Constants.PrefixMai}stats <@user>\` for a more detailed summary of that user. (UNFINISHED)\n`;
		pre_description += `- Displaying \`${userCount} user${userCount === 1 ? '' : 's'}\` out of ${cache.users.length} result${cache.users.length === 1 ? '' : 's'}\n`;

		// if (cache.game_version == game.game_version){
		if (userParams.version.id == game.game_version){
			pre_description += `- Version: \`FESTiVAL PLUS (Mythos)\`\n`;
		} else {
			pre_description += `- Version: \`FESTiVAL PLUS\`\n`;
		}

		pre_description += `- Leaderboards: \`${getTagsStringified(Locale, userParams.locale.id)}\`\n\n`;
		description = `${pre_description}${description}`;
	

	const embed = new EmbedBuilder()
		.setTitle(msgTitle) // TODO: CLEAN
		.setColor(0xEEEEEE)
		.setDescription(description)
		.setFooter({text: `${Constants.FooterMessage} \nPage ${cache.page + 1} / ${last_page + 1}`});

	let content = { embeds: [embed], allowedMentions: { repliedUser: false }};
	handlePageButtons(content, cache.page, last_page);

	if (cache.message == null){
		cache.message = msg;
		handleDbLogReply(queryLog, msg, game);
		msg.reply(content);
	} else {
		msg.edit(content);
	}
});
}

module.exports = maiUser;

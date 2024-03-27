
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




async function maiRaputa(game, msg, increment = 0, cache = null){
	
	
	await callRaputaAsync(game, msg, cache, increment);
	
}



async function callRaputaAsync(game, msg, cache, userParams, increment = 0){
	let queryLog = ``;
	code = msg.content.substring(9)
	proto2 = handleApiCalls("cards","cards")
	proto = handleApiCalls("maimai","user")
	


	try {
		var client2 = new proto2.Cards(Secrets.MYTHOS,grpc.credentials.createSsl());
		} catch {
			msg.reply("2Oops! The administrator has not set up Mythos API support yet, please contact your local dev!")
			return;
		}
		const requestMetadata = new grpc.Metadata();
		requestMetadata.add('Authorization', `${Secrets.MYTHOS_API}`)
	
		client2.Lookup({access_code:code, titles:["maimai"]}, requestMetadata, async function(err, response) {
			try {
			title = response.titles[0].title_api_id
			console.log(code + " title id " + title)
			
			} catch {
				console.log(err)
				msg.reply("Oops! You need a 20 Digit Access Code!")
				return;
			}
		

				try {
				var client = new proto.MaimaiUser(Secrets.MYTHOS,grpc.credentials.createSsl());
				} catch {
					msg.reply("Oops! The administrator has not set up Mythos API support yet, please contact your local dev!")
					return;
				}
				const requestMetadata = new grpc.Metadata();
				requestMetadata.add('Authorization', `${Secrets.MYTHOS_API}`)

				client.RedeemCode({"profile_api_id":title, "redemption_code":"12225511066659101042"}, requestMetadata, async function(err, response) {
					try {
					console.log("Api ID:" + title)
					msg.reply("Success(?)")
					} catch {
						msg.reply("Oops! Something went wrong! please contact your local dev!")
						return;
					}
					return
		})
})
}					


module.exports = maiRaputa;

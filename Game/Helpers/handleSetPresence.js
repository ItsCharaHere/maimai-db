const { ActivityType } = require('discord.js');
const { Constants } = require("./../constants.js");

function handleSetPresence(client, users){
  client.user.setPresence({
    activities: [{
        name: `${Constants.PrefixGeneral}help (${users} users)`,
        type: ActivityType.Playing,
    }],
    status: `${Constants.PrefixGeneral}help`
  });
}

module.exports = handleSetPresence;

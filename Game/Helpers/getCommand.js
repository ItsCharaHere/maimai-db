const { Commands, Constants, CommandMai } = require("./../constants.js");

function getCommand(str){
	str = str.substring(Constants.PrefixGeneral.length);
	console.log(str)
	let result = null;
	Object.values(Commands | CommandMai).forEach(command => {
		if (result == null){
			
			if (str.toLowerCase().substring(0, command.prefix.length) == command.PrefixGeneral || command.PrefixMai || command.PrefixGeki || command.PrefixChuni){
				result = command;
			}
		}
	});
  return result;
}

module.exports = getCommand;

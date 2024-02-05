const { Commands, Constants, CommandMai, CommandChuni, CommandGeki } = require("./../constants.js");

function getCommand(str){
	var prefix = str.substring(0, 2)
	str = str.substring(Constants.PrefixGeneral.length);
	console.log(str)
	
	let result = null;
	switch (prefix){
		case Constants.PrefixMai:
			Object.values(CommandMai).forEach(command => {
				if (result == null){

					if (str.toLowerCase().substring(0, command.prefix.length) == command.prefix){
						result = command;
						
					}
				}
			});
			break;
		case Constants.PrefixGeneral:
			Object.values(Commands).forEach(command => {
				if (result == null){

					if (str.toLowerCase().substring(0, command.prefix.length) == command.prefix){
						result = command;
					}
				}
			});
			break;
		case Constants.PrefixGeki:
			Object.values(CommandGeki).forEach(command => {
				if (result == null){

					if (str.toLowerCase().substring(0, command.prefix.length) == command.prefix){
						result = command;
					}
				}
			});
			break;
		case Constants.PrefixChuni:
		Object.values(CommandChuni).forEach(command => {
			if (result == null){

				if (str.toLowerCase().substring(0, command.prefix.length) == command.prefix){
					result = command;
				}
			}
		});
		break;
	}
	
  return result;
}

module.exports = getCommand;

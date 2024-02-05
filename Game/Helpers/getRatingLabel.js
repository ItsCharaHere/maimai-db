const { MaimaiRanks, OngekiRanks } = require("./../constants.js");

function getRatingLabel(ranking, game){
	
	switch (game){
		case "ongeki":
			var rankColor = OngekiRanks.UNRANKED;
			Object.values(OngekiRanks).forEach(rank => {
				if (ranking >= rank.requirement){
					rankColor = rank;
				}
			});
			return {label: `\`${ranking.toString().padEnd(5,"0")} ${rankColor.suffix}\``, rankColor: rankColor};
		case "maimai":
			var rankColor = MaimaiRanks.UNRANKED;
			Object.values(MaimaiRanks).forEach(rank => {
				if (ranking >= rank.requirement){
					rankColor = rank;
				}
			});
			return {label: `\`${Math.floor(ranking)} ${rankColor.suffix}\``, rankColor: rankColor};
	}
	
}

module.exports = getRatingLabel;

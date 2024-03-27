const grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
path = require('path')

function handleApiCalls(game, proto){
	var PROTO_PATH = path.join(__dirname + `\\..\\Secrets\\proto\\mythos\\${game}\\v0\\${proto}.proto`);
	var protos = [PROTO_PATH, "D:\\folder to stuff stuff in\\BuildingTest\\maimai-db\\Game\\Secrets\\proto\\mythos\\maimai\\v0\\common.proto","D:\\folder to stuff stuff in\\BuildingTest\\maimai-db\\Game\\Secrets\\proto\\mythos\\maimai\\v0\\playlog.proto","D:\\folder to stuff stuff in\\BuildingTest\\maimai-db\\Game\\Secrets\\proto\\mythos\\maimai\\\\playlog.proto","D:\\folder to stuff stuff in\\BuildingTest\\maimai-db\\Game\\Secrets\\proto\\mythos\\maimai\\v0\\user_playlog.proto"]

	console.log(protos)
		
	var packageDefinition = protoLoader.loadSync(
		protos,
		{keepCase: true,
		 longs: String,
		 enums: String,
		 defaults: true,
		 oneofs: true
		});
	switch (game){
		case "maimai":
			var return_proto = grpc.loadPackageDefinition(packageDefinition).mythos.maimai.v0;
			break;
		case "cards":
			var return_proto = grpc.loadPackageDefinition(packageDefinition).mythos.cards.v0;
			break;
		case "chunithm":
			var return_proto = grpc.loadPackageDefinition(packageDefinition).mythos.chunithm.v0;
			break;
		case "ongeki":
			var return_proto = grpc.loadPackageDefinition(packageDefinition).mythos.ongeki.v0;
			break;
		
	}
	return return_proto
	
}
module.exports = handleApiCalls;
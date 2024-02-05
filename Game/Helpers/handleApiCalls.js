const grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
path = require('path')

function handleApiCalls(game, proto){
	var PROTO_PATH = path.join(__dirname + `\\..\\Secrets\\proto\\mythos\\${game}\\v0\\${proto}.proto`);
		
	var packageDefinition = protoLoader.loadSync(
		PROTO_PATH,
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
		case "card":
			var return_proto = grpc.loadPackageDefinition(packageDefinition).mythos.card.v0;
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
var fs = require('fs-extra');

const path        = "../../bin/assets/";
const configPath  = "../../bin/";
const endPathUI   = "ui/library.json";
const endPathGame = "ingame/library.json";
const hd          = path + "hd/";
const md          = path + "md/";
const ld          = path + "ld/";
const BTN_SUFFIX  = "Button";
const TXT_SUFFIX = "_txt";
const PNG = ".png";

antiCachePng(hd + endPathUI);
antiCachePng(md + endPathUI);
antiCachePng(ld + endPathUI);
antiCachePng(hd + endPathGame);
antiCachePng(md + endPathGame);
antiCachePng(ld + endPathGame);

function antiCachePng(source){
	fs.readJson(configPath + 'config.json', function (err, config) {
		fs.readJson(source, function (err, flumpJson) {
			if (err){
				console.log(err);
				return;
			}
			
			for (var textureGroupIndex in flumpJson.textureGroups){
				var textureGroup = flumpJson.textureGroups[textureGroupIndex];
				
				for (var atlaseIndex in textureGroup.atlases){
					var atlase = textureGroup.atlases[atlaseIndex];
					
					if (atlase.file.indexOf(PNG) == (atlase.file.length - PNG.length)){
						atlase.file += "?" + config.version;
					}
				}
			}
			
			fs.writeJson(source, flumpJson, function(err){
				if (err){
					console.log(err);
				} else {
					console.log("antiCache cache on " + source);
				}
			});
		});
	});
}
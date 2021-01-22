const [raceStrings, creationAdj, creationLoc, creationDesc] = require("./strings");

function generateBackstory(){
	let r = raceStrings[Math.floor(Math.random()*raceStrings.length)],
		a = creationAdj[Math.floor(Math.random()*creationAdj.length)],
		l = creationLoc[Math.floor(Math.random()*creationLoc.length)],
		d = creationDesc[Math.floor(Math.random()*creationDesc.length)];
	let story = [
		"You are a " + a + " " + r + " from " +
		l + ", who " +
		d +"."
	];
	return story;
}

var expThresholds = [0, 0, 50, 69,97,137,192,268,376,527,737,1033,1446,2024,2834,3968,5556,7778,10889,15245,21343,29881,41834,58567,81994,114792,160709,224993,314991,440987,617383,864336,1210070,1694099,2371739,3320434,4648608,6508051,9111272,12755780,17858092,25001329,35001860,49002604,68603645,96045101,134463140,188248392,263547745,368966837,516553563,723174976,1012444950,1417422906,1984392034];

function formatString(str, col){
 col = typeof col === 'object' ? col : Array.prototype.slice.call(arguments, 1);
 return str.replace(/\{\{|\}\}|\{(\w+)\}/g, function(m, n){
  if(m == "{{"){
   return "{";
  }
  if(m == "}}"){
   return "}";
  }
  return col[n];
 });
}

module.exports = {formatString, generateBackstory, expThresholds};

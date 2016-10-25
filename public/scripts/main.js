$(document).ready(function() {

	let map = drawMap();
	let utils = utilsModule();
	let fetchAllRats = utils.fetchAllRats;


	$('#all-rats').click(() => fetchAllRats(map))

	$('#reset').click(clearMap)

})




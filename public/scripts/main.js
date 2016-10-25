$(document).ready(function() {

	let map = drawMap();
	let utils = utilsModule();
	let fetchAllRats = utils.fetchAllRats;
	let fetchNonPassing = utils.fetchNonPassing;

	$('#all-rats').click(() => fetchAllRats(map))
	$('#non-passing').click(() => fetchNonPassing(map))

	$('#reset').click(clearMap)

})




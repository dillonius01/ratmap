$(document).ready(function() {

	function drawmarker() {
		//
	}

	function fetch_all_rats() {
		console.log('get those rats!');

		fetch('/api/allrats')
			.then(rats => rats.json())
			.then(rats => rats.forEach(rat => console.log(rat)))
			.catch(err => console.error(err))

	}

	$('#show-rats').click(fetch_all_rats)

})




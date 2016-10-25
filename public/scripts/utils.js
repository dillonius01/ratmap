const utilsModule = () => ({

	fetchAllRats: (map) => {
		let $fetching = $('#fetching')
		$fetching.show()
		clearMap();
		fetch('/api/allrats')
			.then(inspections => inspections.json())
			.then(inspections => {
				// inspections.forEach(inspection => console.log(inspection));
				inspections.forEach(inspection => drawMarker(map, inspection));
			})
			.then(() => {
				$fetching.hide()
			})
			.catch(err => console.error(err))
	},

	fetchNonPassing: (map) => {  
    let $fetching = $('#fetching')
		$fetching.show()
		clearMap();
		fetch('/api/nonpassing')
			.then(inspections => inspections.json())
			.then(inspections => {
				inspections.forEach(inspection => drawMarker(map, inspection));
			})
			.then(() => {
				$fetching.hide()
			})
			.catch(err => console.error(err))
	}



});

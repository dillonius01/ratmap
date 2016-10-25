const utilsModule = () => ({

	fetchAllRats: (map) => {
		let $fetching = $('#fetching')
		$fetching.show()
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

	fetchStatus: (map, status) => {
    let $fetching = $('#fetching')
		$fetching.show()
		fetch('/api/status/:status')
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

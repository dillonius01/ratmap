const utilsModule = () => ({

	fetchAllRats: (map) => {
		// console.log('get those rats!');
		fetch('/api/allrats')
			.then(inspections => inspections.json())
			.then(inspections => {
				// inspections.forEach(inspection => console.log(inspection))
				inspections.forEach(inspection => drawMarker(map, inspection));
			})
			.catch(err => console.error(err))
	}

});

function drawMap() {
    let mapCenter = new google.maps.LatLng(40.7484405,-73.9878531);
    let mapOptions = {
        center: mapCenter,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    let map_canvas_obj = document.getElementById("map-canvas");
    return new google.maps.Map(map_canvas_obj, mapOptions);
}


function drawMarker(map, inspection) {
    let lng = +inspection.longitude;
    let lat = +inspection.latitude;
    let markerLocation = new google.maps.LatLng(lat, lng);

    let newMarker = new google.maps.Marker({
        position: markerLocation,
        title: inspection.street_name
    })

    newMarker.setMap(map)
}

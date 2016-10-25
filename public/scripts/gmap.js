/* global google */

let markers = [];

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


function createInfoBox(inspection) {
  let contentString = `
    <div>
      <h4>${inspection.house_number} ${inspection.street_name}</h4>
      <p>Status: ${inspection.result}</p>
      <p>Inspection Date: ${inspection.inspection_date}</p>
    </div>
  `;
  return new google.maps.InfoWindow({
    content: contentString
  })
}


function drawMarker(map, inspection) {
  let iconURLs = {
    'Active Rat Signs': '/images/purple-sm.png',
    'Problem Conditions': '/images/red-sm.png',
    'Passed Inspection': '/images/green-sm.png',
    'Bait applied': '/images/yellow-sm.png',
    'Monitoring visit': '/images/gray-sm.png',
    'Cleanup done': '/images/pink-sm.png'
  };

  let lng = +inspection.longitude;
  let lat = +inspection.latitude;
  let markerLocation = new google.maps.LatLng(lat, lng);
  let icon = iconURLs[inspection.result];


  let newMarker = new google.maps.Marker({
      position: markerLocation,
      title: inspection.street_name,
      icon: icon
  })

  let infoBox = createInfoBox(inspection);

  newMarker.addListener('click', () => {
    infoBox.open(map, newMarker)
  });


  markers.push(newMarker);

  newMarker.setMap(map)
}

function clearMap() {
  for (let marker of markers) {
    marker.setMap(null)
  }
  markers = [];
}


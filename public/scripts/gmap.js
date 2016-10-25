/* global google */

let markers = [];

// styling by PiS map contact
// https://snazzymaps.com/style/28444/pis-map-contact
function drawMap() {
  let mapCenter = new google.maps.LatLng(40.7484405,-73.9878531);
  let mapOptions = {
    center: mapCenter,
    zoom: 12,
    styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#424b5b"},{"weight":2},{"gamma":"1"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"weight":0.6},{"color":"#545b6b"},{"gamma":"0"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#545b6b"},{"gamma":"1"},{"weight":"10"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#666c7b"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#545b6b"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#424a5b"},{"lightness":"0"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#666c7b"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2e3546"}]}]
  };

  let map_canvas_obj = document.getElementById("map-canvas");
  return new google.maps.Map(map_canvas_obj, mapOptions);
}


function createInfoBox(inspection) {
  let contentString = `
    <div>
      <h4>${inspection.house_number} ${inspection.street_name}</h4>
      <p>Status: ${inspection.result}</p>
      <p>Inspection Date: ${inspection.inspection_date.slice(0,10)}</p>
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


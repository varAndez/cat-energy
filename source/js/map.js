function initMap() {
  var coordinates = { lat: 59.938835, lng: 30.323112 },

    map = new google.maps.Map(document.getElementById('.contacts__map'), {
      center: coordinates
    });
}

function initMap() {
  var coordinates = { lat: 59.938835, lng: 30.323112 },

    map = new google.maps.Map(document.getElementById('.contacts__map'), {
      center: coordinates
    }),

    marker = new google.maps.Marker({
      position: coordinates,
      map: map
    });

  image = 'img/map-pin.png',
    marker = new google.maps.Marker({
      position: coordinates,
      map: map,
      icon: image
    });
}

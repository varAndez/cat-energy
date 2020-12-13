{
  function initMap() {

    const uluru = { lat: 59.939033513366084, lng: 30.32128792141334 };
    const markerPos = { lat: 59.938753982836836, lng: 30.32304743616715 };
    const markerIcon = './img/map-pin.png';

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 16,
      center: uluru,
      disableDefaultUI: true,
    });

    const marker = new google.maps.Marker({
      position: markerPos,
      map: map,
      icon: markerIcon,
    });
  }
}

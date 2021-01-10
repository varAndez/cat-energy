// nav

var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');
navMain.classList.remove('main-nav--no-js');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});


// map


function initMap() {

  var uluru = { lat: 59.939033513366084, lng: 30.32128792141334 };
  var markerPos = { lat: 59.938753982836836, lng: 30.32304743616715 };
  var markerIcon = './img/map-pin.png';

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: uluru,
    disableDefaultUI: true,
  });

  var marker = new google.maps.Marker({
    position: markerPos,
    map: map,
    icon: markerIcon,
  });
}


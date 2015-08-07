// init map
var myOptions = {
  mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    
// init directions service
var dirService = new google.maps.DirectionsService();
var dirRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});
dirRenderer.setMap(map);

// highlight a street
var request = {
  origin: "via Augusto Righi 2 Bologna",
  destination: "via Augusto Righi 60 Bologna",
  //waypoints: [{location:"48.12449,11.5536"}, {location:"48.12515,11.5569"}],
  travelMode: google.maps.TravelMode.WALKING
};
dirService.route(request, function(result, status) {
  if (status == google.maps.DirectionsStatus.OK) {
    dirRenderer.setDirections(result);
  }
});
//key=AIzaSyC-Fpf_GKLqXpTkMiZGMvIfwbRE7YzJt3o
function loadAPI(){
    var script = document.createElement("script");
    script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=getLocation";
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
}

//script di geolocalizzazione

var x = document.getElementById("mapholder");

//ottiene la posizione corrente
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

//determino le dimensioni della finestra
function getViewportDimension() {
	var e = window, a = 'inner';
	if (!( 'innerWidth' in window )) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	return {w:e[a + 'Width'], h:e[a + 'Height']};
}

//initialize geocoder
function initialize() {
    geocoder = new google.maps.Geocoder();
  }

//viene visualizzata la mappa centrata nella posizione corrente con marker
//la posizione corrente viene salvata nella local storage
function showPosition(position) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;
	var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	
	var dim = getViewportDimension();       

	//senza marker
    //var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="
    //+latlon+"&zoom=18&size="+dim.w+"x"+dim.h+";
    
    //con marker e implicit positioning
	dim.h = dim.h - document.getElementById("header_page2").offsetHeight;
    var img_url = "http://maps.googleapis.com/maps/api/staticmap?zoom=18&size="
	+dim.w+"x"+dim.h+"&sensor=true&markers=icon:http://bcnmes.com/wp-content/blogs.dir/4/files/leaflet-maps-marker-icons/_vegetarian.png|"+latlon;	
//	+dim.w+"x"+dim.h+"&sensor=true&markers=icon:icon/veg.png|"+latlon;	

	//fa vedere la mappa più zoommata
//	dim.w = Math.round(dim.w/2);
//	dim.h = Math.round(dim.h/2)-23;
//	var img_url = "http://maps.googleapis.com/maps/api/staticmap?zoom=17&size="
//	+dim.w+"x"+dim.h+"&scale=2&sensor=true&markers=color:blue|label:C|"+latlon;

    
    document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
//	$("#preloader").addClass(".nascosto");
    
    //show address
    initialize()
    
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
		console.log(results)
        if (results[1]) {
        
         //fa vedere solo la via
         var via = results[0].formatted_address.substring(0, results[0].formatted_address.indexOf(","));

		//funzione che esegue il parcheggio
         park(via);

//		 //formatted address
//		 alert(results[0].formatted_address)                 
//       //find country name
//            for (var i=0; i<results[0].address_components.length; i++) {
//           for (var b=0;b<results[0].address_components[i].types.length;b++) {
//
//           //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
//               if (results[0].address_components[i].types[b] == “administrative_area_level_1”) {
//                   //this is the object you are looking for
//                   city= results[0].address_components[i];
//                   break;
//               }
//           }
//       }
//       //city data
//       alert(city.short_name + “ “ + city.long_name)


        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
    
    
    
    
    
    
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}


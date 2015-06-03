/*
 * Copyright © 2012-2015, Intel Corporation. All rights reserved.
 * Please see the included README.md file for license terms and conditions.
 */


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false, app:false, dev:false */
/*global myEventHandler:false, cordova:false, device:false */



window.app = window.app || {} ;         // there should only be one of these...



// Set to "true" if you want the console.log messages to appear.
app.LOG = app.LOG || false ;

app.consoleLog = function() {           // only emits console.log messages if app.LOG != false
    if( app.LOG ) {
        var args = Array.prototype.slice.call(arguments, 0) ;
        console.log.apply(console, args) ;
    }
} ;

//** global variables per parcheggio
var via,
	nomeVia,
	numVia,
	via_id; 

const testoBottoneNonValido = "Selezionare una via";

// App init point (runs on custom app.Ready event from init-dev.js).
// Runs after underlying device native code and webview/browser is ready.
// Where you should "kick off" your application by initializing app events, etc.

// NOTE: Customize this function to initialize your application, as needed.

app.initEvents = function() {
    "use strict" ;
    var fName = "app.initEvents():" ;
    app.consoleLog(fName, "entry") ;

    // NOTE: initialize your third-party libraries and event handlers

    // initThirdPartyLibraryNumberOne() ;
    // initThirdPartyLibraryNumberTwo() ;
    // initThirdPartyLibraryNumberEtc() ;

    // NOTE: initialize your application code

    // initMyAppCodeNumberOne() ;
    // initMyAppCodeNumberTwo() ;
    // initMyAppCodeNumberEtc() ;

    // NOTE: initialize your app event handlers, see app.js for a simple event handler example

    // TODO: configure following to work with both touch and click events (mouse + touch)
    // see http://msopentech.com/blog/2013/09/16/add-pinch-pointer-events-apache-cordova-phonegap-app/

//...overly simple example...
//    var el, evt ;
//
//    if( navigator.msPointerEnabled || !('ontouchend' in window))    // if on Win 8 machine or no touch
//        evt = "click" ;                                             // let touch become a click event
//    else                                                            // else, assume touch events available
//        evt = "touchend" ;                                          // not optimum, but works
//
//    el = document.getElementById("id_btnHello") ;
//    el.addEventListener(evt, myEventHandler, false) ;

    // NOTE: ...you can put other miscellaneous init stuff in this function...
	
//*********************************************************************************
//	parkin'BO init functions:
//*********************************************************************************
	parkAttuale();
	recuperaIlDato();
	listCreate('X');
	
	//Inizializza mappa all'avvio:
	var options = {
			//frequency: 5000,
			maximumAge: 0,				//il sistema accetta posizioni non più vecchie di 0 millisecondi
			timeout: 10000,				//timeout error dopo 10 sec
			enableHighAccuracy: true,	//posizione accurata
		};

	// AFTER the deviceready event:
	if(app.geolocation) {
		var locationService = app.geolocation; // native HTML5 geolocation
	}
	else {
		var locationService = navigator.geolocation; // cordova geolocation plugin
	}
	locationService.getCurrentPosition(app.onSuccess, app.onError, options);		
	//navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError, options);
	
	//fine inizializzazione mappa
	
	//controlla il tipo di connessione internet
	//checkConnection();
	

//*********************************************************************************
	
	
    // NOTE: ...and add whatever else you want to do now that the app has started...
    // NOTE: ...or create your own init handlers outside of this file that trigger off the "app.Ready" event...

    //app.initDebug() ;           // just for debug, not required; keep it if you want it or get rid of it
    app.hideSplashScreen() ;    // after init is good time to remove splash screen; using a splash screen is optional

    // app initialization is done
    // app event handlers are ready
    // exit to idle state and wait for app events...

    app.consoleLog(fName, "exit") ;
} ;
 
document.addEventListener("app.Ready", app.initEvents, false) ;



// Just a bunch of useful debug console.log() messages.
// Runs after underlying device native code and webview/browser is ready.
// The following is just for debug, not required; keep it if you want or get rid of it.

app.initDebug = function() {
    "use strict" ;
    var fName = "app.initDebug():" ;
    app.consoleLog(fName, "entry") ;

    if( window.device && device.cordova ) {                     // old Cordova 2.x version detection
        app.consoleLog("device.version: " + device.cordova) ;   // print the cordova version string...
        app.consoleLog("device.model: " + device.model) ;
        app.consoleLog("device.platform: " + device.platform) ;
        app.consoleLog("device.version: " + device.version) ;
    }

    if( window.cordova && cordova.version ) {                   // only works in Cordova 3.x
        app.consoleLog("cordova.version: " + cordova.version) ; // print new Cordova 3.x version string...

        if( cordova.require ) {                                 // print included cordova plugins
            app.consoleLog(JSON.stringify(cordova.require('cordova/plugin_list').metadata, null, 1)) ;
        }
    }

    app.consoleLog(fName, "exit") ;
} ;



// Using a splash screen is optional. This function will not fail if none is present.
// This is also a simple study in the art of multi-platform device API detection.

app.hideSplashScreen = function() {
    "use strict" ;
    var fName = "app.hideSplashScreen():" ;
    app.consoleLog(fName, "entry") ;

    // see https://github.com/01org/appframework/blob/master/documentation/detail/%24.ui.launch.md
    // Do the following if you disabled App Framework autolaunch (in index.html, for example)
    
	//abilita la UI 
	$.ui.launch() ;
	//rimuove il "loader" della pagina
	$("#preloader").removeClass("onload");

    if( navigator.splashscreen && navigator.splashscreen.hide ) {   // Cordova API detected
        navigator.splashscreen.hide() ;
    }
    if( window.intel && intel.xdk && intel.xdk.device ) {           // Intel XDK device API detected, but...
        if( intel.xdk.device.hideSplashScreen )                     // ...hideSplashScreen() is inside the base plugin
            intel.xdk.device.hideSplashScreen() ;
    }

    app.consoleLog(fName, "exit") ;
} ;

//test geolocalizzazione nuova!!
app.onSuccess = function(position){
    	var longitude = position.coords.longitude;
    	var latitude = position.coords.latitude;
    	var latLon = new google.maps.LatLng(latitude, longitude);
    	
    	var mapOptions = {
    		center: latLon,
    		zoom: 16,
    		streetViewControl: false,
    		mapTypeControl: false,
    		styles: [{
        		featureType: "poi",
        		elementType: "labels",
        		stylers: [{ visibility: "off" }]
        		}],
    	};
    	
    	var map = new google.maps.Map(document.getElementById("geolocation"), mapOptions);
		
		via = setVia(latLon);

//*****Dichiarazione InfoWindow
//deleted --> faceva vedere una popup sulla posizione, ma è meglio il marker
		var contentString = '<div id="content" class="iw-popup">'+
								'<div id="headingInfoWindow" class="firstHeading"><b>Via Test</b></div>'+
								'<div id="bodyContent">'+
									'<p>Lavaggio: Lun 10 Giugno</p>'+
								'</div>'+
							'</div>';

    	var infowindow = new google.maps.InfoWindow({
        	map: map,
        	position: latLon,
        	content: contentString,
	      	});

			
//**********************************************************
  // *
  // START INFOWINDOW CUSTOMIZE.
  // The google.maps.event.addListener() event expects
  // the creation of the infowindow HTML structure 'domready'
  // and before the opening of the infowindow, defined styles are applied.
  // *
  google.maps.event.addListener(infowindow, 'domready', function() {

    // Reference to the DIV that wraps the bottom of infowindow
    var iwOuter = $('.gm-style-iw');

    /* Since this div is in a position prior to .gm-div style-iw.
     * We use jQuery and create a iwBackground variable,
     * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
    */
    var iwBackground = iwOuter.prev();

    // Removes background shadow DIV
    iwBackground.children(':nth-child(2)').css({'display' : 'none'});

    // Removes white background DIV
    iwBackground.children(':nth-child(4)').css({'display' : 'none'});

    // Moves the infowindow 115px to the right.
    //iwOuter.parent().parent().css({left: '115px'});

    // Moves the shadow of the arrow 76px to the left margin.
    //iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

    // Moves the arrow 76px to the left margin.
    //iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

    // Changes the desired tail shadow color.
    iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});

    // Reference to the div that groups the close button elements.
    var iwCloseBtn = iwOuter.next();

    // Apply the desired effect to the close button
    iwCloseBtn.css({visibility:'hidden', opacity: '1', right: '38px', top: '3px', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9'});

    // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
    //if($('.iw-content').height() < 140){
    //  $('.iw-bottom-gradient').css({display: 'none'});
    //}

    // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
    //iwCloseBtn.mouseout(function(){
    //  $(this).css({opacity: '1'});
    //});
  });

//**********************************************************

//*****Dichiarazione Marker   
//documentazione:
// https://developers.google.com/maps/documentation/javascript/markers   	
//      	var marker = new google.maps.Marker({
//        	position: latLon,
//    		map: map,
//   			//draggable:true,
//    		//title:"Drag me!"
//      	});

//*****Gestione OnClick sulla mappa
//al click si sposta il marker nella nuova posizione      	
      	google.maps.event.addListener(map, 'click', function(e) {
    		placeMarker(e.latLng, map);
  		});
      	
      	function placeMarker(position, map) {
  			//deleted --> aggiungeva nuovi marker
  			//marker = new google.maps.Marker({
   			//	position: position,
    		//	map: map
  			//});
  			//added --> sposta il marker precedente
  			//marker.setPosition(position);
			infowindow.setPosition(position);
			
			//centro nuovamente la cartina
			var pan = position; 
			pan.A = pan.A + 0.00020;
  			map.panTo(pan);
			
			via = setVia(position);
			
		}
		
//*****Gestione OnClick sulla mappa		
//		google.maps.event.addListener(marker, 'click', function(e) {
//    		// usare per gestire il click sul marker: se clicco --> eseguo il parcheggio
//    		// non ho ancora la via in linea
//			// calcola tutto la function setVia();
//
//			via = setVia(e.latLng);
//				
//			//funzione che esegue il parcheggio
//       		nomeVia = getNomeVia(e.latLng);
//			numVia = getNumCivico(e.latLng);
//			if (matrixLavaggio.getObjectByViaGoogle(nomeVia) && matrixLavaggio.getObjectByViaGoogle(nomeVia).getObjectByNum(numVia)) {
//				via_id = matrixLavaggio.getObjectByViaGoogle(nomeVia).getObjectByNum(numVia).id;
//				park(via_id);
//			} else {
//				infoMsg("via non trovata");
//				console.log(nomeVia);
//			}				  
//  		
//  		});
  		
  		
  		

    };
    
app.onError = function(error){
		alert('code ' + error.code + '\n' + 'message: ' + error.message + '\n');
    };

//controlla la connessione internet	
function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    console.log('Connection type: ' + states[networkState]);
}



//*****************************************
// gestione della via nel footer
//*****************************************
setVia = function (position) {
	
	//Il testo si aggiorna cliccando sulla mappa

	geocoder = new google.maps.Geocoder();	
	
	geocoder.geocode({'latLng': position}, function(results, status) {
                 if (status == google.maps.GeocoderStatus.OK) {
                   	if (results) {
                   
			var via = results[0].formatted_address.substring(0, results[0].formatted_address.indexOf(","));
			var via_user = 	results[0].address_components[1].long_name + ", " + results[0].address_components[0].long_name; // Via e civico
			localStorage.puntatoreVia = results[0].address_components[1].long_name;
			localStorage.puntatoreNum = results[0].address_components[0].long_name;
			  
			// scrive l'indirizzo nella striscia in basso
			document.getElementById("park_mappa").innerHTML = "Parcheggia in " + via_user;
			console.log("click on " + via_user);
			return (via);
                   } else {
                     alert("No results found");
                   }
                 } else {
                   alert("Geocoder failed due to: " + status);
				   resetParkButton();
                 }
	 	   	 	});
	
};

getNomeVia = function (position) {
	
	//Il testo si aggiorna cliccando sulla mappa

	geocoder = new google.maps.Geocoder();	
	
	geocoder.geocode({'latLng': position}, function(results, status) {
    	if (status == google.maps.GeocoderStatus.OK) {
        	if (results) {
              
				var via_user = 	results[0].address_components[1].long_name ; // nome della via
				
				return (via_user);
				
            } else {
              alert("No results found");
            }
			
         } else {
           alert("Geocoder failed due to: " + status);
         }
	 });
	
};

getNumCivico = function (position) {
	
	//Il testo si aggiorna cliccando sulla mappa

	geocoder = new google.maps.Geocoder();	
	
	geocoder.geocode({'latLng': position}, function(results, status) {
    	if (status == google.maps.GeocoderStatus.OK) {
        	if (results) {
              
				var via_user = 	results[0].address_components[0].long_name; // civico
				
				return (via_user);
				
            } else {
              alert("No results found");
            }
			
         } else {
           alert("Geocoder failed due to: " + status);
         }
	 });
	
};

resetParkButton = function () {
//modifica il testo del bottone parcheggia sulla mappa dinamica
//*************** da fare: renderlo non cliccabile ************************
	
	document.getElementById("park_mappa").innerHTML = testoBottoneNonValido;
	//document.getElementById("park_mappa").setAttribute(style,"color: #aaa");
	localStorage.puntatoreVia = null;
	localStorage.puntatoreVia = null;
}
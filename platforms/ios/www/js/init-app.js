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
	via_id,
	markerParcheggio;

// *************************************
// variabile che contiene l'oggetto mappa
// dichiarata qui è globale e sempre visibile
// *************************************

var map; //mappa!

// *************************************

const testoBottoneNonValido = "Impossibile determinare la via";

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
    if (localStorage.settings == undefined) {
        // se è la prima volta che lancio l'app
        recuperaIlDato();
    }
	parkAttuale();
	// popola la dropdown per la selezione del mezzo di trasporto
	listCreateMarker();
	recuperaIlDato();
	listCreate('X');



	//controlla se l'auto è parcheggiata, se non lo è oscura sparcheggia e lista lavaggi
	if (!localStorage.parcheggio){
		//$("#listDayPage").removeAttr("href");
		//$("#listDayPage").removeClass("noOpacity");
		$("#sp").removeClass("noOpacity");
	}

	//pulizia local storage dell'infowindow
	localStorage.removeItem("puntatoreVia");
	localStorage.removeItem("puntatoreNum");
	localStorage.removeItem("puntatoreLatLon");
	if (!localStorage.parcheggio){
		localStorage.removeItem("puntatoreLatLonPark");
	}
//*********************************************************************************************************
//*********************************************************************************************************
//Inizializzazione mappa all'avvio:
//*********************************************************************************************************
	caricaMappa();

	//controlla il tipo di connessione internet
	//checkConnection();

//*********************************************************************************

    //app.initDebug() ;           // just for debug, not required; keep it if you want it or get rid of it
    app.hideSplashScreen() ;    // after init is good time to remove splash screen; using a splash screen is optional

    // app initialization is done
    // app event handlers are ready
    // exit to idle state and wait for app events...

    app.consoleLog(fName, "exit") ;
} ;

document.addEventListener("app.Ready", app.initEvents, false) ;

caricaMappa = function(){
	console.log("Inizio caricamento MAPPA") ;
	var options = {
			//frequency: 5000,
			maximumAge: 10,				//il sistema accetta posizioni non più vecchie di 10 millisecondi
			timeout: 5000,				//timeout error dopo 10 sec
			enableHighAccuracy: true,	//posizione accurata
		};

	// AFTER the deviceready event:
	//if(app.geolocation) {
	//	var locationService = app.geolocation; // native HTML5 geolocation
	//}
	//else {
	//	var locationService = navigator.geolocation; // cordova geolocation plugin
	//}
	//id = locationService.watchPosition(app.onSuccess, app.onError, options);
	//locationService.getCurrentPosition(app.onSuccess, app.onError, options);
	navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError, options);
	} ;

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
	//$.ui.launch() ;
	//rimuove il "loader" della pagina
	//$("#preloader").removeClass("onload");

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

	if (navigator.connection){
		if (navigator.connection.type == 'none'){
				app.onErrorBis();
				return false;
		}
	}

	//navigator.geolocation.clearWatch(id);
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    var latLon = new google.maps.LatLng(latitude, longitude);

    var mapOptions = {
    	center: latLon,
    	zoom: 16,
    	streetViewControl: false,
    	mapTypeControl: false,
    	styles: [{
					//elimina i POI
					"featureType": "poi",
					"stylers": [
					{ "visibility": "off" }
					]
				},{
					//elimina le stazioni
					"featureType": "transit.station",
					"stylers": [
					{ "visibility": "off" }
					]
				}],
    };

    map = new google.maps.Map(document.getElementById("geolocation"), mapOptions);
	console.log(map);

	var panToPosControlDiv = document.createElement('div');
	var panToPosControl = new PanToPosControl(panToPosControlDiv, map, latLon);

	panToPosControlDiv.index = 1;
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(panToPosControlDiv);


//**Dichiarazione InfoWindow
	via = setVia(latLon);
	var contentString = '<div id="contenuto" class="iw-popup">'+
							'<div id="headingInfoWindow" class="firstHeading"><b>' + localStorage.puntatoreVia +', ' + localStorage.puntatoreNum + '</b></div>'+
							'<div id="bodyContent">'+
								'<p>Lavaggio: </p>'+
							'</div>'+
						'</div>';

    var infowindow = new google.maps.InfoWindow({
    	map: map,
    	position: latLon,
    	content: contentString,
	  	});

	// al load, se il veicolo è parcheggiato, setta il marker
	if (localStorage.puntatoreLatLonPark != null && localStorage.parcheggio != null) {
		var puntatoreLatLonPark = JSON.parse(localStorage.puntatoreLatLonPark);
		setParkMarker(puntatoreLatLonPark);
	}

  //**********************************************************
  // *
  // START INFOWINDOW CUSTOMIZE.
  // The google.maps.event.addListener() event expects
  // the creation of the infowindow HTML structure 'domready'
  // and before the opening of the infowindow, defined styles are applied.
  //
  // --> stile applicato: nasco il button di chiusura
  // *
  google.maps.event.addListener(infowindow, 'domready', function() {
	$('.gm-style-iw').next().css({visibility:'hidden'});

  });

	//****************************************************************
	// Funzione che sposta l'infowindow al click su un punto della mappa
	//****************************************************************
    google.maps.event.addListener(map, 'click', function(e) {
		via = setVia(e.latLng);
    	placeInfowindow(e.latLng, map);
  	});

	//***********************************************************
	// Funzione che sposta l'infowindow al change della dropdown
	//***********************************************************
	google.maps.event.addDomListener(document.getElementById("id_via"), "change", function(ev) {


		//Il testo si aggiorna cliccando sulla mappa
		var geocoder = new google.maps.Geocoder(),
			oggetto = matrixLavaggio.getObjectById($("#id_via").val());
			//Se esite più lavaggi per la stessa via
			if (oggetto.minPari) {
				var numFittizio = (oggetto.minPari + oggetto.maxPari) / 2;
			} else {
				var numFittizio = "";
			}
		//var numFittizio = 10;

		geocoder.geocode({'address': "Bologna " + oggetto.viaGoogle + " " + numFittizio}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results) {
					//infowindow.setPosition(results[0].geometry.location);
					placeInfowindow(results[0].geometry.location, map)

					//il problema è che imposta la LatLng e non coincide quindi la via
					setVia(results[0].geometry.location,oggetto.viaGoogle,numFittizio);

				} else {
				alert("No results found");
				}
			} else {
			alert("Geocoder failed due to: " + status);
			//resetParkButton();
			}
		});
	});


	//***********************************************************
	// Funzione generica che sposta l'infowindow
	//***********************************************************
	placeInfowindow = function(position, map) {
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
	}

}//fine app.onSuccess

app.onError = function(error){

		//se va in errore provo a ricaricare la mappa
		var options = {
			//frequency: 5000,
			maximumAge: 10,				//il sistema accetta posizioni non più vecchie di 0 millisecondi
			timeout: 5000,				//timeout error dopo 10 sec
			enableHighAccuracy: true,	//posizione accurata
		};

		navigator.geolocation.getCurrentPosition(app.onSuccess, app.onErrorBis, options);


}//fine app.onError

//gestione errore definitivo geolocalizzazione
app.onErrorBis = function(error){
	//navigator.geolocation.clearWatch(id);
	var divMap = $('#geolocation');
	divMap.addClass("noMap");
	//divMap.css({'display' : 'none'});
	if(error.code == 1){
		divMap.html('<p><i>Impossibile usare GPS, <br> permesso negato</i></p>');
	}else if(error.code == 2){
		divMap.html('<p><i>Impossibile usare GPS, <br> controlla la connessione</i></p>');
	}else if(error.code == 3){
		divMap.html('<p><i>Impossibile usare GPS, <br> tempo richiesto per localizzare il dispositivo troppo lungo</i></p>');
	}else{
		divMap.html('<p><i>Impossibile usare GPS, <br> ERRORE SCONOSCIUTO</i></p>');
	}
	divMap.css({'text-align':'center',
				'background-color':'rgb(230, 230, 230)',
				'height':'initial',
				'padding':'1% 2%'});

	var divNoConnection = $('#noConnection');
	divNoConnection.css({'display' : ''});
	console.log('code ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

//***********************************************************
// Controlla la connessione ad internet
//***********************************************************
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
// Moficia contenuto infowindow
//*****************************************
setVia = function (position,address,num) {


  if(!address){
    //Il testo si aggiorna cliccando sulla mappa
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({'latLng': position}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results) {
          var via = results[0].address_components[1].long_name,
          viaCivico = results[0].address_components[0].long_name;

          viaUser = setViaUser(via, viaCivico);
          localStorage.puntatoreLatLon = JSON.stringify(position);
          console.log(position);
          return viaUser;

        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
        resetParkButton();
      }
    })
  } else {
    viaUser = setViaUser(address, num);
    localStorage.puntatoreLatLon = JSON.stringify(position);
    console.log(position);
  }


};

//*****************************************
// Moficia contenuto infowindow --> NOME VIA
//*****************************************
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

//*****************************************
// Moficia contenuto infowindow --> NUM CIVICO
//*****************************************
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

//*****************************************
// Moficia contenuto infowindow --> IN CASO DI ERRORE
//*****************************************
resetParkButton = function () {
	document.getElementById("headingInfoWindow").innerHTML = " ";
	document.getElementById("bodyContent").innerHTML = "<p>" + testoBottoneNonValido + "<p>";
	localStorage.puntatoreVia = null;
	localStorage.puntatoreNum = null;
	localStorage.puntatoreLatLon = null;
}

// Classe "pulsante per preferito" su mappa
function PrefControl(controlDiv, map) {

  // Set CSS for the control border
  var controlUI = document.createElement('div');
  controlUI.style.backgroundImage = 'url(../www/icon/pref.png)';
  controlUI.style.backgroundSize = 'cover';
  //controlUI.style.backgroundColor = '#fff';
  //controlUI.style.border = '2px solid #fff';
  //controlUI.style.borderRadius = '3px';
  //controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.margin = '10px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click per aggiungere ai preferiti';
  controlDiv.appendChild(controlUI);

  controlUI.style.width = '50px';
  controlUI.style.height = '50px';

  // Set CSS for the control interior
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = '';
  controlUI.appendChild(controlText);

  // Setup the click event listeners:
  google.maps.event.addDomListener(controlUI, 'click', function() {
    console.log("Favourite clicked")
  });

}

// ******************************************************
// Classe "pulsante per riterminare la posizione" su mappa
// ******************************************************
function PanToPosControl(controlDiv, map, latLon) {

  // Set CSS for the control border
  var controlUI = document.createElement('div');
  controlUI.style.backgroundImage = 'url(https://maps.gstatic.com/mapfiles/maps_lite/images/mobile9.png)';
  controlUI.style.backgroundPosition = '-138px -2px';
  controlUI.style.cursor = 'pointer';
  controlDiv.style.margin = '5px';
  controlUI.title = 'Click per getPosition';
  controlDiv.appendChild(controlUI);

  controlUI.style.width = '60px';
  controlUI.style.height = '60px';

  // Set CSS for the control interior
  var controlText = document.createElement('div');
  controlText.innerHTML = '';
  controlUI.appendChild(controlText);

  // Setup the click event listeners:
  google.maps.event.addDomListener(controlUI, 'click', function() {
	//al click rideteremina la posizione attuale cambia l'infowindow e panna sulla nuova posizione
	var options = {
			//frequency: 5000,
			maximumAge: 5000,			//il sistema accetta posizioni non più vecchie di 5 secondi
			timeout: 5000,				//timeout error dopo 5 sec
			enableHighAccuracy: true,	//posizione accurata
		};
	navigator.geolocation.getCurrentPosition(rideterminaPos, app.onError, options);
    console.log("Pan To Position Clicked")
  });

}

rideterminaPos = function(position){
	mapPanTo = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	via = setVia(mapPanTo);
	placeInfowindow(mapPanTo,map);
}

setViaUser = function(via, viaCivico){

  var via_user = 	viaCivico ? via + ", " + viaCivico : via,
      via_id,
		  viaObj = new Array();

  console.log("click on " + via_user);

  if (via != "null" && viaCivico != "null") {

    if (matrixLavaggio.getObjectByViaGoogle(via) &&
    matrixLavaggio.getObjectByViaGoogle(via).getObjectByNum(viaCivico)) {
      viaObj[0] = matrixLavaggio.getObjectByViaGoogle(via).getObjectByNum(viaCivico);
      via_id = viaObj[0].id;
    } else {
      via_id = null;
      viaObj = null;
      console.log(via_user + " non presente in anagrafica");
    }
  }

  localStorage.puntatoreVia = via;
  localStorage.puntatoreNum = viaCivico;
  localStorage.puntatoreId = via_id;

  //giorniLavaggio = getDays12MonthByAddress(null, via);
  var giorniLavaggio = getGiorniLavaggio(X, viaObj);

  // ***************                                                                                 ***************
  // *************** inserire qua tutti gli elementi che devono essere modificati al click della via ***************
  // ***************                                                                                 ***************

  //document.getElementById("park_mappa").innerHTML = "Parcheggia in " + via_user;
  document.getElementById("headingInfoWindow").innerHTML = "<b>" + via_user + "<b>";
  if(via_id != null){
    $("#id_via").val(via_id);
  }else{
    $("#id_via").val("Via...");
  }

  if (giorniLavaggio != null && giorniLavaggio != undefined) {
    document.getElementById("bodyContent").innerHTML = "<p>" + "Lavaggio: " + giorniLavaggio[0] + "<p>";
  } else {
    document.getElementById("bodyContent").innerHTML = "<p>" + "Lavaggio: " + "<i>Sconosciuto!</i> " + "<p>";
  }

  // ***************                                                                                 ***************
  // ***************                                                                                 ***************
  return (via);
}

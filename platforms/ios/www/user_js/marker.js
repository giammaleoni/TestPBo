// ******************************
// setta il marker del parcheggio
// ******************************

setParkMarker = function(position) {

	"use strict" ;
    var fName = "setParkMarker:" ;
    app.consoleLog(fName, "entry") ;
	var puntatorePosition = new google.maps.LatLng(position.A, position.F);

	removeParkMarker();

	var image = recuperaIlMarker();

    markerParcheggio = new google.maps.Marker({
        position: puntatorePosition,
        map: map,
        title: 'Parcheggio',
		animation: google.maps.Animation.DROP,
		icon: image,
		//zIndex: 2,
    });

	// animazione in caduta
	//markerParcheggio.setAnimation(google.maps.Animation.BOUNCE);

	//app.custLog(markerParcheggio);

};

// ******************************
// rimuove il marker del parcheggio
// ******************************
removeParkMarker = function() {
	if (markerParcheggio != undefined) {
		markerParcheggio.setMap(null); //rimuove il marker precedente
	}
};

//***********************************************
// legge l'impostazione del marker
//***********************************************
recuperaIlMarker = function () {
	var sett = localStorage.settings,
		settings = JSON.parse(sett),
        marker,
		immagine,
        anchorx,
        anchory;

	if (settings[6] != null && settings[6] != undefined) {
		var id = settings[6];
		immagine = mezzi[id].path;
		anchorx = mezzi[id].anchorx;
        anchory = mezzi[id].anchory;
	}
	if (immagine != undefined && immagine != null) {

        if (anchorx != 0 && anchory != 0) {
            marker = {
                url: immagine,
                anchor:new google.maps.Point(anchorx,anchory),
            };

        } else {
            marker = { url: immagine };

        } return marker;

    } else { return null; }
};

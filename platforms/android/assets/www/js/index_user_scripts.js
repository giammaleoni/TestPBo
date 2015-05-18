(function()
{
 "use strict";
 /*
   hook up event handlers 
 */

 
 function register_event_handlers()
 {	
	//nascondo la maschera di caricamento quando l'app è stata caricata
	$.ui.hideMask()

//*********************************************************
//		ONCLICK events
//*********************************************************
	
	//click su interretture on_off notifica sveglia
	$(document).on("click","#on_off",function(evt){
		$(".daNascondere").toggleClass("nascosto");
		});
	
	//Accende le impostazioni avanazate
	$(document).on("click","#on_off_a",function(evt){
		$("#tools").toggleClass("avanzate");
		});	
	
	//back to home sui settings
	$(document).on("click","#home_s",function(evt){
		//spostato al change di qualsiasi campo dei settings
		//salvaIlDato();
		//infoMsg("Impostazioni salvate");
	});
	
	$(document).on("click","#home_4",function(evt){
		infoMsg("Preferiti salvati");
	});
	
	//localizza con GPS
	$(document).on("click","#GPS",function(evt){
		//carica la API di google solo se chiami la localizzazione
		//la API poi cerca la posizione
		loadAPI();
	});
	
	//localizza con GPS bis
	$(document).on("click","#GPS_BIS",function(evt){
		var options = {
			frequency: 5000,
			maximumAge: 0,				//il sistema accetta posizioni non più vecchie di 0 millisecondi
			timeout: 1000,				//timeout error dopo 10 sec
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
	});
	
	
	//esegue lo "sparcheggio"
	$(document).on("click","#sp",function(evt){
		sparcheggia();
		rimuoviTutteNotifiche();
	});
	
	//estrae la lista dei giorni di lavaggio e la mette in output sulla pagina
	$(document).on("click","#listDayPage",function(evt){
		getDays12MonthByAddress(X);
	});
	
	$(document).on("click","#clearLS",function(evt){
		localStorage.clear();
		location.reload();
	});
	
	$(document).on("click","#section1",function(evt){
		$("#section1").toggleClass("rotate");
		$("#guide").toggleClass("nascosto");
	});
	
    //per testare la data delle notifiche
	$(document).on("click","#testNotifications2",function(evt){
        var prossimaData = calcolaNotifiche();
        var errore = impostaNotifiche("X",prossimaData);
		if (errore){
			infoMsg(errore);
		}else{ 
			infoMsg("Prossima Notifica: " + prossimaData[0]);
		}
	});
     
//*********************************************************
//		ONCHANGE events
//*********************************************************
	$(document).on("change","#id_via",function(evt){
		parcheggiaDD();
	});	
	
	$(document).on("change","#on_off",function(evt){
		salvaIlDato();
		infoMsg("Impostazione salvata");
	});
	
	$(document).on("change","#ora",function(evt){
		salvaIlDato();
		infoMsg("Impostazione salvata");
	});
	
	$(document).on("change","#giorni1",function(evt){
		checkGiorni();
		salvaIlDato();
		//controlla se i giorni di avvertimento sono diversi ed evidenzia la scritta nel main
		parkAttuale();
		infoMsg("Impostazione salvata");
	});
	
	$(document).on("change","#giorni2",function(evt){
		checkGiorni();
		salvaIlDato();
		infoMsg("Impostazione salvata");
	});
	
	$(document).on("change","#notif_park",function(evt){
		salvaIlDato();
		infoMsg("Impostazione salvata");
	});
	
	$(document).on("change","#notif_pref",function(evt){
		salvaIlDato();
		infoMsg("Impostazione salvata");
	});
	
 }

document.addEventListener("app.Ready", register_event_handlers, false);

 // --> in questo modo si disattiva il backbutton
function onBackKeyDown(e) {
  //annulla il comportamento di default del backbutton
  e.preventDefault();
  //se mi trovo nel main
  if ($.ui.activeDiv.id == "main"){
	  //devo simulare il comportamento del menu button
  }else if ($.ui.activeDiv.id == "sett_page"){
	  //se mi trovo nei settings
	  //mi comporto come se avessi premuto "menu" nei settings (transition: down)
	  $('#home_s').click();
  }else{
	  //se mi trovo in qualsiasi altra pagine
	  //mi comporto come se avessi premuto "menu"  (transition: flip)
	  $('#home_2').click();
  }
  //$.ui.goBack(); 
  //$.ui.loadContent("#main",true,true,"flip");
}
 
 document.addEventListener("backbutton", onBackKeyDown, false);
 

})();
(function()
{
 "use strict";
 /*
   hook up event handlers
 */


 function register_event_handlers(){
  if (typeof (admob) !== 'undefined'){

    // va in home se clicco su postponi e chiudo la pubblicità
    // function onAdmobInterstitialDismiss(message) {
    //   if (rimandato) {
    //     homeButton();
    //   }
    // }
    //
    // document.addEventListener(admob.Event.onAdmobInterstitialDismiss, onAdmobInterstitialDismiss, false);

  	//nascondo la maschera di caricamento quando l'app è stata caricata
  	//$.ui.hideMask() //--> da verificare che fa

    var admobParam = new  admob.Params();
          //admobParam.extra={'keyword':"admob phonegame"};
          //admobParam.isForChild=true;
          admobParam.isTesting = true;
    admob.showBanner(admob.BannerSize.SMART_BANNER,admob.Position.BOTTOM_APP,admobParam);//show banner at the top of app
    admob.cacheInterstitial();// load admob Interstitial

  }
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
	//$(document).on("click","#GPS_BIS",function(evt){
	//	var options = {
	//		//frequency: 5000,
	//		maximumAge: 0,				//il sistema accetta posizioni non più vecchie di 0 millisecondi
	//		timeout: 10000,				//timeout error dopo 10 sec
	//		enableHighAccuracy: true,	//posizione accurata
	//	};
    //
	//	// AFTER the deviceready event:
	//	if(app.geolocation) {
	//		var locationService = app.geolocation; // native HTML5 geolocation
	//	}
	//	else {
	//		var locationService = navigator.geolocation; // cordova geolocation plugin
	//	}
	//	locationService.getCurrentPosition(app.onSuccess, app.onError, options);
	//	//navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError, options);
	//});


	//esegue il "parcheggio"
	$(document).on("click","#p",function(evt){
		console.log("Parked clicked");

		if($("#geolocation").hasClass("noMap") == false) {
		//se c'è connessione a internet

			if (localStorage.puntatoreVia == "null") {
				console.log("cliccato bottone senza la via");
				resetParkButton();
				return;
			}

			var puntatoreVia = localStorage.puntatoreVia;
			var puntatoreNum = localStorage.puntatoreNum;
			var puntatoreLatLon = JSON.parse(localStorage.puntatoreLatLon);
			localStorage.puntatoreLatLonPark = localStorage.puntatoreLatLon;

			if (puntatoreVia){ //&& puntatoreNum) {
				if (matrixLavaggio.getObjectByViaGoogle(puntatoreVia) &&
					matrixLavaggio.getObjectByViaGoogle(puntatoreVia).getObjectByNum(puntatoreNum)) {
					var via_id = matrixLavaggio.getObjectByViaGoogle(puntatoreVia).getObjectByNum(puntatoreNum).id;
					var error = park(via_id);

					if (error == null) {
						console.log("park da mappa dinamica: " + puntatoreVia + ", " + puntatoreNum);
						//disabilita sparcheggio e lista lavaggi
						//$("#listDayPage").attr("href", "#page3");
						//$("#listDayPage").addClass("noOpacity")
						$("#sp").addClass("noOpacity")
						if (puntatoreLatLon) { setParkMarker(puntatoreLatLon); }

					} else {
						console.log("impossibile eseguire park: " + error);
						infoMsg("Parcheggio non eseguito");
						return;
					}
				} else {
					infoMsg("Non ci sono lavaggi, easy :)");
					console.log("park non riuscito " + puntatoreVia);
				}

			} else {
				console.log("non c'era la via nel local storage");
				resetParkButton();
			}

		}else{
		//se non c'è connessione a internet

			var via_id = $("#id_via").val();
			if (via_id){
				var puntatoreVia = matrixLavaggio.getObjectById(via_id).viaGoogle;
				var puntatoreNum = matrixLavaggio.getObjectById(via_id).minPari;
				//var puntatoreLatLon --> impossibile da determinare

				var error = park(via_id);

				if (error == null) {
					console.log("CONNESSIONE ASSENTE --> park da dropdown: " + puntatoreVia + ", " + puntatoreNum);
					//disabilita sparcheggio e lista lavaggi
					$("#listDayPage").attr("href", "#page3");
					//$("#listDayPage").css("opacity", "");
					//$("#sp").css("opacity", "");
					$("#listDayPage").addClass("noOpacity")
					$("#sp").addClass("noOpacity")
					if (puntatoreLatLon) { setParkMarker(puntatoreLatLon); }

				} else {
					console.log("impossibile eseguire park: " + error);
					infoMsg("Parcheggio non eseguito");
					return;
				}
			}else{
					console.log("CONNESSIONE ASSENTE --> park da dropdown: Nessuna via selezionata");
			}
		}
	});

	//esegue lo "sparcheggio"
	$(document).on("click","#sp",function(evt){
		sparcheggia();
		rimuoviTutteNotifiche();

		//disabilita sparcheggio e lista lavaggi
		//$("#listDayPage").removeAttr("href");
		//$("#listDayPage").removeClass("noOpacity");
		$("#sp").removeClass("noOpacity");

	});

	//estrae la lista dei giorni di lavaggio e la mette in output sulla pagina
	$(document).on("click","#listDayPage",function(evt){
		var via = localStorage.parcheggio;

		if (via != null){
			getDays12MonthByAddress(X);
		}else{
		//evt.preventDefault(); non funziona
		//simulo il click dell'home button
			console.log("Auto non parcheggiata");
			return false;

		}

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
        startNotifiche();
	});

	// per testare i preferiti
	$(document).on("click","#testNotificationsPref",function(evt){
		testPref();
		var preferito = new Preferito("Altabella, via");
	});


//*********************************************************
//		Mappa dinamica
//*********************************************************
	$(document).on("click","#park_mappa",function(evt){
		$("#park_mappa").removeClass("pressed");

		if (document.getElementById("park_mappa").innerHTML == testoBottoneNonValido) {
			console.log("cliccato bottone senza la via");
			resetParkButton();
			return;
		}


		var puntatoreVia = localStorage.puntatoreVia;
		var puntatoreNum = localStorage.puntatoreNum;

		if (puntatoreVia && puntatoreNum) {
			if (matrixLavaggio.getObjectByViaGoogle(puntatoreVia) &&
				matrixLavaggio.getObjectByViaGoogle(puntatoreVia).getObjectByNum(puntatoreNum)) {
				var via_id = matrixLavaggio.getObjectByViaGoogle(puntatoreVia).getObjectByNum(puntatoreNum).id;
				var error = park(via_id);

				if (error == null) {
					console.log("Parcheggiato: " + puntatoreVia + ", " + puntatoreNum);

					//abilita sparcheggia e lista lavaggi
					$("#listDayPage").attr("href", "#page3");
					// inserire remove CSS per
					// #listDayPage
					// #sp
					$("#listDayPage").css("opacity","");
					$("#sp").css("opacity","");
				} else {
					console.log("impossibile eseguire park: " + error);
					infoMsg("Parcheggio non eseguito");
					return;
				}
			} else {
				infoMsg("Non ci sono lavaggi, easy :)");
				console.log("park non riuscito " + puntatoreVia);
			}

		} else {
			console.log("non c'era la via nel local storage");
			resetParkButton();
		}
	});

	//click su buttoni popup dopo notifica cliccata -->

  //sparcheggia
	$(document).on("click","#sparcheggiaPopUp",function(evt){
      //effettua lo sparcheggio
      $('#sp').click();
			$("#notifClicked").addClass("nascosto");
      //al dismiss dello sparcheggio si apre la pubblicità
      admob.isInterstitialReady(function(isReady){
          if(isReady){
              admob.showInterstitial();
          }
      });
		});

  //rimanda di 10 minuti
	$(document).on("click","#ignoraPopUp",function(evt){
    //postpone la notifica di 10 minuti
    var now = new Date().getTime(),
        _10_minfrom_now = new Date(now + 10 * 60 * 1000);
    cordova.plugins.notification.local.update({
        id: notifClickedId,
        at: _10_minfrom_now,
    });

		$("#notifClicked").addClass("nascosto");
    //var rimandato = 'X';
    //al dismiss del postponi si apre la pubblicità
    admob.isInterstitialReady(function(isReady){
        if(isReady){
            admob.showInterstitial();
        }
    })
	});

  $(document).on("click","#star",function(evt){
    inPreferiti("X");
  });

  $(document).on("click","#add",function(evt){

      addFavorite()
  });

  // se la connessione non va si lascia all'utente la possibilità di riprovare a caricare la mappa
  // per esempio il telefono non prende, ma poi si. in questo modo non è necessario uscire e ricaricare l'applicazione
  $(document).on("click",".riprova",function(evt){
    caricaMappa();
  });

//*********************************************************
//		ONCHANGE events
//*********************************************************
	//$(document).on("change","#id_via",function(evt){
	////	parcheggiaDD();
	//	//posizionare infowindow nella posizione
	//	setViaDaDropdown($("#id_via").val());
	//});

	$(document).on("change","#on_off",function(evt){
		salvaIlDato();
		infoMsg("Impostazione salvata");
		impostaNotificheMsg();
	});

	$(document).on("change","#ora",function(evt){
		salvaIlDato();
		infoMsg("Impostazione salvata");
		impostaNotificheMsg();
	});

	$(document).on("change","#giorni1",function(evt){
		checkGiorni();
		salvaIlDato();
		//controlla se i giorni di avvertimento sono diversi ed evidenzia la scritta nel main
		parkAttuale();
		infoMsg("Impostazione salvata");
		impostaNotificheMsg();
	});

	$(document).on("change","#giorni2",function(evt){
		checkGiorni();
		salvaIlDato();
		infoMsg("Impostazione salvata");
		//impostaNotifiche();
	});

	$(document).on("change","#notif_park",function(evt){
		salvaIlDato();
		infoMsg("Impostazione salvata");
		impostaNotificheMsg();
	});

	$(document).on("change","#notif_pref",function(evt){
		salvaIlDato();
		infoMsg("Impostazione salvata");
	});

	//gestione svuotaLocalStorage
	$(document).on("click","#svuotaLocalStorage",function(evt){
		localStorage.clear();
		recuperaIlDato();
		location.reload();
		$('#home_s').click();
	});

	// selezione del mezzo di trasporto da marker
	$(document).on("change","#selectMezzo",function(evt){
		checkGiorni();
		salvaIlDato();

		// aggiorna l'icona del marker
		//if (localStorage.puntatoreLatLonPark != null && localStorage.parcheggio != null) {
		//	var puntatoreLatLonPark = JSON.parse(localStorage.puntatoreLatLonPark);
		//	setParkMarker(puntatoreLatLonPark);
		//}
		if (markerParcheggio != undefined ) {
			markerParcheggio.setIcon(recuperaIlMarker());
		}

		var obj = $("#selectMezzo");
		updateSelectMezzo(obj);

		infoMsg("Impostazione salvata");
	});

 }

document.addEventListener("app.Ready", register_event_handlers, false);


function onBackKeyDown(e) {
  //annulla il comportamento di default del backbutton
  e.preventDefault();
  //se mi trovo nel main
  if ($.ui.activeDiv.id == "mainpage"){
	  //devo simulare il comportamento del menu button
    homeButton();
  }else if ($.ui.activeDiv.id == "sett_page"){
	  //se mi trovo nei settings
	  //mi comporto come se avessi premuto "menu" nei settings (transition: down)
	  $('#home_s').click();
  }else{
	  //se mi trovo in qualsiasi altra pagina
	  //mi comporto come se avessi premuto "menu"  (transition: flip)
	  $('#home_2').click();
  }

}

 document.addEventListener("backbutton", onBackKeyDown, false);

})();

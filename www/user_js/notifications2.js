// Massimo 8 Maggio 2015
//  Include per le notifiche di avviso lavaggio

//***********************************************
// funzione da chiamare per eseguire il giro delle notifiche
// tutte le altre vengono richiamate qua dentro
//***********************************************
startNotifiche = function() {
	var prossimaData = calcolaNotifiche();
       var errore = impostaNotifiche("X",prossimaData);
	if (errore){
		infoMsg(errore);
	}else{
		infoMsg("Prossima Notifica: " + prossimaData[0]);
	}
};

//***********************************************
// setta le notifiche.
// solo se sono attivate in settings
//***********************************************
impostaNotifiche = function (noAlert, giorniNotifiche) {

    rimuoviTutteNotifiche();

    var settings = JSON.parse(localStorage["settings"]); //salva i setting in un array
		var notificheAttive = ( (settings[settingon_off] == "true") * (settings[notif_park] == "true") ? "true" : "false" );

    var error;

    if (notificheAttive != "true") {
        // esce se le notifiche non sono attive
        //rimuoviTutteNotifiche();
        error = "Notifiche disattivate nei setting";

    } else if (!localStorage.parcheggio) {
        error = "La macchina non è parcheggiata.";

    } else if (giorniNotifiche == null) {
        error = "Nessun giorno di parcheggio trovato";
    }

    if (error != null && noAlert != null) {
        return (error);
    } else if (error != null && noAlert == null) {
        return;
    }

    //error = rimuoviTutteNotifiche();
    var via = localStorage.parcheggio,
        giorniLavaggio = getDays12MonthByAddress(),
        //id,
        title,
        //day,
        //month,
        //text,
        //at,
        sound,
        i;
	var id = new Array,
	    day = new Array,
	    month = new Array,
	    text = new Array,
	    at = new Array;

	//RIEMPI GLI ARRAY CON LE INFORMAZIONI DA METTERE LE NOTIFICHE
    for (var i = 0; i < giorniNotifiche.length; i++) {
		//check variabili
		//id = i + 1;
		//title = notificationTitle();
		//day = giorniLavaggio[i].getDate();
		//month = giorniLavaggio[i].getMonth() + 1;
		//month = monthNames[giorniLavaggio[i].getMonth()];
		//text = notificationText(day, month, via);
		//at = giorniNotifiche[i];
		//sound = notificationSound();
		//small_icon = sm_icon();

		//definizione array per notifica
		//id[i] = "p_" + (i + 1);
		id[i] = i + 1;
		day[i] = giorniLavaggio[i].getDate();
		month[i] = monthNames[giorniLavaggio[i].getMonth()];
		text[i] = notificationText(day[i], month[i], via);
		at[i] = giorniNotifiche[i];
	}

	if (typeof (cordova) !== 'undefined') {

		//IMPOSTA VALORI DI DEFAULT PER LE NOTFICHE
		title = notificationTitle();
		sound = notificationSound();
		small_icon = 'file://ic_directions_car_white_24dp.png';

		cordova.plugins.notification.local.setDefaults({
			title: title,
			sound: sound,
			smallIcon: small_icon,
    	});

		//SCHEDULA UNA ALLA VOLTA LE NOTIFICHE

		cordova.plugins.notification.local.schedule([
		{
    	   id:     id[0],
    	   text: text[0],
    	   at:     at[0],
				 data: { tipo: "parcheggio" },
    	},
    	{
    	   id:     id[1],
    	   text: text[1],
    	   at:     at[1],
				 data: { tipo: "parcheggio" },
    	},
    	{
    	   id:     id[2],
    	   text: text[2],
    	   at:     at[2],
				 data: { tipo: "parcheggio" },
    	},
    	{
    	   id:     id[3],
    	   text: text[3],
    	   at:     at[3],
				 data: { tipo: "parcheggio" },
    	},
    	{
    	   id:     id[4],
    	   text: text[4],
    	   at:     at[4],
				 data: { tipo: "parcheggio" },
    	},
    	{
    	   id:     id[5],
    	   text: text[5],
    	   at:     at[5],
				 data: { tipo: "parcheggio" },
    	},
    	{
    	   id:     id[6],
    	   text: text[6],
    	   at:     at[6],
				 data: { tipo: "parcheggio" },
    	},
    	{
    	   id:     id[7],
    	   text: text[7],
    	   at:     at[7],
				 data: { tipo: "parcheggio" },
    	},
    	{
    	   id:     id[8],
    	   text: text[8],
    	   at:     at[8],
				 data: { tipo: "parcheggio" },
    	},
    	{
    	   id:     id[9],
    	   text: text[9],
    	   at:     at[9],
				 data: { tipo: "parcheggio" },
    	},
    	{
    	   id:     id[10],
    	   text: text[10],
    	   at:     at[10],
				 data: { tipo: "parcheggio" },
    	},
			{
				id:     id[11],
				text: text[11],
				at:     at[11],
				data: { tipo: "parcheggio" },
			},]);

	} else {
			//stampaNotifiche (giorniLavaggio[i]);
			error = "LocalNotification non eseguibile: <br />" + giorniNotifiche[0];
			//console.log(giorniNotifiche[i]);
			console.log(giorniNotifiche.join("\n"));
			return (error);
    }
    //}
	//stampaNotifiche (giorniLavaggio);
    return ("Notifiche attivate!<br />Prossima notifica " + giorniNotifiche[0]);
};

//***********************************************
//
//***********************************************
rimuoviTutteNotifiche = function () {
    // rimuovi tutte le notifiche presenti
    localStorage.removeItem('Notifiche');
	if (typeof (cordova) !== 'undefined') {
		//cordova.plugins.notification.local.cancelAll();
		//cordova.plugins.notification.local.clearAll();
		cordova.plugins.notification.local.cancel(
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
			function(){
				console.log("Cancellate notifiche parcheggio. ID: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12");
			}
		);
	} else {
		return ("LocalNotification non eseguibile su browser");
	}
};

//***********************************************
//
//***********************************************
notificationSound = function () {
    // setta il suono delle notifiche
    if (typeof (device) !== 'undefined') {
        var sound = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';
    } else {
        sound == 'file://beep.caf';
    }
    return sound;
};

//***********************************************
//
//***********************************************
notificationTitle = function (tipo) {
    // restituisce il testo delle notifiche
    var titoloNotifica = "ParkinBo: prossimo lavaggio"
    return titoloNotifica;
};

//***********************************************
//
//***********************************************
notificationText = function (giorno, mese, via) {
    // restituisce il testo delle notifiche
    var testoNotifica = "in " + matrixLavaggio.getObjectById(via).viaGoogle + " il " + giorno + " " + mese;
    return testoNotifica;
};

//***********************************************
//
//***********************************************
//sm_icon = function () {
//    // setta l'icone nella barra delle notifiche
//    var icona_not =  'file://ic_directions_car_white_24dp.png';
//    return icona_not;
//};

//***********************************************
//
//***********************************************
//notificationBadge = function () {
//    // setta il badge delle notifiche
//    var badge = " ";
//    return badge;
//};

//***********************************************
// calcola data e ora delle notifiche
// in base alle date di lavaggio e alle configurazioni del setting
//***********************************************

calcolaNotifiche = function (via) {

    var settings = JSON.parse(localStorage["settings"]), //salva i setting in un array
        notificheAttive = settings[settingon_off],
        //TO-DO: --> cambiare la stringa nei settings da "true" a true con var val = (string === "true");
    	//notificheAttive = ( settings[settingon_off] * settings[notif_park] ? "true" : "false" ),
        giorniAnticipo = settings[settinggiorni1],
        //notificheOrario = settings[settingora],
		notificheOrario = $("#ora").val(),
        giorniLavaggio = getDays12MonthByAddress(null , via);

    const minuteOffset = 60*1000; // un minuto in millisecondi
    const hourOffset = 60*60*1000; // un ora in millisecondi
    const dateOffset = 24*60*60*1000; // un giorno in millisecondi
    var giornoNotifica = new Date();
    var giorniNotifiche = new Array(new Date());

    if (giorniLavaggio == null ) {
        return;
    }

		//controlla che la data non sia vuota
		if (notificheOrario == "" ) {
				infoMsg("Orario non valido, nessuna notifica pianificata")
        return;
    }

    // calcola i giorni in cui settare le notifiche
    for(i = 0; i < giorniLavaggio.length; i++) {
        //usando i millisecondi (Time) non abbiamo problemi ad eseguire la sottrazione con il cambio di mese
        giornoNotifica.setTime(giorniLavaggio[i].getTime() - giorniAnticipo*dateOffset);

        if   (giorniLavaggio[i].getHours() == "00" && giorniLavaggio[i].getMinutes() == "00") {
            //calcolo l'orario a cui impostare le notifiche
            giornoNotifica.setHours(parseInt(notificheOrario.slice(0,2)));
            giornoNotifica.setMinutes(parseInt(notificheOrario.slice(3,5)));
        }
        //giorniNotifiche[i] = new Date(giornoNotifica.getFullYear(),
        //                              giornoNotifica.getMonth(),
        //                              giornoNotifica.getDate(),
        //                              giornoNotifica.getHours(),
        //                              giornoNotifica.getMinutes() );
        giorniNotifiche[i] = new Date(giornoNotifica);
    }

    return (giorniNotifiche);
};

//***********************************************
// ritorna true se ci sono le notifiche
// schedulate
//***********************************************
notificheAttive = function () {

    if (typeof(cordova) == 'undefined') {
		if (localStorage["Notifiche"]) {
			return (true);
		} else {
        	return(false);
		}
    }

    if(cordova.plugins.notification.local.getAll(callbackOpts)) {
        return(true)
    }
    return(false);
};


//***********************************************
// ritorna dal sistema le notifiche
// schedulate
//***********************************************
leggiNotifiche = function () {

    if (typeof(cordova) == 'undefined') {
		giorniNotifiche = new Array(new Date());
		giorniNotifiche = JSON.parse(localStorage["Notifiche"])
        return (giorniNotifiche);
    }

    return(cordova.plugins.notification.local.getAll(callbackOpts));
};

//***********************************************
// stampano data e ora delle notifiche schedulate
// usate nella pagina settings
// ADESSO NON UTILIZZATE
//***********************************************
//stampaNotifiche = function(giorniNotifiche) {
//
//	var mese,
//		sinistra,
//		destra,
//		left_id,
//		right_id,
//		i;
//
//    if (giorniNotifiche == null) {
//		// sbianca tutto
//        return;
//    };
//
//    //for(i = 0; i < giorniNotifiche.length+1; i++) {
//    for(i = 0; i < giorniNotifiche.length; i++) {
//		mese = parseInt (giorniNotifiche[i].getMonth()) + 1;
//
//		sinistra = giorniNotifiche[i].getDate() + "/" + mese.toString(); // data
//		destra = giorniNotifiche[i].getHours() + ":" + giorniNotifiche[i].getMinutes(); //ora
//
//		left_id = "left" + i;
//		right_id = "right" + i;
//        //document.getElementById(left_id).innerHTML = sinistra;
//		//document.getElementById(right_id).innerHTML = destra;
//		//in realtà scrive la data del lavaggio e non della notifiche
//		console.log(sinistra + " | " + destra);
//    }
//};

//***********************************************
// esegue impostaNotifiche e stampa il messaggio
//
//***********************************************
impostaNotificheMsg = function () {
	var prossimaData = calcolaNotifiche();
	var error = impostaNotifiche(X, prossimaData);
	if (error) {
		//infoMsg(error);
	}
};

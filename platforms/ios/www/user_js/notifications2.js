// Massimo 8 Maggio 2015
//  Include per le notifiche di avviso lavaggio

//***********************************************
// setta le notifiche. 
// solo se sono attivate in settings
//***********************************************
impostaNotifiche = function (noAlert, giorniNotifiche) {
    
    rimuoviTutteNotifiche();
    var settings = JSON.parse(localStorage["settings"]); //salva i setting in un array
    var notificheAttive = settings[settingon_off];
    //var giorniAnticipo = settings[settinggiorni1];
    //var notificheOrario = settings[settingora];
    
	//DELETED[Gianma]: aggiunta come variabile passata alla function
    //var giorniNotifiche = calcolaNotifiche();
    var error;
    
    if (notificheAttive != "true") {
        // esce se le notifiche non sono attive
        rimuoviTutteNotifiche();
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
    
    error = rimuoviTutteNotifiche();
    var via = localStorage.parcheggio,
        giorniLavaggio = getDays12MonthByAddress(),
        id,
        title,
        day,
        month,
        text,
        at,
        sound,
        i;
	
    for (i = 0; i <= giorniNotifiche.length; i++) {   
		//check variabili
		id = i + 1;
		title = notificationTitle();
		day = giorniLavaggio[i].getDate();
		month = giorniLavaggio[i].getMonth() + 1;
		text = notificationText(day, month, via);
		at = giorniNotifiche[i];
		sound = notificationSound();
		
		if (typeof (cordova) !== 'undefined') {
			cordova.plugins.notification.local.schedule({
				id: id,
				title: title,
				text: text,
				at: at,
				sound: sound
				//badge: notificationBadge()
			});
		} else {
            localStorage.Notifiche = JSON.stringify(giorniNotifiche);
			stampaNotifiche ();
			error = "LocalNotification non eseguibile: <br />" + text;
			return (error);
        }
    }
    localStorage.Notifiche = JSON.stringify(giorniNotifiche);
	stampaNotifiche ();
    return ("Notifiche attivate!<br />Prossima notifica " + giorniNotifiche[0]);
};

//***********************************************
// 
//***********************************************
rimuoviTutteNotifiche = function () {
    // rimuovi tutte le notifiche presenti
    localStorage.removeItem('Notifiche');
	if (typeof (cordova) !== 'undefined') {
		cordova.plugins.notification.local.cancelAll();
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
notificationTitle = function () {
    // restituisce il testo delle notifiche
    var titoloNotifica = "Notifica ParkinBo"
    return titoloNotifica;
};

//***********************************************
// 
//***********************************************
notificationText = function (giorno, mese, via) {
    // restituisce il testo delle notifiche
    var testoNotifica = "Prossimo lavaggio in " + via + " il " + giorno + "/" + mese;
    return testoNotifica;
};

//***********************************************
// 
//***********************************************
notificationBadge = function () {
    // setta il badge delle notifiche
    var badge = " ";
    return badge;
};

//***********************************************
// calcola data e ora delle notifiche
// in base alle date di lavaggio e alle configurazioni del setting
//***********************************************

calcolaNotifiche = function () {

    var settings = JSON.parse(localStorage["settings"]), //salva i setting in un array
        notificheAttive = settings[settingon_off],
        giorniAnticipo = settings[settinggiorni1],
        notificheOrario = settings[settingora],
        giorniLavaggio = getDays12MonthByAddress(),
	
	//a volte il primo elemento dell'array è un giorno passato, in tal caso lo elimino
	    oggi = new Date();
	if (giorniLavaggio[0].getDate() <= oggi.getDate() && giorniLavaggio[0].getMonth() <= oggi.getMonth()) {
		giorniLavaggio.splice(0, 1);
	}
	
    const minuteOffset = 60*1000; // un minuto in millisecondi
    const hourOffset = 60*60*1000; // un ora in millisecondi
    const dateOffset = 24*60*60*1000; // un giorno in millisecondi
    var giornoNotifica = new Date();
    var giorniNotifiche = new Array(new Date());
    
    if (giorniLavaggio == null ) {
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
        giorniNotifiche[i] = new Date(giornoNotifica.getFullYear(),
                                      giornoNotifica.getMonth(),
                                      giornoNotifica.getDate(),
                                      giornoNotifica.getHours(),
                                      giornoNotifica.getMinutes() );
		//ADDED[Gianma]: aggiunto parser per convertire in millisecondi dal 1970
		//giorniNotifiche[i] = Date.parse(giorniNotifiche[i]);
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
stampaNotifiche = function() {
	
	var giorniNotifiche = leggiNotifiche (),
		mese,
		sinistra,
		destra,
		left_id,
		right_id,
		i;
	
    if (giorniNotifiche == null) {
		// sbianca tutto
        return;
    };
    
    for(i = 1; i < giorniNotifiche.length+1; i++) {
		mese = parseInt (giorniNotifiche[i].getMonth()) + 1;
		
		sinistra = giorniNotifiche[i].getDate() + "/" + mese.toString(); // data
		destra = giorniNotifiche[i].getHours() + ":" + giorniNotifiche[i].getMinutes(); //ora
		
		left_id = "left" + i;
		right_id = "right" + i;
        document.getElementById(left_id).innerHTML = sinistra;
		document.getElementById(right_id).innerHTML = destra;
    }
};



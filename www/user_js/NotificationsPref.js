//***********************************************
// gestione ad oggetti per le notifiche
// delle vie inserite nei preferiti
// work in progress
//***********************************************


var preferitiObj = [];

//aggiornaPreferiti(null, "init");

aggiornaPreferiti = function (id, action) {

	switch(action) {
        case "add":
            // aggiunte notifiche preferiti
            preferitiObj[id] = new Preferito(id);
            preferitiObj[id].impostaNotifiche();
            break;
            
        case "remove":
            //rimuove notifiche preferiti
            if (!preferitiObj[id]) {
                return;
            }
            preferitiObj[id].rimuoviNotifiche();
            preferitiObj[id] = null;
            console.log(preferitiObj[id]);
            break;
            
        case "update":
            //aggiorna le notifiche e la variabile preferitiObj;
            preferitiObj.forEach(function(entry) {
                preferitiObj[entry].rimuoviNotifiche();
                preferitiObj[entry].impostaNotifiche();
            });
            
            localStorage.preferitiObj = JSON.stringify(preferitiObj);
            break;
            
        case "init":
            // inizializzo
            var preferiti = localStorage.preferiti ? JSON.parse(localStorage.preferiti) : [];
            
            for (var i = 0; i < preferiti.length; i++) {
                aggiornaPreferiti(preferiti[i], "add");
            }
            
            break;
            
        default: //cazzi
            return preferitiObj[id];
            break;
    }
};



var Preferito = function(id) {
	console.log('Creazione Notifiche preferito ' + id);
	if (id) {
		this.id = id; // imposta l'attributo id dell'oggetto corrente (this)
        this.idNotifiche;
	}
	//this.nomeVia = ''; //?
//	var giorniLavaggio,
//		gioniNotifiche;
//	
	this.calcolaLavaggio();
	this.calcolaNotifiche();
	//this.impostaNotifiche() //disabilitato finchè il metodo non è completo
	
};

testPref = function () {
	console.log("preferito PROC!");
};

Preferito.prototype = {
    constructor: Preferito
}

Preferito.prototype.impostaNotifiche = function (noAlert) {
	
    //rimuoviTutteNotifiche();
    var settings = JSON.parse(localStorage["settings"]); //salva i setting in un array
    var notificheAttive = settings[settingon_off];
	var notifichePreferiti = settings[notif_pref];
    //var giorniAnticipo = settings[settinggiorni1];
    //var notificheOrario = settings[settingora];
    
	//DELETED[Gianma]: aggiunta come variabile passata alla function
    //var giorniNotifiche = calcolaNotifiche();
    var error;
    
    if (notificheAttive != "true") {
        // esce se le notifiche non sono attive
        //rimuoviTutteNotifiche();
        error = "Notifiche disattivate nei setting";
        
    } else if (notifichePreferiti != "true") {
		error = "Notifiche Preferiti disattivate nei setting";
		
	} else if (!this.id) { //cambiare
        error = "Impossibile trovare il preferito";
		console.log(error, this.id);
        
    } else if (this.giorniNotifiche == null) {
        error = "Nessun giorno di parcheggio trovato";
    }
    
    if (error != null && noAlert != null) {
        return (error);
    } else if (error != null && noAlert == null) {
        return;
    }
    
    error = this.cancellaNotifiche();
    var via = this.id,
        giorniLavaggio = this.giorniLavaggio(),
        id,
        title,
        day,
        month,
        text,
        at,
        sound,
        i;
	
	// qui inseriamo la chiamata a Cordova -> OH YEAH BABY!!!!
};


Preferito.prototype.calcolaLavaggio = function () {
	//
	this.giorniLavaggio = getDays12MonthByAddress(null, this.id);
    console.log(this.giorniLavaggio);
    
};


Preferito.prototype.calcolaNotifiche = function () {
	//
	this.giorniNotifiche = calcolaNotifiche(this.id);
    console.log(this.giorniNotifiche);
};


Preferito.prototype.cancellaNotifiche = function () {
	// cancellare le notifiche con cordova
};


//***********************************************
// setta le notifiche dei preferiti.
// solo se sono attivate in settings
//***********************************************
Preferito.prototype.impostaNotifiche = function () {

    //rimuoviTutteNotifiche();
    var giorniNotifiche = this.giorniNotifiche,
        giorniLavaggio = this.giorniLavaggio,
        id = this.id,
	    count = 0;

    var settings = JSON.parse(localStorage["settings"]); //salva i setting in un array
    var notificheAttive = ( (settings[settingon_off] == "true") * (settings[notif_park] == "true") ? "true" : "false" );

    var error;

    if (notificheAttive != "true") {
        // esce se le notifiche non sono attive
        //rimuoviTutteNotifiche();
        error = "Notifiche preferiti disattivate nei setting";

    } else if (giorniNotifiche == null) {
        error = "Nessun giorno di parcheggio trovato";
    }

    if (error != null) {
        return (error);
    }

    var id_via = id,
        via = matrixLavaggio.getObjectById(id_via).viaGoogle,
        title,
        sound,
        i,
        id_temp;
	var id = new Array,
	    day = new Array,
	    month = new Array,
	    text = new Array,
	    at = new Array;

	//RIEMPI GLI ARRAY CON LE INFORMAZIONI DA METTERE LE NOTIFICHE
    for (var i = 0; i < giorniNotifiche.length; i++) {

		//definizione array per notifica
        id_temp = "9" + pad(id_via, 4) + pad(i+1, 2);
		id[i] = parseInt(id_temp);
		day[i] = giorniLavaggio[i].getDate();
		month[i] = monthNames[giorniLavaggio[i].getMonth()];
		text[i] = notificationText(day[i], month[i], id_via);
		at[i] = giorniNotifiche[i];
	}
    
    this.idNotifiche = id;

	if (typeof (cordova) !== 'undefined') {

		//IMPOSTA VALORI DI DEFAULT PER LE NOTIFICHE
		title = notificationTitle("preferito");
		sound = notificationSound();
		small_icon = sm_icon();

		cordova.plugins.notification.local.setDefaults({
    	   title: title,
    	   sound: sound,
		   small_icon: small_icon,
    	});

		//SCHEDULA UNA ALLA VOLTA LE NOTIFICHE

		cordova.plugins.notification.local.schedule([
		  {
    	      id:     id[0],
    	      text: text[0],
    	      at:     at[0],
    	   },
    	   {
    	      id:     id[1],
    	      text: text[1],
    	      at:     at[1],
    	   },
    	   {
    	      id:     id[2],
    	      text: text[2],
    	      at:     at[2],
    	   },
    	   {
    	      id:     id[3],
    	      text: text[3],
    	      at:     at[3],
    	   },
    	   {
    	      id:     id[4],
    	      text: text[4],
    	      at:     at[4],
    	   },
    	   {
    	      id:     id[5],
    	      text: text[5],
    	      at:     at[5],
    	   },
    	   {
    	      id:     id[6],
    	      text: text[6],
    	      at:     at[6],
    	   },
    	   {
    	      id:     id[7],
    	      text: text[7],
    	      at:     at[7],
    	   },
    	   {
    	      id:     id[8],
    	      text: text[8],
    	      at:     at[8],
    	   },
    	   {
    	      id:     id[9],
    	      text: text[9],
    	      at:     at[9],
    	   },
    	   {
    	      id:     id[10],
    	      text: text[10],
    	      at:     at[10],
    	   },
           {
               id:     id[11],
               text: text[11],
               at:     at[11],
           },
        ]);

	} else {
			error = "LocalNotification non eseguibile: <br />" + giorniNotifiche[0];
			console.log(giorniNotifiche.join("\n"));
			return (error);
    }
    
    return ("Notifiche attivate!<br />Prossima notifica " + giorniNotifiche[0]);
};

Preferito.prototype.rimuoviNotifiche = function () {
    // rimuovi tutte le notifiche presenti
    //localStorage.removeItem('Notifiche');
	if (typeof (cordova) !== 'undefined') {
		cordova.plugins.notification.local.cancel(
			[this.idNotifiche[0], 
             this.idNotifiche[1], 
             this.idNotifiche[2], 
             this.idNotifiche[3], 
             this.idNotifiche[4], 
             this.idNotifiche[5], 
             this.idNotifiche[6], 
             this.idNotifiche[7], 
             this.idNotifiche[8], 
             this.idNotifiche[9], 
             this.idNotifiche[10], 
             this.idNotifiche[11], 
             ],
			function(){
				console.log("Cancellate notifiche parcheggio. ID: " + this.idNotifiche);
			}
		);
	} else {
        console.log("cancellavo notifiche parcheggio. ID: " + this.idNotifiche);
		return ("LocalNotification non eseguibile su browser");
	}
};


function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}
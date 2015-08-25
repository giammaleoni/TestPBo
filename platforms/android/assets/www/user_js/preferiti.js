//***********************************************
// gestione ad oggetti per le notifiche
// delle vie inserite nei preferiti
// work in progress
//***********************************************

// variabili glocali sempre accessibili
var preferitiObj = [];  // preferiti
var lavaggioPref;       // giornate di lavaggio dei preferiti ordinate per data

//aggiornaPreferiti(null, "init");

aggiornaPreferiti = function (id, action) {

	switch(action) {
        case "add":
            // aggiunte notifiche preferiti
            preferitiObj[id] = new Preferito(id);
            preferitiObj[id].impostaNotifiche();
            riempiGiornateLavaggioPref();
            break;

        case "remove":
            //rimuove notifiche preferiti
            if (!preferitiObj[id]) {
                return;
            }
            preferitiObj[id].rimuoviNotifiche();
            preferitiObj[id] = null;
            //app.custLog(preferitiObj[id]);
            riempiGiornateLavaggioPref();
            break;

        case "update":
            //aggiorna le notifiche e la variabile preferitiObj;
            preferitiObj.forEach(function(entry) {
                if (entry){
                  entry.rimuoviNotifiche();
                	entry.impostaNotifiche();
								}
            });
            riempiGiornateLavaggioPref();
            break;

        case "init":
            // inizializzo
            var preferiti = localStorage.preferiti ? JSON.parse(localStorage.preferiti) : [];

            for (var i = 0; i < preferiti.length; i++) {
                aggiornaPreferiti(preferiti[i], "add");
            }
            riempiGiornateLavaggioPref();

            break;

        case "list":
            riempiGiornateLavaggioPref();
            break;

        default: //cazzi
            return preferitiObj[id];
            break;
    }
};



var Preferito = function(id) {
	console.log('Creazione oggetto preferito ' + id);
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
    //console.log(this.giorniLavaggio);

};


Preferito.prototype.calcolaNotifiche = function () {
	//
	this.giorniNotifiche = calcolaNotifiche(this.id);
    //console.log(this.giorniNotifiche);
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
    var notificheAttive = ( (settings[settingon_off] == "true") * (settings[notif_pref] == "true") ? "true" : "false" );

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
						data: { tipo: "preferito" },
    	   },
    	   {
    	      id:     id[1],
    	      text: text[1],
    	      at:     at[1],
						data: { tipo: "preferito" },
    	   },
    	   {
    	      id:     id[2],
    	      text: text[2],
    	      at:     at[2],
						data: { tipo: "preferito" },
    	   },
    	   {
    	      id:     id[3],
    	      text: text[3],
    	      at:     at[3],
						data: { tipo: "preferito" },
    	   },
    	   {
    	      id:     id[4],
    	      text: text[4],
    	      at:     at[4],
						data: { tipo: "preferito" },
    	   },
    	   {
    	      id:     id[5],
    	      text: text[5],
    	      at:     at[5],
						data: { tipo: "preferito" },
    	   },
    	   {
    	      id:     id[6],
    	      text: text[6],
    	      at:     at[6],
						data: { tipo: "preferito" },
    	   },
    	   {
    	      id:     id[7],
    	      text: text[7],
    	      at:     at[7],
						data: { tipo: "preferito" },
    	   },
    	   {
    	      id:     id[8],
    	      text: text[8],
    	      at:     at[8],
						data: { tipo: "preferito" },
    	   },
    	   {
    	      id:     id[9],
    	      text: text[9],
    	      at:     at[9],
						data: { tipo: "preferito" },
    	   },
    	   {
    	      id:     id[10],
    	      text: text[10],
    	      at:     at[10],
						data: { tipo: "preferito" },
    	   },
           {
	           id:     id[11],
	           text: text[11],
	           at:     at[11],
						 data: { tipo: "preferito" },
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

//***********************************************
// calcola le date di lavaggio dei preferiti
//
//***********************************************

calcolaLavaggioPref = function () {
    var lavaggio = new Array();
    var rigaLavaggio;

    for (var i = 0; i < preferitiObj.length; i++) { //loopa su ogni strada

        if ( preferitiObj[i] == undefined) { continue; }
        // salta le id delle vie che non sono nei preferiti

        for (var k = 0; k < preferitiObj[i].giorniLavaggio.length; k++) { //loopa sui lavaggi

            rigaLavaggio = {
                id:         preferitiObj[i].id,
                timestamp:  preferitiObj[i].giorniLavaggio[k].getTime(),
                year:       preferitiObj[i].giorniLavaggio[k].getFullYear(),
                month:      preferitiObj[i].giorniLavaggio[k].getMonth(),
                day:        preferitiObj[i].giorniLavaggio[k].getDate(),
                num:        k,
                sequence:   null,
            };

            lavaggio.push(rigaLavaggio);
        }

    }

    return lavaggio;
};

ordinaLavaggioPref = function (lavaggio) {
    if (lavaggio == undefined || lavaggio == null) { return; }

    lavaggio.sort(function(a, b){return a.timestamp - b.timestamp});

    return (lavaggio);
};


//***********************************************
// riempie la pagina di riepilogo giornate
// con le date di lavaggio dei preferiti
//***********************************************

riempiGiornateLavaggioPref = function () {
    var parcheggio = localStorage.parcheggio,
        counter = 0,
        preferitiSalvati,
        action;

    // raccoglie tutte le giornate lavaggio preferiti e le ordina
    lavaggioPref = calcolaLavaggioPref();
    lavaggioPref = rimuoviParcheggioPref(lavaggioPref);
    lavaggioPref = ordinaLavaggioPref(lavaggioPref);
    app.custLog("Elementi lavaggio Pref:", lavaggioPref.length);
		//app.custLog("LavaggioPref: ")
    //app.custLog(lavaggioPref);

    if (lavaggioPref.length > 0) {
    // riempire con le giornate dei preferiti
        action = "preferiti";
        riempiLavaggioPref(action);
        return;
    } else if (parcheggio != undefined) {
        action = "clear"
        riempiLavaggioPref(action);
        return;
    }

    // definisce ulteriori action
    if (preferitiObj.length == 0) {
        preferitiSalvati = null;
    } else {

        for (var i = 0; i < preferitiObj.length; i++) {
            if (preferiti[i] == undefined || preferiti[i] == null) { counter++; }
        }

        if (counter == preferitiObj.length) { preferitiSalvati = null; }

    }

    if (parcheggio == undefined && preferitiSalvati == null) {
    // se non c'è parcheggio e se non ci sono preferiti, scrive le indicazioni su cosa fare
        action = "istruzioni";
        riempiLavaggioPref(action);
        return;
    }

};

//***********************************************
// se non ci sono preferiti e non si è parcheggiato,
// mostra le istruzioni
//***********************************************

riempiLavaggioPref = function (action, numMesi) {

	switch(action) {
        case "preferiti":

            var header,
                rigaPreferito = [],
                table,
                monthIndex,
                obj,
                nome_via,
								numMesi = numMesi || 3;		//di default faccio  vedere 3 mesi, se passo un numero diverso

								if (numMesi > 12) {				//il valore massimo di num mesi è 12
									numMesi = 12;
								}

            header =
                "<br /><hr /><br />" +
                "<img id='star_txt'> " +
                "Nelle vie preferite il lavaggio strade è previsto:<br />"+
                "dalle ore 00.30 alle ore 06:00 nei giorni:<br /><br /><hr /><br />"
            ;

            for (var j=0; j<numMesi; j++) {

                monthIndex = lavaggioPref[j].month;
                obj = matrixLavaggio.getObjectById(lavaggioPref[j].id);
                // il nome della via da stampare in funzione del dettaglio Hera)
                if (obj.dettaglioHera) {
                    nome_via = obj.viaGoogle +
                        "<br />" +
                        "(" + obj.dettaglioHera + ")"
                    ;
                } else {
                    nome_via = obj.viaGoogle + " ";
                }

//                rigaPreferito[j] =
//                                    "<td width='10%'>" +
//                                    lavaggioPref[j].day +
//                                    "</td><td width='25%'>" +
//                                    monthNames[monthIndex] +
//                                    " " +
//                                    lavaggioPref[j].year +
//                                    "</td><td width='65%'>" +
//                                    nome_via +
//                                    "</td>";
                rigaPreferito[j] =
                                    "<td width='35%'>" +
                                    lavaggioPref[j].day +
                                    " " +
                                    monthNames[monthIndex] +
                                    " " +
                                    lavaggioPref[j].year +
                                    "</td><td>" +
                                    nome_via +
                                    "</td>";
            };

            table = "<table class='elenco'><tr>" + rigaPreferito.join("<tr></tr>") + "</tr></table>";
						more = "<br /><a class='button-home noOpacity istruzioni' onclick=riempiLavaggioPref('preferiti',12);>Più date...</a>"

            $("#listaLavaggioPref").html(
                header +
                table +
								more
            );
            break;

        case "clear":
            $("#listaLavaggioPref").html("");
            break;

        case "istruzioni":
            // aggiornare istruzioni

            var tastoParcheggia = "<a class='button-home noOpacity icon pin istruzioni parcheggia'>Parcheggia</a>",
                tastoSettings = "<a class='button-home widget uib_w_10 noOpacity icon settings istruzioni parcheggia' href='#sett_page' data-transition='up'>Impostazioni</a>",
                tastoHome = "<a class='button-home widget uib_w_10 noOpacity icon home istruzioni parcheggia' href='#mainpage' data-transition='slide'>Torna a Home</a>";

            var infowindow =
                '<div class="infowindow istruzioni"><div style="position: absolute; left: 0px; top: 0px;"><div style="width: 0px; height: 0px; border-right-width: 10px; border-right-style: solid; border-right-color: transparent; border-left-width: 10px; border-left-style: solid; border-left-color: transparent; border-top-width: 24px; border-top-style: solid; border-top-color: rgba(0, 0, 0, 0.0980392); position: absolute; left: 89px; top: 68px;"></div><div style="position: absolute; left: 0px; top: 0px; border-radius: 2px; -webkit-box-shadow: rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px; box-shadow: rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px; width: 198px; height: 68px; background-color: rgba(0, 0, 0, 0.2);"></div><div style="border-top-width: 24px; position: absolute; left: 89px; top: 65px;"><div style="position: absolute; overflow: hidden; left: -6px; top: -1px; width: 16px; height: 30px;"><div style="position: absolute; left: 6px; transform: skewX(22.6deg); transform-origin: 0px 0px 0px; height: 24px; width: 10px; box-shadow: rgba(0, 0, 0, 0.6) 0px 1px 6px; background-color: rgb(255, 255, 255);"></div></div><div style="position: absolute; overflow: hidden; top: -1px; left: 10px; width: 16px; height: 30px;"><div style="position: absolute; left: 0px; transform: skewX(-22.6deg); transform-origin: 10px 0px 0px; height: 24px; width: 10px; box-shadow: rgba(0, 0, 0, 0.6) 0px 1px 6px; background-color: rgb(255, 255, 255);"></div></div></div><div style="position: absolute; left: 1px; top: 1px; border-radius: 2px; width: 196px; height: 66px; background-color: rgb(255, 255, 255);"></div></div><div class="gm-style-iw" style="top: 9px; position: absolute; left: 15px; width: 168px;"><div style="display: inline-block; overflow: auto; max-height: 322px; max-width: 279px;"><div style="overflow: auto;"><img id="star_txt2" class="grayscale"><div id="contenuto" class="iw-popup"><div id="headingInfoWindowIstruzioni" class="firstHeading"><b>Via Augusto Righi, 12<b></b></b></div><div id="bodyContent"><p>Lavaggio: 24 Settembre</p><p></p></div></div></div></div></div><div style="width: 13px; height: 13px; overflow: hidden; position: absolute; opacity: 0.7; right: 12px; top: 10px; z-index: 10000; cursor: pointer; visibility: hidden;"><img src="http://maps.gstatic.com/mapfiles/api-3/images/mapcnt6.png" draggable="false" style="position: absolute; left: -2px; top: -336px; width: 59px; height: 492px; -webkit-user-select: none; border: 0px; padding: 0px; margin: 0px;"></div></div>';

            $("#listaLavaggioPref").html(
                "Benvenuto in ParkinBo: evita il carro attrezzi!<br /><br />" +
                "Per ricevere una notifica la sera prima del lavaggio delle strada in cui hai parcheggiato, usa il bottone <br />" +
                tastoParcheggia +
                "<br /><br />" +
                "Oppure aggiungi le vie ai preferiti <img id='star_txt'> " +
                "così puoi essere informato su tutto il quartiere <br /><br />" +
                infowindow +
                "<br /><br />"+
                "Ricorda: puoi cambiare le impostazioni in qualsiasi momento <br />" +
                tastoSettings +
                "<br /><br />" +
                "Comincia subito! <br />" +
                tastoHome
            );
            break;
    }
};



//***********************************************
// se non ci sono preferiti e non si è parcheggiato,
// mostra le istruzioni
//***********************************************

rimuoviParcheggioPref = function (lavaggio) {
    var parcheggio = localStorage.parcheggio;

    if (parcheggio == undefined) { return lavaggio; }

    for (var i = lavaggio.length; i != 0; i--) {
        if (lavaggio[i-1].id == parcheggio) {
            lavaggio.splice(i-1, 1);
        }
    }

        return lavaggio;
};

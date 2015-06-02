//***********************************************
// gestione ad oggetti per le notifiche
// delle vie inserite nei preferiti
// work in progress
//***********************************************



aggiornaPreferiti = function (action, id) {

	var preferito = [];
	preferito[0] = new Preferito(id);
};



var Preferito = function(id) {
	console.log('Creazione Notifiche preferito ' + id);
	if (id) {
		this.id = id; // imposta l'attributo id dell'oggetto corrente (this)
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
	this.giorniLavaggio = '';
};


Preferito.prototype.calcolaNotifiche = function () {
	//
	this.giorniNotifiche = '';
};


Preferito.prototype.cancellaNotifiche = function () {
	//
};
//***********************************************
// Max 10.05.2015
// dichiarazione delle costanti usate per i setting
// collegano i campi dell'array al relativo setting
// al momento sono usate solo da notifications2.js
//***********************************************

// ** todo: usarle anche per salvare i setting in salvaIlDato, in questo modo:
// settings_new[setting.ora] = document.getElementById("ora").value;

// ** todo: usarle anche per leggere i setting in recuperaIlDato

const settingon_off = 0;
const settingora = 1;
const settinggiorni1 = 2;
const settinggiorni2 = 3;
const notif_park = 4;
const notif_pref = 5;
const mezzoDiTrasporto = 6;
// la version
const settingversion = 1;

//***********************************************
// Salva i settings nella local storage
// viene chiamato ogni volta che viene premuto "home" nei settings
//***********************************************
salvaIlDato = function(){
	var settings = [];
	var settings_new = [];

	settings_new[0] = "" + document.getElementById("on_off").checked; //le virgolette servono perchè checked non è una stringa in se e per se
	settings_new[1] = document.getElementById("ora").value;
	settings_new[2] =  document.getElementById("giorni1").value;
	settings_new[3] =  document.getElementById("giorni2").value;
	settings_new[4] = "" + document.getElementById("notif_park").checked;
	settings_new[5] = "" + document.getElementById("notif_pref").checked;
	settings_new[mezzoDiTrasporto] = document.getElementById("selectMezzo").value;

	var sett = localStorage.settings;
	if (sett != undefined){
		settings = JSON.parse(localStorage["settings"]);
	}

	//i settings vengono salvati solo se sono stati modificati
	for(i=0;i<7;i++){
		if(settings_new[i] != settings[i]){
			localStorage.settings = JSON.stringify(settings_new);
			break;
		}
	}
	aggiornaPreferiti(null,"update");

};


//***********************************************
// Recupera i settings dalla local storage
// viene chiamato ogni volta che viene premuto il pulsante "settings" nella #mainpage
//***********************************************
recuperaIlDato = function(){

	var settings = []
	var sett = localStorage.settings;
	if (sett == undefined){

		var venti = new Date()
		venti.setHours(20,00,00,00);

		settings[settingon_off] = "true";	// 0
		settings[settingora] = venti.getDay; //"20:00";
		settings[settinggiorni1] = "1";		// 2
		settings[settinggiorni2] = "";
		settings[notif_park] = "true";		// 4
		settings[notif_pref] = "true";
		settings[mezzoDiTrasporto] = "0";	// 6
		localStorage.settings = JSON.stringify(settings);

	}else{
		settings = JSON.parse(localStorage["settings"]);
	}

	//switch
	if (settings[0] == "true"){
		document.getElementById("on_off").checked  = true;
	}else{
		document.getElementById("on_off").unchecked;
		$(".daNascondere").toggleClass("nascosto");
	}

	//ora
	document.getElementById("ora").value = settings[1];

	//giorni
	document.getElementById("giorni1").value = settings[2];
	document.getElementById("giorni2").value = settings[3];

	// mezzo di trasporto
	//document.getElementById("selectMezzo").value = settings[mezzoDiTrasporto];
	$("#selectMezzo").val(settings[mezzoDiTrasporto]);

	//Notifiche per parcheggio e/o preferiti
	if (settings[4] == "true"){
		document.getElementById("notif_park").checked  = true;
	}else{
		document.getElementById("notif_park").unchecked;
	}

	if (settings[5] == "true"){
		document.getElementById("notif_pref").checked  = true;
	}else{
		document.getElementById("notif_pref").unchecked;
	}

};



//***********************************************
// Controlla che i giorni del memo non coincidono e che il minore sia sempre il primo
// viene chiamato onchange di uno dei due memo
//***********************************************
checkGiorni = function(){
	var var1 = document.getElementById("giorni1").value;
	var var2 = document.getElementById("giorni2").value;
	var var3;

	if (var1 == var2){
		document.getElementById("giorni2").value = null;
		infoMsg("I giorni di preavviso coincidono, secondo valore annullato", "Settings");
	}else if (var1 > var2 && var2 != ""){
		var3 = var1;
		var1 = var2;
		var2 = var3;
		document.getElementById("giorni1").value = var1;
		document.getElementById("giorni2").value = var2;
		infoMsg("Il memo1 viene impostato automaticamente come valore minore", "Settings");
	};
};

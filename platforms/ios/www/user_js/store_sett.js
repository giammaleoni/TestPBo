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
	
	var sett = localStorage.settings;
	if (sett != undefined){
		settings = JSON.parse(localStorage["settings"]);
	}
	
	//i settings vengono salvati solo se sono stati modificati
	for(i=0;i<4;i++){
		if(settings_new[i] != settings[i]){
			localStorage.settings = JSON.stringify(settings_new);
			break;
		}
	}
	
//	var x1 = "" + document.getElementById("on_off").checked; //le virgolette servono perchè checked non è una stringa in se e per se
//	var x2 = document.getElementById("ora").value;
//	var x3 = document.getElementById("giorni1").value;
//	var x4 = document.getElementById("giorni2").value;
//	var x5 = localStorage.sett1; //on_off
//	var x6 = localStorage.sett2; //ora
//	var x7 = localStorage.sett3; //giorni1
//	var x8 = localStorage.sett4; //giorni2
	
	//i settings vengono salvati solo se sono stati modificati
//	if (x5 != x1 || x6 != x2 || x7 != x3 || x8 != x4){
//		localStorage.sett1 = x1; 
//		localStorage.sett2 = x2;
//		localStorage.sett3 = x3; 
//		localStorage.sett4 = x4; 
//		infoMsg("Setting salvati");
//	};
};


//***********************************************
// Recupera i settings dalla local storage
// viene chiamato ogni volta che viene premuto il pulsante "settings" nella #mainpage
//*********************************************** 
recuperaIlDato = function(){
 
//	var set = localStorage.getItem("sett1")
//	if (set == null){
//		set = "true";
//		localStorage.sett1 = set;
//		localStorage.sett2 = "20:00";
//		localStorage.sett3 = "1"
//		localStorage.sett4 = "2";	
//	}

	var settings = []
	var sett = localStorage.settings;
	if (sett == undefined){
		settings[0] = "true";
		settings[1] = "20:00";
		settings[2] = "1"
		settings[3] = "";	
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


	
	
	
//	//switch
//	if (set == "true"){
//		document.getElementById("on_off").checked  = true;
//	}else if (set != "true"){
//		document.getElementById("on_off").unchecked;
//	}
//	
//	//ora
//	document.getElementById("ora").value = localStorage.getItem("sett2");
//
//	//giorni
//	document.getElementById("giorni1").value = localStorage.getItem("sett3");
//	document.getElementById("giorni2").value = localStorage.getItem("sett4");

	//hide ora --> obsoleto: ora c'è il togle class
	//check_sveglia();
};


//***********************************************
//mostra e nasconde la sveglia a seconda che sia attiva o meno
// viene chiamato al caricamento dei "settings" e ogni volta che tocco lo switch "promemoria"
//***********************************************
//OBSOLETO
//***********************************************
//check_sveglia = function(){
// 	var sveglia = document.getElementById("on_off").checked;
//	
//	if (true == sveglia){	
////BUG: se accendo lo switch non si vedono le etichette
//		document.getElementById("ora").hidden = false;
//		document.getElementById("ora_label").innerHTML = "Ora";
//		
//		document.getElementById("giorni1").hidden = false;
//		document.getElementById("giorni_label1").innerHTML = "Giorni di preavviso memo 1";
//		document.getElementById("giorni2").hidden = false;
//		document.getElementById("giorni_label2").innerHTML = "Giorni di preavviso memo 2";
//	}else{
//		document.getElementById("ora").hidden = true;
//		document.getElementById("ora_label").innerHTML = null;
//		
//		document.getElementById("giorni1").hidden = true;
//		document.getElementById("giorni_label1").innerHTML = null;
//		document.getElementById("giorni2").hidden = true;
//		document.getElementById("giorni_label2").innerHTML = null;
//	}
//	
//};

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

// constant declatration
// constant declatration
var X = "X";
var monthNames = [
        "Gennaio", "Febbraio", "Marzo",
        "Aprile", "Maggio", "Giugno", "Luglio",
        "Agosto", "Settembre", "Ottobre",
        "Novembre", "Dicembre"
    ];

//***********************************************
//Giorno e settimana
// converte il primo numero passato nel progressivo
// ed il secondo nel giorno della settimana
//***********************************************
getWeekDay = function(week,day){
	switch(week) {
        case 1:
            var week_string ="1°";
            break;
        case 2:
            var week_string ="2°";
            break;
        case 3:
            var week_string ="3°";
            break;
        case 4:
            var week_string ="4°";
            break;
        case 5:
            var week_string ="5°";
            break;
	};

	switch(day) {
        case 1:
            var day_string ="lunedì";
            break;
        case 2:
            var day_string ="martedì";
            break;
        case 3:
            var day_string ="mercoledì";
            break;
        case 4:
            var day_string ="giovedì";
            break;
        case 5:
            var day_string ="venerdì";
            break;
    	case 6:
    	    var day_string ="sabato";
   	     	break;
  	  	case 7:
        	var day_string ="domenica";
        	break;
	};

	return [week_string, day_string];

};

//***********************************************
// Elimina il parcheggio dalla local storage
//***********************************************
sparcheggia = function(){ 

	if (localStorage.parcheggio == null){
		console.log("Auto non parcheggiata");
	}else{
		localStorage.removeItem("parcheggio");
		localStorage.removeItem("puntatoreLatLonPark")
		if (localStorage.parcheggio == null){
			infoMsg("Hai appena sparcheggiato la macchina");
			parkAttuale();
			$('#listaLavaggio').html('');
		};
	};	
};


//***********************************************
//	Passati il giorno della week e il counter restituisce l'elenco 
//	dey giorni per 12 mesi in un array ("days[]")
//***********************************************
getDays12Months = function(n_giorno, giorno){

//    var n_giorno = 4;				//counter del giorno nel mese	--> 4°
//    var giorno = 3;				//giorno della week 			--> mercoledì

    var d;
    var today =  new Date();
    var month = today.getMonth();
    var year = today.getFullYear();
    var day = today.getDate();
    var count;
    var days = [];	


    for(i=0; i<12; i++){
    	//d = new Date(today.getFullYear(),month,today.getDate());
		//d.setDate(1);
		d = new Date(today.getFullYear(),month)
    	month++;

    
        // Get the first "giorno" of the month
        while (d.getDay() !== giorno) {
            d.setDate(d.getDate() + 1);
        }
    
 	   // Get the n_giorno° "giorno of the month
 	   count = 1;
		while (count <= n_giorno){
			days[i] = new Date(d.getTime());
 	       d.setDate(d.getDate() + 7);
 	       count = count + 1;
 	   }
	}

//    alert(days.join('\n'));
    return(days);
};

//***********************************************
//	restituisce le date per cui si deve pianificare il job
//	per la via in memoria
//***********************************************
getDays12MonthByAddress = function(NoAlert, indirizzo){
	
	var via = indirizzo || localStorage.parcheggio;
	
	if (via != null){

		//da fixare prende sempre il primo giorno di lavaggio!!!
		if (matrixLavaggio.getObjectById(via).constructor === Array){
			var n_g = matrixLavaggio.getObjectById(via)[0].week;
			var g = matrixLavaggio.getObjectById(via)[0].day;
		}else{
			var n_g = matrixLavaggio.getObjectById(via).week;
			var g = matrixLavaggio.getObjectById(via).day;

		}
		
		if (n_g != null && g != null){
			var giorniJob = getDays12Months(n_g,g);
			var weekDay_string = getWeekDay(n_g,g);
			var n_g_string = weekDay_string[0];
			var g_string = weekDay_string[1];
		
			if (NoAlert != "X"){
				//alert(giorniJob.join("\n"));
				return (giorniJob);
			}else{
				var giorniJobForm = [];
				for (j=0;j<12;j++){
					var monthIndex = giorniJob[j].getMonth();
					giorniJobForm[j] = giorniJob[j].getDate() + " " + monthNames[monthIndex] + " " + giorniJob[j].getFullYear() + " 00:00";
				};
				document.getElementById("listaLavaggio").innerHTML = "In " + matrixLavaggio.getObjectById(via).viaGoogle + " il lavaggio strade è previsto il "+ n_g_string + " " + g_string+ " del mese <hr /><br /> <ul><il>" + giorniJobForm.join("</il><br /><il>")+"</ul>";
			}
		}else{
			if (NoAlert != "X"){
				infoMsg("Via non presente in anagrafica");
				//evita l'errore in case di cambio elenco vie
				localStorage.removeItem('parcheggio');
			}else{
				document.getElementById("listaLavaggio").innerHTML = null;
				infoMsg("Via non presente in anagrafica");
			};
		}	
	}else{
		if (NoAlert != "X"){
			infoMsg("Auto non parcheggiata");
		}else{
			document.getElementById("listaLavaggio").innerHTML = null;
			infoMsg("Auto non parcheggiata");
		};
	};
};

//***********************************************
//	Scrive la via in cui è parcheggiata l'auto nella main page
//	
//***********************************************
parkAttuale = function(){
	var parcheggio = localStorage.parcheggio;
	if (parcheggio == null || parcheggio == "" || typeof parcheggio == 'undefined'){
		document.getElementById("park_id").innerHTML = "L'auto non è parcheggiata";
		document.getElementById("park_id2").innerHTML = "";
	}else{
		if (matrixLavaggio.getObjectById(parcheggio).dettaglioHera){
			document.getElementById("park_id").innerHTML = "<i>L'auto è attualmente parcheggiata in</i><br>" + matrixLavaggio.getObjectById(parcheggio).viaGoogle +", <i>" + matrixLavaggio.getObjectById(parcheggio).dettaglioHera + "</i>";
		}else{
			document.getElementById("park_id").innerHTML = "<i>L'auto è attualmente parcheggiata in</i><br>" + matrixLavaggio.getObjectById(parcheggio).viaGoogle;
		}
		//recupero il primo giorno del lavaggio o uguale alla data odierna
		var arrayGiorni = getDays12MonthByAddress();
		var today = new Date();
		var settings = JSON.parse(localStorage["settings"]);
		var memo1 = settings[2];
		var diff;
		for (i=0;i<12;i++){
			//orario limite per considerare il lavaggio concluso --> 06:00:00
			arrayGiorni[i].setHours(6,0,0,0);
			if(arrayGiorni[i] >= today) {
				//1000 milli secondi * 60 secondi * 60 minuti * 24 ore
				diff = Math.round((arrayGiorni[i] - today)/(1000*60*60*24));
				var month = arrayGiorni[i].getMonth();
    			var year = arrayGiorni[i].getFullYear();
    			var day = arrayGiorni[i].getDate();
    			var day7 = arrayGiorni[i].getDay();
    			var weekDay = getWeekDay(null,day7);
    			// se la differenza è inferiore o uguale al memo1 evidenzio in rosso
				if (diff <= memo1){
					$("#park_id2").addClass("red");
					document.getElementById("park_id2").innerHTML = "ATTENZIONE!! <br> Prossimo lavaggio: " + weekDay[1] + " " + day + " " + monthNames[month] + " " + year;
				}else{
    				$("#park_id2").removeClass("red");
					document.getElementById("park_id2").innerHTML = "Prossimo lavaggio: " + weekDay[1] + " " + day + " " + monthNames[month] + " " + year;
				}
				break;
			}
		}
	};
}

//***********************************************
//	Parcheggia con dropdownlist
//	
//***********************************************
parcheggiaDD = function(){
	var via = document.getElementById("id_via").value;
	//funzione che esegue il parcheggio
	park(via);
}

//***********************************************
//	Funzione che contiene tutti gli step del parcheggio
//		viene richiamata dalla dropdown list o dalla geolocalizzazione
//***********************************************
park = function(indirizzo){
	
	//da fixare prende sempre il primo giorno di lavaggio!!!
	if (matrixLavaggio.getObjectById(indirizzo).constructor === Array){
		var check1 = matrixLavaggio.getObjectById(indirizzo)[0].day;
		var check2 = matrixLavaggio.getObjectById(indirizzo)[0].week;
	}else{
		var check1 = matrixLavaggio.getObjectById(indirizzo).day;
		var check2 = matrixLavaggio.getObjectById(indirizzo).week;
	}
	
		if (check1 != null && check2 != null){
    		localStorage.parcheggio = indirizzo;
        	infoMsg("Hai parcheggiato in " + matrixLavaggio.getObjectById(indirizzo).viaGoogle);
    		parkAttuale();
			startNotifiche();
    	}else{
    		infoMsg("Tentato parcheggio in " + indirizzo + ", ma località non presente in anagrafica! Parcheggio non eseguito");
    	}
}


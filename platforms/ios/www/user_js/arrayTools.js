//***********************************************
//	Vertical lookup function:
//	Si utilizza per trovare le il valore di una colonna successiva
//  data in input la prima
//***********************************************
Array.prototype.vlookup = function(needle,index,exactmatch){
    index = index || 0;
    exactmatch = exactmatch || false;
    for (var i = 0; i < this.length; i++){
        var row = this[i];
 
        if ((exactmatch && row[0]===needle) || row[0].toLowerCase().indexOf(needle.toLowerCase()) != -1)
            return (index < row.length ? row[index] : row[0]);
    }
    return null;
}

//***********************************************
//	Move function:	
//	Riordina gli elementi in un array
//  sposta l'elemento dal vecchio indice al nuovo indice
//	da old index to new index
//***********************************************
Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};

//*******************************************
//	Cerca per Id
//*******************************************
Array.prototype.getObjectById = function(id){
	var returnedList = [];

	for (i=0; i < this.length; i++){
		if (this[i].id == id){
			returnedList.push(this[i]);
		}
	}
	
	if (returnedList.length > 1){
		//ritorno un array se ne trovo più si uno
		return returnedList;
	}else if(returnedList.length == 1){
		//ritorno un oggetto se ne trovo solo uno
		return returnedList[0];
	}else{
		//se non trovo nulla
		console.log("Oggetto non trovato!");
		return null;
	}
};

//*******************************************
//	Cerca per idHera
//*******************************************
Array.prototype.getObjectByIdHera = function(idHera){
	var returnedList = [];

	for (i=0; i < this.length; i++){
		if (this[i].idHera == idHera){
			returnedList.push(this[i]);
		}
	}
	
	if (returnedList.length > 1){
		//ritorno un array se ne trovo più si uno
		return returnedList;
	}else if(returnedList.length == 1){
		//ritorno un oggetto se ne trovo solo uno
		return returnedList[0];
	}else{
		//se non trovo nulla
		console.log("Oggetto non trovato!");
		return null;
	}
};

//*******************************************
//	Cerca per viaHera
//*******************************************
Array.prototype.getObjectByViaHera = function(viaHera){
	var returnedList = [];

	for (i=0; i < this.length; i++){
		if (this[i].viaHera == viaHera){
			returnedList.push(this[i]);
		}
	}
	
	if (returnedList.length > 1){
		//ritorno un array se ne trovo più di uno
		return returnedList;
	}else if(returnedList.length == 1){
		//ritorno un oggetto se ne trovo solo uno
		return returnedList[0];
	}else{
		//se non trovo nulla
		console.log("Oggetto non trovato!");
		return null;
	}
};

//*******************************************
//	Cerca per viaGoogle
//*******************************************
Array.prototype.getObjectByViaGoogle = function(viaGoogle){
	var returnedList = [];

	for (i=0; i < this.length; i++){
		if (this[i].viaGoogle == viaGoogle){
			returnedList.push(this[i]);
		}
	}
	
	return returnedList;
	
	//if (returnedList.length > 1){
		//ritorno un array se ne trovo più si uno
		//return returnedList;
	//}else if(returnedList.length == 1){
		//ritorno un oggetto se ne trovo solo uno
	//	return returnedList[0];
	//}else{
		//se non trovo nulla
	//	console.log("Oggetto non trovato!");
		//return null;
	//}
};

//***********************************************
//	Controlla se un numero è dispari isOdd(1) --> true
//***********************************************
function isOdd(num) { return num % 2;};
//*******************************************
//	Cerca per numero civico
//  da chiamare solo in caso in cui
//	getElementById restituisce un array
//  quindi 
//*******************************************
Array.prototype.getObjectByNum = function(num){
	var returnedList = [];
	
	while (num.search("-") != "-1") {
		num = num.slice(0, num.search("-"));
	}
	
	while (num.search(",") != "-1") {
		num = num.slice(0, num.search(","));
	}
	
		for (i=0; i < this.length; i++){
				if (isOdd(num)){
					if ((this[i].minDisp < num && num < this[i].maxDisp) || this[i].minDisp == num || this[i].maxDisp == num){
						returnedList.push(this[i]);
					}
				}else{
					if ((this[i].minPari < num && num < this[i].maxPari) || this[i].minPari == num || this[i].maxPari == num){
						returnedList.push(this[i]);
					}
				}
	
		}
	
	if (returnedList.length > 1){
		//ritorno un array se ne trovo più si uno
		alert("Conflitto! due vie con stesso numero")
		return null;
	}else if(returnedList.length == 1){
		//ritorno un oggetto se ne trovo solo uno
		return returnedList[0];
	}else{
		//se non trovo nulla
		console.log("oggetto non trovato!");
		return null;
	}
};

//*******************************************
//	Cerca per day
//*******************************************
Array.prototype.getObjectByDay = function(day){
	var returnedList = [];

	for (i=0; i < this.length; i++){
		if (this[i].day == day){
			returnedList.push(this[i]);
		}
	}
	
	if (returnedList.length > 1){
		//ritorno un array se ne trovo più si uno
		return returnedList;
	}else if(returnedList.length == 1){
		return returnedList;
	}else{
		//se non trovo nulla
		console.log("Oggetto non trovato!");
		return null;
	}
};

//*******************************************
//	Cerca per week
//*******************************************
Array.prototype.getObjectByWeek = function(week){
	var returnedList = [];

	for (i=0; i < this.length; i++){
		if (this[i].week == week){
			returnedList.push(this[i]);
		}
	}
	
	if (returnedList.length > 1){
		//ritorno un array se ne trovo più si uno
		return returnedList;
	}else if(returnedList.length == 1){
		return returnedList;
	}else{
		//se non trovo nulla
		console.log("Oggetto non trovato!");
		return null;
	}
};

//*******************************************
//	Restituisce l'id della via
//*******************************************
Array.prototype.getId = function(){
	if (this.length > 1) {
		console.log("La via non è stata determinata univocamente ");
		return;
	}
	
	var parcheggio = this[0];
	
	if (parcheggio.id) {
		return (parcheggio.id);
	} else {
		return null;
	}
};
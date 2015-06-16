//  LISTA VIA CITTA' DI BOLOGNA
//
//	Questo file contiene la lista delle strade così come viene preso da Google
//
// matrice con colonne: via|settimana|giorno
//	settimana --> 1 = prima sett. del mese
//  giorno	  --> 1 = lunedì

//**** La gestione della matrice ora viene assegnata ad uno script online
// 	la prima volta che viene eseguita l'app si deve essere connessi ad internet per 
//	eseguire lo script updateMatrixLavaggio.js e quindi scrivere per la prima volta sul local storage
// 	else gestisce 

if (localStorage.matrixLavaggioLocal){
	var matrixLavaggio = JSON.parse(localStorage["matrixLavaggioLocal"]);
}else{

//il problema di questa lista è che non è compatibile con google
//e non vi sono tutte le giornate dei lavaggi per le vie lunghe
	var matrixLavaggio = [
{id:0, idHera:551, viaHera:"A.RIGHI (VIA)", 	dettaglioHera: null, 										viaGoogle:"Via Augusto Righi", 		minDisp:1, 		minPari:2, 		maxDisp: 9999, 	maxPari: 9998, 	day:1, week:1},
{id:1, idHera:501, viaHera:"RIVA RENO (VIA)", 	dettaglioHera: "da via Marconi a via Galliera" , 			viaGoogle:"Via Riva di Reno", 		minDisp:1, 		minPari:2, 		maxDisp: 99, 	maxPari: 100, 	day:2, week:2},
{id:2, idHera:501, viaHera:"RIVA RENO (VIA)", 	dettaglioHera: "NO CENTRALE da via Lame a via S.Felice", 	viaGoogle:"Via Riva di Reno", 		minDisp:101, 	minPari:102,	maxDisp: 199, 	maxPari: 200, 	day:3, week:3},
{id:3, idHera:501, viaHera:"RIVA RENO (VIA)", 	dettaglioHera: "NO CENTRALE da via Marconi a via Lame", 	viaGoogle:"Via Riva di Reno", 		minDisp:201, 	minPari:202, 	maxDisp: 9999, 	maxPari: 9998, 	day:4, week:4},
{id:4, idHera:552, viaHera:"BERTIERA (VIA)", 	dettaglioHera: null, 										viaGoogle:"Via Bertiera", 			minDisp:1, 		minPari:2, 		maxDisp: 9999, 	maxPari: 9998, 	day:5, week:1},
{id:5, idHera:553, viaHera:"TEST (VIA)", 		dettaglioHera: null, 										viaGoogle:"Via Test", 				minDisp:1, 		minPari:2, 		maxDisp: 9999, 	maxPari: 9998, 	day:6, week:2},
{id:6, idHera:554, viaHera:"MODENA (VIA)", 		dettaglioHera: null, 										viaGoogle:"Via Modena", 			minDisp:1, 		minPari:2, 		maxDisp: 9999, 	maxPari: 9998, 	day:6, week:2},
{id:7, idHera:555, viaHera:"DON FORTUZZI (VIA)",dettaglioHera: null, 										viaGoogle:"Via Don Fortuzzi", 		minDisp:1, 		minPari:2, 		maxDisp: 9999, 	maxPari: 9998, 	day:6, week:2},
{id:8, idHera:556, viaHera:"TANARI (VIA)", 		dettaglioHera: null, 										viaGoogle:"Via Luigi Tanari", 		minDisp:1, 		minPari:2, 		maxDisp: 9999, 	maxPari: 9998, 	day:6, week:2},
							];
	var versioneMatrice = '0.0';
	localStorage.matriceVersione = versioneMatrice;
	console.log('nessuna connesione, caricamento matrice locale');
}


// Matrice icone per i settings
//var dirMarker = 'images/marker/';
var mezzi = {
	'0' : { name:"Google Maps" , 	path:"images/marker/1.png"},
	'1' : { name:"Auto" , 			path:"images/marker/2.png"},
	'2' : { name:"Traghetto" , 		path:"images/marker/3.png"},
}
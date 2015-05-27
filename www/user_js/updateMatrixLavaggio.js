// Questo script non è caricato dalla cartella ma è online (da decidere su quale sito)
// 		se la connessione è disponibile lo script si carica e aggiorna i dati sulla local storage che contiene
//		tutti i dati di tutte le vie di Bologna.

var matrixLavaggioNew = [
{id:0, idHera:551, viaHera:"A.RIGHI (VIA)", 	dettaglioHera: null , 										viaGoogle:"Via Augusto Righi", 		minDisp:1, 		minPari:2, 		maxDisp: 9999, 	maxPari: 9998, 	day:1, week:1},
{id:1, idHera:501, viaHera:"RIVA RENO (VIA)", 	dettaglioHera: "da via Marconi a via Galliera" , 			viaGoogle:"Via Riva Reno", 			minDisp:1, 		minPari:2, 		maxDisp: 99, 	maxPari: 100, 	day:2, week:2},
{id:2, idHera:501, viaHera:"RIVA RENO (VIA)", 	dettaglioHera: "NO CENTRALE da via Lame a via S.Felice", 	viaGoogle:"Via Riva Reno", 			minDisp:101, 	minPari:102,	maxDisp: 199, 	maxPari: 200, 	day:3, week:3},
{id:3, idHera:501, viaHera:"RIVA RENO (VIA)", 	dettaglioHera: "NO CENTRALE da via Marconi a via Lame", 	viaGoogle:"Via Riva Reno", 			minDisp:201, 	minPari:202, 	maxDisp: 9999, 	maxPari: 9998, 	day:4, week:4},
{id:4, idHera:553, viaHera:"BERTIERA (VIA)", 	dettaglioHera: null, 										viaGoogle:"Via Bertiera", 			minDisp:1, 		minPari:2, 		maxDisp: 9999, 	maxPari: 9998, 	day:5, week:1},
{id:5, idHera:554, viaHera:"TEST (VIA)", 		dettaglioHera: null, 										viaGoogle:"Via Test", 				minDisp:1, 		minPari:2, 		maxDisp: 9999, 	maxPari: 9998, 	day:6, week:2},
							];
							
localStorage.matrixLavaggioLocal = JSON.stringify(matrixLavaggioNew);
localStorage.matriceAggiornataAl = new Date();
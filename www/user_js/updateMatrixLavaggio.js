// Questo script non è caricato dalla cartella ma è online (da decidere su quale sito)
// 		se la connessione è disponibile lo script si carica e aggiorna i dati sulla local storage che contiene
//		tutti i dati di tutte le vie di Bologna.

var versioneMatrice = '0.5';
var versioneOld = localStorage.matriceVersione;


if (versioneOld != versioneMatrice) {
	console.log ('Nuova versione matrice aggiornata: ' + versioneMatrice);
	localStorage.matriceVersione = versioneMatrice;

	var matrixLavaggioNew = [
{id:1,	idHera:555,	viaHera:"A.COSTA (VIA)",	dettaglioHera:"da v.le Vicini a via Breventani",	viaGoogle:"Via Andrea Costa",	minDisp:1,	minPari:2,	maxDisp:69,	maxPari:50,	day:2,	week:4},
{id:2,	idHera:555,	viaHera:"A.COSTA (VIA)",	dettaglioHera:"da via Breventani a via Montefiorino",	viaGoogle:"Via Andrea Costa",	minDisp:71,	minPari:52,	maxDisp:141,	maxPari:200,	day:4,	week:4},
{id:3,	idHera:617,	viaHera:"A.RIGHI (VIA)",	dettaglioHera:"da via Moline a via Indipendenza",	viaGoogle:"Via Augusto Righi",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:3,	week:4},
{id:4,	idHera:508,	viaHera:"ABBADIA (VIA)",	dettaglioHera:"da via Riva Reno a via Otto Colonne",	viaGoogle:"Via dell'Abbadia",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:2,	week:1},
{id:5,	idHera:609,	viaHera:"ACRI (VIA)",	dettaglioHera:"da largo Trombetti a via Bibbiena",	viaGoogle:"Via Francesco Acri",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:3,	week:3},
{id:6,	idHera:541,	viaHera:"ALBIROLI (VIA)",	dettaglioHera:"da Piazzetta Prendiparte a via Goito, da via Marsala a via Goito",	viaGoogle:"Via Albiroli",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:2,	week:3},
{id:7,	idHera:643,	viaHera:"ALESSANDRINI (VIA)",	dettaglioHera:null,	viaGoogle:"Via Alessandrini",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:4,	week:1},
{id:8,	idHera:539,	viaHera:"ALTABELLA (VIA)",	dettaglioHera:"da via Fossalta a via Oberdan",	viaGoogle:"Via Altabella",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:2,	week:3},
{id:9,	idHera:519,	viaHera:"ALTASETA (VIA)",	dettaglioHera:null,	viaGoogle:"Via Altaseta",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:2,	week:2},
{id:10,	idHera:577,	viaHera:"AMENDOLA (VIA)",	dettaglioHera:null,	viaGoogle:"Via Giovanni Amendola",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:3,	week:2},
{id:11,	idHera:653,	viaHera:"ANDALO' (VIA)",	dettaglioHera:null,	viaGoogle:"Via Loderingo Degli Andalò",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:4,	week:2},
{id:12,	idHera:731,	viaHera:"ARIENTI (VIA)",	dettaglioHera:null,	viaGoogle:"Via Arienti",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:5,	week:4},
{id:13,	idHera:741,	viaHera:"ARTIERI (VIA)",	dettaglioHera:null,	viaGoogle:"Via degli Artieri",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:5,	week:2},
{id:14,	idHera:566,	viaHera:"AVESELLA (VIA)",	dettaglioHera:null,	viaGoogle:"Via Avesella",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:3,	week:1},
{id:15,	idHera:526,	viaHera:"AZZARITA (P.ZZA)",	dettaglioHera:"da via Calori a via Grimaldi",	viaGoogle:"Piazza Manfredi Azzarita",	minDisp:5,	minPari:4,	maxDisp:5,	maxPari:6,	day:2,	week:2},
{id:16,	idHera:526,	viaHera:"AZZARITA (P.ZZA)",	dettaglioHera:"da via Calori a via Riva Reno",	viaGoogle:"Piazza Manfredi Azzarita",	minDisp:1,	minPari:8,	maxDisp:3,	maxPari:8,	day:2,	week:2},
{id:17,	idHera:500,	viaHera:"AZZO GARDINO (VIA)",	dettaglioHera:"da via Riva Reno a L.go c.ti del lavoro",	viaGoogle:"Via Azzo Gardino",	minDisp:1,	minPari:0,	maxDisp:3,	maxPari:10,	day:2,	week:1},
{id:18,	idHera:500,	viaHera:"AZZO GARDINO (VIA)",	dettaglioHera:"da via Castellaccio a via del Rondone ambo i lati",	viaGoogle:"Via Azzo Gardino",	minDisp:23,	minPari:0,	maxDisp:23,	maxPari:51,	day:2,	week:2},
{id:19,	idHera:500,	viaHera:"AZZO GARDINO (VIA)",	dettaglioHera:"da via Menarini a via Del Rondone",	viaGoogle:"Via Azzo Gardino",	minDisp:55,	minPari:38,	maxDisp:65,	maxPari:40,	day:3,	week:4},
{id:20,	idHera:627,	viaHera:"BARACCANO (P.ZZA)",	dettaglioHera:null,	viaGoogle:"Piazza del Baraccano",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:3,	week:4},
{id:21,	idHera:721,	viaHera:"BARBAZZI (VIA)",	dettaglioHera:null,	viaGoogle:"Vicolo Barbazzi",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:5,	week:4},
{id:22,	idHera:517,	viaHera:"BARBERIA (VIA)",	dettaglioHera:null,	viaGoogle:"Via Barberia",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:2,	week:2},
{id:23,	idHera:576,	viaHera:"BAROZZI (VIA)",	dettaglioHera:"solo primo tratto verso p.ta Mascarella",	viaGoogle:"Via Iacopo Barozzi",	minDisp:3,	minPari:0,	maxDisp:3,	maxPari:0,	day:3,	week:1},
{id:24,	idHera:576,	viaHera:"BAROZZI (VIA)",	dettaglioHera:"ultimo tratto verso stazione",	viaGoogle:"Via Iacopo Barozzi",	minDisp:-1,	minPari:0,	maxDisp:-1,	maxPari:0,	day:4,	week:2},
{id:25,	idHera:525,	viaHera:"BATTISTELLI (VIA)",	dettaglioHera:null,	viaGoogle:"Via Libero Battistelli",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:2,	week:2},
{id:26,	idHera:611,	viaHera:"BEGATTO (VIA)",	dettaglioHera:"da via S.Vitale a via Bolognetti",	viaGoogle:"Via Begatto",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:3,	week:3},
{id:27,	idHera:712,	viaHera:"BELFIORE (VIA)",	dettaglioHera:null,	viaGoogle:"Via Belfiore",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:5,	week:3},
{id:28,	idHera:546,	viaHera:"BELLE ARTI (VIA)",	dettaglioHera:"da via Bertoloni a p.zza Puntoni",	viaGoogle:"Via delle Belle Arti",	minDisp:35,	minPari:48,	maxDisp:99999,	maxPari:99998,	day:4,	week:1},
{id:29,	idHera:546,	viaHera:"BELLE ARTI (VIA)",	dettaglioHera:"da via Moline a via Mentana",	viaGoogle:"Via delle Belle Arti",	minDisp:1,	minPari:0,	maxDisp:7,	maxPari:6,	day:4,	week:2},
{id:30,	idHera:546,	viaHera:"BELLE ARTI (VIA)",	dettaglioHera:"da via Bertoloni a via Moline",	viaGoogle:"Via delle Belle Arti",	minDisp:9,	minPari:8,	maxDisp:33,	maxPari:46,	day:2,	week:3},
{id:31,	idHera:633,	viaHera:"BELMELORO (VIA)",	dettaglioHera:null,	viaGoogle:"Via Belmeloro",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:4,	week:1},
{id:32,	idHera:707,	viaHera:"BELVEDERE (VIA)",	dettaglioHera:null,	viaGoogle:"Via Belvedere",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:5,	week:3},
{id:33,	idHera:640,	viaHera:"BENEDETTO XIV (VIA)",	dettaglioHera:null,	viaGoogle:"Via Benedetto XIV",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:4,	week:1},
{id:34,	idHera:560,	viaHera:"BERTI PICHAT (V.LE)",	dettaglioHera:null,	viaGoogle:"Viale Carlo Berti Pichat",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:3,	week:1},
{id:35,	idHera:604,	viaHera:"BERTIERA (VIA)",	dettaglioHera:"da via Oberdan a via Malcontenti",	viaGoogle:"Via Bertiera",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:3,	week:3},
{id:36,	idHera:637,	viaHera:"BERTOLONI (VIA)",	dettaglioHera:null,	viaGoogle:"Via Antonio Bertoloni",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:4,	week:1},
{id:37,	idHera:740,	viaHera:"BIANCHETTI (Vicolo)",	dettaglioHera:"da P.zza Aldrovandi a Strada Maggiore",	viaGoogle:"Vicolo Bianchetti",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:5,	week:4},
{id:38,	idHera:632,	viaHera:"BIBBIENA (VIA)",	dettaglioHera:"da p.zza Verdi a via Acri",	viaGoogle:"Via dei Bibiena",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:4,	week:1},
{id:39,	idHera:685,	viaHera:"BOCCA DI LUPO (VIA)",	dettaglioHera:null,	viaGoogle:"Via Bocca di Lupo",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:5,	week:1},
{id:40,	idHera:498,	viaHera:"BOLDRINI (VIA)",	dettaglioHera:"da via Gramsci a via Amendola",	viaGoogle:"Via Cesare Boldrini",	minDisp:7,	minPari:10,	maxDisp:9,	maxPari:22,	day:2,	week:1},
{id:41,	idHera:498,	viaHera:"BOLDRINI (VIA)",	dettaglioHera:"da via Amendola a v,le Pietramellara",	viaGoogle:"Via Cesare Boldrini",	minDisp:1,	minPari:0,	maxDisp:5,	maxPari:8,	day:4,	week:3},
{id:42,	idHera:612,	viaHera:"BOLOGNETTI (Vicolo)",	dettaglioHera:null,	viaGoogle:"Vicolo Bolognetti",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:3,	week:3},
{id:43,	idHera:735,	viaHera:"BORGONUOVO (VIA)",	dettaglioHera:null,	viaGoogle:"Via Borgonuovo",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:5,	week:4},
{id:44,	idHera:675,	viaHera:"BOVI CAMPEGGI (VIA)",	dettaglioHera:"da v. le Pietramellara a via Zanardi",	viaGoogle:"Via Paolo Bovi Campeggi",	minDisp:99999,	minPari:99998,	maxDisp:99999,	maxPari:99998,	day:4,	week:4},
{id:45,	idHera:675,	viaHera:"BOVI CAMPEGGI (VIA)",	dettaglioHera:"da via della Bova a v. le Pietramellara in manuale",	viaGoogle:"Via Paolo Bovi Campeggi",	minDisp:99999,	minPari:99998,	maxDisp:99999,	maxPari:99998,	day:4,	week:4},
{id:46,	idHera:675,	viaHera:"BOVI CAMPEGGI (VIA)",	dettaglioHera:"da via Zanardi a via della Bova",	viaGoogle:"Via Paolo Bovi Campeggi",	minDisp:99999,	minPari:99998,	maxDisp:99999,	maxPari:99998,	day:4,	week:4},
{id:47,	idHera:701,	viaHera:"BRAINA (VIA)",	dettaglioHera:null,	viaGoogle:"Via Braina",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:5,	week:2},
{id:48,	idHera:657,	viaHera:"BROCCAINDOSSO (VIA)",	dettaglioHera:null,	viaGoogle:"Via Broccaindosso",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:4,	week:2},
{id:49,	idHera:562,	viaHera:"BRUGNOLI (VIA)",	dettaglioHera:null,	viaGoogle:"Via Giovanni Brugnoli",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:3,	week:1},
{id:50,	idHera:602,	viaHera:"C.BATTISTI (VIA)",	dettaglioHera:"da via Portanova a via Barberia",	viaGoogle:"Via Cesare Battisti",	minDisp:9,	minPari:16,	maxDisp:99999,	maxPari:99998,	day:3,	week:3},
{id:51,	idHera:602,	viaHera:"C.BATTISTI (VIA)",	dettaglioHera:"da via Portanova a via U.Bassi",	viaGoogle:"Via Cesare Battisti",	minDisp:1,	minPari:0,	maxDisp:7,	maxPari:14,	day:5,	week:3},
{id:52,	idHera:696,	viaHera:"CA' SELVATICA (VIA)",	dettaglioHera:"da via Frassinago a via S.Caterina",	viaGoogle:"Via Ca' Selvatica",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:5,	week:2},
{id:53,	idHera:569,	viaHera:"CAIROLI (VIA)",	dettaglioHera:"PARCHEGGIO da via Milazzo a p.zza Martiri",	viaGoogle:"Via Benedetto Cairoli",	minDisp:null,	minPari:null,	maxDisp:null,	maxPari:null,	day:3,	week:1},

							];

	localStorage.matrixLavaggioLocal = JSON.stringify(matrixLavaggioNew);
	localStorage.matriceAggiornataAl = new Date();
}

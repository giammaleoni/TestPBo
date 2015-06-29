//***********************************
//  Calendario:
//    ogni riga corrisponde ad un mese
//    ogni carattere ad un giorno del mese
//
//      'X' -> lavorativo (lavaggio attivo)
//      '0' -> non lavorativo (lavaggio inattivo)
//***********************************
var calendario = [
  "0XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "XXXXXXXXXXXXXXXXXXXXXXXXX00000",
  "0000000000000000000000000000000",
  "0000000000000000000000000000000",
  "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
]

//***********************************
// Funzione che restituisce "true" se
//  la data è un giorno lavorativo
//***********************************
isWorkingDay = function (date){
  return calendario[date.getMonth()].substring(date.getDate() - 1, date.getDate()) == X ? true : false;
}

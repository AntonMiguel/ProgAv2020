/*  COSAS QUE PODRÍA MEJORAR 

    Mantener un historial?

    Puntaje más lindo? El centrado queda medio feo
*/

var numJugadorDeTurno = 0;
var numTurno = 0;
var victorias = [0, 0];
var empates = 0;
var nombreJug = ["", ""];
var simbolo = ["X", "O"];
var simboloWin = ["XXX", "OOO"];
var celda = [];

var cartel = document.getElementById("cartel");
var captionJug1 = document.getElementById("captionJug1");
var captionJug2 = document.getElementById("captionJug2");
var captionEmpates = document.getElementById("captionEmpates");
var divJuego = document.getElementById("divJuego");
var divBotonRevancha = document.getElementById("divBotonRevancha");
var inputNombre1 = document.getElementById("name1");
var inputNombre2 = document.getElementById("name2");
var partidaEnCurso = true;                                         //Cuando vale true, permite escribir las celdas            //se pone en false cuando termina una ronda... esperando la revancha

divJuego.style.display = "none"; 


function ingresarNombres(){
     if ((inputNombre1.value == "")||(inputNombre2.value == "")){
        cartel.innerHTML = "No se pueden usar nombres vacíos!"
    }else{
        document.getElementById("formPosta").style.display="none";
        nombreJug= [inputNombre1.value.substring(0,40), inputNombre2.value.substring(0,40)];
        captionJug1.innerHTML = nombreJug[0] + ": " + victorias[0];
        captionJug2.innerHTML = nombreJug[1] + ": " + victorias[1];
        captionEmpates.innerHTML = "Empates: " + empates;
        divJuego.style.display = "block"; 
        nuevaRonda();
    }
}


function nuevaRonda(){
    divBotonRevancha.style.visibility = "hidden";                       //visibility=hidden conserva el tamaño y lugar,              a diferencia de  display=none
    partidaEnCurso = true;
    celda = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
    ];
    var i;
    var j;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
        document.getElementById("celda"+i+j).innerHTML = " ";
        }
    } 
    numJugadorDeTurno = Math.round(Math.random());
    numTurno=0;
    proxTurno();
}


function proxTurno(){
    numTurno++;
    if (numTurno>=10){
        empate();
    }
    else{
        numJugadorDeTurno = 1-numJugadorDeTurno;
        cartel.innerHTML = "Turno de " + nombreJug[numJugadorDeTurno] + " (" + simbolo[numJugadorDeTurno] + ")";
    }
}


function empate(){
    partidaEnCurso = false;
    cartel.innerHTML = "Han empatado amigueros";
    empates++;
    captionEmpates.innerHTML = "Empates: " + empates;
    divBotonRevancha.style.visibility = "visible";
}


function victoria(jug){
    partidaEnCurso = false;
    cartel.innerHTML = nombreJug[jug] + " ha ganado!";
    victorias[jug]++;
    captionJug1.innerHTML = nombreJug[0] + ": " + victorias[0];
    captionJug2.innerHTML = nombreJug[1] + ": " + victorias[1];
    divBotonRevancha.style.visibility = "visible";
}


function celdaClick (fila, columna, celdaClickeada){
    if (partidaEnCurso == false){
        return;
    }
    if (celda[fila][columna]== "X" || celda[fila][columna]== "O"){
        console.log("Celda usada");
        return;
    }

    console.log("fila " + fila + ", columna "+ columna);
    celda[fila][columna] = simbolo[numJugadorDeTurno];
    celdaClickeada.innerHTML = simbolo[numJugadorDeTurno];
    var i;
    texto = "";
    for (i = 0; i < 3; i++) {
        texto += celda[fila][i];
    }
    if (texto==simboloWin[numJugadorDeTurno]){                      //chequea victoria fila
     victoria(numJugadorDeTurno);
    }
    else{
        texto= "";
        for (i = 0; i < 3; i++) {
            texto += celda[i][columna];
        }
        if (texto==simboloWin[numJugadorDeTurno]){                  //chequea victoria columna
            victoria(numJugadorDeTurno);
        }
        else{
            texto = celda[0][0]+celda[1][1]+celda[2][2];
            if (texto==simboloWin[numJugadorDeTurno]){              //chequea victoria por diagonal \
                victoria(numJugadorDeTurno);
            }
            else{
                texto = celda[2][0]+celda[1][1]+celda[0][2];
                if (texto==simboloWin[numJugadorDeTurno]){           //chequea victoria por diagonal /
                    victoria(numJugadorDeTurno);
                }
                else{proxTurno();}
            }
        }
    }

}
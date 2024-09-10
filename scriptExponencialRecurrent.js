//PRE: n --> nombre d'anys invertint, sent n >= 1 (de any 0 a any 1 la persona estalvia la quantitat Q)
//     Q --> Quantitat salarial estalviada en un any per una persona, descomptant impostos i gastos de vida.
//POST: retorna els diners que tindrà a l'any n-èssim. [FUNCIÓ LINEAL] que rep el nom de L ja que en Lluís
//      és la persona que estalvia de forma lineal en l'exemple del github
function L(n,Q) {
    return Q*n;
}


//PRE: n ---------> nombre d'anys invertint amb n >= 1 (de any 0 a any 1 la persona estalvia la quantitat Q, que no rendeix interès)
//     i ---------> interès net anual en les inversions (en tant per u)
//     Q ---> Quantitat salarial estalviada en un any per una persona, descomptant impostos i gastos de vida.
//POST: retorna els diners que tindrà a l'any n-èssim. [FUNCIÓ EXPONENCIAL -AMB ESTALVI RECURRENT-] que 
//      rep el nom de E ja que Eulàlia és la persona que inverteix estalviant amb interès i, en l'exemple del github
function E(n,Q,i) {
    var sum_Cx_InteresCompost = 0; //sum_Cx_InteresCompost és el sumatori de coeficients que hem vist que generen interes compost 
    for (let j = 0; j < n; ++j) {
        sum_Cx_InteresCompost += Math.pow(1 + i, j); 
    }
    return Q*sum_Cx_InteresCompost;
}


/*
//IMPRIMIM LA COMPARACIO ENTRE LLUIS I EULÀLIA
let n = 100;
for (let i = 1; i <= n; ++i) {
    let Q_lluis = L(i,60000);
    let Q_Eulalia = E(i,24000,0.1);
    //console.log( "L("+i+"): "+Q_lluis+" €"+"  "+"E("+i+"): "+Q_Eulalia+" €");
    if (Q_Eulalia > Q_lluis) {
        break;
    }
}
*/




//PRE: n anys               NOTA: // FUNCIO TAMBÉ DEFINIDIA DINS scriptCompostInflacio.js
//POST: valor d'increment del capital en funció de n anys
//variacio de quanitat inicial amb l'interes compost i
function Q(n) {
    return Math.round(Qinicial * Math.pow((1+i),n));
}

//quantitat de guanys per interes compost (guanys en relació a qinicial) // NOTA: FUNCIO TAMBÉ DEFINIDIA DINS scriptCompostInflacio.js
function Q_g(n) {
    return  Q(n) - Qinicial;
}


//NOTA: E_ es la funcio E modificada perque els parametres d'entrada Q i i agafin simplement les dades dels inputs en comptes de fer entrada manual.

//PRE:  n -----------------------------------------> nombre d'anys invertint amb n >= 1 (de any 0 a any 1 la persona 
//                                                estalvia la quantitat Q, que no rendeix interès)
//      i (variable global de input) --------------> interès net anual en les inversions (en tant per u)
//      EstalviAnual (variable global de input) ---> Quantitat salarial estalviada en un any per una persona, descomptant impostos i gastos de vida.
//POST: retorna els diners que tindrà a l'any n-èssim. [FUNCIÓ EXPONENCIAL -AMB ESTALVI RECURRENT-] que 
//      rep el nom de E ja que Eulàlia és la persona que inverteix estalviant amb interès i, en l'exemple del github
function E_(n) {
    var sum_Cx_InteresCompost = 0; //sum_Cx_InteresCompost és el sumatori de coeficients que hem vist que generen interes compost 
    for (let j = 0; j < n; ++j) {
        sum_Cx_InteresCompost += Math.pow(1 + i, j); 
    }
    return EstalviAnual*sum_Cx_InteresCompost;
}

//quantitat de guanys per interes compost (guanys en relació als salaris estalviats)
function E_g(n) {
    return  E_(n) - L_(n);  //RESTEM LA FUNCIO DEL LLUIS, QUE ES JUSTAMENT EL CREIXEMENT DE E_g si no hi hagues interes compost
}



//NOTA: L_ es la funcio L modificada perque els parametres d'entrada Q agafi simplement les dades dels inputs en comptes de fer entrada manual.

//PRE: n --> nombre d'anys invertint, sent n >= 1 (de any 0 a any 1 la persona estalvia la quantitat Q)
//     Q --> Quantitat salarial estalviada en un any per una persona, descomptant impostos i gastos de vida.
//POST: retorna els diners que tindrà a l'any n-èssim. [FUNCIÓ LINEAL] que rep el nom de L ja que en Lluís
//      és la persona que estalvia de forma lineal en l'exemple del github
function L_(n) {
    return EstalviAnual*n;
}







function fesGraficInteresCompost_i_graficEstalviRecurrent() {
    // POSEM LES ETIQUETS DEL GRÀFIC
    var layout = {
        title: 'Ganancias por ahorro recurrente anual con inversión (incremento de E) y ganancias por inversión por capital ya acumulado previamente (incremento de Q).',
        xaxis: { title: 'n (número de años)' },
        yaxis: { title: 'Capital (n)' },
        width: AmpladaGrafic , // Change the width to your desired value
        height: AlturaGrafic // Change the height to your desired value
        
    };

    // GENEREM ELS PUNTS X I Y DEL GRÀFIC (nota que tenim tres linies per la variable dependent)
    let x = [];
    let y = [];
    let y_ = [];
    let y__ = [];
    for (let i = 0; i < totalAnys; i += 0.1) { //CALCULS DE 0.3 EN 0.3 ANYS
        //generem variables per no repetir el mateix calcul diversos cops
        var q = Q(i);


        x.push(i);
        y.push(q);

    }

    //ELS CALCULS DE LA FUNCIÓ D'ESTALVI RECURRENT (e) ELS FAIG NOMÉS ANY A ANY PERQUÈ SI NO MOSTRA LINIES SENSE CANVI, JA QUE 
    //LA FUNCIÓ ESTÀ PENSADA PER FUNCIONAR DE FORMA DISCRETA
    let x_ = [];
    let y_Lluis = [];
    for (let i = 0; i < totalAnys; i++) {
        
        var e = E_(i);
        var q = Q(i);
        
        x_.push(i);
        y_.push(e);
        y__.push(q + e);
        y_Lluis.push(L_(i));

    }


    // FEM LA DATA ARRAY PASSANT UN JAVASCRIPT OBJECT AMB ELS PUNTS X, Y
    //MODE LINIES PER FER-EL GRAFIC CONTINU
    var creixementCapitalPrevi = {x: x, y: y, mode: 'lines', type: 'scatter', line: {color: 'green'}, name:"<b>Función </b> Q(n)<br>    (incremento de capital inicial ahorrado<br>    con interés compuesto)"};
    var estalviRecurrentAmbInversio = {x: x_, y: y_, mode: 'markers', type: 'scatter', marker: {color: 'darkgreen'}, name:"<b>Función </b> E(n) <i>['Tipo eulalia']</i><br>    (incremento de capital por ahorro<br>    salarial anual, <b>con</b> interés compuesto)"};
    var sumaAmbdos = {x: x_, y: y__, mode: 'lines', type: 'scatter', line: {color: 'black'}, name:"<b>Suma</b> Q(n) + E(n)<br>    (ahorro total)"};
    var estalviRecurrentSenseInversio = {x: x_, y: y_Lluis, mode: 'markers', type: 'scatter', marker: {color: 'brown'}, name:"<b>Función </b> E(n) <i>['Tipo luís']</i><br>    (incremento de capital por ahorro<br>    salarial anual, <b>sin</b> interés compuesto)"};


    //fem gràfiic
    Plotly.react('graficPlotly', [creixementCapitalPrevi, estalviRecurrentAmbInversio, sumaAmbdos, estalviRecurrentSenseInversio], layout);
}



//

function FesTaula_Q_E_i_sumaQ_E() {
    //CAPSAL TAULA
    document.getElementById("capsalTaula").innerHTML = "Tabla 4: Incremento del capital inicial Q con interés compuesto [función Q(n)] y del ahorro recurrente anual de cuantía Q' [función E(n)] y muestra de los intereses ahorrados con ambos rendimientos (ganancia acumulada) y su porcentaje acumulado en relación a las cantidades originales sin interés)";
    var matriu = document.querySelectorAll("tbody > tr"); //selecciono els table row (LES FILES DE LA TAULA)

    //TABLE HEAD
    var capsalTaula = document.querySelectorAll("thead > tr > th");  //selecciono els th i poso els titols
    for (var i = 0; i < capsalTaula.length; ++i) {
        capsalTaula[i].style.cssText = "background-color: orange;";
    } 

    //TABLE BODY

    const arr_anys = [1,2,3,5,10,15,20]; //DADES QUE HI HAURÀ A LA COLUMNA DELS ANYS

    for (var i = 0; i < matriu.length; ++i) {
        var fila = matriu[i].querySelectorAll("td"); //var fila = matriu[i];  //xat gpt m'ha dit que no puc seleccionar amb indexos sino que he de feusar lap roxima linia
        for (var j = 0; j < fila.length; ++j) {
            if (j == 0) {fila[j].innerHTML = arr_anys[i];}  //EMPLENO LA COLUMNA DELS ANYS AMB AQUESTES DADES (1a col)
            else if (j == 1) {fila[j].innerHTML = Math.round(Q(arr_anys[i]));} //EMPLENO COLUMNA DE L'INTERES COMPOST EN EL CAPITAL INICIAL EL MONTO GROS
            else if (j == 2) {fila[j].innerHTML = Math.round(E_(arr_anys[i]));} //EMPLENO LA COLUMNA DE L'INCREMENT SALARIAL EN INTERES COMPOST
            else if (j == 3) {fila[j].innerHTML = Math.round(Q_g(arr_anys[i]) + E_g(arr_anys[i]));} //FAIG LA SUMA DE LES DUES FUNCIONS PREVIES, EN GUANYS I TREC LA QUANTITAT ESTALVIADA PEL SALARI -QUE NO TREC LA QUANTITAT DE INTERES COMPOST GENERADA PEL SALARI OJO-
            else if (j == 4) {
                fila[j].innerHTML = (((   Q_g(arr_anys[i]) + E_g(arr_anys[i])  ) / (  Qinicial  ))*100).toFixed(2);
            } //poso el percentatge de guany
        }
    }
    console.log("GRAFIC INTERES COMPOST FET");
}






// OBTENIM VALORS FORMULARI
var totalAnys = 20;



var AmpladaGrafic = window.screen.width*(8/10);
var AlturaGrafic = window.screen.height*0.7;


//FEM UN GRÀFIC INICIAL AMB DOS PUNTS EN BLANC PER MOSTRAR A L'USUARI
//UN LIENZO EN BLANCO ON ES FARÀ EL CÀLCUL (FEM UN LAYOUT I UNS VALORS
//DUMMIE MES O MENYS SIMILARS ALS QUE VEURÀ L'USUARI EN LES ESCALES)
var layout = {
    xaxis: { title: 'n (número de años)' },
    yaxis: { title: 'Capital' },
    width: AmpladaGrafic , // Change the width to your desired value
    height: AlturaGrafic, // Change the height to your desired 
};
Plotly.react('graficPlotly',[{x:[0,15],y:[0,40000], line: {color: 'white'}}], layout)


//PRE: Existeix la taula i una media query de max-width: 1300px i es fa clic a un botó que l'activa
//POST: Es fa scroll a la taula
function fesScrollAtaula_enMobils() {
    var taula = document.getElementsByClassName('div-dret')[0];
    if (window.matchMedia('(max-width: 1300px)').matches) { // COMPROVO SI LA MEDIA QUERY ESTA ACTIVA
        taula.scrollIntoView({ behavior: 'smooth' }); // FES SCROLL A LA TAULA 
    }
}











//DECLARO LES VARIABLES GLOBALS FORA DEL MAIN PERQUE ESTIGUIN DISPONIBLES
var Qinicial;
var i;
var EstalviAnual;
function main() {
    
    //OBTINC DADES FORMULARIS
    Qinicial = document.getElementById("capital").value;        //Quantitat inicial inversió a moment 0
    EstalviAnual = document.getElementById("ahorroAnual").value;
    i = document.getElementById("interes_inversion").value/100; //interes anual inversio (tant per u)

    
    // MOSTRA DADES
    console.log("Capital:", Qinicial);
    console.log("Estalvi anual:", EstalviAnual);
    console.log("Interes Inversion (tant per 1):", i);

    //ENS ASSEGUREM QUE L'USUARI INTRODUEIX TOTES LES DADES
    if (Qinicial == 0 && EstalviAnual == 0 && i == 0) { 
        alert ("Falta introducir capital inicial, ahorro anual e interés al que puedes invertir.");
    } else if (Qinicial == 0 && EstalviAnual == 0) {
        alert ("Falta introducir capital inicial y ahorro anual.");
    } else if (Qinicial == 0 && i == 0) {
        alert ("Falta introducir capital inicial e interés al que puedes invertir.");
    } else if (EstalviAnual == 0 && i == 0) {
        alert ("Falta introducir ahorro anual e interés al que puedes invertir.");
    } else if (EstalviAnual == 0) {
        alert("Falta introducir el ahorro que consigues anualmente con tu salario (e.g, si cobras 20.000€ netos y ahorras 8000€ netos, introduce 8000 en el input del formulario)");
    } else if (Qinicial == 0) {
        alert ("Introduce capital inicial"); 
    } else if (i == 0) { 
        alert ("Falta introducir el interés de la inversión!");
    } else {
        fesGraficInteresCompost_i_graficEstalviRecurrent();
        FesTaula_Q_E_i_sumaQ_E();
        fesScrollAtaula_enMobils();
    }
}







































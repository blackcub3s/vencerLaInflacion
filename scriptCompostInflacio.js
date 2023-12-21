// DEFINIM FUNCIÓ D'INTERES COMPOST
//PRE: n anys
//POST: valor d'increment del capital en funció de n anys
//variacio de quanitat inicial amb l'interes compost i
function Q(n) {
    return Math.round(Qinicial * Math.pow((1+i),n));
}

//disminucio de la quantitat inicial per la inflació
function Q_inf(n) {
    return Qinicial * Math.pow((1-i_prima), n);
}

//quantitat de guanys per interes compost (guanys en relació a qinicial)
function Q_g(n) {
    return  Q(n) - Qinicial;
}
//Quantiat de pèrdues inflacionades (en relació a quanitat inicial)
function Q_p(n) {
    return Qinicial -  Q_inf(n);
}

function FesGraficInteresCompost() {
    // POSEM LES ETIQUETS DEL GRÀFIC
    var layout = {
        title: 'Incremento del capital inciial',
        xaxis: { title: 'n (número de años)' },
        yaxis: { title: 'Q(n) (mi capital)' },
        width: AmpladaGrafic , // Change the width to your desired value
        height: AlturaGrafic
    };

    // GENEREM ELS PUNTS X i Y DEL GRÀFIC
    let x = [];
    let y = [];
    let y_ = []
    for (let i = 0; i < totalAnys; i += 0.1) { //CALCULS DE 0.3 EN 0.3 ANYS
        x.push(i);
        y.push(Q(i));
    }


    // FEM LA DATA ARRAY PASSANT UN JAVASCRIPT OBJECT AMB ELS PUNTS X, Y
    //MODE LINIES PER FER-EL GRAFIC CONTINU
    var dades = [{x: x, y: y, mode: 'lines', type: 'scatter', line: {color: 'green'}}];
    

    //fem gràfiic
    Plotly.react('graficPlotly', dades, layout);

}

function FesGraficInflacio() {
    // POSEM LES ETIQUETS DEL GRÀFIC
    var layout = {
        title: 'Pérdidas por inflación',
        xaxis: { title: 'n (número de años)' },
        yaxis: { title: 'Q(n) (mi capital)' },
        width: AmpladaGrafic , // Change the width to your desired value
        height: AlturaGrafic
    };

    // GENEREM ELS PUNTS X I Y DEL GRÀFIC
    let x = [];
    let y = [];
    let y_ = []
    for (let i = 0; i < totalAnys; i += 0.1) { //CALCULS DE 0.3 EN 0.3 ANYS
        x.push(i);
        y.push(Q_inf(i));
    }


    // FEM LA DATA ARRAY PASSANT UN JAVASCRIPT OBJECT AMB ELS PUNTS X, Y
    //MODE LINIES PER FER-EL GRAFIC CONTINU
    var dades = [{x: x, y: y, mode: 'lines', type: 'scatter', line: {color: 'red'}}];

    //fem gràfiic
    Plotly.react('graficPlotly', dades, layout);

}

function FesGraficInflacio_i_InteresCompost() {
    // POSEM LES ETIQUETS DEL GRÀFIC
    var layout = {
        title: 'Pérdidas por inflación vs ganancias de interés compuesto',
        xaxis: { title: 'n (número de años)' },
        yaxis: { title: 'ΔQ(n) (variación de mi capital)' },
        width: AmpladaGrafic , // Change the width to your desired value
        height: AlturaGrafic // Change the height to your desired value
        
    };

    // GENEREM ELS PUNTS X I Y DEL GRÀFIC
    let x = [];
    let y = [];
    let y_ = []
    for (let i = 0; i < totalAnys; i += 0.1) { //CALCULS DE 0.3 EN 0.3 ANYS
        x.push(i);
        y.push(Q_g(i));
        y_.push(Q_p(i))
    }


    // FEM LA DATA ARRAY PASSANT UN JAVASCRIPT OBJECT AMB ELS PUNTS X, Y
    //MODE LINIES PER FER-EL GRAFIC CONTINU
    var dades_creixementCalers = {x: x, y: y, mode: 'lines', type: 'scatter', line: {color: 'green'}, name:"<b>Incremento</b> de Q<br>por interés compuesto"};
    var dades_disminucioCalers = {x: x, y: y_, mode: 'lines', type: 'scatter', line: {color: 'red'},name:"<b>Disminución</b> de Q<br> por inflación"};


    //fem gràfiic
    Plotly.react('graficPlotly', [dades_creixementCalers,dades_disminucioCalers], layout);

}



//AQUESTA FUNCIÓ EMPLENA LA TAULA D'INTERÈS COMPOST DELS ANYS CORRESPONENTS I POSA EL CAPSAL DE COLOR GUANY
function FesTaulaInteresCompost() {
    //CAPSAL TAULA
    document.getElementById("capsalTaula").innerHTML = "Tabla1: Incremento del capital Q por la inversión en función del número de años (n)";
    var matriu = document.querySelectorAll("tbody > tr"); //selecciono els table row (LES FILES DE LA TAULA)

    //TABLE HEAD
    var capsalTaula = document.querySelectorAll("thead > tr > th");  //selecciono els th i poso els titols
    var capsaleresTaula = ["n","Q(n)","Ganancia<br>Acumulada","%<br>Acumulado"];
    for (var i = 0; i < capsalTaula.length; ++i) {
        capsalTaula[i].innerHTML = capsaleresTaula[i];
        capsalTaula[i].style.cssText = "background-color: green;";
    } 

    //TABLE BODY

    const arr_anys = [1,2,3,5,10,15,20]; //DADES QUE HI HAURÀ A LA COLUMNA DELS ANYS

    for (var i = 0; i < matriu.length; ++i) {
        var fila = matriu[i].querySelectorAll("td"); //var fila = matriu[i];  //xat gpt m'ha dit que no puc seleccionar amb indexos sino que he de feusar lap roxima linia
        for (var j = 0; j < fila.length; ++j) {
            if (j == 0) {fila[j].innerHTML = arr_anys[i];}  //EMPLENO LA COLUMNA DELS ANYS AMB AQUESTES DADES (1a col)
            else if (j == 1) {fila[j].innerHTML = Math.round(Q(arr_anys[i]));} //EMPLENO COLUMNA DELS ANYS
            else if (j == 2) {fila[j].innerHTML = Math.round(Q_g(arr_anys[i]));}//EMPLENO LA COLUMNA DE Q_g(n) AMB LES DADES (2a Col) (arr_anys[i] es n d'anys)
            else if (j == 3) {fila[j].innerHTML = ((Q_g(arr_anys[i]) / Qinicial)*100).toFixed(2);}//EMPLENO LA COLUMNA DE % acumulats (3acol)
        }
    }
    console.log("GRAFIC INTERES COMPOST FET");
}

//FUNCIO QUE EMPLENA LA TAULA D'INFLACIÓ AMB LES FUNCIONS CORRESPONENTS I POSA CAPSAL DE COLOR PERDUA
function FesTaulaInflacio() {
    //CAPSAL TAULA
    document.getElementById("capsalTaula").innerHTML = "Tabla1: Decremento del capital Q_inf por la inflación en función del número de años (n)";
    var matriu = document.querySelectorAll("tbody > tr"); //selecciono els table row (LES FILES DE LA TAULA)

    //TABLE HEAD
    var capsalTaula = document.querySelectorAll("thead > tr > th");  //selecciono els th i poso els titols
    var capsaleresTaula = ["n","Q_inf(n)","Pérdida<br>Acumulada","%<br>Acumulado"];
    for (var i = 0; i < capsalTaula.length; ++i) {
        capsalTaula[i].innerHTML = capsaleresTaula[i]; //defineixo els titols al capsal
        capsalTaula[i].style.cssText = "background-color: brown;";  //defineixo color capsal taula
    } 



    //TABLE BODY
    const arr_anys = [1,2,3,5,10,15,20];    //DADES QUE HI HAURÀ A LA COLUMNA DELS ANYS

    for (var i = 0; i < matriu.length; ++i) {
        var fila = matriu[i].querySelectorAll("td"); //var fila = matriu[i];  //xat gpt m'ha dit que no puc seleccionar amb indexos sino que he de feusar lap roxima linia
        for (var j = 0; j < fila.length; ++j) {
            //EMPLENO LA COLUMNA DELS ANYS AMB AQUESTES DADES (1a col)
            if (j == 0) {fila[j].innerHTML = arr_anys[i];}
            else if (j == 1) {fila[j].innerHTML = Math.round(Q_inf(arr_anys[i]));} //EMPLENO COLUMNA DELS ANYS
            else if (j == 2) {fila[j].innerHTML = -Math.round(Q_p(arr_anys[i]));}   //EMPLENO LA COLUMNA DE Q_inf(n) AMB LES DADES (2a Col) (k es n d'anys)
            else if (j == 3) {fila[j].innerHTML = -((Q_p(arr_anys[i]) / Qinicial)*100).toFixed(2);}//EMPLENO LA COLUMNA DE % acumulats (3acol)
        }
    }    
    console.log("FES GRAFIC INFLACIO");
}

function FesTaulaInflacio_i_InteresCompost() {
    console.log("FES GRAFIC INFLACIO I INTERES COMPOST");
}





// OBTENIM VALORS FORMULARI

//var Qinicial = 100000;
var totalAnys = 20;
//var i = 3/100; //interes anual: 3 per cent.
//var i_prima = 6/100; //inlfacio anual







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
var i_prima;
var i;
function main() {
    
    //OBTINC DADES FORMULARIS
    Qinicial = document.getElementById("capital").value;        //Quantitat inicial inversió a moment 0
    i_prima = document.getElementById("inflacion").value/100;   //inflacio anual (tant per u)
    i = document.getElementById("interes_inversion").value/100; //interes anual inversio (tant per u)
    const rButtons = document.getElementsByName('opcio');

    

    // MOSTRA DADES
    console.log("Capital:", Qinicial);
    console.log("Inflacion (tant per 1):", i_prima);
    console.log("Interes Inversion (tant per 1):", i);
    //console.log("Opcion:", rButtons.value); //MIRA SI AIXO VA

    if (Qinicial == 0) { //si no hi ha capital inicial introduit (quan és buit camp capital inicial) no deixem calcular res. 
        alert("Introducir capital inicial !!!")
    } else {
        if (rButtons[0].checked) {  //demanem calculs interès compost (després de comprovar % creixement interès)
            if (i > 0) {        
                FesGraficInteresCompost();
                FesTaulaInteresCompost(); 
            } else {alert("Introduce un interes positivo anual en el campo %TIN para saber cuánto va a crecer tu dinero con la inversión!");}
        } else if (rButtons[1].checked) { //demanem calculs inflació  (després de comprovar camp % inflació necessari)
            if (i_prima > 0) { 
                FesGraficInflacio();
                FesTaulaInflacio();
            } else {alert("Introduce un interes positivo anual en el campo % inflación para saber la pérdidad de potencial adquisitivo!");}
        } else if (rButtons[2].checked) { //demanem mostrar pèrdues d'inflació amb els guanys d'interès compost
            if (i_prima > 0 && i > 0) {
                FesGraficInflacio_i_InteresCompost();
                FesTaulaInflacio_i_InteresCompost();
            } else {alert("Mira que tanto %TIN y % INFLACION estén llenos (con valores positivos).");}
        }
        //fas l'scroll perquè baixi
        fesScrollAtaula_enMobils();
    }
}







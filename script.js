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

    // GENEREM ELS PUNTS X I Y DEL GRÀFIC
    let x = [];
    let y = [];
    let y_ = []
    for (let i = 0; i < totalAnys; i += 0.1) { //CALCULS DE 0.3 EN 0.3 ANYS
        x.push(i);
        y.push(Q(i));
    }


    // FEM LA DATA ARRAY PASSANT UN JAVASCRIPT OBJECT AMB ELS PUNTS X, Y
    //MODE LINIES PER FER-EL GRAFIC CONTINU
    var dades = [{x: x, y: y, mode: 'lines', type: 'scatter'}];

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
    var dades_creixementCalers = {x: x, y: y, mode: 'lines', type: 'scatter'/*, line: {color: 'blue'}*/, name:"<b>Incremento</b> de Q<br>por interés compuesto"};
    var dades_disminucioCalers = {x: x, y: y_, mode: 'lines', type: 'scatter', line: {color: 'red'},name:"<b>Disminución</b> de Q<br> por inflación"};


    //fem gràfiic
    Plotly.react('graficPlotly', [dades_creixementCalers,dades_disminucioCalers], layout);

}



//AQUESTA FUNCIÓ EMPLENA LA TAULA D'INTERÈS COMPOST DELS ANYS CORRESPONENTS
function FesTaulaInteresCompost() {

    //CAPSAL TAULA
    document.getElementById("capsalTaula").innerHTML = "Tabla1: Incremento del capital por la inversión en función del número de años (n)";
    
    var elementTbody = document.getElementById("cosTaula");
    var matriu = document.querySelectorAll("tbody > tr"); //selecciono els table row (LES FILES DE LA TAULA)

    //DADES QUE HI HAURÀ A LA COLUMNA DELS ANYS
    const arr_anys = [1,2,3,5,10,15,20];

    var k = 0;
    for (var i = 0; i < matriu.length; ++i) {
        var fila = matriu[i].querySelectorAll("td"); //var fila = matriu[i];  //xat gpt m'ha dit que no puc seleccionar amb indexos sino que he de feusar lap roxima linia
        for (var j = 0; j < fila.length; ++j) {
            //EMPLENO LA COLUMNA DELS ANYS AMB AQUESTES DADES (1a col)
            if (j == 0) { 
                console.log(fila[i]);
                fila[j].innerHTML = arr_anys[k];
                k = k + 1;
            }
            //EMPLENO LA COLUMNA DE Q(n) AMB LES DADES (2a Col)
            else if (j == 1) {
                fila[j].innerHTML = Q(k); //k es el nombre d'anys
            }
            //EMPLENO LA COLUMNA DE Q_g(n) AMB LES DADES (2a Col)
            else if (j == 2) {
                fila[j].innerHTML = Q_g(k);
            }
            else if (j == 3) {
                fila[j].innerHTML = ((Q_g(k) / Qinicial)*100).toFixed(2);
            }
        }
    }

    
    console.log("GRAFIC INTERES COMPOST FET");
}

function FesTaulaInflacio() {
    console.log("FES GRAFIC INFLACIO");
}

function FesTaulaInflacio_i_InteresCompost() {
    console.log("FES GRAFIC INFLACIO I INTERES COMPOST");
}










var Qinicial = 100000;
var totalAnys = 20;
var i = 3/100; //interes anual: 3 per cent.
var i_prima = 6/100; //inlfacio anual

var AmpladaGrafic = window.screen.width*(7/10);
var AlturaGrafic = window.screen.height*0.8;


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



function main() {
    const rButtons = document.getElementsByName('opcio')
    if (rButtons[0].checked) {
        FesGraficInteresCompost();
        FesTaulaInteresCompost();
    } else if (rButtons[1].checked) {
        FesGraficInflacio();
        FesTaulaInflacio();
    } else if (rButtons[2].checked) {
        FesGraficInflacio_i_InteresCompost();
        FesTaulaInflacio_i_InteresCompost();
    }
}
    //if (document.getElementById("capital").value)
    //document.getElementById("capital").value
    



//var graphDiv = document.getElementById('graficPlotly')







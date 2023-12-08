//PRE: n --> nombre d'anys invertint, sent n >= 1 (de any 0 a any 1 la persona estalvia la quantitat Q)
//     Q --> Quantitat salarial estalviada en un any per una persona, descomptant impostos i gastos de vida.
//POST: retorna els diners que tindrà a l'any n-èssim. [FUNCIÓ LINEAL] que rep el nom de L ja que en Lluís
//      és la persona que estalvia de forma lineal en l'exemple del github
function L(n,Q) {
    return Q*n;
}


//PRE: n ---------> nombre d'anys invertint amb n >= 1 (de any 0 a any 1 la persona estalvia la quantitat Q)
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

//IMPRIMIM LA COMPARACIO ENTRE LLUIS I EULÀLIA
let n = 100;
for (let i = 1; i <= n; ++i) {
    let Q_lluis = L(i,60000);
    let Q_Eulalia = E(i,24000,0.1);
    console.log( "L("+i+"): "+Q_lluis+" €"+"  "+"E("+i+"): "+Q_Eulalia+" €");
    if (Q_Eulalia > Q_lluis) {
        break;
    }

}



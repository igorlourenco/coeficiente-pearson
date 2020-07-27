function splitInputsToArray(){
    var stringX = document.getElementById('string-x').value;
    var stringY = document.getElementById('string-y').value;

    var re = /\s*,\s*/;

    var arrayX = stringX.split(re);
    var arrayY = stringY.split(re);
    
    getPearsonCorrelation(arrayX, arrayY);
}

function getPearsonCorrelation(x, y) {
    var shortestArrayLength = 0;

    if (x.length == y.length) {
        shortestArrayLength = x.length;
    } else if (x.length > y.length) {
        shortestArrayLength = y.length;
        document.getElementById('string-x-help').innerHTML = "o vetor X tem mais elementos do que deveria. Descartaremos " + (x.length - shortestArrayLength) + " elemento(s)";
    } else {
        shortestArrayLength = x.length;
        document.getElementById('string-y-help').innerHTML = "o vetor X tem mais elementos do que deveria. Descartaremos " + (y.length - shortestArrayLength) + " elemento(s)";
    }

    var xy = [];
    var x2 = [];
    var y2 = [];

    for (var i = 0; i < shortestArrayLength; i++) {
        xy.push( x[i] * y[i] );
        x2.push( x[i] * x[i] );
        y2.push( y[i] * y[i] );
    }

    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_x2 = 0;
    var sum_y2 = 0;

    for (var i = 0; i < shortestArrayLength; i++) {
        sum_x += x[i]*1;
        sum_y += y[i]*1;
        sum_xy += xy[i]*1;
        sum_x2 += x2[i]*1;
        sum_y2 += y2[i]*1;
    }


    var step1 = (shortestArrayLength * sum_xy) - (sum_x * sum_y);
    var step2 = (shortestArrayLength * sum_x2) - (sum_x * sum_x);
    var step3 = (shortestArrayLength * sum_y2) - (sum_y * sum_y);
    var step4 = Math.sqrt( step2 * step3 );
    var answer = step1 / step4;

    console.log(answer);

    var divNova = document.createElement("label");
    var conteudoNovo = document.createTextNode("Coeficiente: " + answer);
    divNova.appendChild(conteudoNovo);
    document.getElementById('answers').appendChild(divNova);

}
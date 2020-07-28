function calculate() {
    var stringX = document.getElementById( 'string-x' ).value;
    var stringY = document.getElementById( 'string-y' ).value;

    var re = /\s*,\s*/;

    var arrayX = stringX.split( re );
    var arrayY = stringY.split( re );

    getPearsonCorrelation( arrayX, arrayY );
}

function getPearsonCorrelation(x, y) {
    var shortestArrayLength = 0;

    if (x.length == y.length) {
        shortestArrayLength = x.length;
    } else if (x.length > y.length) {
        shortestArrayLength = y.length;
        document.getElementById( 'string-warn' ).innerHTML = "O vetor X tem mais elementos do que deveria. Descartaremos " + (x.length - shortestArrayLength) + " elemento(s)";
    } else {
        shortestArrayLength = x.length;
        document.getElementById( 'string-warn' ).innerHTML = "O vetor X tem mais elementos do que deveria. Descartaremos " + (y.length - shortestArrayLength) + " elemento(s)";
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
        sum_x += x[i] * 1;
        sum_y += y[i] * 1;
        sum_xy += xy[i] * 1;
        sum_x2 += x2[i] * 1;
        sum_y2 += y2[i] * 1;
    }


    var step1 = (shortestArrayLength * sum_xy) - (sum_x * sum_y);
    var step2 = (shortestArrayLength * sum_x2) - (sum_x * sum_x);
    var step3 = (shortestArrayLength * sum_y2) - (sum_y * sum_y);
    var step4 = Math.sqrt( step2 * step3 );
    var answer = step1 / step4;

    printResult( answer, sum_x, sum_y );
    printButtonShowSteps();
    printButtonShowAllData();
    modalShowAllData( xy, x2, y2, sum_x, sum_y, sum_xy, sum_x2, sum_y2 );
}

function printResult(answer, sum_x, sum_y) {
    document.getElementById( 'coefficient' ).innerHTML = '';
    document.getElementById( 'sum-x' ).innerHTML = '';
    document.getElementById( 'sum-y' ).innerHTML = '';

    var resultCoefficientLabel = document.createElement( "label" );
    var resultCoefficientText = document.createTextNode( "Coeficiente: " + answer );
    resultCoefficientLabel.appendChild( resultCoefficientText );

    var resultSumXLabel = document.createElement( "label" );
    var resultSumXText = document.createTextNode( "Soma do vetor X: " + sum_x );
    resultSumXLabel.appendChild( resultSumXText );

    var resultSumYLabel = document.createElement( "label" );
    var resultSumYText = document.createTextNode( "Soma do vetor Y: " + sum_y );
    resultSumYLabel.appendChild( resultSumYText );

    document.getElementById( 'coefficient' ).appendChild( resultCoefficientLabel );
    document.getElementById( 'sum-x' ).appendChild( resultSumXLabel );
    document.getElementById( 'sum-y' ).appendChild( resultSumYLabel );
}

function printButtonShowSteps() {
    document.getElementById( 'additional-buttons' ).innerHTML = '';

    var showStepsButton = document.createElement( "button" );
    showStepsButton.setAttribute( "type", "button" );
    showStepsButton.setAttribute( "class", "btn btn-white" );
    showStepsButton.setAttribute( "data-toggle", "modal" );
    showStepsButton.setAttribute( "data-target", "#showStepsModal" );

    var showStepsButtonText = document.createTextNode( "Ver detalhes do cálculo" );

    showStepsButton.appendChild( showStepsButtonText );

    var center = document.createElement( "center" );

    center.appendChild( showStepsButton );

    document.getElementById( 'additional-buttons' ).appendChild( center );
}

function printButtonShowAllData() {
    document.getElementById( 'all-data' ).innerHTML = '';

    var showAllDataButton = document.createElement( "button" );
    showAllDataButton.setAttribute( "type", "button" );
    showAllDataButton.setAttribute( "class", "btn btn-white" );
    showAllDataButton.setAttribute( "data-toggle", "modal" );
    showAllDataButton.setAttribute( "data-target", "#showAllDataModal" );

    var showAllDataButtonText = document.createTextNode( "Ver todos os dados" );

    showAllDataButton.appendChild( showAllDataButtonText );

    var center = document.createElement( "center" );

    center.appendChild( showAllDataButton );

    document.getElementById( 'all-data' ).appendChild( center );

}

function modalShowAllData(xy, x2, y2, sum_x, sum_y, sum_xy, sum_x2, sum_y2) {
    document.getElementById( 'xy' ).appendChild( document.createTextNode( xy ) );
    document.getElementById( 'x2' ).appendChild( document.createTextNode( x2 ) );
    document.getElementById( 'y2' ).appendChild( document.createTextNode( y2 ) );
    document.getElementById( 'sum-x-data' ).appendChild( document.createTextNode( sum_x ) );
    document.getElementById( 'sum-y-data' ).appendChild( document.createTextNode( sum_y ) );
    document.getElementById( 'sum-xy' ).appendChild( document.createTextNode( sum_xy ) );
    document.getElementById( 'sum-x2-data' ).appendChild( document.createTextNode( sum_x2 ) );
    document.getElementById( 'sum-y2-data' ).appendChild( document.createTextNode( sum_y2 ) );
}
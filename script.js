// Calculadora Básica
const display = document.getElementById('calculatorDisplay');
const buttons = document.querySelectorAll('.btn');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');
const basicResult = document.getElementById('basicResult');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (value) {
            display.value += value;
        }
    });
});

// Botón de Clear
clear.addEventListener('click', () => {
    display.value = '';
    basicResult.textContent = '';
});

// Botón de Equals
equals.addEventListener('click', () => {
    try {
        // Evaluar la expresión matemática ingresada por el usuario
        const result = eval(display.value);
        basicResult.textContent = 'Resultado: ' + result;
    } catch (error) {
        basicResult.textContent = 'Entrada inválida.';
    }
});

// Cálculo de Distancia entre dos puntos
document.getElementById('calculateDistance').addEventListener('click', function () {
    const x1 = parseFloat(document.getElementById('x1').value);
    const y1 = parseFloat(document.getElementById('y1').value);
    const x2 = parseFloat(document.getElementById('x2').value);
    const y2 = parseFloat(document.getElementById('y2').value);

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
        document.getElementById('distanceResult').textContent = 'Por favor, ingresa todos los valores.';
        return;
    }

    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    document.getElementById('distanceResult').textContent = 'Distancia: ' + distance.toFixed(2);
});

// Determinación de Raíces de Polinomio mediante el Método de Bisección
document.getElementById('findRoots').addEventListener('click', function () {
    const polynomialInput = document.getElementById('polynomial').value;
    const lower = parseFloat(document.getElementById('lowerBound').value);
    const upper = parseFloat(document.getElementById('upperBound').value);

    if (!polynomialInput || isNaN(lower) || isNaN(upper)) {
        document.getElementById('rootsResult').textContent = 'Por favor, ingresa los coeficientes y los límites.';
        return;
    }

    const coefficients = polynomialInput.split(',').map(Number);
    if (coefficients.some(isNaN)) {
        document.getElementById('rootsResult').textContent = 'Coeficientes inválidos.';
        return;
    }

    const roots = findRoots(coefficients, lower, upper);

    if (roots.length === 0) {
        document.getElementById('rootsResult').textContent = 'No se encontraron raíces en el rango especificado.';
    } else {
        document.getElementById('rootsResult').textContent = 'Raíces: ' + roots.join(', ');
    }
});

// Método de la Bisección para encontrar raíces
function findRoots(coefficients, lower, upper) {
    const roots = [];
    const epsilon = 0.0001;
    const step = 0.1; // Paso para buscar intervalos con cambio de signo

    for (let i = lower; i < upper; i += step) {
        const f1 = evaluatePolynomial(coefficients, i);
        const f2 = evaluatePolynomial(coefficients, i + step);

        if (f1 * f2 < 0) { // Cambio de signo indica una raíz
            const root = bisection(coefficients, i, i + step, epsilon);
            if (root !== null && !roots.includes(parseFloat(root.toFixed(4)))) { // Evitar duplicados
                roots.push(parseFloat(root.toFixed(4)));
            }
        }
    }

    return roots;
}

// Evaluar el polinomio en un punto x
function evaluatePolynomial(coefficients, x) {
    return coefficients.reduce((acc, coeff, index) => {
        return acc + coeff * Math.pow(x, coefficients.length - index - 1);
    }, 0);
}

// Implementación del Método de Bisección
function bisection(coefficients, lower, upper, epsilon) {
    let mid;
    let fLower = evaluatePolynomial(coefficients, lower);
    let fUpper = evaluatePolynomial(coefficients, upper);

    if (fLower * fUpper > 0) {
        return null; // No hay raíz en este intervalo
    }

    while ((upper - lower) / 2 > epsilon) {
        mid = (lower + upper) / 2;
        const fMid = evaluatePolynomial(coefficients, mid);

        if (fMid === 0) {
            return mid; // Encontró la raíz exacta
        }

        if (fLower * fMid < 0) {
            upper = mid;
            fUpper = fMid;
        } else {
            lower = mid;
            fLower = evaluatePolynomial(coefficients, lower);
        }
    }

    return (lower + upper) / 2;
}

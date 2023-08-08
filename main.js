const suma = (a, b, c, d, e) => a + b + c + d + e;
const iva = (x) => x * 0.21;
const paisServ = (x) => x * 0.08;
const paisProd = (x) => x * 0.3;
const regAfip = (x) => x * 0.45;
const iibb = (x) => x * 0.02;

// Valores comunes
const valoresComunes = [
    { valor: 100 },
    { valor: 200 },
    { valor: 500 },
    { valor: 1000 },
    { valor: 2000 },
    { valor: 5000 },
    { valor: 10000 },
];

alert("Hola, Bienvenido al calculador de impuestos al dólar");

while (true) {
    let valoresList = "Estos son algunos de los valores más comunes:\n";
    
    valoresComunes.forEach((valorComun, index) => {
        valoresList += `${index + 1}. ARS$ ${valorComun.valor}\n`;
    });
    valoresList += "0. Ingresar valor manualmente\n";
    
    let seleccionIndex = parseInt(prompt(valoresList));

    if (seleccionIndex >= 0 && seleccionIndex <= valoresComunes.length) {
        let valor = seleccionIndex === 0 ? parseFloat(prompt("Ingrese el valor en pesos (al dolar oficial) que desea calcular:")) : valoresComunes[seleccionIndex - 1].valor;

        if (isNaN(valor) && seleccionIndex === 0) {
            alert("Ingrese un valor numérico válido.");
        } else {
            let opcion = prompt("Ingrese si se trata de un producto o un servicio");

            if (opcion === "producto") {
                let resultadoProd = suma(valor, regAfip(valor), paisProd(valor), 0, 0);
                alert("El valor final en pesos para este producto es de: ARS$" + resultadoProd);
            } else if (opcion === "servicio") {
                let resultadoServ = suma(valor, regAfip(valor), paisServ(valor), iva(valor), iibb(valor));
                alert("El valor final en pesos para el servicio es de: ARS$" + resultadoServ);
            } else {
                alert("Opción incorrecta");
            }
        }
    } else {
        alert("Selección de valor incorrecta");
    }

    let reiniciar = prompt("¿Desea realizar otro cálculo? (Sí / No)").toLowerCase();
    if (reiniciar !== "si") {
        alert("¡Hasta luego!");
        break;
    }
}


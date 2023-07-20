const suma = (a,b,c,d,e) => a+b+c+d+e;
const iva = (x) => x * 0.21;
const paisServ = (x) => x * 0.08;
const paisProd = (x) => x * 0.3;
const regAfip = (x) => x * 0.45;
const iibb = (x) => x * 0.02;
let caso = true;
function sumImpProd(valor){
    let resultado = suma(valor, regAfip(valor), paisProd(valor), 0, 0);
    return resultado;
}
function sumImpServ(valor){
    let resultado = suma(valor, regAfip(valor), paisServ(valor), iva(valor), iibb(valor));
    return resultado;
}


alert ("Hola, Bienvenido al calculador de impuestos al dólar");
while (caso == true) {
    let opcion = prompt("Ingrese si es un producto o un servicio");
    switch (opcion){
        case "producto":
            let producto = parseInt(prompt("Ingrese el valor en pesos (al dolar oficial) a calcular"));
            let resultadoProd = sumImpProd(producto);
            alert("El valor final en pesos va a ser de: " + resultadoProd);
            break
        case "servicio":
            let servicio = parseInt(prompt("Ingrese el valor en pesos (al dolar oficial) a calcular"));
            let resultadoServ = sumImpServ(servicio);
            alert("El valor final en pesos va a ser de: " + resultadoServ);
            break
        default:
            alert("Opcion incorrecta");
            break
    }
    caso = false
}
alert("Muchas gracias, Hasta luego!");
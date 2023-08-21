let usuario
let usuarioStorage = localStorage.getItem("usuarioActual")
const contenedor = document.getElementById("contenedor");
const boton = document.getElementById("boton");
const numeroInput = document.getElementById("numero");
const opcionSelect = document.getElementById("opcionSelect");
const suma = (a, b, c, d, e) => a + b + c + d + e;
const iva = (x) => x * 0.21;
const paisServ = (x) => x * 0.08;
const paisProd = (x) => x * 0.3;
const regAfip = (x) => x * 0.45;
const iibb = (x) => x * 0.02;


// inicio de sesión

if(usuarioStorage){
    nombre = usuarioStorage
    alert(`Bienvenido nuevamente ${nombre}`)
}else{
    let nombre = prompt("Ingrese el usuario")
    localStorage.setItem("usuarioActual", nombre)
    alert("Hola, Bienvenido al calculador de impuestos al dólar")
}

// cierre de sesión

const logout = document.getElementById("logout")

logout.addEventListener("click", () => {
    localStorage.removeItem("usuarioActual")
    location.reload()
    alert("Sesión cerrada, hasta luego!")
})

// lista de valores comunes
const valoresComunes = [
    { valor: 100 },
    { valor: 200 },
    { valor: 500 },
    { valor: 1000 },
    { valor: 2000 },
    { valor: 5000 },
    { valor: 10000 },
];


// Renderizar "valores comunes" en el contenedor
const renderizado = (valoresComunes) => {
    contenedor.innerHTML = "";
    let valoresList = "Estos son algunos de los valores más comunes: <br> ";
    valoresComunes.forEach((valorComun, index) => {
        valoresList += `${index + 1}. ARS$ ${valorComun.valor} <br>`;
    });
    valoresList += " ó Ingrese el valor manualmente<br>";
    contenedor.innerHTML = valoresList;
};
renderizado(valoresComunes);

// Función para seleccionar el valor del array
const calcularImpuestos = (numero, opcionSelect) => {
    let valor;
    
    // Validar y obtener el valor seleccionado
    if (numero >= 0 && numero < valoresComunes.length) {
        valor = valoresComunes[numero-1].valor;
    } else {
        valor = numero;
    }

    const opcion = opcionSelect.value;

    // Calcular impuestos según la opción seleccionada
    if (opcion === "producto") {
        const resultadoProd = suma(valor, regAfip(valor), paisProd(valor), 0, 0);
        alert("El valor final en pesos para este producto es de: ARS$" + resultadoProd);
    } else {
        const resultadoServ = suma(valor, regAfip(valor), paisServ(valor), iva(valor), iibb(valor));
        alert("El valor final en pesos para el servicio es de: ARS$" + resultadoServ);
    }
};

// Agregar evento al botón
boton.addEventListener("click", () => {
    const numero = parseInt(numeroInput.value); // Obtener el número ingresado
    calcularImpuestos(numero, opcionSelect);
});
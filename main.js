let usuario
let usuarioStorage = localStorage.getItem("usuarioActual")
let historialValores = [];
const login = document.getElementById("login")
const textlogin = document.getElementById("textlogin")
const canlogin = document.getElementById("canlogin")
const logout = document.getElementById("logout")
const historialElement = document.getElementById("historial")
const contenedor = document.getElementById("valoresComunes");
const boton = document.getElementById("boton");
const cleanHistory = document.getElementById("cleanHistory");
const numeroInput = document.getElementById("numero");
const opcionSelect = document.getElementById("opcionSelect");
const result = document.getElementById("result")
const suma = (a, b, c, d, e) => a + b + c + d + e;
const iva = (x) => x * 0.21;
const paisServ = (x) => x * 0.08;
const paisProd = (x) => x * 0.3;
const regAfip = (x) => x * 0.45;
const iibb = (x) => x * 0.02;
const valoresComunes = [
    { valor: 100 },
    { valor: 200 },
    { valor: 500 },
    { valor: 1000 },
    { valor: 2000 },
    { valor: 5000 },
    { valor: 10000 },
];
const actualizarHistorial = () => {
    historialElement.innerHTML = ""; // Limpiar el historial

    // Agregar los valores calculados al historial
    historialValores.forEach((valor, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Resultado ${index + 1}: ARS$ ${valor}`;
        historialElement.appendChild(listItem);
    });
};

// inicio de sesión

if(usuarioStorage){
    nombre = usuarioStorage
    canlogin.classList.add("fs-5")
    canlogin.innerHTML = `Hola, ${nombre} bienvenido al calculador de impuestos al dolar.`
}else{
    canlogin.classList.add("fs-3")
    canlogin.innerHTML = `Inicie sesión para continuar: `
    login.addEventListener("click", () => {
        nombre = (textlogin.value);
        localStorage.setItem("usuarioActual", nombre)
        location.reload()
    })
    
}
const historialUsuario = localStorage.getItem(`${nombre}-historial`);
if (historialUsuario) {
    historialValores = JSON.parse(historialUsuario);
    actualizarHistorial()
}

// cierre de sesión


logout.addEventListener("click", () => {
    localStorage.removeItem("usuarioActual")
    localStorage.removeItem(`${nombre}-historial`)
    location.reload()
})

//borrado de historial
cleanHistory.addEventListener("click", () => {
    localStorage.removeItem(`${nombre}-historial`)
    location.reload()
})

// Función para seleccionar el valor del array y calcular los impuestos
const calcularImpuestos = (numero, opcionSelect) => {
    let valor;
    
    // Validar y obtener el valor seleccionado
    if (numero > 0 && numero <= valoresComunes.length) {
        valor = valoresComunes[numero-1].valor;
    } else {
        valor = numero;
    }

    const opcion = opcionSelect.value;

    // Calcular impuestos según la opción seleccionada
    let resultado
    if (opcion === "producto") {
        const resultadoProd = suma(valor, regAfip(valor), paisProd(valor), 0, 0);
        result.innerHTML = `Resultado: ${resultadoProd}`
        historialValores.push(resultadoProd)
        
    } else {
        const resultadoServ = suma(valor, regAfip(valor), paisServ(valor), iva(valor), iibb(valor));
        result.innerHTML = `Resultado: ${resultadoServ}`
        historialValores.push(resultadoServ)
    }
    localStorage.setItem(`${nombre}-historial`, JSON.stringify(historialValores));
    actualizarHistorial()

};

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

boton.addEventListener("click", () => {
    const numero = parseInt(numeroInput.value); // Obtener el número ingresado
    calcularImpuestos(numero, opcionSelect);
    actualizarHistorial()
});
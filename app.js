//**** DESCRIPCIÓN DE ENTREGA ****/
//** SEGUNDA ENTREGA PROYECTO FINAL **//


//**** DECLARACION DE VARIABLES GLOBALES ****//
let cantidad = 0; // Variable para contabilizar la cantidad del mismo item en el carrito .
let carritoProductos =
JSON.parse(localStorage.getItem("carritoProductos")) || []; // Array que almacena los items ingresados por el usuario a modo de objetos. Se realiza lectura del array almacenado en localStorage.
let codigo = 0; // Inicializo el identificador del item, el cual se incrementa con la creacion de cada objeto.
let confirmacion; // Confirmacion de compra realizada.
let itemBorrar; // Variable que contendra el numero de item a borrar.
let productos; // Variable para insertar el codigo HTML en la tabla.
let total = 0; //Variable para el monto total del carrito.
const btnAceptar = document.querySelector('#btnAceptar'); // Se asigna selector en DOM para boton de confirmacion de compra.
const btnCarro1 = document.querySelector("#btnCarro1"); // Se asigna selector en DOM para boton de agregar a carrito item #1.
const btnCarro2 = document.querySelector("#btnCarro2"); // Se asigna selector en DOM para boton de agregar a carrito item #2.
const btnCarro3 = document.querySelector("#btnCarro3"); // Se asigna selector en DOM para boton de agregar a carrito item #3.
const btnCarro4 = document.querySelector("#btnCarro4"); // Se asigna selector en DOM para boton de agregar a carrito item #4.
const btnComprar = document.querySelector("#btnComprar"); // Se asigna selector en DOM para boton de comprar.
const btnDeletAll = document.querySelector("#btnDeletAll"); // Se asigna selector en DOM para boton de vaciar carrito.
const cantidadTotal = document.querySelector("#cantidad-total"); // Se asigna selector en DOM para cantidad total de items en el carrito.
const montoTotal = document.querySelector("#montoTotal"); // Se asigna selector en DOM para monto total.
const printCarritoHtml = document.querySelector("#printHtml"); // Se asigna selector en DOM sobre body de tabla donde se imprimira el carrito.

//**** HABILITACION Y COMANDO SOLAPAS MENU ****//
    $("#pills-objetivos-tab").on("click", function (e) {
    e.preventDefault();
    $('#mensajes-alerta').empty();
    $(this).tab("show");
    });

    $("#pills-productos-tab").on("click", function (e) {
    e.preventDefault();
    $('#mensajes-alerta').empty();
    $(this).tab("show");
    });

    $("#pills-carrito-tab").on("click", function (e) {
    e.preventDefault();
    $('#mensajes-alerta').empty();
    $(this).tab("show");
    });

//**** FUNCION DE IMPRESIÓN ITEMS EN HTML ****//
const imprimirCarritoEnHtml = () => {
    while (printCarritoHtml.firstChild) { // Se limpia cuerpo de tabla.
    printCarritoHtml.removeChild(printCarritoHtml.firstChild);
    }
    carritoProductos.forEach((item) => {
    const precioCantidad = item.precio * item.cantidad;
    productos = document.createElement("tr");
    productos.innerHTML = `<th scope="row"><img src=${item.portada} width="70rem"></th>
                                <td>${item.titulo}</td>
                                <td>${item.plataforma}</td>
                                <td>${item.cantidad}</td>
                                <td>$${precioCantidad}</td>
                                <td><button id="${item.codigo}" type="button" class="borrar btn btn-danger">X</button></td>`; // Se agrega botón para eliminar item. Se agrega el codigo del item para su posterior borrado.

    printCarritoHtml.appendChild(productos);
    });
    montoTotal.innerHTML = ` $${montoTotalProductos()}`; // Se muestra el monto total de los productos en el DOM.
    borrarItem();
    if (carritoProductos.length !== 0) { // Imprime en el DOM la cantidad de productos ingresados en el carrito.
        cantidadTotal.innerHTML = `<span class="badge badge-pill bg-danger">${cantidadTotalProductos()}</span>`;
    } else {
    cantidadTotal.innerHTML = ""; // Si no hay productos en el carrito, se quita el badge.
    }
};

//**** FUNCION MONTO TOTAL PRODUCTOS ****//
const montoTotalProductos = () => {
    total = 0;
    for (item of carritoProductos) {
    total += item.precio * item.cantidad; //  Se suman los montos en cada iteracion en el carrito.
    }
    return total;
};
//**** FUNCION CONTABILIZAR PRODUCTOS ****//
const cantidadTotalProductos = () => {
    total = 0;
    for (item of carritoProductos) {
    total += item.cantidad; //  Se suman los montos en cada iteracion en el carrito.
    }
    return total;
};

//**** FUNCION BORRADO DE ITEM POR BOTON ****//
const borrarItem = () => {
  const btnBorrarItem = document.querySelectorAll("tr button"); // Se seleccionan todos los botones de borrado sobre la el carrito.
    btnBorrarItem.forEach((btn) => { // Se recorren y se escucha si alguno fue pulsado
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        itemBorrar = parseInt(btn.id); // Se reconoce el boton pulsado por su numero de id. Coincidente con el código de producto.
        carritoProductos = JSON.parse(localStorage.getItem("carritoProductos")); // Se lee el array almacenado en el localStorage.
        const indexItemBorrar = carritoProductos.findIndex(
        (item) => item.codigo === itemBorrar
        );
        carritoProductos.splice(indexItemBorrar, 1); // Se ejecuta el borrado.
        localStorage.setItem(
        "carritoProductos",
        JSON.stringify(carritoProductos)
        ); // Se almacena el array con el item borrado.
        imprimirCarritoEnHtml(); // Se renderiza carrito.
      });
    });
};

//**** FUNCION DE FILTRADO CODIGO ITEMS ****//
const contarRepeticion = (codigo) =>
  carritoProductos.filter((producto) => producto.codigo === codigo); //Filtro de titulo para contabilizar cuantas veces el producto se ingreso al carrito.
  
//**** FUNCION VACIAR CARRITO ****//
function vaciarCarrito () {
    if (carritoProductos.length > 0) {
    carritoProductos = [];
    localStorage.clear();
    imprimirCarritoEnHtml(); // Se renderiza carrito.
    }
  }


imprimirCarritoEnHtml(carritoProductos); // Se imprime en el cuerpo de la tabla HTML los datos guardados en el localStorage.

btnCarro1.addEventListener("click", (e) => { // Llamado ingreso de items mediante click del boton en el HTML (agregar a carrito).
  e.preventDefault();
  cantidad = contarRepeticion(1).length + 1; // Se obtiene la cantidad del producto en el carrito.
    const item1 = new Carrito("Battlefield 2042", 1, 2800, cantidad, 'PS4', "/assets/img/battlefield-2042.jpg"); // Nuevo objeto creado.
  ingresoCarrito(item1); // Se ingresa el item al carrito
  //
}); // Cierre alcance ejecución boton de ingreso de item en el HTML.
btnCarro2.addEventListener("click", (e) => {// Llamado ingreso de items mediante click del boton en el HTML (agregar a carrito).
  e.preventDefault();
  cantidad = contarRepeticion(2).length + 1; // Se obtiene la cantidad del producto en el carrito.
    const item2 = new Carrito("Blue Protocol", 2, 2000, cantidad, 'PC', "/assets/img/blue-protocol.jpg"); // Nuevo objeto creado.
  ingresoCarrito(item2); // Se ingresa el item al carrito
  //
}); // Cierre alcance ejecución boton de ingreso de item en el HTML.
btnCarro3.addEventListener("click", (e) => { // Llamado ingreso de items mediante click del boton en el HTML (agregar a carrito).
  e.preventDefault();
  cantidad = contarRepeticion(3).length + 1; // Se obtiene la cantidad del producto en el carrito.
    const item3 = new Carrito("Halo Infinite", 3, 2500, cantidad, 'XBOX', "/assets/img/halo-infinite.jpg"); // Nuevo objeto creado.
  ingresoCarrito(item3); // Se ingresa el item al carrito
  //
}); // Cierre alcance ejecución boton de ingreso de item en el HTML.
btnCarro4.addEventListener("click", (e) => { // Llamado ingreso de items mediante click del boton en el HTML (agregar a carrito).
  e.preventDefault();
  cantidad = contarRepeticion(4).length + 1; // Se obtiene la cantidad del producto en el carrito.
    const item4 = new Carrito("Elden Ring", 4, 2800, cantidad, 'PC', "/assets/img/elden-ring.jpg"); // Nuevo objeto creado.
  ingresoCarrito(item4); // Se ingresa el item al carrito

}); // Cierre alcance ejecución boton de ingreso de item en el HTML.


const ingresoCarrito = (item) => {
    const existeItem = carritoProductos.some(
    (producto) => producto.codigo === item.codigo
  ); // Revisar si el item ya fue agregado al carrito.
    if (existeItem) {
    const productos = carritoProductos.map((producto) => {
      // Se recorre el array de productos para actualizar la cantidad.
        if (producto.codigo === item.codigo) {
        producto.cantidad++;
        return producto; // Devuelve el item con las duplicaciones.
        } else {
        return producto; // Devuelve el item sin duplicación.
        }
    });
    carritoProductos = [...productos]; // Se actualiza el array de productos.
    } else {
    carritoProductos = [...carritoProductos, item]; // Se agrega el item al array de carrito.
    }
  localStorage.setItem("carritoProductos", JSON.stringify(carritoProductos)); // Se almacena en el localStorage el nuevo objeto-item creado.
  imprimirCarritoEnHtml(); // Se renderiza carrito.
};

//**** OBJECT CONSTRUCTOR ****//
class Carrito {
    constructor(titulo, codigo, precio, cantidad, plataforma, portada) {
    // Recibe los datos.
    this.titulo = titulo;
    this.codigo = codigo;
    this.precio = precio;
    this.cantidad = cantidad;
    this.plataforma = plataforma;
    this.portada = portada;
    }
}

btnDeletAll.addEventListener("click", vaciarCarrito); // Llamado borrado de todos los items mediante click del boton en el HTML.

btnComprar.addEventListener("click", () => { // Llamado al boton de compra mediante click del boton en el HTML.
  if(carritoProductos.length !== 0) {
    confirmacion = new bootstrap.Modal(document.querySelector('#ventanaConfirmacion')); // Se asigna el mensaje de confirmacion.
    confirmacion.show(); // Se muestra el mensaje de confirmacion.
    vaciarCarrito(); // Se vacia el carrito.
    $('#mensajes-alerta').append('<div class="alert alert-success" role="alert">Compra realizada con exito.'); // Se muestra de confirmacion compra exitosa con identificador único de transacción.
    btnAceptar.addEventListener("click", () => {
      confirmacion.hide(); // Se oculta el mensaje de confirmacion.
      
  });
}
}); // Cierre alcance ejecución boton de compra en el HTML.


//**** DESCRIPCIÓN DE ENTREGA ****/
//** Con base a la primera entrega del proyecto final, se realizan los desafios de la clase 9 (obligatorio y complementario). Se agrego la eliminacion de los productos del carrito mediante botones */
//** de borrado individuales que se vinculan a los items mediante su id. Estos botones son monitoreados mediante un forEach que los recorre y verifica su estado mediante un evento onclick. */
//** Al presionar el borrado se aplico una ventana de mensaje modal reemplazando a la ventana de confirmacion nativa del navegador. */
//** Se agrego la funcionalidad del valor total del carrito, se agrego un campo de alerta bajo el carrito para indicar que esta vacio. Se mejoro la performance gráfica. */
document.addEventListener("DOMContentLoaded", () => {
    habilitaSolapas();
});

//**** DECLARACION DE VARIABLES GLOBALES ****/
let total = 0; //Variable para el monto total del carrito.
let confirmacion = true; // Confirmacion de Borrado Item. Inicialización.
let cantidad = 0; // Variable para contabilizar la cantidad del mismo item en el carrito .
let codigo = 0; // Inicializo el identificador del item, el cual se incrementara con la creacion de cada objeto(futuro: proxima entrega).
let codigoBorrar = 0; // Variable que almacena el numero de item a borrar ingresado por el usuario. Inicialización.
let carritoProductos =
  JSON.parse(localStorage.getItem("carritoProductos")) || []; // Array que almacena los items ingresados por el usuario a modo de objetos. Se realiza lectura del array almacenado en localStorage.
let printCarritoHtml = document.querySelector("#printHtml"); // Referencia variable al cuadro de productos ingresados en el DOM.
let printCarritoVacioHtml = document.querySelector("#carrito-vacio"); // Referencia variable al cuadro de productos ingresados en el DOM.
let productos; // Variable para insertar el codigo HTML en la tabla.
let itemBorrar; // Variable que contendra el numero de item a borrar.
const btnDeletAll = document.querySelector("#btnDeletAll"); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de borrar todo, y bootstrap.
const btnCarro1 = document.querySelector("#btnCarro1"); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de modificacion de item, y bootstrap.
const btnCarro2 = document.querySelector("#btnCarro2"); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de modificacion de item, y bootstrap.
const btnCarro3 = document.querySelector("#btnCarro3"); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de modificacion de item, y bootstrap.
const btnCarro4 = document.querySelector("#btnCarro4"); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de modificacion de item, y bootstrap.
const montoTotal = document.querySelector("#montoTotal"); // Como parte de sumar optimizacion al codigo, aplique algo de interaccion con el codigo HTML mediante un boton de modificacion de item, y bootstrap.
const cantidadTotal = document.querySelector("#cantidad-total");

//****FUNCION HABILITACION Y COMANDO SOLAPAS ****/
const habilitaSolapas = () => {
    $("#pills-objetivos-tab").on("click", function (e) {
    e.preventDefault();
    $(this).tab("show");
    });

    $("#pills-productos-tab").on("click", function (e) {
    e.preventDefault();
    $(this).tab("show");
    });

    $("#pills-carrito-tab").on("click", function (e) {
    e.preventDefault();
    $(this).tab("show");
    });
};

//**** FUNCION DE IMPRESIÓN ITEMS EN HTML ****//
const imprimirCarritoEnHtml = () => {
    while (printCarritoHtml.firstChild) {
    // Se limpia cuerpo de tabla.
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
    if (carritoProductos.length !== 0) {
        cantidadTotal.innerHTML = `<span class="badge badge-pill bg-danger">${cantidadTotalProductos()}</span>`;
    } else {
    cantidadTotal.innerHTML = "";
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
    btnBorrarItem.forEach((btn) => {
    // Se recorren y se escucha si alguno fue pulsado
    btn.addEventListener("click", () => {
      // Se escucha el evento click sobre el boton.
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
      imprimirCarritoEnHtml(); // Se recarga la pagina.
    });
    });
};

//**** FUNCION DE FILTRADO TITULO ITEMS ****//
const filtroPorTitulo = (titulo) =>
  carritoProductos.filter((producto) => producto.titulo === titulo); //Filtro de titulo para contabilizar cuantas veces el producto se ingreso al carrito.

imprimirCarritoEnHtml(carritoProductos); // Se imprime en el cuerpo de la tabla HTML los datos guardados en el localStorage.

btnCarro1.addEventListener("click", () => { // Llamado ingreso de items mediante click del boton en el HTML (agregar a carrito).
  cantidad = filtroPorTitulo("Battlefield 2042").length + 1; // Se obtiene la cantidad del producto en el carrito.
    const item1 = new Carrito("Battlefield 2042", 1, 2800, cantidad, 'PS4', "/assets/img/battlefield-2042.jpg"); // Nuevo objeto creado.
  ingresoCarrito(item1); // Se ingresa el item al carrito
  //
}); // Cierre alcance ejecución boton de ingreso de item en el HTML.
btnCarro2.addEventListener("click", () => {// Llamado ingreso de items mediante click del boton en el HTML (agregar a carrito).
  cantidad = filtroPorTitulo("Blue Protocol").length + 1; // Se obtiene la cantidad del producto en el carrito.
    const item2 = new Carrito("Blue Protocol", 2, 2000, cantidad, 'PC', "/assets/img/blue-protocol.jpg"); // Nuevo objeto creado.
  ingresoCarrito(item2); // Se ingresa el item al carrito
  //
}); // Cierre alcance ejecución boton de ingreso de item en el HTML.
btnCarro3.addEventListener("click", () => { // Llamado ingreso de items mediante click del boton en el HTML (agregar a carrito).
  cantidad = filtroPorTitulo("Halo Infinite").length + 1; // Se obtiene la cantidad del producto en el carrito.
    const item3 = new Carrito("Halo Infinite", 3, 2500, cantidad, 'XBOX', "/assets/img/halo-infinite.jpg"); // Nuevo objeto creado.
  ingresoCarrito(item3); // Se ingresa el item al carrito
  //
}); // Cierre alcance ejecución boton de ingreso de item en el HTML.
btnCarro4.addEventListener("click", () => { // Llamado ingreso de items mediante click del boton en el HTML (agregar a carrito).
  cantidad = filtroPorTitulo("Elden Ring").length + 1; // Se obtiene la cantidad del producto en el carrito.
    const item4 = new Carrito("Elden Ring", 4, 2800, cantidad, 'PC', "/assets/img/elden-ring.jpg"); // Nuevo objeto creado.
  ingresoCarrito(item4); // Se ingresa el item al carrito

}); // Cierre alcance ejecución boton de ingreso de item en el HTML.

// Revisar si el item ya fue agregado al carrito.

const ingresoCarrito = (item) => {
    const existeItem = carritoProductos.some(
    (producto) => producto.codigo === item.codigo
  ); // Revisar si el item ya fue agregado al carrito.
    if (existeItem) {
    const productos = carritoProductos.map((producto) => {
      // Se recorre el array de productos para actualizar la cantidad.
        if (producto.codigo === item.codigo) {
        producto.cantidad++;
        return producto; // Devuelve el item duplicado
        } else {
        return producto; // Devuelve le item sin duplicación.
        }
    });
    carritoProductos = [...productos]; // Se actualiza el array de productos.
    } else {
    carritoProductos = [...carritoProductos, item]; // Se agrega el item al array de carrito.
    }
  localStorage.setItem("carritoProductos", JSON.stringify(carritoProductos)); // Se almacena en el localStorage el nuevo objeto-item creado.
  location.reload(); // Se refresca el navegador para que se muestren los cambios.
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

//**** MODO MODIFICACIÓN: BORRADO DE TODOS LOS ITEMS ****/
btnDeletAll.addEventListener("click", () => {
  // Llamado borrado de todos los items mediante click del boton en el HTML.
    if (carritoProductos.length > 0) {
    carritoProductos = [];
    localStorage.clear();
    imprimirCarritoEnHtml(); // Se recarga la pagina.
    }
}); // Cierre alcance ejecución boton de borrado de todos los items en el HTML.

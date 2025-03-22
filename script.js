document.addEventListener("DOMContentLoaded", () => {
    // Referencias a los elementos del DOM
    const metodoPago = document.getElementById('pago');
    const datosTarjeta = document.getElementById('datosTarjeta');
    const form = document.getElementById('pedidoForm');
    const ticket = document.getElementById('ticket');
    const detallePizza = document.getElementById('detallePizza');
    const detalleCantidadPizza = document.getElementById('detalleCantidadPizza');
    const detallePago = document.getElementById('detallePago');
    const detalleDireccion = document.getElementById('detalleDireccion'); // Nueva referencia
    const detalleTotal = document.getElementById('detalleTotal');
    const seguirPedido = document.getElementById('seguirPedido');
    const estadoPedido = document.getElementById('estadoPedido');
    const estadoActual = document.getElementById('estadoActual');
    const avanzarEstado = document.getElementById('avanzarEstado');
    const pizzaSeleccionada = document.getElementById('pizza');
    const cantidadPizza = document.getElementById('cantidadPizza');
    const agregarDomicilio = document.getElementById('agregarDomicilio'); // Botón para abrir domicilio.html

    // Estados del pedido
    const estados = ["Preparando tu pizza...", "En camino...", "¡Entregado!"];
    let estadoIndex = 0;

    // Botón para abrir la página de domicilio
    agregarDomicilio.addEventListener("click", () => {
        window.open("domicilio.html", "_blank");
    });

    // Mostrar u ocultar los campos de tarjeta según el método de pago
    metodoPago.addEventListener('change', () => {
        datosTarjeta.style.display = metodoPago.value === "Tarjeta" ? "block" : "none";
    });

    // Manejo del envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Cargar domicilio desde localStorage
        const domicilio = JSON.parse(localStorage.getItem("domicilio"));
        const direccionTexto = domicilio 
            ? `${domicilio.calle} ${domicilio.numero}, ${domicilio.colonia}, ${domicilio.ciudad}`
            : "Domicilio no proporcionado.";

        const pizzaNombre = pizzaSeleccionada.value;
        const pizzaPrecio = parseInt(pizzaSeleccionada.options[pizzaSeleccionada.selectedIndex].dataset.precio);
        const cantidadDePizzas = parseInt(cantidadPizza.value);
        const totalPizzas = pizzaPrecio * cantidadDePizzas;

        // Mostrar detalles del pago según el método seleccionado
        if (metodoPago.value === "Tarjeta") {
            const numeroTarjeta = document.getElementById('tarjeta').value;
            detallePago.textContent = `Método de pago: Tarjeta (****${numeroTarjeta.slice(-4)}).`;
        } else {
            detallePago.textContent = `Método de pago: Efectivo.`;
        }

        detallePizza.textContent = `Pizza: ${pizzaNombre} - $${pizzaPrecio} MXN c/u.`;
        detalleCantidadPizza.textContent = `Cantidad de pizzas: ${cantidadDePizzas}.`;
        detalleDireccion.textContent = `Dirección: ${direccionTexto}`; // Mostrar dirección en el ticket
        detalleTotal.textContent = `Total a pagar: $${totalPizzas} MXN.`;

        ticket.style.display = "block";
    });

    // Seguimiento del pedido
    seguirPedido.addEventListener('click', () => {
        ticket.style.display = "none";
        estadoPedido.style.display = "block";
        estadoActual.textContent = estados[estadoIndex];
    });

    avanzarEstado.addEventListener('click', () => {
        estadoIndex++;
        if (estadoIndex < estados.length) {
            estadoActual.textContent = estados[estadoIndex];
        } else {
            estadoActual.textContent = "¡Pedido completado!";
            avanzarEstado.disabled = true;
        }
    });
});
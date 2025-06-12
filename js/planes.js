// Variables globales para el carrito y el total de la compra
let productosSeleccionados = [];
let totalCompraGlobal = 0;

// Función para formatear números como moneda colombiana
function formatoMoneda(numero) {
  return new Intl.NumberFormat("es-CO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numero);
}

// Función para identificar la franquicia de la tarjeta y actualizar la UI
function identificarFranquicia(numeroTarjeta) {
  const primerDigito = numeroTarjeta.charAt(0);
  let franquicia = "Tarjeta"; // Default
  let imagen = "../img/card.png"; // Default

  if (numeroTarjeta.length === 0) {
    // Reset to default if no number
    document.getElementById("franquiciaTarjeta").src = imagen;
    document.getElementById("nombreFranquicia").textContent = franquicia;
    return { franquicia, imagen };
  }

  switch (primerDigito) {
    case "4":
      franquicia = "Visa";
      imagen = "../img/visa.png";
      break;
    case "5":
      franquicia = "MasterCard";
      imagen = "../img/mastercard.png";
      break;
    case "3":
      franquicia = "American Express";
      imagen = "../img/amex.png";
      break;
    case "7":
      franquicia = "Diners Club";
      imagen = "../img/diners.png";
      break;
  }

  document.getElementById("franquiciaTarjeta").src = imagen;
  document.getElementById("nombreFranquicia").textContent = franquicia;
  return { franquicia, imagen };
}

// Función para formatear el número de tarjeta mientras se escribe
function formatearNumeroTarjeta(input) {
  let valor = input.value.replace(/\D/g, ""); // Eliminar no dígitos
  let valorFormateado = "";
  for (let i = 0; i < valor.length; i++) {
    if (i > 0 && i % 4 === 0 && i < 16) {
      valorFormateado += "-";
    }
    if (i < 16) {
      valorFormateado += valor[i];
    }
  }
  input.value = valorFormateado;
  if (valor.length > 0) {
    identificarFranquicia(valor);
  } else {
    identificarFranquicia("");
  }
}

// Función para validar que un campo solo contenga números
function validarSoloNumeros(input) {
  input.value = input.value.replace(/\D/g, "");
}

// Todo el código que depende del DOM y jQuery va dentro de $(document).ready()
$(document).ready(function () {
  // --- LÓGICA PARA CALIFICACIÓN POR ESTRELLAS ---
  $(".star-rating").each(function () {
    const licenseName = $(this).data("license");
    const storedRating = localStorage.getItem(`rating_${licenseName}`);
    if (storedRating) {
      const ratingValue = parseInt(storedRating);
      updateStarRatingVisual($(this), ratingValue);
      $(this)
        .siblings(".rating-value")
        .text(`Tu calificación: ${ratingValue} de 5`);
    }
  });

  $(".rating-star").on("click", function () {
    const starValue = $(this).data("value");
    const starContainer = $(this).parent();
    const licenseName = starContainer.data("license");
    updateStarRatingVisual(starContainer, starValue);
    starContainer
      .siblings(".rating-value")
      .text(`Tu calificación: ${starValue} de 5`);
    localStorage.setItem(`rating_${licenseName}`, starValue);
    alert(
      `¡Gracias por calificar la licencia "${licenseName}" con ${starValue} estrellas!`
    );
  });

  function updateStarRatingVisual(container, value) {
    container
      .find(".rating-star")
      .removeClass("bi-star-fill")
      .addClass("bi-star");
    container.find(".rating-star").each(function () {
      if ($(this).data("value") <= value) {
        $(this).removeClass("bi-star").addClass("bi-star-fill");
      }
    });
  }

  // --- LÓGICA DEL CARRITO DE COMPRAS Y PAGO ---

  // Función para actualizar la tabla de pedidos y los totales
  function actualizarTablaPedidos() {
    const tabla = $("#orderTable");
    tabla.empty();
    let subtotal = 0;

    productosSeleccionados.forEach((producto) => {
      const totalProducto = producto.precio * producto.cantidad;
      subtotal += totalProducto;
      const fila = `
        <tr>
          <td>${producto.licencia}</td>
          <td>${producto.cantidad}</td>
          <td>$${formatoMoneda(totalProducto)}</td>
        </tr>`;
      tabla.append(fila);
    });

    const iva = subtotal * 0.19;
    totalCompraGlobal = subtotal + iva;

    $("#subtotal").text(`$${formatoMoneda(subtotal)}`);
    $("#iva").text(`$${formatoMoneda(iva)}`);
    $("#total").text(`$${formatoMoneda(totalCompraGlobal)}`);

    // Actualizar valor de cuota si el campo existe y es visible
    if ($("#valorCuota").length && $("#valorCuota").is(":visible")) {
      actualizarValorCuota();
    }
  }

  // Función para agregar un producto al carrito
  function agregarProducto(event) {
    const boton = $(event.currentTarget);
    const licencia = boton.data("license");
    const precio = parseInt(boton.data("price"));
    const cantidad =
      parseInt(
        boton
          .closest(".table-info_row_content, .card-body")
          .find(".quantity-input")
          .val()
      ) || 1;

    const productoExistente = productosSeleccionados.find(
      (p) => p.licencia === licencia
    );

    if (productoExistente) {
      productoExistente.cantidad = cantidad;
    } else {
      productosSeleccionados.push({ licencia, precio, cantidad });
    }
    actualizarTablaPedidos();
    alert(`Se ha agregado "${licencia}" al carrito (${cantidad} unidad/es)`);
  }

  function actualizarValorCuota() {
    const numeroCuotasInput = $("#numeroCuotas");
    if (!numeroCuotasInput.length) return; // Salir si el input no existe

    let numeroCuotas = parseInt(numeroCuotasInput.val()) || 1;
    if (numeroCuotas > 10) {
      numeroCuotas = 10;
      numeroCuotasInput.val(10);
    }
    if (numeroCuotas < 1) {
      numeroCuotas = 1;
      numeroCuotasInput.val(1);
    }

    const valorCuota =
      totalCompraGlobal > 0 && numeroCuotas > 0
        ? totalCompraGlobal / numeroCuotas
        : 0;
    $("#valorCuota").val(formatoMoneda(valorCuota));
  }

  // Función para llenar los selectores de mes y año de expiración de la tarjeta
  function llenarSelectores() {
    const mesSelect = $("#mesExpiracion");
    if (mesSelect.length) {
      mesSelect
        .empty()
        .append('<option value="" selected disabled>Seleccione mes</option>');
      for (let i = 1; i <= 12; i++) {
        mesSelect.append(
          `<option value="${i}">${i < 10 ? `0${i}` : i}</option>`
        );
      }
    }

    const anioSelect = $("#anioExpiracion");
    if (anioSelect.length) {
      anioSelect
        .empty()
        .append('<option value="" selected disabled>Seleccione año</option>');
      // const anioActual = new Date().getFullYear(); // Requerimiento es 2025-2040
      for (let i = 2025; i <= 2040; i++) {
        anioSelect.append(`<option value="${i}">${i}</option>`);
      }
    }
  }

  // Función para mostrar el modal de confirmación de pago
  function mostrarConfirmacion() {
    const form = document.getElementById("formPago");
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const numeroCuotas = parseInt($("#numeroCuotas").val());
    const numeroTarjeta = $("#numeroTarjeta").val();
    const ultimosDigitos = numeroTarjeta.substring(
      numeroTarjeta.lastIndexOf("-") + 1
    );
    const ahora = new Date();

    const franquiciaInfo = identificarFranquicia(
      numeroTarjeta.replace(/-/g, "")
    );

    $("#fechaCompra").text(ahora.toLocaleDateString("es-ES"));
    $("#horaCompra").text(ahora.toLocaleTimeString("es-ES"));
    $("#totalCompra").text(formatoMoneda(totalCompraGlobal));
    $("#cantidadCuotas").text(numeroCuotas);
    $("#valorCuotaResumen").text($("#valorCuota").val());
    $("#ultimosDigitos").text(ultimosDigitos);
    $("#franquiciaResumen").attr("src", franquiciaInfo.imagen);
    $("#nombreFranquiciaResumen").text(franquiciaInfo.franquicia);

    const modalPagoEl = document.getElementById("modalPago");
    if (modalPagoEl) {
      const modalPago = bootstrap.Modal.getInstance(modalPagoEl);
      if (modalPago) modalPago.hide();
    }

    const modalConfirmacionEl = document.getElementById("modalConfirmacion");
    if (modalConfirmacionEl) {
      const modalConfirmacion = new bootstrap.Modal(modalConfirmacionEl);
      modalConfirmacion.show();
    }
  }

  // Función para finalizar la compra
  function finalizarCompra() {
    alert("¡Compra realizada con éxito! Gracias por tu compra.");
    const modalConfirmacionEl = document.getElementById("modalConfirmacion");
    if (modalConfirmacionEl) {
      const modalConfirmacion =
        bootstrap.Modal.getInstance(modalConfirmacionEl);
      if (modalConfirmacion) modalConfirmacion.hide();
    }

    productosSeleccionados = [];
    totalCompraGlobal = 0;
    actualizarTablaPedidos();

    const formPago = document.getElementById("formPago");
    if (formPago) formPago.reset();
    identificarFranquicia(""); // Resetear imagen de franquicia
    actualizarValorCuota(); // Resetear valor cuota a 0 o basado en total 0
  }

  // --- INICIALIZACIONES Y ASIGNACIÓN DE EVENT LISTENERS ---
  llenarSelectores();

  // Event listener para botones "Agregar" (usar delegación si se añaden dinámicamente)
  $(document).on("click", "button[data-license]", agregarProducto);

  $("#numeroCuotas").on("input", actualizarValorCuota);
  $("#numeroTarjeta").on("input", function () {
    formatearNumeroTarjeta(this);
  });
  $("#codigoSeguridad").on("input", function () {
    validarSoloNumeros(this);
  });

  $("#btnConfirmarPago").on("click", mostrarConfirmacion);
  $("#btnFinalizarCompra").on("click", finalizarCompra);

  // Llamada inicial para asegurar que la tabla y totales se muestren correctamente al cargar
  actualizarTablaPedidos();
});

// --- LÓGICA PARA CAMBIO DE TEMA (DARK MODE) ---
let darkmode = localStorage.getItem("dark-mode");
const themeSwitch = document.getElementById("theme-switch");

function enebleDarkMode() {
  document.body.classList.add("dark-mode");
  localStorage.setItem("dark-mode", "active");
}

function disableDarkMode() {
  document.body.classList.remove("dark-mode");
  localStorage.setItem("dark-mode", null);
}

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem("dark-mode");
  darkmode !== "active" ? enebleDarkMode() : disableDarkMode();
});

// Verificar el estado del tema al cargar la página
if (darkmode === "active") enebleDarkMode();

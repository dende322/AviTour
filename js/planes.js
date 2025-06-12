$(document).ready(function () {
  let subtotal = 0;
  let iva = 0;
  let total = 0;

  // Función para actualizar los totales
  function updateTotals() {
    subtotal = 0;
    $("#orderTable tr").each(function () {
      const rowTotal = parseInt(
        $(this).find("td:nth-child(3)").text().replace("$", "").replace(".", "")
      );
      subtotal += rowTotal;
    });

    iva = subtotal * 0.19;
    total = subtotal + iva;

    // Actualizar los campos en la página
    $("#subtotal").text(
      "$" +
        subtotal.toLocaleString("es-CO", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
    );
    $("#iva").text(
      "$" +
        iva.toLocaleString("es-CO", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
    );
    $("#total").text(
      "$" +
        total.toLocaleString("es-CO", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
    );
  }

  $(".btn-primary").click(function () {
    const license = $(this).data("license");
    const price = parseInt($(this).data("price"));
    const quantity = parseInt($(this).siblings(".quantity-input").val());

    const licenseTotal = price * quantity;

    const newRow = `
            <tr class="order-row">
              <td>${license}</td>
              <td>${quantity}</td>
              <td>$${licenseTotal.toLocaleString("es-CO")}</td>
            </tr>
          `;

    $("#orderTable").append(newRow);

    updateTotals();
  });
});

$(document).ready(function () {
  // Inicializar calificaciones desde localStorage si existen
  $(".star-rating").each(function () {
    const licenseName = $(this).data("license");
    const storedRating = localStorage.getItem(`rating_${licenseName}`);

    if (storedRating) {
      const ratingValue = parseInt(storedRating);
      updateStarRating($(this), ratingValue);
      $(this)
        .siblings(".rating-value")
        .text(`Tu calificación: ${ratingValue} de 5`);
    }
  });

  // Manejar clic en estrellas
  $(".rating-star").on("click", function () {
    const starValue = $(this).data("value");
    const starContainer = $(this).parent();
    const licenseName = starContainer.data("license");

    // Actualizar apariencia de las estrellas
    updateStarRating(starContainer, starValue);

    // Actualizar texto de calificación
    starContainer
      .siblings(".rating-value")
      .text(`Tu calificación: ${starValue} de 5`);

    // Guardar calificación en localStorage
    localStorage.setItem(`rating_${licenseName}`, starValue);

    // Mostrar mensaje de confirmación
    alert(
      `¡Gracias por calificar la licencia "${licenseName}" con ${starValue} estrellas!`
    );
  });

  // Función para actualizar la apariencia de las estrellas
  function updateStarRating(container, value) {
    container.find(".rating-star").removeClass("active");
    container
      .find(".rating-star")
      .removeClass("bi-star-fill")
      .addClass("bi-star");

    container.find(".rating-star").each(function () {
      const starValue = $(this).data("value");
      if (starValue <= value) {
        $(this).addClass("active");
        $(this).removeClass("bi-star").addClass("bi-star-fill");
      }
    });
  }
});

function calcularValorCuota() {
  // Obtener valores del formulario (ajusta según los campos que tengas)
  const valorPlan = parseFloat(document.getElementById("valorPlan").value) || 0;
  const numeroCuotas =
    parseInt(document.getElementById("numeroCuotas").value) || 1;

  // Calcular valor por cuota
  const valorCuota = valorPlan / numeroCuotas;

  // Mostrar en el resumen
  document.getElementById("valorCuotaResumen").textContent =
    valorCuota.toFixed(2);
}

// Agregar event listeners cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", function () {
  // Buscar elementos del formulario
  const formPlan = document.getElementById("formPlan");
  const inputValorPlan = document.getElementById("valorPlan");
  const selectNumeroCuotas = document.getElementById("numeroCuotas");

  // Agregar listeners para recalcular cuando cambien los valores
  if (inputValorPlan) {
    inputValorPlan.addEventListener("change", calcularValorCuota);
  }

  if (selectNumeroCuotas) {
    selectNumeroCuotas.addEventListener("change", calcularValorCuota);
  }

  // Si existe un formulario, agregar listener para el envío
  if (formPlan) {
    formPlan.addEventListener("submit", function (e) {
      e.preventDefault();
      // Aquí puedes agregar la lógica para procesar el formulario
      alert("¡Plan reservado con éxito!");
    });
  }

  // Calcular valor inicial
  calcularValorCuota();
});

// Cambiar el tema de la página
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

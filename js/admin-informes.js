// Datos de ejemplo para los gráficos
document.addEventListener("DOMContentLoaded", function () {
  // Gráfico de especies más buscadas
  const especiesCtx = document.getElementById("especiesChart").getContext("2d");
  new Chart(especiesCtx, {
    type: "bar",
    data: {
      labels: [
        "Águila Real",
        "Colibrí Esmeralda",
        "Búho Real",
        "Tucán Toco",
        "Flamenco Rosado",
      ],
      datasets: [
        {
          label: "Número de búsquedas",
          data: [245, 198, 176, 154, 132],
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // Gráfico de tendencia de búsquedas
  const tendenciaCtx = document
    .getElementById("tendenciaChart")
    .getContext("2d");
  new Chart(tendenciaCtx, {
    type: "line",
    data: {
      labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
      datasets: [
        {
          label: "Búsquedas mensuales",
          data: [650, 720, 810, 985, 1100, 1250],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
    },
  });

  // Gráfico de visitas por día
  const visitasCtx = document.getElementById("visitasChart").getContext("2d");
  new Chart(visitasCtx, {
    type: "line",
    data: {
      labels: [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
      ],
      datasets: [
        {
          label: "Visitas diarias",
          data: [520, 480, 510, 550, 620, 780, 690],
          fill: true,
          backgroundColor: "rgba(35, 64, 82, 0.2)",
          borderColor: "rgb(35, 64, 82)",
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
    },
  });

  // Gráfico de fuentes de tráfico
  const fuentesCtx = document.getElementById("fuentesChart").getContext("2d");
  new Chart(fuentesCtx, {
    type: "doughnut",
    data: {
      labels: [
        "Búsqueda orgánica",
        "Redes sociales",
        "Directo",
        "Referencias",
        "Email",
      ],
      datasets: [
        {
          label: "Fuentes de tráfico",
          data: [45, 25, 15, 10, 5],
          backgroundColor: [
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 99, 132, 0.6)",
            "rgba(255, 205, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
          borderColor: [
            "rgb(54, 162, 235)",
            "rgb(255, 99, 132)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(153, 102, 255)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
});

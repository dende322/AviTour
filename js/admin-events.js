let events = JSON.parse(localStorage.getItem("events")) || [];

// Función para cargar los eventos en la tabla
function loadEventsTable() {
  const tableBody = document.getElementById("events-table-body");
  if (!tableBody) return;

  let html = "";

  // Usar los datos de eventos del archivo main.js (asumiendo que existe una variable upcomingEvents)
  events.forEach((event) => {
    // Formatear la fecha para mostrarla en formato legible
    const date = event.fecha.split("-");

    const eventDate = new Date(`${date[1]}-${date[2]}-${date[0]}`);
    const formattedDate = eventDate.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    html += `
            <tr>
                <td>${event.id}</td>
                <td>${event.titulo}</td>
                <td>${formattedDate}</td>
                <td>${event.hora}</td>
                <td>${event.lugar}</td>
                <td class="action-buttons">
                    <button class="btn btn-sm btn-primary edit-event-btn" data-id="${event.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger delete-event-btn" data-id="${event.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
  });

  tableBody.innerHTML = html;

  // Agregar event listeners a los botones de editar y eliminar
  document.querySelectorAll(".edit-event-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const eventId = parseInt(this.getAttribute("data-id"));
      openEditModal(eventId);
    });
  });

  document.querySelectorAll(".delete-event-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const eventId = parseInt(this.getAttribute("data-id"));
      openDeleteModal(eventId);
    });
  });
}

// Función para cargar las opciones de sitios en los selectores
function loadSiteOptions() {
  const addSiteSelect = document.getElementById("event-site");
  const editSiteSelect = document.getElementById("edit-event-site");

  if (!addSiteSelect || !editSiteSelect) return;

  // Limpiar opciones existentes
  addSiteSelect.innerHTML = "";
  editSiteSelect.innerHTML = "";

  // Agregar opción por defecto
  addSiteSelect.innerHTML =
    '<option value="" selected disabled>Seleccionar sitio</option>';
  editSiteSelect.innerHTML =
    '<option value="" selected disabled>Seleccionar sitio</option>';

  // Agregar opciones de sitios
  featuredSites.forEach((site) => {
    const addOption = document.createElement("option");
    addOption.value = site.name;
    addOption.textContent = site.name;
    addSiteSelect.appendChild(addOption);

    const editOption = document.createElement("option");
    editOption.value = site.name;
    editOption.textContent = site.name;
    editSiteSelect.appendChild(editOption);
  });
}

// Función para abrir el modal de edición con los datos del evento
function openEditModal(eventId) {
  const event = events.find((e) => e.id === eventId);
  if (!event) return;

  // Formatear la fecha y hora para los inputs

  const date = event.fecha.split("-");

  const eventDate = new Date(`${date[1]}-${date[2]}-${date[0]}`);
  const formattedDate = eventDate.toISOString().split("T")[0]; // Formato YYYY-MM-DD

  // Extraer la hora del evento (asumiendo que está en el formato "HH:MM")
  const eventTime = event.hora || "12:00"; // Valor por defecto si no hay hora

  document.getElementById("edit-event-id").value = event.id;
  document.getElementById("edit-event-title").value = event.titulo;
  document.getElementById("edit-event-date").value = formattedDate;
  document.getElementById("edit-event-time").value = eventTime;
  document.getElementById("edit-event-site").value = event.lugar;
  document.getElementById("edit-event-description").value = event.descripcion;
  document.getElementById("edit-event-image").value = event.imagen;

  const editModal = new bootstrap.Modal(
    document.getElementById("editEventModal")
  );
  editModal.show();
}

// Función para abrir el modal de confirmación de eliminación
function openDeleteModal(eventId) {
  document.getElementById("delete-event-id").value = eventId;

  const deleteModal = new bootstrap.Modal(
    document.getElementById("deleteEventModal")
  );
  deleteModal.show();
}

// Función para guardar un nuevo evento
function saveEvent() {
  const title = document.getElementById("event-title").value;
  const dateInput = document.getElementById("event-date").value;
  const timeInput = document.getElementById("event-time").value;
  const site = document.getElementById("event-site").value;
  const description = document.getElementById("event-description").value;
  const image = document.getElementById("event-image").value;

  // Crear objeto de fecha
  const date = new Date(dateInput);

  // Generar un nuevo ID (en un sistema real, esto se haría en el servidor)
  const newId =
    events.length > 0 ? Math.max(...events.map((event) => event.id)) + 1 : 1;

  // Crear el nuevo objeto de evento
  const newEvent = {
    id: newId,
    titulo: title,
    fecha: date.toISOString().split("T")[0],
    hora: timeInput,
    lugar: site,
    descripcion: description,
    imagen: image,
  };

  // Agregar el nuevo evento al array
  events.push(newEvent);

  // Cerrar el modal
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("addEventModal")
  );
  modal.hide();

  // Limpiar el formulario
  document.getElementById("add-event-form").reset();

  // Recargar la tabla
  localStorage.removeItem("events");
  localStorage.setItem("events", JSON.stringify(events));
  loadEventsTable();

  // Mostrar mensaje de éxito (en un sistema real, se usaría un sistema de notificaciones)
  alert("Evento agregado exitosamente");
}

// Función para actualizar un evento existente
function updateEvent() {
  const id = parseInt(document.getElementById("edit-event-id").value);
  const title = document.getElementById("edit-event-title").value;
  const dateInput = document.getElementById("edit-event-date").value;
  const timeInput = document.getElementById("edit-event-time").value;
  const site = document.getElementById("edit-event-site").value;
  const description = document.getElementById("edit-event-description").value;
  const image = document.getElementById("edit-event-image").value;

  // Crear objeto de fecha
  const date = new Date(dateInput);

  // Encontrar el índice del evento en el array
  const eventIndex = events.findIndex((event) => event.id === id);

  if (eventIndex !== -1) {
    // Actualizar el evento
    events[eventIndex] = {
      id: id,
      titulo: title,
      fecha: date.toISOString().split("T")[0],
      hora: timeInput,
      lugar: site,
      descripcion: description,
      imagen: image,
    };

    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("editEventModal")
    );
    modal.hide();

    // Recargar la tabla
    localStorage.removeItem("events");
    localStorage.setItem("events", JSON.stringify(events));
    loadEventsTable();

    // Mostrar mensaje de éxito
    alert("Evento actualizado exitosamente");
  }
}

// Función para eliminar un evento
function deleteEvent() {
  const id = parseInt(document.getElementById("delete-event-id").value);

  // Filtrar el array para eliminar el evento
  events = events.filter((event) => event.id !== id);

  // Cerrar el modal
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("deleteEventModal")
  );
  modal.hide();

  // Recargar la tabla
  localStorage.removeItem("events");
  localStorage.setItem("events", JSON.stringify(events));
  loadEventsTable();

  // Mostrar mensaje de éxito
  alert("Evento eliminado exitosamente");
}

// Inicializar cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", function () {
  // Cargar la tabla de eventos
  loadEventsTable();

  // Cargar las opciones de sitios
  //loadSiteOptions();

  // Event listener para el botón de guardar nuevo evento
  document
    .getElementById("save-event-btn")
    .addEventListener("click", saveEvent);

  // Event listener para el botón de actualizar evento
  document
    .getElementById("update-event-btn")
    .addEventListener("click", updateEvent);

  // Event listener para el botón de confirmar eliminación
  document
    .getElementById("confirm-delete-btn")
    .addEventListener("click", deleteEvent);
});

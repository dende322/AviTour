// Datos de sitios
let sites = JSON.parse(localStorage.getItem("sites"));

//Función para cargar los sitios en la tabla
function loadSitesTable() {
  const tableBody = document.getElementById("sites-table-body");
  if (!tableBody) return;

  let html = "";

  // Usar los datos de sitios del archivo main.js
  sites.forEach((site) => {
    html += `
            <tr>
                <td>${site.id}</td>
                <td><img src="../../${site.image}" alt="${
      site.name
    }" class="site-image-preview"></td>
                <td>${site.name}</td>
                <td>${site.location}</td>
                <td>${site.description.substring(0, 50)}${
      site.description.length > 50 ? "..." : ""
    }</td>
                <td class="action-buttons">
                    <button class="btn btn-sm btn-primary edit-site-btn" data-id="${
                      site.id
                    }">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger delete-site-btn" data-id="${
                      site.id
                    }">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
  });

  tableBody.innerHTML = html;

  // Agregar event listeners a los botones de editar y eliminar
  document.querySelectorAll(".edit-site-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const siteId = parseInt(this.getAttribute("data-id"));
      openEditModal(siteId);
    });
  });

  document.querySelectorAll(".delete-site-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const siteId = parseInt(this.getAttribute("data-id"));
      openDeleteModal(siteId);
    });
  });
}

// Función para abrir el modal de edición con los datos del sitio
function openEditModal(siteId) {
  const site = sites.find((s) => s.id === siteId);
  if (!site) return;

  document.getElementById("edit-site-id").value = site.id;
  document.getElementById("edit-site-name").value = site.name;
  document.getElementById("edit-site-location").value = site.location;
  document.getElementById("edit-site-description").value = site.description;
  document.getElementById("edit-site-image").value = site.image;

  const editModal = new bootstrap.Modal(
    document.getElementById("editSiteModal")
  );
  editModal.show();
}

// Función para abrir el modal de confirmación de eliminación
function openDeleteModal(siteId) {
  document.getElementById("delete-site-id").value = siteId;

  const deleteModal = new bootstrap.Modal(
    document.getElementById("deleteSiteModal")
  );
  deleteModal.show();
}

// Función para guardar un nuevo sitio
function saveSite() {
  const name = document.getElementById("site-name").value;
  const location = document.getElementById("site-location").value;
  const description = document.getElementById("site-description").value;
  const image = document.getElementById("site-image").value;

  // Generar un nuevo ID (en un sistema real, esto se haría en el servidor)
  const newId =
    sites.length > 0 ? Math.max(...sitios.map((site) => site.id)) + 1 : 1;

  // Crear el nuevo objeto de sitio
  const newSite = {
    id: newId,
    name: name,
    location: location,
    description: description,
    image: image,
  };

  // Agregar el nuevo sitio al array
  sites.push(newSite);

  // Cerrar el modal
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("addSiteModal")
  );
  modal.hide();

  // Limpiar el formulario
  document.getElementById("add-site-form").reset();

  // Recargar la tabla
  localStorage.removeItem("sites");
  localStorage.setItem("sites", JSON.stringify(sites));
  loadSitesTable();

  // Mostrar mensaje de éxito (en un sistema real, se usaría un sistema de notificaciones)
  alert("Sitio agregado exitosamente");
}

// Función para actualizar un sitio existente
function updateSite() {
  const id = parseInt(document.getElementById("edit-site-id").value);
  const name = document.getElementById("edit-site-name").value;
  const location = document.getElementById("edit-site-location").value;
  const description = document.getElementById("edit-site-description").value;
  const image = document.getElementById("edit-site-image").value;

  // Encontrar el índice del sitio en el array
  const siteIndex = sites.findIndex((site) => site.id === id);

  if (siteIndex !== -1) {
    // Actualizar el sitio
    sites[siteIndex] = {
      id: id,
      name: name,
      location: location,
      description: description,
      image: image,
    };

    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("editSiteModal")
    );
    modal.hide();

    // Recargar la tabla
    localStorage.removeItem("sites");
    localStorage.setItem("sites", JSON.stringify(sites));
    loadSitesTable();

    // Mostrar mensaje de éxito
    alert("Sitio actualizado exitosamente");
  }
}

// Función para eliminar un sitio
function deleteSite() {
  const id = parseInt(document.getElementById("delete-site-id").value);

  // Filtrar el array para eliminar el sitio
  sites = sites.filter((site) => site.id !== id);

  // Cerrar el modal
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("deleteSiteModal")
  );
  modal.hide();

  // Recargar la tabla
  localStorage.removeItem("sites");
  localStorage.setItem("sites", JSON.stringify(sites));
  loadSitesTable();

  // Mostrar mensaje de éxito
  alert("Sitio eliminado exitosamente");
}

// Inicializar cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", function () {
  // Cargar la tabla de sitios
  loadSitesTable();

  // Event listener para el botón de guardar nuevo sitio
  document.getElementById("save-site-btn").addEventListener("click", saveSite);

  // Event listener para el botón de actualizar sitio
  document
    .getElementById("update-site-btn")
    .addEventListener("click", updateSite);

  // Event listener para el botón de confirmar eliminación
  document
    .getElementById("confirm-delete-btn")
    .addEventListener("click", deleteSite);
});

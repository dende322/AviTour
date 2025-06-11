// Datos de ejemplo para la galería (en un sistema real, esto vendría de una base de datos)
let gallery = JSON.parse(localStorage.getItem("gallery")) || [];
const sites = JSON.parse(localStorage.getItem("sites")) || [];

// Función para cargar las imágenes en la galería
function loadAdminGallery() {
  const galleryContainer = document.getElementById("admin-gallery");
  if (!galleryContainer) return;

  let html = "";

  gallery.forEach((image) => {
    const site = sites.find((s) => s.id === image.location);
    const date = image.date.split("-");
    const gallerytDate = new Date(`${date[1]}-${date[2]}-${date[0]}`);
    const formattedDate = gallerytDate.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    html += `
            <div class="col-4 col-md-6 col-lg-4 col-xl-4 mb-4">
                <div class="card gallery-card h-100">
                  <div class="text-center align-content-center h-75">
                    <img src="../../${image.image}" class="card-img-top" alt="${
      image.title
    }">
                  </div>
                    
                    <div class="card-body">
                        <h5 class="card-title">${image.title}</h5>
                        <p class="card-text">${image.description}</p>
                        <p class="card-text"><small class=" ">Autor: ${
                          image.photographer || "Desconocido"
                        }</small></p>
                        <p class="card-text"><small class=" ">Sitio de Avistamiento: ${
                          site?.name || "Desconocido"
                        }</small></p>
                        <p class="card-text"><small class=" ">Fecha: ${
                          formattedDate || "Desconocido"
                        }</small></p>
                    </div>
                    <div class="card-footer bg-transparent border-top-0">
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-sm edit-gallery-btn btn-success" data-id="${
                              image.id
                            }">
                                <i class="fas fa-edit"></i> Editar
                            </button>
                            <button class="btn btn-sm btn-danger delete-gallery-btn" data-id="${
                              image.id
                            }">
                                <i class="fas fa-trash"></i> Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
  });

  galleryContainer.innerHTML = html;

  // Agregar event listeners a los botones de editar y eliminar
  document.querySelectorAll(".edit-gallery-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const imageId = parseInt(this.getAttribute("data-id"));
      openEditModal(imageId);
    });
  });

  document.querySelectorAll(".delete-gallery-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const imageId = parseInt(this.getAttribute("data-id"));
      openDeleteModal(imageId);
    });
  });
}

// Función para cargar los sitios de avsitameitnno en el select
function loadSites(container, image) {
  const siteSelect = document.getElementById(container);
  if (!siteSelect) return;

  let options = '<option value="">Seleccionar sitio</option>';

  sites.forEach((site) => {
    if (site.id === image?.location) {
      options += `<option value="${site.id}" selected>${site.name}</option>`;
    } else {
      options += `<option value="${site.id}">${site.name}</option>`;
    }
  });

  siteSelect.innerHTML = options;
}

// Función para abrir el modal de edición con los datos de la imagen
function openEditModal(imageId) {
  let image = gallery.find((img) => img.id === imageId);
  if (!image) return;

  const date = image.date.split("-");

  const galleryDate = new Date(`${date[1]}-${date[2]}-${date[0]}`);
  const formattedDate = galleryDate.toISOString().split("T")[0]; // Formato YYYY-MM-DD

  document.getElementById("edit-gallery-id").value = image.id;
  document.getElementById("edit-gallery-specie").value = image.species;
  document.getElementById("edit-gallery-title").value = image.title;
  document.getElementById("edit-gallery-description").value = image.description;
  document.getElementById("edit-gallery-date").value = formattedDate;
  document.getElementById("edit-gallery-image").value = image.image;
  document.getElementById("edit-gallery-author").value = image.photographer;

  loadSites("edit-gallery-location", image);
  const editModal = new bootstrap.Modal(
    document.getElementById("editGalleryModal")
  );
  editModal.show();
}

// Función para abrir el modal de confirmación de eliminación
function openDeleteModal(imageId) {
  document.getElementById("delete-gallery-id").value = imageId;

  const deleteModal = new bootstrap.Modal(
    document.getElementById("deleteGalleryModal")
  );
  deleteModal.show();
}

// Función para guardar una nueva imagen
function saveGallery() {
  const specie = document.getElementById("gallery-specie").value;
  const title = document.getElementById("gallery-title").value;
  const description = document.getElementById("gallery-description").value;
  const date = document.getElementById("gallery-date").value;
  const site = document.getElementById("gallery-location").value;
  const image = document.getElementById("gallery-image").value;
  const photographer = document.getElementById("gallery-author").value;

  // Generar un nuevo ID (en un sistema real, esto se haría en el servidor)
  const newId =
    gallery.length > 0
      ? Math.max(...galleryImages.map((img) => img.id)) + 1
      : 1;

  const newDate = new Date(date);

  // Crear el nuevo objeto de imagen
  const newImage = {
    id: newId,
    title: title,
    description: description,
    species: specie,
    image: image,
    photographer: photographer,
    date: newDate.toISOString().split("T")[0],
    location: parseInt(site),
  };

  // Agregar la nueva imagen al array
  gallery.push(newImage);

  // Cerrar el modal
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("addGalleryModal")
  );
  modal.hide();

  // Limpiar el formulario
  document.getElementById("add-gallery-form").reset();

  // Recargar la galería
  localStorage.removeItem("gallery");
  localStorage.setItem("gallery", JSON.stringify(gallery));
  loadAdminGallery();

  // Mostrar mensaje de éxito (en un sistema real, se usaría un sistema de notificaciones)
  alert("Imagen agregada exitosamente");
}

// Función para actualizar una imagen existente
function updateGallery() {
  const id = parseInt(document.getElementById("edit-gallery-id").value);
  const specie = document.getElementById("edit-gallery-specie").value;
  const title = document.getElementById("edit-gallery-title").value;
  const description = document.getElementById("edit-gallery-description").value;
  const date = document.getElementById("edit-gallery-date").value;
  const site = document.getElementById("edit-gallery-location").value;
  const image = document.getElementById("edit-gallery-image").value;
  const photographer = document.getElementById("edit-gallery-author").value;

  // Encontrar el índice de la imagen en el array
  const imageIndex = gallery.findIndex((img) => img.id === id);

  if (imageIndex !== -1) {
    // Actualizar la

    const newDate = new Date(date);

    gallery[imageIndex] = {
      id: id,
      title: title,
      description: description,
      image: image,
      photographer: photographer,
      species: specie,
      date: newDate.toISOString().split("T")[0],
      location: parseInt(site),
    };

    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("editGalleryModal")
    );
    modal.hide();

    // Recargar la galería
    localStorage.removeItem("gallery");
    localStorage.setItem("gallery", JSON.stringify(gallery));
    loadAdminGallery();

    // Mostrar mensaje de éxito
    alert("Imagen actualizada exitosamente");
  }
}

// Función para eliminar una imagen
function deleteGallery() {
  const id = parseInt(document.getElementById("delete-gallery-id").value);

  // Filtrar el array para eliminar la imagen
  gallery = gallery.filter((img) => img.id !== id);

  // Cerrar el modal
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("deleteGalleryModal")
  );
  modal.hide();

  // Recargar la galería
  localStorage.removeItem("gallery");
  localStorage.setItem("gallery", JSON.stringify(gallery));
  loadAdminGallery();

  // Mostrar mensaje de éxito
  alert("Imagen eliminada exitosamente");
}

// Inicializar cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", function () {
  // Cargar la galería
  loadAdminGallery();

  // Cargar los sitios de avistamiento
  loadSites("gallery-location");

  // Event listener para el botón de guardar nueva imagen
  document
    .getElementById("save-gallery-btn")
    .addEventListener("click", saveGallery);

  // Event listener para el botón de actualizar imagen
  document
    .getElementById("update-gallery-btn")
    .addEventListener("click", updateGallery);

  // Event listener para el botón de confirmar eliminación
  document
    .getElementById("confirm-delete-btn")
    .addEventListener("click", deleteGallery);
});

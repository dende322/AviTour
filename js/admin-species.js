let species = JSON.parse(localStorage.getItem("species"));
const sites = JSON.parse(localStorage.getItem("sites"));

// Función para cargar las especies en la tabla
function loadSpeciesTable() {
  const tableBody = document.getElementById("species-table-body");
  if (!tableBody) return;

  let html = "";

  // Usar los datos de especies del archivo main.js (asumiendo que existe una variable birdSpecies)
  species.forEach((specie) => {
    const status = getStatusBadgeClass(specie.status);
    html += `
            <tr>
                <td>${specie.id}</td>
                <td><img src="../../${specie.image}" alt="${specie.name}" class="site-image-preview"></td>
                <td>${specie.name}</td>
                <td><em>${specie.scientificName}</em></td>
                <td><span class="badge ${status.class}">${status.text}</span></td>
                <td class="action-buttons">
                    <button class="btn btn-sm btn-primary edit-species-btn" data-id="${specie.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger delete-species-btn" data-id="${specie.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
  });

  tableBody.innerHTML = html;

  // Agregar event listeners a los botones de editar y eliminar
  document.querySelectorAll(".edit-species-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const speciesId = parseInt(this.getAttribute("data-id"));
      openEditModal(speciesId);
    });
  });

  document.querySelectorAll(".delete-species-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const speciesId = parseInt(this.getAttribute("data-id"));
      openDeleteModal(speciesId);
    });
  });
}

function loadSites_ForNuewSpecies() {
  // Cargar sitios relacionadas con esta especie
  const BirdSitesContainer = document.getElementById("input-habitat");

  let sitesSpecie = "";
  sites.forEach((site) => {
    sitesSpecie += `
                <div class="col-md-8 mb-2 mr-5">
                    <div class="form-check">
                        <input class="form-check-input" id="input-habitat-${site.id}" type="checkbox" value="${site.id}">
                        <label class="form-check-label" for="checkChecked">${site.name}</label>
                    </div>
                </div>
           `;
  });

  BirdSitesContainer.innerHTML = sitesSpecie;
}

// Función para obtener la clase de badge según el estado de conservación
function getStatusBadgeClass(status) {
  switch (status) {
    case "PC":
      return {
        class: "badge-danger",
        text: "En Peligro Crítico",
      };
    case "VU":
      return {
        class: "badge-warning",
        text: "Vulnerable",
      };
    case "PM":
      return {
        class: "badge-success",
        text: "Preocupación Menor",
      };
  }
}

// Función para abrir el modal de edición con los datos de la especie
function openEditModal(speciesId) {
  const specie = species.find((s) => s.id === speciesId);
  if (!species) return;

  // Cargar sitios relacionadas con esta especie
  const BirdSitesContainer = document.getElementById("habitat");
  const birdSites = sites.filter((site) => specie.siteIds.includes(site.id));

  let sitesSpecie = "";
  sites.forEach((site) => {
    sitesSpecie += `
                <div class="col-md-8 mb-2 mr-5" style="margin-left: 20px;">
                    <div class="form-check">
                        <input class="form-check-input" id="habitat-${
                          site.id
                        }" type="checkbox" value="${site.id}" ${
      specie.siteIds.includes(site.id) ? "checked" : ""
    }>
                        <label class="form-check-label" for="checkChecked">${
                          site.name
                        }</label>
                    </div>
                </div>
           `;
  });

  BirdSitesContainer.innerHTML = sitesSpecie;

  document.getElementById("edit-species-id").value = specie.id;
  document.getElementById("edit-species-name").value = specie.name;
  document.getElementById("edit-species-scientific-name").value =
    specie.scientificName;
  document.getElementById("edit-species-description").value =
    specie.description;
  document.getElementById("edit-species-status").value = specie.status;
  document.getElementById("edit-species-image").value = specie.image;
  console.log(specie.isEndangered);

  document.getElementById("edit-isEndemic").checked = specie.isEndemic;
  document.getElementById("edit-isMigratory").checked = specie.isMigratory;
  document.getElementById("edit-isEndangered").checked = specie.isEndangered;

  const editModal = new bootstrap.Modal(
    document.getElementById("editSpeciesModal")
  );
  editModal.show();
}

// Función para abrir el modal de confirmación de eliminación
function openDeleteModal(speciesId) {
  document.getElementById("delete-species-id").value = speciesId;

  const deleteModal = new bootstrap.Modal(
    document.getElementById("deleteSpeciesModal")
  );
  deleteModal.show();
}

// Función para guardar una nueva especie
function saveSpecies() {
  const name = document.getElementById("species-name").value;
  const scientificName = document.getElementById(
    "species-scientific-name"
  ).value;
  const description = document.getElementById("species-description").value;
  const status = document.getElementById("species-status").value;
  const image = document.getElementById("species-image").value;
  const isEndemic = document.getElementById("isEndemic").checked;
  const isMigratory = document.getElementById("isMigratory").checked;
  const isEndangered = document.getElementById("isEndangered").checked;
  let habitats = [];
  sites.forEach((site) => {
    const habitatCheckbox = document.getElementById(`input-habitat-${site.id}`);
    if (habitatCheckbox.checked) {
      habitats.push(site.id);
    }
  });

  // Generar un nuevo ID (en un sistema real, esto se haría en el servidor)
  const newId =
    species.length > 0
      ? Math.max(...species.map((specie) => specie.id)) + 1
      : 1;

  // Crear el nuevo objeto de especie
  const newSpecies = {
    id: newId,
    name: name,
    scientificName: scientificName,
    description: description,
    status: status,
    image: image,
    siteIds: habitats,
    isEndemic: isEndemic,
    isMigratory: isMigratory,
    isEndangered: isEndangered,
  };

  // Agregar la nueva especie al array
  species.push(newSpecies);

  // Cerrar el modal
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("addSpeciesModal")
  );
  modal.hide();

  // Limpiar el formulario
  document.getElementById("add-species-form").reset();

  // Recargar la tabla
  localStorage.removeItem("species");
  localStorage.setItem("species", JSON.stringify(species));
  loadSpeciesTable();

  // Mostrar mensaje de éxito (en un sistema real, se usaría un sistema de notificaciones)
  alert("Especie agregada exitosamente");
}

// Función para actualizar una especie existente
function updateSpecies() {
  const id = parseInt(document.getElementById("edit-species-id").value);
  const name = document.getElementById("edit-species-name").value;
  const scientificName = document.getElementById(
    "edit-species-scientific-name"
  ).value;
  const description = document.getElementById("edit-species-description").value;
  const status = document.getElementById("edit-species-status").value;
  const image = document.getElementById("edit-species-image").value;

  let habitats = [];
  sites.forEach((site) => {
    const habitatCheckbox = document.getElementById(`habitat-${site.id}`);
    if (habitatCheckbox.checked) {
      habitats.push(site.id);
    }
  });

  const isEndemic = document.getElementById("edit-isEndemic").checked;
  const isMigratory = document.getElementById("edit-isMigratory").checked;
  const isEndangered = document.getElementById("edit-isEndangered").checked;

  const siteIds = habitats;

  // Encontrar el índice de la especie en el array
  const speciesIndex = species.findIndex((specie) => specie.id === id);

  if (speciesIndex !== -1) {
    // Actualizar la especie
    species[speciesIndex] = {
      id: id,
      name: name,
      scientificName: scientificName,
      description: description,
      status: status,
      siteIds: siteIds,
      image: image,
      isEndemic: isEndemic,
      isMigratory: isMigratory,
      isEndangered: isEndangered,
    };

    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("editSpeciesModal")
    );
    modal.hide();

    // Recargar la tabla
    localStorage.removeItem("species");
    localStorage.setItem("species", JSON.stringify(species));
    loadSpeciesTable();

    // Mostrar mensaje de éxito
    alert("Especie actualizada exitosamente");
  }
}

// Función para eliminar una especie
function deleteSpecies() {
  const id = parseInt(document.getElementById("delete-species-id").value);

  // Filtrar el array para eliminar la especie
  species = species.filter((species) => species.id !== id);

  // Cerrar el modal
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("deleteSpeciesModal")
  );
  modal.hide();

  // Recargar la tabla
  localStorage.removeItem("species");
  localStorage.setItem("species", JSON.stringify(species));
  loadSpeciesTable();

  // Mostrar mensaje de éxito
  alert("Especie eliminada exitosamente");
}

// Inicializar cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", function () {
  // Cargar la tabla de especies
  loadSpeciesTable();
  // Cargar los sitios para la nueva especie
  loadSites_ForNuewSpecies();

  // Event listener para el botón de guardar nueva especie
  document
    .getElementById("save-species-btn")
    .addEventListener("click", saveSpecies);

  // Event listener para el botón de actualizar especie
  document
    .getElementById("update-species-btn")
    .addEventListener("click", updateSpecies);

  // Event listener para el botón de confirmar eliminación
  document
    .getElementById("confirm-delete-btn")
    .addEventListener("click", deleteSpecies);
});

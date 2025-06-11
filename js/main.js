// Crear arrays para almacenar los datos de los sitios, especies, eventos y galería
function loadData() {
  if (!localStorage.getItem("sites")) {
    localStorage.setItem(
      "sites",
      JSON.stringify([
        {
          id: 1,
          name: "Reserva Natural La Romera",
          location: "Sabaneta, Antioquia",
          description:
            "Bosque nublado con más de 200 especies de aves registradas.",
          image: "img/sitios/La-Romera.jpg",
          latitude: 6.2060478,
          longitude: -75.019803,
        },
        {
          id: 2,
          name: "Jardín Botánico de Medellín",
          location: "Medellín, Antioquia",
          description:
            "Oasis urbano con diversidad de aves y senderos ecológicos.",
          image: "img/sitios/Jardin-Botanico.jpg",
          latitude: 6.27083333,
          longitude: -75.56416667,
        },
        {
          id: 3,
          name: "Reserva Natural Río Claro",
          location: "Sonsón, Antioquia",
          description: "Cañón de mármol con bosque tropical y aves exóticas.",
          image: "img/sitios/Rio-Claro.jpg",
          latitude: 6.2843,
          longitude: -75.5088,
        },
      ])
    );
  }

  if (!localStorage.getItem("species")) {
    localStorage.setItem(
      "species",
      JSON.stringify([
        {
          id: 1,
          name: "Barranquero Andino",
          scientificName: "Momotus aequatorialis",
          description:
            "Ave colorida de tamaño mediano con cola en forma de raqueta. Presenta colores azul y verde en su plumade; habita en bosques húmedos.",
          status: "PM",
          image: "../img/aves/Barranquero-Andino.jpg",
          isEndemic: true,
          isEndangered: false,
          isMigratory: false,
          siteIds: [1, 3],
        },
        {
          id: 2,
          name: "Tangara Multicolor",
          scientificName: "Chlorochrysa nitidissima",
          description:
            "Especie endémica de Colombia con plumaje verde brillante y azul.",
          status: "VU",
          image: "../img/aves/Tangara-Multicolor.jpg",
          isEndemic: false,
          isEndangered: true,
          isMigratory: false,
          siteIds: [1, 2],
        },
        {
          id: 3,
          name: "Trogón Collarejo",
          scientificName: "Trogon collaris",
          description:
            "Ave de colores vibrantes con pecho rojo y anillo ocular amarillo.",
          status: "PM",
          image: "../img/aves/Trogon.jpg",
          isEndemic: false,
          isEndangered: false,
          isMigratory: true,
          siteIds: [3],
        },
        {
          id: 4,
          name: "Carpintero Real",
          scientificName: "Dryocopus lineatus",
          description:
            "Carpintero grande con cresta roja y rayas blancas en la cara.",
          status: "PM",
          image: "../img/aves/Carpintero-Real.jpg",
          isEndemic: true,
          isEndangered: false,
          isMigratory: true,
          siteIds: [1, 2, 3],
        },
        {
          id: 5,
          name: "Colibrí Chillón",
          scientificName: "Colibri coruscans",
          description:
            "Colibrí de tamaño mediano con plumaje verde iridiscente.",
          status: "PM",
          image: "../img/aves/Colibri-Chillon.jpg",
          isEndemic: false,
          isEndangered: false,
          isMigratory: false,
          siteIds: [1, 2],
        },
        {
          id: 6,
          name: "Tucán Pechiblanco",
          scientificName: "Ramphastos tucanus",
          description: "Tucán grande con pico colorido y pecho blanco.",
          status: "PM",
          image: "../img/aves/Tucan-Pechiblanco.jpg",
          isEndemic: false,
          isEndangered: false,
          isMigratory: false,
          siteIds: [3],
        },
        {
          id: 7,
          name: "Reinita Cerúlea",
          scientificName: "Setophaga cerulea",
          description:
            "Pequeña ave migratoria de color azul grisáceo por encima y blanco por debajo, con rayas oscuras en los costados.",
          status: "VU",
          image: "../img/aves/Reinita-Cerulea.jpg",
          isEndemic: false,
          isEndangered: true,
          isMigratory: true,
          siteIds: [1, 2],
        },
        {
          id: 8,
          name: "Guacamaya Verde",
          scientificName: "Ara militaris",
          description:
            "Gran loro de color verde con frente roja y parches azules en las alas y cola.",
          status: "PC",
          image: "../img/aves/Guacamaya-Verde.jpg",
          isEndemic: false,
          isEndangered: true,
          isMigratory: false,
          siteIds: [2, 3],
        },
      ])
    );
  }

  if (!localStorage.getItem("events")) {
    localStorage.setItem(
      "events",
      JSON.stringify([
        {
          id: 1,
          titulo: "Taller de Fotografía de Aves",
          fecha: "2025-06-15",
          hora: "09:00",
          lugar: "Jardín Botánico de Medellín",
          descripcion:
            "Aprende técnicas especializadas para fotografiar aves en su hábitat natural con el fotógrafo profesional Carlos Ramírez.",
          imagen: "img/eventos/taller-fotografia-de-aves.jpg",
        },
        {
          id: 2,
          titulo: "Salida de Observación: Aves Migratorias",
          fecha: "2025-06-25",
          hora: "06:00",
          lugar: "Reserva Natural La Romera, Sabaneta",
          descripcion:
            "Únete a esta salida guiada para observar aves migratorias que visitan nuestra región durante esta temporada.",
          imagen: "img/eventos/aves-migratorias.png",
        },
        {
          id: 3,
          titulo: "Conferencia: Conservación de Aves en Antioquia",
          fecha: "2025-05-05",
          hora: "05:00",
          lugar: "Universidad de Antioquia, Auditorio Principal",
          descripcion:
            "El ornitólogo Juan Pérez presentará los desafíos actuales para la conservación de aves en nuestra región y las iniciativas en marcha.",
          imagen: "img/eventos/conservacion-de-aves.png",
        },
        {
          id: 4,
          titulo: "Festival de Aves de Antioquia",
          fecha: "2025-05-18",
          hora: "06:00",
          lugar: "Parque Arví, Medellín",
          descripcion:
            "Tres días dedicados a la celebración de la diversidad de aves en nuestra región, con charlas, talleres, caminatas guiadas y actividades para toda la familia.",
          imagen: "img/eventos/festival-de-aves.png",
        },
      ])
    );
  }

  if (!localStorage.getItem("gallery")) {
    localStorage.setItem(
      "gallery",
      JSON.stringify([
        {
          id: 1,
          title: "Barranquero Andino",
          species: "barranquero",
          location: 3,
          photographer: "Carlos Pérez",
          image: "img/galeria/Barranquero-Andino.jpg",
          date: "2025-01-15",
          description: "Barranquero posado en una rama en La Romera",
        },
        {
          id: 2,
          title: "Tángara en vuelo",
          species: "tangara",
          location: 1,
          photographer: "María López",
          image: "img/galeria/tangara-en-vuelo.jpg",
          date: "2025-02-10",
          description: "Tángara Multicolor en pleno vuelo",
        },
        {
          id: 3,
          title: "Colibrí alimentándose",
          species: "colibri",
          location: 2,
          photographer: "Juan Rodríguez",
          image: "img/galeria/colobri-alimentadose.png",
          date: "2025-02-20",
          description: "Colibrí Chillón alimentándose de una flor",
        },
        {
          id: 4,
          title: "Tucán en árbol",
          species: "tucan",
          location: 3,
          photographer: "Ana Gómez",
          image: "img/galeria/Tucan-Pechiblanco.jpg",
          date: "2025-03-05",
          description: "Tucán Pechiblanco observando desde un árbol",
        },
        {
          id: 5,
          title: "Carpintero trabajando",
          species: "carpintero",
          location: 2,
          photographer: "Pedro Martínez",
          image: "img/galeria/carpintero-trabajando.png",
          date: "2025-03-10",
          description: "Carpintero Real perforando un tronco",
        },
        {
          id: 6,
          title: "Trogón en reposo",
          species: "trogon",
          location: 3,
          photographer: "Laura Sánchez",
          image: "img/galeria/trogon-en-reposo.jpg",
          date: "2025-04-01",
          description: "Trogón Collarejo descansando en la tarde",
        },
      ])
    );
  }

  if (!localStorage.getItem("featuredSpecies")) {
    localStorage.setItem(
      "featuredSpecies",
      JSON.stringify([
        {
          id: 1,
          name: "Barranquero Andino",
          scientificName: "Momotus aequatorialis",
          image: "img/aves/Barranquero-Andino.jpg",
        },
        {
          id: 2,
          name: "Tangara Multicolor",
          scientificName: "Chlorochrysa nitidissima",
          image: "img/aves/Tangara-Multicolor.jpg",
        },
        {
          id: 3,
          name: "Trogón Collarejo",
          scientificName: "Trogon collaris",
          image: "img/aves/Trogon.jpg",
        },
      ])
    );
  }

  if (!localStorage.getItem("featuredSites")) {
    localStorage.setItem(
      "featuredSites",
      JSON.stringify([
        {
          id: 1,
          name: "Reserva Natural La Romera",
          location: "Sabaneta, Antioquia",
          description:
            "Bosque nublado con más de 200 especies de aves registradas.",
          image: "img/sitios/La-Romera.jpg",
          latitude: 6.2060478,
          longitude: -75.019803,
        },
        {
          id: 2,
          name: "Jardín Botánico de Medellín",
          location: "Medellín, Antioquia",
          description:
            "Oasis urbano con diversidad de aves y senderos ecológicos.",
          image: "img/sitios/Jardin-Botanico.jpg",
          latitude: 6.27083333,
          longitude: -75.56416667,
        },
        {
          id: 3,
          name: "Reserva Natural Río Claro",
          location: "Sonsón, Antioquia",
          description: "Cañón de mármol con bosque tropical y aves exóticas.",
          image: "img/sitios/Rio-Claro.jpg",
          latitude: 6.27083333,
          longitude: -75.56416667,
        },
      ])
    );
  }
}

// Datos de sitios destacados
const featuredSites = JSON.parse(localStorage.getItem("featuredSites"));
//Datos para especies destacadas
const featuredSpecies = JSON.parse(localStorage.getItem("featuredSpecies"));
// Datos de ejemplo para especies de aves
const birdSpecies = JSON.parse(localStorage.getItem("species"));
// Datos para la galería de imágenes
const galleryImages = JSON.parse(localStorage.getItem("gallery"));
// Datos de eventos
const eventos = JSON.parse(localStorage.getItem("events"));
// Datos de sitios
const sitios = JSON.parse(localStorage.getItem("sites"));

//Inicio Index page
// Función para cargar sitios destacados en la página principal
function loadFeaturedSites() {
  const container = document.getElementById("featured-sites");
  if (!container) return;

  let html = "";
  featuredSites.forEach((site) => {
    html += `
            <div class="col-md-4">
                <div class="card site-card h-100">
                    <img src="${site.image}" class="card-img-top" alt="${site.name}">
                    <div class="card-body">
                        <h5 class="card-title">${site.name}</h5>
                        <p class="card-text"><i class="bi bi-geo-alt"></i> ${site.location}</p>
                        <p class="card-text">${site.description}</p>
                        <a href="pages/sitios.html?id=${site.id}" class="btn btn-success">Ver detalles</a>
                    </div>
                </div>
            </div>
        `;
  });

  container.innerHTML = html;
}
// Función para cargar especies destacadas en la página principal
function loadFeaturedSpecies() {
  const container = document.getElementById("featured-species");
  if (!container) return;

  let html = "";
  featuredSpecies.forEach((species) => {
    html += `
            <div class="col-md-4">
                <div class="card h-100 species-card">
                    <img src="${species.image}" class="card-img-top" alt="${species.name}">
                    <div class="card-body">
                        <h4 class="card-title">${species.name}</h4>
                        <p class="card-text"><em>${species.scientificName}</em></p> 
                        <a href="pages/especies.html?id=${species.id}" class="btn btn-success">Detalles</a>
                    </div>
                </div>
            </div>
        `;
  });
  container.innerHTML = html;
}
function cargarEventosDestacados() {
  const eventosDestacadosContainer = document.getElementById("featured-events");

  // Verificar si estamos en la página principal
  if (eventosDestacadosContainer) {
    let eventosHTML = "";

    // Mostrar solo los primeros 3 eventos en la página principal
    eventos.slice(0, 3).forEach((evento) => {
      eventosHTML += `
            <div class="col-md-4 mb-4">
                <div class="card h-100 event-card">
                    <img src="../${evento.imagen}" class="card-img-top" alt="${evento.titulo}" style="height: 180px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title" style="color: var(--secondary-color);">${evento.titulo}</h5>
                        <p class="card-text">
                            <i class="far fa-calendar-alt me-2" style="color: var(--accent-color);"></i> ${evento.fecha}<br>
                            <i class="far fa-clock me-2" style="color: var(--accent-color);"></i> ${evento.hora}
                        </p>
                    </div>
                    <div class="card-footer bg-white border-0">
                        <a href="pages/eventos.html" class="btn btn-outline-primary btn-sm">Ver detalles</a>
                    </div>
                </div>
            </div>
            `;
    });

    eventosDestacadosContainer.innerHTML = eventosHTML;
  }
}
// Fin Index page

//Common functions for all pages
//Función para cargar el pie de pagina
function loadFooterPages() {
  const contsiner = document.getElementById("footer-pages");
  if (!contsiner) return;
  let html = `
   <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <h5 style="color: var(--highlight-color);">AviTour</h5>
                    <p class="text-white">Tu guía para la observación de aves en el suroeste de Antioquia.</p>
                </div>
                <div class="col-md-4">
                    <h5 style="color: var(--highlight-color);">Enlaces Rápidos</h5>
                    <ul class="list-unstyled">
                        <li><a href="sitios.html" class="text-white">Sitios de Avistamiento</a></li>
                        <li><a href="especies.html" class="text-white">Especies</a></li>
                        <li><a href="galeria.html" class="text-white">Galería</a></li>
                        <li><a href="eventos.html" class="text-white">Eventos</a></li>
                        <li><a href="contacto.html" class="text-white">Contacto</a></li>
                    </ul>
                </div>
                <div class="col-md-4">
                    <h5 style="color: var(--highlight-color);">Contacto</h5>
                    <p class="text-white"><i class="fas fa-envelope me-2"></i> info@avitour.co</p>
                    <p class="text-white"><i class="fas fa-phone me-2"></i> (604) 123-4567</p>
                    <div class="social-icons">
                        <a href="#" class="text-white me-2"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="text-white me-2"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="text-white me-2"><i class="fab fa-twitter"></i></a>
                    </div>
                </div>
            </div>
            <hr style="border-color: rgba(255,255,255,0.2);">
            <div class="text-center">
                <p class="text-white">&copy; 2023 AviTour. Todos los derechos reservados.</p>
            </div>
        </div>
    `;
  contsiner.innerHTML = html;
}
//Función para cargar el header de la pagina
function loadNavbarPages() {
  const contsiner = document.getElementById("navbar-pages");
  if (!contsiner) return;
  let html = `
   <div class="container">
            <a class="navbar-brand logo" href="index.html">
                <img src="../img/logo.png" alt="AviTour Logo" height="40" class="me-2">
                <span>AviTour</span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="../index.html">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="sitios.html">Sitios de Avistamiento</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="especies.html">Especies</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="galeria.html">Galería</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="eventos.html">Eventos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="contacto.html">Contacto</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="admin.html">Admin <i class="fas fa-user-lock"></i></a>
                    </li>
                </ul>
            </div>
        </div>
        <button id="theme-switch">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
        >
          <path
            d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z"
          ></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
        >
          <path
            d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Z"
          ></path>
        </svg>
      </button>
    `;
  contsiner.innerHTML = html;
}
function loadSidebarAdminPages() {
  const contsiner = document.getElementById("admin-sidebar");
  if (!contsiner) return;
  let html = `
   <div class="d-flex flex-column p-3">
                    <a href="admin-dashboard.html" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none logo logo-admin-sidebar">
                        <img src="../../img/logo.png" alt="AviTour Logo" height="40" class="me-2">
                        <span class="">AviTour</span>
                    </a>
                    <hr>
                    <ul class="nav nav-pills flex-column mb-auto">
                        <li class="nav-item">
                            <a href="admin-dashboard.html" class="nav-link">
                                <i class="fas fa-tachometer-alt"></i> Dashboard
                            </a>
                        </li>
                        <li>
                            <a href="admin-sites.html" class="nav-link">
                                <i class="fas fa-map-marker-alt"></i> Sitios
                            </a>
                        </li>
                        <li>
                            <a href="admin-species.html" class="nav-link">
                                <i class="fas fa-feather-alt"></i> Especies
                            </a>
                        </li>
                        <li>
                            <a href="admin-events.html" class="nav-link">
                                <i class="fas fa-calendar-alt"></i> Eventos
                            </a>
                        </li>
                        <li>
                            <a href="admin-gallery.html" class="nav-link">
                                <i class="fas fa-images"></i> Galería
                            </a>
                        </li>
                        <li>
                            <a href="admin-informes.html" class="nav-link">
                                <i class="fas fa-filter"></i> Informes
                            </a>
                        </li>
                    </ul>
                    <hr>
                    <div class="dropdown">
                        <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-person-badge-fill" style="padding-right: 10px; font-size: 20px;"></i> 
                            <strong> Administrador</strong>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                            <li><a class="dropdown-item" href="#">Perfil</a></li>
                            <li><a class="dropdown-item" href="#">Configuración</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" id="logout-button">Cerrar sesión</a></li>
                        </ul>
                    </div>
                    <div class="mt-3 d-flex justify-content-center">
                      <button id="theme-switch" class="admin-sidebar-theme-switch">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="24px"
                                  viewBox="0 -960 960 960"
                                  width="24px"
                                >
                                  <path
                                    d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z"
                                  ></path>
                                </svg>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="24px"
                                  viewBox="0 -960 960 960"
                                  width="24px"
                                >
                                  <path
                                    d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Z"
                                  ></path>
                                </svg>
                      </button>
                    </div>
                </div>
    `;
  contsiner.innerHTML = html;
}

//Incio Pagina Sitios de Avistamientos
// Función para cargar todos los sitios en la página de sitios
function loadAllSites() {
  const container = document.getElementById("all-sites");
  if (!container) return;

  let html = "";
  sitios.forEach((site) => {
    html += `
            <div class="col-md-4 mb-4">
                <div class="card site-card h-100">
                    <img src="../${site.image}" class="card-img-top" alt="${site.name}">
                    <div class="card-body">
                        <h5 class="card-title">${site.name}</h5>
                        <p class="card-text"><i class="bi bi-geo-alt"></i> ${site.location}</p>
                        <p class="card-text">${site.description}</p>
                        <a href="sitios.html?id=${site.id}" class="btn btn-sm btn-success">Ver detalles</a>
                    </div>
                </div>
            </div>
        `;
  });

  container.innerHTML = html;
}
// Función para cargar detalles de un sitio específico
function loadSiteDetails() {
  const detailsContainer = document.getElementById("site-details");
  if (!detailsContainer) return;

  // Obtener el ID del sitio de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const siteId = parseInt(urlParams.get("id"));

  // Buscar el sitio por ID
  const site = sitios.find((s) => s.id === siteId);
  if (!site) {
    detailsContainer.innerHTML =
      '<div class="alert alert-danger">Sitio no encontrado</div>';
    return;
  }

  // Cargar detalles del sitio
  detailsContainer.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="../${site.image}" class="img-fluid rounded" alt="${site.name}">
            </div>
            <div class="col-md-6">
                <h2>${site.name}</h2>
                <p class="lead"><i class="bi bi-geo-alt"></i> ${site.location}</p>
                <p>${site.description}</p>
                <h4 class="mt-4">Aves que puedes encontrar aquí:</h4>
                <div class="row" id="site-birds"></div>
                <a href="sitios.html" class="btn btn-primary mt-3">
                    <i class="fas fa-arrow-left me-2"></i>Volver a todas los sitios</a>
            </div>
        </div>
        <div class="mt-5">
            <h3>Ubicación</h3>
            <div id="map" style="height: 400px; width: 100%;"></div>
        </div>
    `;

  // Cargar aves relacionadas con este sitio
  const siteBirdsContainer = document.getElementById("site-birds");
  const siteBirds = birdSpecies.filter((bird) => bird.siteIds.includes(siteId));

  let birdsHtml = "";
  siteBirds.forEach((bird) => {
    birdsHtml += `
            <div class="col-md-6 mb-3">
                <div class="d-flex align-items-center">
                    <img src="../${bird.image}" alt="${bird.name}" class="rounded-circle me-3" style="width: 50px; height: 50px; object-fit: cover;">
                    <div>
                        <h6 class="mb-0">${bird.name}</h6>
                        <small class="text-muted"><em>${bird.scientificName}</em></small>
                    </div>
                </div>
            </div>
        `;
  });

  siteBirdsContainer.innerHTML = birdsHtml;
  if (site) {
    // Inicializar el mapa
    const map = L.map("map").setView([site.latitude, site.longitude], 13);

    // Agregar la capa de OpenStreetMap
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Agregar un marcador en la ubicación del sitio
    L.marker([site.latitude, site.longitude])
      .addTo(map)
      .bindPopup(site.name)
      .openPopup();
  }
}
// Función para manejar los filtros en la página de sitios
function setupSiteFilters() {
  const applyFiltersBtn = document.getElementById("apply-filters");
  if (!applyFiltersBtn) return;

  applyFiltersBtn.addEventListener("click", function () {
    const locationFilter = document.getElementById("location-filter").value;
    const habitatFilter = document.getElementById("habitat-filter").value;

    // Filtrar sitios según los criterios seleccionados
    let filteredSites = sitios;

    if (locationFilter) {
      filteredSites = filteredSites.filter((site) =>
        site.location.includes(locationFilter)
      );
    }

    if (habitatFilter) {
      filteredSites = filteredSites.filter((site) =>
        site.description.includes(habitatFilter)
      );
    }

    // Mostrar los sitios filtrados
    const container = document.getElementById("all-sites");
    if (!container) return;

    let html = "";
    if (filteredSites.length === 0) {
      html =
        '<div class="col-12"><div class="alert alert-info">No se encontraron sitios con los filtros seleccionados.</div></div>';
    } else {
      filteredSites.forEach((site) => {
        html += `
          <div class="col-md-4 mb-4">
            <div class="card site-card h-100">
              <img src="../${site.image}" class="card-img-top" alt="${site.name}">
              <div class="card-body">
                <h5 class="card-title">${site.name}</h5>
                <p class="card-text"><i class="bi bi-geo-alt"></i> ${site.location}</p>
                <p class="card-text">${site.description}</p>
                <a href="sitios.html?id=${site.id}" class="btn btn-sm btn-primary">Ver detalles</a>
              </div>
            </div>
          </div>
        `;
      });
    }

    container.innerHTML = html;
  });
}
// Función para mostrar u ocultar secciones según la URL
function handleSitePageView() {
  // Verificar si estamos en la página de sitios
  if (!document.getElementById("all-sites")) return;

  const urlParams = new URLSearchParams(window.location.search);
  const siteId = urlParams.get("id");

  const allSitesContainer = document
    .getElementById("all-sites")
    .closest(".container");
  const siteDetailsContainer = document.getElementById(
    "site-details-container"
  );

  if (siteId) {
    // Mostrar detalles de un sitio específico
    allSitesContainer.style.display = "none";
    siteDetailsContainer.style.display = "block";
    loadSiteDetails();
  } else {
    // Mostrar lista de todos los sitios
    allSitesContainer.style.display = "block";
    siteDetailsContainer.style.display = "none";
    loadAllSites();
    setupSiteFilters();
  }
}
//Fin pagina Sitios de Avistamiento

//Inicio pagina de Especies
// Función para cargar todas las especies en la página de especies
function loadAllSpecies() {
  const container = document.getElementById("all-species");
  if (!container) return;

  let html = "";

  birdSpecies.forEach((bird) => {
    let status = getBadgeClass_Status(bird.status);
    html += `
            <div class="col-md-4 mb-4">
                <div class="card h-100 species-card">
                    <img src="../${bird.image}" class="card-img-top" alt="${
      bird.name
    }">
                    <div class="card-body">
                        <h4 class="card-title">${bird.name}</h4>
                        <p class="card-text"><em>${bird.scientificName}</em></p>
                        <p class="card-text">
                            <span class="badge ${status.class}">${
      status.text
    }</span>
                            ${
                              bird.isEndemic
                                ? '<span class="badge badge-info ms-1">Endémica</span>'
                                : ""
                            }
                            ${
                              bird.isMigratory
                                ? '<span class="badge badge-info ms-1">Migratoria</span>'
                                : ""
                            }
                        </p>
                        <a href="especies.html?id=${
                          bird.id
                        }" class="btn btn-sm btn-success">Ver detalles</a>
                    </div>
                </div>
            </div>
        `;
  });

  container.innerHTML = html;
}
// Función para determinar la clase de la insignia según el estado de conservación
function getBadgeClass_Status(status) {
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
function handleSpeciesPageView() {
  // Verificar si estamos en la página de especies
  if (!document.getElementById("all-species")) return;

  const urlParams = new URLSearchParams(window.location.search);
  const birdId = urlParams.get("id");

  const allSitesContainer = document
    .getElementById("all-species")
    .closest(".container");
  const siteDetailsContainer = document.getElementById(
    "species-details-container"
  );

  if (birdId) {
    // Mostrar detalles de una especie específica
    allSitesContainer.style.display = "none";
    siteDetailsContainer.style.display = "block";
    loadBirdDetails();
  } else {
    // Mostrar lista de todas las especies
    allSitesContainer.style.display = "block";
    siteDetailsContainer.style.display = "none";
    loadAllSpecies();
    setupSpeciesSearch();
  }
}
// Función para configurar la búsqueda de especies
function setupSpeciesSearch() {
  const searchInput = document.getElementById("species-search");
  const searchButton = document.getElementById("search-button");
  const clearButton = document.getElementById("clear-button");
  const endangeredCheckbox = document.getElementById("filter-endangered");
  const endemicCheckbox = document.getElementById("filter-endemic");
  const migratoryCheckbox = document.getElementById("filter-migratory");

  if (!searchInput || !searchButton || !clearButton) return;

  // Función para realizar la búsqueda
  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const isEndangeredChecked = endangeredCheckbox.checked;
    const isEndemicChecked = endemicCheckbox.checked;
    const isMigratoryChecked = migratoryCheckbox.checked;

    // Filtrar especies según los criterios
    const filteredSpecies = birdSpecies.filter((bird) => {
      const nameMatch =
        bird.name.toLowerCase().includes(searchTerm) ||
        bird.scientificName.toLowerCase().includes(searchTerm);

      const endangeredMatch = isEndangeredChecked ? bird.isEndangered : true;
      const endemicMatch = isEndemicChecked ? bird.isEndemic : true;
      const migratoryMatch = isMigratoryChecked ? bird.isMigratory : true;

      return nameMatch && endangeredMatch && endemicMatch && migratoryMatch;
    });

    // Mostrar resultados
    displayFilteredSpecies(filteredSpecies);
  }

  function clearFilters() {
    const searchInput = document.getElementById("species-search");
    const endangeredCheckbox = document.getElementById("filter-endangered");
    const endemicCheckbox = document.getElementById("filter-endemic");
    const migratoryCheckbox = document.getElementById("filter-migratory");

    if (
      !searchInput ||
      !endangeredCheckbox ||
      !endemicCheckbox ||
      !migratoryCheckbox
    )
      return;

    searchInput.value = "";
    endangeredCheckbox.checked = false;
    endemicCheckbox.checked = false;
    migratoryCheckbox.checked = false;
    loadAllSpecies(); // Cargar todas las especies nuevamente
  }

  // Función para mostrar las especies filtradas
  function displayFilteredSpecies(filteredSpecies) {
    const container = document.getElementById("all-species");
    if (!container) return;

    let html = "";

    if (filteredSpecies.length === 0) {
      html =
        '<div class="col-12"><div class="alert alert-info">No se encontraron especies que coincidan con tu búsqueda.</div></div>';
    } else {
      filteredSpecies.forEach((bird) => {
        let status = getBadgeClass_Status(bird.status);
        html += `
                    <div class="col-md-4 mb-4">
                        <div class="card h-100 species-card">
                            <img src="../${
                              bird.image
                            }" class="card-img-top" alt="${bird.name}">
                            <div class="card-body">
                                <h4 class="card-title" style="color: var(--accent-color);">${
                                  bird.name
                                }</h4>
                                <p class="card-text"><em>${
                                  bird.scientificName
                                }</em></p>
                                <p class="card-text">
                                    <span class="badge ${status.class}">${
          status.text
        }</span>
                                    ${
                                      bird.isEndemic
                                        ? '<span class="badge badge-info ms-1">Endémica</span>'
                                        : ""
                                    }
                                    ${
                                      bird.isMigratory
                                        ? '<span class="badge badge-secondary ms-1">Migratoria</span>'
                                        : ""
                                    }
                                </p>
                                <a href="especies.html?id=${
                                  bird.id
                                }" class="btn btn-sm btn-primary">Ver detalles</a>
                            </div>
                        </div>
                    </div>
                `;
      });
    }

    container.innerHTML = html;
  }

  // Eventos para la búsqueda
  searchButton.addEventListener("click", performSearch);
  searchInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      performSearch();
    }
  });

  clearButton.addEventListener("click", clearFilters);

  // Eventos para los checkboxes
  endangeredCheckbox.addEventListener("change", performSearch);
  endemicCheckbox.addEventListener("change", performSearch);
  migratoryCheckbox.addEventListener("change", performSearch);
}
// Función para cargar los detalles de una especie específica
function loadBirdDetails() {
  const detailsContainer = document.getElementById("species-details");
  if (!detailsContainer) return;

  // Obtener el ID de la especie de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const birdId = urlParams.get("id");

  // Buscar la especie en el array
  const bird = birdSpecies.find((b) => b.id === parseInt(birdId));
  if (!bird) {
    detailsContainer.innerHTML =
      '<div class="alert alert-danger">Especie no encontrada</div>';
    return;
  }

  let status = getBadgeClass_Status(bird.status);

  let birdDetail = `
        <div class="row">
            <div class="col-md-6">
                <img src="../${bird.image}" class="img-fluid rounded" alt="${
    bird.name
  }">
            </div>
            <div class="col-md-6">
                <h2 style="color: var(--secondary-color);">${bird.name}</h2>
                <p class=""><em>${bird.scientificName}</em></p>
                
                <div class="mb-3">
                    <span class="badge ${status.class}">${status.text}</span>
                    ${
                      bird.isEndemic
                        ? '<span class="badge badge-info ms-1">Endémica</span>'
                        : ""
                    }
                    ${
                      bird.isMigratory
                        ? '<span class="badge badge-secondary ms-1">Migratoria</span>'
                        : ""
                    }
                </div>
                
                <h5>Descripción</h5>
                <p>${bird.description}</p>
                
                <h5>Distribución</h5>
                <p>Información sobre la distribución de la especie...</p>
                
                <h5>Sitios recomendados para observación</h5>
                <div class="row" id="bird-sites"></div>

                <a href="especies.html" class="btn btn-success mt-3">
                    <i class="fas fa-arrow-left me-2"></i>Volver a todas las especies
                </a>
            </div>
        </div>
    `;

  detailsContainer.innerHTML = birdDetail;

  // Cargar sitios relacionadas con esta especie
  const BirdSitesContainer = document.getElementById("bird-sites");
  const birdSites = sitios.filter((site) => bird.siteIds.includes(site.id));

  let birdsHtml = "";
  birdSites.forEach((site) => {
    birdsHtml += `
             <div class="col-md-6 mb-3">
                 <div class="d-flex align-items-center">
                     <img src="../${site.image}" alt="${site.name}" class="rounded-circle me-3" style="width: 50px; height: 50px; object-fit: cover;">
                     <div>
                         <h6 class="mb-0">${site.name}</h6>
                     </div>
                 </div>
             </div>
         `;
  });

  BirdSitesContainer.innerHTML = birdsHtml;
}
// Fin pagina de Especies

// Inicio pagina de Galeria
// Función para cargar la galería de imágenes
function loadGallery() {
  const galleryContainer = document.getElementById("gallery-container");
  if (!galleryContainer) return;

  let html = "";

  galleryImages.forEach((image) => {
    //Obtener sitio de avistameinto por el ID
    const site = sitios.find((s) => s.id === image.location);
    const date = image.date.split("-");
    const gallerytDate = new Date(`${date[1]}-${date[2]}-${date[0]}`);
    const formattedDate = gallerytDate.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    html += `
      <div class="col-md-6 mb-4">
        <div class="card gallery-card h-100">
          <img src="../${image.image}" class="card-img-top" alt="${image.title}">
          <div class="card-body">
            <h5 class="card-title">${image.title}</h5>
            <p class="card-text">
              <i class="bi bi-geo-alt-fill icon-site-link"></i><a class="site-link" href="sitios.html?id=${site.id}">${site.name}</a><br>
              <i class="bi bi-calendar-event"></i> ${formattedDate}<br>
              <i class="bi bi-camera"></i> ${image.photographer}
            </p>
            <p class="card-text">${image.description}</p>
            <a href="#" class="btn btn-success view-image" data-id="${image.id}">Ver en tamaño completo</a>
          </div>
        </div>
      </div>
    `;
  });

  galleryContainer.innerHTML = html;

  // Configurar eventos para ver imágenes en tamaño completo
  document.querySelectorAll(".view-image").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const imageId = parseInt(this.getAttribute("data-id"));
      const image = galleryImages.find((img) => img.id === imageId);

      if (image) {
        // Abrir la imagen en lightbox o modal
        // Aquí podrías implementar un lightbox o simplemente abrir la imagen en una nueva ventana
        window.open(`../${image.image}`, "_blank");
      }
    });
  });
}
// Fin pagina de Galeria

// Inicio pagina de Eventos
// Función para cargar eventos en la página de eventos
function cargarEventos() {
  const eventosContainer = document.getElementById("eventos-container");

  // Verificar si estamos en la página de eventos
  if (eventosContainer) {
    let eventosHTML = "";

    eventos.forEach((evento) => {
      const date = evento.fecha.split("-");
      const eventDate = new Date(`${date[1]}-${date[2]}-${date[0]}`);
      const formattedDate = eventDate.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      eventosHTML += `
            <div class="col-md-6 mb-4">
                <div class="card h-100 event-card">
                    <img src="../${evento.imagen}" class="card-img-top" alt="${evento.titulo}" style="height: 350px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${evento.titulo}</h5>
                        <p class="card-text">
                            <i class="far fa-calendar-alt me-2" ></i> ${formattedDate}<br>
                            <i class="far fa-clock me-2" ></i> ${evento.hora}<br>
                            <i class="fas fa-map-marker-alt me-2" ></i> ${evento.lugar}
                        </p>
                        <p class="card-text">${evento.descripcion}</p>
                    </div>
                </div>
            </div>
            `;
    });

    eventosContainer.innerHTML = eventosHTML;
  }
}
// Fin pagina de Eventos

function loadSiteMap() {
  const mapContainer = document.getElementById("map_");
  if (!mapContainer) return;

  // Coordenadas iniciales (centro de Medellín)
  const initialLat = 6.2442;
  const initialLng = -75.5812;

  try {
    // Inicializar el mapa
    const map = L.map("map_").setView([initialLat, initialLng], 13);

    // Agregar la capa de OpenStreetMap
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Agregar marcadores para todos los sitios
    sitios.forEach((site) => {
      if (site.latitude && site.longitude) {
        L.marker([site.latitude, site.longitude])
          .addTo(map)
          .bindPopup(`<b>${site.name}</b><br>${site.location}`);
      }
    });
    // Invalidar el tamaño del mapa para forzar su redibujado
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  } catch (error) {
    console.error("Error al inicializar el mapa:", error);
  }
}

function changeDarkMode() {
  let darkmode = localStorage.getItem("dark-mode");
  const themeSwitch = document.getElementById("theme-switch");

  function enebleDarkMode() {
    document.body.classList.add("dark-mode");
    localStorage.setItem("dark-mode", "active");
    chartsColor();
  }

  function disableDarkMode() {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("dark-mode", null);
    chartsColor();
  }

  themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem("dark-mode");
    darkmode !== "active" ? enebleDarkMode() : disableDarkMode();
  });

  // Verificar el estado del tema al cargar la página
  if (darkmode === "active") enebleDarkMode();
}

function chartsColor() {
  let darkmode = localStorage.getItem("dark-mode");
  if (darkmode === "active") {
    primary_color = "#234052"; /* Verde del logo */
    secondary_color = "#4f8c7b"; /* Azul oscuro */
    accent_color = "#8c342b"; /* Rojo/marrón de la cabeza del pájaro */
    highlight_color = "#e9c46a"; /* Amarillo/dorado del pecho del pájaro */
    bg_color = "#2a4d63"; /* Color claro para fondos */
    grey_color = "#6c757d";
    window.text_color = "#f7f7f7";
    card_bg_color = "#315870";
    icon_color = "#e9c46a";
  } else {
    primary_color = "#4f8c7b"; /* Verde del logo */
    secondary_color = "#234052"; /* Azul oscuro */
    accent_color = "#8c342b"; /* Rojo/marrón de la cabeza del pájaro */
    highlight_color = "#e9c46a"; /* Amarillo/dorado del pecho del pájaro */
    bg_color = "#f7f7f7"; /* Color claro para fondos */
    grey_color = "#6c757d";
    window.text_color = "#333";
    card_bg_color = "#f7f7f7";
    icon_color = "#4f8c7b";
  }
}

// Función para inicializar la página
document.addEventListener("DOMContentLoaded", function () {
  // Cargar Datos
  loadData();

  // Cargar el pie de página
  loadFooterPages();

  // Cargar el encabezado de la página
  loadNavbarPages();

  // Cargar el sidebar de la página admin
  loadSidebarAdminPages();

  // Cargar sitios destacados en la página principal
  loadFeaturedSites();

  // Cargar especies destacadas en la página principal
  loadFeaturedSpecies();

  // Cargar eventos destacados en la página principal
  cargarEventosDestacados();

  // Cargar todos los sitios en la página de sitios
  loadAllSites();

  // Manejar la vista de la página de sitios (lista o detalles)
  handleSitePageView();

  // Cargar todas las especies en la página de especies
  loadAllSpecies();

  // Cargar detalles de una especie específica
  handleSpeciesPageView();

  // Cargar la galería de imágenes
  loadGallery();

  // Cargar eventos en la página de eventos
  cargarEventos();

  loadSiteMap();

  changeDarkMode();

  chartsColor();
});

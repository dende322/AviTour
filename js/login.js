// Credenciales de administrador (en un sistema real, esto estaría en el servidor)
const adminCredentials = {
  username: "admin",
  password: "admin123",
};

// Función para manejar el inicio de sesión
function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  // Validar credenciales
  if (
    username === adminCredentials.username &&
    password === adminCredentials.password
  ) {
    // Guardar estado de sesión en localStorage
    localStorage.setItem("isLoggedIn", "true");

    // Redirigir al panel de administración
    window.location.href = "admin/admin-dashboard.html";
  } else {
    // Mostrar mensaje de error
    errorMessage.textContent = "Usuario o contraseña incorrectos";
    errorMessage.style.display = "block";
  }
}

// Función para verificar si el usuario está autenticado
function checkAuth() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const adminPages = [
    "admin/admin-dashboard.html",
    "admin/admin-sites.html",
    "admin/admin-species.html",
    "admin/admin-events.html",
    "admin/admin-gallery.html",
    "admin/admin-informes.html",
  ];

  // Obtener la página actual
  const currentPage = window.location.pathname.split("/").pop();

  // Si es una página de administración y no está autenticado, redirigir al login
  if (adminPages.includes(currentPage) && !isLoggedIn) {
    window.location.href = "admin.html";
  }

  // Si está en la página de login y ya está autenticado, redirigir al dashboard
  if (currentPage === "admin.html" && isLoggedIn) {
    window.location.href = "admin/admin-dashboard.html";
  }
}

// Función para cerrar sesión
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "../admin.html";
}

// Inicializar funciones cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", function () {
  // Verificar autenticación
  checkAuth();

  // Configurar el formulario de login
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  // Configurar el botón de logout
  document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "logout-button") {
      logout();
    }
  });
});

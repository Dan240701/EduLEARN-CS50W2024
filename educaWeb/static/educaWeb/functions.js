// Description: Funciones comunes que se utilizan en este proyecto

//Function to show or hide elements
export function toggleDisplay(selector, displayStyle) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        element.style.display = displayStyle;
    });
}

//Cookie functions
export const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

//Function to show a modal with a form
export function mostrarModalLeccion(leccionId, titulo, videoUrl, descripcion) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success btn-spacing",
          cancelButton: "btn btn-danger",
          padding: "3 rem",
        
        },
        buttonsStyling: false
      });

      swalWithBootstrapButtons.fire({
        html: `
            <div class="lesson-container">
             <div class="lesson-subtitle">${titulo}</div>
            <div class="video-wrapper">
                <div class="video-overlay"></div>
                <iframe class="video-frame" src="${videoUrl}" allowfullscreen></iframe>
            </div>
            <div class="lesson-progress"> Contenido </div>
            <div class="lesson-description"> ${descripcion} </div>
    </div>
        `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        width: '100rem',
        confirmButtonText: "Completar lección",
        cancelButtonText: "Cerrar leccion",
       
      });
}

//Funcion para crear iconos
export function SvgIcon(type, options = {}) {
    switch (type) {
      case 'capslock':
        return `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" id="btn-agregar-leccion" fill="currentColor" class="bi bi-capslock-fill" viewBox="0 0 16 16">
            <path d="M7.27 1.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v1a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-1H1.654C.78 9.5.326 8.455.924 7.816zM4.5 13.5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1z"/>
          </svg>
        `;
      case 'plus':
        return `
        <button class="btn btn-outline-primary" id="btn-crear-leccion" style="border-radius:50px; ml:1rem; ">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
          Agregar</button>
        `;
        case 'agregar_curso':
          // Verifica si cursoId está presente en las opciones y lo usa si está disponible
          const cursoIdAttribute = options.cursoId ? `data-curso-id="${options.cursoId}"` : '';
          return `
          <a href="#" class="card-inscripcion" ${cursoIdAttribute}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            Guardar a mis cursos
          </a>
        `;
      default:
        return '';
    }
}

export function obtenerTipoDeUsuario() {
  const mainContent = document.querySelector('.container-fluid.main-content');
  if (mainContent) {
      return mainContent.getAttribute('data-tipo-usuario');
  } else {
      console.log('El elemento .container-fluid.main-content no se encontró.');
      return null;
  }
}

//devolver el id del usuario
export function obtenerIdUsuario() {
    const mainContent = document.querySelector('.container-fluid.main-content');
    if (mainContent) {
      const userId = mainContent.getAttribute('data-student-id');
      return userId;
    } else {
      console.log('El elemento .container-fluid.main-content no se encontró.');
      return null;
    }
  }

// Definir OcultarElementosParaProfesor
export function HviewTeacher() {
  const userType = obtenerTipoDeUsuario();
  if (userType === 'teacher') {
      document.querySelectorAll('.card-actions').forEach(function(div) {
          div.style.display = 'none';
      });
      // Ocultar elementos con clase 'card-inscripcion'
          document.querySelectorAll('.card-inscripcion').forEach(function(a) {
          a.style.display = 'none';
        });
  }
}

// Definir OcultarElementosParaEstudiante
export function HviewStudent() {
  const userType = obtenerTipoDeUsuario();
  if (userType === 'student') {
      document.querySelectorAll('.card-actions').forEach(function(div) {
          div.style.display = 'none';
      });
  }
}
// Ajustar la altura de los contenedores de las tarjetas
export function fixDisplay() {
  document.querySelectorAll('.card').forEach(card => {
      card.style.height = 'auto';
  });
}

// Simulación de una función que obtiene el ID del dueño de un curso específico
async function obtenerDueñoDelCurso(cursoId) {
  try {
    const response = await fetch(`/educaWeb/apis/cursos/${cursoId}/dueno/`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    const ownerId = data.ownerId;
    console.log(`Owner ID: ${ownerId}`); // Paso 1: Verificar el valor de ownerId
    return ownerId;
  } catch (error) {
    console.error("Error al obtener el dueño del curso:", error);
  }
}

// Implementación de esDueñoDelCurso
export async function esDueñoDelCurso(cursoId, userId) {
  const ownerId = await obtenerDueñoDelCurso(cursoId);
  console.log(`Comparing ownerId (${typeof ownerId}) ${ownerId} with userId (${typeof userId}) ${userId}`); 
  return parseInt(ownerId, 10) === parseInt(userId, 10); 
}
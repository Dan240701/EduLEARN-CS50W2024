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
        title: `<h3><strong>${titulo}</strong></h3>`,
        icon: 'info',
        html: `
            <div class="embed-responsive embed-responsive-16by9">
                <iframe class="embed-responsive-item" src="${videoUrl}" allowfullscreen></iframe>
            </div>
            <hr>
            <p style='display: flex; justify-content:center;'>${descripcion}</p>
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
export function SvgIcon(type) {
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
      default:
        return '';
    }
}


document.addEventListener('DOMContentLoaded', function() {
    ObtenerCursos();

      // Agregar manejador de eventos al botón de crear curso
      document.getElementById('crearCurso').addEventListener('click', function() {
          document.querySelector('.container-courses').style.display = 'none'; 
          document.querySelector('.form-cursos').style.display = 'block'; 
      });

      document.querySelector('.container-lectures').style.display = 'none';
      document.querySelector('.form-cursos').style.display = 'none';
      document.querySelector('.container-courses').style.display = 'block';
    
      // Aquí puedes añadir el resto de tu lógica de inicialización
      document.getElementById('btn-save').addEventListener('click', function(event) {
        event.preventDefault(event);
        crearCurso(event);
      });
  
});


const getCookie = (name) => {
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
const csrftoken = getCookie('csrftoken');

function ObtenerCursos() {
    document.getElementById('titulo-curso').textContent = 'Cursos';

    fetch(`/educaWeb/apis/cursos/`) 
      .then(response => response.json())
      .then(cursos => {
        const contenedorCursos = document.querySelector('.cards');
        let htmlCursos = '';
        cursos.forEach(curso => {
          htmlCursos += `
            <div class="card" tabindex="0">
              <div class="${curso.estado ? 'card-status-active' : 'card-status-inactive'}">${curso.estado ? 'Activo' : 'Inactivo'}</div>
              <div class="card-title">${curso.nombre}</div>
              <div class="card-level">${curso.nivel}</div>
              <a href="#" class="card-button" data-curso-id="${curso.id}">Entrar</a>
              <div class="card-date">${curso.fecha_inicio}</div>
            </div>
          `;
        });
        contenedorCursos.innerHTML = htmlCursos;

        // Agregar evento click a los botones de los cursos
        document.querySelectorAll('.card-button').forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const cursoId = this.getAttribute('data-curso-id');
                contenedorCursos.style.display = 'none'; // Ocultar cursos
                document.querySelector('.container-lectures').style.display = 'block'; // Mostrar lecciones
                ObtenerLecciones(cursoId);
            });
        });

      })
      .catch(error => console.error('Error:', error));
}

  function ObtenerLecciones(cursoId) {

    document.getElementById('titulo-curso').textContent = 'Lecciones';

    fetch(`/educaWeb/apis/lecciones/por_curso/?curso=${cursoId}`) // Asegúrate de que tu API soporte este parámetro
      .then(response => response.json())
      .then(lecciones => {
        const contenedorLecciones = document.querySelector('.cards-lecciones');
        // Limpiar el contenedor antes de agregar nuevas lecciones
        contenedorLecciones.innerHTML = '';

        // Verificar si hay lecciones disponibles
        if (lecciones.length === 0) {
            contenedorLecciones.innerHTML = '<h2>No hay lecciones disponibles para este curso.</h2>';
            contenedorLecciones.style.display = 'flex';
            contenedorLecciones.style.justifyContent = 'center';
            contenedorLecciones.style.alignItems = 'center';
           // Asegurarse de que el mensaje sea visible
            return; // Salir de la función si no hay lecciones
        }

        let htmlLecciones = '';
        lecciones.forEach(leccion => {
          htmlLecciones += `
            <div class="col">
            <div class="card" data-id="${leccion.id}" data-titulo="${leccion.titulo}" data-video-url="${leccion.url_video}" data-descripcion="${leccion.descripcion}">
              <img src="${leccion.url_img}" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">${leccion.titulo}</h5>
                 <p class="card-text">${leccion.completado ? 'Completado' : 'Sin completar'}</p>
              </div>
            </div>
          </div>
          `;
        });
        contenedorLecciones.innerHTML = htmlLecciones;

        // Agregar manejadores de eventos de clic a cada tarjeta
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', function() {
            // Recuperar los valores de los data-attributes
            const leccionId = this.getAttribute('data-id');
            const titulo = this.getAttribute('data-titulo');
            const videoUrl = this.getAttribute('data-video-url');
            const descripcion = this.getAttribute('data-descripcion');
            mostrarModalLeccion(leccionId, titulo, videoUrl, descripcion);
        });
      });
        contenedorLecciones.style.display = 'block'; // Mostrar lecciones
      })
      .catch(error => console.error('Error al obtener lecciones:', error));
}

function mostrarModalLeccion(leccionId, titulo, videoUrl, descripcion) {
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

function crearCurso(event) {
  event.preventDefault();
  const submitButton = document.getElementById('btn-save');
  submitButton.disabled = true;
  submitButton.textContent = 'Guardando...';

  // Recoger los datos del formulario, incluyendo las categorías seleccionadas
  const datosCurso = {
    nombre: document.querySelector('#nombreCurso').value,
    nivel: document.querySelector('#nivelCurso').value,
    urlImg: document.querySelector('#urlImgCurso').value,
    usuario: document.querySelector('#usuarioCurso').value,
    // Usar Array.from para convertir la NodeList a un array y luego map para obtener los valores seleccionados
    categorias: Array.from(document.querySelector('#categoriasCurso').selectedOptions).map(option => option.value)
  };

  fetch(`/educaWeb/apis/cursos/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken
    },
    body: JSON.stringify(datosCurso)
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => { throw err });
    }
    return response.json();
  })
  .then(result => {
    console.log(result);
    submitButton.disabled = false;
    submitButton.textContent = 'Guardar';
    Swal.fire({
      title: "Curso Creado",
      icon: "success"
    });
    // Limpiar el formulario
    document.querySelector('#nombreCurso').value = '';
    document.querySelector('#nivelCurso').value = '';
    document.querySelector('#urlImgCurso').value = '';
    document.querySelector('#usuarioCurso').value = '';
    document.querySelector('#categoriasCurso').selectedIndex = 0;
    // Aquí puedes añadir código para actualizar la UI, como mostrar el nuevo curso en la lista

  })
  .catch(e => {
    console.error('Error:', e);
    Swal.fire({
      title: "Error al crear el curso",
      text: e.error,
      icon: "error"
    });
    submitButton.disabled = false;
    submitButton.textContent = 'Guardar';
  });
}
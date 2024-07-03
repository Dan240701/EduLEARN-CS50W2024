document.addEventListener('DOMContentLoaded', function() {
      // Ocultar elementos que no se deben mostrar al inicio
      document.querySelector('.container-lectures').style.display = 'none';
      document.querySelector('.form-cursos').style.display = 'none';
      document.querySelector('.container-courses').style.display = 'block';

       // Agregar manejador de eventos al botón de crear curso
       document.getElementById('crearCurso').addEventListener('click', function() {
        document.querySelector('.container-courses').style.display = 'none'; 
        document.querySelector('.form-cursos').style.display = 'block'; 
    });
    
      // Aquí puedes añadir el resto de tu lógica de inicialización
      document.getElementById('btn-save').addEventListener('click', function(event) {
        event.preventDefault();
        const cursoId = document.querySelector('#cursoId').value; // Asumiendo que existe un input con id="cursoId"
        crearCurso(event, cursoId);
      });

      ObtenerCursos();
  
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
        if (curso.estado) { // Solo procesar cursos con estado true (activo)
          htmlCursos += `
            <div class="card" tabindex="0">
              <div class="card-status-active">Activo</div>
              <div class="card-title">${curso.nombre}</div>
              <div class="card-level">${curso.nivel}</div>
              <a href="#" class="card-button" data-curso-id="${curso.id}">Entrar</a>
              <div class="card-date">${curso.fecha_inicio}</div>
                <div class="card-actions"> 
                     <a href="#" class="card-edit-button" data-curso-id="${curso.id}">Editar</a>
                     <a href="#" class="card-delete-button" data-curso-id="${curso.id}">Borrar</a>
                </div>
            </div>
          `;
        }
      });
      contenedorCursos.innerHTML = htmlCursos;;


        // Agregar evento click a los botones de borrar curso
        document.querySelectorAll('.card-delete-button').forEach(button => {
          button.addEventListener('click', function(event) {
            event.preventDefault();
            const cursoId = this.getAttribute('data-curso-id');
        
            Swal.fire({
              title: '¿Estás seguro?',
              text: "No podrás revertir esta acción!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Sí, desactivar!'
            }).then((result) => {
              if (result.isConfirmed) {
                fetch(`/educaWeb/apis/cursos/${cursoId}/actualizar_estado/`, { 
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                  },
                  body: JSON.stringify({
                    estado: false 
                  })
                })
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Error al desactivar el curso');
                  }
                    Swal.fire({
                      title: 'Curso desactivado',
                      icon: "success"
                  });
                })
                .catch(error => {
                  console.error('Error:', error);
                  Swal.fire({
                    title: "Error",
                    text: "No se pudo desactivar el curso.",
                    icon: "error"
                  });
                });
              }
            });
          });
        });

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

        // Agregar evento click a los botones de editar curso
        document.querySelectorAll('.card-edit-button').forEach(button => {
          button.addEventListener('click', function(event) {
              event.preventDefault();
              const cursoId = this.getAttribute('data-curso-id');
              FillDetailsCurso(cursoId); 
          });
      });
        

  }).catch(error => console.error('Error:', error));
}

function crearCurso(event, cursoId = null) {
  event.preventDefault();
  const submitButton = document.getElementById('btn-save');
  submitButton.disabled = true;
  
  console.log(cursoId)

  const datosCurso = {
    nombre: document.querySelector('#nombreCurso').value,
    nivel: document.querySelector('#nivelCurso').value,
    urlImg: document.querySelector('#urlImgCurso').value,
    usuario: document.querySelector('#usuarioCurso').value,
    categorias: Array.from(document.querySelector('#categoriasCurso').selectedOptions).map(option => option.value)
  };

  const url = cursoId ? `/educaWeb/apis/cursos/${cursoId}/` : `/educaWeb/apis/cursos/`;
  const method = cursoId ? 'PUT' : 'POST';
  const successMessage = cursoId ? "Curso Actualizado" : "Curso Creado";
  const errorMessage = cursoId ? "Error al actualizar el curso" : "Error al crear el curso";

  fetch(url, {
    method: method,
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
      title: successMessage,
      icon: "success"
    });
    // Limpiar el formulario
    document.querySelector('#nombreCurso').value = '';
    document.querySelector('#nivelCurso').value = '';
    document.querySelector('#urlImgCurso').value = '';
    document.querySelector('#usuarioCurso').value = '';
    document.querySelector('#categoriasCurso').selectedIndex = 0;
    // Actualizar la UI según sea necesario
  })
  .catch(e => {
    console.error('Error:', e);
    Swal.fire({
      title: errorMessage,
      text: e.error,
      icon: "error"
    });
    submitButton.disabled = false;
    submitButton.textContent = 'Guardar';
  });
}
function FillDetailsCurso(cursoId) {
  console.log('cursoId recibido:', cursoId);
  fetch(`/educaWeb/apis/cursos/${cursoId}`) 
    .then(response => {
      if (!response.ok) {
        throw new Error('La respuesta de la red no fue ok');
      }
      return response.json();
    })
    .then(curso => {
      document.querySelector('#nombreCurso').value = curso.nombre;
      document.querySelector('#nivelCurso').value = curso.nivel;
      document.querySelector('#urlImgCurso').value = curso.url_img;
      document.querySelector('#usuarioCurso').value = curso.usuario;
      
      // Limpiar selecciones previas
      const categoriasCurso = document.querySelector('#categoriasCurso');
      Array.from(categoriasCurso.options).forEach(option => option.selected = false);
      
      // Seleccionar las categorías del curso
      curso.categorias.forEach(categoria => {
        const option = categoriasCurso.querySelector(`option[value="${categoria.id}"]`);
        if (option) option.selected = true;
      });
      // Dentro de editarCurso, después de cargar los datos
        document.querySelector('#cursoId').value = cursoId;
        
      
      // Mostrar el formulario y ocultar otros elementos
      document.querySelector('.form-cursos').style.display = 'block';
      document.querySelector('.container-courses').style.display = 'none';
    })
    .catch(error => {
      console.error('Error:', error);
      // Mensaje de error
      Swal.fire({
        title: 'Error',
        text: 'No se pudo cargar la información del curso.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
    });
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


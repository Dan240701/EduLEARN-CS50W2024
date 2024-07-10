import { getCookie,toggleDisplay, mostrarModalLeccion, SvgIcon, HviewStudent, HviewTeacher, fixDisplay, obtenerTipoDeUsuario, obtenerIdUsuario, esDueñoDelCurso} from './functions.js';

document.addEventListener('DOMContentLoaded', function() {
      // Ocultar elementos que no se deben mostrar al inicio
      document.querySelector('.container-lectures').style.display = 'none';
      document.querySelector('.form-cursos').style.display = 'none';
      document.querySelector('.form-lecciones').style.display = 'none';
      document.querySelector('.container-courses').style.display = 'block';

      // Delegación de eventos para botones de mostrar cursos y lecciones
      console.log(obtenerIdUsuario())
      // Delegación de eventos para botones de crear curso, editar y mostrar lecciones
      document.body.addEventListener('click', function(event) {
        const target = event.target;
        if (target.matches('#crearCurso')) {
            toggleDisplay('.container-courses', 'none');
            toggleDisplay('.container-maestros', 'none')
            toggleDisplay('.form-cursos', 'block');
        } else if (target.matches('#misCursosMaestro')) {
            const creadorId = target.getAttribute('data-creador-id');
            console.log('Creador ID:', creadorId);
            toggleDisplay('.container-courses', 'none');
            toggleDisplay('.container-lectures', 'none');
            toggleDisplay('.form-cursos', 'none');
            toggleDisplay('.container-maestros', 'block');
            ObtenerCursosPorCreador(creadorId);
        } else if (target.matches('#btn-crear-leccion')) {
            toggleDisplay('.container-lectures', 'none');
            toggleDisplay('.container-maestros', 'none');
            toggleDisplay('.form-lecciones', 'block');
          
        } else if (target.matches('.card-button')) {
            const cursoId = target.getAttribute('data-curso-id');
            //console.log('Curso ID:', cursoId);

            toggleDisplay('.container-courses', 'none');
            toggleDisplay('.container-maestros', 'none');
            toggleDisplay('.saved-courses', 'none');
            toggleDisplay('.form-lecciones', 'none');
            toggleDisplay('.form-cursos', 'none');
            toggleDisplay('.container-lectures', 'block');
            
            ObtenerLecciones(cursoId);
        } else if (target.matches('.card-edit-button')) {
            const cursoId = target.getAttribute('data-curso-id');
            FillDetailsCurso(cursoId);
        } else if (target.matches('.card-edit-button-leccion')) {
            const leccionId = target.getAttribute('data-leccion-id');
            FillDetailsLeccion(leccionId);
        } else if (target.matches('.card-inscripcion')) {
            const cursoId = target.getAttribute('data-curso-id');
            InscribirEstudianteACurso(cursoId);
        } else if (target.matches('#misCursosEstudiante')){
             toggleDisplay('.container-courses', 'none');
             toggleDisplay('.container-lectures', 'none');
            toggleDisplay('.saved-courses', 'block');
            ObtenerCursosInscritos();
        
        }
    });
  

      // Agregar evento click al botón de guardar curso
      document.getElementById('btn-save').addEventListener('click', function(event) {
        event.preventDefault();
        const cursoId = document.querySelector('#cursoId').value; 
        crearCurso(event, cursoId);
      });

      // Agregar evento click al botón de crear lección
      document.getElementById('btn-save-leccion').addEventListener('click', function(event) {
        event.preventDefault();
        const leccionId = document.querySelector('#leccionId').value;
        CrearLeccion(event,leccionId);
        toggleDisplay('.form-lecciones', 'none');
      });

    // Acceder al elemento que contiene el atributo data-tipo-usuario
     const mainContent = document.querySelector('.container-fluid.main-content');
      if (mainContent) {
        const userType = mainContent.getAttribute('data-tipo-usuario');
        console.log(userType);  
       } else {
        console.log('El elemento .container-fluid.main-content no se encontró.');
       }

       ObtenerCursos();

});

// Obtener el token de seguridad CSRF
const csrftoken = getCookie('csrftoken');

// Funciones para obtener cursos y lecciones de la aplicacion web
function ObtenerCursos() {
    document.getElementById('titulo-curso').textContent = 'Cursos';

    fetch(`/educaWeb/apis/cursos/`) 
    .then(response => response.json())
    .then(cursos => {
      const contenedorCursos = document.querySelector('.cards');
      let htmlCursos = '';
      cursos.forEach(curso => {
        if (curso.estado) { 
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
      contenedorCursos.innerHTML = htmlCursos;

        //Agregar roles segun vistas
          HviewTeacher();
          HviewStudent();
          fixDisplay();
    
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
                  ObtenerCursos();
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

  }).catch(error => console.error('Error:', error));
}
// Función para obtener cursos creados por un usuario determinado
function ObtenerCursosPorCreador(creadorId) {
  document.getElementById('titulo-curso').textContent = 'Cursos creados por mí';

  fetch(`/educaWeb/apis/cursos/creador/${creadorId}`) // Ajusta la URL para filtrar por creador
  .then(response => response.json())
  .then(cursos => {
    const contenedorCursos = document.querySelector('.cards-x');
    let htmlCursos = '';
    cursos.forEach(curso => {
      if (curso.estado) { 
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
    contenedorCursos.innerHTML = htmlCursos;

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
                ObtenerCursosPorCreador(creadorId); 
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

}).catch(error => console.error('El usuario no tiene cursos:', error));
}
// Función para obtener cursos inscritos por un usuario determinado
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
// Función para obtener cursos inscritos por un usuario determinado
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
      
    
      const categoriasCurso = document.querySelector('#categoriasCurso');
      Array.from(categoriasCurso.options).forEach(option => option.selected = false);
      
     
      curso.categorias.forEach(categoria => {
        const option = categoriasCurso.querySelector(`option[value="${categoria.id}"]`);
        if (option) option.selected = true;
      });
    
        document.querySelector('#cursoId').value = cursoId;
        
      
  
     
      document.querySelector('.form-cursos').style.display = 'block';
      document.querySelector('.container-maestros').style.display = 'none';
     
    })
    .catch(error => {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo cargar la información del curso.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
    });
}
// Función para obtener lecciones de un curso determinado
function ObtenerLecciones(cursoId) {
  document.getElementById('titulo-curso').textContent = 'Lecciones';
  const userType = obtenerTipoDeUsuario();
  const userId = obtenerIdUsuario();
  
  async function verificarYMostrarBoton(userId, cursoId) {
    if (userType === 'teacher') {
      const esDueño = await esDueñoDelCurso(cursoId, userId);
      console.log(esDueño)
      if (esDueño) {
        const botonHTML = SvgIcon('plus');
        const tituloCursoElement = document.getElementById('titulo-curso');
        if (tituloCursoElement) {
          tituloCursoElement.insertAdjacentHTML('beforeend', botonHTML);
        } else {
          console.error('Elemento #titulo-curso no encontrado.');
        }
      }
    }
  }
  verificarYMostrarBoton(userId, cursoId);
  
  fetch(`/educaWeb/apis/lecciones/por_curso/?curso=${cursoId}`) 
    .then(response => response.json())
    .then(lecciones => {
      const contenedorLecciones = document.querySelector('.cards-lecciones');
      contenedorLecciones.innerHTML = '';

      if (lecciones.length === 0) {
          contenedorLecciones.innerHTML = '<h2>No hay lecciones disponibles para este curso.</h2>';
          contenedorLecciones.style.display = 'flex';
          return; 
      }

      let htmlLecciones = '<div class="col-card">';
      lecciones.forEach(leccion => {
        if (leccion.estado) {
        htmlLecciones += `
        
          <div class="col">
            <div class="card" id="${leccion.id}" data-id="${leccion.id}" data-titulo="${leccion.titulo}" data-curso-id="${leccion.curso}" data-video-url="${leccion.url_video}" data-descripcion="${leccion.descripcion}">
              <img src="${leccion.url_img}" class="card-img-top" width="198px" height="200px">
              <div class="card-body"> 
                <h5 class="card-title">${leccion.titulo}</h5>
                <p class="card-text">${leccion.completado ? 'Completado' : 'Sin completar'}</p>
              </div>
                  <a href="#" class="card-leccion" data-leccion-id="${leccion.id}">Abrir leccion</a>
                  <div class="card-actions"> 
                    <a href="#" class="card-edit-button-leccion" data-leccion-id="${leccion.id}">Editar</a>
                    <a href="#" class="card-delete-button-leccion" data-leccion-id="${leccion.id}">Borrar</a>
                </div>
            </div>
          </div>
          `;
      }
      });
      htmlLecciones += '</div>';
      contenedorLecciones.innerHTML = htmlLecciones;

      //Agregar roles
      HviewStudent();
      fixDisplay();
 

   //recuperar curso
   if (lecciones.length > 0) {
    const cursoId = lecciones[0].curso;
    document.querySelector('#cursoLeccion').value = cursoId;
    console.log(cursoId);
  } else { console.log("No hay lecciones o no se pudo obtener el ID del curso."); }


      // Evento para abrir el modal con los detalles de la lección
      document.querySelectorAll('.card-leccion').forEach(card => {
        card.addEventListener('click', function(event) {
            event.preventDefault();
    
            const leccionId = this.getAttribute('data-leccion-id');
            const cardParent = document.getElementById(leccionId);
    
            const titulo = cardParent.getAttribute('data-titulo');
            const videoUrl = cardParent.getAttribute('data-video-url');
            const descripcion = cardParent.getAttribute('data-descripcion');
    
            console.log('Mostrar leccion:', leccionId, titulo, videoUrl, descripcion);
            mostrarModalLeccion(leccionId, titulo, videoUrl, descripcion);
        });
    });

      // Evento para desactivar una lección
      document.querySelectorAll('.card-delete-button-leccion').forEach(button => {
          button.addEventListener('click', function(event) {
              event.preventDefault();
              const leccionId = this.getAttribute('data-leccion-id');
              
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
                      fetch(`/educaWeb/apis/lecciones/${leccionId}/actualizar_estado/`, { 
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
                              throw new Error('Error al desactivar la lección');
                          }
                          Swal.fire({
                              title: 'Lección desactivada',
                              icon: "success"
                          });
                          ObtenerLecciones(cursoId); // Reutiliza cursoId aquí para actualizar la lista de lecciones
                      })
                      .catch(error => {
                          console.error('Error:', error);
                          Swal.fire({
                              title: "Error",
                              text: "No se pudo desactivar la lección.",
                              icon: "error"
                          });
                      });
                  }
              });
          });
      });
      
      contenedorLecciones.style.display = 'block';
    })
    .catch(error => console.error('Error al obtener lecciones:', error));
}
// Función para obtener lecciones de un curso determinado
function CrearLeccion(event, leccionId = null) {
  event.preventDefault();
  const submitButton = document.getElementById('btn-save-leccion');
  submitButton.disabled = true;
  
  console.log(leccionId)

  const datosLeccion = {
    titulo: document.querySelector('#nombreLeccion').value,
    url_img: document.querySelector('#urlImgLeccion').value,
    url_video: document.querySelector('#urlVideoLeccion').value,
    descripcion: document.querySelector('#descripcionLeccion').value,
    curso: document.querySelector('#cursoLeccion').value
  };

  const url = leccionId ? `/educaWeb/apis/lecciones/${leccionId}/` : `/educaWeb/apis/lecciones/`;
  const method = leccionId ? 'PUT' : 'POST';
  const successMessage = leccionId ? "Lección Actualizada" : "Lección Creada";
  const errorMessage = leccionId ? "Error al actualizar la lección" : "Error al crear la lección";

  fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken
    },
    body: JSON.stringify(datosLeccion)
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
    document.querySelector('#nombreLeccion').value = '';
    document.querySelector('#urlImgLeccion').value = '';
    document.querySelector('#urlVideoLeccion').value = '';
    document.querySelector('#descripcionLeccion').value = '';
    // Actualizar la UI según sea necesario
    // Mostrar el formulario de lecciones y ocultar el formulario de registro
    document.querySelector('.form-lecciones').style.display = 'block';
    document.querySelector('.container-lectures').style.display = 'none';
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
// Función para obtener lecciones de un curso determinado
function FillDetailsLeccion(leccionId) {
  if (!leccionId) {
    console.error('Invalid leccionId:', leccionId);
    return;
  }

  fetch(`/educaWeb/apis/lecciones/${leccionId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('La respuesta de la red no fue ok');
      }
      return response.json();
    })
    .then(leccion => {
      document.querySelector('#nombreLeccion').value = leccion.titulo;
      document.querySelector('#urlImgLeccion').value = leccion.url_img;
      document.querySelector('#urlVideoLeccion').value = leccion.url_video;
      document.querySelector('#descripcionLeccion').value = leccion.descripcion;
      document.querySelector('#leccionId').value = leccionId;


      document.querySelector('.form-lecciones').style.display = 'block';
      document.querySelector('.container-lectures').style.display = 'none';
    })
    .catch(error => {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo cargar la información de la lección.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
    });
}
// Función para inscribir un estudiante en un curso
function InscribirEstudianteACurso(cursoId) {
  const estudianteId = obtenerIdUsuario(); 
  const inscripcion = {
    curso: cursoId,
    usuario: estudianteId
  };

  Swal.fire({
    title: '¿Deseas guardar este guardar este curso en tu lista de cursos?',
    icon: 'success',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, agregar!'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`/educaWeb/apis/inscripciones/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        },
        body: JSON.stringify(inscripcion)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo inscribir al estudiante en el curso');
        }
        return response.json();
      })
      .then(data => {
        console.log('Inscripción exitosa:', data);
        // Aquí puedes agregar cualquier lógica adicional tras una inscripción exitosa, como mostrar un mensaje al usuario
        Swal.fire({
          title: 'Curso guardado a su lista',
          icon: "success"
        });
      })
      .catch(error =>  console.error('Error al inscribir al estudiante:', error));
    }
  });
}

// Función para obtener cursos inscritos por un usuario determinado
function ObtenerCursosInscritos() {
  document.getElementById('titulo-curso').textContent = 'Mis cursos';
  const estudianteId = obtenerIdUsuario();
  
  fetch(`/educaWeb/apis/inscripciones/student_cursos/${estudianteId}/`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      return response.json();
    })
    .then(inscripciones => {
      const contenedorCursos = document.querySelector('.cards-y');
      let htmlCursos = '';
      inscripciones.forEach(inscripcion => {
          htmlCursos += `
            <div class="card" tabindex="0">
              <div class="card-status-active">Activo</div>
              <div class="card-title">${inscripcion.nombre}</div>
              <div class="card-level">${inscripcion.nivel}</div>
              <a href="#" class="card-button" data-curso-id="${inscripcion.id}">Entrar</a>
              <a href="#" class="card-remove" data-curso-inscripcion="${inscripcion.id}">Eliminar de mis cursos</a>
              <div class="card-date">${inscripcion.fecha_inicio}</div>
            </div>
          `;
        
      }); 
      contenedorCursos.innerHTML = htmlCursos;
      console.log('Cursos actualizados');
    })
    .catch(error => console.error('Error al obtener cursos inscritos:', error));
}

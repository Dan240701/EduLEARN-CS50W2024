# EDUNET / EDULEARN PROJECT BY DANELLSON MIRANDA :zap:

## Contexto
El siguiente proyecto, denominado 'EDUNET-EDULEARN ', tiene como objetivo principal servir como una plataforma de educacion abierta. Esta plataforma está diseñada para proporcionar un espacio donde tanto educadores como estudiantes puedan consumir y compartir información de manera mutua y colaborativa. De esta manera, se crea un entorno educativo en línea que es beneficioso para ambos sectores, fomentando el intercambio de conocimientos y recursos educativos.

EduLEARN esta concebido como una herramienta integral para facilitar el aprendizaje y la enseñanza en diversos campos del conocimiento. Los cursos disponibles en la plataforma abarcan una amplia gama de topicos, organizados en diferentes categorías que permiten una facil navegacion y acceso a los contenidos. Esta diversidad de cursos asegura que los usuarios puedan encontrar recursos educativos que se adapten a sus intereses y necesidades específicas.

Uno de los principales enfoques de 'EduLEARN' es priorizar la accesibilidad y la eficiencia en el manejo del contenido de la aplicación mediante la implementacion de un enfoque de SPA O single page aplicacion. La plataforma está diseñada para ser intuitiva y fácil de usar, garantizando que los usuarios puedan acceder a la información de manera rápida y sin complicaciones. Además, se pone un fuerte énfasis en la optimización de la carga de datos, lo que asegura una experiencia fluida y sin interrupciones, independientemente del dispositivo o la velocidad de conexión a Internet.

## ESTRUCTURA DEL PROYECTO
El proyecto consta de una aplicación llamada INSTALEARN, la cual se compone de las siguientes carpetas y archivos:

### Carpeta raíz del proyecto
- **manage.py**: Script para la administración del proyecto Django.
- **requirements.txt**: Archivo que lista las dependencias del proyecto.
- **README.md**: Documentación general del proyecto.

### Static
En esta carpeta se almacenan todos los archivos estáticos. Estos archivos incluyen:

- **Archivos JavaScript**: Scripts que añaden funcionalidad y dinamismo a la aplicación.
- **Estilos CSS**: Hojas de estilo que definen la apariencia y el diseño de la aplicación.
- **Imágenes locales**: Imágenes utilizadas en el proyecto para mejorar la interfaz de usuario y la experiencia visual.

Estos archivos son esenciales para el correcto funcionamiento y la presentación de la aplicación.

### Templates
Esta carpeta está destinada a almacenar archivos de marcado de hipertexto (HTML). Dentro de esta carpeta se encuentran:

- **Plantillas HTML**: Archivos que definen la estructura visual de la aplicación.
- **Componentes visuales**: Elementos que se expandirán a través de todas las vistas de la aplicación, asegurando una apariencia coherente y profesional.

Las plantillas HTML en esta carpeta son fundamentales para la presentación de la interfaz de usuario y la organización del contenido.

### Archivos.py
Estos son los archivos escritos y definidos en lenguaje Python. Incluyen:

- **Configuraciones**: Archivos que contienen la configuración de la aplicación.
- **Funcionalidades**: Scripts que definen las características y comportamientos específicos de la aplicación.
- **Métodos específicos**: Funciones y métodos que permiten el correcto funcionamiento de la aplicación, gestionando las diferentes operaciones y procesos.

Estos archivos Python son el núcleo de la lógica de la aplicación, manejando todo, desde la configuración hasta las operaciones avanzadas.

## Tecnologías utilizadas

### Django
Django es un framework web basado en Python que facilita la creación y configuración de aplicaciones web robustas y escalables. En este proyecto, Django se utilizó para gestionar el backend, definir los modelos de datos, y proporcionar las vistas y controladores necesarios para manejar las interacciones del usuario. Django simplifica el desarrollo al ofrecer una estructura organizada y herramientas integradas para manejar la autenticación, la administración, y otras funcionalidades esenciales.

### Django REST Framework
Django REST Framework (DRF) es una potente herramienta que se utilizó para crear APIs RESTful en este proyecto. DRF permite serializar los modelos de Django para convertirlos en formatos JSON o XML, haciendo posible la comunicación entre el frontend y el backend. Además, DRF proporciona herramientas para manejar la autenticación, permisos, y control de versiones, facilitando el desarrollo de servicios web robustos y seguros.

### JavaScript
JavaScript se utilizó para manejar las vistas de la aplicación en el frontend. Esta tecnología permitió realizar solicitudes a los distintos endpoints de la API, manejar la interacción del usuario en tiempo real, y actualizar dinámicamente el contenido de la página. Con JavaScript, se implementaron funcionalidades específicas como validaciones de formularios, animaciones, y gestión de eventos, mejorando así la experiencia del usuario.

### CSS
Las Hojas de Estilo en Cascada (CSS) se emplearon para definir el diseño y la presentación de los componentes de la aplicación. CSS permitió crear una interfaz de usuario atractiva y coherente, controlando el layout, los colores, las tipografías, y otros aspectos visuales. Además, se utilizaron técnicas avanzadas de CSS, como Flexbox y Grid, para crear diseños responsivos que se adaptan a diferentes tamaños de pantalla.

### HTML
HTML se utilizó para estructurar la aplicación en diferentes módulos y fases. Cada página y componente de la aplicación está definido en HTML, proporcionando la base sobre la cual se aplican los estilos CSS y se añaden las interacciones JavaScript. HTML es esencial para organizar el contenido de la aplicación y garantizar que sea accesible y fácil de navegar.

### PostgreDB
PostgreSQL es un sistema de gestión de bases de datos relacional de código abierto que se utilizó en este proyecto para almacenar los datos de la aplicación. PostgreSQL permite alojar los modelos de Django convertidos en tablas relacionales, proporcionando una base de datos robusta y escalable. Con PostgreSQL, se manejan eficientemente las relaciones entre tablas, consultas complejas, y transacciones, asegurando la integridad y consistencia de los datos.

## Documentacion del Módulo `models.py`

Este módulo define los modelos de datos para la aplicación Django que se encarga de gestionar usuarios, cursos, lecciones, inscripciones, progreso y preferencias. A continuación se describen cada uno de los modelos y sus campos.

## Modelos

### Usuario
El modelo `Usuario` extiende el modelo `AbstractUser` de Django para incluir un campo adicional que especifica el tipo de usuario.

- **USER_TYPE_CHOICES**: Una lista de opciones que define los tipos de usuarios disponibles (profesor y estudiante).
- **tipo_usuario**: Un campo de caracteres con una longitud máxima de 7 que almacena el tipo de usuario.
- **\_\_str\_\_**: Devuelve una representación en cadena del usuario, incluyendo su nombre de usuario y tipo de usuario.

Codigo - python
class Usuario(AbstractUser):
    USER_TYPE_CHOICES = [
        ('teacher', 'Teacher'),
        ('student', 'Student'),
    ]
    tipo_usuario = models.CharField(max_length=7, choices=USER_TYPE_CHOICES)

    def __str__(self):
        return self.username + ' - ' + self.tipo_usuario 

### categoria
El modelo Categoria representa las categorías en las que pueden estar clasificados los cursos.

nombre: Un campo de caracteres con una longitud máxima de 255 que almacena el nombre de la categoría.
__str__: Devuelve una representación en cadena del nombre de la categoría.
python

### Curso
El modelo Curso representa los cursos disponibles en la plataforma.

nombre: Un campo de caracteres con una longitud máxima de 255 que almacena el nombre del curso.

fecha_inicio: Un campo de fecha que almacena la fecha de inicio del curso (se establece automáticamente a la fecha actual al crear el curso).

nivel: Un campo de caracteres con una longitud máxima de 255 que almacena el nivel del curso (opcional).

estado: Un campo booleano que indica si el curso está activo o no (predeterminado: True).

url_img: Un campo de caracteres con una longitud máxima de 255 que almacena la URL de la imagen del curso (opcional).

usuario: Una clave foránea al modelo Usuario que indica el creador del curso.

categorias: Un campo de relación muchos a muchos con el modelo Categoria que indica las categorías a las que pertenece el curso.

__str__: Devuelve una representación en cadena del nombre del curso.
python

### Leccion
El modelo Leccion representa las lecciones individuales dentro de un curso.

curso: Una clave foránea al modelo Curso que indica el curso al que pertenece la lección.

titulo: Un campo de caracteres con una longitud máxima de 64 que almacena el título de la lección (opcional).

descripcion: Un campo de texto que almacena la descripción de la lección (opcional).

completado: Un campo booleano que indica si la lección está completada o no (predeterminado: False).

estado: Un campo booleano que indica si la lección está activa o no (predeterminado: True).

url_img: Un campo de caracteres con una longitud máxima de 255 que almacena la URL de la imagen de la lección (opcional).

url_video: Un campo de caracteres con una longitud máxima de 255 que almacena la URL del video de la lección (opcional).

progreso: Un campo entero que almacena el progreso de la lección (predeterminado: 0).

__str__: Devuelve una representación en cadena del curso y una parte de la descripción de la lección.
python

### Inscripcion
El modelo Inscripcion representa las inscripciones de los usuarios a los cursos.

usuario: Una clave foránea al modelo Usuario que indica el usuario que se inscribió al curso.
curso: Una clave foránea al modelo Curso que indica el curso al que el usuario se inscribió.
fecha_inscripcion: Un campo de fecha que almacena la fecha de inscripción (se establece automáticamente a la fecha actual al crear la inscripción).
__str__: Devuelve una representación en cadena del usuario y el curso al que está inscrito.
python


### Progreso
El modelo Progreso representa el progreso de un usuario en una lección específica.

usuario: Una clave foránea al modelo Usuario que indica el usuario cuyo progreso se está registrando.
leccion: Una clave foránea al modelo Leccion que indica la lección en la que el usuario está progresando.
cantidad: Un campo entero que almacena la cantidad de progreso realizado.
__str__: Devuelve una representación en cadena del usuario, el curso y la cantidad de progreso.
python

### Preferencias
El modelo Preferencias representa las preferencias de un usuario por una categoría específica.

usuario: Una clave foránea al modelo Usuario que indica el usuario cuyas preferencias se están registrando.
categoria: Una clave foránea al modelo Categoria que indica la categoría preferida por el usuario.
__str__: Devuelve una representación en cadena del usuario y la categoría preferida.

## Contexto del Modulo `admin.py`
El modulo admin.py, es un modulo autogenerado por django, donde vamos a registrar cada uno de los modelos con el objetivo de manejarlos desde la herramienta del administracion que nos otorga django.


## Contexto del Modulo `Serializers`

El archivo `serializers.py` en Django REST Framework es crucial para la conversión de los modelos de Django en formatos que pueden ser consumidos por las APIs, como JSON o XML. A continuación, se presenta una descripción detallada de cada serializer definido en este módulo:

### UsuarioSerializer
El `UsuarioSerializer` se encarga de convertir el modelo `Usuario` en un formato adecuado para las APIs. Este serializer facilita la transferencia de datos del usuario, como el nombre, el tipo de usuario y otros atributos, entre el backend y el frontend. Es esencial para manejar la información del usuario en diversas operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

### CursoSerializer
El `CursoSerializer` convierte el modelo `Curso` en un formato compatible con las APIs. Este serializer incluye todos los detalles relevantes del curso, como el nombre, la fecha de inicio, el nivel y el estado del curso. Facilita la transferencia de datos sobre los cursos disponibles, permitiendo a los usuarios acceder a la información de los cursos de manera eficiente y actualizada.

### LeccionSerializer
El `LeccionSerializer` se utiliza para transformar el modelo `Leccion` en un formato consumible por las APIs. Este serializer maneja todos los detalles de una lección, incluyendo el título, la descripción, el estado de completado, y los recursos multimedia asociados. Esto permite una gestión eficiente de las lecciones dentro de cada curso, facilitando su visualización y seguimiento por parte de los usuarios.

### PreferenciasSerializer
El `PreferenciasSerializer` se encarga de serializar el modelo `Preferencias`. Este serializer convierte las preferencias de los usuarios en relación a las categorías de los cursos en un formato adecuado para las APIs. Esto permite personalizar la experiencia del usuario en la plataforma, mostrando contenido relevante basado en sus preferencias.

### ProgresoSerializer
El `ProgresoSerializer` maneja la conversión del modelo `Progreso` en un formato adecuado para las APIs. Este serializer se ocupa del seguimiento del progreso de un usuario en una lección específica. Al incluir datos como la cantidad de progreso realizada, este serializer es fundamental para monitorizar y gestionar el avance de los usuarios en los diferentes cursos y lecciones.

### CategoriaSerializer
El `CategoriaSerializer` transforma el modelo `Categoria` en un formato que las APIs pueden consumir. Este serializer facilita la transferencia de información sobre las categorías de los cursos, permitiendo a los usuarios y administradores gestionar y clasificar los cursos de manera efectiva dentro de la plataforma.

### InscripcionSerializer
El `InscripcionSerializer` convierte el modelo `Inscripcion` en un formato adecuado para las APIs. Este serializer maneja los detalles de las inscripciones de los usuarios a los cursos, incluyendo la fecha de inscripción. Facilita la gestión de las inscripciones, permitiendo a los usuarios ver y administrar los cursos en los que están inscritos.


## Contexto del Modulo `Apis.py`

Una REST API desarrollada con Django Rest Framework (DRF) proporciona un conjunto de puntos finales accesibles mediante HTTP que permiten la interacción programática con una aplicación web o servicio. Utilizando el paradigma REST (Representational State Transfer), estas APIs están diseñadas para ser simples, escalables y interoperables. DRF facilita la creación de APIs al integrar funcionalidades como serialización de datos, autenticación, permisos y vistas basadas en clases. Esto permite a los desarrolladores exponer recursos de manera estructurada y segura, gestionando operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre esos recursos de forma eficiente. Las REST APIs de DRF son fundamentales para construir aplicaciones modernas y servicios web que necesiten interoperabilidad y flexibilidad en el intercambio de datos.


El archivo `apis.py` en Django REST Framework está diseñado para estructurar los viewsets, que son componentes esenciales para definir cómo se manejan las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) a través de las APIs en la aplicación. A continuación, se presenta una descripción detallada de cada viewset definido en este módulo:

### UsuarioViewSet
El `UsuarioViewSet` se utiliza para gestionar todas las operaciones relacionadas con el modelo `Usuario`. Este viewset permite realizar operaciones como listar todos los usuarios, obtener detalles de un usuario específico, crear, actualizar y eliminar usuarios. Utiliza el `UsuarioSerializer` para convertir los datos del modelo en un formato adecuado para las APIs.

### CursoViewSet
El `CursoViewSet` gestiona todas las operaciones relacionadas con el modelo `Curso`. Además de las operaciones CRUD básicas, este viewset incluye acciones personalizadas:

- `actualizar_estado`: Permite actualizar el estado de un curso específico.
- `obtener_usuario`: Obtiene el ID del usuario que creó el curso.
- `cursos_usuario`: Lista todos los cursos creados por un usuario específico, permitiendo filtrar cursos por su creador.

Estas acciones personalizadas facilitan la administración de los cursos y mejoran la interacción del usuario con la plataforma.

### LeccionViewSet
El `LeccionViewSet` gestiona todas las operaciones relacionadas con el modelo `Leccion`. Además de las operaciones CRUD básicas, este viewset incluye acciones personalizadas:

- `actualizar_estado`: Permite actualizar el estado de una lección específica.
- `por_curso`: Lista todas las lecciones de un curso específico, permitiendo filtrar lecciones por el curso al que pertenecen.

Estas acciones personalizadas permiten una gestión detallada de las lecciones dentro de cada curso, mejorando la experiencia de aprendizaje de los usuarios.

### InscripcionViewSet
El `InscripcionViewSet` maneja todas las operaciones relacionadas con el modelo `Inscripcion`. Además de las operaciones CRUD básicas, este viewset incluye una acción personalizada:

- `cursos_por_usuario`: Lista todos los cursos en los que un usuario específico está inscrito, facilitando la visualización y gestión de las inscripciones del usuario.

Esta acción personalizada permite a los usuarios ver y gestionar fácilmente los cursos en los que están inscritos.

### PreferenciasViewSet
El `PreferenciasViewSet` gestiona todas las operaciones relacionadas con el modelo `Preferencias`. Este viewset permite realizar operaciones como listar todas las preferencias, obtener detalles de una preferencia específica, crear, actualizar y eliminar preferencias. Utiliza el `PreferenciasSerializer` para convertir los datos del modelo en un formato adecuado para las APIs.

### ProgresoViewSet
El `ProgresoViewSet` maneja todas las operaciones relacionadas con el modelo `Progreso`. Este viewset permite realizar operaciones como listar todos los progresos, obtener detalles de un progreso específico, crear, actualizar y eliminar progresos. Utiliza el `ProgresoSerializer` para convertir los datos del modelo en un formato adecuado para las APIs.

### CategoriaViewSet
El `CategoriaViewSet` gestiona todas las operaciones relacionadas con el modelo `Categoria`. Este viewset permite realizar operaciones como listar todas las categorías, obtener detalles de una categoría específica, crear, actualizar y eliminar categorías. Utiliza el `CategoriaSerializer` para convertir los datos del modelo en un formato adecuado para las APIs.

## Contexto del Modulo `Views.py`

El archivo `views.py` en un proyecto Django se encarga de manejar las peticiones HTTP y devolver las respuestas adecuadas, generalmente en forma de páginas HTML renderizadas. A continuación, se describen las principales vistas definidas en este módulo:

### Vista `index`
La vista `index` es la página principal de la aplicación. Cuando un usuario accede a la ruta principal del sitio, esta vista renderiza la plantilla `index.html`, que es la página de inicio de la plataforma educativa.

### Vistas de autenticación (`login_view`, `logout_view`, `register`)
Estas vistas gestionan el proceso de autenticación de los usuarios en la plataforma.

- **`login_view`**: Esta vista maneja el proceso de inicio de sesión. Cuando un usuario envía un formulario de inicio de sesión, la vista autentica las credenciales proporcionadas. Si son correctas, el usuario es redirigido a la página principal; de lo contrario, se muestra un mensaje de error en la misma página de inicio de sesión.

- **`logout_view`**: Esta vista maneja el cierre de sesión de los usuarios. Al cerrar sesión, el usuario es redirigido a la página principal.

- **`register`**: Esta vista gestiona el registro de nuevos usuarios. Cuando un usuario envía un formulario de registro, la vista verifica que las contraseñas coincidan y crea un nuevo usuario. Si el nombre de usuario ya está en uso, se muestra un mensaje de error. Tras un registro exitoso, el usuario es autenticado automáticamente y redirigido a la página principal.

### Vista `cursos`
La vista `cursos` se encarga de listar todos los cursos disponibles en la plataforma junto con sus respectivas categorías. Al acceder a la página de cursos, se obtienen todas las categorías y cursos de la base de datos, y se pasan a la plantilla `cursos.html` para su renderizado. Esta vista permite a los usuarios explorar y navegar a través de los distintos cursos disponibles.

## Context del Modulo `Context.py`

El archivo `context.py` en un proyecto Django se utiliza para definir los context processors personalizados que se emplearán en la aplicación. Los context processors permiten inyectar variables adicionales en el contexto de las plantillas de manera global, lo que facilita el acceso a estos datos en todas las plantillas sin necesidad de pasarlos explícitamente en cada vista. A continuación, se describen los context processors definidos en este archivo:

### `add_tipo_usuario_to_context`
Este context processor agrega el tipo de usuario autenticado al contexto de las plantillas.

- **Descripción**: La función `add_tipo_usuario_to_context` determina el tipo de usuario actual (`teacher` o `student`). Si el usuario no está autenticado, se asigna el valor `'guest'`.
- **Funcionamiento**: Verifica si el usuario está autenticado. Si es así, obtiene el tipo de usuario desde el objeto `request.user`. El tipo de usuario se añade al contexto bajo la clave `tipo_usuario`.

### `add_id_usuario_to_context`
Este context processor agrega el ID del usuario autenticado al contexto de las plantillas.

**Descripción**: La función add_id_usuario_to_context obtiene el ID del usuario actualmente autenticado. Si el usuario no está autenticado, el ID es None.
**Funcionamiento**: Verifica si el usuario está autenticado. Si es así, obtiene el ID del usuario desde el objeto request.user. El ID del usuario se añade al contexto bajo la clave Idusuario.

### Integración en settings.py
Para utilizar estos context processors en la aplicación, es necesario importarlos y agregarlos a la configuración de context processors en el archivo settings.py. Esto se hace dentro de la clave OPTIONS del diccionario de configuración de TEMPLATES. A continuación, se muestra un ejemplo de cómo configurar esto:

### settings.py del directorio raiz
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'educaWeb.context.add_tipo_usuario_to_context',
                'educaWeb.context.add_id_usuario_to_context',
            ],
        },
    },
]

## Configuración de URL

El archivo `urls.py` en un proyecto Django es fundamental para definir las rutas de acceso a las vistas de la aplicación. Este archivo se encarga de mapear las URLs a las vistas correspondientes, permitiendo así la navegación y el acceso a las distintas funcionalidades del sitio web. A continuación, se describe la estructura y configuración de las rutas en el archivo `urls.py` de este proyecto.

El archivo `urls.py` es crucial para la estructura de la aplicación Django, ya que define cómo se accede a las diferentes vistas y APIs del proyecto. La configuración del router permite una gestión eficiente de las APIs, mientras que la lista de patrones de URL (`urlpatterns`) asegura que cada ruta está claramente definida y mapeada a la vista correspondiente. Esta configuración permite una navegación fluida y un acceso organizado a las funcionalidades de la aplicación, asegurando que los usuarios y las APIs puedan interactuar con el sistema de manera coherente y estructurada.

### Importaciones
El archivo `urls.py` comienza importando los módulos necesarios. Se importan los módulos esenciales de Django para manejar las rutas y los enrutadores del Django REST framework. Además, se importan las vistas y las APIs definidas en el proyecto.


### Configuración del Router
El enrutador (`router`) se configura utilizando `DefaultRouter` de Django REST framework. Este enrutador permite registrar las vistas de conjunto de modelos (viewsets) para los diferentes modelos de la aplicación, como `Usuario`, `Curso`, `Leccion`, `Preferencias`, `Progreso`, `Categoria`, e `Inscripcion`. Registrar estos modelos facilita la creación de las APIs RESTful, ya que el enrutador genera automáticamente las rutas necesarias para las operaciones CRUD (crear, leer, actualizar y eliminar).

### Definición de URL Patterns
La lista `urlpatterns` define las rutas de la aplicación. Cada entrada en esta lista mapea una URL específica a una vista. La ruta raíz mapea a la vista `index`, que sirve como página principal de la aplicación. La ruta `'apis/'` incluye todas las rutas registradas en el router, proporcionando acceso a las APIs generadas para los modelos registrados. Además, se definen rutas específicas para las vistas de autenticación, como inicio de sesión (`login_view`), cierre de sesión (`logout_view`) y registro (`register`). También se incluye una ruta para la página de cursos (`cursos`), que muestra los cursos disponibles en la plataforma.

# Módulo `functions.js`

El archivo `functions.js` contiene varias funciones comunes que se utilizan a lo largo del proyecto para mejorar la funcionalidad y la experiencia del usuario. A continuación, se describen las funciones principales incluidas en este módulo.

Ademas, estas funciones permiten una mayor modularidad y reutilización del código en todo el proyecto, asegurando que las operaciones comunes se manejen de manera eficiente y consistente.



### Función `toggleDisplay`
Esta función permite mostrar u ocultar elementos en el DOM basándose en un selector y un estilo de visualización especificado. Selecciona todos los elementos que coinciden con el selector y ajusta su estilo de visualización según el valor proporcionado.

### Función `getCookie`
La función `getCookie` se utiliza para obtener el valor de una cookie específica por su nombre. Recorre todas las cookies disponibles en el documento, las separa y devuelve el valor de la cookie que coincide con el nombre dado.

### Función `mostrarModalLeccion`
Esta función muestra un modal personalizado utilizando SweetAlert2. El modal incluye información sobre una lección específica, como el título, la URL del video y la descripción. También ofrece botones personalizados para confirmar o cancelar la lección.

### Función `SvgIcon`
La función `SvgIcon` genera SVGs dinámicos para diferentes tipos de íconos. Por ejemplo, íconos de mayúsculas, agregar y guardar cursos. Permite crear botones y enlaces con íconos SVG embebidos y texto, lo que mejora la interfaz de usuario.

### Función `obtenerTipoDeUsuario`
Esta función obtiene el tipo de usuario (profesor o estudiante) del atributo de datos del elemento principal en el DOM. Permite realizar acciones específicas basadas en el tipo de usuario autenticado.

### Función `obtenerIdUsuario`
Similar a `obtenerTipoDeUsuario`, esta función devuelve el ID del usuario autenticado desde un atributo de datos del elemento principal en el DOM. Facilita la personalización de la experiencia del usuario y la interacción con la API.

### Función `HviewTeacher`
La función `HviewTeacher` oculta elementos específicos en la interfaz cuando el usuario es un profesor. Oculta acciones de tarjetas y elementos de inscripción para evitar que los profesores realicen ciertas acciones que son específicas para estudiantes.

### Función `HviewStudent`
La función `HviewStudent` oculta elementos específicos cuando el usuario es un estudiante. Similar a `HviewTeacher`, ajusta la interfaz para proporcionar una experiencia adecuada según el rol del usuario.

### Función `fixDisplay`
Esta función ajusta la altura de los contenedores de las tarjetas a "auto" para asegurar que se muestren correctamente y se adapten al contenido dinámico.

### Función `obtenerDueñoDelCurso`
Esta función es asíncrona y simula la obtención del ID del dueño de un curso específico. Realiza una solicitud fetch a un endpoint de la API y devuelve el ID del dueño del curso.

### Función `esDueñoDelCurso`
Utiliza `obtenerDueñoDelCurso` para comparar el ID del dueño del curso con el ID del usuario autenticado. Determina si el usuario actual es el dueño del curso, facilitando la lógica de control de acceso y personalización de la interfaz.

# Modulo `Main.js`
En el archivo principal del proyecto, `main.js`, se maneja la funcionalidad principal de la interfaz de usuario y la interacción con la API del servidor mediante el uso de varias funciones importadas desde `functions.js`. Aquí tienes un desglose detallado de las funciones y acciones realizadas:

1. **Inicialización y Ocultamiento de Elementos**: Al cargar el documento (`DOMContentLoaded`), se ocultan inicialmente ciertos elementos de la interfaz (`container-lectures`, `form-cursos`, `form-lecciones`) y se muestra `container-courses`.

2. **Delegación de Eventos**: Se utiliza delegación de eventos en el `body` del documento para manejar acciones como:
   - Crear curso (`#crearCurso`): Muestra el formulario para crear un nuevo curso.
   - Mostrar cursos del maestro (`#misCursosMaestro`): Muestra los cursos creados por el usuario maestro.
   - Crear lección (`#btn-crear-leccion`): Muestra el formulario para crear una nueva lección.
   - Abrir curso (`.card-button`): Muestra las lecciones de un curso específico.
   - Editar curso (`.card-edit-button`): Permite editar los detalles de un curso.
   - Editar lección (`.card-edit-button-leccion`): Permite editar los detalles de una lección.
   - Inscripción a curso (`.card-inscripcion`): Permite a un estudiante inscribirse en un curso.

3. **Gestión de Eventos de Formulario**: Se añaden eventos de click a los botones de guardar curso (`#btn-save`) y guardar lección (`#btn-save-leccion`) para crear o actualizar cursos y lecciones respectivamente. Se utilizan llamadas `fetch` para enviar y recibir datos del servidor, manejando la creación, actualización y recuperación de información.

4. **Acceso y Gestión de Roles**: Se obtiene el tipo de usuario (`teacher` o `student`) y se ejecutan funciones específicas según el rol del usuario. Esto incluye la visualización de botones y elementos específicos para cada tipo de usuario.

5. **Interacción con la API**: Se realizan solicitudes `fetch` a la API del servidor para obtener cursos (`ObtenerCursos()`), cursos creados por un usuario específico (`ObtenerCursosPorCreador(creadorId)`), lecciones de un curso (`ObtenerLecciones(cursoId)`), y cursos inscritos por un estudiante (`ObtenerCursosInscritos()`). También se gestionan acciones como la desactivación de cursos y lecciones.

6. **Manejo de Mensajes de Confirmación**: Se utiliza `Swal.fire` de SweetAlert2 para mostrar mensajes de confirmación al realizar acciones críticas como eliminar cursos o lecciones, asegurando que el usuario confirme su intención antes de proceder.

7. **Gestión de Estado y Visualización**: Se verifica el estado de los cursos y lecciones para mostrar solo aquellos activos y gestionar adecuadamente su visualización en la interfaz.



# Detalles de las funciones establecidas en el archivo Modulo `Main.js`

## Obtener el token de seguridad CSRF
Esta constante obtiene el token CSRF almacenado en las cookies del navegador utilizando la función `getCookie`.

---

## Obtener y mostrar todos los cursos disponibles
La función `ObtenerCursos()` realiza una solicitud fetch a la API del servidor para obtener todos los cursos disponibles. Luego, genera dinámicamente tarjetas HTML para cada curso activo, mostrando detalles como nombre, nivel, fecha de inicio, y botones para entrar, editar y borrar cursos.

---

## Obtener cursos creados por un usuario específico
`ObtenerCursosPorCreador(creadorId)` obtiene cursos filtrados por el ID de un creador específico. Realiza una solicitud fetch a la API del servidor ajustada para obtener cursos creados por ese usuario. Luego, muestra tarjetas HTML similares a `ObtenerCursos()`.

---

## Crear o actualizar un curso
La función `crearCurso(event, cursoId = null)` gestiona la creación o actualización de un curso a través de un formulario. Dependiendo de si se proporciona un `cursoId`, decide si enviará una solicitud POST para crear un nuevo curso o una solicitud PUT para actualizar un curso existente.

---

## Rellenar formulario con detalles de un curso para edición
`FillDetailsCurso(cursoId)` recupera detalles específicos de un curso mediante una solicitud fetch a la API del servidor. Luego, rellena un formulario HTML con estos detalles para permitir su edición.

---

## Obtener y mostrar todas las lecciones de un curso
La función `ObtenerLecciones(cursoId)` obtiene todas las lecciones asociadas a un curso específico mediante una solicitud fetch a la API del servidor. Luego, muestra estas lecciones en tarjetas HTML, incluyendo detalles como título, estado de completado y botones para abrir, editar y borrar lecciones.

---

## Crear o actualizar una lección
`CrearLeccion(event, leccionId = null)` maneja la creación o actualización de una lección a través de un formulario. Similar a `crearCurso()`, decide si enviará una solicitud POST para crear una nueva lección o una solicitud PUT para actualizar una lección existente.

---

## Rellenar formulario con detalles de una lección para edición
`FillDetailsLeccion(leccionId)` recupera detalles específicos de una lección mediante una solicitud fetch a la API del servidor. Luego, rellena un formulario HTML con estos detalles para permitir su edición.

---

## Inscribir a un estudiante en un curso
La función `InscribirEstudianteACurso(cursoId)` permite a un estudiante inscribirse en un curso específico. Muestra un mensaje de confirmación y, si el estudiante confirma, envía una solicitud POST a la API del servidor para registrar la inscripción.

---

## Obtener y mostrar todos los cursos inscritos por un estudiante
`ObtenerCursosInscritos()` obtiene todos los cursos en los que un estudiante está inscrito mediante una solicitud fetch a la API del servidor. Luego, muestra estos cursos en tarjetas HTML, proporcionando detalles como nombre, nivel, fecha de inicio y un botón para acceder al curso.


# Arhivos estaticos, estructura y estilos del proyecto.
El archivo `layout.html` es la plantilla base para una aplicación web educativa. En su cabecera (head), configura metadatos y estilos usando Bootstrap y CSS personalizado. La barra de navegación principal (main-nav) incluye un logo y enlaces que varían según el estado de autenticación del usuario, mostrando opciones como "Home", "Cursos" y "Logout". Cuando el usuario está autenticado, se muestra una barra adicional (users-nav) con enlaces específicos para estudiantes y maestros, como "Mis cursos" y "Crear curso". El contenido principal (main-content) adapta su estructura según el tipo de usuario, mientras que el footer proporciona información de atribución y derechos de autor. Se incluyen scripts JavaScript para funcionalidades interactivas como notificaciones con SweetAlert2, asegurando una experiencia de usuario completa y dinámica.

La plantilla `cursos.html` extiende la estructura base definida en `educaWeb/layout.html` para mantener consistencia visual y funcionalidad en toda la aplicación. Esta página única adapta dinámicamente su contenido según las acciones del usuario. Incluye secciones para mostrar y ocultar información relevante, como listados de cursos, cursos guardados, maestros y lecciones. Además, proporciona formularios interactivos para registrar nuevos cursos y lecciones, con campos específicos como URLs de imagen, nombres, niveles, descripciones y categorías. Los campos ocultos aseguran la correcta gestión de datos entre la interfaz de usuario y el servidor, ofreciendo una experiencia fluida y organizada.

La plantilla `index.html` extiende la estructura base definida en `educaWeb/layout.html` para crear una página de inicio atractiva y funcional. La sección principal, `hero`, destaca con una imagen impactante y contenido centrado que invita al usuario a explorar los cursos disponibles. El botón "Ver Cursos" facilita la navegación directa a la lista de cursos. Además, la página incluye secciones informativas como `purpose`, donde se explica el propósito de la plataforma en tres puntos clave, apoyados por iconos visuales. La sección `study-areas` amplía esta información con detalles sobre las áreas de estudio cubiertas y los beneficios de la plataforma, cada uno acompañado por un ícono ilustrativo. Este diseño visual y contenido informativo busca atraer y guiar a los usuarios hacia una experiencia educativa rica y accesible.

El archivo `styles.css` define los estilos visuales y de diseño para la aplicación EduLEARN. Utilizando reglas CSS, controla la apariencia cohesiva y funcionalidad estética de todos los elementos en la plataforma. Esto incluye la configuración de fuentes, colores, márgenes, rellenos y disposición de elementos para asegurar una experiencia de usuario consistente y agradable. Los estilos están organizados para mejorar la legibilidad del contenido, la navegación intuitiva y la interacción fluida del usuario. Además, se implementan media queries para garantizar la adaptabilidad de la aplicación en diferentes tamaños de pantalla, optimizando así la experiencia tanto en dispositivos móviles como de escritorio.



from .models import Usuario, Curso, Leccion, Preferencias, Progreso, Categoria
# myapp/context_processors.py
#archivo que se encarga de definir los context_processors que se van a utilizar en la aplicacion

def add_tipo_usuario_to_context(request):
    tipo_usuario = 'guest'  
    if request.user.is_authenticated:
        tipo_usuario = request.user.tipo_usuario  
    return {'tipo_usuario': tipo_usuario}

#Retornar Id del usuario autenticado
def add_id_usuario_to_context(request):
    id_usuario = None
    if request.user.is_authenticated:
        id_usuario = request.user.id
    return {'Idusuario': id_usuario}

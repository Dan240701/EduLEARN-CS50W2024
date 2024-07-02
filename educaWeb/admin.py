from django.contrib import admin
from .models import Categoria, Curso, Leccion, Preferencias, Progreso, Usuario
# Register your models here.
admin.site.register(Categoria)
admin.site.register(Curso)
admin.site.register(Leccion)
admin.site.register(Preferencias)
admin.site.register(Progreso)
admin.site.register(Usuario)


from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuario(AbstractUser):
    USER_TYPE_CHOICES = [
        ('teacher', 'Teacher'),
        ('student', 'Student'),
    ]
    tipo_usuario = models.CharField(max_length=7, choices=USER_TYPE_CHOICES)

    def __str__(self):
        return self.username + ' - ' + self.tipo_usuario

class Categoria(models.Model):
    nombre = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre

class Curso(models.Model):
    nombre = models.CharField(max_length=255)
    fecha_inicio = models.DateField(auto_now_add=True)
    nivel = models.CharField(max_length=255, null=True, blank=True)
    estado = models.BooleanField(default=True)
    url_img = models.CharField(max_length=255, null=True, blank=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='usuario_curso')
    categorias = models.ManyToManyField(Categoria, related_name='categorias_curso')

    def __str__(self):
        return self.nombre

class Leccion(models.Model):
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, related_name='curso_leccion')
    titulo = models.CharField(max_length=64, null=True, blank=True)
    descripcion = models.TextField(null=True, blank=True)
    completado = models.BooleanField(default=False)
    estado = models.BooleanField(default=True)
    url_img = models.CharField(max_length=255, null=True, blank=True)
    url_video = models.CharField(max_length=255, null=True, blank=True)
    progreso = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.curso.nombre} - {self.descripcion[:50]}"
    

class Inscripcion(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='inscripciones')
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, related_name='inscritos')
    fecha_inscripcion = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.usuario.username} inscrito en {self.curso.nombre}"

class Progreso(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='progreso_Usuario')
    leccion = models.ForeignKey(Leccion, on_delete=models.CASCADE, related_name='progreso_Leccion')
    cantidad = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.usuario.username} - {self.leccion.curso.nombre} - {self.cantidad}"

class Preferencias(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='preferencias_Usuario')
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name='preferencias_Categoria')

    def __str__(self):
        return f"{self.usuario.username} - {self.categoria.nombre}"

from rest_framework import serializers
from .models import Usuario, Curso, Leccion, Preferencias, Progreso, Categoria

# Serializar mis modelos para que puedan ser consumidos por la API
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = '__all__'
class LeccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leccion
        fields = '__all__'
class PreferenciasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preferencias
        fields = '__all__'
class ProgresoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Progreso
        fields = '__all__'
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'
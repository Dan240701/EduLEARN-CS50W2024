from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UsuarioSerializer, CursoSerializer, LeccionSerializer, PreferenciasSerializer, ProgresoSerializer, CategoriaSerializer
from .models import Usuario, Curso, Leccion, Preferencias, Progreso, Categoria


from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import CursoSerializer, LeccionSerializer

# Create your views here.
#Clases para la creación de los ViewSets
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
class CursoViewSet(viewsets.ModelViewSet):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
class LeccionViewSet(viewsets.ModelViewSet):
    queryset = Leccion.objects.all()
    serializer_class = LeccionSerializer

    @action(detail=False, methods=['get'])
    def por_curso(self, request):
        curso_id = request.query_params.get('curso')
        if curso_id:
            lecciones = Leccion.objects.filter(curso_id=curso_id)
            serializer = self.get_serializer(lecciones, many=True)
            return Response(serializer.data)
        else:
            return Response({'error': 'curso es requerido'}, status=400)

class PreferenciasViewSet(viewsets.ModelViewSet):
    queryset = Preferencias.objects.all()
    serializer_class = PreferenciasSerializer
class ProgresoViewSet(viewsets.ModelViewSet):
    queryset = Progreso.objects.all()
    serializer_class = ProgresoSerializer
class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

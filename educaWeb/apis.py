from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets, status
from .serializers import UsuarioSerializer, CursoSerializer, LeccionSerializer, InscripcionSerializer,PreferenciasSerializer, ProgresoSerializer, CategoriaSerializer
from .models import Usuario, Curso, Leccion, Preferencias, Progreso, Categoria, Inscripcion


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

    @action(detail=True, methods=['put'])
    def actualizar_estado(self, request, pk=None):
        curso = self.get_object()
        estado = request.data.get('estado')
        if estado is not None:
            curso.estado = estado
            curso.save()
            return Response({'status': 'estado actualizado'})
        else:
            return Response({'error': 'Estado no proporcionado'}, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=True, methods=['get'], url_path='dueno')
    def obtener_usuario(self, request, pk=None):
        curso = self.get_object()
        usuario_id = curso.usuario.id
        return Response({'ownerId': usuario_id})
              
    @action(detail=False, methods=['get'], url_path='creador/(?P<usuario_id>[^/.]+)')
    def cursos_usuario(self, request, usuario_id=None):
        usuario = get_object_or_404(Usuario, pk=usuario_id)
        cursos = Curso.objects.filter(usuario=usuario)
        page = self.paginate_queryset(cursos)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(cursos, many=True)
        return Response(serializer.data)


class LeccionViewSet(viewsets.ModelViewSet):
    queryset = Leccion.objects.all()
    serializer_class = LeccionSerializer

    @action(detail=True, methods=['put'])
    def actualizar_estado(self, request, pk=None):
        leccion = self.get_object()
        estado = request.data.get('estado')
        if estado is not None:
            leccion.estado = estado
            leccion.save()
            return Response({'status': 'estado actualizado'})
        else:
            return Response({'error': 'Estado no proporcionado'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def por_curso(self, request):
        curso_id = request.query_params.get('curso')
        if curso_id:
            lecciones = Leccion.objects.filter(curso_id=curso_id)
            serializer = self.get_serializer(lecciones, many=True)
            return Response(serializer.data)
        else:
            return Response({'error': 'curso es requerido'}, status=400)

class InscripcionViewSet(viewsets.ModelViewSet):
    queryset = Inscripcion.objects.all()
    serializer_class = InscripcionSerializer

    @action(detail=False, methods=['get'], url_path='student_cursos/(?P<usuario_id>[^/.]+)')
    def cursos_por_usuario(self, request, usuario_id=None):
        usuario = get_object_or_404(Usuario, pk=usuario_id)
        inscripciones = Inscripcion.objects.filter(usuario=usuario)
        cursos = [inscripcion.curso for inscripcion in inscripciones]
        serializer = CursoSerializer(cursos, many=True)
        return Response(serializer.data)


class PreferenciasViewSet(viewsets.ModelViewSet):
    queryset = Preferencias.objects.all()
    serializer_class = PreferenciasSerializer
class ProgresoViewSet(viewsets.ModelViewSet):
    queryset = Progreso.objects.all()
    serializer_class = ProgresoSerializer
class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

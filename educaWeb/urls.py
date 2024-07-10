from django.urls import path, include
from rest_framework import routers
from . import views, apis


#conf routers
router = routers.DefaultRouter()
router.register(r'usuarios', apis.UsuarioViewSet)
router.register(r'cursos', apis.CursoViewSet)
router.register(r'lecciones', apis.LeccionViewSet)
router.register(r'preferencias', apis.PreferenciasViewSet)
router.register(r'progreso', apis.ProgresoViewSet)
router.register(r'categorias', apis.CategoriaViewSet)
router.register(r'inscripciones', apis.InscripcionViewSet)


urlpatterns = [
    path('', views.index, name="index"),
    path('apis/', include(router.urls)),  
    #log urls
    path('login', views.login_view, name="login"),
    path('logout', views.logout_view, name="logout"),
    path('register', views.register, name="register"),
    #cursos urls
    path('cursos', views.cursos, name="cursos"),
]
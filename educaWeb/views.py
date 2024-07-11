from argparse import Action
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import JsonResponse, HttpResponseRedirect, HttpResponseBadRequest
from django.urls import reverse
from .models import Usuario, Curso, Leccion, Preferencias, Progreso, Categoria


# Create your views here.
def index(request):
    return render(request, 'educaWeb/index.html')


#LOG VIEWS
def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        
        user = authenticate(request, username=username, password=password)

        #si el login fue satisfactorio
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "educaWeb/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "educaWeb/login.html")
    
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def register(request):      

    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        tipo_usuario = request.POST["tipo_usuario"]  


        if password != confirmation:
            return render(request, "educaWeb/register.html", {
                "message": "Passwords must match."
            })

        try:
            user = Usuario.objects.create_user(username=username, password=password)
            user.tipo_usuario = tipo_usuario  
            user.save()
        except IntegrityError as e:
            print(e)
            return render(request, "educaWeb/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "educaWeb/register.html",{
            'tipo_usuario': Usuario.USER_TYPE_CHOICES
        })

def cursos(request):
    categorias = Categoria.objects.all()
    cursos = Curso.objects.all()
    context = {
        'categorias': categorias,
        'cursos': cursos,
    }
    return render(request, 'educaWeb/cursos.html', context)


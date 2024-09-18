from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods


@require_http_methods(["POST"])
def vk_create_user_and_login(request):
    data = request.POST
    new_user = User.objects.create_user(
        username=data.get('first_name'),
        first_name=data.get('first_name'),
        last_name=data.get('last_name'),
        email=data.get('email'),
    )
    new_user.set_password('12345')
    new_user.save()
    return JsonResponse({'status': 'success'}, status=201)


@require_http_methods(["GET"])
def get_user_by_id(request, user_id):
    user = User.objects.get(id=user_id)
    return JsonResponse({
        'id': user.id,
        'username': user.username,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email
    })

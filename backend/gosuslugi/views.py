from django.http import HttpResponseRedirect
from urllib.parse import urlencode
import requests
from django.conf import settings
from django.contrib.auth import login
from django.shortcuts import redirect
from django.http import JsonResponse
from django.contrib.auth.models import User


def gosuslugi_login(request):
    params = {
        'client_id': settings.GOSUSLUGI_CLIENT_ID,
        'redirect_uri': settings.GOSUSLUGI_REDIRECT_URI,
        'response_type': 'code',
        'scope': 'openid',  # Измените, если требуется больше прав
        'state': 'random_csrf_token',  # Используйте CSRF-токен для защиты
    }
    url = f"{settings.GOSUSLUGI_AUTHORIZATION_URL}?{urlencode(params)}"
    return HttpResponseRedirect(url)


def gosuslugi_callback(request):
    # Получаем код авторизации из запроса
    code = request.GET.get('code')
    if not code:
        return JsonResponse({'error': 'Authorization code not provided'}, status=400)

    # Обмен кода на access token
    token_data = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': settings.GOSUSLUGI_REDIRECT_URI,
        'client_id': settings.GOSUSLUGI_CLIENT_ID,
        'client_secret': settings.GOSUSLUGI_CLIENT_SECRET,
    }

    token_response = requests.post(settings.GOSUSLUGI_ACCESS_TOKEN_URL, data=token_data)
    token_json = token_response.json()

    if 'access_token' not in token_json:
        return JsonResponse({'error': 'Failed to get access token'}, status=400)

    access_token = token_json['access_token']

    # Запрашиваем информацию о пользователе
    headers = {
        'Authorization': f'Bearer {access_token}',
    }
    userinfo_response = requests.get(settings.GOSUSLUGI_USERINFO_URL, headers=headers)
    userinfo = userinfo_response.json()

    # Проверка успешности получения данных пользователя
    if not userinfo or 'sub' not in userinfo:
        return JsonResponse({'error': 'Failed to get user info'}, status=400)

    # Логика аутентификации пользователя
    username = userinfo.get('sub')
    email = userinfo.get('email', '')  # Госуслуги не всегда отдают email
    first_name = userinfo.get('given_name', '')
    last_name = userinfo.get('family_name', '')

    # Ищем пользователя по username или email, создаем если не найден
    user, created = User.objects.get_or_create(username=username, defaults={
        'first_name': first_name,
        'last_name': last_name,
        'email': email,
    })

    # Логиним пользователя
    login(request, user)

    # Перенаправляем на главную страницу или другой URL
    return redirect('/')

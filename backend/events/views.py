from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Event
from django.utils import timezone


@require_http_methods(["POST"])
def add_event(request):
    try:
        # Получаем данные из POST-запроса
        data = request.POST

        # Создаем новое событие
        event = Event.objects.create(
            title=data.get('title'),
            start_date=data.get('start_date'),
            end_date=data.get('end_date'),
            public_location=data.get('public_location'),
            lon=data.get('lon'),
            lat=data.get('lat'),
            image=data.get('image'),
            event_type=data.get('event_type'),
            description=data.get('description'),
            status=data.get('status'),
            source=data.get('source'),
            organizer_name=data.get('organizer_name'),
            organizer_avatar=data.get('organizer_avatar'),
            organizer_contact=data.get('organizer_contact'),
            participants=data.get('participants'),
            tags=data.get('tags'),  # Для JSON-поля передаются данные в формате JSON
            created_at=timezone.now(),  # Устанавливаем время создания
            updated_at=timezone.now(),  # Устанавливаем время последнего обновления
            assigned_moderator=data.get('assigned_moderator'),
            price=data.get('price'),
            age_restriction=data.get('age_restriction'),
            website=data.get('website')
        )

        # Возвращаем успешный ответ
        return JsonResponse({
            'status': 'success',
            'message': 'Event created successfully',
            'event_id': event.id
        }, status=201)

    except Exception as e:
        # В случае ошибки возвращаем ответ с ошибкой
        return JsonResponse({
            'status': 'error',
            'message': str(e)
        }, status=400)


@require_http_methods(["GET"])
def get_events(request):
    events = Event.objects.all()
    events_json = [event.to_dict() for event in events]
    return JsonResponse(events_json, safe=False)

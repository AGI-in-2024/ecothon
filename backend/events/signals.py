from django.db.models.signals import post_migrate
from django.dispatch import receiver
from .services.parse_mosru import parse_mosru_events


@receiver(post_migrate)
def create_events_after_migrations(sender, **kwargs):
    """
    Запускает парсер и создает события после выполнения миграций.
    """
    parse_mosru_events()  # Вызов функции парсера

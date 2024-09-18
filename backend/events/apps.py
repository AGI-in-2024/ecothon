import logging

from django.apps import AppConfig
from django.db import OperationalError


class EventsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'events'

    def ready(self):
        from .services.parse_mosru import parse_mosru_events
        logger = logging.getLogger(__name__)
        try:
            logger.info("Запуск парсера при старте приложения")
            parse_mosru_events()  # Вызов функции парсера
        except OperationalError:
            logger.warning("База данных недоступна, парсер не был запущен")
        except Exception as e:
            logger.error(f"Ошибка при запуске парсера: {e}")

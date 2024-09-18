from django.db import models
from django.utils import timezone  # Добавьте этот импорт


class Event(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=255, unique=True)
    start_date = models.DateTimeField(null=True)
    end_date = models.DateTimeField(null=True)
    public_location = models.CharField(max_length=255, null=True)
    lon = models.FloatField(null=True)
    lat = models.FloatField(null=True)
    image = models.CharField(max_length=255, null=True)
    event_type = models.CharField(max_length=255, null=True)
    description = models.TextField(null=True)
    status = models.CharField(max_length=255, null=True)
    source = models.CharField(max_length=255, null=True)
    organizer_name = models.CharField(max_length=255, null=True)
    organizer_avatar = models.CharField(max_length=255, null=True)
    organizer_contact = models.CharField(max_length=255, null=True)
    participants = models.IntegerField()
    tags = models.JSONField()
    created_at = models.DateTimeField(default=timezone.now)  # Добавьте default
    updated_at = models.DateTimeField(default=timezone.now)  # Добавьте default
    assigned_moderator = models.IntegerField(null=True)
    price = models.CharField(max_length=255, null=True)
    age_restriction = models.CharField(max_length=255, null=True)
    website = models.CharField(max_length=255, null=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'public_location': self.public_location,
            'lon': self.lon,
            'lat': self.lat,
            'image': self.image,
            'event_type': self.event_type,
            'description': self.description,
            'status': self.status,
            'source': self.source,
            'organizer_name': self.organizer_name,
            'organizer_avatar': self.organizer_avatar,
            'organizer_contact': self.organizer_contact,
            'participants': self.participants,
            'tags': self.tags,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'assigned_moderator': self.assigned_moderator,
            'price': self.price,
            'age_restriction': self.age_restriction,
            'website': self.website
        }

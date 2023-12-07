from django.db import models
from django.conf import settings
from user_app.models import User  

class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bio = models.TextField()
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    interests = models.TextField()
    favorite_books = models.TextField()

    def __str__(self):
        return f"Profile of {self.user.email}"

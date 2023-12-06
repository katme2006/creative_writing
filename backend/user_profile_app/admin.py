from django.contrib import admin
from .models import UserProfile

# Register the UserProfile model with the default admin interface
admin.site.register(UserProfile)
from django.db import models
from django.conf import settings
from django.utils import timezone

class IndividualPrompt(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    prompt_text = models.TextField()
    response_text = models.TextField(blank=True, null=True)
    is_timed = models.BooleanField(default=False)
    time_taken = models.BigIntegerField(blank=True, null=True)
    genre = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    title = models.CharField(max_length=255, blank=True, null=True)
    def __str__(self):
        return f"Prompt: {self.prompt_text[:50]}..."  # Show first 50 characters of prompt?? Let see how this looks.

    class Meta:
        verbose_name = 'Individual Prompt'
        verbose_name_plural = 'Individual Prompts'

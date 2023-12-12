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
    writing_collection = models.ForeignKey(
        'writing_collections.WritingCollection', 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True
    )

    def __str__(self):
        collection_str = f" in Collection: {self.writing_collection.collection_title}" if self.writing_collection else ""
        return f"Prompt: {self.prompt_text[:50]}...{collection_str}"

    class Meta:
        verbose_name = 'Individual Prompt'
        verbose_name_plural = 'Individual Prompts'

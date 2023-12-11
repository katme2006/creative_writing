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
    # Figure out how to do tags... will probably be many to many?
    # tags = models.ManyToManyField('TagModel', related_name='individual_prompts', blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Prompt: {self.prompt_text[:50]}..."  # Show first 50 characters of prompt

    class Meta:
        verbose_name = 'Individual Prompt'
        verbose_name_plural = 'Individual Prompts'

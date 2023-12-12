from django.db import models
from django.conf import settings
from django.db.models import Q

class WritingCollection(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    collection_title = models.CharField(max_length=255, default='Untitled')
    collection_description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    private = models.BooleanField(default=False)
    color = models.CharField(max_length=7)  # Assuming this is a HEX color code
    
    def save(self, *args, **kwargs):
        if not self.id:  # If creating a new instance
            # Default title if none is provided
            if not self.collection_title or self.collection_title.strip() == '':
                self.collection_title = 'Untitled'

            original_title = self.collection_title
            counter = 1

            # Check if the title exists for this user and increment counter until a unique title is found
            while WritingCollection.objects.filter(
                Q(collection_title=self.collection_title) & Q(user=self.user)
            ).exists():
                self.collection_title = f'{original_title}{counter}'
                counter += 1

        super(WritingCollection, self).save(*args, **kwargs)

    def __str__(self):
        return self.collection_title

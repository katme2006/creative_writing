from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _
from django.db import models


class CustomUserManager(BaseUserManager):

    
    def create_user(self, email, password=None):
        if not email:
            raise ValueError(_('The Email must be set'))

        # make sure this comes in lowercase so you don't mess it up again
        email = self.normalize_email(email)

        # lowercase
        user = self.model(email=email, username=email)

        # this handles password hashing
        user.set_password(password)

        # Save the user object to the database
        user.save(using=self._db)
        return user


    def create_superuser(self, email, password):
        user = self.create_user(email, password)

        # Set the user as a staff member (required for admin access)
        user.is_staff = True

        # Set the user as a superuser (grants all permissions)
        user.is_superuser = True

        # Save the updated user object to the database
        user.save(using=self._db)

        # Return the created superuser object
        return user


class User(AbstractUser):
   
    email = models.EmailField(
        _('email address'),  
        unique=True,        
    )

    display_name = models.CharField(max_length=50, unique=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []  

    # Link the CustomUserManager to the User model
    objects = CustomUserManager()

    def __str__(self):
        return self.email

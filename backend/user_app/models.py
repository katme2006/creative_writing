from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _
from django.db import models

# Custom User Manager for the User model
class CustomUserManager(BaseUserManager):

    # Method to create a regular user
    def create_user(self, email, password=None):
        # If email is not provided, raise an error
        if not email:
            raise ValueError(_('The Email must be set'))

        # Normalize the email address (e.g., convert domain part to lowercase)
        email = self.normalize_email(email)

        # Create a new user object with the normalized email and set the email as the username
        user = self.model(email=email, username=email)

        # Set the user's password (this handles password hashing)
        user.set_password(password)

        # Save the user object to the database
        user.save(using=self._db)

        # Return the created user object
        return user

    # Method to create a superuser
    def create_superuser(self, email, password):
        # Create a regular user first
        user = self.create_user(email, password)

        # Set the user as a staff member (required for admin access)
        user.is_staff = True

        # Set the user as a superuser (grants all permissions)
        user.is_superuser = True

        # Save the updated user object to the database
        user.save(using=self._db)

        # Return the created superuser object
        return user

# Custom User model extending AbstractUser
class User(AbstractUser):
    # Define an email field with specific properties
    email = models.EmailField(
        _('email address'),  # Verbose name for the email field
        unique=True,        # Ensures that no two users can have the same email
        max_length=255,     # Maximum length of the email field
    )

    # Additional field to store a display name
    display_name = models.CharField(max_length=50, unique=True, null=True, blank=True)

    # Field to store the date and time when the account was created
    created_at = models.DateTimeField(auto_now_add=True)

    # Specify the field to use as the unique identifier for authentication
    USERNAME_FIELD = 'email'

    # List of additional fields that will be prompted for when creating a superuser
    REQUIRED_FIELDS = []  

    # Link the CustomUserManager to the User model
    objects = CustomUserManager()

    # String representation of the User model
    def __str__(self):
        return self.email

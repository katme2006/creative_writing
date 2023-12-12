from django.urls import path
from .views import CreateIndividualPrompt, GetIndividualPromptView, ListIndividualPromptsView

urlpatterns = [

    path('create/', CreateIndividualPrompt.as_view(), name='create_individual_prompt'),
    path('individual-prompt/<int:prompt_id>/', GetIndividualPromptView.as_view(), name='get_individual_prompt'),
    path('individual-prompts/', ListIndividualPromptsView.as_view(), name='list_individual_prompts'),
]

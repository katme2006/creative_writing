# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from openai import OpenAI
import os
import requests

class OpenAIView(APIView):
    def post(self, request, *args, **kwargs):
        category = request.data.get('category', None)

        if category is None:
            return Response(
                {"error": "Category not provided."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Fetch a random word from the Random Word API
        random_word_response = requests.get('https://random-word-api.herokuapp.com/word')
        if random_word_response.status_code != 200:
            return Response(
                {"error": "Failed to generate a random word."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        random_word = random_word_response.json()[0]

        prompts = {
            'sci-fi': f'Create a creative writing prompt for a science fiction story that includes the word "{random_word}": ',

            'fantasy': f'Create a creative writing prompt for a fantasy story that includes the word "{random_word}": ',

            'horror': f'Create a creative writing prompt for a horror story that includes the word "{random_word}": ',

            'mystery-thriller': f'Create a creative writing prompt for a mystery or thriller scene that includes the word "{random_word}": ',

            'romance': f'Create a creative writing prompt for a romance story that includes the word "{random_word}": ',
            'historical-fiction': f'Create a creative writing prompt for a piece of historical fiction that includes the word "{random_word}": ',
            'adventure': f'Create a creative writing prompt for an adventure story that includes the word "{random_word}": ',
            'dystopian': f'Create a creative writing prompt about a dystopian scenario that includes the word "{random_word}": ',
            'comedy': f'Create a creative writing prompt for a comedic situation that includes the word "{random_word}": ',
            'slice-of-life': f'Create a creative writing prompt for an exercise for capturing a daily moment or interaction that includes the word "{random_word}": ',
            'non-fiction': f'Create a creative writing prompt that has the user write about a memory from their own life that includes the word "{random_word}": ',
            'poetry': f'Create a creative writing prompt for a poem that includes the word "{random_word}": ',
            'character-development': f'Create a creative writing prompt or exercise for character development that includes the word "{random_word}": ',
            'dialogue-practice': f'Create a creative writing prompt for practicing dialogue that includes the word "{random_word}": ',
            'setting-description': f'Create a creative writing prompt for establishing a setiing that includes the word "{random_word}": ',
            'flash-fiction': f'Create a creative writing prompt for a flash fiction story that includes the word "{random_word}": ',
            'world-building': f'Create a creative writing prompt for world-building that includes the word "{random_word}": ',
            'first-person-perspective': f'Create a creative writing prompt that requires writing in the first person and includes the word "{random_word}": ',
            'plot-twists': f'Create a creative writing prompt that involves a plot twist and includes the word "{random_word}": ',
            'genre-blending': f'Create a creative writing prompt that blends genres and includes the word "{random_word}": ',
            'emotional-writing': f'Create a creative writing prompt that focuses on conveying emotion and includes the word "{random_word}": ',
        }

        prompt_text = prompts.get(category, "Create a single creative writing exercise: ")

        client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

        try:
            # Make a request to OpenAI API
            response = client.completions.create(
                model="text-davinci-003",
                prompt=prompt_text,
                max_tokens=55,  # Limit the number of tokens to make the prompt more open-ended
                temperature=.7  # Adjust creativity
            )

            # Return the text generated by OpenAI API
            return Response({
                'generated_text': response.choices[0].text.strip()
            })

        except Exception as e:
           
            print(f"Error: {str(e)}")
       
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

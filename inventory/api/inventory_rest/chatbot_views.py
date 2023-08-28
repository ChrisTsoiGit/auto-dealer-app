from django.http import JsonResponse
import openai

openai.api_key = "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"


def generate_response(request):
    if request.method == "POST":
        prompt = request.POST.get("prompt")
        max_tokens = 50  # Limit the response length
        try:
            response = openai.Completion.create(
                engine="text-davinci-002", prompt=prompt, max_tokens=max_tokens
            )
            message = response.choices[0].text.strip()
            return JsonResponse({"message": message})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

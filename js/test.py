import requests

response = requests.get('http://localhost:3100/login',
                data={'Goodbye': 'World'}
                 )

print(response.content)
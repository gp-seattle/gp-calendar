import requests

response = requests.put('http://localhost:3100/validate_account',
    data = {'email' : 'email@gpmail.org'}
)



print(response.content)
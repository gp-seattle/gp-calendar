import requests

response = requests.get('http://localhost:3100/create_account',
    data = {
        'email' : 'email5',
        'hashpass' : 'hashedpass',
        'name' : 'first last',
        'year' : 1,
        'isStudentLeader' : False,
        'gender' : 'Male',
        'isAdmin' : False
    }
)

print(response.content)
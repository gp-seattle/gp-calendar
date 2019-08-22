import requests

response = requests.post('http://localhost:3100/create_account',
    data = {
            'email' : 'wyatt@test.org',
            'hashpass' : '515151',
            'name' : 'Wyatt',
            'year' : 1, 
            'isStudentLeader' : 'false', 
            'gender' : 'male'
           }
)



print(response.content)
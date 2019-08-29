import requests
import time
s = requests.Session() 
for i in range(1,45):
    email = "test" + str(i) + "@gmail.com"
    response = s.post(
        'http://localhost:3100/create_account',
        data = {
        'email' : email,
        'hashpass' : '515151',
        'name' : 'Wyatt' + str(i),
        'year' : 1,
        'isStudentLeader' : 'false',
        'gender' : 'male'

        }
    )
    time.sleep(1)
    print("Create account: \t" + str(response.content))


response = s.get('http://localhost:3100/login',
    data = {
            'email' : 'wyatt@gpmail.org',
            'pass' : '515151',
           }
)
print("Login no cookie: \t" + str(response.content))

'''response = s.delete('http://localhost:3100/logout')
print("logout: \t\t" + str(response.content))

response = s.get('http://localhost:3100/login',
   data = {
           'email' : 'wyatt@test.org',
           'pass' : '515151',
          }
)
print("Login no cookie #2: \t" + str(response.content))


response = s.get('http://localhost:3100/login')
print("Login with cookie: \t" + str(response.content))'''


#response = s.get('http://localhost:3100/get_user_data')
#print("Get user data: \t\t" + str(response.content))

s.close()
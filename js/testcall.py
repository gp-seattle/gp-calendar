import requests
import time
s = requests.Session() 

response = s.get('http://localhost:3100/cal_data')
print("Cal Data no params/cookeis: \t" + str(response.content)[0:75] + "...")


response = s.get(
    'http://localhost:3100/cal_data',
    data = {
        'startTime' : '2019-9-13', 
        'endTime' : 'Fri Sep 20 2019 23:00:00 GMT-0700 (PDT)'
    }
)
print("\nCal Data start/end: \t\t" + str(response.content)[0:75] + "...")

'''
response = s.post(
    'http://localhost:3100/create_account',
    data = {
    'email' : 'wyatt4@gpmail.org',
    'hashpass' : '515151',
    'name' : 'Wyatt',
    }
)
print("\nCreate account: \t\t" + str(response.content))

'''

response = s.get('http://localhost:3100/login',
    data = {
            'email' : 'wyatt4@gpmail.org',
            'pass' : '515151',
           }
)
print("\nLogin no cookie: \t\t" + str(response.content))


response = s.get('http://localhost:3100/cal_data')
print("\nCal Data with cookeis: \t\t" + str(response.content)[0:75] + "...")

'''

response = s.delete('http://localhost:3100/logout')
print("logout: \t\t" + str(response.content))

response = s.get('http://localhost:3100/login',
   data = {
           'email' : 'wyatt@test.org',
           'pass' : '515151',
          }
)
print("Login no cookie #2: \t" + str(response.content))


response = s.get('http://localhost:3100/login')
print("Login with cookie: \t" + str(response.content))

'''

#response = s.get('http://localhost:3100/get_user_data')
#print("Get user data: \t\t" + str(response.content))

s.close()
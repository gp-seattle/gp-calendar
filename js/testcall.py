import requests
import time
s = requests.Session() 



response = s.get('http://localhost:3100/cal_data')
print("Cal Data no params/cookies: \t" + str(response.content)[0:75] + "...")


response = s.get(
    'http://localhost:3100/cal_data',
    data = {
        'startTime' : '2019-9-13', 
        'endTime' : 'Fri Sep 20 2019 23:00:00 GMT-0700 (PDT)'
    }
)
print("\nCal Data start/end: \t\t" + str(response.content)[0:75] + "...")



response = s.post(
    'http://localhost:3100/create_account',
    data = {
        'email' : 'wyattg@test.org',
        'hashpass' : '515151',
        'name' : 'g',
    }
)
print("\nCreate account: \t\t" + str(response.content))



response = s.get('http://localhost:3100/login',
    data = {
            'email' : 'wyattg@test.org',
            'pass' : '515151',
           }
)
print("\nLogin no cookie: \t\t" + str(response.content))

'''

response = s.get('http://localhost:3100/orders')
print("\nGet Validated: \t\t\t" + str(response.content))

'''


time.sleep(30)

response = s.get('http://localhost:3100/cal_data')
print("\nCal Data with cookeis: \t\t" + str(response.content)[0:75] + "...")


response = s.delete('http://localhost:3100/logout')
print("\nlogout: \t\t\t" + str(response.content))


response = s.get('http://localhost:3100/login',
   data = {
           'email' : 'wyattg@test.org',
           'pass' : '515151',
          }
)
print("\nLogin no cookie #2: \t\t" + str(response.content))


response = s.get('http://localhost:3100/login')
print("\nLogin with cookie: \t\t" + str(response.content))


response = s.delete("http://localhost:3100/delete_account",
    data = {
        'email' : 'wyattg@test.org',
        'pass' : '515151',
    }
)
print("\nAccount Deletion: \t\t" +  str(response.content))


s.close()
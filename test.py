import requests

response = requests.get('http://localhost:3100/cal_data',
                params={
                    'Start_Date': 201900609, 
                    'End_Date' : 20190614,
                    'Start_Time' : 1045,
                    'End_Time' : 1500
                })

print(response.content)
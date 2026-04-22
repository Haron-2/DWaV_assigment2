import pandas as pd
import requests
import time
import json
import os

FLASK_URL = os.getenv("FLASK_URL", "http://backend:5000/receive")

def start_sending():

    df = pd.read_csv('ip_addresses.csv')
    
    df = df.sort_values(by='Timestamp')
    
    previous_time = None

    for index, row in df.iterrows():
        current_time = row['Timestamp']
        
        if previous_time is not None:

            sleep_time = current_time - previous_time
            if sleep_time > 0:
                time.sleep(sleep_time)
        
        previous_time = current_time


        payload = {
            "ip": row['ip address'],
            "lat": row['Latitude'],
            "lon": row['Longitude'],
            "timestamp": row['Timestamp'],
            "suspicious": row['suspicious']
        }

        try:
            requests.post(FLASK_URL, json=payload)
            print(f"Sent: {payload['ip']}")
        except Exception as e:
            print(f"Error sending data: {e}")

if __name__ == "__main__":

    time.sleep(5) 
    start_sending()
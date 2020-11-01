import requests
import json

GOOGLE_KEY = ""

with open('key.json') as json_file:
    json_data = json.load(json_file)
    GOOGLE_KEY = json_data["GOOGLE_KEY"]


class google_crawler:

    params = {
    'output':'json',
    'key':GOOGLE_KEY,
    'radius':'2000',
    'type':'food',
    'keyword':'pizza',
    'language':'ko',
    }


    def get_vegan_near_data(self, lat, lng):
        result = []
        self.params['location'] = lat + ',' + lng
        
        PLACE_URL = f"https://maps.googleapis.com/maps/api/place/nearbysearch/{self.params['output']}?"
        PLACE_URL += f"key={self.params['key']}&radius={self.params['radius']}&location={self.params['location']}&"
        PLACE_URL += f"keyword={self.params['keyword']}&language={self.params['language']}"
        print(PLACE_URL)

        response = requests.get(PLACE_URL).json()
        if response['status'] == "OK":
            for n in response['results']:
                result.append({'name':n['name'],'lat':n['geometry']['location']['lat'],'lng':n['geometry']['location']['lng'] })

        print(result)
        return result
import requests
import json

KAKAO_KEY = ""

with open('key.json') as json_file:
    json_data = json.load(json_file)
    KAKAO_KEY = json_data["KAKAO_KEY"]

headers = {
    'Authorization': 'KakaoAK '+KAKAO_KEY,
}

params = {
    'category_group_code':'FD6',
    'radius':'2000',
}

class kakao_crawler:
    # genre에 해당하는 음식점들의 키워드 반환
    # ex) 양식 -> 피자, 햄버거, 이탈리안
    def get_keyword(self, genre, lat, lng):
        keyword = set()
        params['query'] = genre
        params['x'] = lng
        params['y'] = lat
        for n in range(1, 10):
            params['page'] = n
            result = requests.get('https://dapi.kakao.com/v2/local/search/keyword.json', headers=headers, params=params)
            result_status = result.status_code
            result = result.json()

            if 200 is not result_status:
                print('Error :' + result['code'] + ', Msg : ' + result['msg'])

            if result['meta']['is_end'] is True:
                break
            for i in result['documents']:
                temp = i['category_name'].split(' > ')
                # 카테고리 설정이 세세하게 되어 있지 않은 점포 데이터가 존재
                if len(temp) > 2:
                    keyword.add(temp[2])
                else:    
                    keyword.add(temp[-1])
        return list(keyword)

    def get_category(self, lat, lng):
        category = set()
        params['x'] = lng
        params['y'] = lat
        for n in range(1, 10):
            params['page'] = n
            result = requests.get('https://dapi.kakao.com/v2/local/search/category.json', headers=headers, params=params)
            result_status = result.status_code
            result = result.json()
            if 200 is not result_status:
                print('Error :' + result['code'] + ', Msg : ' + result['msg'])

            if result['meta']['is_end'] is True:
                break
            for i in result['documents']:
                category.add(i['category_name'].split(' > ')[1])
        
        # 점심 식사 메뉴 함수라서 술집 제외, 간식은 다른 장르 있으므로 제외
        if '술집' in category:
            category.remove('술집')

        if '간식' in category:
            category.remove('간식')
        return list(category)



    def get_place_data(self, keyword, lat, lng):
        result = []
        params['query'] = keyword
        params['x'] = lng
        params['y'] = lat
        for n in range(1, 10):
            params['page'] = n
            response = requests.get('https://dapi.kakao.com/v2/local/search/keyword.json', headers=headers, params=params)

            result_status = response.status_code
            result = response.json()
            if 200 is not result_status:
                print('Error :' + response['code'] + ', Msg : ' + response['msg'])

            if response['meta']['is_end'] is True:
                break
            for i in response['documents']:
                result.append({'name':i['place_name'], 'lat':i['y'], 'lng':i['x']})
        return result

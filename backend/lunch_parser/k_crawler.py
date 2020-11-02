import requests
import json

# KAKAO_API KEY 읽어오기
KAKAO_KEY = ""

with open('key.json') as json_file:
    json_data = json.load(json_file)
    KAKAO_KEY = json_data["KAKAO_KEY"]

# request 조건
headers = {
    'Authorization': 'KakaoAK '+KAKAO_KEY,
}

params = {
    'category_group_code':'FD6',    # 음식점 카테고리
    'radius':'2000',                # 현재 위치 반경 2km 탐색
}

class kakao_crawler:
    # genre에 해당하는 음식점들의 키워드 반환
    # ex) 양식 -> 피자, 햄버거, 이탈리안
    def get_keyword(self, genre, lat, lng):
        keyword = set()             # 같은 1차 분류가 여러개 나와서 set 이용
        params['query'] = genre     
        params['x'] = lng           
        params['y'] = lat
        # 카카오 로컬 API는 최대 45페이지의 정보를 긁어올 수 있다.
        # 카카오맵 검색 결과를 최대 10페이지까지 크롤링한다.
        for n in range(1, 10):
            params['page'] = n
            result = requests.get('https://dapi.kakao.com/v2/local/search/keyword.json', headers=headers, params=params)
            result_status = result.status_code
            result = result.json()

            if 200 is not result_status:
                print('Error :' + result['code'] + ', Msg : ' + result['msg'])

            # 반환된 응답이 마지막 페이지라는 플래그
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
        place_data = []
        params['query'] = keyword
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
                place_data.append({'name':i['place_name'], 'lat':i['y'], 'lng':i['x']})
        return place_data

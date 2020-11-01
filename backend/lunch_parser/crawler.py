import requests

headers = {
    'Authorization': 'KakaoAK 1396e864c2d756b2134c36063d2e9e0c',
}

params = {
    'category_group_code':'FD6',
    'radius':'2000',
}

class data_crawler:

    # genre에 해당하는 음식점들의 키워드 반환
    # ex) 양식 -> 피자, 햄버거, 이탈리안
    def get_keyword(self, genre, x, y):
        keyword = set()
        params['query'] = genre
        params['x'] = x
        params['y'] = y
        for n in range(1, 10):
            params['page'] = n
            result = requests.get('https://dapi.kakao.com/v2/local/search/keyword.json', headers=headers, params=params).json()
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

    # keyword에 대한 장소 정보 반환
    #   서가앤쿡 -> 장소 데이터
    def get_place_data(self, keyword, x, y):
        result = []
        params['query'] = keyword
        params['x'] = x
        params['y'] = y
        for n in range(1, 10):
            params['page'] = n
            result = requests.get('https://dapi.kakao.com/v2/local/search/keyword.json', headers=headers, params=params).json()
            if result['meta']['is_end'] is True:
                break
            for i in result['documents']:
                result.append(i)
        print(result)
        return result

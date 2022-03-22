
# /src/store

### <strong>`interest.js`</strong> : 관심종목 <br>
### <strong>`content.js`</strong> : 기업 정보 <br>
### <strong>`chart.js`</strong> : 차트데이터 관련<br>
<br>

<br>

```js
  export default {
    state: () => ({}),    // 상태(변수).
    getters: {},          // 상태(변수)에 접근.
    mutations: {},        // 상태(변수)를 변경 (동기).
    actions: {}           // 상태(변수)와 변경 (비동기).
  }
```

---
### <strong>`interest.js`</strong> <br>

***state***
```js
  state: () => ({
    interestList: [],   // 관심종목 리스트목록을 담은 ARRAY
    title: ''           // 관심종목 리스트를 생성할때, 리스트 이름을 저장 할 변수 STRING.
  }),
```
```js
  interestList = [
      {
        title: '관심종목 리스트 1',         
        items: ['삼성전자', 'SK하이닉스']   
      },
      {
        title: '관심종목 리스트 2',
        items: ['카카오', 'LG화학']
      }
      ...
    ]
```

***getters***
```js
  // state의 interestList 반환
  getInterestList: state => state.interestList 
```

***mutations***
```js
  mutations: {      
    // payload = {key: value} 로 받아 key에 해당하는 state를 value로 변경.
    updateState (state, payload) { }         
    
    // interestList 갱신
    updateInterestList(state, payload) { }
  },
```

***actions***
```js  
  actions: {      

    // /interestList
    // 관심종목 리스트 정보를 가져온다.    
    async initInterestList ({commit}, {memberId}) { },

    // /interestList
    // 관심종목 리스트를 추가한다.
    async addInterestList ({commit}, {memberId, interestListName}) { },

    // /interestItem/{name}
    // 관심종목 리스트에 관심종목을 추가한다.
    async addInterestListItem ({commit}, {memberId, stockCode, name}) { }

    // /interestItem
    // 관심종목 리스트의 이름을 변경한다.
    async editInterestList ({commit}, payload) { },
  }
```  
---

### <strong>`content.js`</strong> <br>
***state***
```js
  state: () => ({
    title: '',           // Search 컴포넌트의 title
    rangeSelected: "10일"// 기본 검색 요청 일수

    loading: false,           // 검색창 로딩
    subsideLoading: false,    // 유사종목, 뉴스 로딩
    detailsLoading: false,    // 상세정보 페이지 로딩 

    stock: {},           // 개별 종목에 대한 주가정보를 담은 OBJECT
    stocks: []            // 상장된 모든 종목에 대한 ARRAY
    subscribes: {},      // 전체 종목에 대한 구독여부를 담은 OBJECT
  }),
```
```js
  stock: {
    {
      '2022-03-10' : 
        {"Change": 0.1, "Close": 20, "High": 25, "Low": 15, "Open": 16, "Volume": 300},
      '2022-03-11' : 
        {"Change": 0.1, "Close": 20, "High": 25, "Low": 15, "Open": 16, "Volume": 300},
      '2022-03-12' : 
        {"Change": 0.1, "Close": 20, "High": 25, "Low": 15, "Open": 16, "Volume": 300},
      ...
      'Name' : '삼성전자우'
    },
  }

  stocks: [
    {}
  ]
```

***getters***
```js
  // 이름과 코드 매핑
  nameMappingCode: state => { },
  
  // DetailsInfo Component에서 활용될 차트 이외의 데이터들
  recent: (state, getters) => { },

  // 거래대금 TOP 10
  volumeRank: state => { },

  // 자동완성을 위한 종목명 테이블
  searchStates: state => { },

```
***mutations***
```js
  mutations: {      
    // payload = {key: value} 로 받아 key에 해당하는 state를 value로 변경.
    updateState(state, payload) { }          
    
    // state의 stock 항목 초기화
    initStock (state) { }

    // state의 subscritbe 항목 변경
    subscribeChange (state, payload) { }
  },
```

***actions***
```js  
  actions: {      
    
    // /stock/{stockId}/{requestDate}
    // /stock/{stockId}
    // 종목의 주식 가격과 상세정보를 가져온다.
    async searchContents({state, commit}, payload) { }

    // /daily
    // /dailyRank
    // 오늘의 주식시장과 거래 대금, 등락률을 가져온다.
    async getTodayContents ({commit, state}) { }
  }
```  

### <strong>`chart.js`</strong> <br>
***state***
```js
  state: () => ({
    chartOptions: {},  // 차트 옵션
    candleData: [],    // 봉차트 데이터
    lineData: []       // 라인차트 데이터
  })
```
```js
  candleData: [
    {
      name: '삼성전자',
      data: [
        {
          x: '2022-03-05',
          y: ['5654', '6547', '6470', '7777']   // 시가, 고가, 저가, 종가 순
        },
        {
          x: '2022-03-06',
          y: ['5672', '1111', '2222', '3333']
        },
        ...        
      ]
    }
  ]

  linedata = [
    {
      name: '삼성전자',
      data: [
        {
          x: '2022-03-05',
          y: '75645'
        },
        {
          x: '2022-03-06',
          y: '75231'
        }
        ...
      ]
    }
  ]

```
***mutations***
```js
  mutations: {      
    // payload = {key: value} 로 받아 key에 해당하는 state를 value로 변경.
    // payload = {title: 'codma'} 일경우 state의 title을 'codma'로 변경.
    updateState(state, payload) {}       
    

    // payload = {chartType, stock} 로 받아 
    // chartType에 맞는 차트를 stock를 이용하여 생성.
    // stock의 형식은 content.js의 state의 형식과 같다.
    createChartData(state, payload) {}
  },
```

***actions***
```js 
  // nothing
```


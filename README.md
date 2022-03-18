# vue-marcap-test

# <strong>state->getters 이전버전. 구조변경으로 수정 필요. </strong>

## /src/store

### <strong>`interest.js`</strong> : 관심종목 <br>
### <strong>`content.js`</strong> : 기업 정보 <br>
### <strong>`chart.js`</strong> : 차트데이터 <br>
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

***mutations***
```js
  mutations: {      
    // payload = {key: value} 로 받아 key에 해당하는 state를 value로 변경.
    // payload = {title: 'codma'} 일경우 state의 title을 'codma'로 변경.
    updateState(state, payload) { }                       
  },
```

***actions***
```js  
  actions: {      
    // payload로써 관심종목 리스트 이름을 받고, 
    // 관심종목 리스트목록에 관심종목 리스트를 생성하여 추가한다.
    addInterestList ({commit, state}, payload) { }

    // payload로써 관심종목 리스트 이름을 받고,
    // 관심종목 리스트목록에 관심종목 리스트 이름에 해당하는 리스트를 삭제한다.
    removeInteretList ({commit, state}, payload)

    // payload = {interestList, title} 로 받아 
    // interestList에 해당하는 관심종목 리스트에 title 이름으로 관심종목을 추가한다.
    addInterest ({commit, state}, payload) { }

    // payload = {interestList, title} 로 받아 
    // interestList에 해당하는 관심종목 리스트에 title 이름의 관심종목을 삭제한다.
    removeInterest ({commit, state, payload}) { }
  }
```  
---

### <strong>`content.js`</strong> <br>
***state***
```js
  state: () => ({
    // 개별 기업
    stock: {},           // 개별 종목에 대한 주가정보를 담은 OBJECT
    stocks: []            // 상장된 모든 종목
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

  ]

  subscribes: {
    'AJ네트웍스': false,
    '삼성전자': true,
    ...
  }

```
***mutations***
```js
  mutations: {      
    // payload = {key: value} 로 받아 key에 해당하는 state를 value로 변경.
    // payload = {title: 'codma'} 일경우 state의 title을 'codma'로 변경.
    updateState(state, payload) { }          
    
    // state의 stock 항목 초기화
    initStock (state) { }

    // state의 subscritbe 항목 변경
    subscribeChange (state, payload)
  },
```

***actions***
```js  
  actions: {      
    // payload로써 종목 이름을 받고,
    // 종목 이름에 해당하는 api 요청을 보내 state의 stock에 저장.
    // stock을 이용하여 차트데이터 생성 요청.
    async searchContents({state, commit, dispatch}, payload) { }

    // 오늘 기준 기업 전체 지표를 가져옴.
    async getTodayContents ({commit, state}) { 
      // init stocks...
    }
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
    updateState(state, payload) { }          
  },
```

***actions***
```js
  actions: {
    // payload = {chartType, stock} 로 받아 
    // chartType에 맞는 차트를 stock를 이용하여 생성.
    // stock의 형식은 content.js의 state의 형식과 같다.
    createChartData({commit}, payload) { }
  }
```


<template>
  <div class="container">
    <div v-if="loaded">
      <!-- <div v-for="stock in stocks" :key="stock.Change + stock.Volume">
        <li> {{ stock }}</li>
      </div>    -->
      <div class="stock">
        <template>
          <v-toolbar
            color="#3D3737"
            elevation="1"
            dark
          >
            <v-toolbar-title class="stock-name">
              {{ stockName }}
              <span class="stock-code">
               {{ stockCode }}
              </span>
            </v-toolbar-title>
            <v-divider
              class="mx-6"
              vertical
            ></v-divider>            
            <v-toolbar-items class="stock-price">
              <div class="stock-price">
                주가  
              </div>
              <div class="stock-price-value">
                <span 
                  class="change-rate"
                  :class="{
                    'change-rate--red': isChangeRated(lastStockClose.changeRate) === 'red',
                    'change-rate--blue' : isChangeRated(lastStockClose.changeRate)  === 'blue'               
                    }"
                >                  
                  {{ printRate(lastStockClose.changeRate)}}% 
                  ({{ printRate(lastStockClose.changeValue)}})</span>
                <br>
                <span>{{ lastStockClose.closeValue }}</span>
              </div>
            </v-toolbar-items>    

            <v-divider
              class="mx-6"
              vertical
            ></v-divider>  

            <v-toolbar-items class="stock-price">
              <div class="stock-volume">
                거래량  
              </div>
              <div class="stock-price-value">
                <span 
                  class="change-rate"
                  :class="{
                    'change-rate--red': isChangeRated(lastStockClose.changeVolumeRate) === 'red',
                    'change-rate--blue' : isChangeRated(lastStockClose.changeVolumeRate)  === 'blue'               
                    }"                  
                >
                  {{ printRate(lastStockClose.changeVolumeRate)}}% 
                  ({{ printRate(lastStockClose.changeVolume)}})</span>
                <br>
                <span>{{ lastStockClose.closeVolume }}</span>
              </div>
            </v-toolbar-items>                            

            <v-divider
              class="mx-6"
              vertical
            > </v-divider>                  
            <v-spacer></v-spacer>
            <v-dialog 
              v-model="dialog"
              width="500"
            >
              <template v-slot:activator="{on, attrs}">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  small
                  class="ma-2"
                  mx-auto
                  color="#B71C1C"
                  rounded
                  depressed                
                  >
                  <v-icon dark>{{subscribes.icon}}</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="text-h5 grey lighten-2 text-center">
                  어디다가 넣을까요????? ㅜㅡㅜ
                </v-card-title>
                <v-card-text>
                  <v-list>
                    <v-list-group
                      v-for="item in items"
                      :key="item.title"                    
                    >
                      <template v-slot:activator>
                        <v-list-item-content>
                          <v-list-item-title 
                            v-text="item.title"
                            @click="addList"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </template>
                    </v-list-group>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-dialog>
  
          </v-toolbar>
        </template>   
      </div>
      <div>
        <v-container class="upper">     
            <v-divider
              class="mx-6"
            ></v-divider>
          <v-row class="mb-6" >
            <v-col>
              <chart 
                :propSeries="stock" 
                :chartType="'candlestick'"
                :name="stockName"/>                  
            </v-col>
            <v-col>
              <chart 
                :propSeries="stock"
                :chartType="'line'"
                :name="stockName" />                
            </v-col>
          </v-row>
        </v-container>          
        <!-- <v-container class="downer">
          <v-row class="mb-6" >
            <v-col>
          
            </v-col>
            <v-col>
         
            </v-col>
          </v-row>
        </v-container>               -->
      </div>         
      <details-chart 
        :stock="stock"
        :requestDate="requestDate"></details-chart>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Chart'
import DetailsChart from '@/components/details/DetailsChart'
export default {
  props: [],
  components: {
    Chart,
    DetailsChart
  },
  data () {
    return {
      dialog: false,
      requestDate: 5
    }
  },
  computed: {
    // 개별 종목 가져오기
    stock () {
      return this.$store.state.content.stock
    },

    // 가장 최근 값들
    lastStockClose () {      
      return this.$store.getters['content/recent']
    },
    
    // 현재 기업 이름
    stockName () {
      return this.$store.state.content.stock.Name
    },

    // 현재 기업 코드
    stockCode () {
      return this.$store.getters['content/nameMappingCode'][this.stockName]
    },

    // 로딩을 위한 변수
    loaded () {
      return this.$store.state.content.loaded
    },

    // 현재 기업의 구독 여부. 아이콘과 구독 여부를 반환
    // {icon: 구독 여부에 따른 아이콘 이름, subscribe: 구독 여부}
    subscribes: {
      get () {
        return this.$store.state.content.subscribes[this.stockName] ? 
          {icon: 'mdi-flag-variant', subscribe: false}: 
          {icon:'mdi-flag-variant-outline', subscribe: true}
      },
      set (title) {
        this.$store.commit('content/subscribeChange', title)
      }
    },

    // 관심종목 리스트. 구독 버튼을 눌렀을때 나오는 다이어그램을 위해 필요함
    items () {
      return this.$store.state.interest.interestList
    }
  },
  methods: {
    // +면 빨간색, -면 파란색 반환
    isChangeRated (arg) {
      return arg.indexOf('-') ? 'red' : 'blue'
    },

    // 양수이면, +를 붙혀서 반환
    printRate (arg) {
      return arg.indexOf('-') ? '+' + arg : arg
    },

    addList (e) {
      this.$store.dispatch('interest/addInterest', {
        title: this.stockName,
        interestList: e.target.innerHTML
      })
      this.subscribes = this.stockName
      this.dialog = false
    },
  },
}
</script>

<style scoped>
  .stock {
    margin-bottom: 20px;
  }
  .stock-name {
    color: #fff;
    font-size: 35px;
    font-weight: 800;
    width: 400px;
  }
  .stock-code {
    color: #B8B8B8;
    font-size: 20px;
    margin-bottom: -10px;
    margin-left: 3px;
  }
  .stock-price {
    font-size: 25px;
    font-weight: 800;
    margin-bottom: -30px;
  }
  .stock-price-value {
    color: #B8B8B8;
    font-size: 23px;
    font-weight: 600;
    margin: -10px 10px 0px 12px;
    line-height: 20px;
  }
  .change-rate {
    font-size: 15px;
    font-weight: 300;
    margin-left: -2px;
  }
  .change-value {
    font-size: 15px;
    font-weight: 300;
    margin-left: -2px;
  }
  .change-rate--blue {
    color: #703EFF
  }
  .change-rate--red {
    color: #C71E1E
  }
  .upper {
    border: 1px solid #363333;
    border-radius: 20px;
    background-color: #363333;
  }
  .downer {
    border: 1px solid #363333;
    border-radius: 20px;
    background-color: #363333;
  }
  .flag {
    
  }

</style>




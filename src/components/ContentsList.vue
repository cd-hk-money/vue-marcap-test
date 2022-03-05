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
            </v-toolbar-title>

            <v-divider
              class="mx-4"
              vertical
            ></v-divider>

            <span class="subheading">
              {{ stockCode }}
            </span>

            <v-spacer></v-spacer>

            <v-toolbar-items class="hidden-sm-and-down">


              <v-divider vertical></v-divider>

              <v-divider vertical></v-divider>

              <v-divider vertical></v-divider>
              
            </v-toolbar-items>

            <v-app-bar-nav-icon></v-app-bar-nav-icon>
          </v-toolbar>
        </template>   
      </div>
      <div>
        <v-container>
          <v-row class="mb-6" >
            <v-col>
              <chart 
                :propSeries="stocks" 
                :chartType="'candlestick'"
                :name="stockName"/>                  
            </v-col>
            <v-col>
              <chart 
                :propSeries="stocks"
                :chartType="'line'"
                :name="stockName" />                
            </v-col>
            <!-- <v-col>
              <chart 
                :propSeries="kospiSeries"
                :chartType="'candlestick'"
                :name="stockName" />                
            </v-col> -->
          </v-row>
        </v-container>          
      </div>         
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Chart'
import { useContentStore } from '../store/content_pinia'
import { computed } from '@vue/composition-api'

export default {
  components: {
    Chart 
  },
  setup () {
    const contentStore = useContentStore()
    
    const stocks = computed(() => contentStore.stock)
    const stockName = computed(() => contentStore.stock.Name)
    const stockCode = computed(() => contentStore.nameMappingCode[stockName])
    const loaded = computed(() => contentStore.loaded)
    return {stocks, stockName, stockCode, loaded}
  },
  methods: {
    getToday () {
      const now = new Date()
      const date = new Date(now.setDate(now.getDate() - 1))
      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2)
      const day = ('0' + date.getDate()).slice(-2)
      return year + '-' + month + '-' + day
    }
  },
}
</script>

<style scoped>
  .stock-name {
    color: #fff;
    font-size: 30px;
    font-weight: 800;
  }
  .stock-code {
    color: gray;
  }
  .stock-name-box {
    padding-right: 20px;
    margin: 0px;
  }
  .stock {
    margin-bottom: 20px;
    padding: 0px 20px 20px 10px;
    border-bottom: 2px solid gray;
  }
</style>




<template>
  <div class="container">
    <div v-if="loaded">
      <!-- <div v-for="stock in stocks" :key="stock.Change + stock.Volume">
        <li> {{ stock }}</li>
      </div>    -->
      <div class="stock">
        <div class="stock-name-box">
          <span class="stock-name">
            {{ stockName }}
          </span>
          <span defer class="stock-code">
            {{ stockCode }}
          </span>
        </div>
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
          </v-row>
        </v-container>          
      </div>      
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Chart'

export default {
  components: {
    Chart 
  },
  computed: {
    stocks () {
      return this.$store.state.content.stock
    },
    stockName () {
      return this.$store.state.content.stock.Name
    },
    stockCode () {
      return this.$store.state.content.nameMappingCode[this.stockName]
    },
    loaded () {
      return this.$store.state.content.loaded
    },
  },
  updated () {
    
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
    width: 400px;
    margin: 0px;
  }
  .stock {
    margin-bottom: 20px;
    padding: 0px 20px 20px 10px;
    border-bottom: 2px solid gray;
  }
</style>




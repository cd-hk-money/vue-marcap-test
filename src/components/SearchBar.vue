<template>
  <div>
    <v-text-field
      defer
      v-model="title"
      solo
      :disabled="stockSelected === '전체종목'"
      @keypress.enter="searchContents">
      <template v-slot:prepend-inner>
        <v-icon>search</v-icon>
        
      </template>
      <template v-slot:append>
        <v-progress-circular
          v-if="loading"
          size="24"
          color="primary"
          indeterminate />
      </template>
    </v-text-field>  
    <template>
      <v-container fluid>
        <v-row align="center">
          <v-col
            class="d-flex"
            cols="2"
            sm="6"
          >
            <v-select
              :items="rangeitems"
              label="Range"
              v-model="rangeSelected"
              @change="searchContents"
            ></v-select>             
          </v-col>
          <v-col
            class="d-flex"
            cols="2"
            sm="6"
          >
            <v-select
              :items="stockTypes"
              label="stockType"
              v-model="stockSelected"
              @change="searchContents"
            ></v-select>
          </v-col>
        </v-row>
      </v-container>     
      </template>         
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import '@/styles/overrides.scss'

export default {
  data () {
    return {
      rangeitems: ['1일', '5일', '10일', '30일'],
      stockTypes: ['단일종목', '전체종목']
    }
  },
  computed: {
    title: {
      get () {
        return this.$store.state.content.title
      },
      set (title) {
        this.$store.commit('content/updateState', { title })
      }
    },
    rangeSelected: {
      get () {
        return this.$store.state.content.rangeSelected
      },
      set (rangeSelected) {
        this.$store.commit('content/updateState', { rangeSelected })
      }
    },
    stockSelected: {
      get () {
        return this.$store.state.content.stockSelected
      },
      set (stockSelected) {
        this.$store.commit('content/updateState', { stockSelected })
      }
    },
    loading () {
      return this.$store.state.content.loading
    }
  },
  methods: {
    ...mapActions('content', [  //content store에서 searchContents를 가져옴
      'searchContents'
    ]),   
  },
  created () {
    this.$store.commit('content/updateState', { selected: "하루"})
  }
}
</script>


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
import { useContentStore } from '../store/content_pinia'
import { computed, ref } from '@vue/composition-api'

import '@/styles/overrides.scss'

export default {
  setup () {
    // use store
    const contentStore = useContentStore()

    // data 
    const state = ref({
      rangeitems: ['1일', '5일', '10일', '30일'],
      stockTypes: ['단일종목', '전체종목']
    })

    // computed
    const title = computed({
      get: () => contentStore.title,
      set: title => { contentStore.title = title }
    })

    const rangeSelected = computed({
      get: () => contentStore.rangeSelected,
      set: rangeSelected => { contentStore.rangeSelected = rangeSelected}
    })

    const stockSelected = computed({
      get: () => contentStore.stockSelected,
      set: stockSelected => { contentStore.stockSelected = stockSelected}
    })
    
    const loading = computed(() => contentStore.loading)
    contentStore.selected = "하루"
  
    return { contentStore, state, title, rangeSelected, stockSelected,
      loading
    }
  },
  data () {
    return {
      rangeitems: ['1일', '5일', '10일', '30일'],
      stockTypes: ['단일종목', '전체종목']
    }
  },
  computed: {

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


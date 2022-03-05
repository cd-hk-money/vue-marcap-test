<template>
  <div class="content">
    <div class="name">
      시가총액 TOP 10
    </div>
    <v-list flat>
        <v-list-item
          dark
          v-for="content in contents" 
          :key="content.code"
          @click="searchContents(content.name)">
          {{ content.index }}
            <v-list-item-content>            
              <v-list-item-title 
                v-text="content.name"/>
                <v-list-item-subtitle v-text="content.code" />
            </v-list-item-content>            
        </v-list-item>   
    </v-list>
  </div>  
</template>
<script>

import { useContentStore } from '../store/content_pinia'
import { computed } from '@vue/composition-api'

export default {
  setup () {
    //store
    const contentStore = useContentStore()

    //computed
    const contents = computed(() => contentStore.volumeRank)

    contentStore.initContents()

    return { contentStore, contents }
  },
  methods: {
    searchContents (name) {
      this.contentStore.searchContents(name)
    }
  }
}
</script>

<style>
  .name {
    display: flex;
    font-size: 20px;
    font-weight: bold;
    justify-content: center;
    color: white;
    padding: 10px;
    border-bottom: 3px solid grey;
  }
  .v-list {
    background: black;
  }
  .v-list-item {
    border-bottom: 1.0px solid grey;
  }
</style>

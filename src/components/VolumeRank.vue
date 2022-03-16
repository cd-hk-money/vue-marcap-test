<template>
  <!-- <div class="content">
    <div class="name">
      시가총액 상위 10
    </div>
    <v-list flat>
        <v-list-item
          dark
          v-for="content in contents" 
          :key="content.code"
          @click="searchContents(content.name)">          
            <v-list-item-content>            
              {{ content.index }}
              <v-list-item-title 
                v-text="content.name"/>
                <v-list-item-subtitle v-text="content.code" />
            </v-list-item-content>            
        </v-list-item>   
    </v-list>
  </div>   -->
    <v-sheet
    height="400"
    class="overflow-hidden"
    style="position: relative;"
  >
    <v-container class="fill-height">
      <v-row
        align="center"
        justify="center"
      >
        <v-btn
          color="pink"
          dark
          @click.stop="drawer = !drawer"
        >
          Toggle
        </v-btn>
      </v-row>
    </v-container>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-sheet>
</template>
<script>

import {mapActions} from 'vuex'

export default {  
  data () {
    return {
      drawer: null,
      items: [
        { title: 'Home', icon: 'mdi-view-dashboard' },
        { title: 'About', icon: 'mdi-forum' },
      ],
    }
  },
  computed: {
    contents () {
      return this.$store.state.content.volumeRank
    }
  },
  methods: {
    ...mapActions('content', [  //content store에서 searchContents를 가져옴
      'searchContents'
    ])
  },
  created () {
    this.$store.dispatch('content/getTodayContents')
  },
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

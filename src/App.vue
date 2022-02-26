<template>
  <v-app> 
    <v-app-bar 
      color="#363333"      
      elevation="3"
      height="60px"
      :clipped-left="true"
      :clipped-right="true"
      outlined 
      dense
      shrink-on-scroll   
      app
    >
      <v-spacer></v-spacer>
      <search />
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer color="#363333" 
      elevation="3"
      :clipped="true"
      app>
    </v-navigation-drawer>

    <v-navigation-drawer color="#363333" 
      elevation="3"
      :right="true"
      :clipped="true"
       app>      
       <v-container>
         <v-col>
          <volume-rank />
         </v-col>   
       </v-container>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <v-layout justify-center>
          <contents-list />
        </v-layout>  
      </v-container>
    <router-link to="/"> </router-link>
    <router-link to="/details"></router-link>
    </v-main>

  </v-app>

</template>

<script>
import ContentsList from '@/components/ContentsList'
import Search from '@/components/Search'
import VolumeRank from '@/components/VolumeRank'


export default {
  components: {
    ContentsList,
    Search,
    VolumeRank
  }
}
</script>
  
<style>
.v-main__warp {
  background: #2d2 !important; 
}
.v-app-bar {
  min-height: auto !important;
  align-items: center !important;
  padding-top: 10px;
}
.v-main {
  background-color:#3D3737;
}
.v-navigation-drawer {
  border: 1px solid white;
}
</style>
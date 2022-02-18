<template>
  <v-app> 
    <v-container>
      <!-- <navbar /> -->
      <search-bar />
      <contents-list />
      <!-- 목록 -->
    </v-container>

  </v-app>
</template>

<script>
import SearchBar from '@/components/SearchBar'
import ContentsList from '@/components/ContentsList'
// import Navbar from '@/components/Navbar'

export default {
  components: {
    SearchBar,
    ContentsList,
    // Navbar
  }
}
</script>

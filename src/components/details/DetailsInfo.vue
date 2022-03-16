<template>
  <div>
    
  </div>
</template>

<script>
// import {mapActions} from 'vuex'

export default {
  computed: {
    lastStockClose () {
      return this.$store.getters['content/recent']
    },
  },
  methods: {
  },
  created () {
  },
  
}
</script>
<template>
  <v-text-field
    defer
    ref="textRefs"
    class="shrink"
    id="textfileds"
    v-model="title"
    rounded
    solo
    label="기업명, 코드"
    @keypress.enter="searchContents(title)"
  >
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
</template>

<script>
import { mapActions } from 'vuex'
import '@/styles/overrides.scss'
// import BaseInput from '@/components/BaseInput'

export default {
  data () {
    return {
      isFocused: false
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
    // rangeSelected: {
    //   get () {
    //     return this.$store.state.content.rangeSelected
    //   },
    //   set (rangeSelected) {
    //     this.$store.commit('content/updateState', { rangeSelected })
    //   }
    // },
    // stockSelected: {
    //   get () {
    //     return this.$store.state.content.stockSelected
    //   },
    //   set (stockSelected) {
    //     this.$store.commit('content/updateState', { stockSelected })
    //   }
    // },
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
    this.$store.commit('content/updateState', { selected: "d"})
  },
  mounted () {
    this.$nextTick(() => {
      console.log(this.$refs.textRefs)
    })
  }

}
</script>

<style>
   .v-text-field .v-input__control .v-input__slot {
    min-height: auto !important;
    display: flex !important;
    align-items: center !important;
    width: 270px;
  }
  .v-text-field:focus {
    border: 2px solid lightcoral !important;
  }
  .v-input--is-focused {
  }
</style>
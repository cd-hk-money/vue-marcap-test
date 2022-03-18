<template>
  <div>
    <v-autocomplete
      dark
      ref="autoinput"
      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      cache-items
      cless="mx-4"
      flat
      hide-no-data
      hide-details
      label="기업명, 코드"
      solo-inverted
      rounded
      @input="inputChanged"
      @keypress.enter="searchContents(search)"
      >
      <template v-slot:prepend-inner>
        <v-icon>search</v-icon>        
      </template>
    </v-autocomplete>
  </div>
  
</template>

<script>
// import { mapActions } from 'vuex'
// import '@/styles/overrides.scss'
// import BaseInput from '@/components/BaseInput'

export default {
  data () {
    return {
      loading: false,
      search: null,
      items: []
    }
  },
  computed: {
    select: {
      get () {
        return this.$store.state.content.title
      },
      set (title) {
        this.$store.commit('content/updateState', { title })
      }
    },
    states () {
      return this.$store.getters['content/searchStates']
    },
  },
  watch : {
    search (val) {
      if(!val) return
      val && val !== this.select && this.querySelections(val)
    }
  },
  methods: {
    inputChanged () {
      this.$refs.autoinput.blur()
      this.$store.dispatch('content/searchContents', this.select)
    },
    searchContents (select) {
      this.$refs.autoinput.blur()
      this.$store.dispatch('content/searchContents', select)
    },
    querySelections (val) {
      this.loading = true
      clearTimeout(this._timerId)
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return ( e || '').toLowerCase().indexOf((val || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)
    }
  },
  created () {
    this.$store.commit('content/updateState', { selected: "d"})
  },
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
</style>
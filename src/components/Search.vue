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
import { useContentStore } from '../store/content_pinia'
import { computed, ref } from '@vue/composition-api'
import '@/styles/overrides.scss'
// import BaseInput from '@/components/BaseInput'

export default {
  setup () {

    // usestore
    const contentStore = useContentStore()

    // data
    const state = ref({
      isFocused: false
    })

    // computed
    const title = computed({
      get: () => contentStore.title,
      set: title => {contentStore.title = title}
    })
    const loading = computed(() => contentStore.loading)

    contentStore.selected = 'd'

    // mounted 
    // onMounted(() => {
    //   this.$nextTick(() => {
    //     console.log(this.$refs.textRefs)
    //   })
    // })

    return {contentStore, state, title, loading}
  },
  methods: {
   searchContents (title) {
     this.contentStore.searchContents(title)
   }
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
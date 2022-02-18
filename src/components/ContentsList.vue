<template>
  <div>
    <div v-if="loaded">
      {{ stock }}
    </div>
    <!-- <ul>
      <li 
        v-for="content in contents" 
        :key="content.imdbID">
        {{ content }}
      </li>
    </ul> -->
  </div>
</template>

<script>
export default {
  computed: {
    contents () {
      return this.$store.state.content.contents
    },
    stock () {
      return this.$store.state.content.stock
    },
    loaded () {
      return this.$store.state.content.loaded
    }
  }
}
</script>




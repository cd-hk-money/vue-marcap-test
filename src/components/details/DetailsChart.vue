<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col
      v-for="n in 4"
      :key="n">
        <v-card
          class="mx-auto text-center"
          color="green"
          dark
          max-width="600"
        >
          <v-card-text>
            <v-sheet color="rgba(0, 0, 0, .12)">
              <v-sparkline
                :value="value"
                color="rgba(255, 255, 255, .7)"
                height="230"
                padding="20"
                stroke-linecap="round"
                smooth
              >
                <template v-slot:label="item">
                  {{ item.value }}원
                </template>
              </v-sparkline>
            </v-sheet>
          </v-card-text>

          <v-card-text>
            <div class="text-h4 font-weight-thin">
              Sales Last 24h
            </div>
          </v-card-text>

          <v-divider></v-divider>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: [
    'stock', 
    'requestDate'
  ],
  computed: {
    value () {
      return this.$store.getters['chart/vuetifyChart']({
        requestDate: this.$props.requestDate
      })
    }
  },
  created () {
    
  }
}
</script>
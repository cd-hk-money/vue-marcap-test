<template>
  <div class="continer">
    <div class="name">
      내 관심종목 리스트
    </div>
    <v-card 
    class="mx-auto"
    dark
  >
      <v-list flats>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.title"
          >
            <v-list-item-content>
              <v-list-item-title 
                @click="searchContents"
                v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card>
    <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn 
            v-bind="attrs"
            v-on="on"            
            class="ma-2"
            rounded
            dark
            mx-auto
            color="indigo"
          >
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>   
          <v-btn
            class="ma-2"
            rounded
            dark
            mx-auto
            color="#B71C1C"
            @click="deleteList"
            >
              <v-icon dark>mdi-minus</v-icon>
          </v-btn>            
        </template>

        <v-card width="auto">
          <v-card-title class="text-h5 grey lighten-2 text-center">
            관심종목 리스트 추가
          </v-card-title>

          <v-text-field
            autofocus
            ref="interestTextField"
            class="text-center"
            label="관심종목 이름"
            required
            v-model="title"
            @keypress.enter="dialogClose(title)"
            >
          </v-text-field>
          <!-- <v-divider></v-divider> -->

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialogClose(title)"              
            >
              확인
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>   
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      editMode: false,
      dialog: false,
    }),
  computed: {

    // 관심종목 리스트들
    items: {
      get () {
        return this.$store.state.interest.interestList
      },  
      // set (payload) {
      //   this.$store.dispatch('interest/editInterestList', payload)
      // }
    },
    title: {
      get () {
        return this.$store.state.interest.title
      },
      set (title) {
        this.$store.commit('interest/updateState', {title})
      }
    }
  },
  methods: {
    dialogClose (title) {
      if (!title) {
        this.message = '관심종목 이름은 한 글자 이상이여야 합니다.'
      } else {
      this.dialog = false
      this.$store.dispatch('interest/addInterestList', title)
      }      
    },    
    deleteList () {
      const length = Object.keys(this.items).length 
      if (!length) {
        console.log('제거할 리스트가 없습니다.')
      } else {
        console.log('리스트 개수 : ', length)
      }
    },
    focusInterestTextField () {
      this.$refs.focusInterestTextField.focus()
    },
    searchContents (e) {
      this.$store.dispatch('content/searchContents', e.target.innerText)
    }
  },
  created () {
    // this.$store.dispatch('interest/initInterestList')
  }
}

</script>

<style>
  .v-toolbar-title {
    
  }
  .name {
  display: flex;
  font-size: 20px;
  font-weight: bold;
  justify-content: center;
  color: white;
  padding: 10px;
  border-bottom: 3px solid grey;
  }
  .v-btn {
    margin-top: 20px;
  }
</style>
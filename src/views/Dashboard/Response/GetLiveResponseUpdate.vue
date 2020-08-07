<template lang="html">
  <div class="">
    <div v-if="event.event" class="">
      <h3>{{ event.event.name }}</h3>

      <div>
         <label class="typo__label">Filter By Categories</label>
         <multiselect
           v-model="selectedCategory"
           placeholder="Search"
           label="categoryName"
           track-by="categoryName"
           :options="formattedResponses"
           :multiple="false"
           >
         </multiselect>
         <pre></pre>
       </div>

      <h3>{{ formattedResponses[indexOn].categoryName }}</h3>
      <TableItemForResponseCategory :fields="fields" :items="formattedResponses[indexOn].selected" />
    </div>
    <h1 v-else>Loading....</h1>
  </div>
</template>


<script>

import { mapState } from 'vuex'
import store from '@/store/store'
import responseHelper from '@/helpers/responseHelper'
import TableItemForResponseCategory from '@/components/TableItemForResponseCategory'

export default {
  components: {
      TableItemForResponseCategory,
    },
    data () {
      return {
        selectedCategory: null
      }
    },
  created() {
    this.subscribe()
    this.$store.dispatch("event/fetchEventByIdFresh", this.$route.params.id)
    .then(() => {
      console.log("===Fetch Results====");
    }).catch(() => {
      console.log("===Failed To Fetch====");
    })
  },
  methods: {
    subscribe () {
      Pusher.logToConsole = true;
      const self = this;
      let pusher = new Pusher('58e65b82ed120604c653', {
          cluster: 'mt1'
      });
      let channel = pusher.subscribe('milkyTwo')
       channel.bind(`${this.$route.params.id}`, function(data) {
         if (data.response) {
           console.log("======PUSHER==", data.response);
           self.event.event.responses.unshift(data.response);
           return
         }
      });
    },
  },
  computed: {
    ...mapState(['event']),
    formattedResponses(){
      return responseHelper(this.event.event.responses)
    },
    fields(){
      return ["Name", "Item", "Group" ]
    },
    indexOn(){
      if (this.selectedCategory === undefined || this.selectedCategory === null) {
        return 0
      }
      return this.formattedResponses.findIndex(x => x.categoryName === this.selectedCategory.categoryName)
    },

  },
}
</script>

<style lang="css" scoped>
</style>

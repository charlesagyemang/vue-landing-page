<template lang="html">
  <!-- eslint-disable -->
  <div class="">
    <div class="main-content">
      <div class="main-content__top">
          <h1 class="main-content__title">
            <router-link  class="btn btn-secondary" :to="{ name: 'create-event', params: {} }">
              + Add New {{ messages }}
            </router-link>
            All Events
          </h1>
      </div>

      <div class="main-content__body">
        <div v-if="event.events">
          <TableItemForEvent :fields="fields" :items="event.events"/>
        </div>
        <div class="" v-else>
          Loading.....
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import TableItemForEvent from '@/components/TableItemForEvent.vue'
import { mapState } from 'vuex'
import store from '@/store/store'
import menuHelper from '@/helpers/menuHelper'


export default {
  components: {
      TableItemForEvent,
    },
    beforeCreate(){
      store.dispatch('event/fetchEvents').then(() =>{
        console.log("==== fetched ====");
        console.log(this.event.events);
      });
    }, //
    created() {
      this.subscribe()
    },
    data () {
      return {
        messages: ['alooo'],
      }
    },
    computed: {
      ...mapState(['event']), //
      fields(){
        let keys = Object.keys(this.event.events[0])
        keys = [  "Date", "EventName",  "Description", keys[4], keys[8], "MoreInfo", "Edit", "Delete"  ]
        const sendKeys = []
        keys.forEach((item) => {
          sendKeys.push({
            key: item,
            label: item,
            sortable: true,
            sortDirection: 'desc'
          })
        });
        return  sendKeys
      },
    },
    methods: {
      subscribe () {
        // Pusher.logToConsole = true;
        const self = this;

        let pusher = new Pusher('58e65b82ed120604c653', {
            cluster: 'mt1'
        });

        let channel = pusher.subscribe('occassions')

         channel.bind('get-all', function(data) {
           self.messages.push(data.message)
        });

      }
    }
}
</script>

<style lang="css" scoped>
</style>

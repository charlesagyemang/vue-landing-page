<template lang="html">
  <!-- eslint-disable -->
  <div class="container">
    <div class="main-content">
      <div class="main-content__top">
        <center>
          <p class="main-content__title">
          </p>
        </center>
      </div><br>
      <div v-if="event.event" class="main-content__body">
              <!-- EVERYTHING GOES HERE -->
               <div>
                 <h3>
                   Welcome To {{ this.event.event.name }}
                   Please Fill the Form Below</h3><br>
                 <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                   <b-form-group
                     id="input-group-1"
                     label="Full Name"
                     label-for="input-1"
                   >
                     <b-form-input
                       id="input-1"
                       v-model="form.name"
                       type="text"
                       required
                       placeholder="Your Full Name Please"
                     ></b-form-input>
                   </b-form-group>

                   <div v-for="(t, i) in newMenu"  :key="newMenu.id">
                    <label class="typo__label"><h5> Select {{ t.name }}</h5> </label>
                    <multiselect
                      v-model="form.items.results[i]"
                      placeholder="Search"
                      label="name"
                      track-by="name"
                      :options="t.selectedItems"
                      :multiple="false"
                      >
                    </multiselect>
                    <pre></pre>
                  </div>

                  <label class="typo__label"><h5>Choose A Unique Identifier</h5> (Company Or Table Name)</label>
                  <multiselect
                    v-model="form.group"
                    placeholder="Search"
                    label=""
                    track-by=""
                    :options="event.event.groupings.results"
                    :multiple="false"
                    >
                  </multiselect>
                  <br>
                  <label class="typo__label"> <h5>Any Other Thing you Want Us To Know?</h5> </label>
                   <b-form-group id="input-group-2" label-for="input-2">
                     <b-form-textarea
                       id="input-2"
                       v-model="form.others.anyOtherThing"
                       required
                       placeholder="Enter Description"
                     ></b-form-textarea>
                   </b-form-group>

                   <b-button class="btn-lg" type="submit" variant="primary"> Submit </b-button><br><br>
                 </b-form>
               </div>

      </div>
      <div class="" v-else>
        Loading........
      </div>
    </div>

  </div>
</template>

<script>

// console.log(this.$route.params.id);
import { mapState } from 'vuex'
import menuHelper from '@/helpers/menuHelper'


export default {
   created(){
     this.$store.dispatch('event/fetchEventById', this.$route.params.id)
     .then(() => {
       console.log("Fetched");
       console.log(this.event.event);
     }).catch(() => {
       console.log("Failed");
     })
   },
    data() {
      return {
        id: this.$route.params.id,
        eventName: this.$route.params.eventName,
        form: {
          occassionId: this.$route.params.id,
          group: '',
          name: '',
          categories: { results: [] },
          items: { results: [] },
          others: { anyOtherThing: '' },
        },
        gottenData: [],
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault(evt)
        this.form.categories = this.event.event.menu.categories;
        // alert(JSON.stringify(this.form));
        // /*
        this.$store.dispatch("event/createResponse", this.form)
        .then(() => {
          // onReset();
          console.log("===Created Response====");
          // Push To Thankyou Page
          // this.$router.push({ name: "list-categories", params: {} });
        }).catch(() => {
          console.log("===Fiailed To Create Response====");
        })
        // */
      },
      onReset() {
        this.form = {
          occassionId: this.$route.params.id,
          group: '',
          name: '',
          categories: { results: [] },
          items: { results: [] },
          others: { anyOtherThing: '' },
        }
      },
      subscribe () {
        Pusher.logToConsole = true;
        const self = this;
        let pusher = new Pusher('58e65b82ed120604c653', {
            cluster: 'mt1'
        });
        let channel = pusher.subscribe('milkyTwo')
         channel.bind(`${this.$route.params.id}`, function(data) {
           console.log("======PUSHER==", data.response);
           // self.gottenData.push(data.occassion)
        });

      },

    },
    computed: {
      ...mapState(['event']),
      newMenu(){
        return menuHelper(this.event.event.menu);
      }
    },
  }

</script>

<style lang="css" scoped>
</style>


<template lang="html">
  <!-- eslint-disable -->
  <div class="">
    <div class="main-content">
      <div class="main-content__top">
          <h1 class="main-content__title">
            Create Event
          </h1>
      </div>
      <div class="main-content__body">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <!-- EVERYTHING GOES HERE -->
               <div>
                 <b-form @submit="onSubmit" v-if="show">


                   <b-form-group
                     id="input-group-1"
                     label="Event Name:"
                     label-for="input-1"
                   >
                     <b-form-input
                       id="input-1"
                       v-model="form.name"
                       type="text"
                       required
                       placeholder="Enter Event Name"
                     ></b-form-input>
                   </b-form-group>

                   <b-form-group id="input-group-2" label="Menu Description:" label-for="input-2">
                     <b-form-textarea
                       id="input-2"
                       v-model="form.description"
                       required
                       placeholder="Enter Description"
                     ></b-form-textarea>
                   </b-form-group>

                   <div>
                     <label for="tags-pills">Enter Groups</label>
                     <b-form-tags
                       input-id="tags-pills"
                       v-model="form.groupings.results"
                       tag-variant="primary"
                       tag-pills
                       separator=""
                       placeholder="Enter group name and hit enter"
                       class="mb-2"
                     ></b-form-tags>
                     <p></p>
                   </div>

                   <div>
                    <label class="typo__label">Select A Menu</label>
                    <multiselect
                      v-model="form.menu"
                      placeholder="Search"
                      label="name"
                      track-by="name"
                      :options="menu.menus"
                      :multiple="false"
                      >
                    </multiselect>
                    <pre></pre>
                  </div>

                   <b-button type="submit" variant="primary"> Submit </b-button>
                 </b-form>
               </div>

            </div>
            <div class="col-3">

            </div>
            <div class="col-3">

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { mapState } from 'vuex'
import store from '@/store/store'

export default {
    beforeCreate(){
      // fetch menus
      if (store.state.menu.menus.length < 1) {
        store.dispatch('menu/fetchMenus').then(() =>{
          console.log("==== fetched menuItems ====");
          console.log(this.menu.menus);
        });
      }
    },
    components: {
        Multiselect
      },
    data() {
      return {
        form: {
          name: '',
          description: '',
          menu: {},
          menuId: '',
          groupings: { results: [] },
          others: { results: [] },
        },
        menus: [
          {id: "hshhshs", "userId":"Koobiti","name":"Menu 1","description":"Menu Description","categories":[{"name":"categorythree","description":"three description","others":{}},{"name":"categoryfour","description":"four description","others":{}}],"items":[{"type":"drink","categoryId":"CategoryId3","details":"15ml russian wine","name":"Carvia2","description":"Ensa papapaa","others":{}},{"type":"food","categoryId":"CategoryId1","details":"15ml russian cavia","name":"Carvia1","description":"Sweet 1 plate with 2 sides","others":{}}],"others":{"results":[]}},
          {id: "hshhshs","userId":"Koobiti","name":"Menu 2","description":"Menu Description","categories":[{"name":"categorythree","description":"three description","others":{}},{"name":"categoryfour","description":"four description","others":{}}],"items":[{"type":"drink","categoryId":"CategoryId3","details":"15ml russian wine","name":"Carvia2","description":"Ensa papapaa","others":{}},{"type":"food","categoryId":"CategoryId1","details":"15ml russian cavia","name":"Carvia1","description":"Sweet 1 plate with 2 sides","others":{}}],"others":{"results":[]}},
          {id: "hshhshs","userId":"Koobiti","name":"Menu 3","description":"Menu Description","categories":[{"name":"categorythree","description":"three description","others":{}},{"name":"categoryfour","description":"four description","others":{}}],"items":[{"type":"drink","categoryId":"CategoryId3","details":"15ml russian wine","name":"Carvia2","description":"Ensa papapaa","others":{}},{"type":"food","categoryId":"CategoryId1","details":"15ml russian cavia","name":"Carvia1","description":"Sweet 1 plate with 2 sides","others":{}}],"others":{"results":[]}}
        ],
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        const newForm = {
          name: this.form.name,
          description: this.form.name,
          menuId: this.form.menu.id,
          groupings: this.form.groupings,
          others: this.form.others
        }
        this.$store.dispatch("event/createEvent", newForm)
        .then(() => {
          console.log("===Created====");
          this.$router.push({ name: "list-event", params: {} });
        }).catch(() => {
          console.log("===Failed====");
        })

        // console.log(JSON.stringify(newForm));
      },
    },
    computed: {
      ...mapState(['menu'])
    }
  }
</script>

<style lang="css" scoped>
</style>

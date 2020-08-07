
<template lang="html">
  <!-- eslint-disable -->
  <div class="">
    <div class="main-content">
      <div class="main-content__top">
          <h1 class="main-content__title">
            Create Menu
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
                     label="Menu Name:"
                     label-for="input-1"
                   >
                     <b-form-input
                       id="input-1"
                       v-model="form.name"
                       type="text"
                       required
                       placeholder="Enter Menu Name"
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
                      <label class="typo__label">Add Categories</label>
                      <multiselect
                        v-model="form.categories.results"
                        placeholder="Search"
                        label="name"
                        track-by="name"
                        :options="category.categories"
                        :multiple="true"
                        >
                      </multiselect>
                      <pre></pre>
                    </div>
                  <div>
                   <label class="typo__label">Add Items In Any Order....</label>
                   <multiselect
                     v-model="form.items.results"
                     placeholder="Search"
                     label="name"
                     track-by="name"
                     :options="menuItem.menuItems | filterItems(form.categories.results)"
                     :multiple="true"
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
      // fetch categories
      if (store.state.category.categories.length < 1) {
        store.dispatch('category/fetchCategories').then(() =>{
          console.log("==== fetched categories ====");
          console.log(this.category.categories);
        });
      }
      // fetch menuItems
      if (store.state.menuItem.menuItems.length < 1) {
        store.dispatch('menuItem/fetchMenuItems').then(() =>{
          console.log("==== fetched menuItems ====");
          console.log(this.menuItem.menuItems);
        });
      }
    },

    components: {
        Multiselect
      },
    data() {
      return {
        form: {
          userId: '',
          name: '',
          description: '',
          categories: { results: [] },
          items: { results: [] },
          others: { results: [] },
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        if (this.form.categories.results.length > 0 || this.form.items.results.length > 0) {
          this.form.userId = this.user.user.id
          this.form.categories = this.form.categories
          this.form.items = this.form.items
          // console.log(this.form);
          this.$store.dispatch("menu/createMenu", this.form)
          .then(() => {
            console.log("===Created====");
            this.$router.push({ name: "list-menus", params: {} });
          }).catch(() => {
            console.log("===Failed====");
          })
        } else {
          alert("Error: Please select at least one category and menuItem")
        }

      },
    },
    computed: {
      ...mapState(['user', 'category', 'menuItem'])
    },
  }
</script>

<style lang="css" scoped>
</style>

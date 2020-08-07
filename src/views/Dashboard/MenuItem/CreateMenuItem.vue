
<template lang="html">
  <!-- eslint-disable -->
  <div class="">
    <div class="main-content">
      <div class="main-content__top">
          <h1 class="main-content__title">
            Create Menu Item
          </h1>
      </div>
      <div class="main-content__body">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <!-- EVERYTHING GOES HERE -->
               <div>
                 <b-form @submit="onSubmit" @reset="onReset" v-if="show">

                  <div>
                     <label class="typo__label">Item Type:</label>
                     <multiselect
                       v-model="form.type"
                       :options="type"
                       :multiple="false"
                       >
                     </multiselect>
                     <pre></pre>
                   </div>

                   <b-form-group
                     id="input-group-1"
                     label="Item Name:"
                     label-for="input-1"
                   >
                     <b-form-input
                       id="input-1"
                       v-model="form.name"
                       type="text"
                       required
                       placeholder="Enter Name: Assorted Jollof Rice"
                     ></b-form-input>
                   </b-form-group>

                   <div>
                      <label class="typo__label">Select Category</label>
                      <multiselect
                        v-model="form.category"
                        placeholder="Search"
                        label="name"
                        track-by="name"
                        :options="category.categories"
                        :multiple="false"
                        >
                      </multiselect>
                      <pre></pre>
                    </div>

                   <b-form-group id="input-group-2" label="Item Details:" label-for="input-2">
                     <b-form-textarea
                       id="input-2"
                       v-model="form.details"
                       required
                       placeholder="Enter Full Details"
                     ></b-form-textarea>
                   </b-form-group>

                   <b-form-group id="input-group-2" label="Item Description:" label-for="input-2">
                     <b-form-textarea
                       id="input-2"
                       v-model="form.description"
                       required
                       placeholder="Enter Description"
                     ></b-form-textarea>
                   </b-form-group>
                   <b-button type="submit" variant="primary"> Submit </b-button>
                 </b-form>
               </div>

            </div>
            <div class="col-3">
              <div v-if="category.categories.length > 0" class="">

              </div>
              <div v-else class="">
                Loading......
              </div>
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

import { mapState } from 'vuex'
import store from '@/store/store'

export default {

    data() {
      return {
        form: {
          name: '',
          description: '',
          type: null,
          category: null,
          details: '',
          others: {
            results: []
          },
        },
        type: ['food', 'drink'],
        show: true
      }
    },
    beforeCreate(){
      if (store.state.category.categories.length > 0) {
        // do nothing
        console.log("I Have OOooo");
      } else {
        // fet categories
        store.dispatch('category/fetchCategories').then(() =>{
          console.log("==== fetched ====");
          console.log(this.category.categories);
        });
      }

    },

    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        if (this.form.category === null || this.form.type === null) {
          alert("Error: Please Select A Category And A Type")
        } else {
          this.form.categoryId = this.form.category.id
          delete this.form.category
          console.log(JSON.stringify(this.form));
          // /*
            this.$store.dispatch("menuItem/createMenuItem", this.form)
            .then(() => {
              console.log("===Create ====");
              this.$router.push({ name: "list-menu-items", params: {} });
            }).catch(() => {
              console.log("===Fiailed To Create====");
            })
          // */
        }
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.name = ''
        this.form.description = ''
        this.form.type = null
        this.form.category = null
        this.form.details = ''
        this.form.others = { results: [] }
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    },
    computed: {
      ...mapState(['category'])
    }
  }
</script>

<style lang="css" scoped>
</style>

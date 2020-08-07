<template lang="html">
  <!-- eslint-disable -->
  <div class="">
    <div class="main-content">
      <div class="main-content__top">
          <h1 class="main-content__title">
            <router-link  class="btn btn-secondary" :to="{ name: 'list-categories', params: {} }">
              All Categories
            </router-link>
            Create Category
          </h1>
      </div>
      <div class="main-content__body">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <!-- EVERYTHING GOES HERE -->
               <div>
                 <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                   <b-form-group
                     id="input-group-1"
                     label="Category Name:"
                     label-for="input-1"
                   >
                     <b-form-input
                       id="input-1"
                       v-model="form.name"
                       type="text"
                       required
                       placeholder="Enter Category Name: Eg Starters"
                     ></b-form-input>
                   </b-form-group>

                   <b-form-group id="input-group-2" label="Describe Category:" label-for="input-2">
                     <b-form-textarea
                       id="input-2"
                       v-model="form.description"
                       required
                       placeholder="Enter Description"
                     ></b-form-textarea>
                   </b-form-group>

                   <b-button class="btn-lg" type="submit" variant="primary"> Submit </b-button>
                 </b-form>
               </div>
            </div>
            <div class="col-3">

            </div>
            <div class="col-4">
              <div>
                  <p></p>
                <b-card-group deck>
                  <b-card :title="form.name" header-tag="header" footer-tag="footer">

                    <template v-slot:header>
                      <h6 class="mb-0">Category Preview As You Type</h6>
                    </template>
                    <b-card-text>{{ form.description }}</b-card-text>
                    <template v-slot:footer>
                      <em>@possitech</em>
                    </template>
                  </b-card>
                </b-card-group>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>


export default {
    data() {
      return {
        form: {
          name: '',
          description: '',
          others: {
            results: []
          }
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        this.$store.dispatch("category/createCategory", this.form)
        .then(() => {
          console.log("===Created Category====");
          this.$router.push({ name: "list-categories", params: {} });
        }).catch(() => {
          console.log("===Fiailed To Create====");
        })
      },
      onReset(evt) {
        evt.preventDefault()
        this.form.name = ''
        this.form.description = ''
        this.form.others = { results: []}
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
    }
  }
</script>

<style lang="css" scoped>
</style>

<template lang="html">
  <!-- eslint-disable -->
  <div class="">
    <div class="main-content">
      <div class="main-content__top">
          <h1 class="main-content__title">
            <router-link  class="btn btn-secondary" :to="{ name: 'create-category', params: {} }">
              Add New
            </router-link>
            All Categories
          </h1>
      </div>
      <div class="main-content__body">
        <div v-if="category.categories">
          <TableItem :fields="fields" :items="category.categories"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableItem from '@/components/TableItem.vue'
import { mapState } from 'vuex'
import store from '@/store/store'


export default {
  components: {
      TableItem,
    },
    beforeCreate(){
      store.dispatch('category/fetchCategories').then(() =>{
          console.log("==== fetched ====");
          console.log(this.category.categories);
        });
    },
    computed: {
      ...mapState(['category']),
      fields(){
        let keys = [
          ["Date", "createdAt"],
          ["Name", "name"],
          ["Decription", "description"],
          ["Edit", "Edit"],
          ["Delete", "Delete"]
        ]
        const sendKeys = []
        keys.forEach((item) => {
          sendKeys.push({
            key: item[1],
            label: item[0],
            sortable: true,
            sortDirection: 'desc'
          })
        });
        return  sendKeys
    },
  }
}
</script>

<style lang="css" scoped>
</style>

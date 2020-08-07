<template lang="html">
  <!-- eslint-disable -->
  <div class="">
    <div class="main-content">
      <div class="main-content__top">
          <h1 class="main-content__title">
            <router-link  class="btn btn-secondary" :to="{ name: 'create-menu-item', params: {} }">
              + Add New
            </router-link>
            All Menu Items
          </h1>
      </div>
      <div class="main-content__body">
        <div v-if="menuItem.menuItems && category">
          <TableItemForMenuItems :fields="fields" :items="menuItem.menuItems" :categories="category.categories"/>
        </div>
        <div class="" v-else>
          Loading.....
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import TableItemForMenuItems from '@/components/TableItemForMenuItems.vue'
import { mapState } from 'vuex'
import store from '@/store/store'


export default {
  components: {
      TableItemForMenuItems,
    },
    beforeCreate(){
      store.dispatch('menuItem/fetchMenuItems').then(() =>{
          console.log("==== fetched ====");
          console.log(this.menuItem.menuItems);
        });

      store.dispatch('category/fetchCategories').then(() =>{
          console.log("==== Categories fetched ====");
          console.log(this.category.categories);
        });
    }, //
    computed: {
      ...mapState(['menuItem', 'category']),
      fields(){
        let keys =   [
            ["Date", "createdAt"],
            ["Name", "name"],
            ["Type", "type"],
            ["Details", "details"],
            ["Category", "category.name"],
            ["More Info", "moreInfo"],
            ["Edit", "Edit"],
            ["Delete", "Delete"],
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

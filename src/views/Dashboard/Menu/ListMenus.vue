<template lang="html">
  <!-- eslint-disable -->
  <div class="">
    <div class="main-content">
      <div class="main-content__top">
          <h1 class="main-content__title">
            <router-link  class="btn btn-secondary" :to="{ name: 'create-menu', params: {} }">
              + Add New
            </router-link>
            All Menus
          </h1>
      </div>
      <div class="main-content__body">
        <div v-if="menu.menus">
          <TableItemForMenu
          :fields="fields"
          :items="menu.menus"
          :categories="category.categories"
          :menuItems ="menuItem.menuItems"
          />
        </div>
        <div class="" v-else>
          Loading.....
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import TableItemForMenu from '@/components/TableItemForMenu.vue'
import { mapState } from 'vuex'
import store from '@/store/store'
import menuHelper from '@/helpers/menuHelper'


export default {
  components: {
      TableItemForMenu,
    },
    beforeCreate(){
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

      if (store.state.menu.menus.length < 1) {
        store.dispatch('menu/fetchMenus').then(() =>{
            console.log("==== fetched ====");
            console.log(this.menu.menus);
          });
      }
    }, //
    computed: {
      ...mapState(['menu', 'category', 'menuItem']),
      fields(){
        let keys = [
          ["Date", "createdAt"],
          ["Name", "name"],
          ["Categories", "categories"],
          ["Items", "items"],
          ["MoreInfo", "MoreInfo"],
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
      moole(){
        return menuHelper(this.menu.menus[4]);
      }
    }
}
</script>

<style lang="css" scoped>
</style>

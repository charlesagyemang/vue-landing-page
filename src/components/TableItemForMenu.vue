<template>
  <!-- eslint-disable -->
  <div>
    <b-container fluid>

      <b-row>

        <b-col lg="6" class="my-1">
          <b-form-group
            label-cols-sm="3"
            label-align-sm="left"
            label-size="sm"
            label-for="filterInput"
            class="mb-0"
          >
            Filter
            <b-input-group size="sm">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="Type to Search"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col sm="3" md="2" class="my-1">
          <b-form-group
            label-cols-sm="6"
            label-cols-md="4"
            label-cols-lg="3"
            label-align-sm="right"
            label-size="sm"
            label-for="perPageSelect"
            class="mb-0"
          >
            Per Page
            <b-form-select
              v-model="perPage"
              id="perPageSelect"
              size="sm"
              :options="pageOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>

        <b-col sm="7" md="12" class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
            variant="secondary"

          ></b-pagination>
        </b-col>
      </b-row>


      <b-table
        class="table-dark"
        :items="items"
        :fields="fields"
        caption-top
        show-empty
        stacked="md"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filterIncludedFields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        @filtered="onFiltered"
        >

        <template v-slot:cell(createdAt)="row">
          {{ row.item.createdAt | date }}
        </template>

        <template v-slot:cell(name)="row">
          {{ row.item.name }}
        </template>

        <template v-slot:cell(categories)="row">
          {{ row.item.categories.results.length }} Categories
        </template>

        <template v-slot:cell(items)="row">
          {{ row.item.items.results.length }} Menu Items
        </template>

        <template v-slot:cell(MoreInfo)="row">
          <b-button size="sm" @click="menuInfo(row.item, $event.target)" class="mr-1 btn btn-secondary">
            Menu Details
          </b-button>
        </template>

        <template v-slot:cell(Edit)="row">
          <b-button size="sm" @click="edit(row.item, $event.target)" class="mr-1 btn btn-success">
            Edit
          </b-button>
        </template>

        <template v-slot:cell(Delete)="row">
          <b-button size="sm" @click="handleDeleteMenu(row.item.id)" class="mr-1 btn btn-danger">
            Delete
          </b-button>
        </template>

      </b-table>
      <!-- Info modal -->
      <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
        <pre>{{ infoModal.content }}</pre>
      </b-modal>

      <!-- Menu modal -->
      <b-modal :id="menuModal.id" :title="menuModal.title" ok-only  @hide="resetMenuModal">
        <div class="container">
          <div class="row">
            <div class="col-2">
            </div>
            <div class="col">
              <div v-for="menu in menuModal.menu" :key="menu.id">
                 <h4>{{ menu.name }}</h4>
                  <div v-for="innerMenu in menu.selectedItems"  :key="innerMenu.id">
                    <h6>{{ innerMenu.name }}</h6>
                  </div>
              </div>
            </div>
            <div class="col-2">
            </div>
          </div>
        </div>
      </b-modal>

      <!-- EDIT FORM {  } -->
      <b-modal
        ref="edit-modal-view"
        :id="editModal.modalId"
        :title="editModal.title"
        ok-only
        ok-variant="secondary"
        ok-title="Edit Menu"
        @hide="handleEditMenu"
      >
        <b-form @submit.prevent="handleEditMenu">
            <b-form-group
              id="input-group-1"
              label="Event Name:"
              label-for="input-1">

              <b-form-input
                id="input-1"
                v-model="editModal.name"
                type="text"
                required
                placeholder="Enter Event Name">
              </b-form-input>


              <b-form-group id="input-group-2" label="Description:" label-for="input-2">
                <b-form-textarea
                  id="input-2"
                  v-model="editModal.description"
                  required
                  placeholder="Enter Description"
                ></b-form-textarea>
              </b-form-group>

              <div>
                 <label class="typo__label">Edit Categories</label>
                 <multiselect
                   v-model="editModal.categories.results"
                   placeholder="Search"
                   label="name"
                   track-by="name"
                   :options="categories"
                   :multiple="true"
                   >
                 </multiselect>
                 <pre></pre>
               </div>

               <div>
                  <label class="typo__label">Edit Items</label>
                  <multiselect
                    v-model="editModal.items.results"
                    placeholder="Search"
                    label="name"
                    track-by="name"
                    :options="menuItems | filterItems(editModal.categories.results)"
                    :multiple="true"
                    >
                  </multiselect>
                  <pre></pre>
                </div>

              <b-button type="submit" variant="secondary"> Edit Menu </b-button>

             </b-form-group>
           </b-form >
      </b-modal>


    </b-container>
  </div>
</template>

<script>
import menuHelper from '@/helpers/menuHelper'

  export default {
    props: {
      items: {
        type: Array,
        required: true,
      },
      fields: {
        type: Array,
        required: true,
      },
      categories: {
        type: Array,
        required: true,
      },
      menuItems: {
        type: Array,
        required: true,
      },
    },
    data () {
      return {
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        },
        menuModal: {
          id: 'menu-modal',
          title: '',
          content: ''
        },
        editModal: {
          editId: '',
          modalId: 'edit-modal',
          name: '',
          description: '',
          categories: { results: [] },
          items: { results: [] },
        },
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 20],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
      };
    },
    methods: {

      edit(item, button) {
        this.editModal.editId = item.id
        this.editModal.name = item.name
        this.editModal.title = `Edit ${item.name}`
        this.editModal.description = item.description
        this.editModal.categories.results = item.categories.results
        this.editModal.items.results = item.items.results
        this.$root.$emit('bv::show::modal', this.editModal.modalId, button)
      },
      resetInfoModal() {
        this.infoModal = {
          id: 'info-modal',
          title: '',
          content: ''
        }
      },
      resetEditModal() {
        this.editModal = {
          editId: '',
          modalId: 'edit-modal',
          name: '',
          description: '',
          categories: { results: [] },
          items: { results: [] },
        }
      },
      info(item, index, button) {
        this.infoModal.title = `${item.name} Details`
        const formatString =
        `
         Menu Details:
         Name: ${item.name}
         Description: ${item.description}
         Categories: ${item.categories.results.length}
         Menu Items: ${item.items.results.length}
        `
        this.infoModal.content = formatString;
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },

      menuInfo(item, button) {
        console.log(item);
        this.menuModal.title = `${item.name} Menu Info Details`
        this.menuModal.content = item;
        this.menuModal.menu =  menuHelper(item);
        this.$root.$emit('bv::show::modal', this.menuModal.id, button)
      },

      resetMenuModal() {
        this.menuModal.title = ''
        this.menuModal.content = ''
        this.menuModal.menu = ''
      },

      infoRaw(item) {
        this.infoModal.title = `${item.name} Details`
        const formatString =
        `
         Menu Details
         Name: ${item.name}
         Description: ${item.description}
         Categories: ${item.categories.results.length}
         Menu Items: ${item.items.results.length}
        `
        return formatString;
      },
      onFiltered(filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      handleEditMenu(){
        const dataToEdit = {
          name: this.editModal.name,
          description: this.editModal.description,
          categories: this.editModal.categories,
          items: this.editModal.items
        }
        // /* // menuId, menuDataToUpdate
          this.$store.dispatch("menu/editMenu", {
            menuId: this.editModal.editId,
            menuDataToUpdate: dataToEdit
          })
          .then(() => {
            console.log("===Edited====");
            this.$refs['edit-modal-view'].hide();
          }).catch(() => {
            console.log("===Edit Failed====");
          })
          // */
      },
      handleDeleteMenu(id){
        const con = confirm("Are You Sure You want To Delete This ?")
        if (con) {
          this.$store.dispatch("menu/deleteMenu", id)
          .then(() => {
            console.log("===Deleted====");
          }).catch(() => {
            console.log("===Delete Failed====");
          })
        } else {
          console.log("===Didnt Go Through With Delete===");
        }
      },
    },

    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
      console.log(this.totalRows);
    },

    computed: {
      sortOptions() {
        // Create an  option s list from  our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
}
</script>

<style media="screen" scoped>
.page-item.active .page-link {
  background-color: red !important;
  border-color: red !important;
}
</style>

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

        <template v-slot:cell(createdAt)="data">
          {{ data.item.createdAt | date }}
        </template>

        <template v-slot:cell(Edit)="row">
          <b-button size="sm" @click="edit(row.item, $event.target)" class="mr-1 btn btn-primary">
            Edit
          </b-button>
        </template>

        <template v-slot:cell(Delete)="row">
          <b-button size="sm" @click="handleDelete(row.item.id)" class="mr-1 btn btn-danger">
            Delete
          </b-button>
        </template>

      </b-table>
      <!-- Info modal -->
      <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
        <pre>{{ infoModal.content }}</pre>
      </b-modal>

      <b-modal
        ref="edit-modal-view"
        :id="editModal.modalId"
        :title="editModal.title"
        ok-only
        @hide="resetEditModal"
      >
        <b-form @submit="handleEditEvent">
            <b-form-group
              id="input-group-1"
              label="Event Name:"
              label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="editModal.name"
                type="text"
                required
                placeholder="Enter Category Name">
              </b-form-input>

              <b-form-group id="input-group-2" label="Description:" label-for="input-2">
                <b-form-textarea
                  id="input-2"
                  v-model="editModal.description"
                  required
                  placeholder="Enter Description"
                ></b-form-textarea>
              </b-form-group>

              <b-button type="submit" variant="secondary"> Edit Category </b-button>
             </b-form-group>
           </b-form >
      </b-modal>

    </b-container>
  </div>
</template>

<script>
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
    },
    data () {
      return {
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        },
        editModal: {
          modalId: 'edit-modal',
          name: '',
          description: '',
          editId: '',
          title: ''
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
      info(item, index, button) {
        this.infoModal.title = `${item.name} Details`
        const formatString =
        `
         Event Details:
         Title: ${item.name}
         Location: ${item.description}
        `
        this.infoModal.content = formatString;
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      handleDelete(id){
        const con = confirm("Are You Sure You want To Delete This ?")
        if (con) {
          this.$store.dispatch("category/deleteCategory", id)
          .then(() => {
            console.log("===Deleted====");
          }).catch(() => {
            console.log("===Delete Failed====");
          })
        } else {
          console.log("===Didnt Go Through With Delete===");
        }
      },
      edit(item, button){
        this.editModal.name = item.name
        this.editModal.editId = item.id
        this.editModal.title = `Edit ${item.name}`
        this.editModal.description = item.description
        this.$root.$emit('bv::show::modal', this.editModal.modalId, button)
      },
      handleEditEvent(e){
        e.preventDefault();
        const categoryId = this.editModal.editId
        const categoryDataToUpdate = {
          name: this.editModal.name,
          description: this.editModal.description,
        }
        this.$store.dispatch("category/editCategory", { categoryId, categoryDataToUpdate })
        .then(() => {
          console.log("===Edited====");
          this.$refs['edit-modal-view'].hide();
        }).catch(() => {
          this.buttonText = "Failed..."
          console.log("===Edit Failed====");
        })
      },
      resetEditModal(){
        this.editModal = {
          modalId: 'edit-modal',
          name: '',
          description: '',
          editId: '',
          title: ''
        }
      }
    },

    mounted() {
      this.totalRows = this.items.length
      console.log(this.totalRows);
    },

    computed: {
      sortOptions() {
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

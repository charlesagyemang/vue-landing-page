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



        <template v-slot:cell(Date)="data">
          {{ data.item.createdAt | date }}
        </template>

        <template v-slot:cell(EventName)="data">
          {{ data.item.name }}
        </template>

        <template v-slot:cell(Description)="data">
          {{ data.item.description}}
        </template>

        <template v-slot:cell(menu)="data">
          {{ data.item.menu.categories.results.length }} categories ,
          {{ data.item.menu.items.results.length }} Items <br />
          <b-button size="sm" @click="menuInfo(data.item.menu, $event.target)" class="mr-1 btn btn-success">
            View Menu
          </b-button>

        </template>

        <template v-slot:cell(groupings)="data">
          {{ data.item.groupings.results.slice(0, 2).join(" , ")}}...<br>
          <b-button size="sm" @click="handleResponseLinkRequest(data.item.id)" class="mr-1 btn btn-info">
            Responses Form
          </b-button><br>
          <div v-if="data.item.responses.length > 0" class="">
            <b-button size="sm" @click="handleLiveResponseLinkRequest(data.item.id)" class="mr-1 btn btn-secondary">
              Live Responses
            </b-button>
          </div>

        </template>

        <template v-slot:cell(MoreInfo)="row">
          <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1 btn btn-success">
            Full Details
          </b-button>
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
        <div  v-if="infoModal.content" class="container">
          <div class="row">
            <div class="col-2">
            </div>
            <div class="col-8">
              <h3>{{ infoModal.content.name }}</h3>
              <h6>{{ infoModal.content.groupings.results.join(" , ")}}</h6>
              <h4>{{ infoModal.content.menu.name }}</h4>
              <div v-for="menu in infoModal.menu" :key="menu.id">
                 <h5>{{ menu.name }}</h5>
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

      <!-- Menu modal -->
      <b-modal :id="menuModal.id" :title="menuModal.title" ok-only @hide="resetMenuModal">
        <div class="container">
          <div class="row">
            <div class="col-2">
            </div>
            <div class="col">
              <h1>{{ menuModal.content.name }}</h1>
              <div v-for="menu in menuModal.menu" :key="menu.id">
                 <h5>{{ menu.name }}</h5>
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
                placeholder="Enter Event Name">
              </b-form-input>

              <div>
                <label for="tags-pills">Enter Groups</label>
                <b-form-tags
                  input-id="tags-pills"
                  v-model="editModal.groupings.results"
                  tag-variant="primary"
                  tag-pills
                  separator=""
                  placeholder="Enter group name and hit enter"
                  class="mb-2"
                ></b-form-tags>
                <p></p>
              </div>

              <b-form-group id="input-group-2" label="Description:" label-for="input-2">
                <b-form-textarea
                  id="input-2"
                  v-model="editModal.description"
                  required
                  placeholder="Enter Description"
                ></b-form-textarea>
              </b-form-group>
              <p> Menu:=> {{ editModal.menu.name }}</p>

              <b-button type="submit" variant="secondary"> {{ buttonText }} </b-button>

             </b-form-group>
           </b-form >
      </b-modal>

    </b-container>
  </div>
</template>

<script>
import menuHelper from '@/helpers/menuHelper'
import store from '@/store/store'

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
        buttonText: 'Edit Event',
        eventToDeleteID: '',
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
          modalId: 'edit-modal',
          name: '',
          editId: '',
          description: '',
          menu: {},
          menuId: '',
          groupings: { results: [] },
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
        this.infoModal.content = item;
        this.infoModal.menu =  menuHelper(item.menu);
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },

      menuInfo(item, button) {
        console.log(item);
        this.menuModal.title = `${item.name} Menu Info Details`
        this.menuModal.content = item;
        this.menuModal.menu =  menuHelper(item);
        this.$root.$emit('bv::show::modal', this.menuModal.id, button)
      },

      edit(item, button) {
        this.editModal.name = item.name
        this.editModal.editId = item.id
        this.editModal.title = `Edit ${item.name}`
        this.editModal.description = item.description
        this.editModal.menu = item.menu
        this.editModal.menuId = item.menuId
        this.editModal.groupings = item.groupings
        this.buttonText = "Edit Event"
        this.$root.$emit('bv::show::modal', this.editModal.modalId, button)
      },

      infoRaw(item) {
        this.infoModal.title = `${item.name} Details`
        const formatString =
        `
        <h1>Event Details:</h1>
        Name: ${item.name}
        Description: ${item.description}
        Menu Name: ${item.menu.name}
        Menu Categories: ${item.menu.categories.results.length}
        Menu Items: ${item.menu.items.results.length}
        `
        return formatString;
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
        this.infoModal.data = ''
        this.infoModal.menu = ''
      },

      resetMenuModal() {
        this.menuModal.title = ''
        this.menuModal.content = ''
        this.menuModal.menu = ''
      },

      resetEditModal() {
        this.editModal.name = ''
        this.editModal.description = ''
        this.editModal.menu = ''
        this.editModal.menuId = ''
        this.editModal.groupings = ''
        this.editModal.content = ''
        this.editModal.eventId = ''
      },
      onFiltered(filteredItems) {
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      handleEditEvent(evt){
        evt.preventDefault(evt);
        this.buttonText = "Updating..."
        const eventId = this.editModal.editId;
        const eventDataToUpdate = {
          name: this.editModal.name,
          description: this.editModal.description,
          groupings: this.editModal.groupings
        }
        this.$store.dispatch("event/editEvent", { eventId, eventDataToUpdate})
        .then(() => {
          console.log("===Edited====");
          this.buttonText = "success..."
          this.$refs['edit-modal-view'].hide()
        }).catch(() => {
          this.buttonText = "Failed..."
          console.log("===Edit Failed====");
        })
      },
      handleDelete(id){
        const con = confirm("Are You Sure You want To Delete This ?")
        if (con) {
          this.$store.dispatch("event/deleteEvent", id)
          .then(() => {
            console.log("===Deleted====");
          }).catch(() => {
            console.log("===Delete Failed====");
          })
        } else {
          console.log("===Didnt Go Through With Delete===");
        }
      },
      handleResponseLinkRequest(id){
        this.$router.push({
          name: "create-response",
          params: { id },
        });
        // console.log(id);
      },
      handleLiveResponseLinkRequest(id){
        this.$router.push({
          name: "live-responses",
          params: { id },
        });
      },
    },

    mounted() {
      this.totalRows = this.items.length
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

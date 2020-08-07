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

        <template v-slot:cell(Name)="data">
          {{ data.item.name }}
        </template>

        <template v-slot:cell(Item)="data">
          {{ data.item.item }}
        </template>

        <template v-slot:cell(Group)="data">
          {{ data.item.group }}
        </template>

      </b-table>

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
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        pageOptions: [5, 10, 15, 20, 25, 30, 50],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
      };
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

    methods: {
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
      console.log(this.totalRows);
    },

}
</script>

<style media="screen" scoped>
.page-item.active .page-link {
  background-color: red !important;
  border-color: red !important;
}
</style>

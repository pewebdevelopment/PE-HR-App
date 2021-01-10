<template>
  <div>
    <card>
      <b-container fluid>
        <!-- User Interface controls -->
        <b-row>
          <b-col lg="6" class="my-0">
            <b-form-group
              label="Filter"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              label-for="filterInput"
              class="mb-0"
            >
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
        </b-row>

        <!-- Main table element -->
        <b-table
          show-empty
          small
          stacked="md"
          :items="candidates"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :filter-included-fields="filterOn"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered"
        >
          <template v-slot:cell(name)="row">
            {{ row.value.first }} {{ row.value.last }}
          </template>

          <template v-slot:cell(actions)="row">
            <b-button size="sm" @click="row.toggleDetails">
              {{ row.detailsShowing ? "Hide" : "Show" }} Details
            </b-button>
          </template>

          <template v-slot:row-details="row">
            <b-card>
              <ul>
                <li v-for="(value, key) in row.item" :key="key">
                  {{ key }}: {{ value }}
                </li>
              </ul>
            </b-card>
          </template>
        </b-table>
        <b-row>
          <b-col sm="7" md="6" class="my-1">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="fill"
              size="sm"
              class="my-0"
            ></b-pagination>
          </b-col>
          <b-col sm="5" md="6" class="my-1">
            <b-form-group
              label="Per page"
              label-cols-sm="6"
              label-cols-md="4"
              label-cols-lg="3"
              label-align-sm="right"
              label-size="sm"
              label-for="perPageSelect"
              class="mb-0"
            >
              <b-form-select
                class="bg-dark"
                v-model="perPage"
                id="perPageSelect"
                size="sm"
                :options="pageOptions"
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>

        <!-- Info modal -->
        <b-modal
          :id="infoModal.id"
          :title="infoModal.title"
          ok-only
          @hide="resetInfoModal"
        >
          <pre> {{ infoModal.content }} </pre>
        </b-modal>
      </b-container>
    </card>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "google",
  apollo: {
    /*vacancies: gql`
      query {
        vacancies {
          vacancyPost
          noOfOpenings
          stipend
          perks
        }
      }
    `,
    vacancy: gql`
      query {
        vacancy(vacancyId: "5ff7496415c78b35ec6ac22f") {
          vacancyPost
        }
      }
    `,*/
    candidates: gql`
      query {
        candidates {
          candidateId
          candidateName
          email
          phoneNo
          address
          ugCollege
          ugSpecialization
          ugTo
          ugFrom
          ugPercentage
          sslcSchool
          sslcBoard
          sslcTo
          sslcFrom
          sslcPercentage
          hseTo
          hseFrom
          hseBoard
          hseSchool
          hsePercentage
          hseSpecialization
          skills
        }
      }
    `,
    /* query{
  responses{
  	githubId
    vacancyId
    candidateId
    assessmentAns
    projectsLinks
    
	}
}*/
  },
  data() {
    return {
      fields: [
        {
          key: "candidateName",
          label: "Candidate Name",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "email",
          label: "Candidate Email",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "phoneNo",
          label: "Candidate Mobile",
          sortable: true,
          sortDirection: "desc",
        },

        { key: "actions", label: "Actions" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {},
  methods: {
    info(item, index, button) {
      this.totalRows = this.candidates.length;
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(candidates, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>
<style lang="scss">
.card-map {
  min-height: 350px;
  .map {
    height: 300px;
    width: 100%;
  }
}
</style>

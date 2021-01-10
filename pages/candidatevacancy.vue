<template>
  <div>
    <div class="header">
      <h1>VACANCIES</h1>
    </div>
    <div class="vacancies-list">
      <ul>
        <li v-for="vac in vacancies" :key="vac.id">
          <b-row class="my-1">
            <b-col sm="2"></b-col>
            <b-col sm="7">
              <card>
                <h4>{{ vac.vacancyPost }}</h4>
                <h4>
                  <p class="text-muted">{{ vac.vacancyId }}</p>
                </h4>
                <hr />
                <b-row>
                  <b-col sm="3">Start Date</b-col>
                  <b-col sm="3"><h5>20/01/2021</h5></b-col>
                  <b-col sm="3">Apply by </b-col>
                  <b-col sm="3"><h5>10/01/2021</h5></b-col>
                </b-row>
                <br />
                <b-row>
                  <b-col sm="4"
                    >Number of Openings<br /><br />
                    <h6>{{ vac.noOfOpenings }}</h6></b-col
                  >
                  <b-col sm="3"
                    >Duration<br /><br />
                    <h6>{{ vac.duration }} Month</h6></b-col
                  >
                  <b-col sm="3"
                    >Skills <br /><br />
                    <h6>{{ vac.skillsRequired }}</h6></b-col
                  >
                  <b-col sm="3"
                    >perks <br /><br />
                    <h6>{{ vac.perks }}</h6></b-col
                  >
                </b-row>

                <hr />
                <b-row>
                  <b-col sm="9"></b-col>
                  <b-col sm="3">
                    <nuxt-link to="/candidate"
                      ><b-button sm="3" variant="info">Apply</b-button></nuxt-link
                    >
                  </b-col>
                </b-row>
              </card>
            </b-col>
          </b-row>
        </li>
      </ul>
      <div></div>
    </div>
  </div>
</template>

<script>
import { BaseAlert } from "@/components";
import gql from "graphql-tag";
export default {
  name: "candidates",
  data() {
    return {
      vacancID: undefined,
      UpvacancyPost: undefined,
      UpnoOfOpenings: undefined,
      Upstipend: undefined,
      perks: [],
      Upduration: undefined,
      UpaboutPost: undefined,
      UpskillsRequired: [],
      Upstatus: true,
      value1: false,
      Upvalue2: "",
      Upvalue3: "",
      upvacancy: [],
    };
  },
  mounted() {},

  components: {
    BaseAlert,
  },
  apollo: {
    vacancies: gql`
      query getVacancies {
        vacancies {
          vacancyId
          vacancyPost
          noOfOpenings
          stipend
          perks
          duration
          aboutPost
          skillsRequired
        }
      }
    `,
  },
  methods: {},
};
</script>

<style>
.header {
  text-align: center;
}

.header h1 {
  display: inline-block;
}

.vacancies-list ul {
  list-style-type: none;
}

.vacancy {
  padding: 23px;
  margin-bottom: 24px;
  border: 1px solid rgb(126, 114, 232);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
}
.vacancy-header {
  margin-bottom: 8px;
  font-size: 18px;
  line-height: 1.33333333;
  font-weight: 600;
}

.add-vacancy {
  position: relative;
  float: right;
  right: 20px;
  top: 10px;
}
</style>

<template>
  <div>
    <div class="header">
      <h1>VACANCIES</h1>
      <nuxt-link to="/addVancany"
        ><b-button class="float-right">Add Vacancy</b-button></nuxt-link
      >
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
                  <b-col sm="3"><h5>{{vac.startDate}}</h5></b-col>
                  <b-col sm="3">Apply by </b-col>
                  <b-col sm="3"><h5>{{vac.deadlineDate}}</h5></b-col>
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
                    <h6 v-for="(items, index) in vac.skillsRequired" :key="index">
                      {{ items }}
                    </h6></b-col
                  >
                  <b-col sm="2"
                    >perks <br /><br />
                    <h6 v-for="(items, index) in vac.perks" :key="index">
                      {{ items }}
                    </h6>
                  </b-col>
                  <b-col sm="12"
                    >About Post <br /><br />

                    <h6>{{ vac.aboutPost }}</h6></b-col
                  >
                </b-row>

                <hr />
                <b-row>
                  <b-col sm="3">
                    <b-button sm="3" @click="deletevacancy(vac.vacancyId)"
                      >Delete</b-button
                    >
                  </b-col>
                  <b-col sm="6"></b-col>
                  <b-col sm="3">
                    <b-button sm="3" variant="info" @click="showEditVacancy(vac.vacancyId)"
                      >Edit</b-button
                    ></b-col
                  >
                </b-row>
              </card>
            </b-col>
          </b-row>
        </li>
      </ul>
      <div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { BaseAlert } from "@/components";
import gql from "graphql-tag";
import showAnswersVue from './showAnswers.vue';
export default {
  name: "candidates",
  data() {
    return {
      
      vacancies:undefined
    };
  },
  mounted() {
    if(localStorage.getItem('access')&&localStorage.getItem('idToken')&&localStorage.getItem('accessToken')&&localStorage.getItem('refreshToken')){
    this.getadminvacancy()
    }
    else{
      this.$router.push("/login");
    }
  },

  components: {
    BaseAlert,
  },
 
  methods: {
    async showEditVacancy(id){
      this.$router.push('/editVacancy?vacancyId='+id)
    },
    async deletevacancy(id) {
      const result = await this.$apollo.mutate({
        mutation: gql`
          mutation($vacancyId: ID!) {
            vacancyDelete(vacancyId: $vacancyId) 
          }
        `,
        variables: {
          vacancyId: id,
        },
      });
      this.$router.push("/Vacancies");
    },
    async getadminvacancy() {
   
      const results = await this.$apollo.mutate({
        mutation: gql`
          mutation getadminvacancies {
        adminVacancy {
          vacancyId
          vacancyPost
          noOfOpenings
          stipend
          perks
          duration
          aboutPost
          skillsRequired
          startDate
          deadlineDate
        }
      }
        `,
        variables: {
        },
      });
      console.log("results")
      this.vacancies=results.data.adminVacancy
    },
  
    showmodal() {
      this.$refs["updateform"].show();
    },
    hidemodal() {
      this.$refs["updateform"].hide();
    },
  },
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

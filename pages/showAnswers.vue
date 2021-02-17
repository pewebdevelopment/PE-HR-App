<template>
  <div>
    <div class="header">
      <h1>{{vacancyPost}}</h1>
    </div>
    <div class="vacancies-list">
    
         <b-container fluid>
      <div v-for="(round,index) in rounds" :key="index">

        <h3>{{"Round "+(index+1)}}</h3>
        <div v-for="(question,index1,) in round" :key="index1">

        <b-row class="my-1">
            <b-col sm-2>
              <label for="input-default">{{question}}</label>
            </b-col>
          </b-row>
        <b-row class="my-1">
          <b-col sm="7">
            <b-form-textarea
              required
              v-model="answers[index][index1]"
              id="textarea-default"
              placeholder="Enter Your Answer Here"
            ></b-form-textarea>
            
          </b-col>
        </b-row>
                </div>
        </div>
    </b-container>
        
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
      rounds:undefined,
      answers:undefined,
      project: [],
      vacancyid:"",
      responseid:this.$router.currentRoute.query['responseId'],
      githubid: "",
      vacancyPost:""
    };
  },
  mounted() {
    if(localStorage.getItem('access')&&localStorage.getItem('idToken')&&localStorage.getItem('accessToken')&&localStorage.getItem('refreshToken')){
      this.get(this.responseid)
    }
    else{
      this.$router.push("/login");
    }
  },

  components: {
    BaseAlert,
  },

  methods: {
    async getVac(id) {
        const result = await this.$apollo.mutate({
        mutation: gql`
          mutation($vacancyId: ID!) {
            vacancy(vacancyId: $vacancyId) {
              vacancyPost
              rounds
            }
          }
        `,
        variables: {
          vacancyId: id,
        },
      });
      (this.vacancyPost = result.data.vacancy.vacancyPost),
      (this.rounds=result.data.vacancy.rounds)
      console.log(this.rounds)
    },
    async get(id) {
        const result = await this.$apollo.mutate({
        mutation: gql`
          mutation($responseId: ID!) {
            response(responseId: $responseId) {
              roundsAnswers
              vacancyId
            }
          }
        `,
        variables: {
          responseId: id,
        },
      });
      (this.answers=result.data.response.roundsAnswers)
      console.log(this.answers)
      await this.getVac(result.data.response.vacancyId)
      
    },
    async addresponse() {
      console.log(this.answers)
      console.log(this.githubid)
      console.log(this.project)
      const results = await this.$apollo.mutate({
        mutation: gql`
          mutation(
            $vacancyId: ID!
            $githubId: String!
            $projectsLinks: [String]!
            $roundsAnswers:[[String]!]!
          ) {
            addResponse(
              vacancyId: $vacancyId
              githubId: $githubId
              projectsLinks: $projectsLinks
              roundsAnswers:$roundsAnswers
            ) 
          }
        `,
        variables: {
          vacancyId: this.vacancyid,
          githubId: this.githubid,
          projectsLinks: this.project,
          roundsAnswers:this.answers
        },
      });
      console.log(results);
      this.$router.push("/candidateresponse");
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

<template>
  <div>
    <div class="header">
      <h1>{{vacancyPost}}</h1>
    </div>
    <div class="vacancies-list">
      <ul>
        <li>
          <b-row class="my-1">
            <b-col sm-2>
              <label for="input-default">Github Link:</label>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <b-col sm="7">
              <b-form-input
                  required
                  v-model="githubid"
                  type="text"
                  id="input-default"
                  placeholder="Enter GitHub Id"
                ></b-form-input>
            </b-col>
          </b-row>
          <hr/>

          <b-row class="my-1">
            <b-col sm-2>
              <label for="input-default">Projects:</label>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <b-col sm="7">
              <b-form-tags
                required
                input-id="tags-pills"
                v-model="project"
                tag-variant="dark"
                tag-pills
                size="lg"
                separator=" "
                placeholder="Enter new projects separated by space"
              ></b-form-tags>
            </b-col>
          </b-row>
         
        </li>
      </ul>


    
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

        <b-row class="my-1">
          <b-col sm="3"> </b-col>
          <b-col sm="3">
            <b-button @click="addresponse()">Submit</b-button>
          </b-col>
        </b-row>
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
      answers:[],
      project: [],
      vacancyid:this.$router.currentRoute.query['vacancyId'],
      githubid: "",
      vacancyPost:""
    };
  },
  mounted() {
    if(localStorage.getItem('access')&&localStorage.getItem('idToken')&&localStorage.getItem('accessToken')&&localStorage.getItem('refreshToken')){
      this.get(this.vacancyid)
    }
    else{
      this.$router.push("/login");
    }
  },

  components: {
    BaseAlert,
  },

  methods: {
    async get(id) {
         
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
      for(var i=0;i<this.rounds.length;i++){
           this.answers.push([])
           for(var j=0;j<this.rounds[i].length;j++){
             this.answers[i].push("")
           }
         }
            console.log(result.data.vacancy.rounds)
            console.log(this.answers)


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

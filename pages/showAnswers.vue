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
        <h3>Skills Rating</h3>
        <label for="input-default">Rate your skills from 0 to 100</label>
        <div v-for="(skill,index) in skills" :key="index">
              <label for="input-default">{{skill}}</label>
              <b-row class="my-1">
                <b-col sm="7">
                  <b-form-input
                    required
                    v-model="skillsRating[index]"
                    id="textarea-default"
                    placeholder="Enter Your Answer Here"
                    type="number"
                  ></b-form-input> 
                </b-col>
                
              </b-row>
             
          </div>
          <div >
            <h3>Rating the response</h3>
            <label for="input-default">Rating the response</label>
             <b-row class="my-1">
          <b-col sm="7">
            <b-form-input
              required
              v-model="rating"
              id="textarea-default"
              placeholder="Enter rating Here"
              type="number"
            ></b-form-input>
            
          </b-col>
        </b-row>
            <label for="input-default">comment on response</label>
             <b-row class="my-1">
          <b-col sm="7">
            <b-form-textarea
              required
              v-model="comment"
              id="textarea-default"
              placeholder="Enter comment Here"
            ></b-form-textarea>
            
          </b-col>
        </b-row>
         <v-alert
              type="error"
              dense
              outlined
            >{{ err }}</v-alert>
         <b-row class="my-1">
          
          <b-col sm="3"> </b-col>
          <b-col sm="3">
            <b-button v-if =" role === 'admin' " @click="rate()">Submit</b-button>
          </b-col>
        </b-row>
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
      vacancyPost:"",
      skillsRequired:undefined,
      skillsRating:undefined,
      role:'No Access',
      rating:0,
      comment:"",
      err:""
    };
  },
  mounted() {
    if(localStorage.getItem('access')&&localStorage.getItem('idToken')&&localStorage.getItem('accessToken')&&localStorage.getItem('refreshToken')){
      this.get(this.responseid)
      this.role = localStorage.getItem('access') || "No Access"

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
              skillsRequired
            }
          }
        `,
        variables: {
          vacancyId: id,
        },
      });
      (this.vacancyPost = result.data.vacancy.vacancyPost),
      (this.rounds=result.data.vacancy.rounds),
      (this.skills=result.data.vacancy.skillsRequired)
      console.log(this.skills)
    },
    async get(id) {
        const result = await this.$apollo.mutate({
        mutation: gql`
          mutation($responseId: ID!) {
            response(responseId: $responseId) {
              roundsAnswers
              vacancyId
              skillsRating
              comment
              rating
            }
          }
        `,
        variables: {
          responseId: id,
        },
      });
      (this.answers=result.data.response.roundsAnswers),
      (this.skillsRating=result.data.response.skillsRating),
      (this.rating=result.data.response.rating),
      (this.comment=result.data.response.comment)
      console.log(this.skillsRating)
      await this.getVac(result.data.response.vacancyId)
      
    },
    async rate(){
      if(this.comment!=""){
        if(this.rating>=0&&this.rating<=100){
          const result = await this.$apollo.mutate({
            mutation: gql`
              mutation(
                $responseId: ID!
                $comment:String!
                $rating:Int!
                ) {
                rateResponse(
                  responseId: $responseId
                  comment:$comment
                  rating:$rating
                ) 
              }
            `,
            variables: {
              responseId: this.responseid,
              rating:parseInt(this.rating),
              comment:this.comment
            },
          });
      this.$router.push("/candidateresponse");
        }
        else{
          this.err="Rating should be between 0 and 100"
        }
      }
      else{
        this.err="Comment required"
      }
    }
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

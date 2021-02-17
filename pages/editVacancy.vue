<template>
  <div>
    <b-container fluid>
      <h3>New Vacancy</h3>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Vacancy Post:</label>
        </b-col>
        <b-col sm="7">
          <b-form-input
            required
            v-model="UpvacancyPost"
            type="text"
            id="input-default"
            placeholder="Enter vacancy post"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Total openings:</label>
        </b-col>
        <b-col sm="7">
          <b-form-input
            required
            v-model="UpnoOfOpenings"
            type="number"
            id="input-default"
            placeholder="Enter total openings"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Stipend:</label>
        </b-col>
        <b-col sm="7">
          <b-form-input
            required
            v-model="Upstipend"
            type="number"
            id="input-default"
            placeholder="Enter stipend per month"
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row class="my-3">
        <b-col sm="2"></b-col>
        <b-col sm="1">
          <b-form-checkbox v-model="value1" value="true">Perks</b-form-checkbox>
        </b-col>
      </b-row>
      <b-row class="my-2">
        <b-col sm="2"></b-col>
        <b-col sm="1">
          <b-form-checkbox v-if="value1"   v-model="Upvalue2" value="Letter"
            >Letter</b-form-checkbox
          >
        </b-col>
      </b-row>
      <b-row class="my-3">
        <b-col sm="2"></b-col>
        <b-col sm="1">
          <b-form-checkbox v-if="value1" v-model="Upvalue3" value="Certificate"
            >Certificate</b-form-checkbox
          >
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Duration:</label>
        </b-col>
        <b-col sm="7">
          <b-form-input
            required
            v-model="Upduration"
            type="number"
            id="input-default"
            placeholder="Enter duration in months"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Start Date:</label>
        </b-col>
        <b-col sm="7">
          <b-form-input
            required
            v-model="startDate"
            type="date"
            id="input-default"
            placeholder="Enter Starting Date"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Deadline Date:</label>
        </b-col>
        <b-col sm="7">
          <b-form-input
            required
            v-model="deadlineDate"
            type="date"
            id="input-default"
            placeholder="Enter Deadline Date"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">About Post:</label>
        </b-col>
        <b-col sm="7">
          <b-form-textarea
            required
            v-model="UpaboutPost"
            id="textarea-default"
            placeholder="Enter post description"
          ></b-form-textarea>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Skills Required:</label>
        </b-col>
        <b-col sm="7">
          <b-form-tags
            required
            input-id="tags-pills"
            v-model="UpskillsRequired"
            tag-variant="dark"
            tag-pills
            size="lg"
            separator=" "
            placeholder="Enter new skills separated by space"
          ></b-form-tags>
        </b-col>
      </b-row>
       <div>
            <b-button class="button btn-primary" @click="addRound()">Add Round</b-button>
        </div>
      <div v-for="(round,index) in rounds" :key="index">
        <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">{{"Round "+(index+1)}}</label>
        </b-col>
        <b-col sm="7">
          
          <div>
            <b-button class="button btn-primary" @click="addQuestion(index)">{{"Add questions for round "+(index+1)}}</b-button>
          </div>
          <div v-for="(question,index1) in rounds[index]" :key="index1">
                  <b-row class="my-1">
              <b-col sm="2">
                <label for="input-default">{{"Question "+(index1+1)}}</label>
              </b-col>
              <b-col sm="7">
                <b-form-input
                  required
                  v-model="rounds[index][index1]"
                  type="text"
                  id="input-default"
                  placeholder="Enter Question"
                ></b-form-input>
              </b-col>
            </b-row>
           <!-- <label for="input-default">Question:</label>
            <input type="text" style="margin-top: 10px;" :id="question" required><br> -->    
          </div>  
        </b-col>
      </b-row>
         <!--<label for="input-default" >Round Title</label>
          <input type="text" style="margin-top: 10px;" v-model="round.name" :id="round.id" required><br>-->
          
             
      </div>
      <hr />
      <b-row class="my-1">
        <b-col sm="3"> </b-col>
        <b-col sm="3">
          <b-button @click="updatevacancy()">Submit</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import gql from "graphql-tag";
import index from "./index.vue";

export default {
  components: { index },
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
      startDate:undefined,
      deadlineDate:undefined,
      Upstatus: true,
      value1: false,
      Upvalue2: "",
      Upvalue3: "",
      upvacancy: [],
      rounds:[],
      roundsData:[],
      vacancyId:this.$router.currentRoute.query['vacancyId']
    };
  },
  mounted(){
    this.getvacancy(this.vacancyId)
  },
  name: "editVacancy",
  methods: {
    async addQuestion(index){
      
      this.rounds[index].push("");
    },
    async  addRound() {
     
      this.rounds.push([]);
    },
    async getvacancy(id) {
      this.vacancID = id;
      console.log(id);
      this.upvacancy = await this.$apollo.mutate({
        mutation: gql`
          mutation($vacancyId: ID!) {
            vacancy(vacancyId: $vacancyId) {
              vacancyPost
              noOfOpenings
              stipend
              perks
              duration
              aboutPost
              skillsRequired
              deadlineDate
              startDate
              rounds
            }
          }
        `,
        variables: {
          vacancyId: id,
        },
      });
        (this.startDate = this.upvacancy.data.vacancy.startDate),
        (this.deadlineDate = this.upvacancy.data.vacancy.deadlineDate),
        (this.UpvacancyPost = this.upvacancy.data.vacancy.vacancyPost),
        (this.UpnoOfOpenings = this.upvacancy.data.vacancy.noOfOpenings),
        (this.Upstipend = this.upvacancy.data.vacancy.stipend),
        (this.perks = this.upvacancy.data.vacancy.perks),
        (this.Upduration = this.upvacancy.data.vacancy.duration),
        (this.UpaboutPost = this.upvacancy.data.vacancy.aboutPost),
        (this.UpskillsRequired = this.upvacancy.data.vacancy.skillsRequired);
      if (this.perks) {
        this.value1 = true;
        if (this.perks.length > 1) {
          this.Upvalue2 = "Letter";
          this.Upvalue3 = "Certificate";
        } else if (this.perks[0] == "Letter") {
          this.UPvalue2 = "Letter";
        } else if (this.perks[0] == "Certificate") {
          this.Upvalue3 = "Certificate";
        }
      }
      (this.rounds=this.upvacancy.data.vacancy.rounds)
        console.log(this.upvacancy)
    },
     async updatevacancy() {
      console.log(this.vacancID);
      console.log(this.UpnoOfOpenings);
      console.log(this.UpvacancyPost);
      console.log(this.Upstipend);
      console.log(this.Upduration);
      console.log(this.UpaboutPost);
      console.log(this.UpskillsRequired);
      console.log(this.perks);
      this.perks = [];
      if (this.Upvalue2 && this.Upvalue3) {
        this.perks.push(this.Upvalue2);
        this.perks.push(this.Upvalue3);
      } else if (this.Upvalue3) {
        this.perks.push(this.Upvalue3);
      } else if (this.Upvalue2) {
        this.perks.push(this.Upvalue2);
      }
      const results = await this.$apollo.mutate({
        mutation: gql`
          mutation(
            $vacancyId: ID!
            $vacancyPost: String!
            $noOfOpenings: Int!
            $stipend: Int!
            $perks: [String]!
            $duration: Int!
            $aboutPost: String!
            $skillsRequired: [String]!
            $status: Boolean!
            $startDate:String!
            $deadlineDate:String!
            $rounds:[[String]!]!
          ) {
            vacancyUpdate(
              vacancyId: $vacancyId
              vacancyPost: $vacancyPost
              noOfOpenings: $noOfOpenings
              stipend: $stipend
              perks: $perks
              duration: $duration
              aboutPost: $aboutPost
              skillsRequired: $skillsRequired
              status: $status
              deadlineDate:$deadlineDate
              startDate:$startDate
              rounds:$rounds
            ) 
          }
        `,
        variables: {
          vacancyId: this.vacancyId,
          vacancyPost: this.UpvacancyPost,
          noOfOpenings: parseInt(this.UpnoOfOpenings),
          stipend: parseInt(this.Upstipend),
          perks: this.perks,
          duration: parseInt(this.Upduration),
          aboutPost: this.UpaboutPost,
          skillsRequired: this.UpskillsRequired,
          status: this.Upstatus,
          startDate:this.startDate,
          deadlineDate:this.deadlineDate,
          rounds:this.rounds
        },
      });
      this.$router.push("/Vacancies");

    }
  }
};
</script>
<style></style>

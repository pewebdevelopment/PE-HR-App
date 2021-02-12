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
            v-model="vacancyPost"
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
            v-model="noOfOpenings"
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
            v-model="stipend"
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
          <b-form-checkbox v-if="value1" v-model="value2" value="Letter"
            >Letter</b-form-checkbox
          >
        </b-col>
      </b-row>
      <b-row class="my-3">
        <b-col sm="2"></b-col>
        <b-col sm="1">
          <b-form-checkbox v-if="value1" v-model="value3" value="Certificate"
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
            v-model="duration"
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
            v-model="aboutPost"
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
            v-model="skillsRequired"
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
          <label for="input-default">Round Title</label>
        </b-col>
        <b-col sm="7">
          <b-form-input
            required
            v-model="round.name"
            type="text"
            id="input-default"
            placeholder="Enter Round Title"
          ></b-form-input>
          <div>
            <b-button class="button btn-primary" @click="addQuestion(index)">Add Question</b-button>
          </div>
          <div v-for="(question,index1,) in round.questions" :key="index1">
                  <b-row class="my-1">
              <b-col sm="2">
                <label for="input-default">Question</label>
              </b-col>
              <b-col sm="7">
                <b-form-input
                  required
                  v-model="question.value"
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
          <b-button @click="onSubmit">Submit</b-button>
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
      rounds: [],
      roundCount:0,
      vacancyPost: "",
      noOfOpenings: undefined,
      stipend: undefined,
      perks: [],
      startDate:undefined,
      deadlineDate:undefined,
      duration: undefined,
      aboutPost: "",
      skillsRequired: [],
      status: true,
      value1: false,
      value2: "",
      value3: "",
    };
  },
  name: "addVacancy",
  methods: {
    async addQuestion(index){
      console.log(this.rounds.length,this.rounds[index].questions.length);
      var txtCount=this.rounds[index].questions.length;
      var id='txt1_'+txtCount;
      this.rounds[index].questions.push({id,value:""});
    },
    async  addRound() {
      var txtCount=this.roundCount++;
      var id='txt_'+txtCount;
      this.rounds.push({ title: "first", description: "textbox1", id, name:"",questions:[] });
    },
    async onSubmit() {
      if (this.value2 && this.value3) {
        this.perks.push(this.value2);
        this.perks.push(this.value3);
      } else if (this.value3) {
        this.perks.push(this.value3);
      } else if (this.value2) {
        this.perks.push(this.value2);
      }
      console.log(this.perks);
      const result = await this.$apollo.mutate({
        mutation: gql`
          mutation(
            $vacancyPost: String!
            $noOfOpenings: Int!
            $stipend: Int!
            $perks: [String]!
            $duration: Int!
            $aboutPost: String!
            $skillsRequired: [String]!
            $status: Boolean!
          ) {
            addVacancy(
              vacancyPost: $vacancyPost
              noOfOpenings: $noOfOpenings
              stipend: $stipend
              perks: $perks
              duration: $duration
              aboutPost: $aboutPost
              skillsRequired: $skillsRequired
              status: $status
            ) 
          }
        `,
         
        variables: {
          vacancyPost: this.vacancyPost,
          noOfOpenings: parseInt(this.noOfOpenings),
          stipend: parseInt(this.stipend),
          perks: this.perks,
          duration: parseInt(this.duration),
          aboutPost: this.aboutPost,
          skillsRequired: this.skillsRequired,
          status: this.status,
        },
      });
      console.log(result);
      this.$router.push("/vacancies");
    },
  },
};
</script>
<style></style>

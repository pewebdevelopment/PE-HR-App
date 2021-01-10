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
      vacancyPost: "",
      noOfOpenings: undefined,
      stipend: undefined,
      perks: [],
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
            ) {
              aboutPost
            }
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
      this.$router.push("/");
    },
  },
};
</script>
<style></style>

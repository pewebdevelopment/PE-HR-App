<template>
  <div>
    <h3>Personal Details</h3>
    <b-container fluid>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Full Name:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model="Fname"
            type="text"
            placeholder="Enter your name"
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Email:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model="email"
            type="text"
            placeholder="Enter your email"
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Mobile:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model="mobile"
            type="text"
            placeholder="Enter your mobile number"
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Address:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model="address"
            type="text"
            placeholder="Enter your address"
          ></b-form-input>
        </b-col>
      </b-row>
      <hr />
      <h3>Gradutation</h3>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default"> College:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model="college"
            type="text"
            placeholder="Enter your college name"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default"> Department:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model="Department"
            type="text"
            placeholder="Enter your department name"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Start Date:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model="StartDateGra"
            type="number"
            placeholder="Gradutation start date"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Finish Date:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model="FinishDateGra"
            type="number"
            placeholder="Gradutation complete date"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Percentage:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model="percentageGra"
            type="number"
            placeholder="Enter gradutation percentage"
          ></b-form-input>
        </b-col>
      </b-row>

      <hr />

      <h3>Secondary Education</h3>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">School:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model="school"
            type="text"
            placeholder="Enter your college name"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Board:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model="boardSch"
            type="text"
            placeholder="Enter your board name"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Start Date:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model="StartDateSch"
            type="number"
            placeholder="Gradutation start date"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Finish Date:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model="FinishDateSch"
            type="number"
            placeholder="Gradutation complete date"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Percentage:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model="percentageSch"
            type="number"
            placeholder="Enter gradutation percentage"
          ></b-form-input>
        </b-col>
      </b-row>

      <hr />

      <h3>Higher Secondary Education</h3>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default"> College:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model="collegehse"
            type="text"
            placeholder="Enter your college name"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Board:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model="boardhse"
            type="text"
            placeholder="Enter your board name"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Start Date:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model="StartDatehse"
            type="number"
            placeholder="Gradutation start date"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Finish Date:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model="FinishDatehse"
            type="number"
            placeholder="Gradutation complete date"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Percentage:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model="percentagehse"
            type="number"
            placeholder="Enter gradutation percentage"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Department:</label>
        </b-col>
        <b-col sm="8">
          <b-form-input
            v-model="departmenthse"
            type="text"
            placeholder="Enter gradutation percentage"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Skills:</label>
        </b-col>
        <b-col sm="7">
          <b-form-tags
            required
            input-id="tags-pills"
            v-model="skills"
            tag-variant="dark"
            tag-pills
            size="lg"
            separator=" "
            placeholder="Enter new skills separated by space"
          ></b-form-tags>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="4"></b-col>
        <b-col sm="3">
          <b-button @click="addcandidate">Submit</b-button>
        </b-col>
      </b-row>
    </b-container>
    <hr />

    <b-container fluid> </b-container>

    <hr />
  </div>
</template>
<script>
import gql from "graphql-tag";
export default {
  name: "icons",
  data() {
    return {
      Fname: "",
      email: "",
      mobile: "",
      address: "",
      college: "",
      StartDateGra: "",
      FinishDateGra: "",
      percentageGra: "",
      school: "",
      boardSch: "",
      StartDateSch: "",
      FinishDateSch: "",
      percentageSch: "",
      collegehse: "",
      boardhse: "",
      StartDatehse: "",
      FinishDatehse: "",
      percentagehse: "",
      Department: "",
      departmenthse: "",
      skills: [],
    };
  },
  methods: {
    async addcandidate() {
      const result = await this.$apollo.mutate({
        mutation: gql`
          mutation(
            $candidateName: String!
            $email: String!
            $phoneNo: String!
            $address: String!
            $ugCollege: String!
            $ugSpecialization: String!
            $ugFrom: Int!
            $ugTo: Int!
            $ugPercentage: Float!
            $sslcSchool: String!
            $sslcBoard: String!
            $sslcFrom: Int!
            $sslcTo: Int!
            $sslcPercentage: Float!
            $hseSchool: String!
            $hseBoard: String!
            $hseSpecialization: String!
            $hseFrom: Int!
            $hseTo: Int!
            $hsePercentage: Float!
            $skills: [String]!
          ) {
            addCandidate(
              candidateName: $candidateName
              email: $email
              phoneNo: $phoneNo
              address: $address
              ugCollege: $ugCollege
              ugSpecialization: $ugSpecialization
              ugFrom: $ugFrom
              ugTo: $ugTo
              ugPercentage: $ugPercentage
              sslcSchool: $sslcSchool
              sslcBoard: $sslcBoard
              sslcFrom: $sslcFrom
              sslcTo: $sslcTo
              sslcPercentage: $sslcPercentage
              hseSchool: $hseSchool
              hseBoard: $hseBoard
              hseSpecialization: $hseSpecialization
              hseFrom: $hseFrom
              hseTo: $hseTo
              hsePercentage: $hsePercentage
              skills: $skills
            ) {
              candidateName
            }
          }
        `,
        variables: {
          candidateName: this.Fname,
          email: this.email,
          phoneNo: this.mobile,
          address: this.address,
          ugCollege: this.college,
          ugSpecialization: this.Department,
          ugFrom: parseInt(this.StartDateGra),
          ugTo: parseInt(this.FinishDateGra),
          ugPercentage: parseFloat(this.percentageGra),
          sslcSchool: this.school,
          sslcBoard: this.boardSch,
          sslcFrom: parseInt(this.StartDateSch),
          sslcTo: parseInt(this.FinishDateSch),
          sslcPercentage: parseFloat(this.percentageSch),
          hseSchool: this.collegehse,
          hseBoard: this.boardhse,
          hseSpecialization: this.departmenthse,
          hseFrom: parseInt(this.StartDatehse),
          hseTo: parseInt(this.FinishDatehse),
          hsePercentage: parseFloat(this.percentagehse),
          skills: this.skills,
        },
      });

      this.$router.push("/");
    },
  },
};
/*  $candidateName: String!
            $email: String!
            $phoneNo: String!
            $address: String!
$ugCollege: String
            $ugSpecialization: String
            $ugFrom: Number
            $ugTo: Number
            $ugPercentage: Number
            $sslcSchool: String
            $sslcBoard: String
            $sslcFrom: Number
            $sslcTo: Number
            $sslcPercentage: Number
            $hseSchool: String
            $hseBoard: String
            $hseSpecialization: String
            $hseFrom: Number
            $hseTo: Number
            $hsePercentage: Number*/
/*  candidateName: $candidateName
              email: $email
              phoneNo: $phoneNo
              address: $address
ugCollege: $ugCollege
              ugSpecialization: $ugSpecialization
              ugFrom: $ugFrom
              ugTo: $ugTo
              ugPercentage: $ugPercentage
              sslcSchool: $sslcSchool
              sslcBoard: $sslcBoard
              sslcFrom: $sslcFrom
              sslcTo: $sslcTo
              sslcPercentage: $sslcPercentage
              hseSchool: $hseSchool
              hseBoard: $hseBoard
              hseSpecialization: $hseSpecialization
              hseFrom: $hseFrom
              hseTo: $hseTo
              hsePercentage: $hsePercentage*/
</script>

<style></style>

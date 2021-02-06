<template >
  <div>
  
  
    <card>
      <b-container fluid>
        <!-- User Interface controls -->
        <div id="box">
          <v-card>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th colspan="2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in candidates" v-bind:key="item.candidateId">
                  <td>{{ item.candidateName }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.phoneNo }}</td>
                  <td>
                    <b-button size="sm" @click="showdetail(item.candidateId)"
                      >Show Details</b-button
                    >
                    <b-button size="sm" @click="getcandidate(item.candidateId)"
                      >Edit</b-button
                    >
                    <b-button size="sm" @click="ondelete(item.candidateId)">
                      Delete
                    </b-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </v-card>
        </div>

        <b-modal
          ref="candidatemodal"
          scrollable
          body-bg-variant="dark"
          hide-header
          hide-backdrop
          hide-footer
          class="modal-scrollbar-measure"
        >
          <b-row class="my-1">
            <h3>Edit Candidate</h3>
          </b-row>
          <h4>Personal Details</h4>
          <b-container fluid>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Full Name:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  v-model="Fname"
                  type="text"
                  placeholder="Enter your name"
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Email:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  v-model="email"
                  type="text"
                  placeholder="Enter your email"
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Mobile:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  v-model="mobile"
                  type="text"
                  placeholder="Enter your mobile number"
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Address:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  v-model="address"
                  type="text"
                  placeholder="Enter your address"
                ></b-form-input>
              </b-col>
            </b-row>
            <hr />
            <h4>Gradutation</h4>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default"> College:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  v-model="college"
                  type="text"
                  placeholder="Enter your college name"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default"> Department:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  v-model="Department"
                  type="text"
                  placeholder="Enter your department name"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Start Date:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  v-model="StartDateGra"
                  type="number"
                  placeholder="Gradutation start date"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Finish Date:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  v-model="FinishDateGra"
                  type="number"
                  placeholder="Gradutation complete date"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Percentage:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  v-model="percentageGra"
                  type="number"
                  placeholder="Enter gradutation percentage"
                ></b-form-input>
              </b-col>
            </b-row>
            <!------------------------------------------------------------------------------------------>

            <hr />

            <h4>Secondary Education</h4>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">School:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  v-model="school"
                  type="text"
                  placeholder="Enter your college name"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Board:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  v-model="boardSch"
                  type="text"
                  placeholder="Enter your board name"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Start Date:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  v-model="StartDateSch"
                  type="number"
                  placeholder="Gradutation start date"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Finish Date:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  v-model="FinishDateSch"
                  type="number"
                  placeholder="Gradutation complete date"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Percentage:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  v-model="percentageSch"
                  type="number"
                  placeholder="Enter gradutation percentage"
                ></b-form-input>
              </b-col>
            </b-row>

            <hr />

            <h4>Higher Secondary Education</h4>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default"> College:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  v-model="collegehse"
                  type="text"
                  placeholder="Enter your college name"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Board:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  v-model="boardhse"
                  type="text"
                  placeholder="Enter your board name"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Start Date:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  v-model="StartDatehse"
                  type="number"
                  placeholder="Gradutation start date"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Finish Date:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  v-model="FinishDatehse"
                  type="number"
                  placeholder="Gradutation complete date"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Percentage:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  v-model="percentagehse"
                  type="number"
                  placeholder="Enter gradutation percentage"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Department:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  v-model="departmenthse"
                  type="text"
                  placeholder="Enter gradutation percentage"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Skills:</label>
              </b-col>
              <b-col sm="10">
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
          </b-container>
          <hr />
          <b-row class="my-1">
            <b-col sm="3"> </b-col>
          </b-row>
          <b-button class="mt-2" variant="outline-success" block @click="postcandidate"
            >Submit</b-button
          >

          <b-button class="mt-3" variant="outline-danger" block @click="hidemodal"
            >Cancel</b-button
          >
        </b-modal>
        <b-modal
          ref="showdetails"
          scrollable
          body-bg-variant="dark"
          hide-header
          hide-backdrop
          hide-footer
        >
          <b-row class="my-1">
            <h3>Edit Candidate</h3>
          </b-row>
          <h4>Personal Details</h4>
          <b-container fluid>
            <label>{{ candidate_Id }}</label>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Full Name:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  disabled
                  v-model="sFname"
                  type="text"
                  placeholder="Enter your name"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Email:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  disabled
                  v-model="semail"
                  type="text"
                  placeholder="Enter your email"
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Mobile:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  disabled
                  v-model="smobile"
                  type="text"
                  placeholder="Enter your mobile number"
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Address:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  disabled
                  v-model="saddress"
                  type="text"
                  placeholder="Enter your address"
                ></b-form-input>
              </b-col>
            </b-row>
            <hr />
            <h4>Gradutation</h4>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default"> College:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  disabled
                  v-model="scollege"
                  type="text"
                  placeholder="Enter your college name"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default"> Department:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  disabled
                  v-model="sDepartment"
                  type="text"
                  placeholder="Enter your department name"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Start Date:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  disabled
                  v-model="sStartDateGra"
                  type="number"
                  placeholder="Gradutation start date"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Finish Date:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  disabled
                  v-model="sFinishDateGra"
                  type="number"
                  placeholder="Gradutation complete date"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Percentage:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  disabled
                  v-model="spercentageGra"
                  type="number"
                  placeholder="Enter gradutation percentage"
                ></b-form-input>
              </b-col>
            </b-row>

            <hr />

            <h4>Secondary Education</h4>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">School:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  disabled
                  v-model="sschool"
                  type="text"
                  placeholder="Enter your college name"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Board:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  disabled
                  v-model="sboardSch"
                  type="text"
                  placeholder="Enter your board name"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Start Date:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  disabled
                  v-model="sStartDateSch"
                  type="number"
                  placeholder="Gradutation start date"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Finish Date:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  disabled
                  v-model="sFinishDateSch"
                  type="number"
                  placeholder="Gradutation complete date"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Percentage:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  disabled
                  v-model="spercentageSch"
                  type="number"
                  placeholder="Enter gradutation percentage"
                ></b-form-input>
              </b-col>
            </b-row>

            <hr />

            <h4>Higher Secondary Education</h4>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default"> College:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  disabled
                  v-model="scollegehse"
                  type="text"
                  placeholder="Enter your college name"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Board:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  disabled
                  v-model="sboardhse"
                  type="text"
                  placeholder="Enter your board name"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Start Date:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  disabled
                  v-model="sStartDatehse"
                  type="number"
                  placeholder="Gradutation start date"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Finish Date:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  disabled
                  v-model="sFinishDatehse"
                  type="number"
                  placeholder="Gradutation complete date"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Percentage:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  disabled
                  v-model="spercentagehse"
                  type="number"
                  placeholder="Enter gradutation percentage"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Department:</label>
              </b-col>
              <b-col sm="9">
                <!-- <h6>{{ sdepartmenthse }}</h6>
-->
                <b-form-input
                  disabled
                  v-model="sdepartmenthse"
                  type="text"
                  placeholder="Enter gradutation percentage"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Skills:</label>
              </b-col>
              <b-col sm="10">
                <h6 v-for="(items, index) in sskills" :key="index">{{ items }}</h6>
              </b-col>
            </b-row>
          </b-container>
          <hr />
          <b-row class="my-1">
            <b-col sm="3"> </b-col>
          </b-row>

          <b-button class="mt-9" variant="outline-danger" @click="hidemodal1"
            >Cancel</b-button
          >
        </b-modal>
        <!-- ------------------------------------------------------------------------------------- -->
      </b-container>

      <!-- Info modal -->
    </card>
    <b-button size="sm" @click="logout()">
                      Logout
                    </b-button>
  </div>
  
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "google",
  mounted(){
    if(localStorage.getItem('access')&&localStorage.getItem('idToken')&&localStorage.getItem('accessToken')&&localStorage.getItem('refreshToken')){
    this.get()
    }
    else{
      this.$router.push("/login");
    }
  },
  /*apollo: {
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
  },*/
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
      sFname: "",
      semail: "",
      smobile: "",
      saddress: "",
      scollege: "",
      sStartDateGra: "",
      sFinishDateGra: "",
      spercentageGra: "",
      sschool: "",
      sboardSch: "",
      sStartDateSch: "",
      sFinishDateSch: "",
      spercentageSch: "",
      scollegehse: "",
      sboardhse: "",
      sStartDatehse: "",
      sFinishDatehse: "",
      spercentagehse: "",
      sDepartment: "",
      sdepartmenthse: "",
      sskills: [],
      singlecandidate: [],
      candidate_Id: "",
      candidates:undefined
    };
  },
  computed: {
    sortOptions() {
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  methods: {
    async logout(){
      localStorage.removeItem('idToken')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('access')
      this.$router.push("/login");
    },
    async ondelete(id) {
      this.singlecandidate = await this.$apollo.mutate({
        mutation: gql`
          mutation($candidateId: ID!) {
            deleteCandidate(candidateId: $candidateId)
          }
        `,
        variables: {
          candidateId: id,
        },
      });
    },
    async get() {
      const results = await this.$apollo.mutate({
        mutation: gql`
          mutation {
            candidate{
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
        variables: {
        },
      });
      this.candidates=results.data.candidate
    },
    async getcandidate(id) {
      console.log("stet")
      this.singlecandidate = await this.$apollo.mutate({
        mutation: gql`
          mutation {
            candidate{
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
        variables: {
        },
        
      });
      console.log(this.singlecandidate)
      this.candidate_Id = id;
      (this.Fname = this.singlecandidate.data.candidate[0].candidateName),
        (this.email = this.singlecandidate.data.candidate[0].email),
        (this.mobile = this.singlecandidate.data.candidate[0].phoneNo),
        (this.address = this.singlecandidate.data.candidate[0].address),
        (this.college = this.singlecandidate.data.candidate[0].ugCollege),
        (this.StartDateGra = this.singlecandidate.data.candidate[0].ugFrom),
        (this.FinishDateGra = this.singlecandidate.data.candidate[0].ugTo),
        (this.percentageGra = this.singlecandidate.data.candidate[0].ugPercentage),
        (this.school = this.singlecandidate.data.candidate[0].sslcSchool),
        (this.boardSch = this.singlecandidate.data.candidate[0].sslcBoard),
        (this.StartDateSch = this.singlecandidate.data.candidate[0].sslcFrom),
        (this.FinishDateSch = this.singlecandidate.data.candidate[0].sslcTo),
        (this.percentageSch = this.singlecandidate.data.candidate[0].sslcPercentage),
        (this.collegehse = this.singlecandidate.data.candidate[0].hseSchool),
        (this.boardhse = this.singlecandidate.data.candidate[0].hseBoard),
        (this.StartDatehse = this.singlecandidate.data.candidate[0].hseFrom),
        (this.FinishDatehse = this.singlecandidate.data.candidate[0].hseTo),
        (this.percentagehse = this.singlecandidate.data.candidate[0].hsePercentage),
        (this.Department = this.singlecandidate.data.candidate[0].ugSpecialization),
        (this.departmenthse = this.singlecandidate.data.candidate[0].hseSpecialization),
        (this.skills = this.singlecandidate.data.candidate[0].skills),
        this.showmodal();
      this.$router.push("/");
    },
    async showdetail(id) {
       this.singlecandidate = await this.$apollo.mutate({
        mutation: gql`
          mutation($candidateId: ID!) {
            oneCandidate(candidateId: $candidateId){
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
        variables: {
          candidateId: id,
        },
        
      });
      console.log(this.singlecandidate)      
      this.candidate_id = this.singlecandidate.data.oneCandidate[0].candidateId;
      (this.sFname = this.singlecandidate.data.oneCandidate[0].candidateName),
        (this.semail = this.singlecandidate.data.oneCandidate[0].email),
        (this.smobile = this.singlecandidate.data.oneCandidate[0].phoneNo),
        (this.saddress = this.singlecandidate.data.oneCandidate[0].address),
        (this.scollege = this.singlecandidate.data.oneCandidate[0].ugCollege),
        (this.sStartDateGra = this.singlecandidate.data.oneCandidate[0].ugFrom),
        (this.sFinishDateGra = this.singlecandidate.data.oneCandidate[0].ugTo),
        (this.spercentageGra = this.singlecandidate.data.oneCandidate[0].ugPercentage),
        (this.sschool = this.singlecandidate.data.oneCandidate[0].sslcSchool),
        (this.sboardSch = this.singlecandidate.data.oneCandidate[0].sslcBoard),
        (this.sStartDateSch = this.singlecandidate.data.oneCandidate[0].sslcFrom),
        (this.sFinishDateSch = this.singlecandidate.data.oneCandidate[0].sslcTo),
        (this.spercentageSch = this.singlecandidate.data.oneCandidate[0].sslcPercentage),
        (this.scollegehse = this.singlecandidate.data.oneCandidate[0].hseSchool),
        (this.sboardhse = this.singlecandidate.data.oneCandidate[0].hseBoard),
        (this.sStartDatehse = this.singlecandidate.data.oneCandidate[0].hseFrom),
        (this.sFinishDatehse = this.singlecandidate.data.oneCandidate[0].hseTo),
        (this.spercentagehse = this.singlecandidate.data.oneCandidate[0].hsePercentage),
        (this.sDepartment = this.singlecandidate.data.oneCandidate[0].ugSpecialization),
        (this.sdepartmenthse = this.singlecandidate.data.oneCandidate[0].hseSpecialization),
        (this.sskills = this.singlecandidate.data.oneCandidate[0].skills);
      this.showmodal1();
    },
    showmodal() {
      this.$refs["candidatemodal"].show();
    },
    showmodal1() {
      this.$refs["showdetails"].show();
    },
    hidemodal() {
      this.$refs["candidatemodal"].hide();
    },
    hidemodal1() {
      this.$refs["showdetails"].hide();
    },
    async postcandidate() {
      const result = await this.$apollo.mutate({
        mutation: gql`
          mutation(
            $candidateId: ID!
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
            updateCandidate(
              candidateId: $candidateId
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
            )
          }
        `,
        variables: {
          candidateId: this.candidate_Id,
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
      this.hidemodal();
      this.$router.push("/");
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
.modal-scrollbar-measure {
  overflow: hidden !important;
}
</style>

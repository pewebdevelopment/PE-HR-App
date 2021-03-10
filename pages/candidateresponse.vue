<template>
  <div>
    <card>
      <b-container fluid>
        <!-- User Interface controls -->
        <b-row>
          <b-col lg="6" class="my-2">
              <b-form-group
                label="Filter"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                label-for="filterInput"
                class="mb-0"
              >
                  <b-form-input
                    v-model="filter"
                    type="search"
                    id="filterInput"
                    placeholder="Type to Search"
                  ></b-form-input>
                  
              </b-form-group>
            </b-col>
          <b-col lg="6" class="my-0">
                <b-input-group>
                  <b-button class="filter-clear-button" variant="info" @click="filter = ''">Clear</b-button>
                  <b-button class="filter-clear-button" v-if =" role == 'admin' " variant="info" @click="showmodal">Send Email</b-button>
                </b-input-group>
          </b-col>
        </b-row>
        <!-- Main table element -->
        <b-table
          show-empty
          small
          stacked="md"
          :items="responses"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :filter-included-fields="filterOn"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered"
        >
         <template v-slot:cell(check)="row">
           <b-form-checkbox  v-model="row.item.selected" @change="change(row.item.selected,row.item.candidateEmail)"
            ></b-form-checkbox
          >
          </template>
          <template v-slot:cell(actions)="row">
            <b-button size="sm" @click="showdetail(row.item.candidateId)">
              Bio Data
             </b-button>
            <b-button size="sm" @click="row.toggleDetails">
              {{ row.detailsShowing ? "Hide" : "Show" }} Details
            </b-button>
            <b-button class="see-answers" size="sm" variant="info"  @click="showAnswersPage(row.item.responseId)"
                      >See Answers</b-button
                    >
          </template>
         
          <template v-slot:row-details="row">
            <b-card>
              <ul>
                <li v-for="(value, key) in row.item" :key="key">
                  {{ key }}: {{ value }}
                </li>
              </ul>
            </b-card>
          </template>
        </b-table>
        <b-row>
          <b-col sm="7" md="6" class="my-1">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="fill"
              size="sm"
              class="my-0"
            ></b-pagination>
          </b-col>
          <b-col sm="5" md="6" class="my-1">
            <b-form-group
              label="Per page"
              label-cols-sm="6"
              label-cols-md="4"
              label-cols-lg="3"
              label-align-sm="right"
              label-size="sm"
              label-for="perPageSelect"
              class="mb-0"
            >
              <b-form-select
                v-model="perPage"
                id="perPageSelect"
                size="sm"
                :options="pageOptions"
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>

        <!-- Info modal -->
        <b-modal
          :id="infoModal.id"
          :title="infoModal.title"
          ok-only
          @hide="resetInfoModal"
        >
          <pre> {{ infoModal.content }} </pre>
        </b-modal>
        
        <b-modal
          ref="email"
          scrollable
          body-bg-variant="dark"
          hide-header
          hide-backdrop
          hide-footer
        >
        <v-alert
          type="error"
          dense
          outlined
        >{{ err }}</v-alert>

          <b-row class="my-1">
            <h3>Email</h3>
          </b-row>
          <b-container fluid>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Subject</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  v-model="emailSubject"
                  type="text"
                  placeholder="Enter subject name"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-default">Content</label>
              </b-col>
              <b-col sm="9">
                <b-form-textarea
                  v-model="emailContent"
                  type="text"
                  placeholder="Enter content"
                ></b-form-textarea>
              </b-col>
            </b-row>
            <b-button class="mt-9" variant="outline-danger" @click="sendMail"
            >Submit</b-button
          >
          </b-container>
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
            <h3>View Candidate</h3>
          </b-row>
          <h4>Personal Details</h4>
          <b-container fluid>
            <label>{{ candidateId }}</label>
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
      </b-container>
    </card>
    
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "google",
  /*apollo: {
    responses: gql`
      query {
        responses {
          githubId
          vacancyId
          candidateId
          projectsLinks
          candidateName
          vacancyPost
          candidateEmail
        }
      }
    `,
  },*/
  data() {
    return {
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
      emailList:new Set(),
      role:"No Access",
      fields: [
        { 
          key:"check",
          label:"selected"
        },
        {
          key: "candidateName",
          label: "Candidate Name",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "candidateEmail",
          label: "Candidate Email",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "githubId",
          label: "Github",
          sortable: true,
          sortDirection: "asc",
        },
        {
          key: "vacancyPost",
          label: "Vacancy Post",
          sortable: true,
          sortDirection: "desc",
        },
        { key: "actions", label: "Actions" },
        {
          key:"rating",
          label:"rating", 
          sortable: true,
          sortDirection: "asc",  
        },
        {
          key:"comment",
          label:"comment", 
          sortable: true,
          sortDirection: "desc",  
        },
       // {key:"comment",label:"comment"},
      ],
      responses:undefined,
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      emailSubject:"",
      emailContent:"",
      err:""
      
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
  mounted() {
     if(localStorage.getItem('access')&&localStorage.getItem('idToken')&&localStorage.getItem('accessToken')&&localStorage.getItem('refreshToken')){
        this.responseList()
        this.role = localStorage.getItem('access') || "No Access"

    }
    else{
      this.$router.push("/login");
    }
  },
  methods: {
    async change(a,b){
      console.log(this.emailList)
      if(a==null || a){
        this.emailList.add(b)
      }else{
        this.emailList.delete(b);
        console.log(this.emailList)
      }
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
    showmodal1() {
      this.$refs["showdetails"].show();
    },
    showmodal() {
      this.$refs["email"].show();
    },
    hidemodal() {
      this.$refs["email"].hide();
    },
    hidemodal1() {
      this.$refs["showdetails"].hide();
    },
    async showAnswersPage(str){
       this.$router.push("/showAnswers?responseId="+str)
    },
    async responseList() {
      const results = await this.$apollo.mutate({
        mutation: gql`
          mutation {
           responses {
              githubId
              vacancyId
              candidateId
              projectsLinks
              candidateName
              vacancyPost
              candidateEmail
              responseId
              roundsAnswers
              rating
              comment
            } 
          }
        `,
        variables: {
          
        },
      });
      this.responses=results.data.responses
      console.log(this.responses)
    
    },
    async sendMail(){
      console.log(this.emailList.size == 0);
        if(this.emailList.size != 0){
        const emailSent = await this.$apollo.mutate({
        mutation:gql`
          mutation(
            $emailContent:String!
            $emails:[String]!
            $emailSubject:String!
          ){
            sendEmail(
            emailContent:$emailContent
            emails:$emails
            emailSubject:$emailSubject
            )
          }
          `,
          variables:{
            emailContent:this.emailContent,
            emails:Array.from(this.emailList),
            emailSubject:this.emailSubject
          }
        })
        this.hidemodal()
        }else{
          this.err = "Please select atleast one email to send";
        }
    },
    info(item, index, button) {
      this.totalRows = this.responses.length;
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(responses, null, 2);
      console.log(this.infoModal)
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
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

.filter-clear-button{
  margin-top: 10px;
  bottom:3px;
}
#filterInput{
  text-align: center;
  display: inline-block;
  border:2px solid #237DF6;
}

.page-item.active .page-link {
  background-color: #1d8cf8 !important;

}

</style>

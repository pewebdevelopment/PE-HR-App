<template>
  <div>
    <div class="header">
      <h1>VACANCIES</h1>
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
                  <b-col sm="3"><h5>20/01/2021</h5></b-col>
                  <b-col sm="3">Apply by </b-col>
                  <b-col sm="3"><h5>10/01/2021</h5></b-col>
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
                  <b-col sm="9"></b-col>
                  <b-col sm="3">
                    <b-button sm="2" variant="info" @click="showmodal(vac.vacancyId)"
                      >Apply</b-button
                    >
                  </b-col>
                </b-row>
              </card>
            </b-col>
          </b-row>
        </li>
      </ul>
      <div></div>
    </div>
    <b-modal ref="updateform" body-bg-variant="dark" hide-footer>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Github</label>
        </b-col>
        <b-col sm="10">
          <b-form-input
            v-model="githubid"
            type="text"
            placeholder="Enter github id"
          ></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="2">
          <label for="input-default">Projects:</label>
        </b-col>
        <b-col sm="10">
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
      <b-button class="mt-2" variant="outline-success" @click="addresponse" block
        >Submit</b-button
      >

      <b-button class="mt-3" variant="outline-danger" block @click="hidemodal"
        >Cancel</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import { BaseAlert } from "@/components";
import gql from "graphql-tag";
export default {
  name: "candidates",
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
      Upstatus: true,
      value1: false,
      Upvalue2: "",
      Upvalue3: "",
      upvacancy: [],
      project: [],
      vcancyid: "",
      githubid: "",
      candidate_Id: "5ffb02dfbeafa10011497b95",
    };
  },
  mounted() {},

  components: {
    BaseAlert,
  },
  apollo: {
    vacancies: gql`
      query getVacancies {
        vacancies {
          vacancyId
          vacancyPost
          noOfOpenings
          stipend
          perks
          duration
          aboutPost
          skillsRequired
        }
      }
    `,
  },
  methods: {
    showmodal(id) {
      this.vcancyid = id;
      this.$refs["updateform"].show();
    },
    hidemodal() {
      this.$refs["updateform"].hide();
    },
    async addresponse() {
      const results = await this.$apollo.mutate({
        mutation: gql`
          mutation(
            $vacancyId: ID!
            $candidateId: ID!
            $githubId: String!
            $projectsLinks: [String]!
          ) {
            addResponse(
              vacancyId: $vacancyId
              candidateId: $candidateId
              githubId: $githubId
              projectsLinks: $projectsLinks
            ) {
              githubId
            }
          }
        `,
        variables: {
          vacancyId: this.vcancyid,
          candidateId: this.candidate_Id,
          githubId: this.githubid,
          projectsLinks: this.project,
        },
      });
      this.hidemodal();
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

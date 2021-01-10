<template>
  <div>
    <div class="header">
      <h1>VACANCIES</h1>
      <nuxt-link to="/addVancany"
        ><b-button class="float-right">Add Vacancy</b-button></nuxt-link
      >
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
                    <h6>{{ vac.skillsRequired }}</h6></b-col
                  >
                  <b-col sm="3"
                    >perks <br /><br />
                    <h6>{{ vac.perks }}</h6></b-col
                  >
                </b-row>

                <hr />
                <b-row>
                  <b-col sm="3">
                    <b-button sm="3" @click="deletevacancy(vac.vacancyId)"
                      >Delete</b-button
                    >
                  </b-col>
                  <b-col sm="6"></b-col>
                  <b-col sm="3">
                    <b-button sm="3" variant="info" @click="getvacancy(vac.vacancyId)"
                      >Edit</b-button
                    ></b-col
                  >
                </b-row>
              </card>
            </b-col>
          </b-row>
        </li>
      </ul>
      <div>
        <b-modal ref="updateform" body-bg-variant="dark" hide-footer>
          <b-row class="my-1">
            <h3>Edit Vacancy</h3>
            <!--{{ vacancy }}
-->
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="input-default">Vacancy Post:</label>
            </b-col>
            <b-col sm="9">
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
            <b-col sm="3">
              <label for="input-default">Total openings:</label>
            </b-col>
            <b-col sm="9">
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
            <b-col sm="3">
              <label for="input-default">Stipend:</label>
            </b-col>
            <b-col sm="9">
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
            <b-col sm="3"></b-col>
            <b-col sm="2">
              <b-form-checkbox v-model="value1" value="true">Perks</b-form-checkbox>
            </b-col>
          </b-row>
          <b-row class="my-2">
            <b-col sm="3"></b-col>
            <b-col sm="2">
              <b-form-checkbox v-if="value1" v-model="Upvalue2" value="Letter"
                >Letter</b-form-checkbox
              >
            </b-col>
          </b-row>
          <b-row class="my-3">
            <b-col sm="3"></b-col>
            <b-col sm="2">
              <b-form-checkbox v-if="value1" v-model="Upvalue3" value="Certificate"
                >Certificate</b-form-checkbox
              >
            </b-col>
          </b-row>

          <b-row class="my-1">
            <b-col sm="3">
              <label for="input-default">Duration:</label>
            </b-col>
            <b-col sm="9">
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
            <b-col sm="3">
              <label for="input-default">About Post:</label>
            </b-col>
            <b-col sm="9">
              <b-form-textarea
                required
                v-model="UpaboutPost"
                id="textarea-default"
                placeholder="Enter post description"
              ></b-form-textarea>
            </b-col>
          </b-row>

          <b-row class="my-1">
            <b-col sm="3">
              <label for="input-default">Skills Required:</label>
            </b-col>
            <b-col sm="9">
              <b-form-tags
                required
                input-id="tags-pills"
                v-model="UpskillsRequired"
                tag-variant="dark"
                tag-pills
                size="lg"
                separator=""
                placeholder="Enter new skills separated by space"
              ></b-form-tags>
            </b-col>
          </b-row>
          <hr />
          <b-row class="my-1">
            <b-col sm="3"> </b-col>
          </b-row>
          <b-button class="mt-2" variant="outline-success" @click="updatevacancy" block
            >Submit</b-button
          >

          <b-button class="mt-3" variant="outline-danger" block @click="hidemodal"
            >Cancel</b-button
          >
        </b-modal>
      </div>
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
    async deletevacancy(id) {
      const result = await this.$apollo.mutate({
        mutation: gql`
          mutation($vacancyId: ID!) {
            vacancyDelete(vacancyId: $vacancyId) {
              vacancyPost
            }
          }
        `,
        variables: {
          vacancyId: id,
        },
      });
      this.$router.push("/Vacancies");
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
            }
          }
        `,
        variables: {
          vacancyId: id,
        },
      });

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
        } else if (this.perks[0] == "letter") {
          this.UPvalue2 = "Letter";
        } else if (this.perks[0] == "certificate") {
          this.Upvalue3 = "Certificate";
        }
      }

      this.showmodal();
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
      if (this.value2 && this.value3) {
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
            ) {
              aboutPost
            }
          }
        `,
        variables: {
          vacancyId: this.vacancID,
          vacancyPost: this.UpvacancyPost,
          noOfOpenings: parseInt(this.UpnoOfOpenings),
          stipend: parseInt(this.Upstipend),
          perks: this.perks,
          duration: parseInt(this.Upduration),
          aboutPost: this.UpaboutPost,
          skillsRequired: this.UpskillsRequired,
          status: this.Upstatus,
        },
      });
      this.$router.push("/");
      this.hidemodal();
    },
    showmodal() {
      this.$refs["updateform"].show();
    },
    hidemodal() {
      this.$refs["updateform"].hide();
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

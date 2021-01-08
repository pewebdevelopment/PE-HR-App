<template>
<div >
    <FormulateForm
        action=""
        @submit="onSubmit"
        v-model="formValues"
    >
        <FormulateInput
        label="Vacancy Post"
        name="vacancyPost"
        validation="required"
        />
        <FormulateInput
        label="Total Openings"
        name="noOfOpening"
        type="text"
        validation="number|required"
        />
        <FormulateInput
        label="Stipend"
        name="stipend"
        type="text"
        validation="number|required"
        />
        <FormulateInput
        type="checkbox"
        label="Perks"
        name="perks"
        :options="{letter: 'Letter', certificate: 'Certificate', incentives: 'Incentives'}"
        validation="required"
        />
        <FormulateInput
        label="Duration(in months)"
        validation="number|required|min:1"
        type="text"
        name="duration"
        />
        <FormulateInput
        type="textarea"
        label="About Post"
        name="aboutPost"
        validation="required"
        />
        <FormulateInput
        type="group"
        name="skills"
        :repeatable="true"
        label="Skills Required"
        add-label="+ Add Skill"
        validation="required"
      >
        <div class="attendee">
          <FormulateInput
            type ="text"
            validation="required"
          />
        </div>
      </FormulateInput>
        <FormulateInput
        type="submit"
        label="Submit"
        />
       
    </FormulateForm>

</div>
</template>

<script>
import gql from 'graphql-tag';

export default {
    data(){
        return{
            formValues:{
                vacancyPost:"",
                noOfOpenings:undefined,
                stipend:undefined,
                perks:[],
                duration:undefined,
                aboutPost:"",
                skillsRequired:[],
                status:Boolean

            }
        }
    },
    name:"addVacancy",

    methods:{
        async onSubmit(){
             const result =  await this.$apollo.mutate({

        mutation:gql`
          mutation(
                $vacancyPost:String!,
                $noOfOpenings:Int!,
                $stipend:Int!,
                $perks:String!,
                $duration:Int!,
                $aboutPost:String!,
                $skillsRequired:String!
            )
                mutation{
                    addVacancy(vacancyPost:$vacancyPost,
                                noOfOpenings:$noOfOpenings,
                                stipend:$stipend,
                                perks:$perks,
                                duration:$duration,
                                startingDate:$startingDate,
                                aboutPost:$aboutPost,
                                skillsRequired:$skillsRequired,
                                whoCanApply:[",,,","kmm"]
                                status:false,
                                assessment:["hello","exz"]){
                            vacancyPost
                    }
                }

          }
        `,
        variables:{
            vacancyPost:this.formValues.vacancyPost,
            noOfOpenings:this.formValues.noOfOpenings,
            stipend:this.formValues.stipend,
            perks:this.formValues.perks,
            duration:this.formValues.duration,
            aboutPost:this.formValues.aboutPost,
            skillsRequired:this.formValues.skillsRequired,
        }
        

      })
        }
    }

}
</script>

<style>

</style>
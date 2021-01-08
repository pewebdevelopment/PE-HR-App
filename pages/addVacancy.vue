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
        name="noOfOpenings"
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
        name="skillsRequired"
        :repeatable="true"
        label="Skills Required"
        add-label="+ Add Skill"
        validation="required"
      >
        <div class="skills">
          <FormulateInput
            name="sk"
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
                status:true

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
                $perks:[String]!,
                $duration:Int!,
                $aboutPost:String!,
                $skillsRequired:[String]!
                $status:Boolean!
            )
                {
                    addVacancy(vacancyPost:$vacancyPost,
                                noOfOpenings:$noOfOpenings,
                                stipend:$stipend,
                                perks:$perks,
                                duration:$duration,
                                aboutPost:$aboutPost,
                                skillsRequired:$skillsRequired,
                                status:$status){
                                aboutPost
                                }
                               
                   }
                
                `,
              variables:{
                  vacancyPost:this.formValues.vacancyPost,
                  noOfOpenings:parseInt(this.formValues.noOfOpenings),
                  stipend:parseInt(this.formValues.stipend),
                  perks:this.formValues.perks,
                  duration:parseInt(this.formValues.duration),
                  aboutPost:this.formValues.aboutPost,
                  skillsRequired:this.formValues.skillsRequired.map(a=>a.sk),
                  status:this.formValues.status
              }

          })
          this.$router.push("/");
          
        }
 
    },




    }

    
        



</script>

<style>

</style>
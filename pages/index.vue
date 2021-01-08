<template>
  <div>
    <div class="header">
    <h1>Vacancies</h1> <button class="add-vacancy"><NuxtLink to="/addVacancy">Add Vacancy</NuxtLink></button>
    </div>
  <div class = "vacancies-list">
    <ul>
      
        <li v-for="vac in vacancies" :key="vac.id">
          <div class = "vacancy">
            <div class ="vacancy-header">
              {{vac.vacancyPost}}
            </div>
            <div class = "aboutVacancy">
              Post : {{vac.noOfOpenings}}
            </div>
            <div class = "aboutVacancy">
            Stipend : {{vac.stipend}}
            </div>
            <div class = "aboutVacancy">
            Perks : {{vac.perks}}
            </div>
            <div class = "aboutVacancy">
            Duration : {{vac.duration}}
            </div>
            
            <div class = "aboutVacancy">
            About : {{vac.aboutPost}}
            </div>
            <div class = "aboutVacancy">
            Skills : {{vac.skillsRequired}}
            </div>
          

          </div>
        </li>
      
    </ul>
  </div>


  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name:"candidates",

  apollo:{
    vacancies : gql `
      query getVacancies{
          vacancies{
            id,
            vacancyPost,
            noOfOpenings,
            stipend,
            perks,
            duration,
            aboutPost,
            skillsRequired,
        }
      }
    `
  }



}
</script>

<style>

.header{
  text-align: center;
}

.header h1{
  
  display: inline-block;
}

.vacancies-list ul{
  list-style-type:none;
}

.vacancy{
    padding: 23px;
    margin-bottom: 24px;
    border: 1px solid rgb(126, 114, 232);
    box-shadow: 0 1px 2px rgba(0,0,0,.08);
    border-radius: 6px;
}
.vacancy-header{
  margin-bottom: 8px;
  font-size: 18px;
  line-height: 1.33333333;
  font-weight: 600;
}

.add-vacancy{
  position: relative;
  float:right;
  right: 20px;
  top:10px;
}


</style>
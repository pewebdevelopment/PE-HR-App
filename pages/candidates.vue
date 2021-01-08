<template>
  <div>
    <h1>Hello World</h1>
    <div class="list-container">
    <table style="width:100%">
      <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Contact Number</th>
        <th>Response</th>
      </tr>
      </thead>
      <tbody>
        <tr class="candidate-items" v-for="candidate in candidates" :key="candidate.id">
            
            <td>{{candidate.candidateName}}
            </td>
            <td>{{candidate.email}}</td>
            <td>{{candidate.phoneNo}}</td>
            <td>
              <NuxtLink :to="'/candidateResponse/'+candidate.id" ><button>Response</button></NuxtLink>
            </td>
        </tr>
      </tbody>

    
    </table>
        
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'


export default {
  name:"candidates",

  apollo:{
    candidates : gql `
      query getCandidates{
          candidates{
              id
              candidateName
              email
              phoneNo
        }
      }
    `
  }



}
</script>

<style>

.candidate-items{
  padding:5px;
}

.list-container {
  text-align: center;
  
}
td{
  height: 50px;
}



</style>
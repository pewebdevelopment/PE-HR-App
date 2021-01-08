<template>

    <div>
        <li v-for="res in response" :key="res.id">
            
            <div class ="vacancy-header">
              {{vac.vacancyPost}}
            </div>
    </div>
  
</template>

<script>
import gql from 'graphql-tag'

export default {
    

}
</script>

<style>

</style>
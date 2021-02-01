<template>
  <div class="container">
<div class="row">
<div class="col-2"></div>
<div class="col-7">
  <b-card class="text-left">
  
  <form>
    <p class="h2 text-center mb-4">Sign up</p>
    <label for="defaultFormRegisterNameEx" class="grey-text">Your name</label>
    <input type="text" id=" " v-model = "input.name" class="form-control"/>
    <br/>
    <label for="defaultFormRegisterEmailEx" class="grey-text">Your email</label>
    <input type="email" id=" " v-model = "input.email" class="form-control"/>
    <br/>
    <label for="defaultFormRegisterConfirmEx" class="grey-text">Confirm your email</label>
    <input type="password" id=" " v-model = "input.cnfpassword" class="form-control"/>
    <br/>
    <label for="defaultFormRegisterPasswordEx" class="grey-text">Your password</label>
    <input type="password" id=" " v-model = "input.password" class="form-control"/>
    <div class="text-center mt-4">
      <button class="btn btn-unique" @click = "register" type="submit">Register</button>
    </div>
  </form>

   </b-card>
</div>
</div>
</div>
</template>

<script>
  
  export default {
    data(){
      return {
        input :{
          name : "",
          email : "",
          cnfpassword : "",
          password : ""
        }
      };
    },
    name: 'signup',
    components: {
     
    },
    methods : {
      register(){
        
      }
    }
  }
</script>
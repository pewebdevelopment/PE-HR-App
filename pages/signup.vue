<template>
  <div class="container">
<div class="row">
<div class="col-2"></div>
<div class="col-7">
  <b-card class="text-left">
  
  <form @submit.prevent="register">
    <p class="h2 text-center mb-4">Sign up</p>

    <label for="defaultFormRegisterEmailEx" class="grey-text">Your email</label>
    <input type="email" id=" " v-model = "input.email" class="form-control"/>
    <br/>
 
    <label for="defaultFormRegisterPasswordEx" class="grey-text">Your password</label>
    <input type="password" id=" " v-model = "input.password" class="form-control"/>
    <div class="text-center mt-4">
      <button class="btn btn-unique" type="submit">Register</button>
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
          email : "",
          password : ""
        }
      };
    },
    name: 'signup',
    components: {
     
    },
    methods : {
      async register(){
        try {
        await this.$store.dispatch('auth/register', this.input)
        console.log('Confirmation link sent');
        this.$router.push('/login');
      } catch (error) {
        console.log({ error })
      }
      }
    }
  }
</script>
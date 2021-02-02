<template>
<div class="container">
<div class="row">
<div class="col-2"></div>
<div class="col-7">
  <b-card class="text-left">
    
  <form @submit.prevent="login">
    <p class="h2 text-center mb-4">Sign in</p>
    <hr>
    <label for="defaultFormLoginEmailEx" class="grey-text">Your email</label>
    <input type="email" v-model = "input.email" id="defaultFormLoginEmailEx" class="form-control"/>
    <br/>
    <label for="defaultFormLoginPasswordEx" class="grey-text">Your password</label>
    <input type="password" v-model = "input.password" id="defaultFormLoginPasswordEx" class="form-control"/>
    <div class="text-center mt-4">
      <button class="btn btn-indigo" type="submit">Login</button>
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
    return{
      input :{
          email : "",
          password : ""
        }
    }
  },
  name: "login",
  components: {
     
    },
    methods:{
      async login(){
        try {
        await this.$store.dispatch('auth/login', this.input);
        this.$router.push('/user');
      } catch (error) {
        console.log({ error });
      }
      }
    }
}
  
</script>
<template>
<div class="container">
<div class="row">
<div class="col-2"></div>
<div class="col-7">
  <b-card class="text-left">
      <div>
<v-alert
  type="error"
   dense
   outlined
>{{ err }}</v-alert>
</div> 
  <form @submit.prevent="signIn">

    <p class="h2 text-center mb-4">Sign in</p>
    <hr>
    <label for="defaultFormLoginEmailEx" class="grey-text">Your email</label>
    <input type="email" v-model = "email" id="defaultFormLoginEmailEx" class="form-control"/>
    <br/>
    <label for="defaultFormLoginPasswordEx" class="grey-text">Your password</label>
    <input type="password" v-model = "password" id="defaultFormLoginPasswordEx" class="form-control"/>
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
import gql from  "graphql-tag"
export default {
  data(){
    return{
          email : "",
          password : "",
          err:""
    }
  },
  name: "login",
  components: {
     
    },
    mounted(){
     var val =localStorage.getItem('reload') || 0
     if(val==0){
       this.$router.go(0);
       localStorage.setItem('reload',2)
     }
    },
    methods:{
      async signIn(){
        console.log(this.email);
        const user= await this.$apollo.mutate({
          mutation:gql`mutation(
            $email:String!
            $password:String!
          ){signIn(
            email:$email,
            password:$password,
          )}`,
        variables:{
          email:this.email,
          password:this.password,
        }
        })
        console.log(user)
        if(user.data.signIn.length!=0){
          

          localStorage.setItem('accessToken',user.data.signIn[0]);
          localStorage.setItem('idToken',user.data.signIn[1]);
          localStorage.setItem('refreshToken',user.data.signIn[2]);
          localStorage.setItem('access',user.data.signIn[3])
          localStorage.setItem('reload',1);
          if(user.data.signIn[3]=='admin'){
                      this.$router.push("/vacancies");
          } 
          else {
            this.$router.push("/");

          }
        }
        else{
          this.err='Authentication Failed'
        }
      },
      /*async login(){
        try {
        var user =await this.$store.dispatch('auth/login', this.input);
        
        this.$router.push('/user');
        console.log(user )
      } catch (error) {
        console.log({ error });
      }
      }*/
    }
}
  
</script>
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
  <form @submit.prevent="signUp">
    <p class="h2 text-center mb-4">Sign up</p>
    <label for="defaultFormRegisterNameEx" class="grey-text">Your name</label>
    <input type="text"  v-model="userName" class="form-control"/>
    <br/>
    <label for="defaultFormRegisterEmailEx" class="grey-text">Your email</label>
    <input type="email" v-model="email" class="form-control"/>
    <br/>
    
    <label for="defaultFormRegisterPasswordEx" class="grey-text">Your password</label>
    <input type="password" v-model="password" class="form-control"/>
    <label for="defaultFormRegisterConfirmEx" class="grey-text">Permission</label>
    <input type="text" v-model="permission" class="form-control"/>
    <br/>
    <div class="text-center mt-4">
      <button class="btn btn-unique" type="submit" >Register</button>
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
    name: 'signup',
    data(){
      return {
        userName:"",
        email:"",
        password:"",
        permission:"",
        err:""
      }
    },
    components: {
     
    },
    methods:{
      async signUp(){
        console.log(this.email,this.userName);
        const result= await this.$apollo.mutate({
          mutation:gql`mutation(
            $email:String!
            $userName:String!
            $password:String!
            $permission:String!
          ){signUp(
            email:$email,
            userName:$userName,
            password:$password,
            permission:$permission
          )}`,
        variables:{
          email:this.email,
          userName:this.userName,
          password:this.password,
          permission:this.permission
        }
        })
        console.log(result)
        if(result.data.signUp=='user created'){
          this.$router.push("/login");
        }
        else{
          this.err="email exists"
          console.log("Email exists, Try New")
        }
      },
    }
  } 
</script>
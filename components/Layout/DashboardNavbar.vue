<template>
  <base-nav
    v-model="showMenu"
    class="navbar-absolute top-navbar"
    type="white"
    :transparent="true"
  >
    <div slot="brand" class="navbar-wrapper">
      <div
        class="navbar-toggle d-inline"
        :class="{ toggled: $sidebar.showSidebar }"
      >
        <button type="button" class="navbar-toggler" @click="toggleSidebar">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </button>
      </div>
     <!--  <a class="navbar-brand ml-xl-3 ml-5" href="#pablo">{{ routeName }}</a> -->
    </div>

    <ul class="navbar-nav" :class="$rtl.isRTL ? 'mr-auto' : 'ml-auto'">
      <div class="search-bar input-group" @click="searchModalVisible = true">
        <button
          v-if="flag"
          class="btn btn-link"
          id="search-button"
          data-toggle="modal"
          data-target="#searchModal"
        >
          <i class="tim-icons icon-zoom-split"></i>
        </button>
        <!-- You can choose types of search input -->
      </div>
      <modal
        :show.sync="searchModalVisible"
        class="modal-search"
        id="searchModal"
        :centered="false"
        :show-close="true"
      >
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          id="inlineFormInputGroup"
          placeholder="SEARCH"
        />
        <button
          class="btn btn-link"
          id="search-button"
          @click="getVac"
        >
          <i class="tim-icons icon-zoom-split"></i>
        </button>
        
      </modal>
      <base-dropdown
        tag="li"
        :menu-on-right="!$rtl.isRTL"
        title-tag="a"
        title-classes="nav-link"
        class="nav-item"
      >
        <template
          slot="title"
        >
          <div class="notification d-none d-lg-block d-xl-block"></div>
          <i class="tim-icons icon-sound-wave"></i>
          <p class="d-lg-none">New Notifications</p>
        </template>
        <li class="nav-link">
          <a href="#" class="nav-item dropdown-item"
            >Welcome to Paathshala World</a
          >
        </li>
        
      </base-dropdown>
      <base-dropdown
        tag="li"
        :menu-on-right="!$rtl.isRTL"
        title-tag="a"
        class="nav-item"
        title-classes="nav-link"
        menu-classes="dropdown-navbar"
      >
     
        <template
          slot="title"
        >
          <!-- avatar here -->
          <div v-if="flag">
            
          <b-avatar variant="primary">{{name}}</b-avatar>

          </div>

          <p class="d-lg-none">Log out</p>
        </template>
        <li class="nav-link">
          <a href="/" v-if="flag" class="nav-item dropdown-item">Profile</a>
        </li>
        <li class="nav-link">
          <a href="/candidateresponse" v-if="flag" class="nav-item dropdown-item">Response</a>
        </li>
        <div class="dropdown-divider"></div>
        <li class="nav-link">
          <a @click="logout()" class="nav-item dropdown-item">{{buttonText}}</a>
        </li>
      </base-dropdown>
    </ul>
  </base-nav>
</template>
<script>
import { CollapseTransition } from 'vue2-transitions';
import { BaseNav, Modal } from '@/components';
//import { CAvatar, CAvatarBadge } from "@chakra-ui/vue";


export default {
  components: {
    CollapseTransition,
    BaseNav,
    Modal
  },
  
  computed: {
    routeName() {
      const { path } = this.$route;
      let parts = path.split('/')
      if(parts == ','){
        return 'Dashboard';
      }
      return parts.map(p => this.capitalizeFirstLetter(p)).join(' ');
    },
    isRTL() {
      return this.$rtl.isRTL;
    }
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: '',
      flag:false,
      buttonText:"Log in",
      name : ""
    };
  },
  mounted(){

    var a=localStorage.getItem('access')||null
    if(a!=null){
      this.flag=true
      this.buttonText="Log out";
      let names = localStorage.getItem('username').split(" ");
      
      var initials = names[0].substring(0, 1).toUpperCase();
    
        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
     

      this.name = initials;
      
    }
    
  },
   
  methods: {
    async getVac(){
      if(localStorage.getItem('access')=='admin'||localStorage.getItem('access')=='super-admin')
        this.$router.push("/vacancies?vacancyName="+this.searchQuery)
      else if(localStorage.getItem('access')=='candidate')
        this.$router.push("/candidatevacancy?vacancyName="+this.searchQuery)
    },
    async logout(){
      if(localStorage.getItem('access')&&localStorage.getItem('idToken')&&localStorage.getItem('accessToken')&&localStorage.getItem('refreshToken')){
        localStorage.removeItem('reload')
        localStorage.removeItem('idToken')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('access')
        localStorage.removeItem('username')
      }
      console.log("new")
      this.$router.push("/login");
    },
    capitalizeFirstLetter(string) {
      if (!string || typeof string !== 'string') {
        return ''
      }
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    username(){
      console.log("hello")
    }
  }

};
</script>
<style scoped>
.top-navbar {
  top: 0px;
}
</style>

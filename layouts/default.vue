<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>
    <side-bar
      :background-color="sidebarBackground"
      :short-title="$t('sidebar.shortTitle')"
      :title="$t('sidebar.title')"
    >
      <template slot-scope="" slot="links">
      <div v-if =" role != 'No Access' ">
        <sidebar-item
          :link="{
            name: $t('sidebar.dashboard'),
            icon: 'tim-icons icon-chart-pie-36',
            path: '/',
          }"
        >
        </sidebar-item>
        </div>
      <div v-if =" role === 'No Access' ">
       <sidebar-item
          :link="{
            name: 'loginPage',
            icon: 'tim-icons icon-chart-pie-36',
            path: '/login',
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'signupPage',
            icon: 'tim-icons icon-chart-pie-36',
            path: '/signup',
          }"
        >
        </sidebar-item>
        </div>

        <div v-if =" role === 'candidate' ">
        <sidebar-item 
          :link="{
            name: 'candidate ',
            icon: 'tim-icons icon-atom',
            path: '/Candidate',
          }"
        >
        </sidebar-item>
        </div>
        <div v-if =" role === 'candidate' ">
        <sidebar-item 
          :link="{
            name: 'vacancy',
            icon: 'tim-icons icon-atom',
            path: '/candidatevacancy',
          }"
        >
        </sidebar-item>
        </div>
        <div v-if =" role === 'admin'||role==='super-admin' ">
        <sidebar-item 
          :link="{
            name: 'vacancy',
            icon: 'tim-icons icon-atom',
            path: '/Vacancies',
          }"
        >
        </sidebar-item>
        </div>
        <!--
        <sidebar-item
          :link="{
            name: 'Vacany',
            icon: 'tim-icons icon-pin',
            path: '/Vacancies',
          }"
        >
        </sidebar-item>-->
      <div v-if =" role != 'No Access' ">
        <sidebar-item
          :link="{
            name: 'response',
            icon: 'tim-icons icon-bell-55',
            path: '/candidateresponse',
          }"
        >
        </sidebar-item>
        </div>
        <!--
        <sidebar-item
          :link="{
            name: $t('sidebar.userProfile'),
            icon: 'tim-icons icon-single-02',
            path: '/user',
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: $t('sidebar.regularTables'),
            icon: 'tim-icons icon-puzzle-10',
            path: '/regular',
          }"
        ></sidebar-item>
        <sidebar-item
          :link="{
            name: $t('sidebar.typography'),
            icon: 'tim-icons icon-align-center',
            path: '/typography',
          }"
        ></sidebar-item>
        <sidebar-item
          :link="{
            name: $t('sidebar.rtl'),
            icon: 'tim-icons icon-world',
            path: localePath('/rtl', 'ar'),
          }"
        ></sidebar-item>
        <li class="active-pro">
          <a
            href="https://www.creative-tim.com/product/nuxt-black-dashboard-pro"
            target="_blank"
          >
            <i class="tim-icons icon-spaceship"></i>
            <p>Upgrade to PRO</p>
          </a>
        </li>
        -->
      </template>
    </side-bar>
    <!--Share plugin (for demo purposes). You can remove it if don't plan on using it-->
    <sidebar-share :background-color.sync="sidebarBackground"> </sidebar-share>
    <div class="main-panel" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>
      <router-view name="header"></router-view>

      <div :class="{ content: !isFullScreenRoute }" @click="toggleSidebar">
        <zoom-center-transition :duration="200" mode="out-in">
          <!-- your content here -->
          <nuxt></nuxt>
        </zoom-center-transition>
      </div>
      <content-footer v-if="!isFullScreenRoute"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import SidebarShare from "@/components/Layout/SidebarSharePlugin";
function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}
function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import DashboardNavbar from "@/components/Layout/DashboardNavbar.vue";
import DashboardContent from "@/components/Layout/Content.vue";
import { SlideYDownTransition, ZoomCenterTransition } from "vue2-transitions";
export default {
  components: {
    DashboardNavbar,
    DashboardContent,
    SlideYDownTransition,
    ZoomCenterTransition,
    SidebarShare,
  },
  data() {
    return {
      sidebarBackground: "vue", //vue|blue|orange|green|red|primary,
      role:'No Access'  //v-if="(localStorage.getItem('access') === 'candidate')"
    };
  },
  computed: {
//this.role = localStorage.getItem('access') || "No Access"
    isFullScreenRoute() {
      return this.$route.path === "/maps/full-screen";
    },
    
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    initScrollbar() {
      let docClasses = document.body.classList;
      let isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        // if we are on windows OS we activate the perfectScrollbar function
        initScrollbar("sidebar");
        initScrollbar("main-panel");
        initScrollbar("sidebar-wrapper");
        docClasses.add("perfect-scrollbar-on");
       
        console.log(docClasses);
      } else {
        docClasses.add("perfect-scrollbar-off");
      }
    },

    //default theme would be white
    
  },
  mounted() {
    this.initScrollbar();
    this.role = localStorage.getItem('access') || "No Access"
  },
};
</script>
<style lang="scss">
  @import '~@/assets/sass/dashboard/custom/variables';

$scaleSize: 0.95;
@keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1;
  }
}
.main-panel .zoomIn {
  animation-name: zoomIn95;
}
@keyframes zoomOut95 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}
.main-panel .zoomOut {
  animation-name: zoomOut95;
}
</style>
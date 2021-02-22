import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7866c1be = () => interopDefault(import('../pages/addVancany.vue' /* webpackChunkName: "pages/addVancany" */))
const _5bff8a81 = () => interopDefault(import('../pages/adminSignup.vue' /* webpackChunkName: "pages/adminSignup" */))
const _20666763 = () => interopDefault(import('../pages/applyVacancy.vue' /* webpackChunkName: "pages/applyVacancy" */))
const _6de64e0c = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _1942593d = () => interopDefault(import('../pages/candidate.vue' /* webpackChunkName: "pages/candidate" */))
const _03f8effe = () => interopDefault(import('../pages/candidateresponse.vue' /* webpackChunkName: "pages/candidateresponse" */))
const _d3588164 = () => interopDefault(import('../pages/candidatevacancy.vue' /* webpackChunkName: "pages/candidatevacancy" */))
const _8506d96a = () => interopDefault(import('../pages/editVacancy.vue' /* webpackChunkName: "pages/editVacancy" */))
const _378df123 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _6a54fd22 = () => interopDefault(import('../pages/notifications.vue' /* webpackChunkName: "pages/notifications" */))
const _7cdf8f72 = () => interopDefault(import('../pages/showAnswers.vue' /* webpackChunkName: "pages/showAnswers" */))
const _068a204e = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _162e9901 = () => interopDefault(import('../pages/user.vue' /* webpackChunkName: "pages/user" */))
const _74831a1a = () => interopDefault(import('../pages/Vacancies.vue' /* webpackChunkName: "pages/Vacancies" */))
const _23ea333e = () => interopDefault(import('../pages/GeneralViews/NotFoundPage.vue' /* webpackChunkName: "pages/GeneralViews/NotFoundPage" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'active',
  scrollBehavior,

  routes: [{
    path: "/addVancany",
    component: _7866c1be,
    name: "addVancany___en"
  }, {
    path: "/adminSignup",
    component: _5bff8a81,
    name: "adminSignup___en"
  }, {
    path: "/applyVacancy",
    component: _20666763,
    name: "applyVacancy___en"
  }, {
    path: "/ar",
    component: _6de64e0c,
    name: "index___ar"
  }, {
    path: "/candidate",
    component: _1942593d,
    name: "candidate___en"
  }, {
    path: "/candidateresponse",
    component: _03f8effe,
    name: "candidateresponse___en"
  }, {
    path: "/candidatevacancy",
    component: _d3588164,
    name: "candidatevacancy___en"
  }, {
    path: "/editVacancy",
    component: _8506d96a,
    name: "editVacancy___en"
  }, {
    path: "/login",
    component: _378df123,
    name: "login___en"
  }, {
    path: "/notifications",
    component: _6a54fd22,
    name: "notifications___en"
  }, {
    path: "/showAnswers",
    component: _7cdf8f72,
    name: "showAnswers___en"
  }, {
    path: "/signup",
    component: _068a204e,
    name: "signup___en"
  }, {
    path: "/user",
    component: _162e9901,
    name: "user___en"
  }, {
    path: "/Vacancies",
    component: _74831a1a,
    name: "Vacancies___en"
  }, {
    path: "/ar/addVancany",
    component: _7866c1be,
    name: "addVancany___ar"
  }, {
    path: "/ar/adminSignup",
    component: _5bff8a81,
    name: "adminSignup___ar"
  }, {
    path: "/ar/applyVacancy",
    component: _20666763,
    name: "applyVacancy___ar"
  }, {
    path: "/ar/candidate",
    component: _1942593d,
    name: "candidate___ar"
  }, {
    path: "/ar/candidateresponse",
    component: _03f8effe,
    name: "candidateresponse___ar"
  }, {
    path: "/ar/candidatevacancy",
    component: _d3588164,
    name: "candidatevacancy___ar"
  }, {
    path: "/ar/editVacancy",
    component: _8506d96a,
    name: "editVacancy___ar"
  }, {
    path: "/ar/login",
    component: _378df123,
    name: "login___ar"
  }, {
    path: "/ar/notifications",
    component: _6a54fd22,
    name: "notifications___ar"
  }, {
    path: "/ar/showAnswers",
    component: _7cdf8f72,
    name: "showAnswers___ar"
  }, {
    path: "/ar/signup",
    component: _068a204e,
    name: "signup___ar"
  }, {
    path: "/ar/user",
    component: _162e9901,
    name: "user___ar"
  }, {
    path: "/ar/Vacancies",
    component: _74831a1a,
    name: "Vacancies___ar"
  }, {
    path: "/GeneralViews/NotFoundPage",
    component: _23ea333e,
    name: "GeneralViews-NotFoundPage___en"
  }, {
    path: "/ar/GeneralViews/NotFoundPage",
    component: _23ea333e,
    name: "GeneralViews-NotFoundPage___ar"
  }, {
    path: "/",
    component: _6de64e0c,
    name: "index___en"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}

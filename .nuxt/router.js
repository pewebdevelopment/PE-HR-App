import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1c141af3 = () => interopDefault(import('..\\pages\\addVancany.vue' /* webpackChunkName: "pages/addVancany" */))
const _0ca788ef = () => interopDefault(import('..\\pages\\adminSignup.vue' /* webpackChunkName: "pages/adminSignup" */))
const _f6839296 = () => interopDefault(import('..\\pages\\applyVacancy.vue' /* webpackChunkName: "pages/applyVacancy" */))
const _7b5d920c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _09d9c9aa = () => interopDefault(import('..\\pages\\candidate.vue' /* webpackChunkName: "pages/candidate" */))
const _f5d03828 = () => interopDefault(import('..\\pages\\candidateresponse.vue' /* webpackChunkName: "pages/candidateresponse" */))
const _60af95a0 = () => interopDefault(import('..\\pages\\candidatevacancy.vue' /* webpackChunkName: "pages/candidatevacancy" */))
const _6e2491b9 = () => interopDefault(import('..\\pages\\editVacancy.vue' /* webpackChunkName: "pages/editVacancy" */))
const _e80e4bde = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _de11cfe0 = () => interopDefault(import('..\\pages\\notifications.vue' /* webpackChunkName: "pages/notifications" */))
const _2d878de0 = () => interopDefault(import('..\\pages\\showAnswers.vue' /* webpackChunkName: "pages/showAnswers" */))
const _3f7c5520 = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages/signup" */))
const _296bda53 = () => interopDefault(import('..\\pages\\user.vue' /* webpackChunkName: "pages/user" */))
const _b0e1963e = () => interopDefault(import('..\\pages\\Vacancies.vue' /* webpackChunkName: "pages/Vacancies" */))
const _1ad2ad68 = () => interopDefault(import('..\\pages\\GeneralViews\\NotFoundPage.vue' /* webpackChunkName: "pages/GeneralViews/NotFoundPage" */))

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
    component: _1c141af3,
    name: "addVancany___en"
  }, {
    path: "/adminSignup",
    component: _0ca788ef,
    name: "adminSignup___en"
  }, {
    path: "/applyVacancy",
    component: _f6839296,
    name: "applyVacancy___en"
  }, {
    path: "/ar",
    component: _7b5d920c,
    name: "index___ar"
  }, {
    path: "/candidate",
    component: _09d9c9aa,
    name: "candidate___en"
  }, {
    path: "/candidateresponse",
    component: _f5d03828,
    name: "candidateresponse___en"
  }, {
    path: "/candidatevacancy",
    component: _60af95a0,
    name: "candidatevacancy___en"
  }, {
    path: "/editVacancy",
    component: _6e2491b9,
    name: "editVacancy___en"
  }, {
    path: "/login",
    component: _e80e4bde,
    name: "login___en"
  }, {
    path: "/notifications",
    component: _de11cfe0,
    name: "notifications___en"
  }, {
    path: "/showAnswers",
    component: _2d878de0,
    name: "showAnswers___en"
  }, {
    path: "/signup",
    component: _3f7c5520,
    name: "signup___en"
  }, {
    path: "/user",
    component: _296bda53,
    name: "user___en"
  }, {
    path: "/Vacancies",
    component: _b0e1963e,
    name: "Vacancies___en"
  }, {
    path: "/ar/addVancany",
    component: _1c141af3,
    name: "addVancany___ar"
  }, {
    path: "/ar/adminSignup",
    component: _0ca788ef,
    name: "adminSignup___ar"
  }, {
    path: "/ar/applyVacancy",
    component: _f6839296,
    name: "applyVacancy___ar"
  }, {
    path: "/ar/candidate",
    component: _09d9c9aa,
    name: "candidate___ar"
  }, {
    path: "/ar/candidateresponse",
    component: _f5d03828,
    name: "candidateresponse___ar"
  }, {
    path: "/ar/candidatevacancy",
    component: _60af95a0,
    name: "candidatevacancy___ar"
  }, {
    path: "/ar/editVacancy",
    component: _6e2491b9,
    name: "editVacancy___ar"
  }, {
    path: "/ar/login",
    component: _e80e4bde,
    name: "login___ar"
  }, {
    path: "/ar/notifications",
    component: _de11cfe0,
    name: "notifications___ar"
  }, {
    path: "/ar/showAnswers",
    component: _2d878de0,
    name: "showAnswers___ar"
  }, {
    path: "/ar/signup",
    component: _3f7c5520,
    name: "signup___ar"
  }, {
    path: "/ar/user",
    component: _296bda53,
    name: "user___ar"
  }, {
    path: "/ar/Vacancies",
    component: _b0e1963e,
    name: "Vacancies___ar"
  }, {
    path: "/GeneralViews/NotFoundPage",
    component: _1ad2ad68,
    name: "GeneralViews-NotFoundPage___en"
  }, {
    path: "/ar/GeneralViews/NotFoundPage",
    component: _1ad2ad68,
    name: "GeneralViews-NotFoundPage___ar"
  }, {
    path: "/",
    component: _7b5d920c,
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

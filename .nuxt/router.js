import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _98d95bec = () => interopDefault(import('..\\pages\\addVancany.vue' /* webpackChunkName: "pages/addVancany" */))
const _650f34b8 = () => interopDefault(import('..\\pages\\adminSignup.vue' /* webpackChunkName: "pages/adminSignup" */))
const _394c040c = () => interopDefault(import('..\\pages\\applyVacancy.vue' /* webpackChunkName: "pages/applyVacancy" */))
const _3db3ad83 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _7bd52534 = () => interopDefault(import('..\\pages\\candidate.vue' /* webpackChunkName: "pages/candidate" */))
const _0697d4f5 = () => interopDefault(import('..\\pages\\candidateresponse.vue' /* webpackChunkName: "pages/candidateresponse" */))
const _5458df77 = () => interopDefault(import('..\\pages\\candidatevacancy.vue' /* webpackChunkName: "pages/candidatevacancy" */))
const _72e784fc = () => interopDefault(import('..\\pages\\editVacancy.vue' /* webpackChunkName: "pages/editVacancy" */))
const _075b509a = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _6e22f599 = () => interopDefault(import('..\\pages\\notifications.vue' /* webpackChunkName: "pages/notifications" */))
const _f4218cae = () => interopDefault(import('..\\pages\\showAnswers.vue' /* webpackChunkName: "pages/showAnswers" */))
const _3068afb7 = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages/signup" */))
const _7be822ac = () => interopDefault(import('..\\pages\\user.vue' /* webpackChunkName: "pages/user" */))
const _28513eea = () => interopDefault(import('..\\pages\\Vacancies.vue' /* webpackChunkName: "pages/Vacancies" */))
const _6a0ad263 = () => interopDefault(import('..\\pages\\GeneralViews\\NotFoundPage.vue' /* webpackChunkName: "pages/GeneralViews/NotFoundPage" */))

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
    component: _98d95bec,
    name: "addVancany___en"
  }, {
    path: "/adminSignup",
    component: _650f34b8,
    name: "adminSignup___en"
  }, {
    path: "/applyVacancy",
    component: _394c040c,
    name: "applyVacancy___en"
  }, {
    path: "/ar",
    component: _3db3ad83,
    name: "index___ar"
  }, {
    path: "/candidate",
    component: _7bd52534,
    name: "candidate___en"
  }, {
    path: "/candidateresponse",
    component: _0697d4f5,
    name: "candidateresponse___en"
  }, {
    path: "/candidatevacancy",
    component: _5458df77,
    name: "candidatevacancy___en"
  }, {
    path: "/editVacancy",
    component: _72e784fc,
    name: "editVacancy___en"
  }, {
    path: "/login",
    component: _075b509a,
    name: "login___en"
  }, {
    path: "/notifications",
    component: _6e22f599,
    name: "notifications___en"
  }, {
    path: "/showAnswers",
    component: _f4218cae,
    name: "showAnswers___en"
  }, {
    path: "/signup",
    component: _3068afb7,
    name: "signup___en"
  }, {
    path: "/user",
    component: _7be822ac,
    name: "user___en"
  }, {
    path: "/Vacancies",
    component: _28513eea,
    name: "Vacancies___en"
  }, {
    path: "/ar/addVancany",
    component: _98d95bec,
    name: "addVancany___ar"
  }, {
    path: "/ar/adminSignup",
    component: _650f34b8,
    name: "adminSignup___ar"
  }, {
    path: "/ar/applyVacancy",
    component: _394c040c,
    name: "applyVacancy___ar"
  }, {
    path: "/ar/candidate",
    component: _7bd52534,
    name: "candidate___ar"
  }, {
    path: "/ar/candidateresponse",
    component: _0697d4f5,
    name: "candidateresponse___ar"
  }, {
    path: "/ar/candidatevacancy",
    component: _5458df77,
    name: "candidatevacancy___ar"
  }, {
    path: "/ar/editVacancy",
    component: _72e784fc,
    name: "editVacancy___ar"
  }, {
    path: "/ar/login",
    component: _075b509a,
    name: "login___ar"
  }, {
    path: "/ar/notifications",
    component: _6e22f599,
    name: "notifications___ar"
  }, {
    path: "/ar/showAnswers",
    component: _f4218cae,
    name: "showAnswers___ar"
  }, {
    path: "/ar/signup",
    component: _3068afb7,
    name: "signup___ar"
  }, {
    path: "/ar/user",
    component: _7be822ac,
    name: "user___ar"
  }, {
    path: "/ar/Vacancies",
    component: _28513eea,
    name: "Vacancies___ar"
  }, {
    path: "/GeneralViews/NotFoundPage",
    component: _6a0ad263,
    name: "GeneralViews-NotFoundPage___en"
  }, {
    path: "/ar/GeneralViews/NotFoundPage",
    component: _6a0ad263,
    name: "GeneralViews-NotFoundPage___ar"
  }, {
    path: "/",
    component: _3db3ad83,
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

import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _f638972c = () => interopDefault(import('..\\pages\\addVancany.vue' /* webpackChunkName: "pages/addVancany" */))
const _8469c350 = () => interopDefault(import('..\\pages\\adminSignup.vue' /* webpackChunkName: "pages/adminSignup" */))
const _0fe56328 = () => interopDefault(import('..\\pages\\applyVacancy.vue' /* webpackChunkName: "pages/applyVacancy" */))
const _25874f23 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _27bef6d4 = () => interopDefault(import('..\\pages\\candidate.vue' /* webpackChunkName: "pages/candidate" */))
const _42e60695 = () => interopDefault(import('..\\pages\\candidateresponse.vue' /* webpackChunkName: "pages/candidateresponse" */))
const _3aa40c52 = () => interopDefault(import('..\\pages\\candidatevacancy.vue' /* webpackChunkName: "pages/candidatevacancy" */))
const _21a21b8c = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _f0ea118e = () => interopDefault(import('..\\pages\\notifications.vue' /* webpackChunkName: "pages/notifications" */))
const _42a9b96e = () => interopDefault(import('..\\pages\\showAnswers.vue' /* webpackChunkName: "pages/showAnswers" */))
const _43094217 = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages/signup" */))
const _666d990a = () => interopDefault(import('..\\pages\\user.vue' /* webpackChunkName: "pages/user" */))
const _5789deec = () => interopDefault(import('..\\pages\\Vacancies.vue' /* webpackChunkName: "pages/Vacancies" */))
const _3beb167a = () => interopDefault(import('..\\pages\\GeneralViews\\NotFoundPage.vue' /* webpackChunkName: "pages/GeneralViews/NotFoundPage" */))

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
    component: _f638972c,
    name: "addVancany___en"
  }, {
    path: "/adminSignup",
    component: _8469c350,
    name: "adminSignup___en"
  }, {
    path: "/applyVacancy",
    component: _0fe56328,
    name: "applyVacancy___en"
  }, {
    path: "/ar",
    component: _25874f23,
    name: "index___ar"
  }, {
    path: "/candidate",
    component: _27bef6d4,
    name: "candidate___en"
  }, {
    path: "/candidateresponse",
    component: _42e60695,
    name: "candidateresponse___en"
  }, {
    path: "/candidatevacancy",
    component: _3aa40c52,
    name: "candidatevacancy___en"
  }, {
    path: "/login",
    component: _21a21b8c,
    name: "login___en"
  }, {
    path: "/notifications",
    component: _f0ea118e,
    name: "notifications___en"
  }, {
    path: "/showAnswers",
    component: _42a9b96e,
    name: "showAnswers___en"
  }, {
    path: "/signup",
    component: _43094217,
    name: "signup___en"
  }, {
    path: "/user",
    component: _666d990a,
    name: "user___en"
  }, {
    path: "/Vacancies",
    component: _5789deec,
    name: "Vacancies___en"
  }, {
    path: "/ar/addVancany",
    component: _f638972c,
    name: "addVancany___ar"
  }, {
    path: "/ar/adminSignup",
    component: _8469c350,
    name: "adminSignup___ar"
  }, {
    path: "/ar/applyVacancy",
    component: _0fe56328,
    name: "applyVacancy___ar"
  }, {
    path: "/ar/candidate",
    component: _27bef6d4,
    name: "candidate___ar"
  }, {
    path: "/ar/candidateresponse",
    component: _42e60695,
    name: "candidateresponse___ar"
  }, {
    path: "/ar/candidatevacancy",
    component: _3aa40c52,
    name: "candidatevacancy___ar"
  }, {
    path: "/ar/login",
    component: _21a21b8c,
    name: "login___ar"
  }, {
    path: "/ar/notifications",
    component: _f0ea118e,
    name: "notifications___ar"
  }, {
    path: "/ar/showAnswers",
    component: _42a9b96e,
    name: "showAnswers___ar"
  }, {
    path: "/ar/signup",
    component: _43094217,
    name: "signup___ar"
  }, {
    path: "/ar/user",
    component: _666d990a,
    name: "user___ar"
  }, {
    path: "/ar/Vacancies",
    component: _5789deec,
    name: "Vacancies___ar"
  }, {
    path: "/GeneralViews/NotFoundPage",
    component: _3beb167a,
    name: "GeneralViews-NotFoundPage___en"
  }, {
    path: "/ar/GeneralViews/NotFoundPage",
    component: _3beb167a,
    name: "GeneralViews-NotFoundPage___ar"
  }, {
    path: "/",
    component: _25874f23,
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

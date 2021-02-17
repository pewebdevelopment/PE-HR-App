import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1b67c8b9 = () => interopDefault(import('../pages/addVancany.vue' /* webpackChunkName: "pages/addVancany" */))
const _106cd82e = () => interopDefault(import('../pages/adminSignup.vue' /* webpackChunkName: "pages/adminSignup" */))
const _0444ea0a = () => interopDefault(import('../pages/applyVacancy.vue' /* webpackChunkName: "pages/applyVacancy" */))
const _06ad8574 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _034f9ca5 = () => interopDefault(import('../pages/candidate.vue' /* webpackChunkName: "pages/candidate" */))
const _943f6934 = () => interopDefault(import('../pages/candidateresponse.vue' /* webpackChunkName: "pages/candidateresponse" */))
const _54415234 = () => interopDefault(import('../pages/candidatevacancy.vue' /* webpackChunkName: "pages/candidatevacancy" */))
const _59469cb3 = () => interopDefault(import('../pages/editVacancy.vue' /* webpackChunkName: "pages/editVacancy" */))
const _5f55aeea = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _3bc24c8a = () => interopDefault(import('../pages/notifications.vue' /* webpackChunkName: "pages/notifications" */))
const _18a998da = () => interopDefault(import('../pages/showAnswers.vue' /* webpackChunkName: "pages/showAnswers" */))
const _f2ac5434 = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _656ed499 = () => interopDefault(import('../pages/user.vue' /* webpackChunkName: "pages/user" */))
const _a068934a = () => interopDefault(import('../pages/Vacancies.vue' /* webpackChunkName: "pages/Vacancies" */))
const _583459c9 = () => interopDefault(import('../pages/GeneralViews/NotFoundPage.vue' /* webpackChunkName: "pages/GeneralViews/NotFoundPage" */))

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
    component: _1b67c8b9,
    name: "addVancany___en"
  }, {
    path: "/adminSignup",
    component: _106cd82e,
    name: "adminSignup___en"
  }, {
    path: "/applyVacancy",
    component: _0444ea0a,
    name: "applyVacancy___en"
  }, {
    path: "/ar",
    component: _06ad8574,
    name: "index___ar"
  }, {
    path: "/candidate",
    component: _034f9ca5,
    name: "candidate___en"
  }, {
    path: "/candidateresponse",
    component: _943f6934,
    name: "candidateresponse___en"
  }, {
    path: "/candidatevacancy",
    component: _54415234,
    name: "candidatevacancy___en"
  }, {
    path: "/editVacancy",
    component: _59469cb3,
    name: "editVacancy___en"
  }, {
    path: "/login",
    component: _5f55aeea,
    name: "login___en"
  }, {
    path: "/notifications",
    component: _3bc24c8a,
    name: "notifications___en"
  }, {
    path: "/showAnswers",
    component: _18a998da,
    name: "showAnswers___en"
  }, {
    path: "/signup",
    component: _f2ac5434,
    name: "signup___en"
  }, {
    path: "/user",
    component: _656ed499,
    name: "user___en"
  }, {
    path: "/Vacancies",
    component: _a068934a,
    name: "Vacancies___en"
  }, {
    path: "/ar/addVancany",
    component: _1b67c8b9,
    name: "addVancany___ar"
  }, {
    path: "/ar/adminSignup",
    component: _106cd82e,
    name: "adminSignup___ar"
  }, {
    path: "/ar/applyVacancy",
    component: _0444ea0a,
    name: "applyVacancy___ar"
  }, {
    path: "/ar/candidate",
    component: _034f9ca5,
    name: "candidate___ar"
  }, {
    path: "/ar/candidateresponse",
    component: _943f6934,
    name: "candidateresponse___ar"
  }, {
    path: "/ar/candidatevacancy",
    component: _54415234,
    name: "candidatevacancy___ar"
  }, {
    path: "/ar/editVacancy",
    component: _59469cb3,
    name: "editVacancy___ar"
  }, {
    path: "/ar/login",
    component: _5f55aeea,
    name: "login___ar"
  }, {
    path: "/ar/notifications",
    component: _3bc24c8a,
    name: "notifications___ar"
  }, {
    path: "/ar/showAnswers",
    component: _18a998da,
    name: "showAnswers___ar"
  }, {
    path: "/ar/signup",
    component: _f2ac5434,
    name: "signup___ar"
  }, {
    path: "/ar/user",
    component: _656ed499,
    name: "user___ar"
  }, {
    path: "/ar/Vacancies",
    component: _a068934a,
    name: "Vacancies___ar"
  }, {
    path: "/GeneralViews/NotFoundPage",
    component: _583459c9,
    name: "GeneralViews-NotFoundPage___en"
  }, {
    path: "/ar/GeneralViews/NotFoundPage",
    component: _583459c9,
    name: "GeneralViews-NotFoundPage___ar"
  }, {
    path: "/",
    component: _06ad8574,
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

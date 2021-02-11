import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _79060032 = () => interopDefault(import('..\\pages\\addVancany.vue' /* webpackChunkName: "pages/addVancany" */))
const _4df24b90 = () => interopDefault(import('..\\pages\\adminSignup.vue' /* webpackChunkName: "pages/adminSignup" */))
const _0df2734a = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _987fdbe8 = () => interopDefault(import('..\\pages\\candidate.vue' /* webpackChunkName: "pages/candidate" */))
const _36d72c66 = () => interopDefault(import('..\\pages\\candidateresponse.vue' /* webpackChunkName: "pages/candidateresponse" */))
const _7c8a4f9f = () => interopDefault(import('..\\pages\\candidatevacancy.vue' /* webpackChunkName: "pages/candidatevacancy" */))
const _7aa32d1c = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _aac8931e = () => interopDefault(import('..\\pages\\notifications.vue' /* webpackChunkName: "pages/notifications" */))
const _410e9c42 = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages/signup" */))
const _f3f34a5c = () => interopDefault(import('..\\pages\\user.vue' /* webpackChunkName: "pages/user" */))
const _603c2bc2 = () => interopDefault(import('..\\pages\\Vacancies.vue' /* webpackChunkName: "pages/Vacancies" */))
const _1aec308b = () => interopDefault(import('..\\pages\\GeneralViews\\NotFoundPage.vue' /* webpackChunkName: "pages/GeneralViews/NotFoundPage" */))

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
    component: _79060032,
    name: "addVancany___en"
  }, {
    path: "/adminSignup",
    component: _4df24b90,
    name: "adminSignup___en"
  }, {
    path: "/ar",
    component: _0df2734a,
    name: "index___ar"
  }, {
    path: "/candidate",
    component: _987fdbe8,
    name: "candidate___en"
  }, {
    path: "/candidateresponse",
    component: _36d72c66,
    name: "candidateresponse___en"
  }, {
    path: "/candidatevacancy",
    component: _7c8a4f9f,
    name: "candidatevacancy___en"
  }, {
    path: "/login",
    component: _7aa32d1c,
    name: "login___en"
  }, {
    path: "/notifications",
    component: _aac8931e,
    name: "notifications___en"
  }, {
    path: "/signup",
    component: _410e9c42,
    name: "signup___en"
  }, {
    path: "/user",
    component: _f3f34a5c,
    name: "user___en"
  }, {
    path: "/Vacancies",
    component: _603c2bc2,
    name: "Vacancies___en"
  }, {
    path: "/ar/addVancany",
    component: _79060032,
    name: "addVancany___ar"
  }, {
    path: "/ar/adminSignup",
    component: _4df24b90,
    name: "adminSignup___ar"
  }, {
    path: "/ar/candidate",
    component: _987fdbe8,
    name: "candidate___ar"
  }, {
    path: "/ar/candidateresponse",
    component: _36d72c66,
    name: "candidateresponse___ar"
  }, {
    path: "/ar/candidatevacancy",
    component: _7c8a4f9f,
    name: "candidatevacancy___ar"
  }, {
    path: "/ar/login",
    component: _7aa32d1c,
    name: "login___ar"
  }, {
    path: "/ar/notifications",
    component: _aac8931e,
    name: "notifications___ar"
  }, {
    path: "/ar/signup",
    component: _410e9c42,
    name: "signup___ar"
  }, {
    path: "/ar/user",
    component: _f3f34a5c,
    name: "user___ar"
  }, {
    path: "/ar/Vacancies",
    component: _603c2bc2,
    name: "Vacancies___ar"
  }, {
    path: "/GeneralViews/NotFoundPage",
    component: _1aec308b,
    name: "GeneralViews-NotFoundPage___en"
  }, {
    path: "/ar/GeneralViews/NotFoundPage",
    component: _1aec308b,
    name: "GeneralViews-NotFoundPage___ar"
  }, {
    path: "/",
    component: _0df2734a,
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

import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _9a9378b2 = () => interopDefault(import('..\\pages\\addVancany.vue' /* webpackChunkName: "pages/addVancany" */))
const _0e052474 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _0021e812 = () => interopDefault(import('..\\pages\\candidate.vue' /* webpackChunkName: "pages/candidate" */))
const _64e76e90 = () => interopDefault(import('..\\pages\\candidateresponse.vue' /* webpackChunkName: "pages/candidateresponse" */))
const _20f56754 = () => interopDefault(import('..\\pages\\candidatevacancy.vue' /* webpackChunkName: "pages/candidatevacancy" */))
const _7ab5de46 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _1cd47a48 = () => interopDefault(import('..\\pages\\notifications.vue' /* webpackChunkName: "pages/notifications" */))
const _43521058 = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages/signup" */))
const _4c379a07 = () => interopDefault(import('..\\pages\\user.vue' /* webpackChunkName: "pages/user" */))
const _a729b4a6 = () => interopDefault(import('..\\pages\\Vacancies.vue' /* webpackChunkName: "pages/Vacancies" */))
const _4758ea00 = () => interopDefault(import('..\\pages\\GeneralViews\\NotFoundPage.vue' /* webpackChunkName: "pages/GeneralViews/NotFoundPage" */))

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
    component: _9a9378b2,
    name: "addVancany___en"
  }, {
    path: "/ar",
    component: _0e052474,
    name: "index___ar"
  }, {
    path: "/candidate",
    component: _0021e812,
    name: "candidate___en"
  }, {
    path: "/candidateresponse",
    component: _64e76e90,
    name: "candidateresponse___en"
  }, {
    path: "/candidatevacancy",
    component: _20f56754,
    name: "candidatevacancy___en"
  }, {
    path: "/login",
    component: _7ab5de46,
    name: "login___en"
  }, {
    path: "/notifications",
    component: _1cd47a48,
    name: "notifications___en"
  }, {
    path: "/signup",
    component: _43521058,
    name: "signup___en"
  }, {
    path: "/user",
    component: _4c379a07,
    name: "user___en"
  }, {
    path: "/Vacancies",
    component: _a729b4a6,
    name: "Vacancies___en"
  }, {
    path: "/ar/addVancany",
    component: _9a9378b2,
    name: "addVancany___ar"
  }, {
    path: "/ar/candidate",
    component: _0021e812,
    name: "candidate___ar"
  }, {
    path: "/ar/candidateresponse",
    component: _64e76e90,
    name: "candidateresponse___ar"
  }, {
    path: "/ar/candidatevacancy",
    component: _20f56754,
    name: "candidatevacancy___ar"
  }, {
    path: "/ar/login",
    component: _7ab5de46,
    name: "login___ar"
  }, {
    path: "/ar/notifications",
    component: _1cd47a48,
    name: "notifications___ar"
  }, {
    path: "/ar/signup",
    component: _43521058,
    name: "signup___ar"
  }, {
    path: "/ar/user",
    component: _4c379a07,
    name: "user___ar"
  }, {
    path: "/ar/Vacancies",
    component: _a729b4a6,
    name: "Vacancies___ar"
  }, {
    path: "/GeneralViews/NotFoundPage",
    component: _4758ea00,
    name: "GeneralViews-NotFoundPage___en"
  }, {
    path: "/ar/GeneralViews/NotFoundPage",
    component: _4758ea00,
    name: "GeneralViews-NotFoundPage___ar"
  }, {
    path: "/",
    component: _0e052474,
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

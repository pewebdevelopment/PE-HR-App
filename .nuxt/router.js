import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _06ec6ed9 = () => interopDefault(import('..\\pages\\addVancany.vue' /* webpackChunkName: "pages/addVancany" */))
const _2a218b54 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _c0e49af6 = () => interopDefault(import('..\\pages\\candidate.vue' /* webpackChunkName: "pages/candidate" */))
const _e5cafd74 = () => interopDefault(import('..\\pages\\candidateresponse.vue' /* webpackChunkName: "pages/candidateresponse" */))
const _14d235f4 = () => interopDefault(import('..\\pages\\candidatevacancy.vue' /* webpackChunkName: "pages/candidatevacancy" */))
const _857b1b2c = () => interopDefault(import('..\\pages\\notifications.vue' /* webpackChunkName: "pages/notifications" */))
const _3b1ada8e = () => interopDefault(import('..\\pages\\user.vue' /* webpackChunkName: "pages/user" */))
const _4c09cc3b = () => interopDefault(import('..\\pages\\Vacancies.vue' /* webpackChunkName: "pages/Vacancies" */))
const _8df31d9c = () => interopDefault(import('..\\pages\\GeneralViews\\NotFoundPage.vue' /* webpackChunkName: "pages/GeneralViews/NotFoundPage" */))

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
    component: _06ec6ed9,
    name: "addVancany___en"
  }, {
    path: "/ar",
    component: _2a218b54,
    name: "index___ar"
  }, {
    path: "/candidate",
    component: _c0e49af6,
    name: "candidate___en"
  }, {
    path: "/candidateresponse",
    component: _e5cafd74,
    name: "candidateresponse___en"
  }, {
    path: "/candidatevacancy",
    component: _14d235f4,
    name: "candidatevacancy___en"
  }, {
    path: "/notifications",
    component: _857b1b2c,
    name: "notifications___en"
  }, {
    path: "/user",
    component: _3b1ada8e,
    name: "user___en"
  }, {
    path: "/Vacancies",
    component: _4c09cc3b,
    name: "Vacancies___en"
  }, {
    path: "/ar/addVancany",
    component: _06ec6ed9,
    name: "addVancany___ar"
  }, {
    path: "/ar/candidate",
    component: _c0e49af6,
    name: "candidate___ar"
  }, {
    path: "/ar/candidateresponse",
    component: _e5cafd74,
    name: "candidateresponse___ar"
  }, {
    path: "/ar/candidatevacancy",
    component: _14d235f4,
    name: "candidatevacancy___ar"
  }, {
    path: "/ar/notifications",
    component: _857b1b2c,
    name: "notifications___ar"
  }, {
    path: "/ar/user",
    component: _3b1ada8e,
    name: "user___ar"
  }, {
    path: "/ar/Vacancies",
    component: _4c09cc3b,
    name: "Vacancies___ar"
  }, {
    path: "/GeneralViews/NotFoundPage",
    component: _8df31d9c,
    name: "GeneralViews-NotFoundPage___en"
  }, {
    path: "/ar/GeneralViews/NotFoundPage",
    component: _8df31d9c,
    name: "GeneralViews-NotFoundPage___ar"
  }, {
    path: "/",
    component: _2a218b54,
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

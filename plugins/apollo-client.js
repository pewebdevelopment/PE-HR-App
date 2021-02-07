import { createHttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-fetch'

export default function(context) {
  return {
    defaultHttpLink: false,
    link: createHttpLink({
      //this is appolo-client.js in plugins folder of nuxt app 
      uri: 'http://localhost:5000/graphql',
      //credentials: 'include',
      fetch: (uri, options) => {
        //const token = typeof window !== 'undefined' ? localStorage.getItem('idToken') : null

        options.headers['Authorization'] = typeof window !== 'undefined' ? localStorage.getItem('idToken') : null

        return fetch(uri, options)
      }
    })
  }
}
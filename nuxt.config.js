const baseUrl = require('./modules/baseUrl')
module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || `http://${baseUrl.host}:${baseUrl.port}`,
    apiUrl: `http://${baseUrl.host}:${baseUrl.port}/api`
  },
  head: {
    title: 'element-ui',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Nuxt.js project'}
    ],
    link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#3B8070'},
  /*
  ** Build configuration
  */
  plugins: ['~/plugins/element-ui'],
  css: ['~/assets/scss/main.scss'],
  build: {
    vendor: ['axios', 'vuex-class', 'nuxt-class-component', 'element-ui']
  },
  /*router: {
    middleware: 'getData'
  },*/
  modules: ['~/modules/typescript.js']
}

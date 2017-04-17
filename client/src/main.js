// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

import './assets/css/main.css'
import 'animate.css'
import 'github-markdown-css'

Vue.use(VueResource)

Vue.config.productionTip = false

// router.beforeEach(function() {
//     window.scrollTo(0, 0);
// })

// router.afterEach(function(transition) {
//     console.log('-----',transition);
// })

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import $ from 'jquery'
import QuillEditor from 'vue-quill-editor';

import './assets/css/main.css'
import 'animate.css'
import 'github-markdown-css';
import Global_ from './assets/js/global.js'

Vue.use(VueResource)
Vue.use(QuillEditor)

Vue.config.productionTip = false;
Vue.prototype.global_url = Global_;
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

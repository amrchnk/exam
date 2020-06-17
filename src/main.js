import Vue from 'vue'
import App from './App.vue'
import Main from './components/main.vue'
import Workers from './components/workers.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.config.productionTip = false
Vue.use(VueRouter)


const router=new VueRouter({
	mode:'history',
	routes:[
		{path:'/main',component:Main},
		{path:'/workers',component:Workers}
	],
	linkActiveClass:'active'
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

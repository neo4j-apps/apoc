import Vue from 'vue'
import VueRouter from 'vue-router'

import Doc from './routes/Doc'

Vue.use(VueRouter)

const routes = [
    { path: '*', component: Doc, },
]

export default new VueRouter({
    // mode: 'history',
    routes,
})
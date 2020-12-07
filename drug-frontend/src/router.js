import Vue from 'vue'
import Router from 'vue-router'
import MedicineListPage from './Views/MedicineListPage.vue'
import AccountPage from './Views/AccountPage.vue'
import MedicinePage from './Views/MedicinePage.vue'
import IntakeMomentsListPage from './Views/IntakeMomentsListPage.vue'
import Dashboard from "./components/Dashboard.vue"
Vue.use(Router)


 export default new Router({
  routes: [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ './Views/Home.vue')
      },
      {
        path: '/medicinelist',
        name: 'MedicineList',
        component: MedicineListPage
      },
      {
        path: '/intakelist',
        name: 'intakelist',
        component: IntakeMomentsListPage
      },
      {
        path: '/account',
        name: 'Account',
        component: AccountPage
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
      },
      {
        path: '/medicineDetail/:id',
        name: 'MedicineDetail',
        component: MedicinePage
      },      
  ]
})
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Container from '../components/Container'
const Container = () => import(/* webpackChunkName: "GoodsList_Add" */ '../components/Container')
// import Home from '../components/Main/Home'
const Home = () => import(/* webpackChunkName: "GoodsList_Add" */ '../components/Main/Home')
// import List from '../components/Main/List'
const List = () => import(/* webpackChunkName: "GoodsList_Add" */ '../components/Main/List')
// import Order from '../components/Main/Order'
const Order = () => import(/* webpackChunkName: "GoodsList_Add" */ '../components/Main/Order')
// import SignUp from '../components/user/SignUp'
const SignUp = () => import(/* webpackChunkName: "GoodsList_Add" */ '../components/user/SignUp')
// import Login from '../components/user/Login'
const Login = () => import(/* webpackChunkName: "GoodsList_Add" */ '../components/user/Login')
// import UserCenter from '../components/user/UserCenter'
const UserCenter = () => import(/* webpackChunkName: "GoodsList_Add" */ '../components/user/UserCenter')
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Container',
    component: Container,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/order',
        name: 'Order',
        component: Order
      },
      {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
      },
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/usercenter',
        name: 'UserCenter',
        component: UserCenter
      }
    ]
  },
  {
    path: '/list',
    name: 'List',
    component: List
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/signup') return next()
  const tokenStr = window.sessionStorage.getItem('username')
  if (!tokenStr) return next('/login')
  next()
})

export default router

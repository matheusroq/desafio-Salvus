import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import CadastroProfissional from '../views/CadastroProfissional.vue'
import Perfil from '../views/Perfil.vue'
import EditDadosPessoais from '../views/EditDadosPessoais.vue'
import EditDadosProfissionais from '../views/EditDadosProfissionais.vue'
import Logout from '../views/Logout.vue'



import axios from '../services/axios';
import { instance } from '../services/toast';

Vue.use(VueRouter)

 async function auth(to, from, next) {
  const auth = localStorage.getItem('token');

  if(auth) {
    try {
      const req = {
        headers: {
          Authorization: `Bearer ${auth}`
        }
      }
     
      const { data } = await axios.post('/usuario/validate', {}, req)
     
      if(!data.errors) {
        next();
      } else {
        instance.error(data.errors[0], {
          position: 'top'
        })
        next('/')
      }
    } catch (error) {
      console.log(error)
    }
   
  } else {
    next('/')
  }
} 

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profissional/:id',
    name: 'CadastroProfissional',
    component: CadastroProfissional
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: auth
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
    beforeEnter: auth
  },
  {
    path: '/edit/dados-pessoais/:id',
    name: 'EditDadosPessoais',
    component: EditDadosPessoais,
    beforeEnter: auth
  },
  {
    path: '/edit/dados-profissionais/:id',
    name: 'EditDadosProfissionais',
    component: EditDadosProfissionais,
    beforeEnter: auth
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout 
  }, 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

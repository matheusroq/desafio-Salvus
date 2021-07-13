<template>
 <div id="nav">
    <div v-if="navHome == true">
      <router-link to="/">Login</router-link> 
      <router-link to="/register">Registro</router-link>
    </div>
    <div v-else> 
      <router-link to="/perfil"><font-awesome-icon icon="user" size="2x" /></router-link>
      <router-link to="/home"><font-awesome-icon icon="home" size="2x" /></router-link>
    
      <router-link id="logout" to="/logout"><font-awesome-icon icon="sign-out-alt" size="2x"/></router-link>
    </div>

  </div>

</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import Vue from 'vue'

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)
export default {
    name: 'Nav',
    props: {
      navHome: Boolean 
    }
}
</script>


<style scoped>
#nav {
  padding: 20px;
  margin: 0;
  margin-bottom: 10px;
  background-color: #111;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 30px;
  text-decoration: none;
  cursor: pointer;
  transform: 400ms;

}
#nav a:hover{
    color: rgba(255, 255, 255, 0.8);
    border-radius: 4px;
}
#nav a.router-link-exact-active {
  color: #42b983;

}
#logout {
  float: right;
  margin-top: -40px;
   margin-bottom: 10px;
}
</style>
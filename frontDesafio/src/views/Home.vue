<template>
  <div class="home">
  <Nav :navHome="false" />
    <div id="totalCads">
        <font-awesome-icon icon="user-circle" size="2x" />
        <h4>Total de cadatrados: </h4>
        {{totalCadastrados}} 
      </div>
      <div id="areaInfo">
        <div class="totalPorArea">
          <h5> Médicos: </h5>
          {{totalM}}
        </div>
        <div class="totalPorArea">
          <h5> Enfermeiros: </h5>
        {{totalEnfermeiros}}
        </div>
        <div class="totalPorArea">
          <h5> Fonoaudiologos: </h5>
          {{totalFonos}}
        </div>
        <div class="totalPorArea">
          <h5> Técnicos de enfermagem: </h5>
          {{totalFonos}}
        </div>
      </div>
    </div>
</template>

<script>

import Nav from '../components/Nav.vue';
import axios from '../services/axios';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import Vue from 'vue'


library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)
export default {
  components: {
    Nav
  },
  created() {
    this.getDataUser()
    this.getDataProfissional()
    this.totalPorArea()
  },
  data() {
    return {
      dados: [],
      dadosProfissional: [],
      medico: '',
      enf: '',
      fono: '',
      tecEnfermagem: '',
    }
  },
  methods: {
    async getDataUser() {
      try {
        const { data } = await axios.get('/usuario')
       
          this.dados = data
          console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
   async getDataProfissional() {
      try {
        const { data } = await axios.get('/dados')
        this.dadosProfissional = [...data]
        console.log(this.dadosProfissional)
      } catch (error) {
        console.log(error)
      }
    },
    totalPorArea() {
      this.medico = 'medico'
      this.enf = 'enfermeiro'
      this.fono = 'fono',
      this.tecEnfermagem = 'tec_enf'
    }
  },
  computed: {
    totalCadastrados: function() {
        const total = this.dados.length;
        return total
    },
    getMedico: {
      get: function() {
        return this.medico
      }
    },
    getEnfermeiro: {
      get: function() {
        return this.enf
      }
    },
    getFono: {
      get: function() {
        return this.fono
      }
    },
    getTecEnfermagem: {
      get: function() {
        return this.tecEnfermagem
      }
    },
    totalM: function() {
       let m = this.dadosProfissional.reduce((ac, value) => {
        if(value.profissao == this.getMedico) {
          ac += 1
        }
        return ac
      }, 0)
      return m
    },
    totalEnfermeiros: function() {
       let enf = this.dadosProfissional.reduce((ac, value) => {
        if(value.profissao == this.getEnfermeiro) {
          ac += 1
        }
        return ac
      }, 0)
      return enf
    },
    totalFonos: function() {
       let fono = this.dadosProfissional.reduce((ac, value) => {
        if(value.profissao == this.getFono) {
          ac += 1
        }
        return ac
      }, 0)
      return fono
    },
    totalTecEnfermagem: function() {
       let tec = this.dadosProfissional.reduce((ac, value) => {
        if(value.profissao == this.getTecEnfermagem) {
          ac += 1
        }
        return ac
      }, 0)
      return tec
    },
  }
}
</script>

<style scoped>
#totalCads {
  background: #FFF;
  border: 1px solid #333;
  width: 200px;
  padding: 10px 10px;
  margin: 0 auto;
  border-radius: 4px;
}
#areaInfo {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  flex-grow: unset;
  margin-top: 20px;
}
.totalPorArea{
  max-width: 200px;
  background: #333;
  color: #fff;
  width: 200px;
  padding: 10px 10px;
  margin: 5px 5px;
  border-radius: 4px;
}
.totalPorArea h5 {
  margin-top: 0;
  background: #42b983;
  border-radius: 4px;
  padding: 10px 0;
}
</style>
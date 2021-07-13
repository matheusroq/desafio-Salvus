<template>
  <div id="cadastro-form">
    <Nav :navHome="true" />
    <form @submit="cadastrar">
      <select name="profissao" v-model="profissao" id="profissao">
        <option value="">Selecionar profissão</option>
        <option value="Médico">Médico</option>
        <option value="Enfermeiro">Enfermeiro</option>
        <option value="Fonoaudiologo">Fonoaudiologo</option>
        <option value="Técnico">Técnico de Enfermagem</option>
      </select>
      <input
        type="text"
        name="numero_registro"
        v-model="numero_registro"
        id="numero_registro"
        placeholder="Nº de registro"
      />
      <select v-model="estadoSelecionado" id="">
        <option value="">Selecione o estado</option>
        <option v-for="(estado, i) in estados" :key="i" >{{estado.sigla}}</option>
      </select>
      <select @click="getCidades(siglaEstado)" v-model="localidade">
        <option value="">Selecionar cidade</option>
        <option v-for="(cidade, i) in cidades" :key="i">{{cidade.nome}}</option>   
      </select>
      <input
        type="text"
        name="especialidade"
        v-model="especialidade"
        id="especialidade"
        placeholder="Especialidade"
      />
      <input
        type="number"        
        name="area_atendimento"
        v-model="area_atendimento"
        id="area_atendimento"
        step="0.01"
        placeholder="Área de atendimento"
      />
      <button type="submit">Criar</button>
    </form>
  </div>
</template>

<script>
import Nav from "../components/Nav.vue";
import axios from "../services/axios";
import { instance } from "../services/toast";
export default {
  components: { Nav },
  async created() {
    await this.getEstados()
  },
  computed: {
    siglaEstado: function() {
      return this.estadoSelecionado
    }
  },
  data() {
    return {
      profissao: "",
      numero_registro: '',
      especialidade: "",
      localidade: "",
      area_atendimento: "",
      usuario_id: '',
      estados: '',
      estadoSelecionado: '',
      cidades: ''
    };
  },
  methods: {
    async cadastrar(e) {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "/dados/store",
          {
            profissao: this.profissao,
            numero_registro: this.numero_registro,
            especialidade: this.especialidade,
            localidade:  `${this.localidade} - ${this.estadoSelecionado}`,
            area_atendimento: this.area_atendimento,
            usuario_id: this.$route.params.id,
          },
        );
        if(!data.errors) {
            this.$router.push({name: 'Index'})
        } else {
            instance.error(data.errors[0], {
                position: 'top-right'
            })
        }
      } catch (error) {
          console.log(error)
      }
    },
    async getCidades(estado) {
      try{
        
         const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`)
       
        const data = await response.json()
  
        this.cidades = [...data] 

      } catch(err) {
        console.log(err)
      }
    },
    async getEstados() {
      try {
        const estados = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        const dataEstados = await estados.json()
       // console.log(dataEstados)
        this.estados = [...dataEstados]
        //console.log(this.estadoSelecionado)
      } catch (error) {
        console.log(error)
      }
    }
  },
};
</script>
<style>
#cadastro-form form {
  width: 70%;
  background: #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  margin: 0 auto;
  border-radius: 4px;
  box-shadow: 1px 1px rgba(0, 0, 0, 0.1);
}

#cadastro-form input,
select {
  margin: 5px 0;
  padding: 5px 5px;
  border: none;
  border-radius: 4px;
}
#cadastro-form button {
  padding: 4px 5px;
  border: none;
  color: #fff;
  border-radius: 4px;
  background-color: #000;
}
</style>
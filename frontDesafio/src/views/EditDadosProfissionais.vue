<template>
  <div id="edit">
      <Nav :navHome="false" />
      <h3>Editar dados pessoais</h3>
      <form>
          <select name="profissao" v-model="profissao" id="">
               <option value="">Selecionar profissão</option>
                <option value="medico">Médico</option>
                <option value="enfermeiro">Enfermeiro</option>
                <option value="fono">Fonoaudiologia</option>
                <option value="tec_enf">Técnico de Enfermagem</option>
          </select>
          <input type="text" name="especialidade" placeholder="Especialidade" v-model="especialidade" id="">
          <input type="text" name="numero_registro" placeholder="Nº de registro" v-model="numero_registro" id="">
          <input type="text" name="localidade" placeholder="Localidade de atendimento" v-model="localidade" id="">
          <input type="text" name="area_atendimento" placeholder="Área de cobertura" v-model="area_atendimento" id="">
          
          <button @click="updatProfissionalData">Editar</button>
      </form>
  </div>
</template>

<script>
import Nav from '../components/Nav.vue'
import axios from '../services/axios'
import { instance } from '../services/toast'
export default {
components: {Nav},
    data() {
        return {
                profissao: this.$route.params.profissao,
                especialidade: this.$route.params.especialidade,
                numero_registro: this.$route.params.numero_registro,
                localidade: this.$route.params.localidade,
                id: this.$route.params.id,
                area_atendimento: this.$route.params.area_atendimento
        }
    },
    methods: {
        async updatProfissionalData(e) {
            e.preventDefault()
            try {
                const token = localStorage.getItem("token");
                const req = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
                
                const { data } = await axios.put(`/dados/${this.id}`, {
                    profissao: this.profissao,
                    especialidade: this.especialidade,
                    numero_registro: this.numero_registro,
                    localidade: this.localidade,
                    id: this.usuarioId,
                    area_atendimento: this.area_atendimento
                }, req)
                
                if(data.errors) {
                    instance.error(data.errors[0], {
                        position: 'top-right'
                    })
                } else {
                    instance.success('Atualizações feitas', {
                        position: 'top-right'
                    })
                    this.$router.push({name: 'Perfil'})
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>
    
<style>
#edit form {
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

#edit input,
select {
  margin: 5px 0;
  padding: 5px 5px;
  border: none;
  border-radius: 4px;
}
#edit button {
  padding: 4px 5px;
  border: none;
  color: #fff;
  border-radius: 4px;
  background-color: #000;
}
</style>
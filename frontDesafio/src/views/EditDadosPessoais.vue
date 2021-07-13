<template>
  <div id="edit">
      <Nav :navHome="false" />
      <h3>Editar dados pessoais</h3>
      <form>
          <input type="text" name="nome" placeholder="Nome" v-model="nome" id="">
          <input type="text" name="email" placeholder="E-mail" v-model="email" id="">
          <input type="text" name="telefone" placeholder="Telefone" v-model="telefone" id="">
          <select name="genero" v-model="genero" id="">
              <option value="">Selecione o gênero</option>
              <option value="F">Feminino</option>
              <option value="M">Masculino</option>
              <option value="N">Não-binário</option>
          </select>
          <button @click="updateUserData">Editar</button>
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
            nome: this.$route.params.nome,
            email: this.$route.params.email,
            telefone: this.$route.params.telefone,
            genero: this.$route.params.genero,
            id: this.$route.params.id
        }
    },
    methods: {
        async updateUserData(e) {
            e.preventDefault()
            try {
                const token = localStorage.getItem("token");
                const req = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
                
                const { data } = await axios.put(`/usuario/${this.id}`, {
                    nome: this.nome,
                    email: this.email,
                    telefone:this.telefone,
                    genero: this.genero
                }, req)
                
                if(data.errors) {
                    instance.error(data.errors[0], {
                        position: 'top-right'
                    })
                } else {
                    instance.success('Atualizações feitas', {
                        position: 'top-right'
                    })
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
<template>
  <div id="form">
    <Nav :navHome="true" />
    <form action="" @submit="pegarDados">
        <label for="">Nome</label>
      <input type="text" v-model="nome" name="nome" id="nome" placeholder="Nome" />
      <label for="">E-mail</label>
      <input
        type="email"
        v-model="email"
        name="email"
        id=""
        placeholder="email"
      />
      <label for="">Senha</label>
      <input
        type="password"
        v-model="senha"
        name="senha"
        id=""
        placeholder="senha"
      />
      <label for="">CPF</label>
      <input type="text" v-model="cpf" name="cpf" id="" placeholder="cpf" />
      <label for="">Nascimento</label>
      <input
        type="date"
        v-model="nascimento"
        name="nascimento"
        id=""
        placeholder="nascimento"
      />
      <label for="">Telefone</label>
      <input
        type="text"
        v-model="telefone"
        name="telefone"
        id=""
        placeholder="telefone"
      />
      <label for="">Gênero</label>
      <select name="genero" v-model="genero">
        <option value="F">Feminino</option>
        <option value="M">Masculino</option>
        <option value="N">Não-Binário</option>
      </select>
      <button type="submit">Criar</button>
    </form>
  </div>
</template>

<script>
import Nav from '../components/Nav.vue';
import axios from "../services/axios";
import { instance } from '../services/toast';
export default {
  components: { Nav },
  data() {
    return {
      nome: "",
      email: "",
      senha: "",
      nascimento: "",
      telefone: "",
      cpf: "",
      genero: "",
      erro: ""
    };
  },
  methods: {
    validaCampos() {
      if(!this.nome || this.nome.length < 3 || this.nome.length > 50) {
        return this.erro = 'Campo nome deve ter entre 3 e 50 caracteres'
      }
      if(!this.email) {
        return this.erro = 'Campo e-mail é obrigatório'
      }
       if(!this.nascimento) {
       return this.erro = 'É necessário informar a data de nascimento'
      }
      if(!this.telefone) {
        return this.erro = 'Campo telefone é obrigatório'
      }
      if(!this.cpf) {
       return  this.erro = 'Campo cpf é obrigatório'
      }
      if(!this.genero) {
       return this.erro = 'Campo gênero é obrigatório'
      } 
    },
    async pegarDados(e) {
      e.preventDefault();
      this.validaCampos();
      if(!this.erro) {
        try {
           const { data } = await axios.post("/usuario/store", {
            nome: this.nome,
            senha: this.senha,
            email: this.email,
            nascimento: this.nascimento,
            telefone: this.telefone,
            cpf: this.cpf,
            genero: this.genero,
            id: '',
          }); 
           if(data.errors) {
              this.erro = data.errors[0]
          } else {
              this.id= data[0]
              this.$router.push({path: `/profissional/${this.id}`})
              
          } 
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log(this.erro)
        instance.error(this.erro, {
          position: 'top',
        })
      }
    },
  },
};
</script>

<style>
#form form {
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

#form input,
select {
  margin: 5px 0;
  padding: 5px 5px;
  border: none;
  border-radius: 4px;
}
#form button {
  padding: 4px 5px;
  border: none;
  color: #fff;
  border-radius: 4px;
  background-color: #000;
}

</style>
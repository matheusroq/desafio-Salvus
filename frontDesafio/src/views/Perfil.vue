<template>
  <div id="perfil">
    <Nav :navHome="false" />
    <div id="div-infos">
      <div id="dadosPessoais">
        <h5>Dados pessoais</h5>
        <p><span>Nome:</span> {{ nome }}</p>
        <hr />
        <p><span>E-mail:</span> {{ email }}</p>
        <hr />
        <p><span>Data de nascimento:</span> {{ nascimento }}</p>
        <hr />
        <p><span>Telefone:</span> {{ telefone }}</p>
        <hr />
        <p><span>CPF:</span> {{ cpf }}</p>
        <hr />
        <p><span>Gênero:</span> {{ genero }}</p>
        <hr />
        <button type="submit" class="edit-btn">
            <router-link :to="{name: 'EditDadosPessoais', params: {
                nome: this.nome,
                email: this.email,
                telefone: this.telefone,
                genero: this.genero,
                id: this.usuarioId
            }}" >
            Editar dados pessoais
            </router-link>
        </button>
      </div>
      <div id="dadosProfissionais">
        <h5>Dados profissionais</h5>
        <p><span>Profissão:</span> {{ profissao }}</p>
        <hr />
        <p><span>Especialidade:</span> {{ especialidade }}</p>
        <hr />
        <p><span>Nº de registro:</span> {{ numero_registro }}</p>
        <hr />
        <p><span>Localidade de atendimento:</span> {{ localidade }}</p>
        <hr />
        <p><span>Área de cobertura:</span> {{ area_atendimento }} KM</p>
        <hr />
        <button type="submit" class="edit-btn">
            <router-link :to="{name: 'EditDadosProfissionais', params: {
                profissao: this.profissao,
                especialidade: this.especialidade,
                numero_registro: this.numero_registro,
                localidade: this.localidade,
                id: this.usuarioId,
                area_atendimento: this.area_atendimento
            }}">
            Editar dados profissionais
            </router-link>
        </button>
      </div>
    </div>
    <button type="submit" @click="deleteAcc" id="delete-account">Apagar conta</button>
  </div>
</template>

<script>
import axios from "../services/axios";
import Nav from "../components/Nav.vue";
import { instance } from '../services/toast';
export default {
  components: { Nav },
  created() {
    this.getUserData();
    this.getProfissionalData();
  },
  data() {
    return {
      usuarioId: '',
      nome: "",
      email: "",
      nascimento: "",
      telefone: "",
      cpf: "",
      genero: "",
      area_atendimento: "",
      especialidade: "",
      localidade: "",
      numero_registro: "",
      profissao: "",
    };
  },
  methods: {
    async getUserData() {
      try {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");
        const req = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(`/usuario/${id}`, req);
        this.usuarioId = data[0].id;
        this.nome = data[0].nome;
        this.telefone = data[0].telefone;
        this.email = data[0].email;
        this.nascimento = data[0].nascimento;
        this.cpf = data[0].cpf;
        this.genero = data[0].genero;
      } catch (error) {
        console.log(error);
      }
    },
    async getProfissionalData() {
      try {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");
        const req = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(`/dados/${id}`, req);
        this.area_atendimento = data[0].area_atendimento,
        this.especialidade = data[0].especialidade;
        this.localidade = data[0].localidade;
        this.numero_registro = data[0].numero_registro;
        this.profissao = data[0].profissao;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteAcc() {
        confirm("Realmente deseja excluir sua conta?")
        try{
            const token = localStorage.getItem("token");
            const req = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
           const { data } = await axios.delete(`/usuario/${this.usuarioId}`, req)
            console.log(data)
            if(data.errors) {
                console.log(data.errors[0])
                instance.errors(data.errors[0], {
                    position: 'top-right'
                })
            } else {
                instance.success(data, {
                    position: 'top-right'
                })
                this.$router.push({path: '/'})
            }
        } catch(err) {
            console.log(err)
        }
    }
  },
};
</script>

<style>
p {
  font-size: 0.7em;
  text-align: initial;
  padding-right: 5px;
}
span {
  color: #111;
  font-weight: bold;
}
#perfil {
  height: 100%;
  width: 100%;
}
#div-infos {
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: space-around;
}
#dadosPessoais,
#dadosProfissionais {
  color: #fff;
  background: #333;
  height: 400px;
  width: 500px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 5px 5px;
  border-radius: 4px;
}
#dadosPessoais h5,
#dadosProfissionais h5 {
  background: #42b983;
  padding: 10px 10px;
  border-radius: 4px;
  margin: 0;
}
#dadosPessoais span,
#dadosProfissionais span {
  color: #42b983;
}
.edit-btn, #delete-account {
  padding: 10px 8px;
  border: none;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}
.edit-btn {
    background-color: #2E8B57;
}
.edit-btn a {
    text-decoration: none;
    color: #fff;
}
#delete-account {
    margin-top: 20px;
    background-color: crimson;
}
</style>
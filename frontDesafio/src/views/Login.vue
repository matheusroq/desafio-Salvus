<template>
  <div>
    <Nav :navHome="true" />
    <div id="login">
      <div id="login-form">
        <h1>Login</h1>
        <form @submit="login">
          <input
            type="text"
            name="email"
            v-model="email"
            placeholder="E-mail"
          />
          <input type="password" name="senha" v-model="senha" placeholder="Senha" />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../services/axios";
import { instance } from "../services/toast";
import Nav from "../components/Nav.vue";
export default {
  components: { Nav },
  data() {
    return {
      email: "",
      senha: "",
      error: "",
    };
  },
  methods: {
    async login(e) {
      e.preventDefault();
      try {
        const { data } = await axios.post("/token", {
          email: this.email,
          senha: this.senha,
        });
        console.log(data.token);
        if (data.error) {
          console.log("erro");
          this.error = data.error[0];
          instance.error(this.error, {
            position: "top",
          });
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("id", data.id);
          await this.$router.push({ name: "Home" });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
#login {
  width: 500px;
  height: 100%;
  margin: 0 auto;
  padding: 0;
}

#login-form {
  padding: 25vh 15vh 15vh 15vh;
  height: 40vh;
  margin-left: 10px;
  background-color: #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}
#login-form input {
  margin: 5px 0;
  width: 300px;
  padding: 1.6vh 1.9vh;
  border: none;
  border-radius: 4px;
}
#login-form button {
  padding: 2vh 2vh;
  cursor: pointer;
  margin-top: 3px;
  border: none;
  border-radius: 4px;
  color: #fff;
  background-color: #000;
}
</style>

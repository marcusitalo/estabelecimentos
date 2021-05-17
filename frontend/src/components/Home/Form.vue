<template>
  <div class="form">
    <div v-bind:class="[!toggleForms ? 'hidden' : 'login']">
      <form @submit="submitLogin" action="#">
        <p>
          <label for="emailL">Email</label>
          <input
            id="emailL"
            v-model="email"
            type="text"
            name="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            required="true"
          />
        </p>

        <p>
          <label for="passwordL">Senha</label>
          <input
            id="passwordL"
            v-model="password"
            type="password"
            name="name"
            required="true"
          />
        </p>
        <p>
          <input type="submit" value="Login" />
        </p>
      </form>
    </div>
    <div v-bind:class="[toggleForms ? 'hidden' : 'register']">
      <form @submit="submitRegister" action="#">
        <p>
          <label for="name">Name</label>
          <input
            id="name"
            v-model="name"
            type="text"
            name="name"
            required="true"
          />
        </p>
        <p>
          <label for="emailR">Email</label>
          <input
            id="emailR"
            v-model="email"
            type="text"
            name="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            required="true"
          />
        </p>
        <p>
          <label for="passwordR">Senha</label>
          <input
            id="passwordR"
            v-model="password"
            type="password"
            name="password"
            required="true"
          />
        </p>
        <p>
          <input type="submit" value="Cadastrar" />
        </p>
      </form>
    </div>
    <sub v-if="toggleForms" @click="toggleForm" class="btnRegister">
      Cadastrar-se ▷</sub
    >
    <sub v-else @click="toggleForm"> ◁ Login </sub>

    <p v-if="feedback" class="feedback">{{ feedback }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Form",
  data() {
    return {
      name: null,
      email: null,
      password: null,
      toggleForms: true,
      feedback: "",
    };
  },
  created() {
    localStorage.removeItem("token");
  },
  methods: {
    submitLogin: async function(e) {
      e.preventDefault();
      const data = {
        email: this.email,
        password: this.password,
      };
      await axios
        .post(`${process.env.VUE_APP_HOST_API}/login`, data)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          setTimeout(() => {
            this.$router.push("dashboard");
          }, 2000);
        })
        .catch(() => {
          this.delayFeedback("Login ou Senha Inválido");
        });
    },
    submitRegister: async function(e) {
      e.preventDefault();
      const data = {
        username: this.name,
        email: this.email,
        password: this.password,
      };
      await axios
        .post(`${process.env.VUE_APP_HOST_API}/register`, data)
        .then(() => {
          this.clearForm();
          this.delayFeedback(
            "Cadastro Realizado com sucesso, Acesse a tela de login. "
          );
        })
        .catch(() => {
          this.delayFeedback("Email já cadastrado.");
        });
    },
    clearForm: function() {
      this.name = "";
      this.email = "";
      this.password = "";
    },
    delayFeedback: function(feedbackMsg) {
      this.feedback = feedbackMsg;
      setTimeout(() => {
        this.feedback = "";
      }, 4000);
    },
    toggleForm: function() {
      this.clearForm();
      this.toggleForms = !this.toggleForms;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form {
  display: flex;
  width: 25vw;
  flex-flow: column;
  justify-content: center;
  text-align: initial;
  position: relative;
  color: #3f3d56;
}
.form p {
  display: flex;
  flex-direction: column;
}
.form input[type="submit"] {
  background-color: #ffc04a;
  border: 0px;
  padding: 4px;
  color: #3f3d56;
  font-weight: 800;
  cursor: pointer;
  text-transform: uppercase;
}
.form input {
  border: 0px;
  border-bottom: 1px solid gray;
  margin: 10px 0px;
}
.form sub {
  font-size: 11px;
  font-weight: 400;
  cursor: pointer;
  text-align: left;
}
.btnRegister {
  text-align: right !important;
}
.errors {
  font-size: 10px;
  position: absolute;
  bottom: 0px;
}
.feedback {
  color: #ffc04a;
  font-size: 12px;
  font-weight: 500;
  position: absolute;
  bottom: -50px;
  background: #3f3d56;
  width: 94%;
  padding: 10px;
}
.hidden {
  display: none;
}
</style>

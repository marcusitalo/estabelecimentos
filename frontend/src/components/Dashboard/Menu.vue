<template>
  <div v-bind:class="[toggleForms ? 'menu' : 'menu open']">
    <div
      v-bind:class="[
        toggleForms ? 'formEstablisment' : 'formEstablisment open',
      ]"
    >
      <div class="addForm">
        <form @submit="submitEstablisment" action="#">
          <p>
            <label for="name">Nome no Estabelecimento</label>
            <input
              id="name"
              v-model="name"
              type="text"
              name="name"
              required="true"
            />
          </p>
          <p>
            <label for="zipcode">Cep</label>
            <input
              id="zipcode"
              v-model="zipcode"
              type="text"
              name="zipcode"
              required="true"
              @blur="getAddress"
            />
          </p>
          <p>
            <label for="address">Logradouro</label>
            <input
              id="address"
              v-model="address"
              type="text"
              name="address"
              required="true"
            />
          </p>
          <p>
            <label for="number">Número</label>
            <input
              id="number"
              v-model="number"
              type="text"
              name="number"
              required="true"
            />
          </p>
          <p>
            <label for="district">Bairro</label>
            <input
              id="district"
              v-model="district"
              type="text"
              name="district"
              required="true"
            />
          </p>
          <p>
            <label for="city">Cidade</label>
            <input
              id="city"
              v-model="city"
              type="text"
              name="city"
              required="true"
            />
          </p>
          <p>
            <label for="state">Estado</label>
            <input
              id="state"
              v-model="state"
              type="text"
              name="state"
              required="true"
            />
          </p>
          <p>
            <label for="opening_hours">Horários de Funcionamento</label>
            <input
              id="opening_hours"
              v-model="opening_hours"
              type="text"
              name="opening_hours"
              required="true"
            />
          </p>
          <p>
            <label for="has_accessibility">Possui Acessibilidade?</label>
            <input
              id="has_accessibility"
              v-model="has_accessibility"
              type="checkbox"
              name="has_accessibility"
              value="1"
            />
          </p>
          <p>
            <label for="main_products">Principais Produtos</label>
            <input
              id="main_products"
              v-model="main_products"
              type="text"
              name="main_products"
              required="true"
            />
          </p>
          <p>
            <label for="category_establisment_id">Categoria</label>
            <select v-model="category_establisment_id" required="true">
              <option
                v-for="item in categories"
                :value="item.id"
                :key="item.id"
              >
                {{ item.name }}
              </option>
            </select>
          </p>
          <p>
            <input type="submit" :value="uuid ? 'Atualizar' : 'Adicionar'" />
          </p>
        </form>
      </div>
    </div>
    <div
      v-bind:class="[
        toggleForms ? 'toggleEstablisment' : 'toggleEstablisment open',
      ]"
      @click="toggleForm"
    >
      <p>+</p>
      <span class="logout" @click="logout"
        ><img src="@/assets/images/logout.png"
      /></span>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Menu",
  props: {
    uuid: String,
  },
  data() {
    return {
      toggleForms: true,
      name: null,
      zipcode: null,
      address: null,
      number: null,
      district: null,
      city: null,
      state: null,
      opening_hours: null,
      has_accessibility: false,
      main_products: null,
      category_establisment_id: null,
      categories: [],
      uuidEstab: null,
    };
  },
  updated() {
    if (!this.uuidEstab) {
      this.uuidEstab = this.uuid;
      if (this.uuidEstab) {
        this.toggleForms = false;
        this.getEstablisment();
      }
    }
  },
  mounted() {
    if (!localStorage.token) {
      this.$router.push("/");
    }
    this.getCategories();
  },
  methods: {
    toggleForm: function() {
      this.toggleForms = !this.toggleForms;
      this.clearForm();
    },
    feedbackCalls: function(msg) {
      this.$emit("feedbackMgs", { msg });
    },
    refreshEstablisment: function() {
      localStorage.setItem("refresh", true);
      this.$emit("refreshEstablisments");
    },
    clearForm: function() {
      this.name = null;
      this.zipcode = null;
      this.address = null;
      this.number = null;
      this.district = null;
      this.city = null;
      this.state = null;
      this.opening_hours = null;
      this.has_accessibility = false;
      this.main_products = null;
      this.category_establisment_id = null;
      this.uuidEstab = null;
    },
    logout: function() {
      this.$router.push("/");
    },
    getCategories: async function() {
      const headers = localStorage.token
        ? { Authorization: "Bearer " + localStorage.token }
        : {};
      await axios
        .get(`${process.env.VUE_APP_HOST_API}/category-establisment`, {
          headers,
        })
        .then((res) => {
          this.categories = res.data;
        })
        .catch(() => {});
    },
    submitEstablisment: async function(e) {
      e.preventDefault();
      const headers = localStorage.token
        ? { Authorization: "Bearer " + localStorage.token }
        : {};

      const data = {
        uuid: this.uuidEstab,
        name: this.name,
        zipcode: this.zipcode,
        address: this.address,
        number: this.number,
        district: this.district,
        city: this.city,
        state: this.state,
        opening_hours: this.opening_hours,
        has_accessibility: this.has_accessibility ? true : false,
        main_products: this.main_products,
        category_establisment_id: this.category_establisment_id,
      };
      if (this.uuidEstab) {
        await axios
          .put(
            `${process.env.VUE_APP_HOST_API}/establisment/${this.uuidEstab}`,
            data,
            {
              headers,
            }
          )
          .then(() => {
            this.toggleForms = true;
            this.clearForm();
            this.refreshEstablisment();
            this.feedbackCalls("Estabelecimento atualizado com sucesso");
          })
          .catch(() => {});
      } else {
        await axios
          .post(`${process.env.VUE_APP_HOST_API}/establisment`, data, {
            headers,
          })
          .then(() => {
            this.clearForm();
            this.refreshEstablisment();
            this.feedbackCalls("Estabelecimento cadastrado com sucesso");
          })
          .catch(() => {});
      }
    },
    getEstablisment: async function() {
      const headers = localStorage.token
        ? { Authorization: "Bearer " + localStorage.token }
        : {};

      await axios
        .get(`${process.env.VUE_APP_HOST_API}/establisment/${this.uuid}`, {
          headers,
        })
        .then((res) => {
          const data = res.data;
          this.name = data.name;
          this.zipcode = data.zipcode;
          this.address = data.address;
          this.number = data.number;
          this.district = data.district;
          this.city = data.city;
          this.state = data.state;
          this.opening_hours = data.opening_hours;
          this.has_accessibility = data.has_accessibility ? true : false;
          this.main_products = data.main_products;
          this.category_establisment_id = data.category_establisment_id;
        })
        .catch(() => {});
    },
    getAddress: async function() {
      const zipcode = this.zipcode;
      await axios
        .get(`http://viacep.com.br/ws/${zipcode}/json/`)
        .then((res) => {
          this.address = res.data.logradouro;
          this.district = res.data.bairro;
          this.city = res.data.localidade;
          this.state = res.data.uf;
        })
        .catch(() => {});
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menu {
  display: flex;
  background-color: #fffcf8;
  position: absolute;
  top: 0;
  left: 0px;
  width: 65px;
  height: 100vh;
  box-shadow: 1px 1px 5px #444;
  color: #e29607;
  transition: 3s;
  background-repeat: no-repeat;
  background-size: 30%;
  background-position: bottom left;
  z-index: 9;
}
.menu.open {
  width: 350px;
  transition: 3s;
  background-image: url("../../assets/images/Cadastro.png");
}
.formEstablisment {
  opacity: 0;
  transition: 1s;
  width: 90%;
  margin: auto;
  text-align: left;
  margin-top: 50px;
}
.formEstablisment.open {
  opacity: 1;
  transition: 5s;
}

.formEstablisment .addForm {
  display: none;
  transition: 1s;
}
.formEstablisment.open .addForm {
  display: block;
  transition: 8s;
}
.toggleEstablisment {
  right: 15px;
  position: absolute;
  font-size: 60px;
  transition: 1s;
  cursor: pointer;
  height: 95vh;
}
.toggleEstablisment.open p {
  transform: rotate(45deg);
  transition: 2s;
}
.logout img {
  width: 30px;
  position: absolute;
  bottom: 10px;
  right: 0px;
}
.addForm {
  display: flex;
  flex-flow: column;
  justify-content: center;
  text-align: initial;
  position: relative;
  color: #e29607;
  z-index: 10;
}
.addForm p {
  display: flex;
  flex-direction: column;
}
.addForm input[type="submit"] {
  background-color: #ffc04a;
  border: 0px;
  padding: 4px;
  color: #3f3d56;
  font-weight: 800;
  cursor: pointer;
  text-transform: uppercase;
  margin: 15px 0px;
}
.addForm input {
  border: 0px;
  background: transparent;
  border-bottom: 1px solid #3f3d56;
  color: #3f3d56;
}
.addForm label {
  padding: 3px 0px;
  font-size: 11px;
}
.addForm select {
  background: transparent;
  color: #3f3d56;
  padding: 5px;
  border: 1px solid;
}
</style>

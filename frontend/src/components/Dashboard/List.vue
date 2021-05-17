<template>
  <div class="list">
    <div class="search">
      <input type="text" v-model="search" />
      <button @click="searchAction">Pesquisar</button>
      <p v-if="wordSearch" @click="removeSearch" class="feedBackSearch">
        Resultado de busca por '{{ wordSearch }}' <span>X</span>
      </p>
    </div>
    <div class="listEstablisments">
      <div
        v-for="item in establisments"
        :key="item.id"
        :class="[
          'establisment',
          'icons',
          'category_' + item.category_establisment_id,
        ]"
      >
        <h3>{{ item.name }}</h3>
        <p>{{ item.address }},{{ item.number }} - {{ item.district }}</p>
        <p>{{ item.city }},{{ item.state }}. {{ item.zipcode }}</p>
        <p class="opening_hours">{{ item.opening_hours }}</p>
        <p class="products">{{ item.main_products }}</p>
        <p v-if="item.has_accessibility">
          <img src="@/assets/icons/acceessibility.png" class="acceessibility" />
        </p>
        <span class="trash" @click="removeEstablisments(item.uuid)"
          ><img src="@/assets/icons/trash.png"
        /></span>
        <span class="edit" @click="updateEstablisment(item.uuid)"
          ><img src="@/assets/icons/edit.png"
        /></span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Form",
  props: {
    refreshList: Boolean,
  },
  updated() {
    if (localStorage.refresh) {
      localStorage.removeItem("refresh");
      this.removeSearch();
    }
  },
  data() {
    return {
      search: "",
      wordSearch: "",
      feedback: "",
      establisments: [],
      refresh: this.refreshList,
    };
  },
  mounted() {
    if (!localStorage.token) {
      this.$router.push("/");
    }
    this.searchAction();
  },
  methods: {
    getToken: function() {
      return localStorage.token
        ? { Authorization: "Bearer " + localStorage.token }
        : {};
    },
    feedbackCalls: function(msg) {
      this.$emit("feedbackMgs", { msg });
    },
    updateEstablisment: function(uuid) {
      this.$emit("editEstablisment", { uuid });
    },
    getEstablisment: async function() {
      const headers = this.getToken();
      await axios
        .get(`${process.env.VUE_APP_HOST_API}/establisment`, {
          headers,
        })
        .then((res) => {
          this.establisments = res.data;
        });
    },
    searchAction: async function() {
      const search = this.search;
      const headers = this.getToken();
      await axios
        .get(
          `${process.env.VUE_APP_HOST_API}/establisment/search/address?search=${search}`,
          {
            headers,
          }
        )
        .then((res) => {
          this.wordSearch = this.search;
          this.search = "";
          this.establisments = res.data;
        });
    },
    removeEstablisments: async function(uuid) {
      const headers = this.getToken();
      await axios
        .delete(`${process.env.VUE_APP_HOST_API}/establisment/${uuid}`, {
          headers,
        })
        .then(() => {
          this.searchAction();
          this.feedbackCalls("Estabelecimento removido com sucesso");
        })
        .catch(() => {
          this.feedbackCalls("Erro ao remover o estabelecimento");
        });
    },
    removeSearch: async function() {
      this.wordSearch = "";
      await this.getEstablisment();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.acceessibility {
  width: 20px;
}
.listEstablisments {
  overflow: auto;
  height: 75vh;
  width: 90vw;
  display: inline-block;
  text-align: left;
}
.establisment {
  display: inline-block;
  text-align: initial;
  vertical-align: top;
  position: relative;
  border: 1px solid #d8d6f6;
  width: 300px;
  height: 125px;
  padding: 5px;
  margin: 10px;
  background-color: white;
  border-radius: 15px;
}
.list {
  width: 80%;
  margin: auto;
  display: inline-block;
}
.establisment p {
  font-size: 13px;
  width: 80%;
}
.opening_hours {
  color: #3f3d56;
  font-weight: 600;
  margin: 3px 0;
}
.products {
  font-weight: 500;
}
.establisment h3 {
  padding: 5px 0px;
  color: #e2961c;
  font-size: medium;
  width: 85%;
}
.acceessibility {
  position: absolute;
  width: 17px;
  right: 50px;
  bottom: 1px;
}

.icons {
  background-repeat: no-repeat;
  background-size: 20%;
  background-position: 105% 115%;
}

.category_1 {
  background-image: url("../../assets/icons/category_1.png");
}
.category_2 {
  background-image: url("../../assets/icons/category_2.png");
}
.category_3 {
  background-image: url("../../assets/icons/category_3.png");
}
.category_4 {
  background-image: url("../../assets/icons/category_4.png");
}

.search {
  margin: 20px;
  text-align: initial;
}
.search input {
  width: 300px;
  border: 1px solid #e2961c;
  padding: 5px;
}
.search button {
  border: 0px;
  padding: 7px;
  background-color: #e2961c;
  color: aliceblue;
}
.feedBackSearch {
  text-align: center;
  margin: 10px;
  font-weight: 600;
  font-size: 20px;
  position: relative;
}
.feedBackSearch span {
  font-size: 10px;
  top: 0px;
  position: absolute;
  margin: 0px 5px;
  cursor: pointer;
}
.trash img {
  width: 15px;
  position: absolute;
  top: 2px;
  right: 2px;
  cursor: pointer;
}
.edit img {
  width: 15px;
  position: absolute;
  top: 20px;
  right: 1px;
  cursor: pointer;
}
</style>

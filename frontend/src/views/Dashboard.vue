<template>
  <div class="dashboard">
    <Menu
      :uuid="uuidEstablisment"
      @refreshEstablisments="refreshEstablismentsInList"
      @feedbackMgs="feedbackUser($event)"
    />
    <List
      :refreshList="refreshListByMenu"
      @editEstablisment="updateEstablisment($event)"
      @feedbackMgs="feedbackUser($event)"
    />
    <div v-if="feedback" class="feedback">
      <p>{{ feedback }}</p>
    </div>
  </div>
</template>

<script>
import List from "@/components/Dashboard/List.vue";
import Menu from "@/components/Dashboard/Menu.vue";

export default {
  name: "Dashboard",
  components: {
    List,
    Menu,
  },
  data() {
    return {
      feedback: "",
      refreshListByMenu: false,
      uuidEstablisment: "",
    };
  },
  methods: {
    refreshEstablismentsInList: function() {
      this.refreshListByMenu = !this.refreshListByMenu;
      this.uuidEstablisment = "";
    },
    updateEstablisment: function(event) {
      this.uuidEstablisment = event.uuid;
    },
    feedbackUser: function(event) {
      this.feedback = event.msg;
      setTimeout(() => {
        this.feedback = "";
      }, 4000);
    },
  },
};
</script>
<style scoped>
.dashboard {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/images/Establisment.png");
  background-size: 15%;
  background-repeat: no-repeat;
  background-position: 100% 95%;
}
.feedback {
  bottom: 0px;
  color: #ffc04a;
  font-size: 12px;
  font-weight: 500;
  position: fixed;
  margin: 5px;
  background: #3f3d56;
  padding: 10px;
  right: 0px;
}
</style>

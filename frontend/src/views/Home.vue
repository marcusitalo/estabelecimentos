<template>
  <div class="home">
    <Logo />
    <Form />
  </div>
</template>

<script>
// @ is an alias to /src
import Logo from "@/components/Home/Logo.vue";
import Form from "@/components/Home/Form.vue";

export default {
  name: "Home",
  components: {
    Logo,
    Form,
  },
};
</script>
<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  justify-items: normal;
  flex-direction: row;
  color: #3f3d56;
  height: 95vh;
  margin: 0px;
  padding: 0px;
}
</style>

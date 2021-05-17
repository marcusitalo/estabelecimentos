<template>
  <div class="logo">
    <h1>Estabelecimentos</h1>
    <img alt="Welcome" src="@/assets/images/Home.png" class="image" />
  </div>
</template>

<script>
export default {
  name: "Logo",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo {
  position: relative;
}
.logo h1 {
  text-align: initial;
  font-size: 35px;
  font-weight: 300;
  transform: rotate(90deg);
  position: absolute;
  top: 25vh;
  left: -115px;
  margin: 0px;
}

.image {
  width: 450px;
}
</style>

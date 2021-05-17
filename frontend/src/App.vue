<template>
  <router-view />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500&display=swap");

* {
  margin: auto 0px;
  padding: 0px;
}
#app {
  font-family: "Roboto", sans-serif;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

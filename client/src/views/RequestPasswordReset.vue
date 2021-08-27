<template>
  <div class="container">
    <div class="center">
      <img class="logo" src="../assets/logo.svg" />
      <div id="login">
        <div id="form" @submit="reset">
          <input v-model="email" placeholder="enter your username" />
          <br />
          <button @click='reset'>Request reset</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import authservice from "../services/AuthenticationService.js";
export default {
  data: function () {
    return {
      email: "",
    };
  },
  methods: {
    async reset() {
        await authservice.requestpasswordreset(this.email)
          alert("A request was send to your email, if a user exists with that email")
          this.$router.push('/')
    },
  },
  components: {},
};
</script>
<style lang='scss' scoped>
@import "../scss/variables";
.container {
  padding-top: 0.5em;
  background-color: $offwhite;
}

.logo {
  width: 30vh;
}

#login {
  text-align: center;
  margin-top: 2em;
  background-color: white;
  width: 30em;
  max-width: 90vw;
  height: 15em;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 5vh;
  border: 1px solid rgb(201, 201, 201);
}

#form {
  padding-top: 1em;
  margin: auto;
  text-align: center;
  text-justify: distribute;
  width: 95%;
  height: 95%;
}

#form button {
  height: 30px;
  // width: 70px;
  margin:.5em;
}

#login input {
  text-align: center;
  width: 70%;
  height: 10%;
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  margin-top: 0.3em;
  margin-bottom: 0.3em;
}

.forgot {
  font-size:6pt;
  line-height:1.74rem;
}
</style>
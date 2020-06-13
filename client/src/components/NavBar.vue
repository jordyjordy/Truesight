<template>
    <div class="NavBar">
        <a @click="logout">Logout</a>
          <a href="#home">Home</a>
        <a href="#news">News</a>
        <a href="#contact">Contact</a>
    </div>
</template>
<script>
import authservice from '../services/AuthenticationService.js' 
export default {
    methods: {
        async logout() {
            await authservice.logout()
            localStorage.removeItem('token')
            this.$router.push('/')
        }
    }
}
</script>

<style>
.NavBar {
    overflow: hidden;
    position: fixed;
    width:100%;
    height:50px;
    margin-bottom:50px;
    background-color:blue;
}
.NavBar a {
    float: left;
    display: block;
    background-color:blueviolet;
    height: 50px;
    width: 100px;
    text-align: center;
    padding-top:12pt;
}
</style>
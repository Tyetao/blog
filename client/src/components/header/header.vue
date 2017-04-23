<template>
    <header>
        <div class="login">
            <span v-if="!userName1 && !userName2"  @click="showModal = true">登录</span>
            <span v-if="userName1 || userName2">欢迎您，{{userName1 || userName2}}</span>
        </div>    
        <h1><a href="/">陌上花开淡香随</a></h1>
        <p>如果没有为陌上悄然伫立并为陌上风情所陶醉的人，那么花开也寂寞，风情也苍白...</p>
        <login v-if="showModal" @close="showModal = false"></login>
    </header>
</template>

<script>
import login from '../login/login';
export default {
    name: 'header',
    data () {
        return {
            showModal: false,
            userName1: '',
            userName2: ''
        }
    },
    created() {
        this.userName1 = localStorage.getItem('userName');
        this.userName2 = sessionStorage.getItem('userName');
    },
    components: {
        login
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
    position: absolute;
    top: 20px;
    right: 0;
    color: #fff;
    font-size: 13px;
}
.login span:hover{
    cursor: pointer;
    text-decoration: underline;
}
header {
    position: relative;
    padding: 50px 0 30px 0;
    width: 1000px;
    margin: auto;
}

header h1 {
    font-size: 22px;
    font-weight: normal;
    text-shadow: #fff 1px 1px 1px;
}

header h1 a {
    color: #000
}

header h1 a:hover {
    text-decoration: underline
}

header p {
    margin: 17px 0 0 0;
    text-shadow: #000 1px 1px 1px;
    color: #fff
}
</style>

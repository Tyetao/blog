<template>
    <header>
        <h1><a href="/">陌上花开淡香随</a></h1>
        <p>如果没有为陌上悄然伫立并为陌上风情所陶醉的人，那么花开也寂寞，风情也苍白...</p>
    </header>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
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

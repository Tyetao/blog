<template>
  <div class="app">
    <v-header></v-header>
    <v-nav></v-nav>
    <div class="main_container clearfix">
        <div class="blog">
            <transition  name="fadeInRight" appear>
                <router-view></router-view>
            </transition>
        </div>
        <v-aside></v-aside>
    </div>
  </div>
</template>

<script>
import vHeader from "./components/header/header";
import vNav from "./components/nav/nav";
import vAside from "./components/aside/aside";
export default {
  name: 'app',
  components: {
    vHeader,
    vNav,
    vAside
  }
}
</script>

<style>
    .main_container {
        width: 1000px;
        margin: auto;
        overflow: auto;
    }
    .main_container .blog {
        width: 720px;
        float: left;
        padding: 0 20px;
        border-radius: 10px;
        background: #E5F3F7;
        margin-top: 10px;
        margin-bottom: 60px
    }
    .fadeInRight-enter-active{
        animation: fadeInLeft 1s
    }
</style>

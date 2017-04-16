<template>
    <div class="nav">
        <div class="container">
            <object id="customMenu" class="customMenu" data="/static/nav.swf" width="528" height="70" type="application/x-shockwave-flash">
                <param name="allowScriptAccess" value="always">
                <param name="allownetworking" value="all">
                <param name="allowFullScreen" value="true">
                <param name="wmode" value="transparent">
                <param name="menu" value="false">
                <param name="scale" value="noScale">
                <param name="salign" value="1">
            </object>
            <ul class="clearfix">
                <li>
                    <router-link :to="{name:'technicalNotes'}" title="技术笔记">技术笔记</router-link>
                </li>
                <li><a href="javascript:;" title="慢生活">慢生活</a></li>
                <li><a href="javascript:;" title="文章归档">文章归档</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: 'nav',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav {
    width: 100%;
    line-height: 40px;
    height: 40px;
    margin: auto;
    margin-bottom: 16px
}
.nav .container{
    margin: auto;
    width: 1030px;
    position: relative;
}
.customMenu {
    position: absolute;
    left: 0;
    top: -16px;
    z-index: -1
}
.nav ul {
    margin: auto;
    width: 1030px
}

.nav ul li {
    float: left;
    width: 90px;
    text-align: center;
    text-shadow: #333 1px 1px 1px
}
.nav ul li a{
    display: block;
    color: #FFF;
    cursor: pointer;
    transition: all 0.5s;
}
.nav ul li a:hover {
    background: #e15782;
    color: #FFF;
    font-weight: bold;
    border-radius: 40px 0;
}
/*.nav ul li a.router-link-active{
    background: #e15782;
    color: #FFF;
    font-weight: bold;
    border-radius: 40px 0;
}*/
.nav ul li a#nav_current {
    font-weight: bold;
}
</style>

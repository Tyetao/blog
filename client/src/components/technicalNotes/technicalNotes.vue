<template>
    <div>
        <div class="technicalNotes">
            <h2><a href="/">女孩都有浪漫的小情怀</a></h2>
            <p class="datetime">2013-5-20</p>
            <img class="cover" src="./2011713195450617.jpg">
            <span class="dsc">女孩子都有着浪漫的小情怀，对于求婚更是抱着满满的浪漫期待，也希望在求婚那一天对方可以给自己一个最浪漫的求婚词。女孩子都有着浪漫的小情怀，对于求婚更是抱着满满的浪漫期待，也希望在求婚那一天对方可以给自己一个最浪漫的求婚词。女孩子都有着浪漫的小情怀，对于求婚更是抱着满满的浪漫期待，也希望在求婚那一天对方可以给自己一个最浪漫的求婚词。女孩子都有着浪漫的小情怀，对于求婚更是抱着满满的浪漫期待，也希望在求婚那一天对方可以给自己一个最浪漫的求婚词一天对方可以给自己一个最浪漫的求婚词。女孩子都有着浪漫的小情怀，对于求婚更是抱着满满的浪漫期待，也希望在求婚那一天对方可以给自己一个最浪漫的求婚词。女孩子都有着浪漫的小情怀，对于求婚更是抱着满满的浪漫期待，也希望在求婚那一天对方可以给自己一个最浪漫的求婚词。对于求婚更是抱着满满的浪漫期待，</span>
            <p class="read">
                <!-- <a href="/">阅读>></a> -->
                <router-link :to="{name:'articleDatile',params:{id:1}}">阅读>></router-link>
            </p>
        </div>
        <div class="technicalNotes">
            <h2><a href="/">女孩都有浪漫的小情怀</a></h2>
            <p class="datetime">2013-5-20</p>
            <img class="cover" src="./2011713195450617.jpg">
            <span class="dsc">女孩子都有着浪漫的小情怀，对于求婚更是抱着满满的浪漫期待，也希望在求婚那一天对方可以给自己一个最浪漫的求婚词。女孩子都有着浪漫的小情怀，对于求婚更是抱着满满的浪漫期待，也希望在求婚那一天对方可以给自己一个最浪漫的求婚词。女孩子都有着浪漫的小情怀，对于求婚更是抱着满满的浪漫期待，也希望在求婚那一天对方可以给自己一个最浪漫的求婚词。女孩子都有着浪漫的小情怀，对于求婚更是抱着满满的浪漫期待，也希望在求婚那一天对方可以给自己一个最浪漫的求婚词。女孩子都有着浪漫的小情怀，对于求婚更是抱着满满的浪漫期待，也希望在求婚那一天对方可以给自己一个最浪漫的求婚词。对于求婚更是抱着满满的浪漫期待，</span>
            <p class="read"><a href="/">阅读>></a></p>
        </div>
        <div class="technicalNotes">
            <h2><a href="/">女孩都有浪漫的小情怀</a></h2>
            <p class="datetime">2013-5-20</p>
            <img class="cover" src="./2011713195450617.jpg">
            <span class="dsc">女孩子都有着浪漫的小情怀，对于求婚更是抱着满满的浪漫期待，也希望在求婚那一天对方可以给自己一个最浪漫的求婚词。女孩子都有着浪漫的小情怀，对于求婚更是抱着满满的浪漫期待，也希望在求婚那一天对方可以给自己一个最浪漫的求婚词。女孩子都有着浪漫的小情怀，对于求婚更是抱着满满的浪漫期待，也希望在求婚那一天对方可以给自己一个最浪漫的求婚词。女孩子都有着浪漫的小情怀，对于求婚更是抱着满满的浪漫期待，也希望在求婚那一天对方可以给自己一个最浪漫的求婚词。女孩子都有着浪漫的小情怀，对于求婚更是抱着满满的浪漫期待，也希望在求婚那一天对方可以给自己一个最浪漫的求婚词。对于求婚更是抱着满满的浪漫期待，</span>
            <p class="read"><a href="/">阅读>></a></p>
        </div>
        <div class="page">
            <a href="javascript:;" class="prve page_a"><</a>
            <ul class="clearfix">
                <li>
                    <a href="javascript:;" class="page_a">1</a>
                </li>
                <li>
                    <a href="javascript:;" class="page_a">2</a>
                </li>
                <li>
                    <a href="javascript:;" class="page_a">3</a>
                </li>
            </ul>
            <a href="javascript:;" class="next page_a">></a>
        </div>
    </div>
</template>

<script>
export default {
  name: 'technicalNotes',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.technicalNotes h2 {
    font-size: 14px;
    background: url(import.gif) no-repeat 0 16px;
    padding: 10px 0 0 20px;
    line-height: 30px
}

.technicalNotes h2 a {
    color: #333;
    transition: all 1s;
}

.technicalNotes h2 a:hover {
    padding: 0 0 0 20px;
}

img.cover {
    width: 250px;
    float: left;
    margin-right: 10px
}

span.dsc {
    height: 166px;
    display: inline-block;
    width: 460px;
    position:relative;
    line-height:21px;
    overflow:hidden;
    text-align: justify;
}
span.dsc::after {
    content:"...";
    font-weight:bold;
    position:absolute;
    bottom:0;
    right:0;
    padding:0 0px 0px 5px;
    background: #e5f3f7;
}
.read {
    width: 100%;
    margin: 10px 0;
    padding: 10px 0;
    text-align: right;
}

.read a {
    background: #F60;
    color: #FFF;
    padding: 5px;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -o-transition: all 0.5s;
}

.read a:hover {
    text-decoration: underline
}

.datetime {
    margin: 10px 0
}
.page {
    position: relative;
    height: 40px;
}
.page ul{
    position: absolute;
    left: 50%;
    transform: translateX(-50%)
}
.page ul li {
    float: left;
    margin: 0 4px
}
.page .page_a{
    background: #fff;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    display: inline-block;
    text-align: center;
    line-height: 26px;
    color: #F60;
    transition: all .6s
}
.page .page_a:hover{
    background: #F60;
    color: #fff
}
.page .prve{
    position: absolute;
    left: 0;
    top: 0;
}
.page .next{
    position: absolute;
    right: 0;
    top: 0;
}
</style>

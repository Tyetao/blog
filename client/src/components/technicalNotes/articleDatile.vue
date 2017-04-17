<template>
    <div class="articleDatile">
        <h3>{{obj.articleName}}</h3>
        <div class="title">
            <span>
                <label>发布时间：</label>
                <a href="javascript:;">{{obj.create | formatDate}}</a>
            </span>
            <span>
                <label>作者：</label>
                <a href="javascript:;">{{obj.articleAuthor}}</a>
            </span>
            <span>
                <label>来源：</label>
                <a href="javascript:;">{{obj.articleLink}}</a>   
            </span>
            <span>
                <label>阅读：</label>
                <a href="javascript:;">{{obj.clickRate}}次</a>   
            </span>
        </div>
        <div class="content">
            {{obj.content}}
        </div>
        <p class="contentPrve">上一篇   最浪漫的求婚词</p>
        <p class="contentNext">下一篇   最浪漫的求婚词</p>
        <div class="comment">
            <p class="p">欢迎评论:</p>
            <div class="clearfix">
                <img class="img" src="./2011713195450617.jpg" width="50" height="50" alt="">
                <div class="comment_right">
                    <span class="name">tyetao</span>
                    <span class="time">2017-4-16</span>
                    <p> 孩子都有着浪漫的小情怀，对于求婚更是抱着满满的浪漫期待，也希望在求婚那一天对方可以给自己一个最浪漫的求婚词。女孩子都有着浪漫的小情怀，对于求婚更是抱着满满的浪漫期待，也希望在求婚那一天对方可以给自己一个最浪漫的求婚词</p>
                </div>
                <button class="replay">回复</button>
            </div>
            <div class="clearfix">
                <img class="img" src="./2011713195450617.jpg" width="50" height="50" alt="">
                <div class="comment_right">
                    <span class="name"><i>tyetao</i> 回复 <i>tyetao</i></span>
                    <span class="time">2017-4-16</span>
                    <p> 孩子都有着浪漫的小情怀，对于求婚更是抱着满满的浪漫期待，也希望在求婚那一天对方可以给自己一个最浪漫的求婚词。女孩子都有着浪漫的小情怀，对于求婚更是抱着满满的浪漫期待，也希望在求婚那一天对方可以给自己一个最浪漫的求婚词</p>
                </div>
                <button class="replay">回复</button>
            </div>
            <textarea class="textarea"></textarea>
            <button class="replay" style="margin-bottom:10px"> 提交</button>
        </div>
    </div>
</template>

<script>
let url = 'http://localhost:3006/';
import { formatDate } from '../../assets/js/date';
export default {
    name: 'articleDatile',
    data () {
        return {
            obj: ''
        }
    },
    methods: {
        initData() {
            console.log(this.$route)
            let id = this.$route.params.id;
            this.$http.post(url + 'articleDatile', {id:id}).then(res => {
                console.log(res.body)
                let obj = res.body
                if (obj.error_code == "Y10000") {
                    this.obj = obj.datas;
                }
            }, err => {
                console.log(err)
            })
        }
    },
    created() {
        this.initData()
    },
    filters: {
        formatDate(time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .articleDatile {
        padding: 20px 0;
    }
    .articleDatile h3{
        text-align: center;
        margin-bottom: 20px
    }
    .articleDatile .title{
        text-align: center;
    }
    .articleDatile .title span a{
        color: #999
    }
    .articleDatile .content{
        margin: 20px 0 0 0;
        line-height: 20px
    }
    .contentPrve{
        margin-top: 10px;
        cursor: pointer;
        color: #999
    }
    .contentNext{
        margin-bottom: 20px;
        margin-top: 6px;
        cursor: pointer;
        color: #999
    }
    .contentNext:hover,.contentPrve:hover{
        text-decoration: underline;
    }
    .comment .p{
        margin-bottom: 20px
    }
    .comment .img{
        float: left;
    }
    .comment .comment_right{
        float: right;
        width: 660px
    }
    .comment_right .name{
        margin-right: 20px;
        color: #000;
        font-weight: bold;
    }
    .comment_right .name,.comment_right .time{
        display: inline-block;
        height: 20px;
    }
    .replay{
        width: 40px;
        height: 24px;
        background: #fff;
        float: right;
        border-radius: 3px;
        border: none;
        margin-top: 10px;
        cursor: pointer;
    }
    .textarea{
        width: 100%;
        height: 60px;
        margin-top: 20px;
        padding: 6px;
        box-sizing: border-box;
    }
</style>

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
            <article v-html="obj.content" class="markdown-body">
            </article>
        </div>
        <p class="contentPrve">上一篇 
            <span  v-if="obj1" @click="initData(obj1._id)" >  
                {{obj1.articleName}}
            </span>
            <span  v-if="!obj1">  
                到顶了
            </span>
        </p>
        <p class="contentNext">下一篇  
            <span  v-if="obj2" @click="initData(obj2._id)" >   
                {{obj2.articleName}}
            </span>
            <span  v-if="!obj2">  
                到底了
            </span>
        </p>
        <div class="comment">
            <p class="p">欢迎评论:</p>
            <div v-for="item in comments" class="item clearfix">
                <div class="clearfix">
                    <img class="img" src="./2011713195450617.jpg" width="50" height="50" alt="">
                    <div class="comment_right">
                        <span class="name">{{item.from}}</span>
                        <span class="time">{{item.meta.createAt | formatDate}}</span>
                        <p> {{item.content}}</p>
                    </div>
                </div>
                <div class="clearfix">
                    <button class="replay">回复</button>
                </div>
                <div style="width:660px;margin-left:60px" class="clearfix">
                    <div class="clearfix">
                        <img class="img" src="./2011713195450617.jpg" width="50" height="50" alt="">
                        <div style="width:600px" class="comment_right">
                            <span class="name">1211&nbsp;&nbsp;回复&nbsp;&nbsp;啊实打实的</span>
                            <span class="time">121122</span>
                            <p>啊实打实的啊实打实的啊实打实的啊实打实的啊实打实的啊实打实的啊实打实的啊实打实的啊实打实的啊实打实的啊实打实的啊实打实的啊实打实的啊实打实的啊实打实的啊实打实的啊实打实的啊实打实的啊实打实的啊实打实的啊实打实的啊实打实的啊实打实的啊实打实的啊实打实的啊实打实的</p>
                        </div>
                    </div>
                    <div style="height:24px">
                        <button class="replay">回复</button>
                    </div>
                </div>
            </div>
        </div>
            <textarea class="textarea" v-model="comment.content">
            </textarea> 
            <button @click="saveComment()" class="replay" style="margin:10px 0"> 提交</button>
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
            obj: '',
            obj1: '',
            obj2: '',
            comment: {
                article: '',
                from: '58ee38a2ed16a10482801f33',
                content: ''
            },
            comments: ''
        }
    },
    methods: {
        initData(id) {
            this.$http.post(url + 'articleDatile', {id:id}).then(res => {
                console.log(res.body.datas)
                let obj = res.body;
                if (obj.error_code == "Y10000") {
                    this.obj = obj.datas.article;
                    this.obj1 = obj.datas.prveArticle[0];
                    this.obj2 = obj.datas.nextArticle[0];
                    this.comments = obj.datas.comments;
                }
            }, err => {
                console.log(err)
            })
        },
        saveComment() {
            let jsonParams = JSON.stringify(this.comment)
            this.$http.post(url + 'commentSave', {comment:jsonParams}).then(res => {
                let obj = res.body;
                if (obj.error_code == "Y10000") {
                    this.initData(obj.datas.article)
                    this.comment.content = ''
                }
            }, err => {
                console.log(err)
            })
        }
    },
    created() {
        let id = this.$route.params.id;
        this.comment.article = id;
        this.initData(id)
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
        color: #999;
    }
    .contentNext{
        margin-bottom: 20px;
        margin-top: 6px;
        cursor: pointer;
        color: #999;
    }
    .contentNext span,.contentPrve span{
        margin-left: 20px;
        display: inline-block;
    }
    .contentNext span:hover,.contentPrve span:hover{
        text-decoration: underline;
        color: #000
    }
    .comment .item{
        border-bottom: 1px solid #ccc;
        padding: 10px 0;

    }
    .comment .item img {
        border-radius: 50%;
    }
    .comment .p{
        margin-bottom: 20px;
        color: #000;
        font-weight: bold;
        font-size: 14px;
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
        background: #F60;
        float: right;
        border-radius: 3px;
        border: none;
        cursor: pointer;
        color: #fff
    }
    .replay:hover{
        background: #fff;
        color: #f60;
        border: 1px solid #ccc
    }
    .textarea{
        width: 100%;
        height: 60px;
        margin-top: 20px;
        padding: 6px;
        box-sizing: border-box;
    }
</style>

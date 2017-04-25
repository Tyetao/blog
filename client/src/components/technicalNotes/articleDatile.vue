<template>
    <div class="articleDatile">
        <h3 class="h3">{{obj.articleName}}</h3>
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
                <a target="_blank" :href="obj.articleLink">{{obj.articleLink}}</a>   
            </span>
            <span>
                <label>阅读：</label>
                <a href="javascript:;">{{obj.clickRate}}次</a>   
            </span>
        </div>
        <div class="content">
            <article v-html="obj.content">
            </article>
        </div>
        <p class="contentPrve">上一篇
            <router-link v-if="obj1" 
                tag="span" 
                :to="{name:'articleDatile',params:{id:obj1._id}}"   
                @click.native="initData(obj1._id)" >  
                {{obj1.articleName}}
            </router-link>
            <span  v-if="!obj1">  
                到顶了
            </span>
        </p>
        <p class="contentNext">下一篇  
            <router-link 
                v-if="obj2"
                tag="span" 
                :to="{name:'articleDatile',params:{id:obj2._id}}"   @click.native="initData(obj2._id)" >   
                {{obj2.articleName}}
            </router-link>
            <span  v-if="!obj2">  
                到底了
            </span>
        </p>
        <div class="comment">
            <p class="p">欢迎评论:</p>
            <div v-if="obj3 && obj3.length>0" v-for="item in obj3" class="item clearfix">
                <div class="clearfix">
                    <img v-if="item.imgUrl.imgUrl" class="img" :src="urlImg+item.imgUrl.imgUrl" width="50" height="50" alt="">
                    <img  v-if="!item.imgUrl.imgUrl" class="img" src="./2011713195450617.jpg" width="50" height="50" alt="">
                    <div class="comment_right">
                        <span v-if="item.from" class="name">{{item.from.userName}}</span>
                        <span class="time">{{item.meta.createAt | formatDate}}</span>
                    <button 
                        :cid="item._id" 
                        :tid="item.from._id" 
                        @click="replay($event)" class="replay">回复</button>
                        <p v-html="item.content"></p>
                        <div class="textarea twotextarea">
                                <span style="color:#ccc">
                                    回复 {{item.from.userName}}:
                                </span>
                                <textarea placeholder="欢迎吐槽..." v-model="comment.content"></textarea>
                                <button  @click="onEditorBlur()" class="replay" style="margin:10px 0;margin-left:10px; float:right">取消</button>
                                <button @click="saveComment()" class="replay" style="margin:10px 0;float:right"> 提交</button>
                            </div>
                    </div>
                </div>
                
                <div v-if="item.reply && item.reply.length > 0" v-for="(replyItem, index) in item.reply" style="width:660px;margin-left:60px;margin-top:20px" class="clearfix">
                    <div class="clearfix">
                        <img v-if="replyItem.imgUrl.imgUrl" class="img" :src="urlImg+replyItem.imgUrl.imgUrl" width="50" height="50" alt="">
                        <img  v-if="!replyItem.imgUrl.imgUrl" class="img" src="./2011713195450617.jpg" width="50" height="50" alt="">
                        <div style="width:600px" class="comment_right">
                            <span class="name">{{replyItem.from.userName}}&nbsp;&nbsp;回复&nbsp;&nbsp;{{replyItem.to.userName}}</span>
                            <span class="time">{{replyItem.createAt | formatDate}}</span>
                            <button 
                                :cid="item._id" 
                                :tid="replyItem.from._id" 
                                @click="replay($event,index)"
                                class="replay">回复
                            </button>
                            <p v-html="replyItem.content"></p>
                            <div class="textarea twotextarea">
                                <span style="color:#ccc">
                                    回复 {{replyItem.from.userName}}:
                                </span>
                                <textarea placeholder="欢迎吐槽..." v-model="comment.content"></textarea>
                                <button  @click="onEditorBlur()" class="replay" style="margin:10px 0;margin-left:10px; float:right">取消</button>
                                <button @click="saveComment()" class="replay" style="margin:10px 0;float:right"> 提交</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="textarea onetextarea">
            <textarea placeholder="欢迎吐槽..." v-model="comment.content"></textarea>
            <button @click="saveComment()" class="replay" style="margin:10px 0;float:right"> 提交</button>
        </div>
        </div>
    </div>
</template>

<script>
import { formatDate } from '../../assets/js/date';
export default {
    name: 'articleDatile',
    data () {
        return {
            url:'',
            urlImg: '',
            userName1: '',
            userName2: '',
            userId1: '',
            userId2: '',
            userId: '',
            obj: '',//当前文章内容
            obj1: '',//上篇文章内容
            obj2: '',//下篇文章内容
            comment: {
                imgUrl: '',
                article: '',//当前文章id
                from: '',//当前评论人的id
                content: '',
                tid:'',//回复给谁的id
                cid:''//主评论id
            },
            obj3: '',//评论的内容
            showReply: ''
        }
    },
    methods: {
        //获取路由id
        initArticleId(){
            let id = this.$route.params.id;
            this.comment.article = id;
        },
        //文章详细
        initData(id) {
            let articleId = id || this.comment.article;
            this.$http.post(this.url + 'api/articleDatile', {id:articleId}).then(res => {
                let obj = res.body;
                console.log('文章详细',obj)
                if (obj.error_code == "Y10000") {
                    this.obj = obj.datas.article;
                    this.obj1 = obj.datas.prveArticle[0];
                    this.obj2 = obj.datas.nextArticle[0];
                    this.obj3 = obj.datas.comments;
                }
            }, err => {
                alert('查询文章失败');
            })
        },
        //提交评论
        saveComment() {
            if (!this.userName1 && !this.userName2) {
                alert('请登录后评论');
                return;
            }
            if (this.comment.content == '') {
                alert('评论内容不能为空');
                return;
            }
            this.initArticleId();

            this.comment.from = this.userId1 || this.userId2;
            this.comment.imgUrl = this.userId1 || this.userId2;
            console.log(this.comment.imgUrl)
            let jsonParams = JSON.stringify(this.comment)
            this.$http.post(this.url + 'api/commentSave', {comment:jsonParams}).then(res => {
                let obj = res.body;
                if (obj.error_code == "Y10000") {
                    this.initData(obj.datas.article);
                    this.comment.tid = '';
                    this.comment.cid = '';
                    this.comment.content = '';
                    $('.twotextarea').hide();
                    $('.onetextarea').show();
                }
            }, err => {
                console.log(err)
            })
        },
        //回复评论
        replay(event,index){
            let cid = event.target.getAttribute('cid');
            let tid = event.target.getAttribute('tid');
            this.comment.tid = tid;
            this.comment.cid = cid;
            $('.textarea').hide();
            event.srcElement.parentNode.children[4].style.display = 'block';
            $('textarea').focus()
        },
        //取消回复
        onEditorBlur(){
            this.comment.tid = '';
            this.comment.cid = '';
            $('.twotextarea').hide();
            $('.onetextarea').show();
        }
    },
    created() {
        this.url = this.global_url.global_url;
        this.urlImg = this.global_url.global_url_img + 'static/';

        this.initArticleId();
        this.initData();

        this.userName1 = localStorage.getItem('userName');
        this.userName2 = sessionStorage.getItem('userName');
        this.userId1 = localStorage.getItem('userId');
        this.userId2 = sessionStorage.getItem('userId');
    },
    filters: {
        formatDate(time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

    .articleDatile {
        padding: 20px 0;
    }
    .articleDatile .h3{
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
        padding: 20px 0;

    }
    /*.comment .item img {
        border-radius: 50%;
    }*/
    .comment .p{
        margin-bottom: 20px;
        color: #000;
        font-weight: bold;
        font-size: 14px;
    }
    .comment .img{
        float: left;
        border: 1px solid #666;
        border-radius: 50%;
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
        height: 24px;
        line-height: 24px;
    }
    .comment_right p{
        margin-top: 10px;
    }
    .replay{
        width: 40px;
        height: 24px;
        background: #F60;
        margin-left: 20px;
        border-radius: 3px;
        border: none;
        cursor: pointer;
        color: #fff;
    }
    .replay:hover{
        background: #fff;
        color: #f60;
        border: 1px solid #ccc
    }
    .textarea{
        width: 100%;
        height: 70px;
        margin-top: 20px;
        padding: 6px;
        box-sizing: border-box;
        background: #fff;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }
    .twotextarea{
        display: none;
    }
    .textarea textarea{
        vertical-align: text-top;
        height: 60px;
        width: 100%;
        background: none;
        border: none;
        resize: none;
        box-sizing: border-box;
    }
</style>

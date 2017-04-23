<template>
    <div>
        <div v-for="item in jsonData" class="technicalNotes">
            <h2><a href="/">{{item.articleName}}</a></h2>
            <p class="datetime">{{item.create | formatDate}}</p>
            <img class="cover" :src="url+item.imgUrl">
            <span class="dsc">{{item.articleDes}}</span>
            <p class="read">
                <!-- <a href="/">阅读>></a> -->
                <router-link :to="{name:'articleDatile',params:{id:item._id}}">阅读>></router-link>
            </p>
        </div>
        <div class="page">
            <a @click="prve()" href="javascript:;" class="prve page_a">上一页</a>
            <ul class="clearfix">
                <li v-for="n in totalPage">
                    <a 
                        @click="changePage(n)" 
                        :class="{'page_a':true,'current': n == showPage}">{{n}}</a>
                </li>
            </ul>
            <a @click="next()" href="javascript:;" class="next page_a">下一页</a>
        </div>
    </div>
</template>

<script>
import { commonEmit } from '../../assets/js/common';
import {formatDate} from '../../assets/js/date';
let url = 'http://localhost:3006/';
export default {
    name: 'technicalNotes',
    data () {
        return {
            jsonData: '',
            count: 3,
            page: 1,
            url: 'http://localhost:9090/static/',
            image:'',
            totalPage: '',
            showPage: 1,
            query:''
        }   
    },
    methods: {
        initDate(query,page) {
            this.showPage = page;

            let jsonParmas = {
                "count": this.count,
                "page": page,
                "query": query
            }

            this.$http.post(url + 'api/list',jsonParmas).then( res => {
                let jsonData = res.body;
                if (jsonData.error_code == "Y10000") {
                    this.jsonData = jsonData.datas;
                    this.totalPage = Math.ceil(jsonData.totalCount/this.count)
                }
            }, errs => {
                console.log(errs)
            })
        },
        prve() {
            if (this.page == 1) {
                return;
            }
            this.page --;
            this.showPage = this.page;
            this.initDate(this.query.query,this.page)
        },
        next() {
            if (this.page == this.totalPage) {
                return;
            }
            this.page ++;
            this.showPage = this.page;
            this.initDate(this.query.query,this.page)
        },
        changePage (n){
            this.page = n;
            this.showPage = n;
            this.initDate(this.query.query,this.page)
        }
    },
    created() {
        this.query = JSON.parse(sessionStorage.getItem('sessionQuery'));
        this.page = this.query.page;
        this.initDate(this.query.query,this.page);
        commonEmit.$on('getArticle',this.initDate)
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
    height: 60px;
    margin-top: 30px
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
    transition: all .6s;
    cursor: pointer;
}
.page .current {
    background: #F60;
    color: #fff
}
.page .page_a:hover{
    background: #F60;
    color: #fff
}
.page .prve{
    position: absolute;
    left: 0;
    top: 0;
    width: 80px;
    border-radius: 30px
}
.page .next{
    position: absolute;
    right: 0;
    top: 0;
    width: 80px;
    border-radius: 30px
}
</style>

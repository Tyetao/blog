<template>
    <aside>
        <h2>技术笔记分类</h2>
        <ul v-if="obj2 && obj2.length>0">
            <li v-for="item in obj2">
                <!-- <a href="/">{{item.articleName}}({{item.length}})</a> -->
                <router-link 
                        @click.native="getArticle($event)" 
                        :to="{name:'technicalNotes'}" 
                        :id="item.articleType">
                        {{item.articleName}}({{item.length}})
                    </router-link>
            </li>
        </ul>
        <h2>近期文章</h2>
        <ul v-if="obj && obj.length>0">
            <li v-for="item in obj">
                <router-link
                    @click.native="goArticleDatile()" 
                    tag="a" 
                    :to="{name:'articleDatile',params:{id:item._id}}">
                    {{item.articleName}}
                </router-link>
            </li>
        </ul>
        <h2>点击排行</h2>
        <ul>
            <li v-for="item in obj1">
                <router-link
                    @click.native="goArticleDatile()" 
                    tag="a" 
                    :to="{name:'articleDatile',params:{id:item._id}}">
                    {{item.articleName}}
                </router-link>
            </li>
        </ul>
        <h2>友情链接</h2>
        <ul>
            <li><a href="/">谭业涛个人博客</a></li>
            <li><a target="_blank" href="https://github.com/Tyetao">github地址</a></li>
            <li><a target="_blank" href="https://Baidu.com">Baidu</a></li>
        </ul>
        <!-- Baidu Button BEGIN -->
        <div id="bdshare" class="bdshare_t bds_tools_32 get-codes-bdshare share">
            <a class="bds_tsina"></a>
            <a class="bds_qzone"></a>
            <a class="bds_tqq"></a>
            <a class="bds_renren"></a>
            <span class="bds_more"></span>
        </div>
    </aside>
</template>

<script>
import { commonEmit } from '../../assets/js/common';
export default {
    name: 'aside',
    data () {
        return {
            url: '',
            obj: '',
            obj1: '',
            obj2: ''
        }
    },
    methods: {
        articleClassify() {
            this.$http.get(this.url+'api/articleClassify').then( res => {
                let obj = res.body;
                console.log(obj)
                if (obj.error_code == "Y10000") {
                    this.obj2 = obj.datas;
                }
            },err =>{    
                alert('查询文章分类失败')
            })
        },
        recentArticle(){
            this.$http.get(this.url+'api/recentArticle').then( res => {
                let obj = res.body;
                if (obj.error_code == "Y10000") {
                    this.obj = obj.datas;
                }
            },err =>{    
                alert('查询最近文章失败')
            })
        },
        goArticleDatile(){
            this.$router.go(0)
        },
        getArticle(event) {
            let query = event.target.id;
            let sessionQuery = {
                "query":query,
                "page":1
            }
            sessionStorage.setItem('sessionQuery',JSON.stringify(sessionQuery));
            commonEmit.$emit('getArticle',query,1);
        },
        getClickRate() {
            this.$http.get(this.url+'api/clickRate').then( res => {
                let obj = res.body;
                if (obj.error_code == "Y10000") {
                    this.obj1 = obj.datas;
                }
            },err =>{    
                alert('查询点击率文章失败')
            })
        }
    },
    created(){
        this.url = this.global_url.global_url;
        this.recentArticle();
        this.articleClassify();
        this.getClickRate();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
aside {
    float: right;
    width: 200px;
    overflow: hidden
}

aside h2 {
    font-size: 14px;
    margin: 10px 0;
    color: #2F5711;
}

.share {
    margin: 10px 0;
}

aside ul {
    padding: 10px 0;
    list-style: none
}

aside ul li {
    line-height: 22px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

aside ul li a {
    color: #fff;
    text-shadow: #06C 1px 1px 1px;
    transition: all 0.5s;
}

aside ul li a:hover {
    background: #2F5711;
    padding: 5px
}
</style>

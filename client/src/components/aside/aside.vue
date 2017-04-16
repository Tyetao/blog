<template>
    <aside>
        <h2>技术笔记分类</h2>
        <ul>
            <li><a href="/">ÂýÉú»î(3)</a></li>
            <li><a href="/">³ÌÐòÈËÉú(25)</a></li>
            <li><a href="/">¾­µäÃÀÎÄ(39)</a></li>
        </ul>
        <h2>近期文章</h2>
        <ul>
            <li><a href="/">Å®º¢¶¼ÓÐÀËÂþµÄÐ¡Çé»³</a></li>
            <li><a href="/">Ò²ÐíÏÂ¸öÂ·¿Ú¾Í»áÓö¼ûÏ£Íû</a></li>
            <li><a href="/">6ÔÂ±ÏÒµ¼¾£¬×£¸£ËÍ¸øÄã</a></li>
            <li><a href="/">Éú»î³£ÓÐÈ±Ï¯µÄ-¿É¸ãÐ¦´ÓÀ´²»È±Ï¯</a></li>
            <li><a href="/">ÎªÁËÒ»¸ö²»´æÔÚµÄÃÎ£¬Ö´ÄîÁËÄÇÃ´¶àÄê</a></li>
            <li><a href="/">ÃÃÃÃ£¬Ã÷ÌìÄã¾ÍÒª¼ÞÈËÀ²</a></li>
        </ul>
        <h2>文章归档</h2>
        <ul>
            <li><a href="/">2008 ÄêÈýÔÂ</a></li>
            <li><a href="/">2008 ÄêËÄÔÂ</a></li>
            <li><a href="/">2008 ÄêÁùÔÂ</a></li>
        </ul>
        <h2>友情链接</h2>
        <ul>
            <li><a href="/">ÑîÇà¸öÈË²©¿Í</a></li>
            <li><a href="/">°Ù¶È</a></li>
            <li><a href="/">Google</a></li>
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
export default {
  name: 'aside',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
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

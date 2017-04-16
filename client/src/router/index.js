import Vue from 'vue'
import Router from 'vue-router'
import TechnicalNotes from '@/components/technicalNotes/technicalNotes'
import ArticleDatile from '@/components/technicalNotes/articleDatile'

Vue.use(Router)

export default new Router({
    mode:'history',
    routes: [
        {
          path: '/',
          redirect: 'technicalNotes',
        },{
            path: '/articleDatile/:id',
            name: 'articleDatile',
            component: ArticleDatile
        },{
            path: '/technicalNotes',
            name: 'technicalNotes',
            component: TechnicalNotes
        }
    ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

class Config {
  constructor () {
    this.path = ''
    this.name = ''
    this.component = undefined
  }

  setPath (path) {
    this.path = path
    return this
  }

  setName (name) {
    this.name = name
    return this
  }

  setComponent (component) {
    this.component = component
    return this
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    new Config().setPath('/').setName('首页').setComponent(Home),
    new Config().setPath('/about').setName('关于').setComponent(() => import('./views/About.vue')),
    new Config().setPath('/article').setName('文章').setComponent(() => import('./views/article/ArticleList.vue')),
    new Config().setPath('/article/:articleId').setName('文章详情').setComponent(() => import('./views/article/ArticleDetail.vue')),
    new Config().setPath('/article/:articleId/editor').setName('文章编辑').setComponent(() => import('./views/article/ArticleEditor.vue')),
    new Config().setPath('/user/:userId').setName('用户详情').setComponent(() => import('./views/user/UserDetail.vue')),
    new Config().setPath('/user/:userId/article').setName('用户文章列表').setComponent(() => import('./views/article/UserArticleList.vue')),
  ]
})

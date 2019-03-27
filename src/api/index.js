import Api from './options'
import Url from './url'
import Method from './method'

const defaultHeaders = () => {
  return {
    'Authorization': `Bearer ${(window.globalApp.signInInfo || {}).accessToken}`
  }
}
const $api = {
  user: {
    sign: {
      up (username, password) {
        return new Api()
        .setUrl(Url.user.sign.up)
        .setMethod(Method.POST)
        .setData({ username, password })
        .request()
      },
      in (username, password) {
        return new Api()
        .setUrl(Url.user.sign.in)
        .setMethod(Method.POST)
        .setData({ username, password })
        .request()
      }
    },
    list (keyword) {
      return new Api()
      .setUrl(Url.user.list)
      .setMethod(Method.GET)
      .setParams({ keyword })
      .setHeaders(defaultHeaders())
      .request()
    },
    detail (userId) {
      return new Api()
      .setUrl(`${Url.user.detail}/${userId}`)
      .setMethod(Method.GET)
      .setHeaders(defaultHeaders())
      .request()
    },
    ghost: {
      jwt () {
        return new Api()
        .setUrl(`${Url.user.ghost.jwt}`)
        .setMethod(Method.GET)
        .request()
      }
    }
  },
  taobao: {
    product: {
      list (keyword, page, size) {
        return new Api()
        .setUrl(Url.taobao.product.list)
        .setMethod(Method.GET)
        .setParams({ keyword, page, size })
        .request()
      }
    },
    coupon: {
      list (keyword, page, size) {
        return new Api()
        .setUrl(Url.taobao.coupon.list)
        .setMethod(Method.GET)
        .setParams({ keyword, page, size })
        .request()
      }
    },
    promote: {
      list (keyword, page, size) {
        return new Api()
        .setUrl(Url.taobao.promote.list)
        .setMethod(Method.GET)
        .setParams({ keyword, page, size })
        .request()
      }
    },
    tkl: {
      create (text, url) {
        return new Api()
        .setUrl(Url.taobao.tkl.create)
        .setMethod(Method.GET)
        .setParams({ text, url })
        .request()
      }
    }
  },
  article: {
    create (title, content, type) {
      return new Api()
      .setUrl(Url.article.create)
      .setMethod(Method.POST)
      .setData({ title, content, type })
      .setHeaders(defaultHeaders())
      .request()
    },
    list (keyword, type) {
      return new Api()
      .setUrl(Url.article.list)
      .setMethod(Method.GET)
      .setParams({ keyword, type })
      .request()
    },
    detail (articleId) {
      return new Api()
      .setUrl(`${Url.article.detail}/${articleId}`)
      .setMethod(Method.GET)
      .request()
    },
    delete (id) {
      return new Api()
      .setUrl(Url.article.delete)
      .setMethod(Method.DELETE)
      .setData({ id })
      .setHeaders(defaultHeaders())
      .request()
    },
    publish (id) {
      return new Api()
      .setUrl(Url.article.publish)
      .setMethod(Method.PUT)
      .setData({ id })
      .setHeaders(defaultHeaders())
      .request()
    },
    modify (id, title, content) {
      return new Api()
      .setUrl(Url.article.modify)
      .setMethod(Method.PUT)
      .setData({ id, title, content })
      .setHeaders(defaultHeaders())
      .request()
    }
  }
}
export default class Plugin {
  static install (Vue) {
    Vue.prototype.$api = $api
  }
}

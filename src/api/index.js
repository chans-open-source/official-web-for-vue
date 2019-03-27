import Url from './url'
import { ApiOptions, ApiMethod } from 'vue-apis'

const defaultHeaders = () => {
  return {
    'Authorization': `Bearer ${(window.globalApp.signInInfo || {}).jwt}`
  }
}

const $api = {
  user: {
    sign: {
      up (username, password) {
        return new ApiOptions()
        .setUrl(Url.user.sign.up)
        .setMethod(ApiMethod.POST)
        .setData({ username, password })
        .request()
      },
      in (username, password) {
        return new ApiOptions()
        .setUrl(Url.user.sign.in)
        .setMethod(ApiMethod.POST)
        .setData({ username, password })
        .request()
      }
    },
    list (keyword) {
      return new ApiOptions()
      .setUrl(Url.user.list)
      .setMethod(ApiMethod.GET)
      .setParams({ keyword })
      .setHeaders(defaultHeaders())
      .request()
    },
    detail (userId) {
      return new ApiOptions()
      .setUrl(`${Url.user.detail}/${userId}`)
      .setMethod(ApiMethod.GET)
      .setHeaders(defaultHeaders())
      .request()
    },
    ghost: {
      jwt () {
        return new ApiOptions()
        .setUrl(`${Url.user.ghost.jwt}`)
        .setMethod(ApiMethod.GET)
        .request()
      }
    }
  },
  taobao: {
    product: {
      list (keyword, page, size) {
        return new ApiOptions()
        .setUrl(Url.taobao.product.list)
        .setMethod(ApiMethod.GET)
        .setParams({ keyword, page, size })
        .request()
      }
    },
    coupon: {
      list (keyword, page, size) {
        return new ApiOptions()
        .setUrl(Url.taobao.coupon.list)
        .setMethod(ApiMethod.GET)
        .setParams({ keyword, page, size })
        .request()
      }
    },
    promote: {
      list (keyword, page, size) {
        return new ApiOptions()
        .setUrl(Url.taobao.promote.list)
        .setMethod(ApiMethod.GET)
        .setParams({ keyword, page, size })
        .request()
      }
    },
    tkl: {
      create (text, url) {
        return new ApiOptions()
        .setUrl(Url.taobao.tkl.create)
        .setMethod(ApiMethod.GET)
        .setParams({ text, url })
        .request()
      }
    }
  },
  article: {
    create (title, content, type) {
      return new ApiOptions()
      .setUrl(Url.article.create)
      .setMethod(ApiMethod.POST)
      .setData({ title, content, type })
      .setHeaders(defaultHeaders())
      .request()
    },
    list (keyword, type) {
      return new ApiOptions()
      .setUrl(Url.article.list)
      .setMethod(ApiMethod.GET)
      .setParams({ keyword, type })
      .request()
    },
    detail (articleId) {
      return new ApiOptions()
      .setUrl(`${Url.article.detail}/${articleId}`)
      .setMethod(ApiMethod.GET)
      .request()
    },
    delete (id) {
      return new ApiOptions()
      .setUrl(Url.article.delete)
      .setMethod(ApiMethod.DELETE)
      .setData({ id })
      .setHeaders(defaultHeaders())
      .request()
    },
    publish (id) {
      return new ApiOptions()
      .setUrl(Url.article.publish)
      .setMethod(ApiMethod.PUT)
      .setData({ id })
      .setHeaders(defaultHeaders())
      .request()
    },
    modify (id, title, content) {
      return new ApiOptions()
      .setUrl(Url.article.modify)
      .setMethod(ApiMethod.PUT)
      .setData({ id, title, content })
      .setHeaders(defaultHeaders())
      .request()
    }
  }
}
export default $api

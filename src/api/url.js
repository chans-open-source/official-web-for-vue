// 接口请求Url配置
const DEV_BASE_URL_OFFICIAL = `//localhost:7001`
const PROD_BASE_URL_OFFICIAL = `//chansos.com`
const url = path => {
  return `${window.__ENV_DEBUG__ ? DEV_BASE_URL_OFFICIAL : PROD_BASE_URL_OFFICIAL}/api/${path}`
}
export default {
  user: {
    sign: {
      up: url('user'),
      in: url('user/login')
    },
    detail: url('user/detail'),
    ghost: {
      jwt: url('user/ghost/jwt')
    }
  },
  taobao: {
    product: {
      list: url('taobao/product/list')
    },
    coupon: {
      list: url('taobao/coupon/list')
    },
    promote: {
      list: url('taobao/promote/list')
    },
    tkl: {
      create: url('taobao/tkl/create')
    }
  },
  article: {
    create: url('article/create'),
    list: url('article/list'),
    detail: url('article/detail'),
    delete: url('article/delete'),
    publish: url('article/publish'),
    modify: url('article/update')
  }
}

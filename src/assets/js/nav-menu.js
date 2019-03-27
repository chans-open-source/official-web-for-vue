module.exports = {
  NavMenu: [
    {
      label: '首页',
      url: '/'
    },
    {
      label: '文章',
      url: '/article'
    }
  ],
  SignInMenu: [
    {
      label: '个人资料',
      url: '/user/:userId'
    },
    {
      label: '我的文章',
      url: '/user/:userId/article'
    }
  ]
}

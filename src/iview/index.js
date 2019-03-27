import '@/assets/css/iview.less'
import { Message, Spin } from 'iview'

const config = {
  $Message: Message,
  $Spin: Spin,
  showError: function (msg) {
    this.$Message.error(msg)
  },
  showInfo: function (msg) {
    this.$Message.info(msg)
  },
  showWarn: function (msg) {
    this.$Message.warning(msg)
  },
  showSuccess: function (msg) {
    this.$Message.success(msg)
  },
  showLoading: function () {
    window.globalApp.$Spin.show()
  },
  hideLoading: function () {
    window.globalApp.$Spin.hide()
  }
}
export default class Plugin {
  static install (Vue) {
    Object.keys(config).forEach(key => Vue.prototype[key] = config[key])
  }
}

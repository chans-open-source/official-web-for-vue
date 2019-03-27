import MObject from './MObject'
import MUser from './MUser'

const defaultValue = MObject.defaultValue

export default class MSignInInfo extends MObject {
  constructor (obj) {
    super(obj)
    this.jwt = defaultValue(obj['jwt'], '')
    this.createAt = defaultValue(obj['createAt'], undefined)
    this.expiredAt = defaultValue(obj['expiredAt'], undefined)
    this.user = new MUser(defaultValue(obj['user'], undefined))
  }

  setUser (user) {
    this.user = user
    return this
  }
}

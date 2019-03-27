import MObject from './MObject'

const defaultValue = MObject.defaultValue

export default class MUser extends MObject {
  constructor (obj) {
    super(obj)
    this.id = defaultValue(obj['id'], '')
    this.username = defaultValue(obj['username'], '')
    this.createAt = defaultValue(obj['createAt'], undefined)
    this.updateAt = defaultValue(obj['updateAt'], undefined)
    this.lastUpdated = defaultValue(obj['lastUpdated'], Date.now())
  }
}

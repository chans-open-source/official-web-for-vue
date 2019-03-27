import MObject from './MObject';

const defaultValue = MObject.defaultValue;
export default class MSignInInfo extends MObject {
  constructor (obj = {}) {
    super(obj);
    this.jwt = defaultValue(obj['jwt'], '');
    this.createAt = defaultValue(obj['createAt'], undefined);
    this.expiredAt = defaultValue(obj['expiredAt'], undefined);
    const user = defaultValue(obj['user'], {});
    this.user = {
      id: defaultValue(user['id'], ''),
      name: defaultValue(user['name'], '')
    };
  }
}

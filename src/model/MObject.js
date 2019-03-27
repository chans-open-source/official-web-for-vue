import isobject from 'isobject';

export default class MObject {
  constructor (obj) {
    const result = MObject.check(obj);
    switch (result) {
      case 1:
        throw new Error('Object is undefined.');
      case 2:
        throw new Error('Param is not a object.');
    }
  }

  static check (obj) {
    if (typeof obj === 'undefined') {
      return 1;
    } else if (!isobject(obj)) {
      return 2;
    }
    return 0;
  }

  static defaultValue (val, defaultVal) {
    return val || defaultVal;
  }
}

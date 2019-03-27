export default class TextUtils {
  static check = {
    username (username) {
      return /^[A-Za-z0-9\u4e00-\u9fa5]{6,32}$/.test(username);
    },
    password (password) {
      return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(password);
    },
    length (str, min, max) {
      if (max < min) {
        const _max = max;
        max = min;
        min = _max;
      }
      min = Math.max(0, min);
      const regexp = new RegExp(`^[\\w|\\W]{${min},${max}}$`);
      return regexp.test(str);
    }
  };
}

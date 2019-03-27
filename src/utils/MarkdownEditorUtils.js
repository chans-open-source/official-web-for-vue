import marked from 'marked';

// https://github.com/sparksuite/simplemde-markdown-editor
// https://github.com/markedjs/marked
const Func = {
  check_library () {
    return {
      css: !!window.document.querySelector('head #MarkdownCss'),
      js: !!window.document.querySelector('head #MarkdownJs'),
    };
  },
  load_library_file (type) {
    const file_path = `/libs/simplemde/simplemde.min.${type}`;
    switch (type) {
      case 'css': {
        Func.add_element(Func.add_attrs(
          'link',
          {
            'id': 'MarkdownCss',
            'rel': 'stylesheet',
            'href': file_path,
          }));
      }
        break;
      case 'js': {
        Func.add_element(Func.add_attrs(
          'script',
          {
            'id': 'MarkdownJs',
            'src': file_path,
          }));
      }
        break;
    }
  },
  add_attrs (target, keyValuePairs) {
    const el = window.document.createElement(target);
    Object.keys(keyValuePairs).forEach(key => {
      el.setAttribute(key, keyValuePairs[key]);
    });
    return el;
  },
  add_element (el) {
    window.document.querySelector('head').appendChild(el);
  },
  start_looper () {
    return new Promise(resolve => {
      const looper_id = setInterval(() => {
        const SimpleMDE = window.SimpleMDE;
        if (SimpleMDE) {
          Func.stop_looper(looper_id);
          resolve(SimpleMDE);
        }
      });
    });
  },
  stop_looper (looper_id) {
    if (looper_id) {
      clearInterval(looper_id);
    }
  }
};
export default class U {
  static loadLibrary (config) {
    const { css, js } = Func.check_library();
    if (!css) {
      Func.load_library_file('css');
    }
    if (!js) {
      Func.load_library_file('js');
    }
    return new Promise(resolve => {
      Func.start_looper().then(MDE => {
        resolve(new MDE(config));
      });
    });
  }

  static mdToHtml (content) {
    return marked(content);
  }
}

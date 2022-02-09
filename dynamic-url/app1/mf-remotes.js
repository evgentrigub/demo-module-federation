/**
 * Загрузка дочернего модуля с динамическим адресом.
 * В данном случае меняется версия по "build-tag"
 */
const getPromise = () => {
  new Promise(resolve => {
    const remoteTagName = 'CUSTOM_ELEMENT_TAG';
    const url = 'CUSTOM_ELEMENT_URL';

    fetch(`${url}/build-tag`).then(text => text.text().then(version => {
      const remote_url = url + `/${version}/remoteEntry.js`;

      const script = document.createElement('script');
      script.src = remote_url
      script.onload = () => {
        const proxy = {
          get: (request) => window[remoteTagName].get(request),
          init: (arg) => {
            try {
              return window[remoteTagName].init(arg);
            } catch(e) {
              console.log('remote container already initialized');
            }
          }
        }
        resolve(proxy);
      }
      document.head.appendChild(script);
    }))
  })
};

/**
 * Передает параметры и заменяет их в строке с телом функции.
 * Таким образом название и адрес попадает внутрь Promise для динамической смены пути. 
 * @param {*} remoteName - название дочернего модуля в camelCase.
 * @param {*} remoteUrl - адрес дочернего модуля.
 * @returns Возвращает строку с содержимым телом функции.
 */
const getRemoteModule = (remoteName, remoteUrl) => (
  getFuncBody(getPromise)
    .replace('CUSTOM_ELEMENT_TAG', remoteName)
    .replace('CUSTOM_ELEMENT_URL', remoteUrl)
);

/**
 * Возвращает объект типа "ключ":"значение" для удаленных модулей в webpack.config.js.
 * Для создания динмаческого пути до каждого микрофронтенда нужно создать Promise
 * в виде распечатанного тела функции. Подробнее в документации: 
 * https://webpack.js.org/concepts/module-federation/#promise-based-dynamic-remotes
 * @param {*} modules массив с удаленными модулями
 */
module.exports = getRemoteModules = (modules) =>(
  modules.reduce((object, remoteModule) => {
    const remoteName = remoteModule.tag.split('-').join('_');
    return {
      ...object,
      [remoteName]: `promise ${getRemoteModule(remoteName, remoteModule.url)}`,
    }
  }, {})
)

const getFuncBody = (func) => {
  let funcString = func.toString();
  funcString = funcString.substring(funcString.indexOf('{') + 1);
  funcString = funcString.substring(0, funcString.length - 1);
  return funcString.trim();
}

// @ts-nocheck
class ImgStore {}

ImgStore.data = {};
/**
 * 设置 Symbol
 * @param key
 * @param value
 */
ImgStore.set = function (key, value) {
  ImgStore.data[key] = value;
};
/**
 * 获取 Symbol
 * @param key
 * @returns {*}
 */
ImgStore.get = function (key) {
  debugger
  return ImgStore.data[key];
};
/**
 * 重置 存储
 * @returns {{}}
 */
ImgStore.reset = function () {
  return (ImgStore.data = {});
};
module.exports = ImgStore;
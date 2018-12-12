/* eslint-disable */
function b64e(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}
  
function b64d(str) {
  return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  }).join(''));
}

/**
 * 設定 localStorage
 * @param { String } key 鑰匙
 * @param { Object } myObject 內容
 * 
 * @example
 * localStorage.setObjectHash('KEY', {
 *   name: 'adam',
 *   age: 26,
 * })
 */
Storage.prototype.setObjectHash = function(key, myObject) {
  const newObject = {};
  Object.keys(myObject).map(function(value, index) {
      newObject[value] = b64e(myObject[value]);
  });
  this.setItem(key, b64e(JSON.stringify(newObject)));
}
 
/**
 * 取得 localStorage
 * @param { String } key 鑰匙
 * @returns { Object }
 * 
 * @example
 * localStorage.getObjectHash('KEY')
 */
Storage.prototype.getObjectHash = function(key) {
  const myObject = this.getItem(key);
  if (!myObject) {
    return null;
  }
  return b64d(myObject) && JSON.parse(b64d(myObject), function (key, value) {
    return (key) ? b64d(this[key]) : this[key];
  });
}
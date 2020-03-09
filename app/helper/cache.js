var md5 = require("./md5");
var AppCache = require("memory-cache");
var DefaultTimeOut = 86400000;

function SaveinCache(searchKey, data, timeOut) {
  var key = md5(searchKey);
  AppCache.put(key, data, timeOut || DefaultTimeOut);
  return key;
}

function GetByCache(searchKey) {
  var key = md5(searchKey);
  return AppCache.get(key);
}

module.exports = {
  SaveinCache: SaveinCache,
  GetByCache: GetByCache
};

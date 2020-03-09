var cache = require("./cache");
var upstream = require("./upstream");

async function GetPostData(key) {
  var result = null;
  result = cache.GetByCache(key);
  if (result) {
    return result;
  }

  try {
    result = await upstream.getPostFromUpstream(key);
  } catch (err) {
    console.log("[Failed][Upstream] error", err);
    return null;
  }

  cache.SaveinCache(key, result);
  return result;
}

async function GetPostFbContent(key) {
  var post = await GetPostData(key);
  if (!post) {
    return null;
  }
  return {
    URL: `${upstream.HOST}/post/${key}`,
    Type: "article",
    Title: post.title,
    Desc: post.truncated_text,
    Image: `${upstream.HOST}files/${post.image}`
  };
}

module.exports = {
  GetPostData: GetPostData,
  GetPostFbContent: GetPostFbContent
};

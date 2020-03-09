var axios = require("axios");

var HOST = "https://cricsurf.com";

async function getPostFromUpstream(id) {
  if (!id) {
    return Error("Inavlid Post Id");
  }
  var resp = await axios.get(`${HOST}/api/post/${id}`);
  console.log("[Info] get Info from service");
  if (resp.status != 200) {
    return Error(`No Post found for this id ${id}`);
  }
  return resp.data;
}

module.exports = {
  HOST: HOST,
  getPostFromUpstream: getPostFromUpstream
};

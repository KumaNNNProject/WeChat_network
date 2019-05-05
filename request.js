/**
 * @desc    网络请求接口类封装
 * @author  kuma8866
 * @date    2019-05-05 00:09:11
 */
const app = getApp();

/**
 * POST请求
 * @param  {String}   url         接口地址
 * @param  {String}   token       请求接口时的Token
 * @param  {Object}   params      请求的参数
 * @param  {Object}   sourceObj   来源对象
 * @param  {Function} successFun  请求成功时的回调函数
 * @param  {Function} failFun     请求失败时的回调函数
 * @param  {Function} startFun 	  请求开始时的回调函数(可覆写var header，即header: header)
 * @param  {Function} completeFun 请求结束时的回调函数(调用成功、失败都会执行)
 */
function requestPost(url, token, params, sourceObj, successFun, failFun, startFun, completeFun) {
  request(url, token, params, 'POST', sourceObj, successFun, failFun, startFun, completeFun)
}

/**
 * GET请求
 * @param  {String}   url         接口地址
 * @param  {String}   token       请求接口时的Token
 * @param  {Object}   params      请求的参数
 * @param  {Object}   sourceObj   来源对象
 * @param  {Function} successFun  请求成功时的回调函数
 * @param  {Function} failFun     请求失败时的回调函数
 * @param  {Function} startFun 	  请求开始时的回调函数(可覆写var header，即header: header)
 * @param  {Function} completeFun 请求结束时的回调函数(调用成功、失败都会执行)
 */
function requestGet(url, token, params, sourceObj, successFun, failFun, startFun, completeFun) {
  request(url, token, params, 'GET', sourceObj, successFun, failFun, startFun, completeFun)
}

/**
 * 网络请求
 * @param  {String}   url         接口地址
 * @param  {String}   token       请求接口时的Token
 * @param  {Object}   params      请求的参数
 * @param  {String}   method      请求类型
 * @param  {Object}   that		  来源对象,相当于 that=this
 * @param  {Function} successFun  请求成功时的回调函数
 * @param  {Function} failFun     请求失败时的回调函数
 * @param  {Function} startFun 	  请求开始时的回调函数(可覆写var header，即header: header)
 * @param  {Function} completeFun 请求结束时的回调函数(调用成功、失败都会执行)
 */
function request(url, token, params, method, that, successFun, failFun, startFun, completeFun) {
  // console.log(token);
  /*---------------- START:参数处理 -------------*/
  if (method == 'POST') {
    var contentType = 'application/x-www-form-urlencoded'
  } else {
    var contentType = 'application/json'
  }

  if (token == '') {
    var header = {
      'Content-Type': contentType,
    };
  } else {
    var header = {
      'Content-Type': contentType,
      'token': token
    };
  }
  /*---------------- END:参数处理 -------------*/
  /*Fun:开始请求*/
  if(typeof startFun == 'function'){
	startFun();
  }
  //调用微信API发起请求
  wx.request({
    url: url,
    method: method,
    data: params,
    header: header,
    /*Fun:请求成功*/
    success: function(res) {
      console.log(res)
	  typeof successFun == 'function' && successFun(res.data, that);
    },
    /*Fun:请求失败*/
    fail: function(res) {
      typeof failFun == 'function' && failFun(res.data, that)
    },
    /*Fun:请求完成*/
    complete: function(res) {
      typeof completeFun == 'function' && completeFun(res.data, that)
    }
  })

}
//导出接口
module.exports = {
  requestPost: requestPost,
  requestGet: requestGet,
}
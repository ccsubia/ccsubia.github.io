/**
 * Ajax的Get请求辅助方法
 * @param {String} url  请求后台的地址
 * @param {Function} callback  请求成之后，返回数据成功，并且调用此方法，这个方法接受一个参数就是后台返回的数据。
 * @return undefined
 */
function ajaxGet(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        callback(xhr.responseText);
      }
    }
  }
  
  // 调用
  ajaxGet('https://unsplash.com/napi/photos?page=1&per_page=12&order_by=popular', function (data) {
    console.log(data);
  });
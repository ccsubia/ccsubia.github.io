Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
var nowUrl = 'https://api.berryapi.net/?service=App.Bing.Images&day=-0'
var apiUrl = 'https://bing.lylares.com/download/hd/'
var showDate = new Date(); // 定义显示日期时间戳
var trueDate = new Date();  // 定义真实日期
date = showDate.Format("yyyy-MM-dd");
var update = document.getElementById("date");
update.innerHTML = date;
document.getElementById("picshow").src = nowUrl; // 初始化今日图片

function day_down(){ // 往前推一天
    // var dateTime=new Date();
    dateTime=showDate.setDate(showDate.getDate()-1);
    dateTime=new Date(dateTime);
    showDate = dateTime
    // return dateTime.toLocaleDat`eString()
    return showDate
}
function day_up(){ // 往后推一天
    dateTime=showDate.setDate(showDate.getDate()+1);
    dateTime=new Date(dateTime);
    showDate = dateTime
    // return dateTime.toLocaleDateString()
    return showDate
}
function beforeday() {  
    var newday = day_down().Format("yyyy-MM-dd")
    document.getElementById("picshow").src = apiUrl + newday;
    update.innerHTML = newday
}
function nextday() {
    var newdayc = day_up();
    var update = document.getElementById("date");
    if (newdayc.getTime() > trueDate.getTime()){ // 请求图片日期未存在
        day_down();
        alert('暂未发布');
        return false
    }
    else if(newdayc.getTime() == trueDate.getTime()){
        var newday = newdayc.Format("yyyy-MM-dd");
        document.getElementById("picshow").src = nowUrl;
        update.innerHTML = newday;
        return true
    }
    else{
        var newday = newdayc.Format("yyyy-MM-dd");
        document.getElementById("picshow").src = apiUrl + newday;
        update.innerHTML = newday;
        return true
    }
}
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

var myDate = new Date();
// date = myDate.toLocaleDateString();
date = myDate.Format("yyyy-MM-dd")
//alert(date)
var update = document.getElementById("date");
update.innerHTML = date;
document.getElementById("picshow").src = 'https://bing.lylares.com/download/hd/' + date;

var i = 0


function daydown(){
    // var dateTime=new Date();
    dateTime=myDate.setDate(myDate.getDate()-1);
    dateTime=new Date(dateTime);
    myDate = dateTime
    // return dateTime.toLocaleDateString()
    return myDate
}
function dayup(){
    dateTime=myDate.setDate(myDate.getDate()+1);
    dateTime=new Date(dateTime);
    myDate = dateTime
    // return dateTime.toLocaleDateString()
    return myDate
}
function beforeday() {
    var newday = daydown().Format("yyyy-MM-dd")
    document.getElementById("picshow").src = 'https://bing.lylares.com/download/hd/' + newday;
    update.innerHTML = newday
}
function nextday() {
    var newdayc = dayup()
    var trueday = new Date()
    if (newdayc > trueday){
        daydown()
        alert('未发布')
    }
    else{
        var newday = newdayc.Format("yyyy-MM-dd")
        document.getElementById("picshow").src = 'https://bing.lylares.com/download/hd/' + newday;
        update.innerHTML = newday
    }
}
var myDate = new Date();
date = myDate.toLocaleDateString();
//alert(date)
var update = document.getElementById("date");
update.innerHTML = date;
var i = 0


function daydown(){
    alert(myDate);
    var before = myDate-1000*60*60*24;//当前日期时间戳减去一天时间戳
    alert(before);
    var beforeDate = new Date(before);//将时间戳转化为Date对象
    var beforeresult = beforeDate.toLocaleDateString();
    myDate = beforeDate;
    alert(beforeresult)
    return begoreresult
}
function dayup(){
    alert(myDate);
    var nextday = myDate + 1000*60*60*24;//当前日期时间戳加上一天时间戳
    alert(nextday);
    var nextDate = new Date(nextday);//将时间戳转化为Date对象
    var result = nextDate.toLocaleDateString();
    myDate = nextDate;
    alert(result);  
    return result
}
function beforeday() {
    document.getElementById("picshow").src = 'https://api.berryapi.net/?service=App.Bing.Images&day=' + String(i + 1);
    i++;
    update.innerHTML = daydown()
}

function nextday() {
    if (i - 1 < 0) {
        alert("未发布")
    } else {
        document.getElementById("picshow").src = 'https://api.berryapi.net/?service=App.Bing.Images&day=' + String(i - 1);
        i--;
        update.innerHTML = dayup()
}
}
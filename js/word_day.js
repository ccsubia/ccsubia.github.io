var source = ['one', 'ciba', 'youdao']
var date1 = {
    service: 'App.Dairy.Words',
    AppKey: '9WxWbC4bpCdc8wFQ',
    source: source[0]
}

var date2 = {
    service: 'App.Dairy.Words',
    AppKey: '9WxWbC4bpCdc8wFQ',
    source: source[1]
}

var date3 = {
    service: 'App.Dairy.Words',
    AppKey: '9WxWbC4bpCdc8wFQ',
    source: source[2]
}

function get_story(date, i) {
    axios.get('https://api.berryapi.net/', {
            params: date
        })
        .then(
            function (response) {
                console.log(response.data);
                // var span = document.createElement('span')
                // span.innerText = response.data.data.author;
                // console.log(span)
                // let currentDiv = document.getElementById("author"); 
                // document.body.insertBefore(span, currentDiv); 
                if (document.getElementById("author" + String(i))) {
                    document.getElementById("author" + String(i)).innerHTML = response.data.data.author;
                    document.getElementById("content" + String(i)).innerHTML = response.data.data.content
                    if (i != 1)
                        document.getElementById("content_en" + String(i)).innerHTML = response.data.data.content_en;
                }
            },
            function (err) {
                console.log(err);
            }
        )
}
get_story(date1, 1)
get_story(date2, 2)
get_story(date3, 3)
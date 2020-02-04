var date = {
    service: 'App.Dairy.Story',
    AppKey: '9WxWbC4bpCdc8wFQ'
}

function get_story() {
    axios.get('https://api.berryapi.net/', {
            params: date
        })
        .then(
            function (response) {
                document.getElementById("joke").innerHTML = response.data.data.content;
                if (document.getElementById("day_pic")) {
                    // var t = document.getElementById('day_pic');//选取id为test的元素
                    // t.style.display = 'block';  // 以块级样式显示
                    document.getElementById("day_pic").src = response.data.data.cover
                }
                document.getElementById("story_title").innerHTML = response.data.data.title;
                //this.joke=response.data.jokes[0];
                console.log(response.data);
            },
            function (err) {
                console.log(err);
            }
        )
}
get_story()
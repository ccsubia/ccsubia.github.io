(function ($) {
  //
  // Search
  var $searchWrap = $('.search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function () {
    isSearchAnim = true;
  };

  var stopSearchAnim = function (callback) {
    setTimeout(function () {
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('.nav-item-search').on('click', function () {
    if (isSearchAnim) return;
    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function () {
      $('.local-search-input').focus();
    });
  });

  $(document).mouseup(function (e) {
    var _con = $('.local-search');
    if (!_con.is(e.target) && _con.has(e.target).length === 0) {
      $searchWrap.removeClass('on');
    }
  });

  //
  // 移动设备侦测
  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  //
  // 建议在移动端不初始化，其实 /search.xml 文件还挺大的，
  if ($('.local-search').size()) {
    $.getScript('/js/search.js', function () {
      searchFunc("/search.xml", 'local-search-input', 'local-search-result');
    });
  }

  //
  // Share
  $('body').on('click', function () {
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function (e) {
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset();

    if ($('#' + id).length) {
      var box = $('#' + id);

      if (box.hasClass('on')) {
        box.removeClass('on');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box">',
        '<input class="article-share-input" value="' + url + '">',
        '<div class="article-share-links">',
        '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
        '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
        '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
        '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>',
        '</div>',
        '</div>'
      ].join('');

      var box = $(html);
      $('body').append(box);
    }
    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function (e) {
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function () {
    $(this).select();
  }).on('click', '.article-share-box-link', function (e) {
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  //
  // fancybox
  if ($.fancybox) {
    $('[data-fancybox]').fancybox({
      protect: true
    });
  }

  //
  // lazyload
  $("img.lazy").lazyload({
    effect: "fadeIn"
  });

  //
  // justifiedGallery
  $('#gallery').justifiedGallery({
    rowHeight: 200,
    margins: 5
  });

  // scroll down
  $(document).ready(function ($) {
    $('.anchor').click(function (e) {
      e.preventDefault();
      $('main').animate({ scrollTop: $('.cover').height() }, 'smooth');
    });
  });

  // To top
  (function ($) {
    // When to show the scroll link
    // higher number = scroll link appears further down the page
    var upperLimit = 1000;

    // Our scroll link element
    var scrollElem = $('#totop');

    // Scroll to top speed
    var scrollSpeed = 1600;

    // Show and hide the scroll to top link based on scroll position
    scrollElem.hide();
    $('.content').scroll(function () {
      var scrollTop = $('.content').scrollTop();
      if (scrollTop > upperLimit) {
        $(scrollElem).stop().fadeTo(300, 1); // fade back in
      } else {
        $(scrollElem).stop().fadeTo(300, 0); // fade out
      }
    });

    // Scroll to top animation on click
    $(scrollElem).click(function () {
      $('.content').animate({ scrollTop: 0 }, scrollSpeed); return false;
    });
  })(jQuery);

  // Mobile nav
  var $content = $('.content'),
    $sidebar = $('.sidebar'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function () {
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function () {
    setTimeout(function () {
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  };

  $('.navbar-toggle').on('click', function () {
    if (isMobileNavAnim) return;
    startMobileNavAnim();
    $content.toggleClass('on');
    $sidebar.toggleClass('on');
    stopMobileNavAnim();
  });

  $($content).on('click', function () {
    if (isMobileNavAnim || !$content.hasClass('on')) return;
    $content.removeClass('on');
    $sidebar.removeClass('on');
  });

  if (window.matchMedia("(min-width: 768px)").matches) {
    $content.addClass('on');
    $sidebar.addClass('on');
  }

  // reward
  $('#reward-btn').on('click', function () {
    $('#mask').fadeIn(100)
    $('#reward').fadeIn(100)
  });
  $('#reward .close, #mask').on('click', function () {
    $('#mask').fadeOut(100)
    $('#reward').fadeOut(100)
  })

  var coreSocialistValues = ["吊啊","BIAJI","强啊","BIAJI","秀啊","BIAJI"/* ,"富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信", "友善" */],
    index = Math.floor(Math.random() * coreSocialistValues.length);
	
    document.body.addEventListener('click',
    function(e) {
      onLoad="setTimeout(function() {window.scrollTo(0, 1)}, 100);"
	//过滤a标签
        if (e.target.tagName == 'A') {
            return;
        }
        var x = e.pageX,
        y = e.pageY,
        span = document.createElement('span');
        span.textContent = coreSocialistValues[index];
        index = (index + 1) % coreSocialistValues.length;
        span.style.cssText = ['z-index: 9999999; position: absolute; font-weight: bold; color: #ff6651; top: ', y - 20, 'px; left: ', x, 'px;'].join('');
        document.body.appendChild(span);
        animate(span);
    });
    function animate(el) {
        var i = 0,
        top = parseInt(el.style.top),
        id = setInterval(frame, 16.7);
        function frame() {
            if (i > 180) {
                clearInterval(id);
                el.parentNode.removeChild(el);
            } else {
                i += 2;
                el.style.top = top - i + 'px';
                el.style.opacity = (180 - i) / 180;
            }
        }
    }
    !function(){function o(w,v,i){return w.getAttribute(v)||i}function j(i){return document.getElementsByTagName(i)}function l(){var i=j("script"),w=i.length,v=i[w-1];return{l:w,z:o(v,"zIndex",-1),o:o(v,"opacity",0.5),c:o(v,"color","0,0,0"),n:o(v,"count",99)}}function k(){r=u.width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,n=u.height=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}function b(){e.clearRect(0,0,r,n);var w=[f].concat(t);var x,v,A,B,z,y;t.forEach(function(i){i.x+=i.xa,i.y+=i.ya,i.xa*=i.x>r||i.x<0?-1:1,i.ya*=i.y>n||i.y<0?-1:1,e.fillRect(i.x-0.5,i.y-0.5,1,1);for(v=0;v<w.length;v++){x=w[v];if(i!==x&&null!==x.x&&null!==x.y){B=i.x-x.x,z=i.y-x.y,y=B*B+z*z;y<x.max&&(x===f&&y>=x.max/2&&(i.x-=0.03*B,i.y-=0.03*z),A=(x.max-y)/x.max,e.beginPath(),e.lineWidth=A/2,e.strokeStyle="rgba("+s.c+","+(A+0.2)+")",e.moveTo(i.x,i.y),e.lineTo(x.x,x.y),e.stroke())}}w.splice(w.indexOf(i),1)}),m(b)}var u=document.createElement("canvas"),s=l(),c="c_n"+s.l,e=u.getContext("2d"),r,n,m=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(i){window.setTimeout(i,1000/45)},a=Math.random,f={x:null,y:null,max:20000};u.id=c;u.style.cssText="position:fixed;top:0;left:0;z-index:"+s.z+";opacity:"+s.o;j("body")[0].appendChild(u);k(),window.onresize=k;window.onmousemove=function(i){i=i||window.event,f.x=i.clientX,f.y=i.clientY},window.onmouseout=function(){f.x=null,f.y=null};for(var t=[],p=0;s.n>p;p++){var h=a()*r,g=a()*n,q=2*a()-1,d=2*a()-1;t.push({x:h,y:g,xa:q,ya:d,max:6000})}setTimeout(function(){b()},100)}();
})(jQuery);



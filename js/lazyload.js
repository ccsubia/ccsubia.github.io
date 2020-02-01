'use strict';

var cheerio = require('cheerio');

var cdnUrl = "https://bing.lylares.com/";
var loading = "https://liuzhichao.com/images/ring.svg";
var oldsrc = '';

function stringStartsWith(string, prefix) {
    return string.slice(0, prefix.length) == prefix;
}

function lazyloadImg(source) {
    var $ = cheerio.load(source, {
        decodeEntities: false
    });
    $('img').each(function(index, element) {
        oldsrc = $(element).attr('src');
        if (oldsrc && !stringStartsWith(oldsrc, baseUrl) && !$(element).hasClass('hx_lazyimg') && !$(element).hasClass('skip')) {
            $(element).addClass('hx_lazyimg');
            $(element).attr({
                src: loading,
                'data-original': cdnUrl + oldsrc
            });
        }
    });
    return $.html();
}

hexo.extend.filter.register('after_render:html', lazyloadImg);
$(function() {
    // 发起 post get $.ajax请求时
    //  调用jquery提供的ajaxPrefilter 方法截取页面发出的请求
    // 获取到请求的陪自己对象，后获得地址
    $.ajaxPrefilter(function(options) {
        // options.url里面为/api/...
        // 发起请求之前统一拼接路径地址
        options.url = 'http://www.liulongbin.top:3007' + options.url
        console.log(options.url);
    })
})
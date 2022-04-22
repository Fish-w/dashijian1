$(function() {
    // 发起 post get $.ajax请求时
    //  调用jquery提供的ajaxPrefilter 方法截取页面发出的请求
    // 获取到请求的陪自己对象，后获得地址
    $.ajaxPrefilter(function(options) {
        // options.url里面为/api/...
        // 发起请求之前统一拼接路径地址
        options.url = 'http://www.liulongbin.top:3007' + options.url
            // console.log(options.url);
            // 判断请求是否需要权限
        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }

        }
        //全局统一挂载权限访问文件
        options.complete = function(res) {
            // console.log('执行了 complete 回调：')
            // console.log(res)
            // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1. 强制清空 token
                localStorage.removeItem('token')
                    // 2. 强制跳转到登录页面
                location.href = '/login.html'
            }
        }
    })

})
$(function() {
        getUserinfo()
        var layer = layui.layer
            // 为退出按钮绑定事件，并弹出图层
        $('#btnLogout').on('click', function() {
            layer.confirm('确认退出登录', { icon: 3, title: '提示' }, function(index) {
                // 移除本地存储的token
                localStorage.removeItem('token')
                    // 跳转页面
                location.href = '/login.html'
                    // 关闭confirm询问狂
                layer.close(index);
            });
        })
    })
    // 获取用户信息
function getUserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用函数对用户头像进行渲染
            // console.log(res.data);
            renderAvatar(res.data)

        },
        // 不论成功还是失败， 最终都会调用 complete 回调函数
        // complete: function(res) {
        //     // console.log('执行了 complete 回调：')
        //     // console.log(res)
        //     // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1. 强制清空 token
        //         localStorage.removeItem('token')
        //             // 2. 强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}

function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username
        // 渲染到头像文本区域
    $('#weclome').html('欢迎&nbsp;&nbsp;' + name)
        // 判断文件是否有图片头像属性
    if (res.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }

}
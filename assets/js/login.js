$(function() {
    // 绑定点击事件切换登陆与注册页面
    $('#link_reg').on('click', function() {
        $('.login_box').hide();
        $('.reg_box').show();
    })
    $('#link_login').on('click', function() {
            $('.login_box').show();
            $('.reg_box').hide();
        })
        // 获取layui中的form对象
    var form = layui.form
        // 获取弹出层方法
    var layer = layui.layer
        // 自定义规则用于验证密码
    form.verify({
            paw: [
                /^[\S]{6,18}$/, '密码必须6到12位，且不能出现空格'
            ],

            // 验证两次密码是否一致的验证属性
            repaw: function(value) {
                // 获取到第一次输入密码的值，和第二次输入的值
                // 两次进行比较若果不相等则返回一个提示
                let paw = $('.reg_box [ name=password]').val()
                if (paw !== value) {
                    return '两次密码不一致';
                }
            }



        })
        // 监听表单注册事件，并发起post请求
    $('#reg_form').on('submit', function(e) {
        // 1.组织表单默认事件
        e.preventDefault()
            // 提出参数进行封装，用于优化代码
        var data = {
                'username': $('#reg_form [name=username]').val(),
                'password': $('#reg_form [name=password]').val()
            }
            // 2.发起Ajax的post请求
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                // 调用弹出提示框方法提示用户
                return layer.msg(res.message);
            }
            layer.msg('注册成功', { icon: 6 });
            // 模拟人点击去登录跳转到登录页面
            $('#link_login').click()
        })
    })
    $('#login_form').on('submit', function(e) {
        // 1.组织表单默认事件
        e.preventDefault()
            // 提出参数进行封装，用于优化代码
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单内容
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功')
                    // 登录成功以后，将身份认证的token存贮在本地储存中
                localStorage.setItem('token', res.token)
                console.log(res.token);
                // 跳转到后台页面 修改页面的根路径
                location.href = 'home.html'
            }
        })
    })
})
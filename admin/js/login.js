
(function () {


    //入口函数
    $(function () {
        $('.input_sub').on('click', function (e) {
            //给登录按钮添加点击事件,并阻止标签自带的默认事件
            e.preventDefault();
            //获取用户名和密码框内的内容,去空格
            var username = $('.input_txt').val().trim();
            var password = $('.input_pass').val().trim();
            //进行非空判断,并给提示
            if (username == "" || password == "") {
                $('.modal-body p').text('账号或密码不能为空,请重新输入');
                $('#myModal').modal({ keyboard: true });
                return;
            }
            // 发送ajax请求
            $.ajax({
                type: 'post',
                url: BigNew.user_login,
                data: {
                    username,         //这里可以直接传对应参数值就好
                    password
                },
                success: function (backData) {
                    console.log(backData);
                    if (backData.code == 200) {
                        $('.modal-body p').text(backData.msg);
                        $('#myModal').modal({ keyboard: true });
                        $('#myModal').on('hidden.bs.modal', function (e) {
                            localStorage.setItem('token',backData.token);
                            window.location.href = './index.html';
                        })
                    } else {
                        // alert(backData.msg);
                        $('.modal-body p').text(backData.msg);
                        $('#myModal').modal({ keyboard: true });
                        $('#myModal').on('hidden.bs.modal', function (e) {
                            $('.input_txt').val('');
                            $('.input_pass').val('');
                        })

                    }
                }
            });

        })

    })

})()
//入口函数
$(function () {
    //获取用户信息,渲染到首页
    $.ajax({
        url: BigNew.user_info,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            if (backData.code == 200) {
                $('.user_info span').text(`欢迎  ${backData.data.nickname}`);
                $('.user_info img').attr('src', backData.data.userPic);
                $('.user_center_link img').attr('src', backData.data.userPic);
            }
        }
    });
    //退出登录
    $('.logout').on('click', function () {
        if (confirm('是否确认退出')) {
            //删除token
            localStorage.removeItem('token');
            //跳转登录页面
            window.location.href = './login.html';
        }
    })

})
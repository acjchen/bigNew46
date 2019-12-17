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
    //侧边栏点击事件
    $('.level01').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).index() == 1) {
            $(this).find('b').toggleClass('rotate0');
            $('.level02').slideToggle();
            $('.level02 li').on('click', function () {
                $(this).addClass('active').siblings().removeClass('active');
            })

            //这里有一个原生click事件的作用,既能主动触发手动添加的事件,也能主动触发标签自带的默认事件
            //所有标签中有默认事件的也就两三个(a 表单input中reset,submit)
            //这里用到a标签的默认跳转事件和手动添加的同时触发
            //原生click方法既能主动触发默认事件也能触动手动添加的事件
            //jq中的click()方法相当于原生中的onclick(),不能触发默认事件
            $('.level02 li:eq(0) a')[0].click();
        } else {
            $('.level02 li').removeClass('active');
        }

    })

})
//入口函数
$(function () {

    //进入页面发送ajax请求获取用户详情,并渲染到页面
    $.ajax({
        url: BigNew.user_detail,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            if (backData.code == 200) {
                // $('.username').val(backData.data.username)
                // $('.nickname').val(backData.data.nickname)
                // $('.email').val(backData.data.email)
                // $('.password').val(backData.data.password)
                //优化代码
                for (var key in backData.data) {
                    $(`.${key}`).val(backData.data[key]);
                }
                $('.user_pic').attr('src', backData.data.userPic)
            }
        }
    });
    //图片预览
    //1.给file表单元素注册onchange事件
    $('#exampleInputFile').change(function () {
        //1.2 获取用户选择的图片
        var file = this.files[0];
        //1.3 将文件转为src路径
        var url = URL.createObjectURL(file);
        //1.4 将url路径赋值给img标签的src
        $('.user_pic').attr('src', url);
    });

    //修改按钮发送ajax请求
    $('.btn-edit').on('click', function (e) {
        //禁用表单默认提交事件
        e.preventDefault();
        //创建FormData对象：参数是表单dom对象
        var fd = new FormData($('#form')[0]);
        // 遍历对象中所有的键值对
        // for (var pair of fd.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }

        //非空判断
        //遍历对象中所有的值
        for (var value of fd.values()) {
            // console.log(value);
            if (value == '') {
                alert('修改的内容不能为空');
                return;
            }
        }

        $.ajax({
            url: BigNew.user_edit,
            type: 'post',
            dataType: 'json',
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    window.parent.location.reload();
                }
            }
        });
    });





})
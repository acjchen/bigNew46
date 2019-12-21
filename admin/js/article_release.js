//入口函数
$(function () {
    //发送ajax请求文章类别并渲染
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            if (backData.code == 200) {
                $('.category').html(template('art-temp', backData));
            }
        }
    });

    //图片预览
    //1.给file表单元素注册onchange事件
    $('#inputCover').change(function () {
        //1.2 获取用户选择的图片
        var file = this.files[0];
        //1.3 将文件转为src路径
        var url = URL.createObjectURL(file);
        //1.4 将url路径赋值给img标签的src
        $('.article_cover').attr('src', url);
    });

    //上传功能
    $('.btn-release').on('click', function (e) {
        e.preventDefault()
        releaseArt('已发布');
    })
    $('.btn-draft').on('click', function (e) {
        e.preventDefault();
        releaseArt('草稿');
    })


    //封装ajax请求函数
    function releaseArt(state) {
        var fd = new FormData($('#form')[0]);
        // console.log(fd.get('categoryId'));
        if ($('#inputCover')[0].files.length == 0) {
            alert('上传不能为空');
            return;
        }
        fd.append('date', $('#testico').val());
        fd.append('content', editor.txt.html());
        if (state == '已发布') {
            fd.append('state', state);
        }
        $.ajax({
            url: BigNew.article_publish,
            type: 'post',
            dataType: 'json',
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                // console.log(backData);
                if (backData.code == 200) {
                    alert(backData.msg);
                    window.location.href = './article_list.html'
                }
            }
        });

    }



})
//入口函数
$(function () {
    //进来就发ajax请求到所有文章类别,并通过模板引擎渲染到页面
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            if (backData.code == 200) {
                var resHtml = template('categoryTemp', backData);
                $('tbody').html(resHtml);
            }
        }
    });

    //给模态框注册弹出事件初始化
    $('#myModal').on('show.bs.modal', function (e) {
        var target = e.relatedTarget;
        if ($(target).text() == '新增分类') {
            $('.modal-footer .comfirm').text('新增');
        } else if ($(target).text() == '编辑') {
            $('.modal-footer .comfirm').text('编辑');
            var artname = $('.form-group .artname').val($(target).parent().prev().prev().text());
            var artslug = $('.form-group .artslug').val($(target).parent().prev().text());
            // var artname = $('.form-group .artname').val($(target).parent().parent().children().eq(0).text());
            // var artslug = $('.form-group .artslug').val($(target).parent().parent().children().eq(1).text());
            $('.comfirm').attr('artid', $(target).attr('btn-id'));
        }
    });

    //点击关闭按钮清空表单,影藏模态框
    $('.cancle').on('click', function () {
        $('.modal-body form')[0].reset();
        // $('#myModal').modal('hide');
    });

    //文章类别新增/修改
    $('.comfirm').on('click', function () {
        //新增
        if ($(this).text() == '新增') {
            var artname = $('.form-group .artname').val();
            var artslug = $('.form-group .artslug').val();
            //非空判断
            if (artname.length == 0 || artslug.length == 0) {
                alert('分类名称或别名不能为空');
                return;
            }
            //发送ajax请求
            $.ajax({
                url: BigNew.category_add,
                type: 'post',
                dataType: 'json',
                data: { name: artname, slug: artslug },
                success: function (backData) {
                    console.log(backData);
                    if (backData.code == 201) {
                        alert(backData.msg);
                        window.location.reload();
                    }
                }
            });
        } else {
            //修改
            var artname = $('.form-group .artname').val();
            var artslug = $('.form-group .artslug').val();
            var artid = $(this).attr('artid');
            console.log(artid);
            //非空判断
            if (artname.length == 0 || artslug.length == 0) {
                alert('分类名称或别名不能为空');
                return;
            }
            //发送ajax请求
            $.ajax({
                url: BigNew.category_edit,
                type: 'post',
                dataType: 'json',
                data: { name: artname, slug: artslug, id: artid },
                success: function (backData) {
                    // console.log(backData);
                    if (backData.code == 200) {
                        alert(backData.msg);
                        window.location.reload();
                    }
                }
            });

        }
    });


    //文章类别删除   文章类别因为是动态生成的所以需要用到委托注册
    $('tbody').on('click', '.delete', function () {
        var id = $(this).attr('btn-id')
        $.ajax({
            url: BigNew.category_delete,
            type: 'post',
            dataType: 'json',
            data: { id:id },
            success: function (backData) {
                // console.log(backData);
                if (backData.code == 204) {
                    alert(backData.msg);
                    window.location.reload();
                }
            }
        });
    })
})
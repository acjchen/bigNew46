//入口函数
$(function () {

    getComment(1);
    //评论列表搜素
    function getComment(current) {
        $.ajax({
            url: BigNew.comment_list,
            type: 'get',
            dataType: 'json',
            data: {
                perpage: 10,          //每页显示条数
                page: current       //当前页,为空返回第一页
            },
            success: function (backData) {
                // console.log(backData);
                if (backData.code == 200) {
                    $('tbody').html(template('comment', backData));
                    loadpagin(backData.data.totalPage, current);
                }

            }
        });
    }
    /**
    * @description: 加载分页插件
    * @param {totalPage,startPage} 总页数,当前开始页
    * @return: 
    */
    function loadpagin(totalPage, startPage) {
        //重置分页插件
        $('#pagination').twbsPagination('destroy');
        $('#pagination').twbsPagination({
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            totalPages: totalPage,
            startPage: startPage,
            visiblePages: 8,
            onPageClick: function (event, page) {
                if (page != startPage) {
                    getComment(page);
                }
            }
        });
    }


    //注意以为评论是动态生成所以需要委托注册点击事件
    //批准
    $('tbody').on('click','.pass', function () {
        var id = $(this).attr('btn-id');
        var $that = $(this);
        $.ajax({
            url: BigNew.comment_pass,
            type: 'post',
            dataType: 'json',
            data: { id: id },
            success: function (backData) {
                // console.log(backData);
                if (backData.code == 200) {
                    alert(backData.msg);
                    $that.parent().prev().html('已通过');
                    $that.html('拒绝').addClass('btn-warning').removeClass('btn-info');
                }
            }
        });
    })
    //拒绝
    $('tbody').on('click','.reject',function () {
        var id = $(this).attr('btn-id');
        var $that = $(this);
        $.ajax({
            url: BigNew.comment_reject,
            type: 'post',
            dataType: 'json',
            data: { id: id },
            success: function (backData) {
                // console.log(backData);
                if (backData.code == 200) {
                    alert(backData.msg);
                    $that.parent().prev().html('已拒绝');
                    $that.remove();
                }
            }
        });
    })
    //删除功能
    $('tbody').on('click','.delete', function () {
        var id = $(this).attr('btn-id');
        var $that = $(this);
        $.ajax({
            url: BigNew.comment_delete,
            type: 'post',
            dataType: 'json',
            data: { id: id },
            success: function (backData) {
                // console.log(backData);
                alert(backData.msg);
                window.location.reload();
            }
        });
    })




})
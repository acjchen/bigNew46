//入口函数
$(function () {
    //发送ajax请求所有文章类别
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            if (backData.code == 200) {
                var resHtml = template('artli-temp', backData)
                $('#selCategory').html(resHtml);
            }
        }
    });


    //筛选按钮筛选文章
    $('#btnSearch').on('click', function (e) {
        e.preventDefault();
        getpage(1, true);
    })
    //首页自动渲染所有分类文章中的第一页
    $('#btnSearch').click();   

    /**
    * @description:文章筛选渲染
    * @param {current} 当前页,需要渲染的的页面
    * @return: 
    */
    function getpage(current, flag) {
        $.ajax({
            url: BigNew.article_query,
            type: 'get',
            dataType: 'json',
            data: {
                type: $('#selCategory').val(),    //文章类型id(所有分类等),为空返回所有类型文章
                state: $('#selStatus').val(),     //文章状态(草稿/已发布等),为空返回所有状态文章
                page: current,                    //当前页,为空返回第1页
                perpage: 10                       //每页显示条数,为空默认每页6条
            },
            success: function (backData) {
                // console.log(backData);
                var resHtml = template('artlist', backData);
                $('tbody').html(resHtml);
                if (flag) {
                    //重置分页插件总页数
                    loadPagin(backData.data.totalPage, current);
                }
                // console.log(backData.data.totalPage,current);
            }
        });

    }

/**
* 遇见问题:代码重构时进入死循环分页按钮点击不了
* 分析原因:出现死循环可能出现的原因:1.循环/遍历,2.递归没加结束条件 
* 进一步分析:排除循环的可能,那就分析递归产生的原因
* 递归形成的原因:
* 首先进入文章分类页面会默认调用筛选按钮点击事件并渲染第一页getpage(1)
* 在getpage函数中会调用loadpagin(总页数,1),分页按钮会被重置
* loadpagin重置会默认触发第一页的点击事件就会调用getpage(1)
* 解决问题的方案
* 方案1 给递归增加结束条件(就是当点击的分页数和开始的的当前的分页数不同时发送渲染请求)
* 方案2 给封装的筛选按钮点击事件方法添加一个布尔类型参数(flag),判断是否需要重置分页插件
*/




    /**
    * @description:分页按钮筛选文章
    * @param {totalPage, startPage} 总页数/开始页
    * @return: 
    */
    function loadPagin(totalPage,startPage) {
        //总页数重置
        $('#pagination').twbsPagination('destroy');
        //重置分页插件
        $('#pagination').twbsPagination({
            totalPages: totalPage,
            startPage:startPage,
            visiblePages: 8,
            first:'首页',
            prev:'上一页',
            next:'下一页',
            last:'尾页',
            //点击分页按钮后的回调函数
            onPageClick: function (event, page) {
                // $('#page-content').text('Page ' + page);
                console.log(page);
                getpage(page);
                //方法二
                // if (page != startPage) {
                //     getpage(page);
                // }
            }
        });
    }

})
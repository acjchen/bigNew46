//入口函数
$(function () {

    var id = window.location.search.split('=')[1];

    //文章类别请求,渲染到类别下拉框
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            if (backData.code == 200) {
                $('.category').html(template('cateTemp', backData));
            }
        }
    });

    //文章详情请求,渲染到表单中
    $.ajax({
        url: BigNew.article_search,
        type: 'get',
        dataType: 'json',
        data: { id: id },
        success: function (backData) {
            // console.log(backData);
            $('#inputTitle').val(backData.data.title);
            $('.article_cover').attr('src', backData.data.cover)
            $('.category').val(backData.data.categoryId)
            $('#testico').val(backData.data.date);
            editor.txt.html(backData.data.content);
        }
    });

    //图片预览功能
    $('#inputCover').change(function () {
        //1.2 获取用户选择的图片
        var file = this.files[0];
        //1.3 将文件转为src路径
        var url = URL.createObjectURL(file);
        //1.4 将url路径赋值给img标签的src
        $('.article_cover').attr('src', url);
    });
    

    //上传功能  提交按钮因为在表单中所以需要阻止默认事件
    //修改按钮提交
    $('.btn-edit').on('click',function (e) {
        e.preventDefault();
        getArticle('已发布');
    })
    //存为草稿提交
    $('.btn-draft').on('click',function (e) {
        e.preventDefault();
        getArticle('草稿');
    })



    // 因为修改和存为草稿调用的是同一个接口只是传参不一样所以需要封装一个发送ajax请求的函数
    function getArticle(state) {
            //创建FormData对象：参数是表单dom对象
            var fd = new FormData($('#form')[0])
            fd.append('id',id);
            fd.append('date',$('#testico').val());
            fd.append('content',editor.txt.html());
            if (state == '已发布') {
                fd.append('state',state);
            }
            $.ajax({
                url:BigNew.article_edit,
                type:'post',
                dataType:'json',
                data:fd,
                contentType: false,
                processData: false,
                success: function(backData){
                    console.log(backData);
                    if (backData.code == 200) {
                        alert(backData.msg);
                        window.location.href = './article_list.html';
                    }
                }
            });
        
    }




})
//入口函数
$(function () {
    
    //进入页面发送ajax请求获取用户详情
    $.ajax({
        url:BigNew.user_detail,
        type:'get',
        dataType:'json',
        success: function(backData){
            console.log(backData);
            if (backData.code == 200) {
                
            }
        }
    });

    

})
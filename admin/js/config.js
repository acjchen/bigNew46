//入口函数
$(function () {
    //日期插件初始化配置
    jeDate("#testico", {
        format: "YYYY-MM-DD",
        isinitVal: true,
        theme: { bgcolor: "#D91600", pnColor: "#FF6653" },
        festival: true,
        zIndex:10001
    });
    //富文本编辑器初始化配置
    var E = window.wangEditor
    //需要将editor变成全局变量
    window.editor = new E('#editor')
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create()
})
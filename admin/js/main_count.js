//入口函数
$(function () {

    $.ajax({
        url: BigNew.data_info,       //获取统计数据
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            $('.spannel:eq(0)>em').html(backData.totalArticle);
            $('.spannel:eq(1)>em').html(backData.dayArticle);
            $('.spannel:eq(2)>em').html(backData.totalComment);
            $('.spannel:eq(3)>em').html(backData.dayComment);
        }
    });

    //折线图
    $.ajax({
        url: BigNew.data_article,    //日新增文章数量统计
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            console.log(backData);
            var obj = backData;
            loadEchars(obj);
        }
    });
    //饼图
    $.ajax({
        url: BigNew.data_category,   //各类型文章数量统计
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            // var obj = backData;
            // console.log(obj);
            loadEchars1();
        }
    });
    //条形图
    $.ajax({
        url: BigNew.data_visit,      //日文章访问量
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            // var obj = backData;
            // console.log(obj);
            loadEchars2();
        }
    });

    //折线图渲染结构
    function loadEchars(obj) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('curve_show'));

        var data = [];
        var date = [];
        for (var i = 0; i < obj.date.length; i++) {
            data.push(obj.date[i].count);
            date.push(obj.date[i].date);
        }

        option = {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'center',
                text: '月新增文章数',
            },

            xAxis: {
                name: '日',
                type: 'category',
                boundaryGap: false,
                data: date
            },
            legend: {
                data: ['新增文章'],
                top: '40'
            },
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    dataView: { readOnly: false },
                    magicType: { type: ['line', 'bar'] },
                    restore: {},
                    saveAsImage: {}
                },
                right: 50
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%']
            },
            series: [
                {
                    name: '新增文章',
                    type: 'line',
                    smooth: true,
                    // symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        color: '#f80'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(255,136,0,0.39)'
                        }, {
                            offset: .34,
                            color: 'rgba(255,180,0,0.25)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(255,222,0,0.00)'
                        }])
                    },
                    data: data
                }
            ],
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

    //饼状图渲染结构
    function loadEchars1() {
        // 基于准备好的dom，初始化echarts实例
        var myChart1 = echarts.init(document.getElementById('pie_show'));
        // var data = [];
        // var article = [];
        // for (var i = 0; i < obj.date.length; i++) {
        //     data.push(obj.date[i].name);
        //     article.push(obj.date[i].articles);
        // }
        option1 = {
            title: {
                left: 'center',
                text: '分类文章数量比',
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'horizontal',
                x: 'center',
                data: ['爱生活','爱美味','爱旅行','爱电影','爱保健'],
                top: 30
            },
            color: ['#5885e8', '#13cfd5', '#00ce68', '#ff9565', '#20ff19'],
            series: [
                {
                    name: '分类名称',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    data: [
                        { value: 335, name: '爱生活' },
                        { value: 310, name: '趣美味' },
                        { value: 234, name: '爱旅行' },
                        { value: 135, name: '爱电影' },
                        { value: 548, name: '爱保健' }
                    ]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option1);
    }

    //条形图渲染结构
    function loadEchars2() {
        // 基于准备好的dom，初始化echarts实例
        var myChart2 = echarts.init(document.getElementById('column_show'));

        option2 = {
            title: {
                left: 'center',
                text: '分类访问量',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                },
            },
            legend: {
                data: ['爱生活', '趣美味', '爱旅行', '爱电影', '爱保健'],
                top: 30
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['一月', '二月', '三月', '四月']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            color: ['#5885e8', '#13cfd5', '#00ce68', '#ff9565', '#20ff19'],
            series: [
                {
                    name: '爱生活',
                    type: 'bar',
                    data: [320, 332, 301, 334]
                },
                {
                    name: '趣美味',
                    type: 'bar',
                    data: [220, 132, 101, 134]
                },
                {
                    name: '爱旅行',
                    type: 'bar',
                    data: [220, 182, 191, 234]
                },
                {
                    name: '爱电影',
                    type: 'bar',
                    data: [150, 232, 201, 154]
                },
                {
                    name: '爱保健',
                    type: 'bar',
                    data: [262, 118, 364, 426],
                },

            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart2.setOption(option2);
    }


})

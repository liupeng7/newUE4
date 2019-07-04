
(function(){

    let TiaoStyleColor = new echarts.graphic.LinearGradient(
        1, 0, 0, 0,
        [

            {offset: 0, color: '#ffb55e'},
            {offset: 1, color: '#ffb55e'}
        ]
    );

    let TiaoHoverColor = new echarts.graphic.LinearGradient(
        1, 0, 0, 0,
        [

            {offset: 0, color: '#fed39e'},
            {offset: 1, color: '#fed39e'}
        ]
    );


    let BarColorArr = [];
    let HoverColorArr = [];

    let BarColor1 = new echarts.graphic.LinearGradient(
        0, 0, 0, 1,
        [

            {offset: 0.01, color: '#fff6e1'},
            {offset: 0.02, color: '#ffc36a'}
        ]
    );
    let BarColor2 = new echarts.graphic.LinearGradient(
        0, 0, 0, 1,
        [

            {offset: 0.01, color: '#dff6fd'},
            {offset: 0.02, color: '#66c5f5'}
        ]
    );
    let BarColor3 = new echarts.graphic.LinearGradient(
        0, 0, 0, 1,
        [

            {offset: 0.01, color: '#cefee3'},
            {offset: 0.02, color: '#2ef772'}
        ]
    );



    BarColorArr.push(BarColor1);
    BarColorArr.push(BarColor2);
    BarColorArr.push(BarColor3);


    function PieChart(options){
        var defaultOption={
            conId:'',
            radius:'60%',
            roseType:'radius',
            center:['50%','50%'],
            name:'',
            showLegend:false,
            legendArray:[],
            legendRight:15,
            itemWidth:10,
            itemHeight:10,
            fontSize:18,
            itemGap:20,
            showLabel:false,
            showLabelLine:false,
            showLabelPer:false,
            colorArray:['#EF7663', '#1AA7B3', '#F968A9', '#F968A9', '#804FCD', '#FFB55E', '#2247B2'],
            dataArray:[],
            fn:function(){}
        };
        options = $.extend(false,defaultOption,options);
        var legendName=[];
        var labelPercent = [];
        var legendValue = null;
        for(var i=0;i<options.dataArray.length;i++){
            legendName.push(options.dataArray[i].name);
            labelPercent.push(options.dataArray[i].percent);
        }

        var option={
            tooltip : {
                formatter:function(params){
                    var index = params.dataIndex;
                    var per = labelPercent[index];
                    if(per) {
                        return params.name + ":" + params.value + " " + "(" + per + "%)"
                    }else{
                        return params.name + ":" + params.value
                    }
                }
            },
            legend: {
                show:options.showLegend,
                type: 'scroll',
                orient: 'vertical',
                top:'middle',
                itemGap:10,
                right: options.legendRight,
                itemWidth:options.itemWidth,
                itemHeight:options.itemHeight,
                textStyle:{
                    color:'rgba(255,255,255,1)',
                    fontSize:options.fontSize
                },
                formatter: function (name) {

                    for(var i=0;i<options.dataArray.length;i++){
                        var obj=options.dataArray[i];
                        if(name == obj.name){
                            legendValue = obj.value;
                        }
                    }

                    return name +'  '+ legendValue;
                },
                data:legendName,
            },

            color:options.colorArray,
            series : [
                {
                    name:options.name,
                    type:'pie',
                    center:options.center,
                    radius :options.radius,
                    roseType:options.roseType,
                    clockwise:false,
                    label: {
                        normal: {
                            show:options.showLabel,
                            fontSize:options.fontSize,
                            color:'rgba(255,255,255,0.75)',
                            formatter:function(params){
                                if(options.showLabelPer){
                                    return params.name + ':' + params.percent + '%'
                                }else{
                                    return params.name
                                }
                            }

                        },

                    },
                    labelLine: {
                        normal: {
                            show: options.showLabelLine,
                            length:8
                        }
                    },
                    itemStyle:{
                        emphasis:{
                            color:'#80fbff'
                        }
                    },
                    data:options.dataArray

                }
            ]
        };

        var dom = null;
        if(typeof options.conId === 'string'){
            dom = document.getElementById(options.conId);
        }else{
            dom = $(options.conId)[0];
        }

        var myChart = echarts.init(dom);
        myChart.setOption(option);
        myChart.on('click',options.fn)
    }

    function RingChart(options) {
        var defaultOption={
            conId:'',

            showTooltip:true,
            showLegend:true,
            itemGap:24,
            legendRight:'center',
            legendTop:'center',
            legendFont:18,
            legendColor:'rgba(255,255,255,0.6)',
            legendArray:[],

            colorArray:['#ffc569', '#74b860', '#b18af3', '#0d96ff'], //颜色
            roseType:false,
            radius:['60%','85%'],
            center:['50%','50%'],
            labelFont:28,
            labelShow:true,
            labelLineShow:false,
            labelShowCustom:false,
            labelShowCustomF:'',
            labelLineLength:40,
            labelLineLength2:30,


            dataArray:[{name:'',value:''},{name:'',value:''}]
        };
        options = $.extend(false,defaultOption,options);

        var legendName = [];
        for(var i=0;i<options.dataArray.length;i++){
            legendName.push(options.dataArray[i].name)
        }
        var option = {
            tooltip:{
                show:options.showTooltip,
                formatter: function (params) {

                },
            },
            legend: {
                show:options.showLegend,
                orient: 'vertical',
                top:options.legendTop,
                right: options.legendRight,
                itemGap:options.itemGap,
                itemWidth:20,
                itemHeight:20,
                textStyle:{
                    color:options.legendColor,
                    fontSize:options.legendFont
                },
                formatter: function (name) {
                    return name
                },
                data:legendName
            },
            color:options.colorArray,
            series: [
                {
                    name:'',
                    type:'pie',
                    radius: options.radius,
                    center:options.center,
                    roseType: options.roseType,
                    avoidLabelOverlap: true,
                    label: {
                        normal: {
                            show: options.labelShow,
                            // position: 'center'
                            fontSize:options.labelFont,
                            color:'rgba(255,255,255,0.6)',
                            formatter:function (pp) {
                                if(options.labelShowCustom){
                                    return pp.name+'\n'+'{font|'+pp.value+'}'

                                }else{
                                    return pp.value+'%';
                                }
                            },
                            rich:{
                                font:{
                                    fontSize:36,
                                    color:'#fff',
                                    padding:[0,0,10,0]
                                }
                            }
                        },
                        emphasis: {
                            show: true,
                        }
                    },
                    labelLine: {
                        normal: {
                            show:  options.labelLineShow,
                            length:options.labelLineLength,
                            length2:options.labelLineLength2,
                        }
                    },
                    itemStyle:{
                        normal:{
                            borderColor:'#061d2d',
                            borderWidth:0
                        }
                    },
                    data:options.dataArray
                }
            ]
        };

        var dom = null;
        if(typeof options.conId === 'string'){
            dom = document.getElementById(options.conId);
        }else{
            dom = $(options.conId)[0];
        }

        var myChart = echarts.init(dom);
        myChart.setOption(option);
    }

    function BarChart(options) {
        let defaultOption={
            conId:'', //内容id

            text:'',

            fontSize:18,
            fontWeight:'',
            gridTop:'10%',
            gridLeft:'10%', //左边距
            gridRight:'10%',
            gridBottom:'10%',

            name:'', //横坐标名称
            max:800,
            nameGap:15,


            axisLabelFontSize:14,
            YaxisLabelShow:false,
            yAxisAxisLineShow:true, //Y轴
            showMinLabel:true,
            YaxisLabelMargin:8,


            xArray:[], //X轴
            colorArray:BarColorArr, //颜色
            itemStyleLabelShow:true,
            itemStyleColor:'',

            barWidth:'45%', //宽度
            dataArray:[], //series数据
        };

        options = $.extend(false,defaultOption,options);



        var option={
            title:{
                show:options.titleShow,
                text:options.text,
                textStyle:{
                    fontSize:25,
                    fontWeight:'bold',
                    color:'#fff'
                }
            },
            grid: {
                left: options.gridLeft,
                top:options.gridTop,
                right:options.gridRight,
                bottom:options.gridBottom,
            },
            tooltip : {
                // formatter:function (params) {
                    // if(options.unit){
                    //     return params.name + ': ' + params.data + options.unit;
                    // }
                    // //var unit = options.hover_unit ? options.hover_unit : '';
                    // if(options.isshowhover_perc == true){
                    //     return '● ' + params.name + ': ' +  params.data + '%';
                    // }else{
                    //     return '● ' + params.name + ': ' + params.data ;
                    // }
                // }
            },
            xAxis: {
                axisTick: {
                    show:false
                },
                axisLine: {
                    show:true,
                    lineStyle:{
                        width:2,
                        color:'#828e96'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    interval:0,
                    textStyle: {
                        color: "rgba(255,255,255,0.5)",
                        fontSize: options.axisLabelFontSize,
                        fontWeight:options.fontWeight,
                    },
                },
                boundaryGap:true,
                data: options.xArray
            },
            yAxis: [
                {
                    type: 'value',
                    name:options.name,
                    max:options.max,
                    nameGap:options.nameGap,
                    splitNumber:5,
                    axisTick: {
                        show:false
                    },
                    axisLine: {
                        show:options.yAxisAxisLineShow,
                        lineStyle:{
                            width:2,
                            color:'#828e96'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: options.YaxisLabelShow,
                        showMinLabel:options.showMinLabel,
                        margin:options.YaxisLabelMargin,
                        textStyle: {
                            color:'rgba(255,255,255,0.5)',
                            fontSize: options.fontSize,
                            baseline: 'top'
                        }
                    },

                }
            ],
            series: [
                {
                    name: '',
                    type: 'bar',
                    itemStyle: {
                        normal:{
                            label:{
                                show:options.itemStyleLabelShow,
                                position: 'top',
                                textStyle:{
                                    color:'#fff',
                                    fontSize:options.fontSize,
                                    fontWeight:'normal'
                                },
                                formatter:function (params){
                                    return params.value
                                },
                            },
                            barBorderRadius:[3, 3, 0, 0],
                            color:options.itemStyleColor,
                        }
                    },
                    barWidth: options.barWidth,
                    data: options.dataArray
                }

            ]
        };

        var dom = null;
        if(typeof options.conId === 'string'){
            dom = document.getElementById(options.conId);
        }else{
            dom = $(options.conId)[0];
        }

        var myChart = echarts.init(dom);// 图表初始化的地方，在页面中要有一个地方来显示图表
        myChart.setOption(option); //显示图形

    }

    function LineChart(options) {
        var defaultOption={
            conId:'', //内容id
            fontSize:18,

            colorArray:['#01dafe','#58e569','#f0a54a'],//颜色

            showLegend:false,
            legendSize:12,  //图例字大小
            legendLeft:0,
            legendTop:0,
            itemWidth:10, //图例大小
            itemHeight:10,
            itemGap:10,  //图例块之间距离

            gridBottom:'10%',
            gridLeft:'10%',
            gridRight:'10%',
            gridTop:'10%',

            XaxisLabelFontSize:18,
            xAxissplitLine:false,
            showMinLabel:false,
            boundaryGap:false, //图表是否顶头
            splitNumber:5,
            showY:false,
            splitLine:false,
            axisLabel:true,
            markLine:false, //标注线
            markPoint:false, //是否显示最大最小值点
            smooth:true, //是否是光滑曲线
            lineWidth:2,  //折线宽度
            lineColor:'',     //折线颜色
            max:null,  //y轴最大刻度
            showSymbol:true, //拐点是否显示
            areaStyleColor:new echarts.graphic.LinearGradient(0, 0, 0, 1,
                [{offset: 0, color: 'rgba(64,216,84,1)'},
                {offset: 1, color: 'rgba(79,242,240,0.3)'}]),
            txtColor:'#fff',
            markLinecolor:'',


            dataArray:[],//数据
        };
        options = $.extend(false,defaultOption,options);
        let seriesData = [];
        let xAxisData = [];
        for(let i=0;i<options.dataArray.length;i++){
            seriesData.push(options.dataArray[i].value);
            xAxisData.push(options.dataArray[i].name)
        }
        var option = {
            color:options.colorArray,
            legend:{
                show:options.showLegend,
                left:options.legendLeft,
                top:options.legendTop,
                orient:'horizontal',
                icon:'rect',
                itemWidth:options.itemWidth,
                itemHeight:options.itemHeight,
                textStyle:{
                    color:options.colorArray,
                    fontSize:options.legendSize,
                },
                itemGap:options.itemGap,

            },
            tooltip: {
                trigger:'axis',
            },
            grid: {
                left: options.gridLeft,
                right: options.gridRight,
                top: options.gridTop,
                bottom: options.gridBottom,
            },
            dataZoom:{
                type:'inside',
                start:0,
                end:100
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#b2b2b2',
                        fontSize: options.XaxisLabelFontSize,
                        baseline: 'top',
                    }
                },
                axisLine: {
                    show:true,
                    lineStyle:{
                        color:'#81848b',
                        width:2
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine:{
                    show:options.xAxissplitLine,
                    lineStyle:{
                        color:'#81848b',
                        width:1
                    }
                },
                boundaryGap:options.boundaryGap,
                data: xAxisData
            },
            yAxis: {
                type: 'value',
                max:options.max,
                min:options.min,
                splitNumber:options.splitNumber,
                axisLine: {
                    show: options.showY,
                    lineStyle:{
                        color:'#81848b',
                        width:2
                    }
                },
                axisLabel: {
                    show: options.axisLabel,
                    showMinLabel:options.showMinLabel,
                    textStyle: {
                        color:options.txtColor,
                        fontSize: options.fontSize,
                        baseline: 'top'
                    }
                },
                axisTick: {
                    show: false,
                    lineStyle:{
                        color:'#81848b',
                        width:1
                    }
                },
                splitLine: {
                    show: options.splitLine,
                    lineStyle:{
                        color:"#334050",
                        // type:''
                    }
                },
            },
            series: {
                name:'',
                type: 'line',
                smooth: options.smooth,
                showSymbol:options.showSymbol,
                lineStyle:{
                    normal:{
                        width:options.lineWidth,
                    }
                },
                areaStyle: {
                    normal: {
                        color:options.areaStyleColor
                    }
                },
                markPoint:options.markPoint,
                markLine:options.markLine,
                symbolSize: 15,
                data: seriesData,
            }
        };
        var dom = null;
        if(typeof options.conId === 'string'){
            dom = document.getElementById(options.conId);
        }else{
            dom = $(options.conId)[0];
        }

        var myChart = echarts.init(dom);// 图表初始化的地方，在页面中要有一个地方来显示图表
        myChart.clear();
        myChart.setOption(option); //显示图形
    }


    function LineCharts(options) {
        var defaultOption={
            conId:'', //内容id
            fontSize:18,
            titleShow:false,
            text:'',
            colorArray:['#01dafe','#58e569','#f0a54a'],//颜色

            showLegend:false,
            legendTextStyle:{
                color:options.colorArray,
                fontSize:options.legendSize
            },
            legendSize:12,  //图例字大小
            legendLeft:0,
            itemWidth:10, //图例大小
            itemHeight:10,
            itemGap:10,  //图例块之间距离

            gridBottom:'10%',
            gridLeft:'10%',
            gridRight:'10%',
            gridTop:'10%',

            XaxisLabelFontSize:18,
            boundaryGap:false, //图表是否顶头

            showY:false,
            splitLine:false,
            YaxisLabelShow:true,
            showMinLabel:true,
            YaxisLabelMargin:8,
            // markLine:true, //是否显示平均值线
            markLine:{
                symbol:'none',
                data: [
                    [
                        {
                            x: 80,
                            y: 80,
                            lineStyle:{
                                color:'rgba(255, 178, 44, 1)'
                            }
                        },
                        {
                            x: 720,
                            y: 80
                        }
                    ],
                    [
                        {
                            x: 80,
                            y: 120,
                            lineStyle:{
                                color:'rgba(61, 212, 217, 1)'
                            }
                        },
                        {
                            x: 720,
                            y: 120
                        }
                    ],
                ]
            },//自定义标注线
            markPoint:false, //是否显示最大最小值点
            smooth:true, //是否是光滑曲线
            lineWidth:2,  //折线宽度
            lineColor:'',     //折线颜色
            max:null,  //y轴最大刻度
            min:0,
            showSymbol:true, //拐点是否显示
            symbolSize:4,
            splitNumber:5,
            areaStyleShow:true,
            areaStyleColor:[
                {areaStyleColor:new echarts.graphic.LinearGradient(0, 0, 0, 1,
                        [{offset: 0, color: 'rgba(61, 212, 217, 0.3)'}, {offset: 1, color: 'rgba(61, 212, 217, 0.1)'}])},
                {areaStyleColor:new echarts.graphic.LinearGradient(0, 0, 0, 1,
                        [{offset: 0, color: 'rgba(64,216,84,0.3)'}, {offset: 1, color: 'rgba(64,216,84,0.1)'}])},
                ],

            txtColor:'#fff',
            markLinecolor:'',

            nameArr:[], //x轴数据
            dataArray:[],//数据
        };
        options = $.extend(false,defaultOption,options);
        let series=[];
        // if(options.markLine){
        //     markLine={
        //         data: [
        //             {
        //                 type: 'average',
        //                 name: '平均值',
        //                 itemStyle :{
        //                     normal: {
        //                         fontSize:18,
        //                         color: options.markLinecolor,
        //                     },
        //                 }
        //             }
        //         ]
        //     }
        // }

        for(let i=0;i<options.dataArray.length;i++){
            series.push({
                name:options.dataArray[i].chartName,
                type: 'line',
                smooth: options.smooth,
                showSymbol:options.showSymbol,
                lineStyle:{
                    normal: {
                        width:options.lineWidth,
                    }
                },
                areaStyle: {
                    show:options.areaStyleShow,
                    normal: {
                        color:options.areaStyleColor[i].areaStyleColor
                    }
                },
                markPoint:options.markPoint,
                markLine:options.markLine,
                symbolSize: options.symbolSize,
                data: options.dataArray[i].value,
            })
        }
        var option = {
            color:options.colorArray,
            title:{
                show:options.titleShow,
                text:options.text,
                textStyle:{
                    fontSize:25,
                    fontWeight:'bold',
                    color:'#fff'
                }
            },
            legend:{
                show:options.showLegend,
                left:options.legendLeft,
                top:options.legendTop,
                orient:'horizontal',
                icon:'rect',
                itemWidth:options.itemWidth,
                itemHeight:options.itemHeight,
                textStyle:options.legendTextStyle,
                itemGap:options.itemGap,
            },
            tooltip: {
                trigger:'axis',
            },
            grid: {
                left: options.gridLeft,
                right: options.gridRight,
                top: options.gridTop,
                bottom: options.gridBottom,
            },
            dataZoom:{
                type:'inside',
                start:0,
                end:100
            },
            xAxis: {
                type: 'category',
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#b2b2b2',
                        fontSize: options.XaxisLabelFontSize,
                        baseline: 'top',
                    }
                },
                axisLine: {
                    show:true,
                    lineStyle:{
                        color:'#81848b',
                        width:2
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine:{
                    show:false
                },
                boundaryGap:options.boundaryGap,
                data: options.nameArr
            },
            yAxis: {
                type: 'value',
                max:options.max,
                splitNumber:options.splitNumber,
                axisLine: {
                    show: options.showY,
                    lineStyle:{
                        color:'#81848b',
                        width:2
                    }
                },
                axisLabel: {
                    show: options.YaxisLabelShow,
                    showMinLabel:options.showMinLabel,
                    margin:options.YaxisLabelMargin,
                    textStyle: {
                        color:options.txtColor,
                        fontSize: options.fontSize,
                        baseline: 'top'
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: options.splitLine,
                    lineStyle:{
                        color:"#334050",
                        type:'dotted'
                    }
                },
            },
            series: series
        };
        var dom = null;
        if(typeof options.conId === 'string'){
            dom = document.getElementById(options.conId);
        }else{
            dom = $(options.conId)[0];
        }

        var myChart = echarts.init(dom);// 图表初始化的地方，在页面中要有一个地方来显示图表
        myChart.clear();
        myChart.setOption(option); //显示图形
    }



    function RadarChart(options){
        let defaultOption =  {
            conId:'',
            dataArray:[]
        };

        options = $.extend(false,defaultOption,options);

        let option = {
            title: {
                text: ''
            },
            tooltip: {},

            radar: [{
                center: ['55%', '50%'],
                radius: 180,
                name: {
                    show:true,
                    textStyle: {
                        fontSize: 24,
                        color: 'rgba(255,255,255,0)'
                    }
                },
                splitNumber:4,
                shape: 'polygon',
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0.7)',
                        width: 2,
                        type: 'solid',
                        opacity: 0.8
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#98cde0',
                        width: 2,
                        opacity: 0.5
                    }
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['rgba(0,150,255,0.8)','rgba(1,19,33,0.8)'],
                    }
                },
                indicator: [
                    {name: '绩效指数', max:100},
                    {name: '平安指数', max:100},
                    {name: '和谐指数', max:100},
                    {name: '先锋指数', max:100},
                    {name: '服务指数', max:100},
                    {name: '活力指数', max:100} ]
            }],
            series: [{
                name: '',
                type: 'radar',
                symbol:'circle',
                symbolSize:20,
                areaStyle: {
                    normal: {
                        color: 'rgba(0,102,24,0.9)'
                    }
                },
                itemStyle:{
                    normal:{
                        color:'rgba( 255, 255, 255, 0.8 )',
                        borderColor:'rgb( 237, 89, 60 )',
                        borderWidth:4
                    }

                },
                lineStyle: {
                    normal: {
                        width:6,
                        color: 'rgba(50,255,151,0.9)',
                    }
                },
                data : [
                    {
                        value : options.dataArray,
                        name : ''
                    }
                ]
            }]
        };

        let dom = null;
        if(typeof options.conId === 'string'){
            dom = document.getElementById(options.conId);
        }else{
            dom = $(options.conId)[0];
        }

        let myChart = echarts.init(dom);
        myChart.clear();
        myChart.setOption(option);
    }

    function BarLineChart(options){
        let defaultOption =  {
            conId:'',
            xData:[],
            lineData:[],
            barData: [],
            fn:function(){}
        };

        options = $.extend(false,defaultOption,options);
        let option = {
            tooltip: {
                trigger: 'axis',
                padding:10,
                textStyle:{
                    fontSize:22
                }

            },
            grid: {
                left: '3%',
                right: '5%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: options.xData,
                    axisPointer: {
                        show:true,
                        type: 'shadow'
                    },
                    axisLine:{
                        lineStyle: {
                            color: 'rgba(255,255,255,0.7)',
                            width: 2,
                            type: 'solid',
                            opacity: 0.8
                        }
                    },
                    axisLabel: {
                        show: true,
                        interval: 0,
                        margin: 18,
                        textStyle: {
                            color: "#fff",
                            fontSize: 24,
                        },
                    },
                    axisTick:{
                        show:false
                    }

                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '水量',
                    axisTick:{
                        show:false
                    },
                    axisLine:{show:false},
                    axisLabel: {
                        show:false
                    },
                    splitLine:{show:false}
                },
                {
                    type: 'value',
                    name: '温度',
                    axisTick:{
                        show:false
                    },
                    axisLine:{show:false},
                    axisLabel: {
                        show:false
                    },
                    splitLine:{show:false}
                }
            ],
            series: [
                {
                    name:'指数',
                    type:'bar',
                    barWidth:'35%',
                    itemStyle:{
                        normal:{
                            color:'#ffc46a',
                        }
                    },
                    markLine: {

                        data: [
                            {
                                type: 'average',
                                name: '平均值',
                                label:{
                                    normal:{
                                        fontSize:24
                                    }
                                }
                            }
                        ]
                    },
                    data:options.barData
                },
                {
                    name:'排名',
                    type:'line',
                    yAxisIndex: 1,
                    symbolSize:20,
                    itemStyle : {
                        normal : {
                            lineStyle:{
                                width:6,
                                color:'rgb(1,174,253)',
                            }
                        }
                    },
                    data:options.lineData
                }
            ]
        };

        let dom = null;
        if(typeof options.conId === 'string'){
            dom = document.getElementById(options.conId);
        }else{
            dom = $(options.conId)[0];
        }

        let myChart = echarts.init(dom);
        myChart.off('click');
        myChart.clear();

        myChart.setOption(option);

        myChart.on('click',options.fn)
    }

    function TwoBarChart(options){
        let defaultOption={
            conId:'',
            xArray:[],
            colorArray:[],
            barWidth:'45%',
            dataArray:[],
        };

        options = $.extend(false,defaultOption,options);


        let barData = [];

        let BarColor1 = new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [

                {offset: 0, color: '#fff6e1'},
                {offset: 1, color: '#ffc36a'}
            ]
        );
        let BarColor2 = new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [

                {offset: 0, color: '#dff6fd'},
                {offset: 1, color: '#66c5f5'}
            ]
        );

        let markerLineColor = ['#ffc36a','#66c5f5'];

        options.colorArray.push(BarColor1);
        options.colorArray.push(BarColor2);

        $.each(options.dataArray,function(i,n){

            barData.push({
                name:'',
                type:'bar',
                data:n,
                markLine: {
                    data: [
                        {
                            type: 'average',
                            name: '平均值',
                            label:{
                                normal:{
                                    fontSize:24
                                }
                            },
                            itemStyle :{
                                normal: {
                                    color:markerLineColor[i]
                                },
                            }}
                    ]
                },
                itemStyle:{
                    normal:{
                        color:function(params){
                            return options.colorArray[i]
                        }
                    }
                }
            })
        });


        let option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {
                    type : 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '5%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type: 'category',
                    data: options.xArray,
                    axisLabel: {
                        show: true,
                        interval: 0,
                        margin: 18,
                        textStyle: {
                            color: "#fff",
                            fontSize: 24,
                        },
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLabel:{show:false},
                    axisLine:{show:false},
                    axisTick:{show:false},
                    splitLine:{show:false}
                }
            ],
            series : barData
        };

        var dom = null;
        if(typeof options.conId === 'string'){
            dom = document.getElementById(options.conId);
        }else{
            dom = $(options.conId)[0];
        }

        var myChart = echarts.init(dom);
        myChart.clear();
        myChart.setOption(option);
    }



    function LiquidChart(options){
        let defaultOption={
            conId:'',
            itemStyleColor:'rgba(248, 53, 0, 1)',
            borderColor:new echarts.graphic.LinearGradient(1,0,0,0,[
                {offset: 0.0,color:'rgba(230, 66, 8, 1)'},
                {offset: 0.6, color: 'rgba(239, 182, 60, 1)'},
                {offset: 0.9, color: 'rgba(255, 255, 255, 1)'},
            ]),
            borderWidth:4,
            labelFunction:function(pma){
                return pma.value*100 + '%'
            },
            colorArray:[],
            dataArray:[0.75],
        };

        options = $.extend(false,defaultOption,options);

        var option = {
            series: [{
                type: 'liquidFill',
                data: options.dataArray,
                radius: '80%',
                silent:false,
                outline: {
                    show: true,
                    borderDistance: 8,
                    itemStyle: {
                        color: 'none',
                        borderColor:options.borderColor,
                        borderWidth: options.borderWidth,
                    }
                },
                itemStyle: {
                    normal: {
                        color:options.itemStyleColor
                    }
                },
                label: {
                    show: true,
                    formatter:options.labelFunction,
                    color: '#fff',
                    insideColor: '#fff',
                    fontSize: 30,
                    fontWeight: 'bold',
                    align: 'center',
                    baseline: 'middle',
                    position: 'inside'
                },
                backgroundStyle:{
                    opacity:0
                }

            }]
        };

        var dom = null;
        if(typeof options.conId === 'string'){
            dom = document.getElementById(options.conId);
        }else{
            dom = $(options.conId)[0];
        }

        var myChart = echarts.init(dom);
        myChart.clear();
        myChart.setOption(option);
    }

    function GaugeChart(options){
        let defaultOption={
            conId:'',
            splitNumber:10,
            min:0,
            max:100,
            startAngle:210,
            endAngle:-30,
            splitLineLength:20,
            radius:'100%',
            radius2:'60%',
            radius3:'50%',
            axisLineWidth:16,
            opacity:0.2,
            axisLine3Width:10,
            lineStyle:[[1,new echarts.graphic.LinearGradient(0,0,1,0,[
                {offset: 0.0,color:'rgba(202, 252, 255, 1)'},
                {offset: 1, color: 'rgba(34, 152, 234, 1)'},
            ])]]
        };

        options = $.extend(false,defaultOption,options);


        let option = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
            },
            series: [
                {
                    type: 'gauge',
                    radius: options.radius,
                    center:['50%','60%'],
                    splitNumber:options.splitNumber,
                    startAngle:options.startAngle,
                    endAngle:options.endAngle,
                    min:options.min,
                    max:options.max,
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color:[[0, '#000'],[1 , '#000']],
                            width: options.axisLineWidth,
                            opacity:options.opacity
                        }
                    },
                    axisLabel: {            // 坐标轴
                        show:true,
                        color: '#fff',
                    },
                    axisTick: {            // 坐标轴小标记
                        show:false,
                    },
                    splitLine: {           // 分隔线
                        show:false,
                        length:options.splitLineLength,
                        lineStyle:{
                            width:0
                        }
                    },
                    pointer: {           // 分隔线
                        show:false
                    },
                    detail: {
                        show:false,
                    },
                },
                {
                    type: 'gauge',
                    radius:options.radius2,
                    center:['50%','60%'],
                    splitNumber:options.splitNumber,
                    startAngle:options.startAngle,
                    endAngle:options.endAngle,
                    axisLine: {            // 坐标轴线
                        show:false,
                        lineStyle: {       // 属性lineStyle控制线条样式
                            opacity: 0
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        show:false,
                    },
                    splitLine: {           // 分隔线
                        show:true,
                        length:8,
                        lineStyle:{
                            color:'rgba(0,0,0,0.5)'
                        }
                    },
                    axisLabel:{
                        show:false,
                    },
                    detail:{
                        show:false
                    },
                    pointer: {           // 分隔线
                        show:false,
                    },
                },
                {
                    type: 'gauge',
                    radius:options.radius3,
                    center:['50%','60%'],
                    splitNumber:options.splitNumber,
                    startAngle:options.startAngle,
                    endAngle:options.endAngle,
                    axisLine: {            // 坐标轴线
                        show:false,
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color:options.lineStyle,
                            width: options.axisLine3Width,
                            opacity: 1
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        show:false,
                    },
                    splitLine: {           // 分隔线
                        show:false,
                    },
                    axisLabel:{
                        show:false,
                    },
                    detail:{
                        show:false
                    },
                    pointer: {           // 分隔线
                        show:false,
                    },
                },
            ]
        };
        var dom = null;
        if(typeof options.conId === 'string'){
            dom = document.getElementById(options.conId);
        }else{
            dom = $(options.conId)[0];
        }

        var myChart = echarts.init(dom);
        myChart.clear();
        myChart.setOption(option);
    }


    window.Xchart = {
        PieChart:PieChart,
        LineCharts:LineCharts,
        RingChart:RingChart,
        BarChart:BarChart,
        LineChart:LineChart,
        LiquidChart:LiquidChart,
        // ScatterChart:ScatterChart,
        // FunnelChart:FunnelChart,
        // NestRingChart:NestRingChart,
        RadarChart:RadarChart,
        BarLineChart:BarLineChart,
        TwoBarChart:TwoBarChart,
        GaugeChart:GaugeChart,
        // PlusMinusChart:PlusMinusChart
    }
})();





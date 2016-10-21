app.directive('pie', function() {
    function link(scope, element, attrs){
        var a =  ['echarts','echarts/chart/pie'];
        var b = function (ec) {
            var myChart = ec.init(element[0]);
            var option = {
                title : scope.title,
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: scope.legend,
                toolbox: {
                    show : false,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {
                            show: true,
                            type: ['pie'],
                            option: {
                                funnel: {
                                    x: '25%',
                                    width: '50%',
                                    funnelAlign: 'left',
                                    max: 1548
                                }
                            }
                        },
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                series : scope.series
            };
            myChart.setOption(option);
            window.onresize = myChart.resize;
        }
        function update(){
            require(a,b);
        }
        scope.$watch("series",update);

    }

    return {
        link: link,
        replace:true,
        scope: {title:'=',series:'=',legend:'='},
        templateUrl:"/static/html/directive/pie.html"
    };
});

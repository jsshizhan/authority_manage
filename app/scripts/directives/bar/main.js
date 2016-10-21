app.directive('bar', function() {
    function link(scope, element, attrs){
        if(typeof(scope.styles) == 'undefined'){
            scope.styles = {height:'400px'};
        }
        var b = function () {
            var myChart = echarts.init(element[0]);
            var option = {
                    title : {
                        text: scope.title
                    },
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:scope.legend
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            data : scope.date
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : scope.series
                };
                                    
            myChart.setOption(option);
            window.onresize = myChart.resize;
        };
        function update(){
            b();
        }
        scope.$watch("legend",update);

    }

    return {
        link: link,
        replace:true,
        scope: {title:'=',series:'=',date:'=',legend:'=',styles:'='},
        templateUrl:"scripts/directives/bar/bar.html"
    };
});

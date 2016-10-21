app.directive('line', function() {
    function link(scope, element, attrs){
        if(typeof(scope.styles) == 'undefined'){
            scope.styles = {height:'400px'};
        }
        var b = function () {
            var myChart = echarts.init(element[0]);

            var option = {
                title: {
                    text: scope.title,
                    textStyle:{color: '#999'}
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: scope.legend,
                    textStyle:{color: '#5573b7'}
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: scope.date
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        splitArea: {show: true}
                    }
                ],
                series: scope.series
            };
            myChart.setOption(option);
            window.onresize = myChart.resize;
        };




        function update(){
           b();
        }

        scope.$watch("date",update);

    }

    return {
        link: link,
        replace:true,
        scope: {title:'=',series:'=',date:'=',legend:'=',styles:'='},
        templateUrl:"scripts/directives/line/line.html"
    };
});

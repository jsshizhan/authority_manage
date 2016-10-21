app.directive('bar', function() {
    function link(scope, element, attrs){
        var a =  ['echarts', 'echarts/chart/line','echarts/chart/bar'];
        var b = function (ec) {
            var myChart = ec.init(element[0]);
            var option = {
                title : {
                    text: scope.title
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: scope.legend,
                calculable : true,
                xAxis :scope.date,
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
            require(a,b);
        }
        scope.$watch("legend",update);

    }

    return {
        link: link,
        replace:true,
        scope: {title:'=',series:'=',date:'=',legend:'='},
        templateUrl:"/static/html/directive/bar.html"
    };
});

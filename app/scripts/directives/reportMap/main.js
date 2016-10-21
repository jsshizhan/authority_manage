app.directive('reportMap', function() {
    function link(scope, element, attrs){
        if(typeof(scope.styles) == 'undefined'){
            scope.styles = {height:'400px'};
        }
        var b = function () {
            var myChart = echarts.init(element[0]);

            var option = {
                title : {
                    text: scope.title,
                    x:'center'
                },
                tooltip : {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    x:'left',
                    data:scope.legend
                },
                dataRange: {
                    min: 0,
                    max: 2500,
                    x: 'left',
                    y: 'bottom',
                    text:scope.date,           // 文本，默认为数值文本
                    calculable : true
                },
                toolbox: {
                    show: true,
                    orient : 'vertical',
                    x: 'right',
                    y: 'center',
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                roamController: {
                    show: true,
                    x: 'right',
                    mapTypeControl: {
                        'china': true
                    }
                },
                series : scope.series
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
        templateUrl:"scripts/directives/reportMap/reportMap.html"
    };
});

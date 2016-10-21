app.directive('pie', function() {
    function link(scope, element, attrs){
        if(typeof(scope.styles) == 'undefined'){
            scope.styles = {height:'400px'};
        }
        var b = function () {
            var myChart = echarts.init(element[0]);
            var option = {
                title : {text:scope.title},
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {data:scope.legend},
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
            b();
        }
        scope.$watch("series",update);

    }

    return {
        link: link,
        replace:true,
        scope: {title:'=',series:'=',legend:'=',styles:'='},
        templateUrl:"scripts/directives/pie/pie.html"
    };
});

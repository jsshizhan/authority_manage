app.directive('selects', function(EnumType,$timeout) {

    function link(scope, element, attrs) {

        scope.show = attrs.show;

        scope.items = EnumType[attrs.type];
        var selects= $('select',element).dropdown({onChange:function(value, text, $choice){
            setValue(value);
        }
        });

        function setValue(value) {
            if(scope.model!=value) {
                $timeout(function() {
                    scope.model = value;
                    scope.callback({value:scope.model});
                });

            }
        }

        function update() {
            if(scope.model) {
              selects.dropdown("set selected", scope.model);
            }else{
              selects.dropdown("clear");
              $('.ui.search.dropdown.select .text.default').html(attrs.show);
            }
        }

        scope.$watch('model', update);

        $timeout(function(){
            scope.model=attrs.default;
        });
    }

    return {
        link: link,
        scope: { model: '=',callback:'&'},
        templateUrl:"scripts/directives/select/select.html"
    };
});

app.directive('selects', function (EnumType, $http, $timeout) {

  function link(scope, element, attrs) {

    scope.showtitle = attrs.show;

    if(attrs.isback == "true"){
      $http.get('/api/' + attrs.type + "/select").success(function(data){
        scope.items = data;
      });
    } else {
      scope.items = EnumType[attrs.type];
    }



    var selects = $('#search_selects', element).dropdown({
      onChange: function (value, text, $choice) {
        setValue(value);
      },
      placeholder:attrs.show
    });


    function setValue(value) {
      if (scope.model != value) {
        $timeout(function () {
          scope.model = value;
        });
      }
    }

    function update() {
      if (scope.model) {
        selects.dropdown("set selected", scope.model);
      } else {
        selects.dropdown("clear");
        if (attrs.default == undefined) {
          //$('.ui.search.dropdown.select .text.default').html(attrs.show);
        } else {
          scope.model = attrs.default;
        }
      }
    }

    scope.$watch('model', update);

    $timeout(function () {
      scope.model = attrs.default;
    });
  }

  return {
    link: link,
    scope: {model: '='},
    templateUrl: "scripts/directives/select/select.html"
  };
});

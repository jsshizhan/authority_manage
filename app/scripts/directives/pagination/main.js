app.directive('pagination', function($timeout) {

  function link(scope, element, attrs) {

    $(attrs.container).niceScroll({
      cursorborder: "",
      cursorcolor: "#242832",
      rtlmode: true,
      hwacceleration: false
    });
    // scope.query = {};
    scope.pagination = {page:0,size:attrs.pageSize?attrs.pageSize:20};

    function reQuery() {
      //if(!scope.query||$.isEmptyObject(scope.query)) return;
      scope.items=[];
      scope.pagination.page=1;
      scope.noMore = false;
      scope.load = true;
      reload();
    }

    function reload() {
      if(!scope.query||$.isEmptyObject(scope.query)) return;
      var query = {};
      angular.extend(query,scope.query,scope.pagination);
      if(scope.resource){
        scope.resource.query(query, function(items){
          if(items.length>0) {
            scope.items = scope.items.concat(items);
            scope.callback({args:scope.items});
            scope.load = false;
          } else {
            scope.noMore = true;
            scope.pagination.page-=1;
            scope.callback({args:scope.items});
            scope.load = false;
          }
        },function(error){
          scope.load = false;
        });
      };

      setTimeout(function () {
        $('.commonOverflow').popup({});
      }, 500)
    }

    scope.nextPage = function() {
      scope.load = true;
      scope.pagination.page+=1;
      reload();
    }

    scope.$watch('query',reQuery);
  }

  return {
    scope: { resource:'=',items:'=',query:'=',callback:'&'},
    transclude: true,
    compile: function compile() {
      return {
        pre: function preLink(scope, element, attrs) {
          scope.container = attrs.container;
        },
        post:link
      }
    },
    templateUrl:"scripts/directives/pagination/pagination.html"
  };
});

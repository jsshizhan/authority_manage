app.directive('delete', function($http) {
  function link(scope, element, attrs){

    var modal = $('#delete_modal')
      .modal({
        closable  : false,
        autofocus:false,
        onDeny    : function(){
        },
        onApprove : function() {
          if(scope.requestobject.requesttype=='post'){
            $http.post(scope.requestobject.url).success(function(success){
              scope.callback({callbacktype:scope.requestobject.callbacktype});
              scope.requestobject.message = undefined;
            }).error(function(error){
              scope.requestobject.message = undefined;
            });
          }
          else {
            $http.delete(scope.requestobject.url).success(function (success) {
              scope.callback({callbacktype: scope.requestobject.callbacktype});
              toastr.success("删除成功");
            }).error(function (error) {
              toastr.error("删除失败");
            });
          }
        }
      })

    function update(){
      if(scope.requestobject && scope.requestobject.url)
        modal.modal('show');
    }
    scope.$watch("requestobject",update);
  }

  return {
    link: link,
    replace:true,
    scope: {requestobject:'=',callback:'&'},
    templateUrl:"scripts/directives/deletemodal/delete.html"
  };
});

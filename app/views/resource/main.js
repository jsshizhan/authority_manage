app
  .controller('ResourceController', function ($scope, $resource, $http,$timeout) {

    $('#menuParentMap')
      .dropdown({
        fields: {name: "name", value: "id"},
        apiSettings: {
          debug: true
        },
        onChange: function (value) {
          if (value) {
            if (!$scope.resource) {
              $scope.resource = {};
            }
            $scope.resource.parentId = value;
          }
        }
      });


    $scope.systemCallback = function(value){
      if(value) {
        $scope.systemtype = value
        $scope.resource.parentId='';
        $('#menuParentMap').dropdown({
          apiSettings: {
            action: 'parent menu',
            urlData: {
              systemtype: $scope.systemtype
            }
          }
        });
        $('#menuParentMap').find('.text')[0].innerText='';
      }
    }

    var resourceModal = $('#resourceModal').modal({
      closable: false,
      autofocus: false,
      detachable: false,
      onApprove: function (event) {
        return $('#resourceForm').form("validate form");
      },
      onHide: function () {
        $('#resourceForm').form("reset");
        $scope.resource = {};
      }
    });

    $scope.addResource = function(id){
      $scope.option = "新增";
      $scope.childrenshow = true;
      $scope.resource.level=2;
      $scope.systemtype=$scope.resource.systemType='crm';
      resourceModal.modal('show');
    }


    $scope.ResourceTable = {
      items: [],
      query: {},
      resource:$resource("/api/resource")
    };

    $scope.ResourceTable.items = RESOURCES;

    $scope.delete = function(id){
      $scope.requestobject = {
        url:"/api/resource/"+id+"?date="+new Date().getTime(),
        message:'删除资源'
      }
    }
    $scope.callback = function(){
      $scope.ResourceTable.query = {timer:new Date()};
    }

    $('#resourceForm')
      .form({
        fields: {
          name: {
            identifier: 'name',
            rules: [{type: 'empty', prompt: '不能为空'}]
          },
          value: {
            identifier: 'value',
            rules: [{type: 'empty', prompt: '不能为空'}]
          },
          systemType: {
            identifier: 'systemType',
            rules: [{type: 'empty', prompt: '不能为空'}]
          },
          orderBy: {
            identifier: 'orderBy',
            rules: [{type: 'integer', prompt: '必须是数字'}]
          },
          level: {
            identifier: 'level',
            rules: [{type: 'empty', prompt: '不能为空'}]
          }
        },
        inline: true,
        on: 'blur',
        onSuccess: function () {
            $http.post('/api/resource',$scope.resource).success(function(success){
              toastr.success('添加成功');
              $scope.ResourceTable.query = {timer:new Date()};
            }).error(function(error){
              toastr.error('添加失败 ');
            });
        }
      });


    $scope.selectCallback = function(value){
      value==2?$scope.childrenshow = true:$scope.childrenshow = false;
    }

    $scope.search = function(){
      $scope.ResourceTable.query = angular.copy($scope.ResourceTable.query);
    }

    $scope.toModify = function(id){
      $scope.option = "修改";
      $http.get('/api/resource/'+id).success(function(success){
        $scope.resource = success;
        resourceModal.modal('show');
      }).error(function(error){

      });
    }
  })

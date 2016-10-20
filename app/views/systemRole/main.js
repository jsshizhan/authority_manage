angular
  .module('logisticsSupportUiApp.systemRole', [])

'use strict'

angular.module('logisticsSupportUiApp.systemRole')
  .controller('SystemRoleController', function ($scope, $resource, $http,ivhTreeviewMgr) {
    var editRole = $('#editRoleModal').modal({
      closable: false,
      autofocus: false,
      detachable: false
    });

    $scope.StaffRoleListTable = {
      items: [],
      query: {},
      resource:$resource("/api/staffrole")
    };


    $scope.roleTab = function(systemType){
      $('.ui.tabular.menu .active.item').removeClass('active');
      $('#'+systemType+'_role').addClass('active');
      $scope.StaffRoleListTable.query = {systemType:systemType,timer:new Date()};
      $scope.systemType = systemType;
      $http.get('/api/profile/whole/resource/'+systemType).success(function(wholeResource){
        $scope.resources = wholeResource;

      }).error(function(error){

      });
    }
    $scope.roleTab('crm');

    var addRole = $('#addRoleModal').modal({
      closable: false,
      autofocus: false,
      detachable: false
    });



    $scope.editRole = function(item){
      $scope.staffRole = item;
      ivhTreeviewMgr.deselectAll($scope.resources);
      $http.get('/api/profile/resource/'+$scope.systemType+'/'+$scope.staffRole.id).success(function(persontResource){
        ivhTreeviewMgr.selectEach($scope.resources, persontResource);
        editRole.modal('show');
      }).error(function(error){

      });
    }

    var deleteRole = $('#deleteRoleModal').modal({
      closable: false,
      autofocus: false,
      detachable: false
    });

    $scope.deleteRole = function(id){
      deleteRole.modal('show');
    }



    $scope.otherAwesomeCallback = function(node, isSelected, tree) {
      $scope.resourceIds = [];
      for(var i in tree){
        if(tree[i].selected && tree[i].children.length==0){
          $scope.resourceIds.push(tree[i].id);
        }
        if(tree[i].children.length!=0){
          for(var j in tree[i].children){
            if(tree[i].children[j].selected){
              $scope.resourceIds.push(tree[i].children[j].id);
              if($scope.resourceIds.toString().indexOf(tree[i].children[j].parentId) == -1)
                $scope.resourceIds.push(tree[i].children[j].parentId);
            }
          }
        }
      }
    }

    $scope.save = function(){
      if(!$scope.staffRole.roleName){
        toastr.warning('请输入角色名称');
        return;
      }
      if(!$scope.staffRole.description){
        toastr.warning('请输入角色描述');
        return;
      }

      $http.post('/api/staffrole/'+$scope.staffRole.id+'?systemType='+$scope.systemType+'&roleName='+$scope.staffRole.roleName+'&description='+$scope.staffRole.description,$scope.resourceIds).success(function(success){
        toastr.success('角色保存成功');
        location.reload();
      }).error(function(error){
        toastr.error('角色操作失败');
      });
    }

    $scope.deleteRole = function(id){
      $scope.requestobject = {
        url:"/api/staffrole/"+id+"?date="+new Date().getTime()
      }
    }

    $scope.callback = function(){
      $scope.StaffRoleListTable.query = {timer:new Date()};
    }

    $scope.toAdd = function(){
      $scope.staffRole = {};
      ivhTreeviewMgr.deselectAll($scope.resources);
      addRole.modal('show');
    }

    $scope.add = function(){
      if(!$scope.staffRole.roleName){
        toastr.warning('请输入角色名称');
        return;
      }
      if(!$scope.staffRole.description){
        toastr.warning('请输入角色描述');
        return;
      }
      $http.post('/api/staffrole?systemType='+$scope.systemType+'&roleName='+$scope.staffRole.roleName+'&description='+$scope.staffRole.description,$scope.resourceIds).success(function(success){
        toastr.success('角色添加成功');
        $scope.StaffRoleListTable.query = {timer:new Date(),systemType:$scope.systemType};
      }).error(function(error){
        toastr.error('角色添加失败');
      });
    }

  })

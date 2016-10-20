angular
  .module('logisticsSupportUiApp.crmAccount', [])

'use strict'

angular.module('logisticsSupportUiApp.crmAccount')
  .controller('crmAccountController', function ($scope, $resource, $http) {

    $('#staffAccountMap')
      .dropdown({
        fields: {name: "roleName", value: "id"},
        apiSettings: {
          debug: true
        },
        onChange: function (value) {
          $scope.StaffAccountTable.query.roleId = value;
        }
      });

    $('#staffAccountMapAdd')
      .dropdown({
        fields: {name: "roleName", value: "id"},
        apiSettings: {
          debug: true
        },
        onChange: function (value,text) {
          if(!value)
            return;
          if(!$scope.staffAccount) {
            $scope.staffAccount = {};
          }
          $scope.staffAccount.roleId = value;
          $scope.staffAccount.roleName = text;
        }
      });

    var addStaffAccountModal = $('#addStaffAccountModal').modal({
      closable: false,
      autofocus: false,
      detachable: false,
      onApprove: function (event) {
        return $('#staffAccountForm').form("validate form");
      },
      onHide: function () {
        $scope.staffAccount = {};
        $('#staffAccountForm').form("reset");

      }
    });

    $scope.toAddStaffAccount = function(){
      $scope.option = '新增';
      addStaffAccountModal.modal('show');
    }

    $('#staffAccountForm')
      .form({
        fields: {
          accountName: {
            identifier: 'accountName',
            rules: [{type: 'empty', prompt: '不能为空'}]
          },
          realName: {
            identifier: 'realName',
            rules: [{type: 'empty', prompt: '不能为空'}]
          }
        },
        inline: true,
        on: 'blur',
        onSuccess: function () {
          if($scope.staffAccount.id){
            $http.post('/api/staffaccount/'+$scope.staffAccount.id,$scope.staffAccount).success(function(success){
              toastr.success('编辑账号成功');
              location.reload();
            }).error(function(error){
              toastr.error('编辑账号失败');
            });
          }
          else {
            if(!$scope.staffAccount.roleId){
              toastr.warning('角色不能为空');
              return;
            }
            $http.post('/api/staffaccount', $scope.staffAccount).success(function (success) {
              toastr.success('新增账号成功');
              $scope.StaffAccountTable.query = {timer: new Date()};
            }).error(function (error) {
              toastr.error('新增账号失败');
            });
          }
        }
      });


    $scope.resetPassword = function(id){
      $scope.requestobject = {
        url:"/api/staffaccount/"+id+"/defaultPassword?date="+new Date().getTime(),
        message:'重置密码',
        requesttype:'post'
      }
    }

    $scope.StaffAccountTable = {
      items: [],
      query: {},
      resource:$resource("/api/staffaccount")
    };
    $scope.StaffAccountTable.query = {timer:new Date(),systemType:'crm'};

    $scope.staffAccountSearch = function(){
      $scope.StaffAccountTable.query = angular.copy($scope.StaffAccountTable.query );
    }

    $scope.editStaffAccount = function(id){
      $scope.option = '编辑';
      $http.get('/api/staffaccount/'+id).success(function(success){
        $scope.staffAccount = success;
        $('#staffAccountMapAdd').dropdown('set text', $scope.staffAccount.roleName);
        addStaffAccountModal.modal('show');
      }).error(function(error){

      });

    }

  })

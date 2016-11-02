
app
  .controller('ccAccountController', function ($scope, $resource, $http) {

    var addSupportStaffModal = $('#addSupportStaffModal').modal({
      closable: false,
      autofocus: false,
      detachable: false,
      onApprove: function (event) {
        return $('#supportStaffForm').form("validate form");
      },
      onHide: function () {
        $scope.supportStaff = {};
        $('#supportStaffForm').form("reset");

      }
    });

    $('#supportStaffMap')
      .dropdown({
        fields: {name: "roleName", value: "id"},
        apiSettings: {
          debug: true
        },
        onChange: function (value) {
          $scope.CCTable.query.roleId = value;
        }
      });


    $('#supportStaffMapAdd')
      .dropdown({
        fields: {name: "roleName", value: "id"},
        apiSettings: {
          debug: true
        },
        onChange: function (value,text) {
          if(!value)
            return;
          if(!$scope.supportStaff) {
            $scope.supportStaff = {};
          }
          $scope.supportStaff.roleId = value;
          $scope.supportStaff.roleName = text;
        }
      });

    $('#supportStaffForm')
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
          if($scope.supportStaff.id){
            $http.post('/api/supportstaff/'+$scope.supportStaff.id,$scope.supportStaff).success(function(success){
              toastr.success('编辑账号成功');
              $scope.CCTable.query = {timer: new Date()};
            }).error(function(error){
              toastr.error('编辑账号失败');
            });
          }
          else {
            if(!$scope.supportStaff.roleId){
              toastr.warning('角色不能为空');
              return;
            }
            $http.post('/api/supportstaff', $scope.supportStaff).success(function (success) {
              toastr.success('新增账号成功');
              $scope.CCTable.query = {timer: new Date()};
            }).error(function (error) {
              toastr.error('新增账号失败');
            });
          }
        }
      });

    $scope.CCTable = {
      items: [],
      query: {},
      resource:$resource("/api/supportstaff")
    };
    $scope.CCTable.query = {timer:new Date()};

    $scope.toAddSupportStaff = function(){
      $scope.option = '新增';
      addSupportStaffModal.modal('show');
    }

    $scope.delete = function(item){
      $scope.requestobject = {
        url:"/api/supportstaff/"+item.id+"?date="+new Date().getTime(),
        message:'账号删除'
      }
    }

    $scope.callback = function(){
      $scope.CCTable.query = {timer:new Date()};
    }

    $scope.supportStaffSearch = function(){
      $scope.CCTable.query = angular.copy($scope.CCTable.query );
    }

    $scope.toModify = function(item){
      $scope.option = '编辑';
      $http.get('/api/supportstaff/'+item.id).success(function(success){
        $scope.supportStaff = success;
        $('#supportStaffMapAdd').dropdown('set text', $scope.supportStaff.roleName);
        addSupportStaffModal.modal('show');
      }).error(function(error){

      });
    }

    $scope.resetPassword = function(item){
      $scope.requestobject = {
        url:"/api/supportstaff/"+item.id+"/defaultPassword?date="+new Date().getTime(),
        message:'重置密码',
        requesttype:'post'
      }
    }
  })

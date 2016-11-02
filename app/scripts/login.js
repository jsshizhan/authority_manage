var app = angular.module('logisticsSupportUiApp.login', ['ngResource']);

'use strict';

app
  .controller('LoginController',function ($scope, $http) {

    $('.ui.checkbox').checkbox();
    $('#loginFrom')
      .form({
        fields: {
          username: {
            identifier: 'username',
            rules: [
              {
                type: 'empty',
                prompt: '请输入用户名'
              }
            ]
          },
          password: {
            identifier: 'password',
            rules: [
              {
                type: 'empty',
                prompt: '请输入密码'
              }
            ]
          }

        },
        inline: true,
        on: 'blur',
        onSuccess: function () {
          $http.post("/api/auth", {
            "username": $scope.login.username,
            "password": $scope.login.password
          }).success(function (success) {
            toastr.success("登陆成功");
            window.location = "index.html";
          }).error(function (error) {
            toastr.error("用户名或密码错误！");
          });
        }
      })
  });

$.fn.form.settings.rules.phoneNumber = function () {
  var pattern = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
  return function (value) {
    return pattern.test(value);
  }
}();
$.fn.form.settings.rules.userName = function () {
  var pattern = /(^[a-z0-9A-Z\u4e00-\u9fa5]{2,20}$)/;   //用户名称验证,可以是字母数字汉子长度2-20
  return function (value) {
    return pattern.test(value);
  }
}();

app.controller('forgetPasswordController', function ($scope, $http, $interval) {
  $scope.disable = false;
  $scope.count = "获取验证码";
  $scope.change = {};
  $scope.getSms = function () {
    $scope.disable = true;
    if (!(/(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/.test($scope.change.contactsPhone))) {
      toastr.warning("请先输入正确的手机号");
      $scope.disable = false;
    } else {
      $http.post("/api/auth/password/reset/captcha", null, {
          params: {
            way: "sms",
            phone: $scope.change.contactsPhone
          }
        })
        .success(function (data, status, headers, config) {
          var count = 60;
          $scope.count = (count) + "秒";
          var timer = $interval(function () {
            if (count == 1) {
              $scope.disable = false;
              $scope.count = "获取验证码";
            } else {
              count--;
              $scope.count = (count) + "秒";
            }
          }, 1000, 60);

        })
        .error(function (data, status, headers, config) {
          $scope.disable = false;
          toastr.warning(data);
        });
    }
  }

  $('#ForgotPasswordForm')
    .form({
      fields: {
        username: {
          identifier: 'contactsPhone',
          rules: [
            {
              type: 'phoneNumber',
              prompt: '您输入的手机号码格式不正确！'
            }
          ]
        },
        name1: {
          identifier: 'captcha',
          rules: [
            {
              type: 'empty',
              prompt: '请输入验证码'
            }
          ]
        },
        gender: {
          identifier: 'password',
          rules: [
            {
              type: 'empty',
              prompt: '请输入密码'
            }, {
              type: 'length[6]',
              prompt: '您的密码必须大于等于6位'
            }
          ]
        },
        gender1: {
          identifier: 'password1',
          rules: [
            {
              type: 'empty',
              prompt: '请输入您的密码'
            }, {
              type: 'match[password]',
              prompt: '两次输入的密码不同！'
            }
          ]
        }
      },
      inline: true,
      on: 'blur',
      onSuccess: function () {
        $http.post("/api/auth/password/reset", $scope.change)
          .success(function (data, status, headers, config) {
            toastr.success("修改密码成功，请重新登录!");
            var count = 1;
            var timer = $interval(function () {
              if (count == 1) {
                window.location.href = "login.html";
              } else {
                count--;
              }
            }, 900, 1);
          })
          .error(function (data, status, headers, config) {
            toastr.warning(data);
          });
      }
    })
  ;

});

app.controller('registerController', ["$scope", "$http", "$interval", "$location", function ($scope, $http, $interval, $location) {
  $scope.sign = {inviteCode: $location.search().inviteCode ? $location.search().inviteCode : undefined};
  $scope.disable = false;
  $scope.count = "获取验证码";
  $scope.getSms = function () {
    $scope.disable = true;
    if (!(/(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/.test($scope.sign.contactsPhone))) {
      toastr.warning("请先输入正确的手机号");
      $scope.disable = false;
    } else {

      $http.post("/api/auth/sign-up/captcha", null, {params: {way: "sms", phone: $scope.sign.contactsPhone}})
        .success(function (data, status, headers, config) {

          var count = 60;
          $scope.count = (count) + "秒";
          var timer = $interval(function () {
            if (count == 1) {
              $scope.disable = false;
              $scope.count = "获取验证码";
            } else {
              count--;
              $scope.count = (count) + "秒";
            }
          }, 1000, 60);
        })
        .error(function (data, status, headers, config) {
          $scope.disable = false;
          toastr.warning(data);
        });
    }
  }
  $('#signUpForm')
    .form({
      fields: {
        name: {
          identifier: 'accountName',
          rules: [
            {
              type: 'empty',
              prompt: '请输入用户名'
            },
            {
              type: 'maxLength[20]',
              prompt: '用户名不能超过20个字符'
            }, {
              type: 'length[2]',
              prompt: '用户名最短不能少于2个字符'
            }, {
              type: 'userName',
              prompt: '用户名格式不正确,可以由字母数字汉字组成'
            }
          ]
        },
        contacts: {
          identifier: 'contacts',
          rules: [
            {
              type: 'empty',
              prompt: '请输入姓名'
            }, {
              type: 'maxLength[8]',
              prompt: '姓名长度不能超过8个字'
            }
          ]
        },
        name1: {
          identifier: 'contactsPhone',
          rules: [
            {
              type: 'empty',
              prompt: '请输入联系人手机号码'
            }, {
              type: 'phoneNumber',
              prompt: '请输入正确的手机号'
            }
          ]
        },
        idCode: {
          identifier: 'captcha',
          rules: [
            {
              type: 'empty',
              prompt: '请输入验证码'
            }
          ]
        },
        onePassword: {
          identifier: 'password',
          rules: [
            {
              type: 'empty',
              prompt: '请输入密码'
            },
            {
              type: 'length[6]',
              prompt: '您的密码必须大于等于6位'
            }
          ]
        },
        twoPassword: {
          identifier: 'password1',
          rules: [
            {
              type: 'empty',
              prompt: '请再次输入密码'
            },
            {
              type: 'match[password]',
              prompt: '您二次输入的密码不相同请重新输入。'
            }
          ]
        },
        inviteCode: {
          identifier: 'inviteCode',
          rules: [
            {
              type: 'regExp[/^[0-9]{0,4}$/]',
              prompt: '验证码只能为数值'
            }

          ]
        }
      },
      inline: true,
      on: 'blur',
      onSuccess: function () {
        $http.post("/api/auth/sign-up", $scope.sign)
          .success(function (data, status, headers, config) {
            toastr.success("已完成注册,请登录！");
            var count = 1;
            var timer = $interval(function () {
              if (count == 1) {
                window.location.href = "login.html";
              } else {
                count--;
              }
            }, 900, 1);
          })
          .error(function (data, status, header, config) {
            toastr.warning(data);
          })
      }
    });
}]);

'use strict';

/**
 * @ngdoc overview
 * @name logisticsSupportUiApp
 * @description
 * # logisticsSupportUiApp
 *
 * Main module of the application.
 */
var app = angular
  .module('logisticsSupportUiApp', [
    'ngResource',
    'ngRoute',
    'ngNewRouter',
    'ui.router',
    'ivh.treeview'
  ])


app.config(function ($componentLoaderProvider, $httpProvider,$stateProvider,$urlRouterProvider,ivhTreeviewOptionsProvider) {
  app.stateProvider = $stateProvider;
  app.urlRouterProvider = $urlRouterProvider;
  $httpProvider.interceptors.push(function($q){
    return {
      'request': function(config) {
        if(config.url.startsWith("/api")&&!document.URL.startsWith("http")) {
          config.url = config.url;
        }
        return config;
      },
      'responseError': function(response) {
        var status = response.status;

        if (status == 401) {
          console.log("未认证");
          window.location = "login.html";
        }

        if (status == 403 || status == 412 || status == 503) {
          toastr.warning(response.data);
        }

        if (status == 500) {
          toastr.error("抱歉，服务器异常");
        }

        return $q.reject(response);
      }
    };
  });
  ivhTreeviewOptionsProvider.set({
    defaultSelectedState: false,
    validate: true,
    expandToDepth: 0,
    labelAttribute:'name',
    twistieLeafTpl:'',
    twistieExpandedTpl: '(-)',
    twistieCollapsedTpl: '(+)',
  });
});

app.run(function(){
  $.fn.api.settings.api = {
    'lookup role': '/api/staffrole/map/{systemtype}',
    'parent menu':'/api/resource/map/{systemtype}'
  }
});

app.controller('RouterController', function ($http, $scope, $location,$stateParams,$urlRouter) {

  $scope.resourceState = function(resource){
    if(resource.isLink) {
      app.stateProvider.state(resource.value, {
        url: '/'+resource.value,
        templateUrl: 'views/'+resource.value+'/'+resource.value+'.html'
      });
    }
  }


        $scope.resources = RESOURCES;
        for(var i in $scope.resources) {
          $scope.resourceState($scope.resources[i]);
          if($scope.resources[i].children && $scope.resources[i].children.length > 0 ){
              for(var j in $scope.resources[i].children){
                $scope.resourceState($scope.resources[i].children[j]);
              }
          }
        }
        app.urlRouterProvider.otherwise('/home');
        $urlRouter.sync();
        $urlRouter.listen();

        $scope._path = $location;
        $scope.menu = $scope._path.$$path.substring(1, $scope._path.$$path.length);

        if ($scope.menu != "") {

          for(var x in $scope.resources){
            if($scope.menu == 'home' && $scope.resources[x].value == 'home'){
              $scope.resourceActive = $scope.resources[x];
              return;
            }
            if($scope.resources[x].children && $scope.resources[x].children.length > 0){
              for(var y in $scope.resources[x].children){
                if($scope.resources[x].children[y].value == $scope.menu){
                  $scope.resourceActive = $scope.resources[x].children[y];
                }
              }
            }
          }
        } else {
          $('.home').addClass('click');
        }

    


  $scope.parentClass = function(id){
    $('.index .title').not($('#'+id)).removeClass('click');
    $('#'+id).addClass('click');
  }

  $scope.childrenClass = function(id){
    $('.title-home').not($('#'+id)).removeClass('active');
    $('#'+id).addClass('active');
  }

});



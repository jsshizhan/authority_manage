'use strict';

/**
 * @ngdoc directive
 * @name map
 * @description
 * # directiveMap
 */
app
  .directive('map', function ($http,$filter,GeoService,MapIconService) {
    return {
      restrict: "E",
      replace: true,
      transclude: true,
      templateUrl: 'scripts/directives/map/map.html',
      scope:{lmap:'=',vehicles:'=',locationVehicle:'='},
      link: function(scope, element, attrs) {
        var dateFilter = $filter('date');
        var map = new L.map(element[0],{'crs': L.CRS.BEPSG3857,zoomControl:false });
        scope.lmap = map;
        var markers = L.markerClusterGroup({ disableClusteringAtZoom: 11 });
        scope.lmap.setView([31.568, 120.299], 6);
        L.control.scale().addTo(scope.lmap);
        var baiduLayer = new L.TileLayer.BaiduLayer();
        scope.lmap.addLayer(baiduLayer);

        var southWest = L.latLng(27.60567082646547,88.857421875);
        var northEast = L.latLng(35.71083783530009,151.78710937499997);
        L.latLngBounds(southWest,northEast);

        function update() {
          markers.clearLayers();
          if(scope.vehicles == "" || scope.vehicles == undefined){
            return;
          }

          for (var i = 0; i < scope.vehicles.length; i++) {
            var icon = MapIconService.getIcon(scope.vehicles[i].type);
            var marker = L.marker([scope.vehicles[i].lat, scope.vehicles[i].lng], {
              icon: icon
            });
            markers.addLayer(marker);
            marker.driverId = scope.vehicles[i].driverId;
            marker.type = scope.vehicles[i].type;
            marker.locationReportTime = scope.vehicles[i].locationReportTime;
            marker.on('click', function (e) {
              var lat = e.latlng.lat;
              var lng = e.latlng.lng;
              reverseGeoCoding({lng: lng, lat: lat,driverId: e.target.driverId,type: e.target.type,locationReportTime: e.target.locationReportTime});
            });
          }
          scope.lmap.addLayer(markers);

        }


        function locationVehicleFun() {
          if (scope.locationVehicle) {
            var icon = MapIconService.getIcon(scope.locationVehicle.type);
            var marker = L.marker([scope.locationVehicle.lat, scope.locationVehicle.lng], {
              icon: icon
            });
            marker.addTo(scope.lmap);
            marker.driverId = scope.locationVehicle.driverId;
            marker.type = scope.locationVehicle.type;
            marker.on('click',function(e){
              var lat = e.latlng.lat;
              var lng = e.latlng.lng;
              reverseGeoCoding({lng: lng, lat: lat,driverId: e.target.driverId,type: e.target.type,locationReportTime: scope.locationVehicle.locationReportTime});
            });
            reverseGeoCoding({lng: scope.locationVehicle.lng, lat: scope.locationVehicle.lat,driverId: scope.locationVehicle.driverId,type: scope.locationVehicle.type,locationReportTime: scope.locationVehicle.locationReportTime});
          }
        }

        function reverseGeoCoding(location){
          scope.lmap._zoom = 16;
          scope.lmap.panTo([location.lat, location.lng]);
          if(location.driverId) {
            $http.get("/api/driver/"+location.driverId).success(function(vehicleBrief){
              if(!vehicleBrief.vehicle){
                toastr.warning('没有车辆信息');
              }
              GeoService.reverseGeoCoding({lng: location.lng, lat: location.lat}, function (address) {
                L.popup()
                  .setLatLng(L.latLng(location.lat, location.lng))
                  .setContent("<font color='	#000000'>司机：" + vehicleBrief.realName + "</font></p>" +
                    "<font color='	#000000'>电话：" + vehicleBrief.phone + "</font></p>" +
                    "<font color='	#000000'>车牌号：" + vehicleBrief.vehicle.plateNumber + "</font></p>"+
                    "<font color='	#000000'>" + address + "</font></p> "+
                    "<font color='	#000000'>时间：" + dateFilter(location.locationReportTime, 'yyyy年MM月dd日 HH点mm分ss秒') + "</font>")
                  .openOn(scope.lmap);
              });
            });
          }
          else{
            GeoService.reverseGeoCoding({lng: location.lng, lat: location.lat}, function (address) {
              L.popup()
                .setLatLng(L.latLng(location.lat, location.lng))
                .setContent("<font color='	#000000'>位置：" + address + "</font><br>" +
                  "<font color='	#000000'>时间：" + dateFilter(location.locationReportTime, 'yyyy年MM月dd日 HH点mm分ss秒') + "</font>")
                .openOn(scope.lmap);
            });
          }
        }



        scope.$watch("locationVehicle",locationVehicleFun);
        scope.$watch("vehicles",update);

      }
    };
  });

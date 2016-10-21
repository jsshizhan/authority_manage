/**
 * Created by u133 on 2/2/15.
 */
app.service("GeoService", ["$http", function ($http) {

    this.reverseGeoCoding = function (lnglat,callback) {
        var reverseGeoUrl = "http://api.map.baidu.com/geocoder/v2/?ak="+baidu_ak+"&callback=JSON_CALLBACK&location=" + lnglat.lat + "," + lnglat.lng + "&output=json&pois=1";

        return $http.jsonp(reverseGeoUrl)
            .success(function (data) {
                callback( data.result && data.result.formatted_address);
            })
    }

  this.reverseGeoCodingDetail = function (lnglat,callback) {
    var reverseGeoUrl = "http://api.map.baidu.com/geocoder/v2/?ak="+baidu_ak+"&callback=JSON_CALLBACK&location=" + lnglat.lat + "," + lnglat.lng + "&output=json&pois=1";
    return $http.jsonp(reverseGeoUrl)
      .success(function (data) {
        callback( data.result);
      })
  }

    this.geoCoding=function(address,city,callback) {
        var geoUrl = 'http://api.map.baidu.com/geocoder/v2/?ak='+baidu_ak+'&callback=JSON_CALLBACK&output=json&address='+address+'&city='+city;
        return $http.jsonp(geoUrl)
            .success(function (data) {
                callback( data.result && data.result.location);
            })
    }

    this.getCitysPoint = function(citys,callback){
      var myGeo = new BMap.Geocoder();
      for(var i = 0;i < citys.length;i++){
        myGeo.getPoint(citys[i].address, function(point){
          if (point) {
            var point = {lng:point.lng,lat:point.lat};
            callback(point);
          }
        }, citys[i].city);
      }

    }



  this.placeSearchs = function(query,region,pageSize,callback){
    if(query){
      region = region || '江苏省';
      pageSize = pageSize || 1;
      $http.jsonp('http://api.map.baidu.com/place/v2/search?query='+query+'&page_size='+pageSize+'&region='+region+'&scope=2&output=json&ak='+baidu_ak+'&callback=JSON_CALLBACK').success(function(success){
        if(success.results&&success.results.length >= 1) {
          callback(success.results);
        }
        else {
          callback(success.results);
          toastr.warning('没有此地址信息');
        }
      }).error(function(error){
        toastr.error('获取百度地址信息数据失败');
      });
    }
  }

    //todo
    this.direction=function(originlnglat,origin,destinationlnglat,destination,callback) {
        var origin_region = "";
        var destination_region = "";
        if (origin.indexOf("市") == -1) {
            return;
        } else {
            origin_region = origin.substring(0, origin.indexOf("市")).concat("市");
        }
        if (destination.indexOf("市") == -1) {
            return;
        } else {
            destination_region = destination.substring(0, destination.indexOf("市")).concat("市");
        }

        var geoUrl = 'http://api.map.baidu.com/direction/v1?mode=driving&callback=JSON_CALLBACK&output=json&ak='+baidu_ak+'&origin='+ originlnglat
            +'&destination='+ destinationlnglat +'&origin_region='+ origin_region +'&destination_region='+ destination_region;
        //var geoUrl = 'http://api.map.baidu.com/direction/v1?mode=driving&callback=JSON_CALLBACK&output=json&ak=37c268a974e3665d4a83e6d829142a26&origin=%E4%B8%8A%E5%9C%B0%E4%BA%94%E8%A1%97&destination=%E5%8C%97%E4%BA%AC%E5%A4%A7%E5%AD%A6&origin_region=%E5%8C%97%E4%BA%AC&destination_region=%E5%8C%97%E4%BA%AC';
        return $http.jsonp(geoUrl)
            .success(function (data) {
                callback( data.result && data.result.routes[0] && data.result.routes[0].duration);
            })
    }
}]);

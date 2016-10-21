app.controller("homeController",function($scope){
	$scope.students = [
		{
			name:"吕归尘",
			sex:"男",
			age:"18",
			lng:116.307852,
			lat:40.057031,
			locationReportTime:new Date()
		},{
			name:"项空月",
			sex:"男",
			age:"20",
			lng:116.313082,
			lat:40.047674,
			locationReportTime:new Date()
		},{
			name:"羽然",
			sex:"女",
			age:"17",
			lng:116.328749,
			lat:40.026922,
			locationReportTime:new Date()
		},{
			name:"龙骧",
			sex:"男",
			age:"22",
			lng:116.347571,
			lat:39.988698,
			locationReportTime:new Date()
		},{
			name:"西门也静",
			sex:"女",
			age:"15",
			lng:116.345867,
			lat:39.998333,
			locationReportTime:new Date()
		},
	];

	$scope.location = function(item){
		$scope.locationObject = item;
	}
});
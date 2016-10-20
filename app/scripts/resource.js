var RESOURCES = [
	{
		name:"首页",
		value:"home",
		isLink:true,
		level:1
	},
	{
		name:"用户管理",
		value:"user",
		isLink:false,
		level:1,
		children:[{
			name:"司机列表",
			value:"driver",
			isLink:true,
			level:2
		}]
	},
	{
		name:"订单管理",
		value:"order",
		isLink:false,
		level:1,
		children:[{
			name:"运单列表",
			value:"waybill",
			isLink:true,
			level:2
		}]
	},
	{
		name:"统计管理",
		value:"report",
		isLink:false,
		level:1,
		children:[{
			name:"司机审核",
			value:"driverReport",
			isLink:true,
			level:2
		}]
	},
	{
		name:"系统管理",
		value:"system",
		isLink:false,
		level:1,
		children:[
			{
				name:"账户管理",
				value:"systemAccount",
				isLink:true,
				level:1
			},
			{
				name:"角色管理",
				value:"systemRole",
				isLink:true,
				level:1
			},
			{
				name:"资源管理",
				value:"resource",
				isLink:true,
				level:1
			}

		]
	}
];
app.value("EnumType", {
    CargoType: [
        {value: "general", text: "普货"},
        {value: "jettison", text: "抛货"},
        {value: "bulky", text: "泡货"},
        {value: "heavy", text: "重货"},
        {value: "light", text: "小货"},
        {value: "returning", text: "回程货"},
        {value: "move", text: "搬家货"},
        {value: "other", text: "其他"}
    ],
    waybillState:[
        {value:"auditNotPass",text:"未通过审核"},
        {value:"outOfDate",text:"订单已失效"},
        {value:"canceled",text:"货主取消货单"},
        {value:"signRecived",text:"货主已签收货单"},
        {value:"publishing",text:"货单发布中"},
        {value:"driverCanceled",text:"司机取消订单"},
        {value:"shipperCanceled",text:"货主取消货单"},
        {value:"notChosen",text:"货主选择其他司机"},
        {value:"completed",text:"货主已签收货单"},
        {value:"confirming",text:"货主确认中"},
        {value:"on_the_way",text:"运输途中"},
        {value:"closed",text:"货单关闭"},
        {value:"rejected",text:"货主拒绝使用该司机"}
    ],
    LoginState:[
        {value:"never",text:"未激活"},
        {value:7,text:"7天未登录"}
    ],
    FeedBackType:[
        {value:"function",text:"功能"},
        {value:"service",text:"服务"},
        {value:"bug",text:"bug"},
        {value:"other",text:"其他"},
    ],
    PermissionType:[
        {value:"super_admin",text:"超级管理员"},
        {value:"`",text:"普通管理员"},
        {value:"manager",text:"经理"}
    ],
    GenderType: [
        {value: "male", text: "男"},
        {value: "female", text: "女"}
    ],
    AccountState:[
        {value: "normal", text: "正常"},
        {value: "disabled", text: "关闭"}
    ],
    VehicleLength: [
        {"value": 4.2, "text": 4.2},
        {"value": 5.2, "text": 5.2},
        {"value": 5.8, "text": 5.8},
        {"value": 6.2, "text": 6.2},
        {"value": 6.5, "text": 6.5},
        {"value": 6.8, "text": 6.8},
        {"value": 7.2, "text": 7.2},
        {"value": 8.0, "text": 8.0},
        {"value": 9.6, "text": 9.6},
        {"value": 12.0, "text": 12.0},
        {"value": 13.0, "text": 13.0},
        {"value": 13.5, "text": 13.5},
        {"value": 15.0, "text": 15.0},
        {"value": 16.5, "text": 16.5},
        {"value": 17.5, "text": 17.5},
        {"value": 18.5, "text": 18.5},
        {"value": 20.0, "text": 20.0},
        {"value": 22.0, "text": 22.0},
        {"value": 24.0, "text": 24.0}
    ],
    VehicleModel: [
        {value: "high_sided", text: "高栏"},
        {value: "flatbed", text: "平板"},
        {value: "van", text: "箱式"},
        {value: "other", text: "其它"}
    ],
    PricingMode: [
        {value: "bidding", text: "竞价"},
        {value: "fix", text: "定价"},
        {value: "negotiable", text: "面议"}
    ],
    DateType:[
        {value:"day",text:"分日"},
        {value:"month",text:"分月"},
        {value:"season",text:"分季"},
        {value:"year",text:"分年"}
    ],
    LogisticAction: {
        cancelPublish: "cancelPublish",
        confirmWaybill: 'confirmWaybill',
        cancelWaybill: 'cancelWaybill',
        invite: 'invite',
        arrival: 'arrival',
        sign: 'arrival'
    },OrderType:[
            {"value":"occupy","text":"抢单"},
            {"value":"invited","text":"定向发布"},
    ],
    yesOrNo : [
        {value: "", text: "全部"},
        {value: "1", text: "是"},
        {value: "0", text: "否"}
    ],
    trueOrFalse : [
      {value: "1", text: "是"},
      {value: "0", text: "否"}
    ],
    isHandleModel : [
        {value : "YES",text:"已处理"},
        {value : "NO",text:"未处理"}
    ],
    mobileModel : [
        {value : "android",text:"android"},
        {value : "ios",text:"ios"}
    ],
    informModel : [
        {value : "rejected",text:"驳回"},
        {value : "processed",text:"已处理"}
    ],
    login : [
        {value : "",text:"全部"},
        {value : "seven",text:"七天未登陆"},
        {value : "never",text:"从未登陆"}
    ],
    feedBackState:[
        {value:'false',text:'未审核'},
        {value:'true',text:'已审核'},
    ],

    sensitiveWordType:[
        {value:'chemicals',text:'剧毒化学品'},
        {value:'gun',text:'涉枪'},
        {value:'pornographic',text:'淫秽色情'},
        {value:'gambling',text:'网络赌博'},
        {value:'control_tool',text:'管制刀具'},
        {value:'police_supplies',text:'警用品'},
        {value:'crossbow',text:'弩'}
    ],
    accountType:[
        {value:'driver',text:'司机'},
        {value:'shipper',text:'货主'}
    ],
    waybillSource:[
        {value:'',text:'全部'},
        {value:'platform',text:'平台发布'},
        {value:'shipper',text:'司机发布'}
    ],
    RecordType:[
        {value:1, text:'找货'},
        {value:2, text:'找车'},
        {value:3, text:'反馈'},
        {value:4, text:'投诉'},
        {value:5, text:'其他'}
    ],
    CallType : [
      {value: 'in', text:'呼入'},
      {value: 'out', text: '呼出'}
    ],
  HistorySearchType:[
    {value: "oneHour", text: "一小时内"},
    {value: "today", text: "今天"},
    {value: "yesterday", text: "昨天"},
    {value: "custom", text: "自定义"}
  ],
  ApprovedState:[
    {value: "passed", text: "通过审核"},
    {value: "uncommitted", text: "未提交审核"},
    {value: "not_pass", text: "审核未通过"},
    {value: "auditing", text: "审核中"}
  ],
  ModelChoice:[
    {value: "1", text: "小型面包"},
    {value: "2", text: "中型面包"},
    {value: "3", text: "小型卡车"},
    {value: "4", text: "大型卡车"}
  ],
  PayChoice:[
    {value: "1", text: "支付宝"},
    {value: "2", text: "微信支付"},
    {value: "3", text: "百度钱包"},
    {value: "4", text: "京东支付"}
  ],
  AscriptionChoice:[
    {value: "1", text: "1"},
    {value: "2", text: "2"},
    {value: "3", text: "3"},
  ],
  DriverType:[
    {value:"own",text:"自营"},
    {value:"society",text:"承包"},
    {value:"join",text:"加盟"}
  ],
  additional:[
    {value:"isCarry",text:"需要搬运"},
    {value:"isReceipt",text:"需要回单"},
    {value:"isCollection",text:"代收金额"}
  ],
  PaymentMode:[
    {value:"on_line",text:"线上支付"},
    {value:"consignor_pay",text:"发货人付现"},
    {value:"consignee_pay",text:"收货人付现"}
  ],
  PublishWay:[
    {value:"telephone",text:"电话下单"},
    {value:"app",text:"软件下单"}
  ],
  WorkState:[
    {value:"busy",text:"置忙"},
    {value:"free",text:"置闲"}
  ],
  Identity:[
    {value:"driver",text:"司机"},
    {value:"shipper",text:"货主"},
    {value:"platform",text:"平台"}
  ],
  FeedBackType:[
    {value:"consultation",text:"咨询"},
    {value:"proposal",text:"建议"},
    {value:"complaint",text:"投诉"},
    {value:"other",text:"其它"}
  ],
  PayStatusType:[
    {value:'no_pay',text:'未支付'},
    {value:'pay',text:'已支付'},
    {value:'canceled',text:'支付取消'}
  ],
  PayWayType:[
    {value:'wechat',text:'微信'},
    {value:'alipay',text:'支付宝'},
    {value:'off_line',text:'线下'}
  ],
  SystemType:[
    {value:'crm',text:'后台管理'},
    {value:'oa',text:'办公系统'}
  ],
  MenuLevelType:[
    {value:'1',text:'父菜单'},
    {value:'2',text:'子菜单'}
  ]

});

var selUser = true;
function selectPersonForEdit(container) {
	var result = selectPerson();
	if (null != result) {
		var innerId = result.arrUserIID[0];
		var userName = result.selUsers;
		__excel.setCellValue("AVP_AP_PROJSETUP_COSTING___projmanagerid",innerId,"");
		__excel.setCellValue("AVP_AP_PROJSETUP_COSTING___projmanagername",userName);	
	}
}
function selectDivisionForEdit(index) {
	var result = selectDivision();
    if (null != result) {
        var innerId = result.arrDivIID[0];//单位ID
        var divName = result.arrDivName[0];//单位名称		
		if(index==0){
			__excel.records["s4"][0]["supplierid"] = innerId;
			__excel.setCellValue("s4___suppliername",divName);	
		}else{
			__excel.records["s4"][index]["supplierid"] = innerId;
			__excel.setCellValue("s4___suppliername_"+index,divName);	
		}
	}
}
function setNullCellId(dsId){
//	if(dsId){
//		if(dsId=="s1"){
//			setFloat2Num4s1();
//		}else if(dsId=="s2"||dsId=="s3"||dsId=="s4"){
//			setFloat2Num4DsId(dsId);
//		}else if(dsId=="s5"){
//			setFloat2Num4s5();
//		}
//	}else{
		setFloat2Num4s1();
		setFloat2Num4DsId("s2");
		setFloat2Num4DsId("s3");
		setFloat2Num4DsId("s4");
		setFloat2Num4s5();
		setFloat2Num4alloc("sale");
		setFloat2Num4alloc("ceo");
//	}
	//维持序号
	if(dsId){
		var dsId4data=__excelData[dsId];
		for(var i=0;i<dsId4data.length;i++){
			dsId4data[i]["ordernum"]=i+1;
		}
	}
	//缓存
	var c=__excel.getCellValue("sale___proficompanypercent");
	var m=__excel.getCellValue("sale___profimarketingpercent");
	var t=__excel.getCellValue("sale___profitechpercent");
	var p=__excel.getCellValue("sale___profisalespercent");
	window.company=c==""?0.00:parseFloat(c);
	window.market=m==""?0.00:parseFloat(m);
	window.tech=t==""?0.00:parseFloat(t);
	window.profit=p==""?0.00:parseFloat(p);
	
}
function getFirstLoadFeeData(){
	//缓存8行9行汇总数据
	var projtotalpriceG=__excel.getCellValue("AVP_AP_PROJSETUP_COSTING_FEE___projtotalprice");
	var projtotalpricenotaxG=__excel.getCellValue("AVP_AP_PROJSETUP_COSTING_FEE___projtotalpricenotax");
	var projoutputtaxG=__excel.getCellValue("AVP_AP_PROJSETUP_COSTING_FEE___projoutputtax");
	var projprofitmarginG=__excel.getCellValue("AVP_AP_PROJSETUP_COSTING_FEE___projprofitmargin");
	
	var wgtotalcostG=__excel.getCellValue("AVP_AP_PROJSETUP_COSTING_FEE___wgtotalcost");
	var wxtotalcostG=__excel.getCellValue("AVP_AP_PROJSETUP_COSTING_FEE___wxtotalcost");
	var wginputtaxG=__excel.getCellValue("AVP_AP_PROJSETUP_COSTING_FEE___wginputtax");
	var wxinputtaxG=__excel.getCellValue("AVP_AP_PROJSETUP_COSTING_FEE___wxinputtax");
	
	window.projtotalprice=projtotalpriceG==""?0.00:parseFloat(projtotalpriceG);
	window.projtotalpricenotax=projtotalpricenotaxG==""?0.00:parseFloat(projtotalpricenotaxG);
	window.projoutputtax=projoutputtaxG==""?0.00:parseFloat(projoutputtaxG);
	window.projprofitmargin=projprofitmarginG==""?0.00:parseFloat(projprofitmarginG);
	
	window.wgtotalcost=wgtotalcostG==""?0.00:parseFloat(wgtotalcostG);
	window.wxtotalcost=wxtotalcostG==""?0.00:parseFloat(wxtotalcostG);
	window.wginputtax=wginputtaxG==""?0.00:parseFloat(wginputtaxG);
	window.wxinputtax=wxinputtaxG==""?0.00:parseFloat(wxinputtaxG);
}
function setFloat2Num4s1(){
	var length=__excelData["s1"].length;
	for(var i=0;i<length;i++){
		var dr=__excelData["s1"][i];
		
		var quantity = dr["quantity"];
		var disquantity=getDisplayValue(quantity);		
		var price = dr["price"];
		var disprice=getDisplayValue(price);
		var pricetaxrate = dr["pricetaxrate"];
		var dispricetaxrate=getDisplayValue(pricetaxrate);
		var totalprice = dr["totalprice"];
		var distotalprice=getDisplayValue(totalprice);
		var profit = dr["profit"];
		var disprofit=getDisplayValue(profit);
		
		if(i==0){
			__excel.setCellValue("s1___ordernum",i+1,i+1,"",false);
			setDidplayValue("s1___price",disprice);
			setDidplayValue("s1___pricetaxrate",dispricetaxrate);
			setDidplayValue("s1___totalprice",distotalprice);
			setDidplayValue("s1___profit",disprofit);
			setDidplayValue("s1___quantity",disquantity);
			
			setDidplayValue("s1___costquantity","");
			setDidplayValue("s1___costprice","");
			setDidplayValue("s1___costtaxrate","");
			setDidplayValue("s1___totalcost","");
			setDidplayValue("s1___taxcost","");
			setDidplayValue("s1___profitrate","");
		}else{
			__excel.setCellValue("s1___ordernum_"+i,i+1,i+1,"",false);
			setDidplayValue("s1___price_"+i,disprice);
			setDidplayValue("s1___pricetaxrate_"+i,dispricetaxrate);
			setDidplayValue("s1___totalprice_"+i,distotalprice);
			setDidplayValue("s1___profit_"+i,disprofit); 
			setDidplayValue("s1___quantity_"+i,disquantity); 
			
			setDidplayValue("s1___costquantity_"+i,"");
			setDidplayValue("s1___costprice_"+i,"");
			setDidplayValue("s1___costtaxrate_"+i,"");
			setDidplayValue("s1___totalcost_"+i,"");
			setDidplayValue("s1___taxcost_"+i,"");
			setDidplayValue("s1___profitrate_"+i,"");
		}
	}
}
function setFloat2Num4DsId(dsId){
	var length2=__excelData[dsId].length;
	for(var i=0;i<length2;i++){
		var dr=__excelData[dsId][i];
		var price = dr["price"];
		var disprice=getDisplayValue(price);
		var pricetaxrate = dr["pricetaxrate"];
		var dispricetaxrate=getDisplayValue(pricetaxrate);
		var totalprice = dr["totalprice"];
		var distotalprice=getDisplayValue(totalprice);
		var costprice = dr["costprice"];
		var discostprice=getDisplayValue(costprice);
		var costtaxrate = dr["costtaxrate"];
		var discosttaxrate=getDisplayValue(costtaxrate);
		var totalcost = dr["totalcost"];
		var distotalcost=getDisplayValue(totalcost);
		var taxcost = dr["taxcost"];
		var distaxcost=getDisplayValue(taxcost);
		var profitrate = dr["profitrate"];
		var disprofitrate=getDisplayValue(profitrate);
		var profit = dr["profit"];
		var disprofit=getDisplayValue(profit);		
		var quantity = dr["quantity"];
		var disquantity=getDisplayValue(quantity);
		var costquantity = dr["costquantity"];
		var discostquantity=getDisplayValue(costquantity);
		if(i==0){
			__excel.setCellValue(dsId+"___ordernum",i+1,i+1,"",false);
			setDidplayValue(dsId+"___price",disprice);
			setDidplayValue(dsId+"___pricetaxrate",dispricetaxrate);
			setDidplayValue(dsId+"___totalprice",distotalprice);
			setDidplayValue(dsId+"___costprice",discostprice);
			setDidplayValue(dsId+"___costtaxrate",discosttaxrate);
			setDidplayValue(dsId+"___totalcost",distotalcost);
			setDidplayValue(dsId+"___taxcost",distaxcost);
			setDidplayValue(dsId+"___profitrate",disprofitrate);
			setDidplayValue(dsId+"___profit",disprofit);
			setDidplayValue(dsId+"___quantity",disquantity);
			setDidplayValue(dsId+"___costquantity",discostquantity);
		}else{
			__excel.setCellValue(dsId+"___ordernum_"+i,i+1,i+1,"",false);
			setDidplayValue(dsId+"___price_"+i,disprice);
			setDidplayValue(dsId+"___pricetaxrate_"+i,dispricetaxrate);
			setDidplayValue(dsId+"___totalprice_"+i,distotalprice);
			setDidplayValue(dsId+"___costprice_"+i,discostprice);
			setDidplayValue(dsId+"___costtaxrate_"+i,discosttaxrate);
			setDidplayValue(dsId+"___totalcost_"+i,distotalcost);
			setDidplayValue(dsId+"___taxcost_"+i,distaxcost);
			setDidplayValue(dsId+"___profitrate_"+i,disprofitrate);
			setDidplayValue(dsId+"___profit_"+i,disprofit);
			setDidplayValue(dsId+"___quantity_"+i,disquantity);
			setDidplayValue(dsId+"___costquantity_"+i,discostquantity);
		}
	}
}
function getDisplayValue(value){
	if(value){
		if("string"== typeof value){
			value=parseFloat(value);
		}
		value=value.toFixed(2);
		var displayValue = value+"";
		var p=/(\d+)(\d{3})/;
		while(p.test(displayValue)){
			displayValue=displayValue.replace(p,"$1"+","+"$2");
		}
		return displayValue;
	}else{
		return "";
	}
	
}
function setFloat2Num4s5(){
	var s5="AVP_AP_PROJSETUP_COSTING_FEE";
	var length=__excelData[s5].length;
	for(var i=0;i<length;i++){
		var dr=__excelData[s5][i];
		var biddingfee = dr["biddingfee"];
		var disbiddingfee=getDisplayValue(biddingfee);
		setDidplayValue(s5+"___biddingfee",disbiddingfee);
		
		var consultfee = dr["consultfee"];
		var disconsultfee=getDisplayValue(consultfee);
		setDidplayValue(s5+"___consultfee",disconsultfee);
		
		var perfguaranteefee = dr["perfguaranteefee"];
		var disperfguaranteefee=getDisplayValue(perfguaranteefee);
		setDidplayValue(s5+"___perfguaranteefee",disperfguaranteefee);
		
		var otherfee = dr["otherfee"];
		var disotherfee=getDisplayValue(otherfee);
		setDidplayValue(s5+"___otherfee",disotherfee);
		
		var contractcost = dr["contractcost"];
		var discontractcost=getDisplayValue(contractcost);
		setDidplayValue(s5+"___contractcost",discontractcost);
		
		var contractprofit = dr["contractprofit"];
		var discontractprofit=getDisplayValue(contractprofit);
		setDidplayValue(s5+"___contractprofit",discontractprofit);
		
		var contractprofitrate = dr["contractprofitrate"];
		var discontractprofitrate=getDisplayValue(contractprofitrate);
		setDidplayValue(s5+"___contractprofitrate",discontractprofitrate);
		
		var contractgrossprofitrate = dr["contractgrossprofitrate"];
		var discontractgrossprofitrate=getDisplayValue(contractgrossprofitrate);
		setDidplayValue(s5+"___contractgrossprofitrate",discontractgrossprofitrate);
		
		var projtotalprice = dr["projtotalprice"];
		var disprojtotalprice=getDisplayValue(projtotalprice);
		setDidplayValue(s5+"___projtotalprice",disprojtotalprice);
		
		var wgtotalcost = dr["wgtotalcost"];
		var diswgtotalcost=getDisplayValue(wgtotalcost);
		setDidplayValue(s5+"___wgtotalcost",diswgtotalcost);
		
		var surtax = dr["surtax"];
		var dissurtax=getDisplayValue(surtax);
		setDidplayValue(s5+"___surtax",dissurtax);
		
		var projtotalpricenotax = dr["projtotalpricenotax"];
		var disprojtotalpricenotax=getDisplayValue(projtotalpricenotax);
		setDidplayValue(s5+"___projtotalpricenotax",disprojtotalpricenotax);
/////////////
		var wxtotalcost = dr["wxtotalcost"];
		var diswxtotalcost=getDisplayValue(wxtotalcost);
		setDidplayValue(s5+"___wxtotalcost",diswxtotalcost);
		
		var projoutputtax = dr["projoutputtax"];
		var disprojoutputtax=getDisplayValue(projoutputtax);
		setDidplayValue(s5+"___projoutputtax",disprojoutputtax);
		
		var wginputtax = dr["wginputtax"];
		var diswginputtax=getDisplayValue(wginputtax);
		setDidplayValue(s5+"___wginputtax",diswginputtax);
		
		var projprofitmargin = dr["projprofitmargin"];
		var disprojprofitmargin=getDisplayValue(projprofitmargin);
		setDidplayValue(s5+"___projprofitmargin",disprojprofitmargin);

		var wxinputtax = dr["wxinputtax"];
		var diswxinputtax=getDisplayValue(wxinputtax);
		setDidplayValue(s5+"___wxinputtax",diswxinputtax);
	}
}
function setDidplayValue(cellId,displayValue){
	var cellRealIId=__excel.getCellUnikeId("",cellId);
	if(displayValue){
		$("#"+cellRealIId).html(displayValue);
	}else{
		$("#"+cellRealIId).html("");
	}
}
function setFloat2Num4alloc(dsId){
	var length2=__excelData[dsId].length;
	for(var i=0;i<length2;i++){
		var dr=__excelData[dsId][i];
		var proficompanypercent = dr["proficompanypercent"];
		var disproficompanypercent=getDisplayValue(proficompanypercent);
		setDidplayValue(dsId+"___proficompanypercent",disproficompanypercent);
		
		var profimarketingpercent = dr["profimarketingpercent"];
		var disprofimarketingpercent=getDisplayValue(profimarketingpercent);
		setDidplayValue(dsId+"___profimarketingpercent",disprofimarketingpercent);
		
		var profitechpercent = dr["profitechpercent"];
		var disprofitechpercent=getDisplayValue(profitechpercent);
		setDidplayValue(dsId+"___profitechpercent",disprofitechpercent);
		
		var profisalespercent = dr["profisalespercent"];
		var disprofisalespercent=getDisplayValue(profisalespercent);
		setDidplayValue(dsId+"___profisalespercent",disprofisalespercent);
		
		var feecompany = dr["feecompany"];
		var disfeecompany=getDisplayValue(feecompany);
		setDidplayValue(dsId+"___feecompany",disfeecompany);
		
		var feemarketing = dr["feemarketing"];
		var disfeemarketing=getDisplayValue(feemarketing);
		setDidplayValue(dsId+"___feemarketing",disfeemarketing);
		
		var feettech = dr["feettech"];
		var disfeettech=getDisplayValue(feettech);
		setDidplayValue(dsId+"___feettech",disfeettech);
		
		var feesales = dr["feesales"];
		var disfeesales=getDisplayValue(feesales);
		setDidplayValue(dsId+"___feesales",disfeesales);
	}
}
Array.prototype.remove=function(dx){
	if(isNaN(dx)||dx>this.length){return false;}
	for(var i=0,n=0;i<this.length;i++){
		if(this[i]!=this[dx]){
			this[n++]=this[i]
		}
	}
	this.length-=1
}
function deleteNullGridData(){
	
	var subData=__excel.getSubmitData();
	deleteNullGridData4dsId("s1",subData);
	deleteNullGridData4dsId("s2",subData);
	deleteNullGridData4dsId("s3",subData);
	deleteNullGridData4dsId("s4",subData);
	__excel["submitData"]=subData;
}
function deleteNullGridData4dsId(dsId,subData){
	if(subData[dsId]){
		var gds=subData[dsId]["insertData"];
		if(gds){
			var length=gds.length;
			for(var i=0;i<length;i++){
				if(checkIsNull(i,gds)){
					gds.remove(i);
				}
			}
		}
	}
}
function checkIsNull(index,gds){
	if(index>=0&&index<gds.length){
		var da=gds[index];
		//var ordernum=da["ordernum"];
		var productdesc=da["productdesc"];
		var productname=da["productname"];
//		if(ordernum){
//			return false;
//		}
		if(productname){
			return false;
		}
		if(productdesc){
			return false;
		}
		var quantity=da["quantity"];
		if(quantity&&quantity!="0"){
			return false;
		}
		var price=da["price"];
		var pricetaxrate=da["pricetaxrate"];
		if(price&&price!="0.00"){
			return false;
		}
		if(pricetaxrate&&pricetaxrate!="0.00"){
			return false;
		}
		var suppliername=da["suppliername"];
		if(suppliername){
			return false;
		}
		
		var costquantity=da["costquantity"];
		if(costquantity&&costquantity!="0"){
			return false;
		}
		var costprice=da["costprice"];
		var costtaxrate=da["costtaxrate"];
		if(costprice&&costprice!="0.00"){
			return false;
		}
		if(costtaxrate&&costtaxrate!="0.00"){
			return false;
		}
		return true;
	}
	return true;
}
//调整单查看状态标红处理
function showDifferenceByRedColor(){
	if(params.role=="viewrole"&&params.adjustId){
		//http://10.0.1.81:8000/avplan/avplan/projsetupcostadjust/GetProjsetupCostCpmparisonResult.handler?adjustId=z7bc690268151005
		var url=params.contextPath+"/avplan/projsetupcostadjust/GetProjsetupCostCpmparisonResult.handler?adjustId="+params.adjustId;
		$.ajax({
			url:url,
			type:"GET",
			success:function(differencedata){
				differencedata=JSON.parse(differencedata);
				if(differencedata){
					for(var dsId in differencedata){
						var id="#Sheet1_"+dsId+"___";
						if(differencedata[dsId].length){//s
							var length=differencedata[dsId].length;
							for(var i=0;i<length;i++){					
								var orderNum=differencedata[dsId][i]["ordernum"];
								if(orderNum=="1"){
									for(var arrId in differencedata[dsId][i]){						
										$(id+arrId).css("color","red");
									}
								}else{
									for(var arrId in differencedata[dsId][i]){						
										$(id+arrId+"_"+(parseInt(orderNum)-1)).css("color","red");
									}
								}
								
							}
						}else{
							for(var arrId in differencedata[dsId]){
								$(id+arrId).css("color","red");
							}
						}
					}
				}
			}
		});
//		var differencedata={
//				"AVP_AP_PROJSETUP_COSTING":{"acthardwaremanmonth": 22,"bncustaddr": "一院数字化加工中心"},
//				"s1":[{"ordernum": "1","totalprice": 5115},{"ordernum": "2","totalprice": 4}],
//				"s2":[{}],
//				"s3":[{}],
//				"s4":[{}],
//				"AVP_AP_PROJSETUP_COSTING_FEE":{"contractcost": 1492.63,"contractprofit": 3795.37},
//				"sale":{},
//				"ceo":{},
//				"adjust":{}
//				};
		
	}
}
//查看上一个调整版本
function showPreCostingHisObj(){
	var beforeObjectId=params.beforeObjectId;
	if(beforeObjectId){
		var url=params.contextPath+"/uipage/page/clientrest?op=generatorByPageId&usage=view&pageId=costnew4modify&objectId="+beforeObjectId+"&role=viewrole&excelPadding=20&adjustId="+params.beforeAdjustId;
		window.open(url); 
	}
}
//校验总经理输入利润空间的分配比例是否大于100%
function checkPercent(datasetattr){
	var company=__excel.getCellValue("sale___proficompanypercent");
	var market=__excel.getCellValue("sale___profimarketingpercent");
	var tech=__excel.getCellValue("sale___profitechpercent");
	var profit=__excel.getCellValue("sale___profisalespercent");
	company=company==''?0.00:parseFloat(company);
	market=market==''?0.00:parseFloat(market);
	tech=tech==''?0.00:parseFloat(tech);
	profit=profit==''?0.00:parseFloat(profit);
	var total=company+market+tech+profit;
	if(total>100){
		if(datasetattr=="proficompanypercent"){
			__excel.setCellValue("sale___proficompanypercent",window.company.toFixed(2));
		}else if(datasetattr=="profimarketingpercent"){
			__excel.setCellValue("sale___profimarketingpercent",window.market.toFixed(2));
		}else if(datasetattr=="profitechpercent"){
			__excel.setCellValue("sale___profitechpercent",window.tech.toFixed(2));
		}else if(datasetattr=="profisalespercent"){
			__excel.setCellValue("sale___profisalespercent",window.profit.toFixed(2));
		}
	}else{
		if(datasetattr=="proficompanypercent"){
			window.company=company;
		}else if(datasetattr=="profimarketingpercent"){
			window.market=market;
		}else if(datasetattr=="profitechpercent"){
			window.tech=tech;
		}else if(datasetattr=="profisalespercent"){
			window.profit=profit;
		}
	}

}
//销售负责人能不能进行编辑，如果8行和9行数据没有变动，可以修改，否则不能编辑
function beforeEditCheck(){
	var projtotalprice=__excel.getCellValue("AVP_AP_PROJSETUP_COSTING_FEE___projtotalprice");
	var projtotalpricenotax=__excel.getCellValue("AVP_AP_PROJSETUP_COSTING_FEE___projtotalpricenotax");
	var projoutputtax=__excel.getCellValue("AVP_AP_PROJSETUP_COSTING_FEE___projoutputtax");
	var projprofitmargin=__excel.getCellValue("AVP_AP_PROJSETUP_COSTING_FEE___projprofitmargin");
	
	var wgtotalcost=__excel.getCellValue("AVP_AP_PROJSETUP_COSTING_FEE___wgtotalcost");
	var wxtotalcost=__excel.getCellValue("AVP_AP_PROJSETUP_COSTING_FEE___wxtotalcost");
	var wginputtax=__excel.getCellValue("AVP_AP_PROJSETUP_COSTING_FEE___wginputtax");
	var wxinputtax=__excel.getCellValue("AVP_AP_PROJSETUP_COSTING_FEE___wxinputtax");
	
	projtotalprice=projtotalprice==""?0.00:parseFloat(projtotalprice);
	projtotalpricenotax=projtotalpricenotax==""?0.00:parseFloat(projtotalpricenotax);
	projoutputtax=projoutputtax==""?0.00:parseFloat(projoutputtax);
	projprofitmargin=projprofitmargin==""?0.00:parseFloat(projprofitmargin);
	
	wgtotalcost=wgtotalcost==""?0.00:parseFloat(wgtotalcost);
	wxtotalcost=wxtotalcost==""?0.00:parseFloat(wxtotalcost);
	wginputtax=wginputtax==""?0.00:parseFloat(wginputtax);
	wxinputtax=wxinputtax==""?0.00:parseFloat(wxinputtax);
	
	if(window.projtotalprice!=projtotalprice){
		return false;
	}
	if(window.projtotalpricenotax!=projtotalpricenotax){
		return false;
	}
	if(window.projoutputtax!=projoutputtax){
		return false;
	}
	if(window.projprofitmargin!=projprofitmargin){
		return false;
	}
	
	if(window.wgtotalcost!=wgtotalcost){
		return false;
	}
	if(window.wxtotalcost!=wxtotalcost){
		return false;
	}
	if(window.wginputtax!=wginputtax){
		return false;
	}
	if(window.wxinputtax!=wxinputtax){
		return false;
	}
	return true;	
}

//校验总经理输入利润空间的分配比例是否等于100%
function checkEqualsOneHundredPercent(){
	var company=__excel.getCellValue("sale___proficompanypercent");
	var market=__excel.getCellValue("sale___profimarketingpercent");
	var tech=__excel.getCellValue("sale___profitechpercent");
	var profit=__excel.getCellValue("sale___profisalespercent");
	company=company==''?0.00:parseFloat(company);
	market=market==''?0.00:parseFloat(market);
	tech=tech==''?0.00:parseFloat(tech);
	profit=profit==''?0.00:parseFloat(profit);
	var total=company+market+tech+profit;
	if(total==100){
		return true;
	}else{
		alert("利润空间分配比例总和必须为100%！");
		return false;
	}
	var reason=__excel.getCellValue("adjust___adjustreason");
	if(reason){
		alert("调整原因不能为空！");
		return false;
	}
}
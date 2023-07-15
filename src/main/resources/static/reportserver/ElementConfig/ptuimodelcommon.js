var BaseUtil = function(){

};
var __excel;
var __bindingJson;
var __excelData;
var __pageId;
var dsIds;
var dataSetMapping;
BaseUtil.onready = function(func){
	if ( document.addEventListener ) {

		// A fallback to window.onload, that will always work
		window.addEventListener( "load", func, false );

	// If IE event model is used
	} else if ( document.attachEvent ) {

		// A fallback to window.onload, that will always work
		window.attachEvent( "onload", func );
	}


};

BaseUtil.extend = function(data1,data2){
	for(var attr in data2){
		data1[attr] = data2[attr];
	}
	return data1;
};

BaseUtil.bindEvent = function(element,eventName,func){
	if(element){
		if ( document.addEventListener ) {
			// A fallback to window.onload, that will always work
			element.addEventListener( eventName, func, false );

			// If IE event model is used
		} else if ( document.attachEvent ) {

			// A fallback to window.onload, that will always work
			element.attachEvent( "on" + eventName, func );
		}
	}
};

BaseUtil.checkGridAttrNotNull = function(gridId,attrStr){
	var grid = get(gridId);
	var gridData = grid.getData();
	var needCheckAttrArr = attrStr.split(',');
	for(var i = 0;i<gridData.length;i++ ){
		var data = gridData[i];
		for(var j = 0;j<needCheckAttrArr.length;j++ ){
			var attr = needCheckAttrArr[j];
			var value = data[attr];
			if(value == null || value == '' || value =='null'){
				return false;
			}
		}
	}
	return true;
};
if(!window.pt.uimodel){
	pt.uimodel = {};
}

function excelBodyDblclick(){
		var body = document.body;
		EventUtil.addEventHandler(body,"dblclick",excelSetEditControl);
}

pt.uimodel.save = save;
pt.uimodel.formLoad = formLoad;
pt.uimodel.formInit = formInit;
pt.uimodel.gridLoad = gridLoad;
pt.uimodel.pageLoad = pageLoad;
pt.uimodel.creatButtonEvent = creatButtonEvent;
pt.uimodel.removeButtonEvent = removeButtonEvent;
pt.uimodel.setPageData = setPageData;
pt.uimodel.onready = BaseUtil.onready;
pt.uimodel.excelSetEditControl = excelSetEditControl;
pt.uimodel.excelTable = function(){
	var excelTableArray = document.getElementsByTagName("table");
	if (excelTableArray) {
		var excelTable = excelTableArray[0];
		var id = excelTable.getAttribute("id");
		var excel = getExcel(id);
		return excel;
	}
};
pt.uimodel.pageInfoFunc = function(){
	var idAndDataSet = function(elemTagFilter){
		var retr = {};
		var formIdArr = [];
		var datasetIdArr = [];
		var formIdAndDataSetMap = {};
		retr.formIdArr = formIdArr;
		retr.datasetIdArr = datasetIdArr;
		retr.mapping = formIdAndDataSetMap;
		$(elemTagFilter).each(function(index,elem){
			var id = $(elem).attr("id");
			var datasetId = $(elem).attr("dataset");
			formIdArr.push(id);
			if(jQuery.inArray(datasetId, datasetIdArr) == -1){
				datasetIdArr.push(datasetId);
			}
			if(!formIdAndDataSetMap[datasetId]){
				formIdAndDataSetMap[datasetId] = [];
			}
			formIdAndDataSetMap[datasetId].push(id);
		});
		return retr;
	};
	return {
		formInfo : idAndDataSet("form[dataset]"),
		gridInfo : idAndDataSet("table[dataset]")
	}
};

function getTop(e){
	var offset = e.offsetTop;
	if(e.offsetParent!=null){
		offset+=getTop(e.offsetParent);
	}
	return offset;
}
function getLeft(e){
	var offset = e.offsetLeft;
	if(e.offsetParent!=null){
		offset+=getLeft(e.offsetParent);
	}
	return offset;
}
function InsertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild==targetElement){
		parent.appendChild(newElement,targetElement);
	}
	else
	{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}
function excelSetEditControl(){
	var oEvent = EventUtil.getEvent();
	var src = oEvent.target;
	if(oEvent.type == "dblclick")
	{
		if (src.id) {
			var excelTable = pt.uimodel.excelTable;
			var elebindinfo = excelTable.elebindinfo[src.id];
			if(elebindinfo.type && elebindinfo.type == "PTUITextField"){
				var positionLeft = getLeft(src);
				var positionTop = getTop(src);
				var positionWidth = src.offsetWidth;
				var positionHeight = src.offsetHeight;
				if(excelTable.Input)
				{
					if(excelTable.Input.inputnode.name == src.id)
					{
						excelTable.Input.setInputNodeValue()
					}
					else
					{
						excelTable.Input.setInputNodeName(src.id);
						excelTable.Input.setInputNodePosition(positionTop,positionLeft,positionWidth,positionHeight);
						excelTable.Input.setInputNodeValue();
					}
				}
				else
				{
					var input = document.createElement("input");
					input.type = "text";
					input.style.position = "absolute";
					var textnode = excelTable.getHtmlNode(3,src);
					InsertAfter(input,excelTable.obj);
					excelTable.Input = new Input(input,textnode);
					excelTable.Input.setInputNodeName(src.id);
					excelTable.Input.setInputNodePosition(positionTop,positionLeft,positionWidth,positionHeight);
					excelTable.Input.setInputNodeValue();
				}
			}
		}
	}
}

function getFormIdList() {
	var formIdList=[];
	var forms = document.forms;
	for(var i =0;i<forms.length;i++){
	    var formId = forms[i].getAttribute("id");
	    formIdList.push(formId);
	}
	return formIdList;
}
function getGridIdList(){
	 var gridIdList = [];
	 var grids = document.getElementsByTagName("table");
	 if(grids==null||grids==undefined){
		 grids = document.getElementsByTagName("TABLE");
	 }
	 for(var m = 0 ; m < grids.length ; m ++){
		 var g = grids[m];
		 var c = g.getAttribute("class");
		 if(c==null)c = g.className;
		 if(c.indexOf("pt_dataset")!=-1){
			 	var gridId = g.getAttribute("id");
			 	gridIdList.push(gridId);
		 }
	 }
	 return gridIdList;
}

function getExcelFormData(){
	var formData={};
	if(__excel.dataSetMapping){
		var subData=__excel.getSubmitData();
		var formIdArr = [];
		if(__excel.dataSetMapping["formIdList"]!=null&&__excel.dataSetMapping["formIdList"]!=undefined&&__excel.dataSetMapping["formIdList"]!=""){
			formIdArr = __excel.dataSetMapping["formIdList"].split(",");
		};
		for(var i=0;i<formIdArr.length;i++){
			var dsId=formIdArr[i];
			formData[dsId]=subData[dsId];
		}
	}
	return formData;
}

function getFormData(state) {
	var formData={};
	var formInfo = pt.uimodel.pageInfo.formInfo;
	var datasetIdArr = formInfo.datasetIdArr;
	for(var i =0;i<datasetIdArr.length;i++){
	    var dataSetId = datasetIdArr[i];
	    var formIdArr = formInfo.mapping[dataSetId];

	    var dataMap={};
	    var obj = {};
	    $.each(formIdArr,function(index,formId){
	    	var form = get(formId);
	    	var d = form.getData();
	    	for(var j = 0; j < d.length;j++){
	    		var value=d[j].value;
	    		if( (typeof value)=="string" && value.indexOf("\\")!=-1){
	    			var reg=new RegExp(/\\/g);
	    			value=value.replace(reg,"\\\\");
	    		}
	    		if(value != null){
	    			if((typeof value)=="string"&&value.indexOf("\n")!=-1){
	    				value=value.replaceAll("\n","\\n");
	    				if(value.indexOf("\r")){
	    					value=value.replaceAll("\r","");
	    				}
	    			}
	    			obj[d[j].name] = encodeURIComponent(value);
	    		}else{
	    			obj[d[j].name] = value;
	    		}

	    	}
	    });
    	var dataList=[];
    	if(state[dataSetId]!=undefined){
    		var sta=state[formId];
    		dataList[0]=obj;
    		dataMap[sta+"Data"]=dataList;
    	}else{
    		var sta=state["default"];
    		if(sta){
    			dataList[0]=obj;
        		dataMap[sta+"Data"]=dataList;
    		}
    	}
	    formData[dataSetId] =dataMap;
	}
	return formData;
}
function getGridData() {
	 var gridData = {};
	 var gridInfo = pt.uimodel.pageInfo.gridInfo;
	 var datasetIdArr = gridInfo.datasetIdArr;
	 for(var m = 0 ; m < datasetIdArr.length ; m ++){
		var datasetId = datasetIdArr[m];
	 	var gridId = gridInfo.mapping[datasetId][0];
		var gridObject = get(gridId);
		var data = {};
		var insertArray = gridObject.getChanges("inserted");
		var updateArray = gridObject.getChanges("updated");
		var deleteArray = gridObject.getChanges("deleted");
		data.insertData = insertArray;
		data.updateData = updateArray;
		data.deleteData = deleteArray;
		gridData[datasetId] = data;

	 }
		return gridData;
}
function transformParams2Obj(params) {
		if(params.constructor == String){
			return  eval("(" + params + ")");
		}
		return params;
}
Array.prototype.each = function(method, instance) {
    for (var i = 0, l = this.length; i < l; i++) {
        var elt = this[i];
        if (typeof(elt) !== 'undefined') {
            if(method.call(instance, elt, i, this) === false) break;
        }
    }
}
//1.var excel = get('a');
//2.获取外观和绑定，excel控件对应数据集信息
//3.excel.renderTo('__excelContainer'，外观数据);
//4.延迟setTimeout("abc()",100);
//5.加载excel.load(绑定信息，excelData);//excelData是pageData+excel控件对应数据集信息
function excelWidgetRenderAndLoad(pageId,pageData,usage) {
	__excel = getExcel("a");
	__pageId = pageId;
	if (__excel) {
		$.ajax({
			async : false,
			type : "POST",
			url :  clientpath+"/uimodelpage/excelwidget/action/ExcelWidgetAction",
			data : "pageId=" + pageId + "&op=getViewJsonAndBindingJson",
			success : function(context) {
				var result = $.parseJSON(context);
				if (result.success) {
					__bindingJson = result.bindingJson;
					var viewJson = result.viewJson;
					var dsIds = result.dsIds;
					__excel.usage = usage;
					__excel.renderTo('__excelContainer', viewJson);
					__excelData ;
					var dsIdsArr = dsIds.split(",");
					for ( var dsId in pageData) {
						if ($.inArray(dsId, dsIdsArr) != -1) {
							if(__excelData==undefined){
								__excelData={};
							}
							__excelData[dsId] = pageData[dsId]["rows"];
						}
					}
					setTimeout("__excelLoad(__excel,__bindingJson,__excelData,__pageId)",100);
					__excel.dataSetMapping=$.parseJSON(result.dataSetMapping);
				}
			}
		});
	}
}

function excelWidgetRender(params,isLoadData) {
	var pageId = params.pageId;
	var usage = params.usage;
	__excel = getExcel("a");
	__pageId = pageId;
	if (__excel) {
		$.ajax({
			async : false,
			type : "POST",
			url :  clientpath+"/clientrest"+spingmvcconfigpostfix,
			data : "pageId=" + pageId + "&op=getViewJsonAndBindingJson",
			success : function(context) {
				var result = $.parseJSON(context);
				if (result.success) {
					__bindingJson = result.bindingJson;
					var serverURL = result.serverURL;
					var viewJson = result.viewJson;
					var hiddenconfig = result.hiddenconfig;
					var dsconfig = result.dsconfig;
					dsIds = result.dsIds;
					__excel.usage = usage;
					__excel.renderTo('__excelContainer', viewJson, serverURL);
					__excel.initHiddenWidget('__excelContainer', hiddenconfig, dsconfig);
					dataSetMapping=result.dataSetMapping;
					if(isLoadData){
						pageLoad(params);
					}
				}
			}
		});
	}
}

function excelWidgetLoad(pageData) {
	if (__excel) {
		__excelData ;
		var dsIdsArr = dsIds.split(",");
		for ( var dsId in pageData) {
			if ($.inArray(dsId, dsIdsArr) != -1) {
				if(__excelData==undefined){
					__excelData={};
				}
				__excelData[dsId] = pageData[dsId]["rows"];
			}
		}
		setTimeout("__excelLoad(__excel,__bindingJson,__excelData,__pageId)",100);
		__excel.dataSetMapping=$.parseJSON(dataSetMapping);
	}
}

function __excelLoad(excel,bindingJson,excelData,pageId){
	excel.load(bindingJson, excelData,pageId);
	excel.initHiddenWidgetData(excelData);
	//setTimeout("__choose()",100);

}
/*
	 * type:function;
	 * id:save;
	 * name:保存;
	 * tips:保存;
	 * params:[{id:'closed',name:'是否关闭当前页面',value:'true'},{id:'parameter',name:'页面参数',value:''},{id:'isexcel',name:'页面参数',value:''},{id:'showTooltip',name:'是否弹出提示框',value:'true'},{id:'callback',name:'回调函数',value:''}];
	 * imageSrc:/clientrest.jsp?op=resource&path=/css/images/page_white_acrobat.png;
	 * description:保存页面数据;
 */
  function save(closed,parameter,isexcel,showTooltip,callback){
	  if(!validateAll()){
		  return false;
	  }
	  var paramsJson ={};
	  if(parameter!=undefined&&parameter!=null&&parameter!=""){
		  paramsJson=transformParams2Obj(parameter);
	  }
	  BaseUtil.extend(paramsJson,window.params);;
	  var formData={};
	  if(paramsJson.usage && paramsJson.usage=="edit"){
		  formData = getFormData({"default":"update"});
	  }else if(paramsJson.usage && paramsJson.usage=="add"){
		  formData = getFormData({"default":"insert"});
	  }
	var gridData = getGridData();
	//搜集excel控件数据
	if(__excel){
		if(__excel.dataSetMapping){
			var subData=__excel.getSubmitData();
			var formIdArr = [];
			var gridIdArr = [];
			if(__excel.dataSetMapping["formIdList"]!=null&&__excel.dataSetMapping["formIdList"]!=undefined&&__excel.dataSetMapping["formIdList"]!=""){
				formIdArr = __excel.dataSetMapping["formIdList"].split(",");
			};
			if(__excel.dataSetMapping["gridIdList"]!=null&&__excel.dataSetMapping["gridIdList"]!=undefined&&__excel.dataSetMapping["gridIdList"]!=""){
				gridIdArr = __excel.dataSetMapping["gridIdList"].split(",");
			};
			for(var i=0;i<formIdArr.length;i++){
				var dsId=formIdArr[i];
				formData[dsId]=subData[dsId];
			}
			for(var i=0;i<gridIdArr.length;i++){
				if(gridData==undefined){
					gridData={};
				}
				var dsId=gridIdArr[i];
				gridData[dsId]=subData[dsId];
			}
		}
	}


	var sceneId = "";
	var pageId= paramsJson.pageId;

	var url = clientpath+"/clientrest"+spingmvcconfigpostfix+"?op=Save";
	var params = "sceneId=" + sceneId + "&formData=" + encodeURIComponent(encodeURIComponent(UI.JSON.encode(formData))) +
	"&gridData=" + encodeURIComponent(encodeURIComponent(UI.JSON.encode(gridData))) + "&pageId=" + pageId + "&params=" +encodeURIComponent(encodeURIComponent(UI.JSON.encode(paramsJson)));
	var a = new Ajax(url,params);
	var r = false;
	a.success = function(result){
		var tipInfo = result.tipInfo;
		r = true;
		if (showTooltip==undefined||showTooltip == true||showTooltip=="true") {
			if(tipInfo != null && tipInfo!='' && tipInfo != 'null' ){
				alert(tipInfo);
			}else{
				alert("保存成功！");
 			}
		}
		if(__excel){
            var simpledata = __excel.getSimpleData();
            refreshExcel();
            callback(simpledata);
        }else{
            callback();
        }
        try{
            opener.parent.treeFresh();
        }catch (e) {

        }
	};
	a.failure = function(result){
		var errorInfo = result.info;
		if(errorInfo != null && errorInfo!='' && errorInfo != 'null' ){
			alert(errorInfo);
		}else{
			alert("数据格式不正确，数据未保存!");
		}
	};
	a.post();
	if (closed == true||closed=="true") {
		window.returnValue = true;
		if(isexcel == true || isexcel == "true"){
			opener.location.reload();
		}
		window.close();
	}
	return r;
  }

  /*
	 * type:function;
	 * id: formLoad;
	 * name:表单加载;
	 * tips:表单加载;
	 * imageSrc:/clientrest.jsp?op=resource&path=/css/images/page_white_acrobat.png;
	 * description:加载表单数据;
	 * params:[{id:'parameter',name:'表单加载参数'},{id:'formIds',name:'需要加载的表单集合，多个表单用逗号分隔'}];
 */
  function formLoad(formIds,parameter){
	  	var paramsJson ={};
		if(parameter!=undefined&&parameter!=null&&parameter!=""){
			paramsJson=transformParams2Obj(parameter);
		}
		BaseUtil.extend(paramsJson,window.params);;
	  	var formData = getFormData({"default":"update"});
	    var scenceId =pt.uimodel.sceneId;
		var pageId = paramsJson.pageId;
		var extendsParams = {
			"scenceId" : scenceId,
			"pageId" : pageId,
			"params" : pt.uimodel.parameters,
			"extendsParams":UI.JSON.encode(paramsJson),
			"formData" : encodeURIComponent(UI.JSON.encode(formData))
		};
		var formArr = null;
		if(formIds != null && formIds!=''){
			formArr = formIds.split(",");
		}

		var url = clientpath+"/clientrest"+springmvcconfigpostfix+"?op=FormLoad";
		var forms = document.forms;
		for(var i =0;i<forms.length;i++){
		    var formId = forms[i].getAttribute("id");
		    if(typeof formId != "string"){
		    	formId = forms[i].getAttribute("ui");
		    }
		    var datasetId = forms[i].getAttribute("dataset");
			if(formArr == null || -1!=formArr.toString().indexOf(formId)){
				var form = get(formId);
				var temp = {};
     			temp = BaseUtil.extend(temp,extendsParams);
     			temp.formId = dataset;
				form.ajaxLoad(url,temp);
			}
		}

  }

  /*
	 * type:function;
	 * id: formLoadOrInit;
	 * name:根据场景执行相关的初始化或加载服务;
	 * tips:根据场景执行相关的初始化或加载服务;
	 * imageSrc:/clientrest.jsp?op=resource&path=/css/images/page_white_acrobat.png;
	 * description:根据场景执行相关的初始化或加载服务;
	 * params:[{id:'parameter',name:'表单加载参数'},{id:'formIds',name:'需要加载的表单集合，多个表单用逗号分隔'}];
*/
function formLoadOrInit(formIds,parameter){
		var paramsJson ={};
		if(parameter!=undefined&&parameter!=null&&parameter!=""){
			paramsJson=transformParams2Obj(parameter);
		}
		BaseUtil.extend(paramsJson,window.params);;
		if(paramsJson.usage && paramsJson.usage=="add"){
			formInit(formIds,paramsJson);
		}else{
			formLoad(formIds,paramsJson);
		}
}

  /*
	 * type:function;
	 * id: formInit;
	 * name:表单初始化;
	 * tips:表单初始化;
	 * imageSrc:/clientrest.jsp?op=resource&path=/css/images/page_white_acrobat.png;
	 * description:加载表单数据;
	 * params:[{id:'parameter',name:'参数',value:''},{id:'formIds',name:'表单集合，多个表单用逗号分隔'}];
*/
function formInit(formIds,parameter){
		var paramsJson ={};
		if(parameter!=undefined&&parameter!=null&&parameter!=""){
			paramsJson=transformParams2Obj(parameter);
		}
		BaseUtil.extend(paramsJson,window.params);;
        var formData = getFormData({"form":"insert"});
	    var sceneId =pt.uimodel.sceneId;
		var pageId= paramsJson.pageId;
		var pageData={};
		if(!formIds){
			var pageInfo = pt.uimodel.pageInfo;
			var datasetIdArr = pageInfo.formInfo.datasetIdArr;
			var url = clientpath+"/clientrest"+spingmvcconfigpostfix+"?op=FormInit";
			for(var i=0;i<datasetIdArr.length;i++){
				var datasetId=datasetIdArr[i];
				pageData[datasetId]=[];
				var formIdArr = pageInfo.formInfo.mapping[datasetId];
				$.ajax({
					type:"post",
					url:url,
					data:{
						"sceneId" : sceneId,
						"pageId" : pageId,
						"params" : pt.uimodel.parameters,
						"extendsParams":UI.JSON.encode(paramsJson),
						"formData" : UI.JSON.encode(formData),
	     			    "formId" : datasetId
					  },
					success :function(retr){
						retr = UI.JSON.decode(retr);
						pageData[datasetId].push(retr);
						$.each(formIdArr,function(index,formId){
							var form=get(formId);
							form.setData(retr);
						});
						if(parameter.isExcel=="true"){
							//如果有excel 控件，excel 控件渲染和加载
							excelWidgetRenderAndLoad(pageId,pageData,paramsJson.usage);
						}
						if(window.afterPageLoad){
							setTimeout("afterPageLoad()",500);
						}
					  }
					}
				)
			}
		}

}

/*
 * type:function;
 * id: pageLoad;
 * name:页面加载;
 * tips:页面加载;
 * imageSrc:/clientrest.jsp?op=resource&path=/css/images/page_white_acrobat.png;
 * description:页面加载，（包含表单初始化）;
 * params:[{id:'parameter',name:'参数',value:''}];
 */
function pageLoad(parameter){
	var paramsJson ={};
	if(parameter!=undefined&&parameter!=null&&parameter!=""){
		paramsJson=transformParams2Obj(parameter);
	}
	BaseUtil.extend(paramsJson,window.params);;
	// 去掉nodeInfo 属性
	for(var arr in paramsJson){
		if(arr=="nodeInfo"){
			delete paramsJson[arr];
		}
	}
	var sceneId =pt.uimodel.sceneId;
	var pageId= paramsJson.pageId;
	var pageInfo = pt.uimodel.pageInfo;
	var gridDataSetArr=pageInfo.gridInfo.datasetIdArr;
	var formDataSetArr=pageInfo.formInfo.datasetIdArr;
	paramsJson["sceneId"]=sceneId;
	paramsJson["formIdList"]=formDataSetArr.toString();
	paramsJson["gridIdList"]=gridDataSetArr.toString();
	//列表的分页信息传递
	for(var i=0;i<gridDataSetArr.length;i++){
		var gridParamsJson = {};
		BaseUtil.extend(gridParamsJson,paramsJson);
		var dataSetId = gridDataSetArr[i];
		var gridId = pageInfo.gridInfo.mapping[dataSetId][0];
		var grid=get(gridId);
		paramsJson[dataSetId]=gridParamsJson;
		grid.basicParam = gridParamsJson;
		if(grid!=undefined){
			var pageSize="";
			var tf = document.getElementById(gridId).tFoot;
			if(tf){
				var inputs = tf.getElementsByTagName("input");
				var ip;
				for(var j = 0 ; j < inputs.length ;j++){
					ip = inputs[j];
					if(ip.getAttribute("sizer")!=null){
						pageSize = ip.value;
						break;
					}
				}
			}
			if(pageSize!=undefined&&pageSize!=null&&pageSize!=""){
				 compute(grid.id,grid.pagingBar);
				 if(grid.param&&grid.param.length>0)grid.param+="&";
				 grid.param = grid.param + "start=" +grid.pagingBar.start + "&limit=" + grid.pagingBar.size;
				 gridParamsJson["start"]=String(grid.pagingBar.start);
				 gridParamsJson["limit"]=String(grid.pagingBar.size);
			}


		}
	}


	//列表的分页信息传递结束
	var url = clientpath+"/clientrest"+spingmvcconfigpostfix+"?op=PageLoad";
	pt.ui.ajax({
		type:"post",
		url:url,
		data:{
			"sceneId" : sceneId,
			"pageId" : pageId,
			"params" : pt.uimodel.parameters,
			"extendsParams":encodeURIComponent(UI.JSON.encode(paramsJson))
		},
		success : function(result){
			var processVars = [];
			try{
				processVars = parent.globe.workflow.todo.getEFormVaribles();
			}catch(error){

			}
			var pageData=result.pageData;
			//先加载表单
			var datasetIdArr = pageInfo.formInfo.datasetIdArr;
			for(var i=0;i<datasetIdArr.length;i++){
				var datasetId=datasetIdArr[i];
				var data=pageData[datasetId];
				if(data!=undefined){
					var formIdArr = pageInfo.formInfo.mapping[datasetId];
					$.each(formIdArr,function(index,formId){
						var form=get(formId);
						form.setData(data.rows[0]);
						try{
							for(var j = 0 ; j < processVars.length ; j ++){
								form.setFieldValue(processVars[j]["fieldAttrId"],processVars[j]["sourceVariableValue"]);
							}
						}catch(error){

						}

					});
				}
			}
			//加载列表
			var gridDatasetIdArr = pageInfo.gridInfo.datasetIdArr;
			for(var i=0;i<gridDatasetIdArr.length;i++){
				var datasetId=gridDatasetIdArr[i];
				var data=pageData[datasetId];
				var gridId = pageInfo.gridInfo.mapping[datasetId][0];

				var grid=get(gridId);
				var gridParamsJson={};
				if(paramsJson[gridId]!=undefined){
					BaseUtil.extend(gridParamsJson,paramsJson[gridId])
				}else{
					BaseUtil.extend(gridParamsJson,paramsJson);
				}
				BaseUtil.extend(gridParamsJson,{'gridId':datasetId});

				for(var attr in gridParamsJson){
					if(attr=="start"||attr=="limit"){
						delete gridParamsJson[attr];
					}
				}


	   			grid.basicParam = gridParamsJson;
	   			grid.url = clientpath+"/clientrest"+spingmvcconfigpostfix+"?op=GridLoad";
				if(grid!=undefined&&data!=null){
					//设置页脚
					var pageSize;
					var tf = document.getElementById(gridId).tFoot;
					if(tf){
						var inputs = tf.getElementsByTagName("input");
						var ip;
						for(var j = 0 ; j < inputs.length ;j++){
							ip = inputs[j];
							if(ip.getAttribute("sizer")!=null){
								pageSize = ip.value;
								break;
							}
						}
					}
					if(pageSize!=undefined&&pageSize!=null&&pageSize!=""){
						 compute(grid.id,grid.pagingBar,0,pageSize,parseInt(data.total));
						 if(grid.param&&grid.param.length>0)grid.param+="&";
						 grid.param = grid.param + "start=" +grid.pagingBar.start + "&limit=" + grid.pagingBar.size;
					}
					if(data.total!=undefined){
						 grid.pagingBar.total = parseInt(data.total);
					 }
					grid.setData(data.rows);
				}
			}
			if(parameter.isExcel=="true"){
				//如果有excel 控件，excel 控件渲染和加载
				excelWidgetLoad(pageData);
			}
			if(window.afterPageLoad){
				//延迟
				setTimeout("afterPageLoad()",500);
			}
		},
		failure : function(result){
			alert("页面加载数据失败！");
		}
	});


}

 /*
	 * type:function;
	 * id: gridLoad;
	 * name:列表加载;
	 * tips:列表加载;
	 * imageSrc:/clientrest.jsp?op=resource&path=/css/images/page_white_acrobat.png;
	 * description:对象列表加载;
	 * params:[{id:'gridIds',name:'列表标识，多个以逗号分隔',value:''},{id:'parameter',name:'参数',value:''}];
 */
function gridLoad(gridIds,parameter){
	var paramsJson ={};
	if(parameter!=undefined&&parameter!=null&&parameter!=""){
		paramsJson=transformParams2Obj(parameter);
	}
	BaseUtil.extend(paramsJson,window.params);;
	var formData = getFormData();
    var scenceId =pt.uimodel.sceneId;
	var pageId= paramsJson.pageId;
	var extendsParams = {
		"scenceId" : scenceId,
		"pageId" : pageId,
		"params" : pt.uimodel.parameters,
		"extendsParams":UI.JSON.encode(paramsJson),
		"formData" : encodeURIComponent(UI.JSON.encode(formData))
	};

	var url = clientpath+"/clientrest"+spingmvcconfigpostfix+"?op=GridLoad";
	var gridArr = null;
	if(gridIds != null && gridIds!=''){
		gridArr = gridIds.split(",");
	}

	var grids = document.getElementsByTagName("table");
	if(grids==null||grids==undefined){
		grids = document.getElementsByTagName("TABLE");
	}
	for(var i = 0 ; i < grids.length ; i ++){
		var g = grids[i];
		var c = g.getAttribute("class");
		if(c==null)c = g.className;
		if(c.indexOf("pt_dataset")!=-1){
			var gid = g.getAttribute("id");
			if (gid == null || gid == undefined || gid == '') {
				 continue;
			}
			if(gridArr == null || (gridIds.indexOf(gid)>=0)){
				var datasetId = g.getAttribute("dataset");
				var grid = get(gid);
				var temp = {};

				temp = BaseUtil.extend(temp,extendsParams);
				temp = BaseUtil.extend(temp,paramsJson);
				temp.gridId = datasetId;
				grid.basicParam = temp;
				grid.load(url);
			}
		}
	}
}
/*
	 * type:function;
	 * id:creatButtonEvent;
	 * name:增加子对象项;
	 * tips:增加子对象项;
	 * imageSrc:/clientrest.jsp?op=resource&path=/css/images/page_white_acrobat.png;
	 * description:增加子对象项;
	 * params:[{id:'gridIds',name:'列表标识，多个以逗号分隔'},{id:'parameter',name:'参数',value:''}];
*/
function creatButtonEvent(gridIds,parameter){
	var paramsJson ={};
	if(parameter!=undefined&&parameter!=null&&parameter!=""){
		paramsJson=transformParams2Obj(parameter);
	}
	BaseUtil.extend(paramsJson,window.params);;
	var formData = getFormData({"form":"insert"});
    var scenceId =pt.uimodel.sceneId;
	var pageId= paramsJson.pageId;
	var extendsParams = {
		"scenceId" : scenceId,
		"pageId" : pageId,
		"params" : pt.uimodel.parameters,
		"extendsParams":UI.JSON.encode(paramsJson),
		"formData" : encodeURIComponent(UI.JSON.encode(formData))
	};
	var gridArr = null;
	if(gridIds != null && gridIds!=''){
		gridArr = gridIds.split(",");
	}
	var url = clientpath+"/clientrest"+spingmvcconfigpostfix+"?op=FormInit";
	var grids = document.getElementsByTagName("table");
	if(grids==null||grids==undefined){
		 grids = document.getElementsByTagName("TABLE");
	 }
	 for(var i = 0 ; i < grids.length ; i ++){
		 var g = grids[i];
		 var gridid = g.getAttribute("id");
		 if (gridid == null || gridid == undefined || gridid == '') {
			 continue;
		 }
		 if(gridArr == null || (gridIds.indexOf(gridid)>=0)){
			var temp = {};
		temp = BaseUtil.extend(temp,extendsParams);
		temp.formId = g.getAttribute("dataset");
			var a = new Ajax({url:url,data:temp});
			var result = a.post();
			if(result!=""){
				result = JSON.decode(result);
				get(gridid).appendRow(result);
			}
		}
	}

}

/*
	 * type:function;
	 * id:removeButtonEvent;
	 * name:删除子对象项;
	 * tips:删除子对象项;
	 * params:[{id:'gridId',name:'子对象列表标识'}];
	 * imageSrc:/clientrest.jsp?op=resource&path=/css/images/page_white_acrobat.png;
	 * description:删除子对象项;
*/

function  removeButtonEvent(gridId) {
		var grid = get(gridId);
		var selections = grid.getSelections();
		if(0 ==selections.length){
			alert("请选择需要删除的数据");
		}else{
			for(var j=selections.length-1;j>=0;j--){
				grid.deleteRow(selections[j]);
			}
		}
	}

/*
 * type:function;
 * id: windowClose;
 * name:关闭窗口;
 * tips:关闭;
 * imageSrc:/clientrest.jsp?op=resource&path=/css/images/page_white_acrobat.png;
 * description:关闭当前窗口;
 */
function windowClose() {
	 window.close();
 }
/*
 * type:function;
 * id: windowPrint;
 * name:打印当前页;
 * tips:打印;
 * imageSrc:/clientrest.jsp?op=resource&path=/css/images/page_white_acrobat.png;
 * description:打印当前页;
 */
function windowPrint() {
	 if($("div[id^='PTUIToolbar']")){
     		$("div[id^='PTUIToolbar']").hide();
     	}
     	if($("div[id^='PTUIButton']")){
     		$("div[id^='PTUIButton']").hide();
     	}
     	window.print();
     	if($("div[id^='PTUIToolbar']")){
     		$("div[id^='PTUIToolbar']").show();
     	}
     	if($("div[id^='PTUIButton']")){
     		$("div[id^='PTUIButton']").show();
     	}
 }

/*
 * type:function;
 * id:setPageData;
 * name:同步加载时为表单列表赋值;
 * tips:同步加载时为表单列表赋值;
 * params:[{id:'formdataStr',name:'表单数据串',value:''}];
 * imageSrc:/clientrest.jsp?op=resource&path=/css/images/page_white_acrobat.png;
 * description:加载表单数据;
 */
function  setPageData(formdataStr){
	formdataStr = JSON.decode(formdataStr);
	for(var i in formdataStr){
		var widget = get(i);
		widget.setData(formdataStr[i]);
	}
}
 //excel权限校验
 //@param permissionsValidation,cellId定义页面中单元格标识，如'$D$4'
 //返回d 标识缺省  返回r 标识只读，返回h 表示隐藏,""表示校验通过
function permissionsValidateExcel(permissionsValidation,cellId){
	var roleStr=window.params.role;
	if(roleStr==undefined||roleStr==""||cellId==undefined||cellId==""){
		return "";
	}
	if(permissionsValidation==undefined||permissionsValidation==""){
		return "";
	}
	if((typeof permissionsValidation)=="string"){
		permissionsValidation = UI.JSON.decode(permissionsValidation);
	}
	for(var role in  permissionsValidation){
		if(role.toLowerCase()==roleStr.toLowerCase()){//角色正确
			var permArr=permissionsValidation[role];
			for(var i=0;i<permArr.length;i++){
				var perm=permArr[i];
				for(var per in perm){
					var widgetId=per;
					if(cellId==widgetId){//控件正确
						var widgetPer=perm[widgetId];
						if(widgetPer=="READONLY"||widgetPer=="readonly"||widgetPer=="DISABLED"||widgetPer=="disabled"){
							return "r";
						}
						if(widgetPer=="HIDDEN"||widgetPer=="hidden"){
							return "h";
						}
						if(widgetPer=="DEFAULT"||widgetPer=="default"){
							return "d";
						}
					}
				}
			}
		}
	}
	return "";
}

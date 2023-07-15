var _contextPath = document.location.pathname;
var index = _contextPath.substr(1).indexOf("/");
_contextPath = _contextPath.substr(0, index + 1);
if (_contextPath.substr(0, 1) != "/") {
	_contextPath = "/" + _contextPath;// 增加模态窗口打开时地址的判断.ie模态打卡，前面没有 '/'
}
var path, match;

function Excel(id) {
	_Map[id] = this;
	this.id = id;
	this.records = [];
	this.bindings = [];
	this.selections = [];
	this.submitData = {};
	this.dataSetMapping = {};
	this.optionItemMap = {};
	this.usage = "add";
	this.url = "";
	this.c_lTabs = 0;
	this.c_rgszClr = new Array(8);
	this.c_rgszClr[0] = "window";
	this.c_rgszClr[1] = "buttonface";
	this.c_rgszClr[2] = "windowframe";
	this.c_rgszClr[3] = "windowtext";
	this.c_rgszClr[4] = "threedlightshadow";
	this.c_rgszClr[5] = "threedhighlight";
	this.c_rgszClr[6] = "threeddarkshadow";
	this.c_rgszClr[7] = "threedshadow";
	this.g_iShCur = 0;
	this.g_rglTabX = [];
	this.c_rgszSh = [];
	this.page_Id="";
	this.cellIIdMap = {};
	this.colIndexMap = {};
	var excel = this;
	this.hiddenconfig="";
	this.dsconfig="";
	
	this.reset = function(){
		this.id = id;
		this.records = [];
		this.bindings = [];
		this.selections = [];
		this.submitData = {};
		this.dataSetMapping = {};
		this.optionItemMap = {};
		this.usage = "add";
		this.url = "";
		this.c_lTabs = 0;
		this.c_rgszClr = new Array(8);
		this.c_rgszClr[0] = "window";
		this.c_rgszClr[1] = "buttonface";
		this.c_rgszClr[2] = "windowframe";
		this.c_rgszClr[3] = "windowtext";
		this.c_rgszClr[4] = "threedlightshadow";
		this.c_rgszClr[5] = "threedhighlight";
		this.c_rgszClr[6] = "threeddarkshadow";
		this.c_rgszClr[7] = "threedshadow";
		this.g_iShCur = 0;
		this.g_rglTabX = [];
		this.c_rgszSh = [];
		this.cellIIdMap = {};
		this.page_Id="";
	}
	
	this.fnBuildTabStrip = function(divid) {
		var szHTML = "";

		for (var i = 0; i < excel.c_lTabs; i++) {
			var sheetID = escape(excel.c_rgszSh[i]).replaceAll("%", "_");
			if (i == 0) {
				szHTML += "<div id='_excel_tabContent_" + sheetID + "'></div>";
			} else {
				szHTML += "<div id='_excel_tabContent_" + sheetID + "' style='display:none'></div>";
			}

		}
		if (excel.c_lTabs > 1) {
			szHTML += "<table id=tbTabs cellpadding=0 cellspacing=0 style=\"table-layout:fixed;\">";

			var iCellCount = (excel.c_lTabs + 1) * 2;

			var i;
			for (i = 0; i < iCellCount; i += 2){
				szHTML += "<col width=1><col>";
			}
			szHTML += "<tr>";
			for (i = 0; i < excel.c_lTabs; i++) {
				szHTML += "<td height=1 nowrap class=\"clBorder\">&nbsp;</td>";
				szHTML += "<td id=tdTab height=1 nowrap class=\"clTab\" onmouseover=\"getExcel('"
						+ id
						+ "').fnMouseOverTab("
						+ i
						+ ");\" onmouseout=\"getExcel('"
						+ id
						+ "').fnMouseOutTab("
						+ i
						+ ");\">"
						+ "<a  style=\"text-decoration:none;color:windowtext;\" href=\"#\" onclick=\"getExcel('"
						+ id
						+ "').fnSetActiveSheet("
						+ i
						+ ")\" id=aTab>&nbsp;"
						+ excel.c_rgszSh[i]
						+ "&nbsp;</a></td>";
			}
			szHTML += "<td id=tdTab height=1 nowrap class=\"clBorder\"><a id=aTab>&nbsp;</a></td><td width=100%></td>";

			szHTML += "</tr>";
			szHTML += "</table>";
		}

		$("#" + divid).append(szHTML);
	};

	this.fnInit = function() {
		this.g_rglTabX[0] = 0;
		var i;
		for (i = 1; i <= this.c_lTabs; i++){
			with (document.all.tbTabs.rows[0].cells[fnTabToCol(i - 1)]){
				this.g_rglTabX[i] = offsetLeft + offsetWidth - 6;
			}
		}
	};

	this.fnMouseOverTab = function(iTab) {
		if (iTab != this.g_iShCur) {
			var iCol = this.fnTabToCol(iTab);
			with (document.all) {
				tdTab[iTab].style.background = this.c_rgszClr[5];
			}
		}
	};

	this.fnMouseOutTab = function(iTab) {
		if (iTab >= 0) {
			var event = getEvent();
			var elFrom = event.srcElement;
			var elTo = event.toElement;

			if ((!elTo) || (elFrom.tagName == elTo.tagName)
					|| (elTo.tagName == "A" && elTo.parentElement != elFrom)
					|| (elFrom.tagName == "A" && elFrom.parentElement != elTo)) {

				if (iTab != this.g_iShCur) {
					with (document.all) {
						tdTab[iTab].style.background = this.c_rgszClr[1];
					}
				}
			}
		}
	};

	this.fnSetTabProps = function(iTab, fActive) {
		if (fActive == true) {
			$("[id*=_excel_tabContent_]").hide();
			$("[id*=_excel_tabContent_]").eq(iTab).show();
		}
		var iCol = this.fnTabToCol(iTab);
		var i;

		if (iTab >= 0) {
			with (document.all) {
				with (tbTabs) {
					with (rows[0]) {
						if (fActive) {
							cells[iCol - 1].style.background = this.c_rgszClr[2];
							cells[iCol].style.background = this.c_rgszClr[0];
							cells[iCol + 1].style.background = this.c_rgszClr[2];
						} else {
							cells[iCol - 1].style.background = this.c_rgszClr[2];
							cells[iCol].style.background = this.c_rgszClr[1];
							cells[iCol + 1].style.background = this.c_rgszClr[2];
						}
					}
				}
				with (aTab[iTab].style) {
					cursor = (fActive ? "default" : "hand");
					color = this.c_rgszClr[3];
				}
			}
		}
	};

	this.fnTabToCol = function(iTab) {
		return 2 * iTab + 1;
	};

	this.fnSetActiveSheet = function(iSh) {
		if (iSh != this.g_iShCur) {
			this.fnSetTabProps(this.g_iShCur, false);
			this.fnSetTabProps(iSh, true);
			this.g_iShCur = iSh;
		}
	};

	this.renderTo = function(divid, result, serverURL) {
		var fillZero = [ "0", "00", "000", "0000", "00000" ];
		var borderStyle = {
			"THIN" : "1px solid",
			"MEDIUM" : "2px solid",
			"THICK" : "3px solid",
			"NONE" : "",
			"DOUBLE" : "2px double"
		};
		result = UI.JSON.decode(result);
		var obj = this;
		obj.containerID = divid;
		var fnBuildTabStrip = this.fnBuildTabStrip;
		for ( var i in result) {
			if(i=="sheets"){
				continue;
			}
			obj.c_lTabs++;
		}

		obj.c_rgszSh = new Array(obj.c_lTabs);
		var index = 0;
		var sheets = result.sheets;
		var sheet = sheets.split(",");
		for (var i=0;i<sheet.length;i++) {
			obj.c_rgszSh[index] = sheet[i];
			index++;
		}
		fnBuildTabStrip(divid);

		for (var m in result) {
			var rows = [];
			var cols = [];
			if(m=="sheets"){
				continue;
			}
			var cells = result[m];
			var sheetID = escape(m).replaceAll("%", "_");
			var sizeInfo = cells[cells.length - 1];
			var columnWidth = sizeInfo.columnWidth.split(",");
			var columnallwidth = 0;
			var rowHeight = sizeInfo.rowHeight.split(",");
			var rowallheight = 0;
			var str = "<table id='" + sheetID + "_" + obj.id + "' cellspacing=\"0\" style=\"word-wrap:break-word;word-break:break-all;margin:0px;padding:0px;border-collapse:collapse;table-layout:fixed\">";
			str += "<tr style='height:0px'>";
			for (var i = 0; i < columnWidth.length; i++) {
				str += "<td style='width:" + columnWidth[i] + "px'></td>";
				columnallwidth = parseFloat(columnallwidth) + parseFloat(columnWidth[i]);
				cols.push(columnallwidth);
			}
			
			for (var i = 0; i < rowHeight.length; i++) {
				rowallheight = parseFloat(rowallheight) + parseFloat(rowHeight[i]);
				rows.push(rowallheight);
			}
			str += "</tr>";
			var startcolindex = cells[0][0]["startColumn"];
			var spanrowindex = 0;
			var cellmap = {};
			var rowmap = {};
			
			this.colIndexMap[sheetID]=startcolindex+","+columnWidth.length;
			
			for (var i = 0; i < cells.length - 2; i++) {
				var row = cells[i];
				if(row.length>0){
					var icell = row[0];
					rowmap[icell.startRow]=1;
				}
			}
			
			for (var i = 0; i < cells.length - 2; i++) {
				var row = cells[i];
				if(row.length>0){
					var icell = row[0];
					for(var t = icell.startRow-1;t>0;t--){
						if(!rowmap[t] || rowmap[t]==0){
							str += "<tr></tr>";
							rowmap[t]=1;
						}
					}
				}
				str += "<tr id="+sheetID+"_"+i+">";
				var endcolindex = 0;
				for (var j = 0; j < row.length; j++) {
					var cell = row[j];
					var colspan = cell.endColumn - cell.startColumn + 1;
					var rowspan = cell.endRow - cell.startRow + 1;
					
					for(var m=cell.startRow;m<=cell.endRow;m++){
						for(var n=cell.startColumn;n<=cell.endColumn;n++){
							cellmap[m+'-'+n]=m+'-'+n;
						}
					}
					
					if(cell.startColumn==startcolindex){
						spanrowindex = cell.endRow;
					}
					cell.rightBorderColor = cell.rightBorderColor.length == 6 ? cell.rightBorderColor
							: fillZero[5 - cell.rightBorderColor.length]
									+ cell.rightBorderColor;
					cell.leftBorderColor = cell.leftBorderColor.length == 6 ? cell.leftBorderColor
							: fillZero[5 - cell.leftBorderColor.length]
									+ cell.leftBorderColor;
					cell.topBorderColor = cell.topBorderColor.length == 6 ? cell.topBorderColor
							: fillZero[5 - cell.topBorderColor.length]
									+ cell.topBorderColor;
					cell.bottomBorderColor = cell.bottomBorderColor.length == 6 ? cell.bottomBorderColor
							: fillZero[5 - cell.bottomBorderColor.length]
									+ cell.bottomBorderColor;
					cell.foreColor = cell.foreColor.length == 6 ? cell.foreColor
							: fillZero[5 - cell.foreColor.length]
									+ cell.foreColor;
					cell.fontColor = cell.fontColor.length == 6 ? cell.fontColor
							: fillZero[5 - cell.fontColor.length]
									+ cell.fontColor;
					
					var border_right = "border-right:"
							+ borderStyle[cell.rightBorderStyle] + " #"
							+ cell.rightBorderColor + ";";
					var border_left = "border-left:"
							+ borderStyle[cell.leftBorderStyle] + " #"
							+ cell.leftBorderColor + ";";
					var border_top = "border-top:"
							+ borderStyle[cell.topBorderStyle] + " #"
							+ cell.topBorderColor + ";";
					var border_bottom = "border-bottom:"
							+ borderStyle[cell.bottomBorderStyle] + " #"
							+ cell.bottomBorderColor + ";";

					var fontFamily = "";
					if (cell.fontName) {
						fontFamily = 'font-family:' + cell.fontName + ';';
					}

					var bold = "";
					if (cell.bold == true) {
						bold = 'font-weight:bold;';
					}

					var underline = "";
					if (cell.underline == true) {
						underline = 'text-decoration:underline;';
					}

					var fontStyle = "";
					if (cell.italic == true) {
						fontStyle = 'font-style:italic;';
					} else if (cell.oblique == true) {
						fontStyle = 'font-style:oblique;';
					}
					cell.cellValue = cell.cellValue.replaceAll("\n", "<br>");
					
					var width = 0;
					for(var k=cell.startColumn;k<=cell.endColumn;k++){
						width+=parseFloat(columnWidth[k-1]);
					}
					var height = 0;
					for(var p=cell.startRow;p<=cell.endRow;p++){
						height+=parseFloat(rowHeight[p]);
					}
					var cellRealId=calculateRealCellId(sheetID,cell.id);
					
					for(var w=endcolindex+1;w<cell.startColumn;w++){
						if(!cellmap[cell.startRow+'-'+w]){
							var emptywidth=parseFloat(columnWidth[w]);
							str += '<td style="width:'+emptywidth+'px;height:'+height+'pt;word-wrap:break-word;word-break:break-all;margin:0px;padding:0px;"></td>';
						}
					}
					
					var iid = sheetID + '_' + cell.id;
					for(var p=cell.startRow;p<=cell.endRow;p++){
						for(var k=cell.startColumn;k<=cell.endColumn;k++){
							this.cellIIdMap[sheetID + '_' + p + '_' +k]=iid;
						}
					}
					
					var cell_value = cell.cellValue;
					if(cell_value.indexOf("#(")==0 && cell_value.indexOf(")")==cell_value.length-1){
						cell_value="";
					}
					var titlevalue = cell_value;
					if(cell_value.indexOf("*")==0){
						cell_value=cell_value.replace("*",'<font color="red">*</font>');
					}
					
					var isWrap = cell.wrap;
					if(isWrap == undefined){
						isWrap = false;
					}
					if(isWrap=="true"){
						str += '<td isWrap="'+isWrap+'" id="' + sheetID + "_" + cellRealId + '" iid="' + iid + '" cellid="'+cell.id+'" colspan="'
								+ colspan + '" rowspan="' + rowspan
								+ '" style="height:'+height+'pt;width:'+width+'px;word-wrap:break-word;word-break:break-all;margin:0px;padding:0px;' + border_right
								+ border_left + border_top + border_bottom
								+ 'color:#' + cell.fontColor + ';' + fontStyle
								+ bold + underline + fontFamily + 'font-size:'
								+ cell.fontSize + 'pt;background-color:#'
								+ cell.foreColor + ';text-align:'
								+ cell.horizontalAlignment + ';vertical-align:' + cell.verticalAlignment + '">' + cell_value
								+ '</td>';
					}else{
						str += '<td isWrap="'+isWrap+'" id="' + sheetID + "_" + cellRealId + '" iid="' + iid + '" cellid="'+cell.id+'" colspan="'
								+ colspan + '" rowspan="' + rowspan
								+ '" style="height:'+height+'pt;width:'+width+'px;word-wrap:break-word;word-break:break-all;margin:0px;padding:0px;' + border_right
								+ border_left + border_top + border_bottom
								+ 'color:#' + cell.fontColor + ';' + fontStyle
								+ bold + underline + fontFamily + 'font-size:'
								+ cell.fontSize + 'pt;background-color:#'
								+ cell.foreColor + ';text-align:'
								+ cell.horizontalAlignment + ';vertical-align:' + cell.verticalAlignment + '">' + 
								'<div id="' + sheetID + "_" + cellRealId + '_div" cellid="'+cell.id+'"  style="width:auto;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;-o-text-overflow:ellipsis;" field="true" data title="'+titlevalue+'">'+cell_value+'</div>'
								+ '</td>';
					}
					
					endcolindex = cell.endColumn;
				}
				str += "</tr>";
			}
			str += "</table>";

			var imgInfoList = cells[cells.length - 2];
			
			if(imgInfoList && imgInfoList[m]){
				for(var k=0;k<imgInfoList[m].length;k++){
					var cell = imgInfoList[m][k];
					var row = 0;
					if(cell.row>0){
						row = rows[cell.row-1];
					}
					var col = 0;
					if(cell.col>0){
						col = cols[cell.col-1];
					}
					str += "<div style='position:absolute;left:"+(col+cell.left+160)+"px;top:"+(row+cell.top+10)+"pt'><img src='"+serverURL+"/static/excelimg/"+params.pageIId+"/"+cell.path+"'></img></div>";
				}
			}
			
			$("#_excel_tabContent_" + sheetID).css("width",columnallwidth);
			$("#_excel_tabContent_" + sheetID).append(str);
		}
	};

	this.load = function(result, data, pageId) {
		this.page_Id = pageId;
		result = UI.JSON.decode(result);
		if (typeof data == "string") {
			data = UI.JSON.decode(data);
		}

		var obj = this;
		var flag = false;
		if (data != undefined) {
			flag = true;
			obj.records = data;
		}
		var processVars = [];
		try{
			processVars = parent.globe.workflow.todo.getEFormVaribles();
		}catch(error){

		}

		obj.bindings = result;
		for ( var m in result) {
			if(m=="sheets"){
				continue;
			}
			var sheetID = escape(m).replaceAll("%", "_");
			var bindings = result[m];
			for (var i = 0; i < bindings.length; i++) {
				var bind = bindings[i];
				var id = bind.id;
				var dataSetId = bind.dataSetId;
				var datas;
				if (data != undefined) {
					if (data[dataSetId] == undefined) {
						data[dataSetId] = [];
					}
					datas = data[dataSetId];
				} else {
					data = {};
					data[dataSetId] = [];
					datas = data[dataSetId];
				}
				if (id) {// grid
					var showMenu = bind.showMenu;
					if(null==showMenu||undefined==showMenu){
						showMenu="";
					}
					var type = bind.type;
					var items = bind.items;
					var rows = bind.rows;
					if (type == "d") {
						for (var k = 0; k < rows; k++) {
							for (var j = k * items.length / parseInt(rows); j < k * items.length / parseInt(rows) + items.length / parseInt(rows); j++) {
								var item = items[j];
								var posi=item.position;
								var per=permissionsValidateExcel(permissionsValidation,posi);
								var itemid = ""
								if (item.identification != undefined
										&& item.identification != "") {
									itemid = item.identification;
								} else {
									itemid = item.position.replaceAll("\\\$",
											"");
								}								 
								var itemattrId = item.dataSetAttr;
								var events = item.events;
								if (events) {
									events = UI.JSON.encode(events);
								}
								var itemdataSetId = item.dataSetId;
								var optionType = item.optiontype == undefined ? "" : item.optiontype;
								var optionValue = item.optionValue == undefined ? "" : item.optionValue;
								var defaultOption = item.defaultOption == undefined ? "" : item.defaultOption;
								var optionItem = this.getOptionItem(optionType, optionValue, defaultOption, pageId);
								$("#" + sheetID + "_" + itemid).attr(
										"__rowIndex", k).attr("dataSetId",
										itemdataSetId).attr("dataSetAttr",
										itemattrId).attr("editorType",
										item.editorType).attr("gridID", id)
										.attr("gridType", type).attr("showMenu", showMenu).attr("events",
												events);
								$("#" + sheetID + "_" + itemid).data(
										$.extend({}, item, {
											"optionItem" : optionItem
										}));

								if (datas == undefined) {
									datas = [];
								}
								if (!datas[k]) {
									datas[k] = {
										"__status" : "blank"
									};
								} else {
									if (!datas[k]["__status"]) {
										datas[k]["__status"] = "loaded";
									}
								}
								var itemvalue = datas[k][itemattrId];
								if(itemvalue==null || itemvalue=="null"){
									itemvalue = "";
								}
								if (itemvalue == undefined && $("#" + sheetID + "_" + itemid) .html() == "") {
									$("#" + sheetID + "_" + itemid).html("&nbsp;");
								}
								$("#" + sheetID + "_" + itemid).data({"value" : itemvalue});
								var displayValue = datas[k][itemattrId + "_V"];
								if(displayValue==null || displayValue=="null"){
									displayValue = "";
								}								
								var editorDef = item.editorType;
								var isWrap = $("#" + sheetID + "_" + itemid).attr("isWrap");
								if("h"!=per){
									if(editorDef!="PTUIExcelTextField"&&editorDef!="PTUIExcelNumberField"){
										$("#" + sheetID + "_" + itemid).text(displayValue);
										$("#" + sheetID + "_" + itemid + "_div").remove();
									}else{
										if(isWrap=="true"){
											$("#" + sheetID + "_" + itemid).text(displayValue);
										}else{
											$("#" + sheetID + "_" + itemid + "_div").attr(
													"__rowIndex", k).attr("dataSetId",
													itemdataSetId).attr("dataSetAttr",
													itemattrId).attr("editorType",
													item.editorType).attr("gridID", id)
													.attr("gridType", type).attr("showMenu", showMenu).attr("events",
															events);
											$("#" + sheetID + "_" + itemid + "_div").text(displayValue);
											$("#" + sheetID + "_" + itemid + "_div").attr("title",displayValue);
										}
									}
								}
								if(isWrap=="true" || (editorDef!="PTUIExcelTextField"&&editorDef!="PTUIExcelNumberField")){
									if(editorDef!="" && editorDef!="PTUIExcelLabel"){
										$("#" + sheetID + "_" + itemid)[editorDef]("setValue");
									}else if(editorDef=="PTUIExcelLabel"){
										if(params.usage!="add"){
										//	delete datas[k][itemattrId + "_V"];
										//	delete datas[k][itemattrId];
										}
									}
								}
							}
						}
					} else if (type == "s") {
						if (datas == undefined) {
							datas = [ {
								"__status" : "blank"
							} ];
						}
						if (datas.length == 0) {
							datas.push({
								"__status" : "blank"
							});
						}
						var items = bind.items;
						var item0id = ""
						if (items[0].identification != undefined
								&& items[0].identification != "") {
							item0id = items[0].identification;
						} else {
							item0id = items[0].position.replaceAll("\\\$", "");
						}
						var trr = $("#" + sheetID + "_" + item0id).parent();
						for (var k = 0; k < datas.length; k++) {
							if (!datas[k]["__status"]) {
								datas[k]["__status"] = "loaded";
							}
							if (k == 0) {
								this.setSData(items,datas[k],trr,k,m,{},1,showMenu);
							} else {
								var position = bind.position;
								var addrArr = position.split(":");
					 	 		var addrF = addrArr[0];
					 	 		var addrR = addrArr[1];
					 	 		var addrFs = addrF.split("$");
					 	 		var addrRs = addrR.split("$");
					 	 		
					 	 		for(var n=parseInt(addrRs[2])-1;n>=parseInt(addrFs[2])-1;n--){
					 	 			var tr = $("#" + sheetID + "_" + n).clone();
					 	 			var newtr;
					 	 			if (k == 1) {
					 	 				var tt1 = $("#" + sheetID + "_" + (parseInt(addrRs[2])-1));
										newtr = tr.insertAfter($("#" + sheetID + "_" + (parseInt(addrRs[2])-1)));
									} else {
										var tt2 = $("#" + sheetID + "_" + (parseInt(addrRs[2])-1) + "_" + (k-1));
										newtr = tr.insertAfter($("#" + sheetID + "_" + (parseInt(addrRs[2])-1) + "_" + (k-1)));
									}
					 	 			$(newtr).attr("id",sheetID + "_" + n + "_" + k);
					 	 			newtr.each(function(i){
										$(this).children('td').each(function(j){
											var tdid = $(this).attr("id");
											
											var flag = false;
											for (var j = 0; j < items.length; j++) {
												var item = items[j];
												var itemid = ""
												if (item.identification != undefined &&item.identification != "") {
													itemid = item.identification;
												} else {
													itemid = item.position.replaceAll("\\\$", "");
												}
												if(tdid==sheetID+"_"+itemid){
													flag = true;
													break;
												}
											}
											if(!flag){
												$(this).remove();
											}
										});
									});
									var m = excel.c_rgszSh[this.g_iShCur];
									this.setSData(items,datas[k],newtr,k,m,showMenu);
					 	 		}
					 	 		
					 	 		var cellIIdMap = this.cellIIdMap;
								var rowsnum = bind.rows;
								var position = bind.position;
								var addrArr = position.split(":");
					 	 		var addrF = addrArr[0];
					 	 		var addrR = addrArr[1];
					 	 		var addrFs = addrF.split("$");
					 	 		var addrRs = addrR.split("$");
					 	 		
					 	 		var c1 = this.toUnicode(addrFs[1]);
					 	 		if(c1.length==2){
				 	 			  	c1 = c1[0]%26 + c1[1]%26 + 1;
				 	 			}else{
				 	 				c1 = c1[0]-64;
				 	 			}
					 	 		
					 	 		var c2 = this.toUnicode(addrRs[1]);
					 	 		if(c2.length==2){
				 	 			  	c2 = c2[0]%26 + c2[1]%26 + 1;
				 	 			}else{
				 	 				c2 = c2[0]-64;
				 	 			}
					 	 		
					 	 		var colIndex = this.colIndexMap[sheetID];
					 	 		var colIndexArr = colIndex.split(",");
					 	 		
					 	 		var startcol = parseInt(colIndexArr[0]);
					 	 		var endcol = parseInt(colIndexArr[0])+parseInt(colIndexArr[1]);
					 	 		
					 	 		for(var rr = parseInt(addrFs[2])-1;rr<=parseInt(addrRs[2])-1;rr++){
						 	 		var editCell = {};
					 	 			for(var col = parseInt(c1-1-1); col >= startcol && col>=0; col--){
										var pos1 = cellIIdMap[sheetID+"_"+(parseInt(addrRs[2])-1)+"_"+parseInt(col)];
										var widgeta = $("td[iid='"+pos1+"']");
										if(widgeta!=null && (editCell[pos1]==null || editCell[pos1]==undefined)){
											editCell[pos1]=widgeta;
											$("td[iid='"+pos1+"']").attr("rowSpan",parseInt($("td[iid='"+pos1+"']").attr("rowSpan"))+1);
										}
						 	 		}
						 	 		
						 	 		for(var col = parseInt(c2); col <= endcol && col>=0; col++){
										var pos1 = cellIIdMap[sheetID+"_"+(parseInt(addrRs[2])-1)+"_"+parseInt(col)];
										var widgeta = $("td[iid='"+pos1+"']");
										if(widgeta!=null && (editCell[pos1]==null || editCell[pos1]==undefined)){
											editCell[pos1]=widgeta;
											$("td[iid='"+pos1+"']").attr("rowSpan",parseInt($("td[iid='"+pos1+"']").attr("rowSpan"))+1);
										}
						 	 		}
					 	 		}
							}
						}
					}
				} else {// form
					if (!data[dataSetId][0]) {
						data[dataSetId][0] = {};
					}
					var posi=bind.position;
					var per=permissionsValidateExcel(permissionsValidation,posi);
					if (bind.identification != undefined
							&& bind.identification != "") {
						id = bind.identification;
					} else {
						id = bind.position.replaceAll("\\\$", "");
					}
					var attrId = bind.dataSetAttr;
					var optionType = bind.optiontype == undefined ? "" : bind.optiontype;
					var optionValue = bind.optionValue == undefined ? "" : bind.optionValue;
					var defaultOption = bind.defaultOption == undefined ? "" : bind.defaultOption;
					var optionItem = this.getOptionItem(optionType, optionValue, defaultOption, pageId);
					var events = bind.events;
					if (events) {
						events = UI.JSON.encode(events);
					}
					$("#" + sheetID + "_" + id).attr("dataSetId", dataSetId).attr("dataSetAttr", attrId).attr("editorType",bind.editorType).attr("events", events);
					$("#" + sheetID + "_" + id).data($.extend({}, bind, {
						"optionItem" : optionItem
					}));
					if (data == undefined) {
						continue;
					}

					try{
						for(var j = 0 ; j < processVars.length ; j ++){
							data[dataSetId][0][processVars[j]["fieldAttrId"]]=processVars[j]["sourceVariableValue"];
							data[dataSetId][0][processVars[j]["fieldAttrId"]+ "_V"]=processVars[j]["sourceVariableValue"];
						}
					}catch(error){
						
					}
					// 加载值
					var displayValue = data[dataSetId][0][attrId + "_V"];
					var value = data[dataSetId][0][attrId];
				
					if(bind.dataSetId!=""){
						var defaultValue = bind.defaultValue;
						if(displayValue == undefined || displayValue == ''){
							displayValue = defaultValue;
						}
						if(typeof(value) == "undefined"||(typeof(value)!="undefined"&&value!=0&&!value) || value == ''){
							value = defaultValue;
						}
					}

					if(value == undefined){
						value = "";
					}
					$("#" + sheetID + "_" + id).data({
						"value" : value
					});

					var editorDef = bind.editorType;
					var isWrap = $("#" + sheetID + "_" + id).attr("isWrap");
					if(editorDef!=""){
						if("h"!=per){
							if(editorDef!="PTUIExcelTextField"&&editorDef!="PTUIExcelNumberField"){
								$("#" + sheetID + "_" + id).text(displayValue);
								$("#" + sheetID + "_" + id + "_div").remove();
							}else{
								if(isWrap=="true"){
									$("#" + sheetID + "_" + id).text(displayValue);
								}else{
									$("#" + sheetID + "_" + id + "_div").attr("dataSetId", dataSetId).attr("dataSetAttr", attrId).attr("editorType",bind.editorType).attr("events", events);
									$("#" + sheetID + "_" + id + "_div").text(displayValue);
									$("#" + sheetID + "_" + id + "_div").attr("title",displayValue);
								}
							}
						}
					}
					if(isWrap=="true" || (editorDef!="PTUIExcelTextField"&&editorDef!="PTUIExcelNumberField")){
						if(editorDef!="" && editorDef!="PTUIExcelLabel"){
							$("#" + sheetID + "_" + id)[editorDef]("setValue");
						}else if(editorDef=="PTUIExcelLabel"){
							if(params.usage!="add"){
							//	delete data[dataSetId][0][attrId + "_V"];
							//	delete data[dataSetId][0][attrId];
							}
						}
					}
				}// form
			}
		}
		try{
			loadCustomForm();
		}catch(e){
			
		}
		if (flag != true) {
			obj.records = data;
		}
		obj.initEditor(obj);
		try{
			excelformula.pageLoadCalculate(this);
		}catch(err){

		}

	};

	this.initEditor = function(excel) {
		var $div;
		var obj = this;
		$("td").each(function(index, elemDom) {
			obj.setSEvent($(this),$div);
		});

		$("body").click(function() {
			var o = getEventObject();
			if (o.tagName != "DIV" && o.tagName != "TD" && !$(o).parentsUntil().hasClass("panel")) {
				excel.removeOtherWidget();
			}
		});
		excel.needRemoveWidget = null;
		excel.removeOtherWidget();
	};

	this.needRemoveWidget = null;

	this.removeOtherWidget = function() {
		if (this.needRemoveWidget) {
			$(this.needRemoveWidget)[$(this.needRemoveWidget).attr("editorType")]("destory");
			this.needRemoveWidget = null;
			$("#editorDiv").window("destroy", false);
		}
	};

	this.showOp = function(td) {
        // var gridType = $(td).attr("gridType");
        // var showMenu = $(td).attr("showMenu");
		// var _excel = this;
		// if (this.usage != "view") {
        //     if(showMenu==""||showMenu=="true"){
        //         if (gridType == "d") {
        //             $('#__anchor_d').fadeIn().css("left", $(td).parent().position().left-16).css("top", $(td).parent().position().top+4)
        //                 .attr("td",$(td).attr("id"));
        //         } else {
        //             $('#__anchor').fadeIn().css("left", $(td).parent().position().left-16).css("top", $(td).parent().position().top-14)
        //                 .attr("td",$(td).attr("id"));
        //         }
        //     }
		//
		// }
        var _excel = this;
        if (this.usage != "view") {
            // $('#__anchor').show().css("left", $(td).parent().position().left-16).css("top", $(td).parent().position().top)
            //     .attr("td",$(td).attr("id"));
            this.showMenu(td);
        }

 };

    this.showMenu = function(td,anchor) {
 	var gridType = $(td).attr("gridType");
 	var showMenu = $(td).attr("showMenu");
 	if(showMenu==""||showMenu=="true"){
 		if (gridType == "d") {
 			$('#__mmd').menu('show', {
 				left : $(td).parent().position().left-27,
 				top : $(td).parent().position().top
 			});
 		} else {
 			$('#__mm').menu('show', {
 				left : $(td).parent().position().left-27,
 				top : $(td).parent().position().top
 			});
 		}
 	}
    };

	this.synchronizeData = function(cell,value,calculateFormula) {
		var rowIndex ;
		var dataSetID = cell.attr("datasetid");
		var dataSetAttr = cell.attr("dataSetAttr");
		if(!value){
			value = cell.data("value");
		}
		var gridID = cell.attr("gridID");
		var events = cell.attr("events");
		if (gridID) {
			if (this.records[dataSetID] == undefined) {
				this.records[dataSetID] = [];
			}
			rowIndex = cell.attr("__rowIndex");
			if (!this.records[dataSetID][rowIndex]) {
				this.records[dataSetID][rowIndex] = {
					"__status" : "blank"
				};
			}
			this.records[dataSetID][rowIndex][dataSetAttr] = value;
			if (this.records[dataSetID][rowIndex]["__status"] == "blank"||(this.records[dataSetID][rowIndex]["__status"] == "loaded"&&this.usage == "add")) {
				this.records[dataSetID][rowIndex]["__status"] = "inserted";
			} else if (this.records[dataSetID][rowIndex]["__status"] == "loaded") {
				this.records[dataSetID][rowIndex]["__status"] = "updated";
			}
		} else {
			if (this.records[dataSetID] == undefined) {
				this.records[dataSetID] = [ {} ];
			}
			this.records[dataSetID][0][dataSetAttr] = value;
		}
		if (events) {
			events = UI.JSON.decode(events);
			for ( var i in events) {
				if (events[i]["id"] == "onAfterEdit") {
					var a=events[i]["eventId"].toLowerCase();
					if(a!=""){
						setTimeout("eval("+a+"("+rowIndex+",'"+dataSetID+"','"+dataSetAttr+"'))",200);
					}
					break;
				}
			}
		}
		if(calculateFormula == null || calculateFormula == true){
			try{
				excelformula.calculate(cell,this);
			}catch (e) {
				
			}
			
		}
	};

	this.getSubmitData = function() {
		var formDataArr = [];
		var gridDataArr = [];
		if(this.dataSetMapping["formIdList"]!=undefined){
			formDataArr=this.dataSetMapping["formIdList"].split(",");
		}
		if(this.dataSetMapping["gridIdList"]!=undefined){
			gridDataArr=this.dataSetMapping["gridIdList"].split(",");
		}
		if (this.dataSetMapping["formIdList"] != "") {
			for (var index = 0; index < formDataArr.length; index++) {
				var formData = formDataArr[index];
				this.submitData[formData] = {};
				var formdata = [];
				$.extend(true, formdata, this.records[formData]);
				var hcarr = this.hiddenconfig.split(",");
				for(var i=0; i < hcarr.length; i++){
					var key = hcarr[i];
					if(key == ""){
						continue;
					}
					var dsarr = key.split("_");
					if(dsarr.length == 2){
						if(dsarr[0] == formData){
							var flag = false;
							for ( var m in this.bindings) {
								if(m=="sheets"){
									continue;
								}
								var sheetID = escape(m).replaceAll("%", "_");
								var binds = this.bindings[m];
								var flag1 = false;
								for (var j = 0; j < binds.length; j++) {
									var bind = binds[j];
									var id = bind.id;
									var dataSetId = bind.dataSetId;
									if(dsarr[0]==dataSetId){
										var attrId = bind.dataSetAttr;
										if(dsarr[1]==attrId){
											flag1 = true;
											break;
										}
									}
								}
								if(flag1){
									flag = true;
									break;
								}
							}
							if(!flag){
								formdata[0][dsarr[1]]=encodeURIComponent($("#"+key).val());
							}
						}
					}
				}

				if (this.usage == "add") {
					this.submitData[formData]["insertData"] = formdata;
					var formdata = formdata[0];
					var formInnerId = formdata["innerId"];
					params.innerId=formInnerId;
				} else {
					this.submitData[formData]["updateData"] = formdata;
				}
			}
		}
		if (this.dataSetMapping["gridIdList"] != "") {
			for (var i = 0; i < gridDataArr.length; i++) {
				var gridData = gridDataArr[i];
				if (!this.submitData[gridData]) {
					this.submitData[gridData] = {};
				}
				this.submitData[gridData].insertData = [];
				this.submitData[gridData].updateData = [];
				for (var j = 0; this.records[gridData] != undefined && j < this.records[gridData].length; j++) {
					var tt = this.records[gridData];
					var r = this.records[gridData][j];
					if (r["__status"] == "inserted") {
						this.submitData[gridData].insertData.push(r);
					} else if (r["__status"] == "updated") {
						this.submitData[gridData].updateData.push(r);
					}
				}
			}
		}

		return this.submitData;
	};
	
	this.getSimpleData = function() {
		var formDataArr = [];
		if(this.dataSetMapping["formIdList"]!=undefined){
			formDataArr=this.dataSetMapping["formIdList"].split(",");
		}
		if (this.dataSetMapping["formIdList"] != "") {
			for (var i = 0; i < formDataArr.length; i++) {
				var formData = formDataArr[i];
				this.submitData[formData] = {};
				var formdata = [];
				$.extend(true, formdata, this.records[formData]);
				return formdata;
			}
		}
	}

	this.selectRow = function(dataSetID, rowIndex) {
		this.selections = [];
		$("[datasetid=" + dataSetID + "][__rowIndex=" + rowIndex + "]").each(
				function() {
					$(this).attr("bgc", $(this).css("background-color")).css("background-color", "");
				});
		$("[datasetid=" + dataSetID + "][__rowIndex=" + rowIndex + "]").addClass("grid_background");
		this.selections.push(this.records[dataSetID][rowIndex]);
	};

	this.deselectRow = function(dataSetID, rowIndex) {
		this.selections = [];
		$("[datasetid=" + dataSetID + "][__rowIndex=" + rowIndex + "]").each(
				function() {
					$(this).removeClass("grid_background").css("background-color", $(this).attr("bgc"));
				});
	};

	this.clearSelections = function() {
		this.selections = [];
		$(".grid_background").each(
				function() {
					$(this).removeClass("grid_background").css("background-color", $(this).attr("bgc"));
				});
	};

	this.selectAll = function(dataSetID) {
		$("[datasetid=" + dataSetID + "]").each(
				function() {
					$(this).attr("bgc", $(this).css("background-color")).css("background-color", "");
				});
		$("[datasetid=" + dataSetID + "]").addClass("grid_background");
		this.selections = [];
		this.selections = this.records[dataSetID];
	};

	this.insertRow = function(dir, dataSetID, record, rowIndex) {
		this.removeOtherWidget();
		if (rowIndex == undefined) {
			var selected = $(".grid_background").eq(0);
			dataSetID = selected.attr("datasetid");
			rowIndex = selected.attr("__rowIndex");
			record = {
				"__status" : "inserted"
			};
		} else {
			record["__status"] = "inserted";
		}
		if (this.records[dataSetID] == undefined) {
			return;
		}
		if (dir == "up") {
			if (this.records[dataSetID][parseInt(rowIndex)] && this.records[dataSetID][parseInt(rowIndex)]["__status"] == "blank") {
				this.records[dataSetID].splice(parseInt(rowIndex), 1, record);
			} else {
				this.records[dataSetID].splice(parseInt(rowIndex), 0, record);
			}
		} else {
			if (this.records[dataSetID][parseInt(rowIndex) + 1] && this.records[dataSetID][parseInt(rowIndex) + 1]["__status"] == "blank") {
				this.records[dataSetID].splice(parseInt(rowIndex) + 1, 1, record);
			} else {
				this.records[dataSetID].splice(parseInt(rowIndex) + 1, 0, record);
			}
		}
		this.clearSelections();
		var excel = this;
		var m = excel.c_rgszSh[this.g_iShCur];
		var sheetID = escape(m).replaceAll("%", "_");
		var binds = this.bindings[m];
		var bind;
		for (var i = 0; i < binds.length; i++) {
			bind = binds[i];
			if(!bind.id || bind.id==null || bind.id==undefined){
				continue;
			}
			var dataSetId = bind.dataSetId;
			if (dataSetId == dataSetID) {
				break;
			}
		}
		if(bind){
			var type = bind.type;
			if (type != "d") {
				this.refreshExcelGrid(bind,sheetID);
				var cellIIdMap = this.cellIIdMap;
				var rowsnum = bind.rows;
				var position = bind.position;
				var addrArr = position.split(":");
	 	 		var addrF = addrArr[0];
	 	 		var addrR = addrArr[1];
	 	 		var addrFs = addrF.split("$");
	 	 		var addrRs = addrR.split("$");
	 	 		
	 	 		var c1 = this.toUnicode(addrFs[1]);
	 	 		if(c1.length==2){
	 			  	c1 = c1[0]%26 + c1[1]%26 + 1;
	 			}else{
	 				c1 = c1[0]-64;
	 			}
	 	 		
	 	 		var c2 = this.toUnicode(addrRs[1]);
	 	 		if(c2.length==2){
	 			  	c2 = c2[0]%26 + c2[1]%26 + 1;
	 			}else{
	 				c2 = c2[0]-64;
	 			}
	 	 		
	 	 		var colIndex = this.colIndexMap[sheetID];
	 	 		var colIndexArr = colIndex.split(",");
	 	 		
	 	 		var startcol = parseInt(colIndexArr[0]);
	 	 		var endcol = parseInt(colIndexArr[0])+parseInt(colIndexArr[1]);
	 	 		
	 	 		for(var rr = parseInt(addrFs[2])-1;rr<=parseInt(addrRs[2])-1;rr++){
					var pos = cellIIdMap[sheetID+"_"+(rr)+"_"+parseInt(c1-1)];
		 	 		var editCell = {};
	 	 			for(var col = parseInt(c1-1-1); col >= startcol && col>=0; col--){
						var pos1 = cellIIdMap[sheetID+"_"+(parseInt(addrRs[2])-1)+"_"+parseInt(col)];
						var widgeta = $("td[iid='"+pos1+"']");
						if(widgeta!=null && (editCell[pos1]==null || editCell[pos1]==undefined)){
							editCell[pos1]=widgeta;
							$("td[iid='"+pos1+"']").attr("rowSpan",parseInt($("td[iid='"+pos1+"']").attr("rowSpan"))+1);
							if(rr==parseInt(addrFs[2])-1){
								$("td[iid='"+pos1+"']").attr("height",parseInt($("td[iid='"+pos1+"']").attr("height"))+parseInt($("td[iid='"+pos+"']").attr("height")));
							}
						}
		 	 		}
		 	 		
		 	 		for(var col = parseInt(c2); col < endcol && col>=0; col++){
						var pos1 = cellIIdMap[sheetID+"_"+(parseInt(addrRs[2])-1)+"_"+parseInt(col)];
						var widgeta = $("td[iid='"+pos1+"']");
						if(widgeta!=null && (editCell[pos1]==null || editCell[pos1]==undefined)){
							editCell[pos1]=widgeta;
							$("td[iid='"+pos1+"']").attr("rowSpan",parseInt($("td[iid='"+pos1+"']").attr("rowSpan"))+1);
							if(rr==parseInt(addrFs[2])-1){
								$("td[iid='"+pos1+"']").attr("height",parseInt($("td[iid='"+pos1+"']").attr("height"))+parseInt($("td[iid='"+pos+"']").attr("height")));
							}
						}
		 	 		}
	 	 		}
			}
		}
		setNullCellId(dataSetID);
	};
	
	this.toUnicode = function(str){
		var codes = [];
		for(var i=0;i<str.length;i++){
			codes.push(str.charCodeAt(i));
		}
		return codes;
	};
	this.refreshGridStatus = function(){
		var m = excel.c_rgszSh[this.g_iShCur];
		var sheetID = escape(m).replaceAll("%", "_");
		var binds = this.bindings[m];
		for (var i = 0; i < binds.length; i++) {
			var bind = binds[i];
			if(!bind.id || bind.id==null || bind.id==undefined){
				continue;
			}
			var type = bind.type;
			if(type){
				var dataSetID = bind.dataSetId;
				if(this.records[dataSetID]){
					var recordsDa=this.records[dataSetID];
					if(recordsDa){
						for(var index=0;index<recordsDa.length;index++){
							recordsDa[index]["__status"]="loaded";
						}
					}
				}
			}
		}
	}
	this.refreshExcelGrid = function(bind,sheetID){
		var $div;
		var dataSetID = bind.dataSetId;
		var showMenu=bind.showMenu;
		if(showMenu==null||undefined==showMenu){
			showMenu="";
		}
		var datas = this.records[dataSetID];
		var items = bind.items;
		var item0id = "";
		if (items[0].identification != undefined && items[0].identification != "") {
			item0id = items[0].identification;
		} else {
			item0id = items[0].position.replaceAll("\\\$", "");
		}
		var trr = $("#" + sheetID + "_" + item0id).parent();
		
		var position = bind.position;
		var addrArr = position.split(":");
 		var addrF = addrArr[0];
 		var addrR = addrArr[1];
 		if(addrR==undefined){
 			addrR=addrF;
 		}
 		var addrFs = addrF.split("$");
 		var addrRs = addrR.split("$");
		for(var n=parseInt(addrRs[2])-1;n>=parseInt(addrFs[2])-1;n--){
	 		$("tr[id^='"+sheetID + "_" + n + "_']").remove();
	 	}
		
		if(datas.length > 0){
//			for (var k = 1; k < datas.length; k++) {

// 			$("#" + sheetID + "_" + n + "_" + k).remove();
//			}
		}else{
			var m = excel.c_rgszSh[this.g_iShCur];
			this.setSData(items,datas[k],trr,0,m,{},1,showMenu);
		}
		for (var k = 0; k < datas.length; k++) {
			if (k == 0) {
				var m = excel.c_rgszSh[this.g_iShCur];
				this.setSData(items,datas[k],trr,k,m,{},1,showMenu);
			} else {
				var position = bind.position;
				var addrArr = position.split(":");
	 	 		var addrF = addrArr[0];
	 	 		var addrR = addrArr[1];
	 	 		if(addrR==undefined){
	 	 			addrR=addrF;
	 	 		}
	 	 		var addrFs = addrF.split("$");
	 	 		var addrRs = addrR.split("$");
	 	 		
	 	 		for(var n=parseInt(addrRs[2])-1;n>=parseInt(addrFs[2])-1;n--){
	 	 			var tr = $("#" + sheetID + "_" + n).clone();
	 	 			var newtr;
	 	 			if (k == 1) {
	 	 				var tt1 = $("#" + sheetID + "_" + (parseInt(addrRs[2])-1));
						newtr = tr.insertAfter($("#" + sheetID + "_" + (parseInt(addrRs[2])-1)));
					} else {
						var tt2 = $("#" + sheetID + "_" + (parseInt(addrRs[2])-1) + "_" + (k-1));
						newtr = tr.insertAfter($("#" + sheetID + "_" + (parseInt(addrRs[2])-1) + "_" + (k-1)));
					}
	 	 			$(newtr).attr("id",sheetID + "_" + n + "_" + k);
	 	 			newtr.each(function(i){
						$(this).children('td').each(function(j){
							var tdid = $(this).attr("id");
							
							var flag = false;
							for (var j = 0; j < items.length; j++) {
								var item = items[j];
								var itemid = ""
								if (item.identification != undefined &&item.identification != "") {
									itemid = item.identification;
								} else {
									itemid = item.position.replaceAll("\\\$", "");
								}
								if(tdid==sheetID+"_"+itemid){
									flag = true;
									break;
								}
							}
							if(!flag){
								$(this).remove();
							}
						});
					});
					var m = excel.c_rgszSh[this.g_iShCur];
					this.setSData(items,datas[k],newtr,k,m,showMenu);
					for (var j = 0; j < items.length; j++) {
						var item = items[j];
						
						var itemid = ""
						if (item.identification != undefined
								&&item.identification != "") {
							itemid = item.identification;
						} else {
							itemid = item.position.replaceAll("\\\$", "");
						}
						var itemtd = newtr.find("#" + sheetID + "_" + itemid + "_" + k);
						
						this.setSEvent(itemtd,$div);
					}
	 	 		}
			}
		}
	}
	
	this.triggerOnAfterEdit = function(events){
		if(events){
			//删除行操作，触发编辑后事件
			events = UI.JSON.decode(events);
			for ( var index in events) {
				if (events[index]["id"] == "onAfterEdit") {
					if(events[index]["eventId"]!=""){
						eval(events[index]["eventId"].toLowerCase() + "()");
						break;
					}
				}
			}
		}
	}
	
	this.setSEvent = function(itemtd,$div){
		itemtd.click(function() {
			var events = $(this).attr("events");
			var indexNum = $(this).attr("__rowIndex");			
			var datasetid = $(this).attr("datasetid");			
			var datasetattr = $(this).attr("datasetattr");			
			if (events) {
				events = UI.JSON.decode(events);
				for ( var i in events) {
					if (events[i]["id"] == "onClick") {
						if(events[i]["eventId"]!=""){
							eval(events[i]["eventId"].toLowerCase() + "("+indexNum+",'"+datasetid+"','"+datasetattr+"')");
							break;
						}
					}
				}
			}
			excel.removeOtherWidget();
			var per=permissionsValidateExcel(permissionsValidation, $(this).data().position);
			if ((excel.usage == "view"&&"d"==per)||(excel.usage != "view"&&(""==per||"d"==per))) {
				if (events) {
					for ( var i in events) {
						if (events[i]["id"] == "onBeforeEdit") {
							if(events[i]["eventId"]!=""){
								var a = eval(events[i]["eventId"].toLowerCase() + "("+indexNum+",'"+datasetid+"','"+datasetattr+"')");
								if(false==a){
									return false;
								}
								break;
							}
						}
					}
				}
				// 弹出编辑器
                excel.showEditor($(this),$div);
			}

			// 选中行
			var gridid = $(this).attr("gridID");
			if (gridid) {
				excel.selections = [];
				 $(".grid_background").removeClass("grid_background");
				 var cellsInRow = $(this).siblings("[gridID=" + gridid + "]");
				// $(this).css("background-color","");
				 $(this).addClass("grid_background");
				// cellsInRow.css("background-color","");
				 cellsInRow.addClass("grid_background");
				var rowIndex = $(this).attr("__rowIndex");
				var dataSetID = $(this).attr("datasetid");
				excel.selections.push(excel.records[dataSetID][rowIndex]);
				excel.showOp(this);
			} else {
				excel.selections = [];
				excel.clearSelections();
			}
		});
	}

	this.showEditor = function(td,$div,flag){
        var position = td.offset();
        var width = td.width();
        var height = td.height();
        var editorDef = td.attr("editorType");
        if (editorDef && editorDef != "" && editorDef != "PTUIExcelLabel") {
            var dataSetId = td.attr("dataSetId");
            var dataSetAttr = td.attr("dataSetAttr");
            var gridid = td.attr("gridid");
            var gridtype = td.attr("gridtype");
            var options = td.data();
            if(options.isReadOnly=="true"){
                return;
            }
            var rowIndex = td.attr("__rowindex")
			if(!rowIndex || rowIndex == 0 || gridtype=="d"){
                td.data({"attrId":options.identification});
			}else{
                td.data({"attrId":options.identification+"_"+rowIndex});
			}

            var $widget = td[editorDef]("createJquery",false);
            var $cloneDiv;
            if (!$div) {
                //$.get(clientpath+"/static/reportserver/excelwidget/js/div.html",
                //	function(data) {
                $div = $("<div><div id=\"editorDiv\" class=\"easyui-window\" data-options=\"border:false,noheader:true,draggable:false,resizable:false\">\n" +
                    "\n" +
                    "</div></div>");
                $cloneDiv = $div.clone(true,true);
                $("#editorDiv",$cloneDiv).data(
                    {
                        "options" : {
                            width : width,
                            height : height,
                            top : position.top + 2,
                            left : position.left + 2
                        }
                    });
                $("#editorDiv",$cloneDiv).append($widget);
                $.parser.parse($cloneDiv);
                //	},
                //	'html');
            } else {
                $cloneDiv = $div.clone(true,true);
                $("#editorDiv",$cloneDiv).data(
                    {
                        "options" : {
                            width : width,
                            height : height,
                            top : position.top + 2,
                            left : position.left + 2
                        }
                    });
                $("#editorDiv",$cloneDiv).append($widget);
                $.parser.parse($cloneDiv);
            }



            if(editorDef == "PTUIExcelSelect"||editorDef == "PTUIExcelRadio"||editorDef == "PTUIExcelCheckbox"||editorDef == "PTUIExcelDateTime"){
                //select时，触发下拉框展示
                $widget.next().find("span").find("a").click();
            }else if(editorDef == "PTUIExcelTextArea"){
                if(flag == true){//此处目前不明原因，在tab按键切换时只能靠click方法让输入控件获得焦点和光标
                    $widget.next().find("textarea").first().click();
                }else{
                    $widget.next().find("textarea").first().focus();
                }
            }else{
                if(flag == true){//此处目前不明原因，在tab按键切换时只能靠click方法让输入控件获得焦点和光标
                    $widget.next().find("input").first().click();
                }else{
                    $widget.next().find("input").first().focus();
                }
            }
            excel.needRemoveWidget = td;
        }
    }


	this.setSData = function(items,data,newtr,k,m,trmap,flag,showMenu){
		var sheetID = escape(m).replaceAll("%", "_");
		for (var j = 0; j < items.length; j++) {
			var item = items[j];
			var post = item.position;
			var postarr = post.split("$");
			
			var itemid ="";
			if (item.identification != undefined
					&& item.identification != "") {
				itemid = item.identification;
			} else {
				itemid = item.position.replaceAll("\\\$", "");
			}			
			var itemattrId = item.dataSetAttr;
			var itemdataSetId = item.dataSetId;
			var itemvalue = "";
			if(data){
				itemvalue = data[itemattrId];
			}
			
			if(k==0 && flag=='1'){
				newtr = $("#" + sheetID + "_" + itemid).parent();
			}
			
			if(k!=0 && flag=='1'){
				newtr = trmap[postarr[postarr.length-1]];
			}
			
			var itemtd = newtr.find("#" + sheetID + "_" + itemid);
			if(k!=0){
				itemtd.attr("id",sheetID + "_" + itemid + "_" + k);
			}
			var events = item.events;
			if (events) {
				events = UI.JSON.encode(events);
			}
			itemtd.attr("__rowIndex", k).attr(
					"dataSetId", itemdataSetId).attr(
					"dataSetAttr", itemattrId).attr(
					"editorType", item.editorType)
					.attr("gridID", id).attr(
							"gridType", "s").attr(
							"events", events).attr(
									"showMenu", showMenu);
			var optionType = item.optiontype == undefined ? "" : item.optiontype;
			var optionValue = item.optionValue == undefined ? "" : item.optionValue;
			var defaultOption = item.defaultOption == undefined ? "" : item.defaultOption;
			var optionItem = this.getOptionItem(optionType, optionValue, defaultOption, this.page_Id);
			itemtd.data(
					$.extend({}, item, {
						"optionItem" : optionItem
					}));
			
			if (!data) {
				data = {};
			}
			var itemvalue = data[itemattrId];
            var itemDisplayvalue = data[itemattrId+"_V"];
			if(itemvalue==null){
				itemvalue="";
			}
			if(itemDisplayvalue==null || itemDisplayvalue=="null"){
				itemDisplayvalue = "";
			}
			itemtd.data({
				"value" : itemvalue,
				"displayValue":itemDisplayvalue
			});
			
			var editorDef = item.editorType;
			var isWrap = itemtd.attr("isWrap");
			var itemidid = itemtd.attr("id");
			
			if(editorDef!="PTUIExcelTextField"&&editorDef!="PTUIExcelNumberField"){
				if(editorDef!="" && editorDef!="PTUIExcelLabel"){
					itemtd[editorDef]("setValue");
				}else if(editorDef=="PTUIExcelLabel"){
					if(params.usage!="add"){
						itemtd.text(itemvalue);
						itemtd.attr("title",itemvalue);
					//	delete data[itemattrId + "_V"];
					//	delete data[itemattrId];
					}
				}
				$("#" + itemidid + "_div").remove();
			}else{
				if(isWrap=="true"){
					if(editorDef!="" && editorDef!="PTUIExcelLabel"){
						itemtd[editorDef]("setValue");
					}else if(editorDef=="PTUIExcelLabel"){
						if(params.usage!="add"){
					//		delete data[itemattrId + "_V"];
					//		delete data[itemattrId];
						}
					}
				}else{
					
					itemtd.children('div').each(function(j){
						var divid = $(this).attr("id");
						$(this).attr("id",itemidid + "_div")
					});
					
					$("#" + itemidid + "_div").attr("__rowIndex", k).attr(
							"dataSetId", itemdataSetId).attr(
							"dataSetAttr", itemattrId).attr(
							"editorType", item.editorType)
							.attr("gridID", id).attr(
									"gridType", "s").attr(
									"events", events).attr("showMenu", showMenu);
                        $("#" + itemidid + "_div").text(itemvalue);
                        $("#" + itemidid + "_div").attr("title",itemvalue);

					itemtd.attr("title",itemvalue);
				}
			}
		}
	}
	
	this.appendRow = function(dataSetID, record) {

	};
	this.getCellUnikeId = function(sheetName,cellId){
		if(sheetName==undefined||sheetName==""){//默认只有一个sheet页
			var excel = this;
			sheetName = excel.c_rgszSh[this.g_iShCur];
		}
		var sheetID = escape(sheetName).replaceAll("%", "_");
		return sheetID+"_"+cellId;
	};
	this.getCellValue = function(cellId,sheetName){
		var sheetName=sheetName;
		if(sheetName==undefined||sheetName==""){//默认只有一个sheet页
			var excel = this;
			sheetName = excel.c_rgszSh[this.g_iShCur];
		}
		var cellRealIId=this.getCellUnikeId(sheetName,cellId);
		return $("#"+cellRealIId).data("value");
		
	};
	this.getDisplayCellValue = function(cellId,sheetName){
		var sheetName=sheetName;
		if(sheetName==undefined||sheetName==""){//默认只有一个sheet页
			var excel = this;
			sheetName = excel.c_rgszSh[this.g_iShCur];
		}
		var cellRealIId=this.getCellUnikeId(sheetName,cellId);
		return $("#"+cellRealIId).html();
	};
	this.setCellValue = function(cellId,value,displayValue,sheetName,calculateFormula){
		var sheetName=sheetName;
		if(sheetName==undefined||sheetName==""){//默认只有一个sheet页
			var excel = this;
			sheetName = excel.c_rgszSh[this.g_iShCur];
		}
		var cellRealIId=this.getCellUnikeId(sheetName,cellId);
		if(displayValue != undefined){
			$("#"+cellRealIId).html(displayValue);
		}else{
			$("#"+cellRealIId).html(value);
		}
		$("#"+cellRealIId).data({"value":value});
		__excel.synchronizeData($("#"+cellRealIId),null,calculateFormula);
	};
	this.deleteRow = function(dataSetID, rowIndex) {
		this.removeOtherWidget();
		if (!dataSetID) {
			var selected = $(".grid_background").eq(0);
			dataSetID = selected.attr("datasetid");
			rowIndex = selected.attr("__rowIndex");
		}
		if (this.records[dataSetID] == undefined) {
			try {
				excelformula.deleteRowCalculate(dataSetID,this,true);
			}catch (e) {

			}

			return;
		}
		var deleted = this.records[dataSetID].splice(rowIndex, 1);
		for (var i = 0; i < deleted.length; i++) {
			if (!this.submitData[dataSetID]) {
				this.submitData[dataSetID] = {};
				if (!this.submitData[dataSetID].deleteData) {
					this.submitData[dataSetID].deleteData = [];
				}
			}
			if(!this.submitData[dataSetID].deleteData){
				this.submitData[dataSetID].deleteData = [];
			}
			this.submitData[dataSetID].deleteData.push(deleted[i]);
		}
		this.clearSelections();
		
		var excel = this;
		var $div;
		var $cloneDiv;
		var m = excel.c_rgszSh[this.g_iShCur];
		var sheetID = escape(m).replaceAll("%", "_");
		var bindings = this.bindings[m];
		var bind;
		for (var i = 0; i < bindings.length; i++) {
			bind = bindings[i];
			if(!bind.id || bind.id==null || bind.id==undefined){
				continue;
			}
			var dataSetId = bind.dataSetId;
			if (dataSetId == dataSetID) {
				break;
			}
		}
		if(bind){
			var type = bind.type;
			var showMenu = bind.showMenu;
			if(null==showMenu||undefined==showMenu){
				showMenu="";
			}
			if (type == "d") {
				this.records[dataSetID].push({
					"__status" : "blank"
				});
				var datas = this.records[dataSetID];
				
				var items = bind.items;
				var rows = bind.rows;
				for (var k = 0; k < rows; k++) {
					for (var j = k * items.length / parseInt(rows); j < k * items.length / parseInt(rows) + items.length / parseInt(rows); j++) {
						var item = items[j];
//						var itemid = item.position.replaceAll("\\\$", "");
						var itemid = ""
						if (item.identification != undefined
								&& item.identification != "") {
							itemid = item.identification;
						} else {
							itemid = item.position.replaceAll("\\\$",
									"");
						}
						var itemattrId = item.dataSetAttr;
						var itemdataSetId = item.dataSetId;
						var itemvalue = datas[k][itemattrId];
						var events = item.events;
						if (events) {
							events = UI.JSON.encode(events);
						}
						if(itemvalue==null){
							itemvalue="";
						}
						$("#" + sheetID + "_" + itemid).data().value=itemvalue;
						var editorDef = item.editorType;
						$("#" + sheetID + "_" + itemid)[editorDef]("setValue");
						$("#" + sheetID + "_" + itemid).attr(
								"__rowIndex", k).attr("dataSetId",
								itemdataSetId).attr("dataSetAttr",
								itemattrId).attr("editorType",
								item.editorType).attr("gridID", id)
								.attr("gridType", type).attr("showMenu", showMenu).attr("events",
										events);
						if(events){
							events = UI.JSON.decode(events);
							//删除行操作，触发编辑后事件
							for ( var index in events) {
								if (events[index]["id"] == "onAfterEdit") {
									if(events[index]["eventId"]!=""){
										eval(events[index]["eventId"].toLowerCase() + "("+k+",'"+itemdataSetId+"','"+itemattrId+"')");
										break;
									}
								}
							}
						}
					}
				}
			} else {
				this.refreshExcelGrid(bind,sheetID);
				var datas = this.records[dataSetID];
				if(datas.length==0){
					try {
						excelformula.deleteRowCalculate(dataSetID,this,true);
					}catch (e) {

					}

					return;
				}
				var cellIIdMap = this.cellIIdMap;
				var rowsnum = bind.rows;
				var position = bind.position;
				var addrArr = position.split(":");
	 	 		var addrF = addrArr[0];
	 	 		var addrR = addrArr[1];
	 	 		var addrFs = addrF.split("$");
	 	 		var addrRs = addrR.split("$");
	 	 		
	 	 		var c1 = this.toUnicode(addrFs[1]);
	 	 		if(c1.length==2){
 	 			  	c1 = c1[0]%26 + c1[1]%26 + 1;
 	 			}else{
 	 				c1 = c1[0]-64;
 	 			}
	 	 		
	 	 		var c2 = this.toUnicode(addrRs[1]);
	 	 		if(c2.length==2){
 	 			  	c2 = c2[0]%26 + c2[1]%26 + 1;
 	 			}else{
 	 				c2 = c2[0]-64;
 	 			}
	 	 		
	 	 		var colIndex = this.colIndexMap[sheetID];
	 	 		var colIndexArr = colIndex.split(",");
	 	 		
	 	 		var startcol = parseInt(colIndexArr[0]);
	 	 		var endcol = parseInt(colIndexArr[0])+parseInt(colIndexArr[1]);
	 	 		
	 	 		for(var rr = parseInt(addrFs[2])-1;rr<=parseInt(addrRs[2])-1;rr++){
					var pos = cellIIdMap[sheetID+"_"+(rr)+"_"+parseInt(c1-1)];
		 	 		var editCell = {};
	 	 			for(var col = parseInt(c1-1-1); col >= startcol && col>=0; col--){
						var pos1 = cellIIdMap[sheetID+"_"+(parseInt(addrRs[2])-1)+"_"+parseInt(col)];
						var widgeta = $("td[iid='"+pos1+"']");
						if(widgeta!=null && (editCell[pos1]==null || editCell[pos1]==undefined)){
							editCell[pos1]=widgeta;
							$("td[iid='"+pos1+"']").attr("rowSpan",parseInt($("td[iid='"+pos1+"']").attr("rowSpan"))-1);
							if(rr==parseInt(addrFs[2])-1){
								$("td[iid='"+pos1+"']").attr("height",parseInt($("td[iid='"+pos1+"']").attr("height"))-parseInt($("td[iid='"+pos+"']").attr("height")));
							}
						}
		 	 		}
		 	 		
		 	 		for(var col = parseInt(c2); col < endcol && col>=0; col++){
						var pos1 = cellIIdMap[sheetID+"_"+(parseInt(addrRs[2])-1)+"_"+parseInt(col)];
						var widgeta = $("td[iid='"+pos1+"']");
						if(widgeta!=null && (editCell[pos1]==null || editCell[pos1]==undefined)){
							editCell[pos1]=widgeta;
							$("td[iid='"+pos1+"']").attr("rowSpan",parseInt($("td[iid='"+pos1+"']").attr("rowSpan"))-1);
							if(rr==parseInt(addrFs[2])-1){
								$("td[iid='"+pos1+"']").attr("height",parseInt($("td[iid='"+pos1+"']").attr("height"))-parseInt($("td[iid='"+pos+"']").attr("height")));
							}
						}
		 	 		}
	 	 		}
			}
		}
		try {
			excelformula.deleteRowCalculate(dataSetID,this,true);
		}catch (e) {

		}

		setNullCellId(dataSetID);
	};
	
	this.getOptionItem = function(optionType, optionValue, defaultOption, pageId) {
		var mapKey = optionType+"_"+optionValue + "_" + defaultOption + "_" + pageId;
		if (this.optionItemMap[mapKey]){
			return this.optionItemMap[mapKey];
		}

		var optionItem;
		if (optionType != undefined) {
			if (optionType == "constant") {// 固定值
				optionItem = $.parseJSON(optionValue);
				if (defaultOption != undefined && defaultOption != "") {
					for (var i = 0; i < optionItem.length; i++) {
						optionItem[i]["fixedSel"] = "";
					}
					for (var i = 0; i < optionItem.length; i++) {
						if (optionItem[i]["key"] == defaultOption) {
							optionItem[i]["fixedSel"] = defaultOption;
							break;
						}
					}
				}

			} else if (optionType == "lookup") {// 数据字典
				$.ajax({
							type : "POST",
							async : false,
							url : _contextPath + "/clientrest"+spingmvcconfigpostfix+"?op=getLookUp&lookUpId=" + optionValue,
							success : function(context) {
								optionItem = $.parseJSON(context);
							}
						});
			} else if (optionType == "dataset") {// 数据集
				$.ajax({
					type : "POST",
					async : false,
					url : _contextPath + "/clientrest"+spingmvcconfigpostfix+"?op=getDataSet&pageId=" + pageId + "&optionValue=" + optionValue,
					success : function(context) {
						optionItem = $.parseJSON(context);
					}
				});
			}
		}
		this.optionItemMap[mapKey] = optionItem;
		return optionItem;
	}
	
	this.initHiddenWidget = function(divid, hiddenconfig, dsconfig) {
		this.hiddenconfig=hiddenconfig;
		this.dsconfig=dsconfig;
		var hiddenwidgethtml = "";
		
		var hcarr = hiddenconfig.split(",");
		for(var i=0; i < hcarr.length; i++){
			if(hcarr[i] == ""){
				continue;
			}
			hiddenwidgethtml+="<input type='hidden' id='"+hcarr[i]+"' value=''></input>";
		}
		
		$("#" + divid).append(hiddenwidgethtml);
	}
	
	this.initHiddenWidgetData = function(data) {
		var hcarr = this.hiddenconfig.split(",");
		for(var i=0; i < hcarr.length; i++){
			var key = hcarr[i];
			if(key == ""){
				continue;
			}
			if(this.dsconfig.indexOf(key)!=-1){
				var dsarr = key.split("_");
				if(dsarr.length == 2){
					$("#"+key).val(data[dsarr[0]][0][dsarr[1]]);
				}
			}
		}
	}

	this.exportExcelwithData =function(){
		var sheets = $("#__excelContainer").children();
		var html = {};
		for(var i = 0 ; i < sheets.length; i ++){
			var sheet = sheets[i];
			var sheetId = $(sheet).attr("id");
			sheetId = sheetId.substring("_excel_tabContent_".length,sheetId.length);
            html[sheetId] = {};
            html[sheetId]["id"] = sheetId;
            html[sheetId]["children"] = [];
			var table = $(sheet).children()[0];
			var trs = $(table).find("tr[id]");
			for(var j = 0 ; j < trs.length ; j ++){
                html[sheetId]["children"][j] = {};
                html[sheetId]["children"][j]["id"] = $(trs[j]).attr("id");
                html[sheetId]["children"][j]["children"] = [];
                var tds= $(trs[j]).find("td[cellid]");
                for(var k = 0 ; k < tds.length ; k ++){
                    html[sheetId]["children"][j]["children"][k] = {};
                    html[sheetId]["children"][j]["children"][k]["cellid"] = $(tds[k]).attr("cellid");
                    if($(tds[k]).find("div").length>0){
                        html[sheetId]["children"][j]["children"][k]["value"] = $(tds[k]).find("div").text();
					}else{
                        html[sheetId]["children"][j]["children"][k]["value"] = $(tds[k]).text();
					}
                }
			}
		}

        var _excel = this;
		var htmlstr = JSON.stringify(html);

        var url = "http://10.0.34.13:11002/workflow/formmanage/exportExcelWithData";
        var form = $("<form></form>").attr("action", url).attr("method", "post");
        form.append($("<input></input>").attr("type", "hidden").attr("name", "html").attr("value", htmlstr));
        form.append($("<input></input>").attr("type", "hidden").attr("name", "pageId").attr("value", _excel.page_Id));
        form.appendTo('body').submit().remove();
	}
};

var _Map = {};
getExcel = function(id) {
	try {
		if (!document.getElementById("__excelContainer")) {
			return undefined;
		}
		var _obj = _Map['' + id + ''];
		if (_obj == undefined) {
			_obj = new Excel(id);

		}
		return _obj;
	} catch (e) {
		return undefined;
	}
};

function getEvent() {
	if (document.all) {
		return window.event;// 如果是ie
	}
	___func = getEvent.caller;
	while (___func != null) {
		var arg0 = ___func.arguments[0];
		if (arg0) {
			if ((arg0.constructor == Event || arg0.constructor == MouseEvent)
					|| (typeof (arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
				return arg0;
			}
		}
		___func = ___func.caller;
	}
	return null;
}

function getEventObject() {
	var e = getEvent();
	var o = e.target;
	if (!o) {
		o = e.srcElement;
	}
	return o;
}

if (!window.pt) {
	pt = function() {
	};
}
if (!window.pt.ui) {
	pt.ui = function() {
	};
}

var UI = pt.ui;

var JSON = new (function() {
	var useHasOwn = !!{}.hasOwnProperty, isNative = function() {
		var useNative = null;
		return function() {
			if (useNative === null) {
				useNative = window.JSON && JSON.toString() == '[object JSON]';
			}
			return useNative;
		};
	}(), pad = function(n) {
		return n < 10 ? "0" + n : n;
	}, doDecode = function(json) {
		return eval('(' + json + ')');
	}, doEncode = function(o) {
		if (typeof o == "undefined" || o === null) {
			return "null";
		} else if (o.push) {
			return encodeArray(o);
		} else if (o.getFullYear) {
			return Pt.util.JSON.encodeDate(o);
		} else if (typeof o == "string") {
			return encodeString(o);
		} else if (typeof o == "number") {
			return isFinite(o) ? String(o) : "null";
		} else if (typeof o == "boolean") {
			return String(o);
		} else {
			var a = [ "{" ], b, i, v;
			for (i in o) {
				if (!useHasOwn || o.hasOwnProperty(i)) {
					v = o[i];
					switch (typeof v) {
					case "undefined":
					case "function":
					case "unknown":
						break;
					default:
						if (b) {
							a[a.length] = ',';
						}
						a[a.length] = doEncode(i);
						a[a.length] = ":";
						a[a.length] = v === null ? "null" : doEncode(v);
						b = true;
					}
				}
			}
			a[a.length] = "}";
			return a.join("");
		}
	}, m = {
		"\b" : '\\b',
		"\t" : '\\t',
		"\n" : '\\n',
		"\f" : '\\f',
		"\r" : '\\r',
		'"' : '\\"',
		"\\" : '\\\\'
	}, strReg1 = /["\\\x00-\x1f]/, strReg2 = /([\x00-\x1f\\"])/g,
	encodeString = function(s) {
		if (strReg1.test(s)) {
			return '"' + s.replace(strReg2, function(a, b) {
						var c = m[b];
						if (c) {
							return c;
						}
						c = b.charCodeAt();
						return "\\u00" + Math.floor(c / 16).toString(16)
								+ (c % 16).toString(16);
					}) + '"';
		}
		return '"' + s + '"';
	}, encodeArray = function(o) {
		var a = [ "[" ], b, i, l = o.length, v;
		for (i = 0; i < l; i += 1) {
			v = o[i];
			switch (typeof v) {
			case "undefined":
			case "function":
			case "unknown":
				break;
			default:
				if (b) {
					a[a.length] = ',';
				}
				a[a.length] = v === null ? "null" : JSON.encode(v);
				b = true;
			}
		}
		a[a.length] = ']';
		return a.join("");
	};

	var encodeDate = function(o) {
		return '"' + o.getFullYear() + "-" + pad(o.getMonth() + 1) + "-"
				+ pad(o.getDate()) + "T" + pad(o.getHours()) + ":"
				+ pad(o.getMinutes()) + ":" + pad(o.getSeconds()) + '"';
	};

	this.encodeDate = encodeDate;

	this.encode = function() {
		var ec;
		return function(o, dateFormat) {
			if (!ec) {
				ec = isNative() ? JSON.stringify : doEncode;
			}

			if (dateFormat)
				this.encodeDate = dateFormat;

			var s = ec(o);

			if (dateFormat)
				this.encodeDate = encodeDate;

			return s;
		};
	}();

	this.decode = function() {
		var dc;
		var re = /[\"\'](\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})[\"\']/g;
		return function(json) {
			json = json.replace(re, "new Date($1,$2-1,$3,$4,$5,$6)");
			if (!dc) {
				dc = isNative() ? JSON.parse : doDecode;
			}
			return dc(json);
		};
	}();

    this.stringify = function(){
        var sf;
        return function(o, dateFormat) {
            if (!sf) {
                // setup encoding function on first access
                sf = isNative() ? JSON.stringify : doEncode;
            }

            if(dateFormat) this.encodeDate = dateFormat;

            var s = sf(o);

            if(dateFormat) this.encodeDate = encodeDate;

            return s;
        };
    }();

    this.parse = function() {
        var dc;
        var re = /[\"\'](\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})[\"\']/g;
        return function(json) {
            json = json.replace(re, "new Date($1,$2-1,$3,$4,$5,$6)");
            if (!dc) {
                // setup decoding function on first access
                dc = isNative() ? JSON.parse : doDecode;
            }
            return dc(json);
        };
    }();

})();

UI.JSON = UI.JSON || {};
UI.JSON = new (function() {
	this.decode = function(json) {
		return JSON.decode(json);
	};
	this.encode = function(json) {
		return JSON.encode(json);
	};
})();

Date.prototype.dateToStr = function(format) {
	var o = {
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"H+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds()
	// millisecond
	};
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
	return format;
};

Date.prototype.strToDate = function(str) {
	var s = str;
	var a = s.split(/[^0-9]/);
	var d = this;
	if (a.length == 3) {
		d = new Date(a[0], a[1] - 1, a[2]);
	} else if (a.length == 6) {
		d = new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
	return d;
};

String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
};

String.prototype.trim = function() {
	var re = /^\s+|\s+$/g;
	return function() {
		return this.replace(re, "");
	};
}();

function UUID() {
	var s = [], itoh = '0123456789ABCDEF'.split('');
	for (var i = 0; i < 36; i++)
		s[i] = Math.floor(Math.random() * 0x10);
	s[14] = 4;
	s[19] = (s[19] & 0x3) | 0x8;
	for (var i = 0; i < 36; i++)
		s[i] = itoh[s[i]];
	s[8] = s[13] = s[18] = s[23] = '-';
	return s.join('');
}

function _strlen(s) {
	var l = 0;
	var a = s.split("");
	for (var i = 0; i < a.length; i++) {
		if (a[i].charCodeAt(0) < 299) {
			l++;
		} else {
			l += 2;
		}
	}
	return l;
}

function _convertMoneyToChineseStr(money) {
	// 汉字的数字
	var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
	// 基本单位
	var cnIntRadice = new Array('', '拾', '佰', '仟');
	// 对应整数部分扩展单位
	var cnIntUnits = new Array('', '万', '亿', '兆');
	// 对应小数部分单位
	var cnDecUnits = new Array('角', '分', '毫', '厘');
	// 整数金额时后面跟的字符
	var cnInteger = '整';
	// 整型完以后的单位
	var cnIntLast = '元';
	// 最大处理的数字
	var maxNum = 999999999999999.9999;
	// 金额整数部分
	var integerNum;
	// 金额小数部分
	var decimalNum;
	// 输出的中文金额字符串
	var chineseStr = '';
	// 分离金额后用的数组，预定义
	var parts;
	if (money == '') {
		return '';
	}
	money = parseFloat(money);
	if (money >= maxNum) {
		// 超出最大处理数字
		return '';
	}
	if (money == 0) {
		chineseStr = cnNums[0] + cnIntLast + cnInteger;
		return chineseStr;
	}
	// 转换为字符串
	money = money.toString();
	if (money.indexOf('.') == -1) {
		integerNum = money;
		decimalNum = '';
	} else {
		parts = money.split('.');
		integerNum = parts[0];
		decimalNum = parts[1].substr(0, 4);
	}
	// 获取整型部分转换
	if (parseInt(integerNum, 10) > 0) {
		var zeroCount = 0;
		var IntLen = integerNum.length;
		for (var i = 0; i < IntLen; i++) {
			var n = integerNum.substr(i, 1);
			var p = IntLen - i - 1;
			var q = p / 4;
			var m = p % 4;
			if (n == '0') {
				zeroCount++;
			} else {
				if (zeroCount > 0) {
					chineseStr += cnNums[0];
				}
				// 归零
				zeroCount = 0;
				chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
			}
			if (m == 0 && zeroCount < 4) {
				chineseStr += cnIntUnits[q];
			}
		}
		chineseStr += cnIntLast;
	}
	// 小数部分
	if (decimalNum != '') {
		var decLen = decimalNum.length;
		for (var i = 0; i < decLen; i++) {
			var n = decimalNum.substr(i, 1);
			if (n != '0') {
				chineseStr += cnNums[Number(n)] + cnDecUnits[i];
			}
		}
	}
	if (chineseStr == '') {
		chineseStr += cnNums[0] + cnIntLast + cnInteger;
	} else if (decimalNum == '') {
		chineseStr += cnInteger;
	}
	return chineseStr;
}
//sheetID，sheet页标识，excelCellId：excel中单元格标识
//计算单元格真是值，如果cell定义中标识为空，则返回excelCellId,否则返回cell定义的标识
function calculateRealCellId(sheetID,excelCellId){
	if(__bindingJson){
		var bindingJson = UI.JSON.decode(__bindingJson);
		for(var sheetName in bindingJson ){
			if( escape(sheetName).replaceAll("%", "_") == sheetID){
				var bindings=bindingJson[sheetName];
				for(var i=0;i<bindings.length;i++){
					var binding=bindings[i];
					if(undefined==binding["id"]){//表单绑定信息
						var position =binding.position;
						position=position.replaceAll("\\\$", "");
						if(position==excelCellId){
							if(binding.identification!=undefined&&binding.identification!=""){
								return binding.identification
							}
						}
					}else{//列表绑定信息
						var items=binding["items"];
						for(var j=0;j<items.length;j++){
							var item=items[j];
							var position =item.position;
							position=position.replaceAll("\\\$", "");
							if(position==excelCellId){
								if(item.identification!=undefined&&item.identification!=""){
									return item.identification
								}
							}
						}
					}
				}
			}
		}
	}
	return excelCellId;
}

function refreshExcel(innerId){
	$("#__excelContainer").empty();
	params.usage="edit";
	__excel = getExcel("a");
	__excel.reset();
	excelWidgetRender(params,true);
}
function setExcelPaddingLeft(num){
	if(num<0){
		return ;
	}
	$("#__excelContainer").attr("style","float:left;padding-left:"+num+"px;");
}
/**
 * 集标识dsId绑定是否是表单
 * @param dsId
 * @returns
 */
function isExcelForm(dsId){
	 if(isGrid(dsId)){
		 return false;
	 }
	 return true;
	}
/**
 * 集标识dsId是否绑定是列表
 * @param dsId
 * @returns
 */
function isExcelGrid(dsId){
	var obj=$("div[gridid][datasetid='"+dsId+"']");
	if(obj.length>0){
		return true;
	}
	return false;
}
/**
 * 集标识dsId是否绑定的固定列表
 * @param dsId
 * @returns
 */
function isDExcelGrid(dsId){
	var obj=$("div[gridtype='d'][datasetid='"+dsId+"']");
	if(obj.length>0){
		return true;
	}
	return false;
}
/**
 * 集标识dsId是否绑定动态列表
 * @param dsId
 * @returns
 */
function isSExcelGrid(dsId){
	var obj=$("div[gridtype='s'][datasetid='"+dsId+"']");
	if(obj.length>0){
		return true;
	}
	return false;
}
/**
 * 获取列表行数：
 * @param dsId：列表绑定集标识
 * @returns
 */
function getRowCountOfExcelGrid(dsId){
	if(isDExcelGrid(dsId)){
		var obj=$("td[gridtype='d'][datasetid='"+dsId+"']");
		var parentObj=obj.parent();
		return parentObj.length;
		
	}else if(isSExcelGrid(dsId)){
		var obj=$("td[gridtype='s'][datasetid='"+dsId+"']");
		var parentObj=obj.parent();
		return parentObj.length;
	}
	return 0;
}
/**
 * @param datasetid：集标识
 * @param i：从0开始
 * @param datasetattr：集属性标识
 * @returns
 */
function getItemObjOfExcelGrid(datasetid,i,datasetattr){
	if(isDExcelGrid(datasetid)){
		return $("div[id*='"+datasetid+"___"+datasetattr+(i+1)+"'][gridtype='d']")[0];
	}else if(isSExcelGrid(datasetid)){
		var index=i;
		if(i==0){
			index="";
		}
		return $("div[id*='"+datasetid+"___"+datasetattr+"_"+(index)+"'][gridtype='s']")[0];
	}
}

//excel相应tab按键切换输入框
$(document.body).keydown(function(obj){
    var event = window.event || event;
    var key = event.keyCode;

    //获得全部绑定属性的td
    var attrArray = $("td[datasetId][editortype!=PTUIExcelLabel]");

    //构造绑定的td与编号map
    var indexMap = {};
    for(var i = 0 ; i < attrArray.length ; i ++){
    	indexMap[$(attrArray[i]).attr("id")] = i;
	}

	var _excel = getExcel('a');

    //获得当前sheet页id
    var currentSheetID = $("div:visible[id^=_excel_tabContent_]").attr("id");
    var prefix = "_excel_tabContent_";
    currentSheetID = currentSheetID.substring(prefix.length,currentSheetID.length);

    //按下tab键时相应
    if(key == 9){

        //获得当前激活的控件和其所属td
    	var target = obj.target;
    	var oriInput = $(target).parent().prev();
        var oriInputID = oriInput.attr("id");
        var oriIndex = indexMap[currentSheetID+"_"+oriInputID];

        //当tab完所有td后重回第一个，否则继续
        var nextIndex = 0;
        if(oriIndex < attrArray.length-1){
            nextIndex = oriIndex+1;
        }

        //获得下一个td
		var nextInputTD = attrArray[nextIndex];

        //先取消激活态的当前输入框焦点
        $(oriInput).next().find("input").first().blur();

        //清除当前控件
        _excel.removeOtherWidget();

        //激活下一个控件
        _excel.showEditor($(nextInputTD),null,true);
	}
});
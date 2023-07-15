var excelformula = function($) {
	var formulaMap = {};
	var originalData = {};
	var GridDeleteRowsBind = {};
	$.get(params.contextPath + '/static/formula/' + params.pageId + '.json', function(data) {
		if (data) {
			//console.log(data);
			originalData = data;
			$.each(data, function(key, value) {
				//console.log(key);
				//console.log(value);
				var attrValue = {};
				attrValue[key] = value;
				//				retr = value.match(/(?<={{)(\w*)(?=}})/g);
				retr = value.match(/{{(\w*)}}/g);
				$.each(retr, function(index, cellid) {
					cellid = cellid.substring(2, cellid.length - 2);
					if (formulaMap[cellid] == null) {
						formulaMap[cellid] = {};
					}
					formulaMap[cellid][key] = value;
				});
			});
			//console.log(formulaMap);
		}

	});
	
	$.get(params.contextPath + '/static/formula/' + params.pageId + '_deleterow.json', function(data) {
		if (data) {
			GridDeleteRowsBind = data;
		}
	});
	
	var execute = function(str, $tr) {
		if (str) {
			//console.log(typeof(str));
			if (str.indexOf('SUM') != -1) {
				//console.log(str);
				var result = eval(str);
				if(isNaN(result)||result===Infinity||result===-Infinity){
					return 0.00;
				}else{
					return result;
				}
			} else {
				var replaceVariable = str.replace(/{{(\w*)}}/g, function(fullStr, cellid) {
					//console.log(cellid);
					var $cellid = getCellidJqueryTD(cellid, $tr);

					return tdValue($cellid);
				});
				//console.log(replaceVariable);
				var result = eval(replaceVariable);
				if(isNaN(result)||result===Infinity||result===-Infinity){
					return 0.00;
				}else{
					return result;
				}
			}
		}
	}

	/**
	 * @param {Object} cellid
	 * @param {Object} $tr
	 */
	var getCellidJqueryTD = function(cellid, $tr) {
		//console.log($tr);
		var $cellid;
		if ($tr) {
			$cellid = $tr.find("td[cellid='" + cellid + "']");
		}

		//console.log($cellid.length);
		if ($cellid == null || $cellid.length == 0) {
			$cellid = $("td[cellid='" + cellid + "']");
		}
		//console.log($cellid);
		return $cellid;
	}

	var tdValue = function($td, value, __excel) {
		//console.log($td);
		var $that = $td.find("div");
		//console.log($that);
		//console.log($that.length);
		if ($that.length == 0) {
			$that = $td;
		}
		if (value == 0) {
			$that.html(0);
		}
		//debugger
		if (value) {
			//value=Math.round(value*100)/100;
			//设置逗号分隔符号
			var displayValue = value + "";
			var p = /(\d+)(\d{3})/;
			while (p.test(displayValue)) {
				displayValue = displayValue.replace(p, "$1" + "," + "$2");
			}
			if ($td.attr('datasetid')) {
				var fillId = $td.attr('id');
				var excelId = fillId.slice(fillId.indexOf('_') + 1);

				__excel.setCellValue(excelId, value, displayValue, null, false);
			}
			$that.html(displayValue);
		} else {
			//console.log("$that.html():"+$that.html());
			var val = $that.html() ? $that.html() : "0.00";
			//删除逗号分隔
			val = val.replaceAll(",", "");
			//console.log(val);
			
			return "("+val+")";
		}
	}

	var SUM = function(str) {
		var cellIdArr = str.match(/{{(\w*)}}/g);
		var $td;
		$.each(cellIdArr, function(index, cellId) {
			cellId = cellId.substring(2, cellId.length - 2);
			$td = $("td[cellid=" + cellId + "]");
			if (!$td.attr("gridid")) {
				return false;
			}
		});
		var retr = 0;
		$td.each(function(index, dom) {
			$tr = $(dom).parent();
			//console.log($tr);
			retr += execute(str, $tr);
		});
		return retr;
	}

	var ADD = function(str) {
		//console.log(str);
		return execute(str, null);
	}

	var getDataSourceAttrValue = function(datasource, key) {
		var retr;
		if (params.usage == "add" && __excelData[datasource].length != 4) {
			var durl = params.contextPath + "/uipage/page/clientrest?op=getDataSet&pageId=" + params.pageId + "&optionValue=" +
				datasource + ",key,value";
			$.ajax({
				url: durl,
				type: "GET",
				async: false,
				success: function(result) {
					result = JSON.parse(result);
					if (result) {
						var datas = [];
						$.each(result, function(index, rowData) {
							var d = {
								"key": rowData.key,
								"value": rowData.text
							};
							datas.push(d);
						});
						__excelData[datasource] = datas;
					}

				}
			});

		}

		$.each(__excelData[datasource], function(index, rowData) {
			if (rowData.key == key) {
				retr = rowData.value;
				return false;
			}
		});
		//console.log(retr);
		return retr;
	}

	/**
	 * 主入口，传入$div的值，
	 * @param {Object} $div
	 * @param {Object} __excel
	 */
	var calculate = function($dom, __excel) {
		//console.log(formulaMap);
		if($dom[0]&&$dom[0].nodeName){
			var domType = $dom[0].nodeName;
			//console.log($dom);
			//console.log(domType);
			var $td;
			if (domType == "DIV") {
				$td = $dom.parent();
			} else if (domType == "TD") {
				$td = $dom;
			}
			var cellId = $td.attr("cellid");

			var $tr = $td.parent();
			//console.log($tr);
			var linkFormulaMap = formulaMap[cellId];
			if (linkFormulaMap) {
				$.each(linkFormulaMap, function(affectCellId, formula) {
					var retr = execute(formula, $tr);
					//				retr=Math.round(retr*100)/100;
					retr = retr.toFixed(2);
					var $affectTD = getCellidJqueryTD(affectCellId, $tr);
					//debugger
					//console.log($affectTD.attr('cellid')+":"+retr);
					tdValue($affectTD, retr, __excel);
					//console.log(cellId+":"+ retr);
					calculate($affectTD, __excel);
				});
			}
		}
	}
	var pageLoadCalculate = function(__excel) {
		var f = [
			"G14",
			"N14",
			"G17",
			"L17",
			"M17",
			"N17",
			"O17",
			"G20",
			"L20",
			"M20",
			"N20",
			"O20",
			"G23",
			"L23",
			"N23",
			"O23",
			"B29",
			"B10"
		];
		$.each(f, function(index, value) {
			calculateCellId(value,__excel,false);
		});
	}
	
	var calculateCellId = function(cellid,__excel,isCascade){
		var affectCellId = cellid;
		var formula = originalData[cellid];
		var $tr = $("td[cellid='" + affectCellId + "']").parent();
		//console.log(cellid);
		//console.log(formula);
		var retr = execute(formula, $tr);
		//			retr=Math.round(retr*100)/100;
		retr = retr.toFixed(2);
		var $affectTD = getCellidJqueryTD(affectCellId, $tr);
		
		tdValue($affectTD, retr, __excel);
		if(isCascade){
			calculate($affectTD, __excel);
		}
		
	}

	var deleteRowCalculate = function(datasetIID,__excel) {
		var cellIdArr = GridDeleteRowsBind[datasetIID];
		$.each(cellIdArr,function(index,value){
			calculateCellId(value,__excel,true);
		});
	}

	return {
		calculate: calculate,
		pageLoadCalculate: pageLoadCalculate,
		deleteRowCalculate: deleteRowCalculate
	};
}($);

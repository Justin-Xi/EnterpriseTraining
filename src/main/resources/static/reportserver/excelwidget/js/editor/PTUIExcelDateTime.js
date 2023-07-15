(function($){
    /** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
     可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
     Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
     * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
     * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
     * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
     * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
     */
    Date.prototype.pattern=function(fmt) {
        var o = {
            "M+" : this.getMonth()+1, //月份
            "d+" : this.getDate(), //日
            "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
            "H+" : this.getHours(), //小时
            "m+" : this.getMinutes(), //分
            "s+" : this.getSeconds(), //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S" : this.getMilliseconds() //毫秒
        };
        var week = {
            "0" : "/u65e5",
            "1" : "/u4e00",
            "2" : "/u4e8c",
            "3" : "/u4e09",
            "4" : "/u56db",
            "5" : "/u4e94",
            "6" : "/u516d"
        };
        if(/(y+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        if(/(E+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
        }
        for(var k in o){
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt;
    }
    var createWidget = function($widget,options,$this){
    	$widget.attr('id',options.attrId);
        $widget.attr('name',options.elemId);
        $widget.attr('value',options.textValue);
    }
    var existInDateTimePattern=function(pattern){
    	var dateTimePattern=["yyyy年MM月dd日 HH:mm:ss","yyyy年MM月dd日 HH时mm分ss秒","yyyy/MM/dd HH:mm:ss"];
    	if(pattern!=undefined&&pattern!=""){
    		for(var i=0;i<dateTimePattern.length;i++){
    			if(dateTimePattern[i]==pattern){
    				return true;
    			}
    		}
    	}
    	return false;
    }
    $.fn.PTUIExcelDateTime = function(options, param){
        if (typeof options == 'string'){
            return $.fn.PTUIExcelDateTime.methods[options](this, param);
        }
    };

    $.fn.PTUIExcelDateTime.methods = {
        setValue : function(jq){
            return jq.each(function(){
            	  var options = $(this).data();
              	  var per=permissionsValidateExcel(permissionsValidation,options.position);
              	  if("h"!=per){
	                  var value = options.value;
	                  var datePattern =options.showStyle;//"yyyy年MM月dd日";
	                  if(!datePattern || datePattern==undefined || datePattern==""){
	                	  datePattern="yyyy年MM月dd日";
	                  }
	                  if(value){
	                      var dateValue =new Date(value);
	                      var displayValue = dateValue.pattern(datePattern);
	                      $(this).text(displayValue);
	                  }else{
//	                	  var showDatePattern =datePattern;
//	                	  showDatePattern = showDatePattern.replace(/\w*/g,"	");
//	                	  $(this).text(showDatePattern);
	                	  $(this).text("");
	                  }
              	  }
            })
        },
        create :function(jq){
            return jq.each(function(){
                var options = $(this).data();
                var editor = options.editor;
                var datetimeboxOption = {value:options.textValue};
                var easyuiwidget = "datebox";
                if(options.isShowTime){
                    easyuiwidget = "datetimebox";
                }
                if(editor){
                    $(editor).prependTo($(this).empty())[easyuiwidget](datetimeboxOption);
                }else{
                    var $datetimebox = $("<input  class='easyui-datetimebox' style='width:100%;height:100%;'>");
                    createWidget($datetimebox,options, $(this));
                    $datetimebox.prependTo($(this).empty())[easyuiwidget](datetimeboxOption);
                    $(this).data("editor",$datetimebox);
                }
            })
        },
        createJquery:function(jq,showLabel){
            var $datetimebox ;
            var options = $(jq).data();
            if(existInDateTimePattern(options.showStyle)){
                $datetimebox = $("<input class='easyui-datetimebox' >");
            }else{
                $datetimebox = $("<input class='easyui-datebox' >");
            }

            var displayDatePattern = "MM/dd/yyyy";
            if(existInDateTimePattern(options.showStyle)){
                displayDatePattern = "MM/dd/yyyy HH:mm:ss";
            }
            var datetimeboxOption;
            if(showLabel){
                datetimeboxOption = {"label":options.name+' :',"labelPosition":'left'};
            }else{
                datetimeboxOption = {};
                (function($widget,$this){
                    $widget.height($this.height()-2);
                    $widget.width($this.width()-2);
                })($datetimebox,$(jq));
            }
            if(options.value){
                var dateValue =new Date(options.value);
                datetimeboxOption.value = dateValue.pattern(displayDatePattern);
            }
            $datetimebox.attr('id',options.attrId);
            $datetimebox.attr('name',options.elemId);
            $datetimebox.data({"options":datetimeboxOption});
            $datetimebox.data({"srcDom":$(jq)});
            $(jq).data("editor",$datetimebox);
            return $datetimebox;

        },
        destory:function(jq){
            return jq.each(function(){
                var editor = $(this).data("editor");
                var easyuiwidget = "datebox";
                if(existInDateTimePattern($(this).data("showStyle"))){
                    easyuiwidget = "datetimebox";
                }
                var newValue = $(editor)[easyuiwidget]("getValue");
                if(newValue!=""){
                    $(this).data("value",Date.parse(newValue));
                }else{
                    $(this).data("value","");
                }
                $(this).data("textValue",newValue);
                $(this).PTUIExcelDateTime('setValue');
                __excel.synchronizeData($(this));
            })
        }
    };
})(jQuery)
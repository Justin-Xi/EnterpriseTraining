(function($){

    var createWidget = function($widget,options,$this){
        $widget.attr('id',options.attrId);
        $widget.attr('name',options.elemId);
        $widget.attr('value',options.value);
        $widget.attr('precision',options.precision);
        $widget.attr('max',options.max);
        $widget.attr('min',options.min);
        formatSize($widget,$this);
    }

    var formatSize = function($widget,$this){
        $widget.height($this.height()-2);
        $widget.width($this.width()-2);
    }

    $.fn.PTUIExcelNumberField = function(options, param){
        if (typeof options == 'string'){
            return $.fn.PTUIExcelNumberField.methods[options](this, param);
        }
    };

    $.fn.PTUIExcelNumberField.methods = {
        setValue : function(jq){
        	var options = $(jq).data();
        	if(options){
    			var per=permissionsValidateExcel(permissionsValidation,options.position);
    			if("h"!=per){
    				return jq.each(function() {
    						var value = $(this).data("value");
    						value = value +"";
    						var isWrap = $(this).attr("isWrap");
    						 var p=/(\d+)(\d{3})/;
    		                    while(p.test(value)){
    		                    	value=value.replace(p,"$1"+","+"$2");
    		                    }
    	                    if(isWrap=="true"){
        						$(this).text(value);
    	                    }else{
    	                        $("#"+$(this).attr("id")+"_div").text(value);
    	                        $("#"+$(this).attr("id")+"_div").attr("title",value);
    	                    }
    				})
    			}
        	}            
        },
        create :function(jq){
            return jq.each(function(){
                var editor = $(this).data("editor");
                if(editor){
                    $(editor).prependTo($(this).empty()).numberbox();
                }else{
                    var $input = $("<input  class='easyui-numberbox' >");
                    var options = $(this).data;
                    createWidget($input,options, $(this));
                    $(this).data("editor",$input);
                    $input.prependTo($(this).empty()).numberbox({"value":$(this).data('value')});
                }
            })
        },
        createJquery:function(jq,showLabel){
        	var options = $(jq).data();
            var $input = $("<input  class='easyui-numberbox'>");
            $input.attr('id',options.attrId);
            $input.attr('name',options.elemId);
            $input.attr('value',options.value);
            var attrMap = {};
            if(options.precision){
            	attrMap['precision'] = parseInt(options.precision);
            }
            if(options.max){
            	attrMap['max'] = parseInt(options.max);
            }
            if(options.min){
            	attrMap['min'] = parseInt(options.min);
            }
            attrMap['groupSeparator'] = ',';
            if(showLabel){
                $input.data({"options": $.extend({"value":options.value,"label":options.name+' :',"labelPosition":'left'},attrMap)});
            }else{
                $input.data({"options":$.extend({"value":options.value,readonly:false},attrMap)});
                formatSize($input,$(jq));
            }
            $input.data({"srcDom":$(jq)});
            $(jq).data("editor",$input);
            return $input;
        },
        destory:function(jq){
            return jq.each(function(){
            	try{
                    var editor = $(this).data("editor");
                    var newValue = $(editor).numberbox("getValue");
                    $(this).data("value",newValue);
                    var displayValue = newValue+"";
                    var p=/(\d+)(\d{3})/;
                    while(p.test(displayValue)){
                    	displayValue=displayValue.replace(p,"$1"+","+"$2");
                    }
                    var isWrap = $(this).attr("isWrap");
                    if(isWrap=="true"){
                        $(this).html(displayValue+"");
                    }else{
                        $("#"+$(this).attr("id")+"_div").text(displayValue+"");
                        $("#"+$(this).attr("id")+"_div").attr("title",displayValue+"");
                    }
                   
                    __excel.synchronizeData($(this));
            	}catch(e){
            		
            	}
            })
        }
    }
})(jQuery)
(function($){

    var createWidget = function($widget,options,$this){
        $widget.attr('id',options.attrId);
        $widget.attr('name',options.elemId);
        $widget.attr('value',options.value);
        formatSize($widget,$this);
    }

    var formatSize = function($widget,$this){
        $widget.height($this.height()-2);
        $widget.width($this.width()-2);
    }

    var setValue4widget = function(optionItem,realValue,$widget,options,displayValue){
    	if(realValue!=undefined&&realValue!=null&&realValue!=""){
    		realValue = realValue + "";
            var text = [];
            $.each(optionItem,function(index,item){
            	if(item.key==realValue){
                	displayValue = item.text;
                    return;
                }
            });
            
            $widget.text(displayValue);
    	}else{
    		$.each(optionItem,function(index,item){
            	if(item.key==options.defaultOption){
                	displayValue = item.text;
                    return;
                }
            });
            if(displayValue==undefined){
            	displayValue="";
            }
    		$widget.html(displayValue);
    	}
    }

    $.fn.PTUIExcelSelect = function(options, param,itemvalue){
        if (typeof options == 'string'){
            return $.fn.PTUIExcelSelect.methods[options](this, param,itemvalue);
        }
    };

    $.fn.PTUIExcelSelect.methods = {
        setValue : function(jq,displayValue){
            return jq.each(function(){
                var options = $(this).data();
			    var position = (options != undefined && options != null) ? options.position	: undefined;
				var per = permissionsValidateExcel(permissionsValidation,position);
				if ("h" != per) {
					var realValue = options.value;
					var $this = $(this);
					var optionItem = options.optionItem;
					var elemId = options.elemId;
					if (optionItem) {
						setValue4widget(optionItem, realValue, $this,
								options, displayValue);
					}
				}
                
            })
        },
        createJquery:function(jq,showLabel){
            var $combobox = $("<input  class='easyui-combobox' >");
            var options = $(jq).data();
            var value;
            if(options.value){
            	value = options.value.toString().split(",");
            }
            var optionsItem = options.optionItem;
            var comboboxOption ;
            if(showLabel){
                comboboxOption = {value:value,data:optionsItem,valueField:"key",textField:"text","label":options.name+' :',"labelPosition":'left'};
            }else{
                comboboxOption = {value:value,data:optionsItem,valueField:"key",textField:"text"};
                formatSize($combobox,$(jq));
            }
            if(options.type && options.type =="multiple"){
                $.extend(comboboxOption,{multiple:true});
            }
            $combobox.attr('id',options.attrId);
            $combobox.attr('name',options.elemId);
            $combobox.data({"options":comboboxOption});
            $combobox.data({"srcDom":$(jq)});
            $(jq).data("editor",$combobox);
            return $combobox;
        },
        destory:function(jq){
            return jq.each(function(){
                var editor = $(this).data("editor");
                var newValue = "";
            	if($(this).data("type") &&$(this).data("type") == "multiple"){
                    newValue = $(editor).combobox("getValues").join(",");
                }else{
                    newValue = $(editor).combobox("getValue");
                }
                var displayValue = $(editor).combobox("getText");
                $(this).data("value",newValue);
                $(this).PTUIExcelSelect('setValue',displayValue);
                __excel.synchronizeData($(this));
            })
        },
        getWidgetText:function(jq,optionItem,itemvalue){
        	var text="";
        	if(optionItem!=undefined){
        		for(var i=0;i<optionItem.length;i++){
        			if(optionItem[i]["key"]==itemvalue){
            			text=optionItem[i]["text"];
            			break;
        			}
        		}
        	}
        	return text;
        },
        setSelectData : function(jq,data,displayValue){
            return jq.each(function(){
                var options = $(this).data();
			    var position = (options != undefined && options != null) ? options.position	: undefined;
				var per = permissionsValidateExcel(permissionsValidation,position);
				if ("h" != per) {
					var realValue = options.value;
					var $this = $(this);
					options.optionItem=data;
					var optionItem = options.optionItem;
					var elemId = options.elemId;
					if (optionItem) {
						setValue4widget(optionItem, realValue, $this,
								options, displayValue);
					}
				}
                
            })
        }
    };
})(jQuery)
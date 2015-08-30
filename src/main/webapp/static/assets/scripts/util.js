/**
 * 页面js工具类
 * 20140513 by gaomf
 * @returns {Util}
 */

Util = function(){
	this.cost = {
		success : "0",
		div : "errorDiv",
		msgId : "errorMsg",
		randColCssArray : [
			"orange", "blue", "green", 
			"purple", "pink", "blue_01", 
			"yellow", "gray", "green_01", "red"
		]
	};
	/**
	 * 判断是否为空
	 * param str 字符串
	 * return boolean true为空
	 */
	this.isNull = function (str) {
		return (null == str || typeof (str) == "undefined" || str.replace(/(^\s*)|(\s*$)/g, "") == "");
	};
	
	/**
	 * 判断是否成功
	 * param str 编码
	 * return boolean true成功
	 */
	this.isSuccess = function(code){
		return this.cost.success == code;
	};
	
	/**
	 * 设置提示消息
	 * param id
	 * param msg
	 */
	this.setMessage = function (id, msg) {
		$("#" + id).html(msg);
	};
	
	/**
	 * 设置提示消息
	 * param obj
	 * param msg
	 */
	this.setMsg = function (obj, msg) {
		$(obj).html(msg);
	};
	
	/**
	 * 获取消息
	 */
	this.getMsgValue = function(flag) {
		return flag ? '<p class="to_tip_mms"></p><img src="../images/ico/dui.png">' : '<p class="to_tip_mms"></p><img src="../images/ico/cuo.png">';
	};
	/**
	 * 获取数据
	 */
	this.getObjs = function(jqs){
		var objs = [];
		$(jqs).each(function(i, jq){
			objs.push(jq);
		});
		return objs;
	};
	/**
	 * 删除
	 */
	this.remove = function(objs, i){
		for (var i = 0; i < objs.length; i++) {
            if (arr.indexOf(arr[i]) != i) {
                arr.splice(i, 1);
                i--;
            }
        }
	};
	
	/**
	 * 获取值
	 * param value
	 */
	this.getValue = function(value){
		return this.isNull(value) ? "" : value;
	};

	/**
	 * 获取对象
	 * param id
	 */
	this.getObj = function(id){
		return document.getElementById(id);
	};
	
	/**
	 * 获取文本
	 * param id
	 */
	this.getText = function(id){
		var obj = this.getObj(id);
		return obj.options[obj.selectedIndex].text;
	};
	
	/**
	 * 获取随机数
	 */
	this.rand = function(number){
	    rnd.today = new Date();
	    rnd.seed = rnd.today.getTime();
	    function rnd(){
	        rnd.seed = (rnd.seed * 9301 + 49297) % 233280;
	        return rnd.seed / (233280.0);
	    };
	    return Math.ceil(rnd() * number);
	};
	
	/**
	 * @see 将json字符串转换为对象
	 * @param json字符串
	 * @return 返回object,array,string等对象
	 */
	this.toObj = function (strJson) {
		return eval( "(" + strJson + ")");
	};
	
	/**
	 * 设置消息
	 * param msg
	 */
	this.getMsg = function(msg){
		$("#" + this.cost.msgId).html(msg);
		return $("#" + this.cost.div).html();
	};
	
	/**
	 * 是否为数组
	 * param obj
	 * return boolean
	 */
	this.isArray = function(obj){
		return Object.prototype.toString.call(obj) === '[object Array]';    
	};
	
	/**
	 * 数据是否为空
	 * param obj
	 * return boolean
	 */
	this.isNullArray = function(obj){
		if (util.isArray(obj)) {
			if (obj.length > 0) {
				return false;
			}
		}
		
		return true;
	};
	
	/**
	 * 获取随机颜色样式
	 * param min, max
	 * return string
	 */
	this.getRandColCss = function(min, max){
		var randColCss = "";
		var random = this.getRandom(min, max);
		if (random < this.cost.randColCssArray.length) {
			randColCss = this.cost.randColCssArray[random];
		}
		return randColCss;
	};
	
	/**
	 * 获取随机数
	 * param min, max
	 * return int
	 */
	this.getRandom = function(min, max){
		return Math.floor(Math.random() * (max- min) + min);
	};
	
	/**
	 * 获取当前对象的left位置
	 * return l
	 */
	this.getL=function(e){  
		var  l=e.offsetLeft;  
		while(e=e.offsetParent){  
			l+=e.offsetLeft;  
		}  
		return  l;  
	 }; 
		 
	 /**
	 * 获取当前对象的top位置
	 * return t
	 */
	this.getT=function(e){  
		var  t=e.offsetTop;  
		while(e=e.offsetParent){  
			t+=e.offsetTop;  
		}  
		return  t;  
	};
	
	/**保留小数位数*/
	this.toFixed = function(nbr, len){ 
		if (isNaN(len) || len == null) { 
			len = 0; 
		} else { 
			if (len <0) { 
				len = 0; 
			} 
		}

		return Math.round(nbr * Math.pow(10, len)) / Math.pow(10, len); 
	};
	
	/**
	* 是否是数字
	* param str 字符串
	* return boolean
	*/
	this.isDigit = function(str){ 
		var patrn= /^[0-9]{1,20}$/; 
		if (!patrn.exec(str)) {
			return false;
		} 
		return true; 
	};
    
    /**
    * 超出字符串长度的位数则隐藏
    * param string 字符串
    * param length 长度
    * param replace 替换
    * return string
    */
    this.subStr = function(string, length, replace){
    	var str = "";
    	if (util.isNull(string)) {
    		return str;
    	}
    	var a = 0;
    	var temp = "";
    	for (var i = 0; i <= string.length; i++) {
    		if (string.charCodeAt(i) > 255) {
    			a = a + 2;
    		} else {
    			a++;
    		}
    		if (a >= length) {
    			return temp + (replace != undefined ? replace : "...");
    		}
    		temp = temp + string.charAt(i);
    	}
    	if (a < length) {
    		str = string;
    	}
    	
    	return str;
    };
    
    /**
     * 隐藏字符 以*号代替
     */
    this.hidStr = function(string, length){
    	var str = "";
    	if (util.isNull(string)) {
    		return str;
    	}
    	if (string.length < length) {
			for (var i = 0; i <= string.length - 1; i++) {
				str = str + "*";
			}
			return str;
		}
    	for (var i = 0; i <= string.length - 1; i++) {
    		if (string.length - i  <= length) {
    			str = str + "*";
    		} else {
    			str = str + string.charAt(i);
    		}
    	}
    	
    	return str;
    };
    
    /**
    * 显示信息,2秒后关闭
    */
    this.toast = function(message, title) {
    var d = null ;
    if(title) {
    	d = dialog({
    	    content: message, 
    	    title:title
    	});
    } else {
    	d = dialog({
    		width: '15em',
    	    content: message
    	});
    }

    	d.show();
    	setTimeout(function () {
    	    d.close().remove();
    	}, 2000);
    	return d ;
    };
    
    this.confirm = function(content, title, callbackOK) {
    	var t = title ? title : '信息' ;
    	var d = dialog({
    	    title: t,
    	    zIndex:99999,
    	    content: content,
    	    cancelDisplay:false,
    	    cancelValue:"取消",
    	    cancel: function () {},
    	    okValue:'确定',
    	    ok: function () {
    	    	if(typeof(callbackOK) == 'function') callbackOK();
    	    	return true ;
    	    }
    	});
    	d.showModal() ;
    } ;
    
    /**
     * 内容弹出框
     * callbackOnshow:初始化时调用的函数, 回调参数dialog
     * callbackOk:点击提交进的回调用函数, 回调参数dialog
     * width : 宽度
     * title : 标题
     * okValue:确定按钮的值
     * 示例:
     * util.modal(function(dialog) {
    		$.get(window.basePath+"/member/namecard/send/"+cardUserId,function(data) {  
    			dialog.content(data);
        	});   
    	}, function(dialog) {
    		SendCard.addValidate() ;
			if(SendCard.toForm.valid()) SendCard.submit(dialog) ;
    	}, 600, '递名片 ', '递交名片') ;
     */
    this.modal = function(callbackOnshow, callbackOk, width, title, okValue) {
    	title = title ? title:"信息" ;
    	okValue = okValue ? okValue:"提交" ;
    	width = width ? width:600 ;
    	var d = dialog({
		    title: title,
		    //fixed: true,
		    width: width,
		    onshow: function () {
				this.content("正在加载...");
				if(typeof(callbackOnshow) == 'function') callbackOnshow(this);
		    },
		    cancelValue: '取消',
		    cancel: function () {
		    	return true;
		    },
		    okValue: okValue,
		    ok: function () {
		    	if(typeof(callbackOk) == 'function') callbackOk(this);
				return false;
		    }
		 });
    	 d.showModal();
		 return d ;
    } ;
    
    /**
     * IE 8 9 提交表单时会将默认提示值会提交.
     */
    this.clear = function () {
    	var isIE8 = !! navigator.userAgent.match(/MSIE 8.0/);
        var isIE9 = !! navigator.userAgent.match(/MSIE 9.0/);
        if (isIE8 || isIE9) { 
            $('input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)').each(function () {
            	var input = $(this);
            	if (input.hasClass("placeholder")) {
                    input.val('') ;
                    input.removeClass('placeholder') ;
            	}
            });
        }
    };
    
    /**
     * 移除最后一位字符
     */
    this.removeLastOne = function(string){
    	if (util.isNull(string)) {
    		return "";
    	}
    	return string.substring(0, string.length - 1);
    };
    
    /**
     * percent 传入的Width百分比，比如0.2 就是20%
     */
    this.fixWidth = function(percent) 
    {  
        return document.body.clientWidth * percent ; //这里你可以自己做调整  
    };
    
    this.getToday = function(){
    	var datetime = new Date();
		var year = datetime.getFullYear();
		var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
		var day = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    	return year + "-" + month + "-" + day;
    };
    
    this.conversionClass = function(obj){
    	//查找p标签为有的样式
		var pobj = $(obj).parent().parent().find("p.color-orange");
		//移除p的样式
		$(pobj).removeClass("color-orange");
		//获取i标签的样式
		var hasClass = $(pobj).parent().find("i").attr("class");
		//替换i标签的样式
		$(pobj).parent().find("i").addClass(hasClass.substring(0,hasClass.length-1));
		//去除i标签的选中样式
		$(pobj).parent().find("i").removeClass(hasClass);
		//获取当前的样式
		var objClass = $(obj).attr("class");
		//当前样式选中
		$(obj).addClass(objClass+"0");
		//移除原来的样式
		$(obj).removeClass(objClass);
		//给当前的p标签添加样式
		$(obj).parent().find("p").addClass("color-orange");
    };
    
    this.showScaling = function(id,defHeight) {//内容太长，进行伸缩显示
    	var h = defHeight?defHeight:124;
    	var box = document.getElementById(id);
    	var height = box.offsetHeight;
    	if(height > h){
    		$("#"+id).css("overflow","hidden");
    		$("#"+id).css("height",(h+20)+"px");
    		var btn = document.createElement("a");
    		btn.style.color = "#f03518";//红色颜色
    		btn.style.cursor = "pointer";//手势的样式
    		btn.innerHTML = "<i class=\" icon-double-angle-down\"></i>显示全部";
    		$(btn).val("0");
    		$(btn).on("click",function(){
    			if ($(this).val() == "0") {
    				$(this).val("1");
    				$(this).html('<i class=\" icon-double-angle-up\"></i>收起');
    				$("#"+id).css("overflow","");
    				$("#"+id).css("height","");
    			} else {
    				$(this).val("0");
    				$(this).html("<i class=\" icon-double-angle-down\"></i>显示全部");
    				$("#"+id).css("overflow","hidden");
    				$("#"+id).css("height",(h+20)+"px");
    			}
    	    });
    		document.getElementById(id+"1").appendChild(btn);
    	}
    }
};

var util = new Util();

/**
 * @see 将javascript数据类型转换为json字符串
 * @param 待转换对象,支持object,array,string,function,number,boolean,regexp
 * @return 返回json字符串
*/
util.toJSON = function (object) {
	var type = typeof object;
	if ('object' == type && object != null) {
		if (Array == object.constructor)
			type = 'array';
		else if (RegExp == object.constructor)
			type = 'regexp';
		else
			type = 'object';
	}
	switch (type) {
		case 'undefined':
		case 'unknown': 
			return;
			break;
		case 'function':
		case 'boolean':
		case 'regexp':
			return object.toString();
			break;
		case 'number':
			return isFinite(object) ? object.toString() : 'null';
			break;
		case 'string':
			return '"' + object.replace(/(\\|\")/g,"\\$1").replace(/\n|\r|\t/g,
			function () {   
				var a = arguments[0];                   
				return  (a == '\n') ? '\\n':   
						(a == '\r') ? '\\r':   
						(a == '\t') ? '\\t': ""
						}) + '"';
				break;
		case 'object':
			if (object === null) return 'null';
			var results = [];
			for (var property in object) {
				var value = util.toJSON(object[property]);
				if (value !== undefined)
					results.push(util.toJSON(property) + ':' + value);
			}
			return '{' + results.join(',') + '}';
			break;
		case 'array':
			var results = [];
			for(var i = 0; i < object.length; i++) {
				var value = util.toJSON(object[i]);
				if (value !== undefined) results.push(value);
			}
			return '[' + results.join(',') + ']';
			break;
	}
};

util.qryCityByProvinceId =  function(provinceId,citySel) {
	if (!provinceId) {
		provinceId = $('select#provinceId').val();
	}
	if(!citySel){
		citySel = $("select#cityId");
	}
	if(provinceId == -1){
		$(citySel).html("<option value='-1'>请选择城市</option>");
		return;
	}
	
	
	var remote_url = window.basePath + "cities/" + provinceId;
	$.get(remote_url, function(datas) {
		$(citySel).empty();
		if (datas) {
			$(citySel).append("<option value='-1'>请选择城市</option>");
			for ( var i = 0; i < datas.length; i++) {
				var data = datas[i];
				$(citySel).append("<option value='" + data.id + "'>" + data.name + "</option>");
			}
		} else {
			$(citySel).append("<option value='-1'>请选择城市</option>");
		}
	});
};

util.passwordLevel = function(pwd){
	//判断输入密码的类型  
	function CharMode(iN){  
		if (iN>=48 && iN <=57) //数字  
			return 1;  
		if (iN>=65 && iN <=90) //大写  
			return 2;  
		if (iN>=97 && iN <=122) //小写  
			return 4;  
		else  
			return 8;   
	}
	//bitTotal函数  
	//计算密码模式  
	function bitTotal(num){  
		modes=0;  
		for (i=0;i<4;i++){  
			if (num & 1) modes++;  
			num>>>=1;  
		}
		return modes;  
	}
	//返回强度级别  
	function checkStrong(sPW){  
		if (sPW.length<6)  
			return 0; //密码太短，不检测级别
		Modes=0;  
		for (i=0;i<sPW.length;i++){  
			//密码模式  
			Modes|=CharMode(sPW.charCodeAt(i));  
		}
		return bitTotal(Modes);  
	}
  
	return checkStrong(pwd);  
};

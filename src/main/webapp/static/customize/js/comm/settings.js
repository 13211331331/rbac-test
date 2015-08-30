var Settings = function () {
	
	window.console = window.console || {};
	//console.log || (console.log = opera.postError);
	
	if(typeof JSON == 'undefined'){
		$('head').append($('<script type="text/javascript" src="' + window.basePath + '/static/customize/js/comm/json2.js' + ">"));
	};

    $.ajaxSetup({
		error:function(XMLHttpRequest, textStatus, errorThrown){
			if(textStatus == "error"){
				var result = XMLHttpRequest.responseJSON;
				if(result){
					var objType = typeof(result);
					if( objType == 'object') {
						//删除已经弹出的对话框
						var d = $("div[role].ui-popup-modal") ;
						if(!$.isEmptyObject(d)) {
							var next = d.next("div[tabindex]").first() ;
							next.remove() ;
							d.remove() ;
						}
						
						//弹出登录对话框
						util.modal(function(dialog) {
				    		$.get(window.basePath+"dialogLogin",function(data) {  
				    			dialog.content(data);
				        	});   
				    	}, function(dialog) {
				    		var loginform = $('#login-form');
				    		loginform.validate(Login.validate);
				    		if(loginform.valid()){
			    	    		Login.login();
			    	    	}
				    	}, 400, '登录 ', '登录') ;
					}
					return ;
				}
			}
			if(console && console.log){
				console.log("textStatus:" + textStatus + ";errorThrown:" + errorThrown );
			}
		},
		complete:function(xhr, textStatus){ 
			
		},
		cache:false
	});
    
    /**
     * 1 确认框 alert('content') // 默认title:消息  
     *   指定标题 alert('content', 'title') ;  
     *   确定后要调用其它事,即回调 例子 
     *   	方式一 alert('content', 'title', function() { alert('fff') ;}) ;
     *   	方式二 alert('content', function() { alert('fff') ;}) ;
     * 2 询问框 : alert('conent', 'title', function() {alert('确定');}, function() { alert('取消') ;}) ;
     */
    window.alert=function(mess, title,cb) {
    	var t = title ? title:"提示" ;
    	var d = dialog({
    	    title: t,
    	    zIndex:99999999,
    	    content: mess,
    	    width: '20em',
    	    cancel: false,
    	    okValue:'确定',
    	    ok: function () {
    	    	if(typeof(cb) == 'function') cb(this);
    	    	return true ;
    	    }
    	});
    	d.showModal() ;
    	return d ;
	};
	
	window.confirm = function(mess, title, cb) {
    	var t = title ? title:"确认提示" ;
    	var d = dialog({
    	    title: t,
    	    zIndex:99999999,
    	    width: '20em',
    	    content: mess,
    	    cancelValue: '取消',
    	    cancel: function () {
    	    	return true ;
    	    },
    	    okValue:'确定',
    	    ok: function () {
    	    	if(typeof(cb) == 'function') cb(this);
    	    	return true ;
    	    }
    	});
    	d.showModal() ;
    	return d ;
	};
	
	
	window.quickAlert = function(msg,title) {
		var d = dialog({
			title:title,
			quickClose:true,
			content:msg,
			width: '120em',
	   	    okValue:"确定",
	   	    ok: function () {
	   	    	return true;
	   	    }
	   	});
		d.show();
	};
	
	window.toast = function(title,msg,close) {
		var d = dialog({
			title : title,
			content : msg,
			width: '22em',
			quickClose:true,
		});
		d.show();
		if(!close){
			setTimeout(function() {
				d.close().remove();
			}, 2000);
		}
		
	};
	
	window.quickTips = function(eltId,msg,align) {
		var d = dialog({
		    align: align || 'bottom',
		    content: msg,
		    quickClose: true
		});
		d.show(document.getElementById(eltId));
	};
}();
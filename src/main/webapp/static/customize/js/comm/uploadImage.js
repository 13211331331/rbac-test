var UploadImage = function() {
	return {
		initMtUpload:function(id,module,cb,sizes){
			var moduleName = module;
			var __cb = cb;
			var __sizes = sizes;
			$("span#" + id).on('click',function(){
				var d = dialog({
					title:'上传封面',
					align:"center",
					width:800,
					height:600,
					onshow: function () {
	    	   	    	if(!UploadImage.dialog){
	    	   	    		UploadImage.dialog = this;
	    	   	    	}
	    	   	    	UploadImage.dialog.content('<div id="altContent"></div>');
	    	   	    	UploadImage.handleMTUpload(moduleName,__cb,__sizes);
	    	   	    },
	    	   	    cancelDisplay:false,
	    	   	    cancel: function () {
	    	   	    	if(UploadImage.dialog){
	    	   	    		UploadImage.dialog = null;
	    	   	    	}
	    	   	    	return true;
	    	   	    }
	    	   	});
				d.showModal();
			});
		},
		handleMTUpload:function(module,callback,sizes){
			xiuxiu.setLaunchVars("cropPresets", sizes);
			xiuxiu.setLaunchVars("titleVisible", 0);
			xiuxiu.setLaunchVars("nav", "edit");
			xiuxiu.embedSWF("altContent",1,"100%","100%");
	        /*第1个参数是加载编辑器div容器，第2个参数是编辑器类型，第3个参数是div容器宽，第4个参数是div容器高*/
	        xiuxiu.setUploadType(2);
			xiuxiu.setUploadURL(window.basePath + "upload/comm/image/" + module);
			xiuxiu.onInit = function (){
				//xiuxiu.loadPhoto(window.basePath + "static/customize/images/default/user_head_upload.jpg");
			};	
			xiuxiu.onBeforeUpload = function(data, id){
				var size = data.size;
	  			if(size > 2 * 1024 * 1024){ 
	    			alert("图片大小不能超过2M"); 
	    			return false; 
	  			}
	  			xiuxiu.setUploadArgs({filetype: data.type, type: "image", filename: data.name });
	  			return true; 
			};
			xiuxiu.onUploadResponse = function (data){
				var retObj = JSON.parse(data);
				if(retObj.retCode == 0){
					if(UploadImage.dialog){
						UploadImage.dialog.remove();
						UploadImage.dialog = null;
    	   	    	}
					if(callback){
						callback(retObj);
					}else{
						$("img#frontCoverImage").attr("src", retObj.result.big);
						$("input#coverImg").val(retObj.result.big);
					}
					
					var errTip = $(".fileupload-buttonbar span[for='coverImg']");
					if(errTip && errTip.length > 0){
						$(errTip).remove();
						$(errTip).parent().parent().removeClass("has-error");
					}
				}else{
					if(retObj.retCode == -1){
						alert("上传封面失败");
					}else{
						alert(retObj.message);
					}
					
				}
			};
			xiuxiu.onClose = function (id){
				if(UploadImage.dialog){
					UploadImage.dialog.remove();
					UploadImage.dialog = null;
	   	    	}
			};
		}
	};
}();

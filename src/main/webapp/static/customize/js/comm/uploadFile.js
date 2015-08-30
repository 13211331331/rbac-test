var UploadFile = function(){
	return {
		params:{
			uploadUrl: window.basePath + "upload/file",
			module:""
		},
		init:function(){
			$(".fileinput-button").on("click",function(){
				var toPage = $(this).attr("target");
				window.location.href = window.basePath + toPage;
			});
		},
		initUpload:function(id,module,cb, ercb){
			var callback = cb;
			var uploadUrl = window.basePath + "upload/file" + "?m=" + module;
			var iframe = false; 
	        if($.browser && $.browser.msie  && $.browser.version < 10){  
	        	iframe = true; 
	        }
	        var maxSize = $("#"+id).attr("maxSize");
	        var fileType = $("#"+id).attr("fileType");
	        if(!maxSize) maxSize = 5242880;
	        if(!fileType){
	        	fileType = /(\.|\/)(doc|docx|xls|xlsx|ppt|pptx|pdf)$/i; 
	        }else{
	        	fileType = new RegExp("(\.|\/)("+fileType+")$", "i");
	        }
	        
			$("#"+id).fileupload({
				dataType: 'json',
				iframe: iframe,
				acceptFileTypes : fileType,
				maxFileSize : maxSize, // 5 MB
				autoUpload : true,// 是否自动上传
				url :  uploadUrl,// 上传地址
				messages: {
	                acceptFileTypes: '不支持的文件类型',
	                maxFileSize: '上传文件不能大于' + (maxSize / (1024 * 1024)) + "M"
	            },
				done : function(e, data) {
					$("#error-info"+id).html("");
					var retObj;
					if((typeof data.result) == "undefined"){
						retObj = JSON.parse(data.result);
					}else{
						retObj = data.result;
					}
					if(retObj.retCode == 0){
						//获取文件名
						var data = retObj.result ;
						var filePath = data.filePath ;
				    	var fileName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length) ;
				    	if(fileName) data.fileName = fileName ;
						callback(retObj.result);
					} else {
						alert(retObj.message, '错误') ;
					}
				}
			}).on('fileuploadprocessalways', function (e, data) {  
				if(data.files.error) {
					if(typeof(ercb) == 'function') {
						ercb();
					}
					var message = data.files[0].error ;
					if(message) {
						if($("#error-info"+id).length > 0){
							$("#error-info"+id).html(message);
						}else{
							$("#"+id).parent().parent().append("<span id='error-info"+id+"' style='color: red;'>"+message+"</span>") ;
						}
					}
				} else {
					$("#error-info"+id).html("");
				}
		     });
		}
	}
}();
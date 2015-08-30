var DataLoading = function () {
	return {
		initLoading:function(){
			$(document).ajaxSend(function( event,xhr, settings ){
				if($(".data-loading")){
					$(".data-loading").show();
				}
			});
			
			$(document).ajaxComplete(function( event,xhr, settings ){
				if($(".data-loading")){
					$(".data-loading").hide();
				}
			});
		},
		setLoading:function(containerId){
			if($("#"+containerId)){
				$("#"+containerId).css("display", "block");
	        	$("#"+containerId).html('<div style="padding-left:45%;padding-top: 10%;"> <img src="'+window.basePath +'static/customize/images/data-loading.gif" alt="图片加载中···" /></div> ');
		        $("#"+containerId+" img").css("display", "block");
			}
		}
	};
}();

var RecommModuleList = function() {
	return {
		init : function() {

			RecommModuleList.listRecommModule(1, true);
			// 初始化查询事件
			$("#btnQry").on("click", function() {
				RecommModuleList.listRecommModule(1, true);
			});
		},
		
		listRecommModule : function(curPage, flag) {
			if (!curPage) {
				curPage = 1;
			}
			var title = $.trim($("input#title").val());
			var recommend_status = $.trim($("input#recommend_status").val());
			var module=$("select#module").val();

			var params = {};
			if(title != "" ){
				params.title = title;
			}
            if(recommend_status != "" ){
                params.ifRecomm = recommend_status;
            }
						
			params.curPage = curPage;
			params.module=Number(module);
			var remote_url = null;
            remote_url = window.basePath + "recomm/module/totalpage";
            $.post(remote_url, params, function(data) {
                if (data.retCode == "0") {


                    if(flag){

                        $('#paginateInfo').html("总共"+data.result.totalRecord+"个记录 /"+data.result.totalPage+"页");
                        $('#dynamic_pager_demo2').html("");
                        var p;
                        $('#dynamic_pager_demo2').bootpag({
                            total: data.result.totalPage,
                            page: curPage,
                            maxVisible: 8
                        }).on("page",function(event,num){
                            p=num;
                        }).click(function(){
                            RecommModuleList.listRecommModule(p,false);
                        });
                    }

                    remote_url = window.basePath + "recomm/module/list";
                    $.post(remote_url, params, function(data) {
                        $("#panel-list").html(data);
                    });
                }
            });

		},
        updateOrderSort : function(type,id,obj){
            var remote_url = window.basePath + "recomm/module/sort";
            var params = {
                id : id,
                moduleType : type,
                sortOrder : obj.value
            };

            $.ajax({
                type: "post",
                url: remote_url,
                data: params,
                success: function (data) {
                    if (data.retCode == 0) {
                        RecommModuleList.listRecommModule(1, true);
                    } else {
                        toast("失败",data.message);
                    }
                },
                error: function (data) {
                    toast("失败",data.message);
                }
            });


        },
        selectIsRecommend : function(obj,isRecommend){
            $("#havedSelectIsRecommend").html($(obj).text()+"<span class =\"caret\"></span>");
            if(isRecommend < 2){
                $("input#recommend_status").attr("value",isRecommend);
            }else{
                $("input#recommend_status").attr("value","");
            }
            RecommModuleList.listRecommModule(1, true);
        }
        ,
		doManage : function(type,id,action,self) {
			var remote_url;
			var params = {
					id : id,
					moduleType : type,
					ifRecomm : 1
			};
			if(action == "recomm"){
                if(($(self).attr("title") == null) || ($(self).attr("title") == '')){
                    remote_url = window.basePath + "recomm/module/settitle/" + id+"/"+type;
                    confirm("您选择的模块内容没有设置标题，是否跳转设置标题？","温馨提示",function(){
                        window.location.href = remote_url;
                    });
                }else{
                    remote_url = window.basePath + "recomm/module/recomm";
                    confirm("您确认推荐该模块记录吗？","温馨提示",function(){

                        $.post(remote_url, params, function(data) {
                            if (data.retCode == 0) {
                                window.location.href = window.basePath + "recomm/module/main/" + type;
                            } else {
                                toast("失败",data.message);
                            }
                        });
                    });
                }

			}else if(action == "cancel"){
				params.ifRecomm=0;
				remote_url = window.basePath + "recomm/module/recomm";
				confirm("您确认取消推荐该模块记录吗？","温馨提示",function(){
					
					$.post(remote_url, params, function(data) {
						if (data.retCode == 0) {
							window.location.href = window.basePath + "recomm/module/main/" + type;
						} else {
							toast("失败",data.message);					
						}
					});
				});
			}else if(action == "detail"){
				remote_url = window.basePath + "recomm/module/detail/" + id+"/"+type;
				window.location.href = remote_url;
			}else if(action == "topic"){
                remote_url = window.basePath + "recomm/module/topic/" + id+"/"+type;
                confirm("您确认设置为热点吗吗？","温馨提示",function(){

                    $.post(remote_url, params, function(data) {
                        if (data.retCode == 0) {
                            window.location.href = window.basePath + "recomm/module/main/" + type;
                        } else {
                            toast("失败",data.message);
                        }
                    });
                });
            }else if(action == "advertise"){
                remote_url = window.basePath + "recomm/module/advertise/" + id+"/"+type;
                confirm("您确认设置为广告轮播吗？","温馨提示",function(){

                    $.post(remote_url, params, function(data) {
                        if (data.retCode == 0) {
                            window.location.href = window.basePath + "recomm/module/main/" + type;
                        } else {
                            toast("失败",data.message);
                        }
                    });
                });
            }


            else{
				toast("温馨提示","建设中，无法提供服务");	
			}
		}
	};
}();


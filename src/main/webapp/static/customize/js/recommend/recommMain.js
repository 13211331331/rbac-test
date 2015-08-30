
var RecommMain = function() {
    return {
        init : function() {
        	RecommMain.listPage(1, true);
            // 初始化查询事件
            $("#btnQry").on("click", function() {
            	RecommMain.listPage(1, true);
            });
        },

        listPage : function(curPage,flush) {
        	if (!curPage) {
                curPage = 1;
            }
            var title = $.trim($("input#title").val());
            var module = $("select#module").val();

            var params = {};
            if(title != "" ){
                params.title = title;
            }

            params.curPage = curPage;
            params.module=Number(module);
            
            remote_url = window.basePath + "manager/recomm/totalpage";
            $.post(remote_url, params, function(data) {
                if (data.retCode == "0") {
                    if(flush){
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
                            Page.listPage(p,false);
                        });
                    }
                    remote_url = window.basePath + "manager/recomm/list";
                    $.post(remote_url, params, function(data) {
                        $("tbody#panel-list").html(data);
                    });
                }
            });

        },
        updateOrderSort : function(type,id,obj){
            var remote_url = window.basePath + "manager/recomm/sort";
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
                    	RecommMain.listPage(1, true);
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
            RecommMain.listPage(1, true);
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
                remote_url = window.basePath + "recomm/module/recomm";
                confirm("您确认推荐该模块记录吗？","温馨提示",function(){

                    $.post(remote_url, params, function(data) {
                        if (data.retCode == 0) {
                            window.location.href = window.basePath + "manager/recomm/main/" + type;
                        } else {
                            toast("失败",data.message);
                        }
                    });
                });
            }else if(action == "cancel"){

                params.ifRecomm=0;
                remote_url = window.basePath + "manager/recomm/cancel";
                confirm("您确认取消推荐该模块记录吗？","温馨提示",function(){
                    $.post(remote_url, params, function(data) {
                        if (data.retCode == 0) {
                            window.location.href = window.basePath + "manager/recomm/main/" + type;
                        } else {
                            toast("失败",data.message);
                        }
                    });
                });

            }else if(action == "detail"){
                remote_url = window.basePath + "manager/recomm/detail/" + id + "/" + type;
                window.location.href = remote_url;
            }else if(action == 'advertise'){
            	var val = $(self).attr("isAdvertise");
                remote_url = window.basePath + "manager/recomm/advertise/" + id + "/" + val;

                $.post(remote_url, params, function(data) {
                    if (data.retCode == 0) {
                        window.location.href = window.basePath + "manager/recomm/main/" + type;
                    } else {
                        toast("失败",data.message);
                    }
                });
            }else if(action == 'topic'){
            	var val = $(self).attr("isHotopic");
                remote_url = window.basePath + "manager/recomm/topic/" + id + "/" + val;

                $.post(remote_url, params, function(data) {
                    if (data.retCode == 0) {
                        window.location.href = window.basePath + "manager/recomm/main/" + type;
                    } else {
                        toast("失败",data.message);
                    }
                });
            }else{
                toast("温馨提示","建设中，无法提供服务");
            }
        }
    };
}();


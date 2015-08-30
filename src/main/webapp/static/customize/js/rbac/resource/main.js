
var Page = function() {
    return {
        init : function() {
            Page.listPage(1,true);
            // 初始化查询事件
            $("#btnQry").on("click", function() {
                Page.listPage(1,true);
            });
        },
        listPage : function(curPage,flag) {
            if (!curPage) {
                curPage = 1;
            }
            var title = $.trim($("input#title").val());
            var module = $("select#module").val();
            var _status = $.trim($("input#_status").val());

            var params = {};
            if(title != "" ){
                params.title = title;
            }
            if(_status != "" ){
                params.verifyFlag = _status;
            }

            params.curPage = curPage;
            params.module=Number(module);

            var remote_url = window.basePath + "rbac/resource/totalpage";
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
                            Page.listPage(p,false);
                        });
                    }
                }

                remote_url = window.basePath + "rbac/resource/list";
                $.post(remote_url, params, function(data) {
                    $("#panel-list").html(data);
                });


            });

        },

        doManage : function(id,action) {
            var remote_url;
            if(action == "verify"){

            }else if(action == "detail"){
                remote_url = window.basePath + "rbac/resource/detail/" +id;
                window.location.href = remote_url;
            }else{
                toast("温馨提示","建设中，无法提供服务");
            }
        },
        selectStatus : function(obj,isRecommend){
            $("#havedSelectIsRecommend").html($(obj).text()+"<span class =\"caret\"></span>");
            if(isRecommend >= 0){
                $("input#_status").attr("value",isRecommend);
            }else{
                $("input#_status").attr("value","");
            }
            Page.listPage(1, true);
        }

    };
}();


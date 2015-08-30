
var Page = function() {
    return {
        init : function() {
            var id = $("#hidden_id").val();
            // 初始化查询事件
            $("#btn-pass").on("click", function() {
                Page.doManage(id, "pass");
            });
            $("#btn-not-pass").on("click", function() {
                Page.doManage(id, "notpass");
            });
        },
        doManage : function(id,action) {

            var params = {};
            params.id = id;
            var remote_url = window.basePath + "sensitive/verify";

            if(action == "pass"){
                params.verifyFlag = 1;
            }else if(action == "notpass"){
                params.verifyFlag = 2;
            }else{
                toast("温馨提示","建设中，无法提供服务");
                return;
            }
            $.ajax({
                type: "post",
                url: remote_url,
                data: params,
                success: function (data) {
                    if (data.retCode == 0) {
                        console.log(data);
                    } else {
                        toast("失败",data.message);
                    }
                },
                error: function (data) {
                    toast("失败",data.message);
                }
            });

        }
    };
}();


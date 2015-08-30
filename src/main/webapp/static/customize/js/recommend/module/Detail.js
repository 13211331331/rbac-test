var Page = function() {
    return {
        init : function() {
            $("button#btn-save").on("click",function(){
                Page.doManage();
            });
        },
        doManage : function(){
            var id = $("input#hidden_id").val();
            var type = $("input#hidden_type").val();
            var params = {
                id : id,
                moduleType : type
            };

            params.ifRecomm=0;
            var remote_url = window.basePath + "manager/recomm/cancel";
            confirm("您确认取消推荐该模块记录吗？","温馨提示",function(){
                $.post(remote_url, params, function(data) {
                    if (data.retCode == 0) {
                        window.location.href = window.basePath + "manager/recomm/main/" + type;
                    } else {
                        toast("失败",data.message);
                    }
                });
            });
        }



    };
}();
var Page = function() {
	return {
		init : function() {
			$("#btn-save").on("click", function() {
                Page.modify();
			});
		},
        modify : function() {

            var remote_url = window.basePath + "admin/modifyInfo";
            var params = Page.getInfo();
            $.post(remote_url, params, function(data) {
                if (data.retCode == 0) {
                    toast("提示","保存成功");
                } else {
                    toast("失败",data.message);
                }
            });


		},
		getParams : function() {
			var oldpassword = $("input#oldpassword").val();
            oldpassword = hex_md5(oldpassword);
			var newpassword = $("input#newpassword").val();
            newpassword = hex_md5(newpassword);
			var params = {
				"oldpassword" : oldpassword,
				"newpassword" : newpassword
			};
			return params;
		},
        getInfo : function() {
            var params = {
                id : $("input#id").val(),
                realName : $("input#realName").val(),
                mobile : $("input#mobile").val(),
                email : $("input#email").val(),
                department : $("input#department").val()
            };
            return params;
        }
	};
}();
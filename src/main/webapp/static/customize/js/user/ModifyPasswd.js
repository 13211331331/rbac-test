var Page = function() {
	return {
		init : function() {
			$("#btn-login").on("click", function() {
                Page.modify();
			});
		},
        modify : function() {
			var oldpassword = $("input#oldpassword").val();
			if ($.trim(oldpassword) == "") {
				quickTips("oldpassword", "请输入您的旧密码");
				return;
			}
			var newpassword = $("input#newpassword").val();
			if ($.trim(newpassword) == "") {
				quickTips("newpassword", "请输入您的新密码");
				return;
			}
			var params = Page.getParams();
			var remote_url = window.basePath + "admin/modifyPasswd";
			$.post(remote_url, params, function(data) {
				if (data.retCode == 0) {
                    toast("提示","修改密码成功");
					window.location.href = window.basePath + "admin/toModifyPasswd";
				} else {
					toast("修改密码失败",data.message);
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
		}
	};
}();
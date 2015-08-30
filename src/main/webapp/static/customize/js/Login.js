var LoginAction = function() {
	return {
		init : function() {
			// 初始化保存按钮
			$("img#login-act-btn").on("click", function() {
				if (LoginAction.valid()) {
					LoginAction.submit();
				}
			});
		},
		submit : function() {
			var remote_url = window.basePath + "admin/power/LoginAct";
			var params = LoginAction.getSaveParms();
			$.post(remote_url, params, function(data) {
				if (data.retCode == 0) {
					var t_url = window.basePath + "index";
					window.location.href = t_url;
				} else {
					var d = dialog({
						title : "登陆提示",
						content : data.message
					});
					d.show();
					setTimeout(function() {
						d.close().remove();
					}, 2000);
				}
			});
		},
		valid : function() {
			var loginName = $("input#loginName").val();
			if (util.isNull(loginName) || loginName == '请输入登陆帐号') {
				alert("请输入登陆帐号");
				return false;
			}
			var password = $("input#password").val();
			if (util.isNull(password) || password == '请输入登陆密码') {
				alert("请输入登陆密码");
				return false;
			}
			return true;
		},
		getSaveParms : function() {
			var password = $("input#password").val();
			password = hex_md5(password);
			var params = {
				loginName : $("input#loginName").val(),
				password : password
			};
			return params;
		}
	};
}();
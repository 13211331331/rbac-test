var Login = function() {
	return {
		init : function() {
			// 登录用户改变时,清除密码
			var loginName = $("#loginName").val();
			if (loginName) {
				$("#loginName").keydown(function(event) {
					var name = $(this).val();
					if (name && $("#password").val() && name != loginName) {
						$("#password").val("");
					}
				});
			}
			
			//回车键，执行登录
			document.onkeydown = function(e) {
				var ev = document.all ? window.event : e;
				if (ev.keyCode == 13) {
					Login.login();
				}
			};
			
			$("#btn-login").on("click", function() {
				Login.login();
			});
		},
		login : function() {
			var loginName = $("input#loginName").val();
			if ($.trim(loginName) == "") {
				quickTips("loginName", "请输入您的登陆帐号");
				return;
			}
			var password = $("input#password").val();
			if ($.trim(password) == "") {
				quickTips("password", "请输入您的登陆密码");
				return;
			}
			var params = Login.getParams();
			var remote_url = window.basePath + "admin/login";
			$.post(remote_url, params, function(data) {
				if (data.retCode == 0) {
					window.location.href = window.basePath + "manager/index";
				} else {
					//Login.genValidCode();
					toast("登陆失败",data.message);
				}
			});
		},
		getParams : function() {
			var password = $("input#password").val();
			password = hex_md5(password);
			var loginName = $("input#loginName").val();
			var params = {
				"password" : password,
				"loginName" : loginName
			};
			return params;
		}
	};
}();
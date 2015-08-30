var Page = function() {
    return {
        init : function() {
            // 表单对象
            var addForm = $('form#add-form');
            // 绑定表单验证规则
            addForm.validate(Page.validate);
            $("button#btn-save").on("click",function(){
                if(addForm.valid()){
                    Page.save();
                }
            });
            Page.initRoles();
        },
        save : function() {
            var remote_url = window.basePath + "rbac/user/add";
            var params = Page.getInfo();
            $.post(remote_url, params, function(data) {
                if (data.retCode == 0) {
                    window.location.href = window.basePath + "rbac/user/main";
                } else {
                    toast("失败",data.message);
                }
            });
        },
        validate : {
            // 验证表单
            errorElement : 'span',
            errorClass : 'help-block color-red',
            focusInvalid : true,
            onfocusout : false,

            ignore : "",
            rules : {
                loginName : {
                    required : true,
                    maxlength : 15
                },
                password: {
                    required : true,
                    maxlength : 16
                }
            },
            messages : {
                loginName : {
                    required : "<span style='color:#ff0000;'>用户名不能为空</span>",
                    maxlength : "<span style='color:#ff0000;'>用户名不能超过15个字符</span>"
                },
                password: {
                    required : "<span style='color:#ff0000;'>密码不能为空</span>",
                    maxlength : "<span style='color:#ff0000;'>密码长度不超过16个字符</span>"
                }
            },

            highlight : function(element) {
                $(element).closest('.form-group').addClass('has-error');
            },

            unhighlight : function(element) {
                $(element).closest('.form-group').removeClass('has-error');
            },

            success : function(label) {
                label.closest('.form-group').removeClass('has-error');
            }
        },
        getInfo : function() {
            var hex_password = hex_md5($("input#password").val());
            var params = {
                loginName : $("input#loginName").val(),
                userType : $("select#userType").val(),
                roleId : $("select#roleId").val(),
                password : hex_password
            };
            return params;
        },
        initRoles : function(){
            var remote_url = window.basePath + "rbac/role/options";
            var params;
            $.post(remote_url, params, function(data) {
                if (data.retCode == 0) {
                    var html = '';
                    for(var i=0;i<data.result.length;i++){
                        html += '<option value="'+data.result[i].id+'">'+data.result[i].roleName+'</option>';
                    }
                    $("#roleId").append(html);
                } else {
                    toast("失败",data.message);
                }
            });
        }
    };
}();
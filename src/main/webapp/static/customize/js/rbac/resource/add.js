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
        },
        save : function() {
            var remote_url = window.basePath + "rbac/resource/add";
            var params = Page.getInfo();
            $.post(remote_url, params, function(data) {
                if (data.retCode == 0) {
                    window.location.href = window.basePath + "rbac/resource/main";
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
                resourceName : {
                    required : true,
                    maxlength : 50
                },
                resourceUrl: {
                    required : true,
                    maxlength : 200
                }
            },
            messages : {
                resourceName : {
                    required : "<span style='color:#ff0000;'>权限名称不能为空</span>",
                    maxlength : "<span style='color:#ff0000;'>权限名称不能超过50个字符</span>"
                },
                resourceUrl: {
                    required : "<span style='color:#ff0000;'>URL地址不能为空</span>",
                    maxlength : "<span style='color:#ff0000;'>URL地址度不超过200个字符</span>"
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
            var params = {
                resourceName : $("input#resourceName").val(),
                resourceUrl : $("input#resourceUrl").val(),
                resourceDesc : $("#resourceDesc").val()
            };
            return params;
        }
    };
}();
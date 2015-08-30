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
            Page.initResources();
        },
        save : function() {
            var remote_url = window.basePath + "rbac/role/add";
            var params = Page.getInfo();
            $.post(remote_url, params, function(data) {
                if (data.retCode == 0) {
                    window.location.href = window.basePath + "rbac/role/main";
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
                roleName : {
                    required : true,
                    maxlength : 50
                }
            },
            messages : {
                roleName : {
                    required : "<span style='color:#ff0000;'>角色名称不能为空</span>",
                    maxlength : "<span style='color:#ff0000;'>角色名称不能超过50个字符</span>"
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
                roleName : $("input#roleName").val(),
                roleDesc : $("#roleDesc").val(),
                resourceIds : $("input#resourceIds").val()
            };
            return params;
        },
        initResources : function(){
            var remote_url = window.basePath + "rbac/resource/options";
            var params;
            $.post(remote_url, params, function(data) {
                if (data.retCode == 0) {
                    var arrayObj = new Array();
                    for(var i=0;i<data.result.length;i++){
                        var params = {};
                        params.id = data.result[i].id;
                        params.text = data.result[i].resourceName;
                        arrayObj.push(params);
                    }
                    $("#resourceIds").select2({
                        tags: arrayObj
                    });
                } else {
                    toast("失败",data.message);
                }
            });

        }
    };
}();
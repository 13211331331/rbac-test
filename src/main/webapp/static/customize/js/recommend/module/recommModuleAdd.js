var RecommModuleAdd = function() {
	return {
		init : function() {
			
			UploadImage.initMtUpload("frontCoverImg", "modulePhoto",function(resp){
				$("img#frontCoverImage").attr("src", resp.result.medium);
				$("input#thumBig").val(resp.result.medium);
				$("input#thumMedium").val(resp.result.medium);
			},["720x280"]);
			
			
			// 表单对象
			var addForm = $('form#add-form');
			// 绑定表单验证规则
			addForm.validate(RecommModuleAdd.validate);
			$("button#btn-save").on("click",function(){
    			if(addForm.valid()){
    				RecommModuleAdd.save();
    			}
    	   	});
		},
		save : function() {
			var module =  $("input#moduleType").val();
			var remote_url = window.basePath + "recomm/module/recomm";
			var params = RecommModuleAdd.getRecommModuleInfo();
			$.post(remote_url, params, function(data) {
				if (data.retCode == 0) {
					window.location.href = window.basePath + "recomm/module/main/" + module;
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
				title : {
					required : true,
					maxlength : 150
				},
				info: {
					required : true,
					maxlength : 1600
				}
			},
			messages : {
				title : {
					required : "<span style='color:#ff0000;'>标题不能为空</span>",
					maxlength : "<span style='color:#ff0000;'>标题不能超过150个字符</span>"
				},
				info: {
					required : "<span style='color:#ff0000;'>扩展信息不能为空</span>",
					maxlength : "<span style='color:#ff0000;'>扩展信息长度不超过1600个字符</span>"
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
		getRecommModuleInfo : function() {
			var params = {
				id : $("input#id").val(),
				title : $("input#title").val(),
				thumBig : $("input#thumBig").val(),
				thumMedium : $("input#thumMedium").val(),
				moduleType : $("input#moduleType").val(),
				ifRecomm : 1,
				info: $("textarea#info").val()
			};
			return params;
		}
	};
}();
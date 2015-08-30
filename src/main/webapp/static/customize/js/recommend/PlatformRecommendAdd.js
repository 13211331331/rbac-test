var PlatformAddPage = function() {
	return {
		init : function() {
			// 初始化编辑器插件
			var um = UM.getEditor('infoEditor');
			um.addListener('beforepaste', myEditor_paste);
			function myEditor_paste(o, html) {
				var tempHtml = html.html.replace(/<[^>]+>/g, "");
				html.html = tempHtml;
			}
			// 初始化封面上传组件
			PlatformAddPage.setAlbumImgDisable();
			// 初始化保存按钮

			$("a#add-recommend-btn").on("click", function() {
				if (PlatformAddPage.valid()) {
					PlatformAddPage.submit();
				}
			});
		},
		setAlbumImgDisable : function() {
			$("span#productAlbumImg").unbind("click");
			UploadImage.initMtUpload("productAlbumImg", "recommend", "");
			$("span#productAlbumImg").parent().removeClass("default");
			$("span#productAlbumImg").parent().addClass("green");
		},
		submit : function() {
			var d = dialog({
				title : '首页推荐',
				content : '确定将当前内容推荐至首页？',
				okValue : "确定",
				ok : function() {
					var __dialog = this;
					__dialog.title = "正在推荐...";
					var remote_url = window.basePath
							+ "plaformRecommend/recommendIndex";
					var params = PlatformAddPage.getSaveParms();
					$.post(remote_url, params, function(data) {
						if (data.retCode == 0) {
							var t_url = window.basePath + "appRecommend/main";
							window.location.href = t_url;
						} else {
							var d = dialog({
								title : "失败",
								content : data.message
							});
							d.show();
							setTimeout(function() {
								d.close().remove();
							}, 2000);
						}
					});

					return false;
				},
				cancelValue : '取消',
				cancel : function() {
					return true;
				}
			});
			d.show();
		},
		valid : function() {
			if (util.isNull($("input#title").val())) {
				alert("请输入推荐标题");
				return false;
			}
			var infoEditor = UM.getEditor('infoEditor').getContent();
			if (util.isNull(infoEditor)) {
				alert("请输入推荐内容简介");
				return false;
			}
			return true;
		},
		getSaveParms : function() {
			var originalImg = $("input[name='originalImg']").map(function() {
				return $(this).val();
			}).get().join(",");
			var thumMedium = $("input[name='thumMedium']").map(function() {
				return $(this).val();
			}).get().join(",");
			var thumBig = $("input[name='thumBig']").map(function() {
				return $(this).val();
			}).get().join(",");
			var thumSmall = $("input[name='thumSmall']").map(function() {
				return $(this).val();
			}).get().join(",");
			alert(originalImg);
			var params = {
				title : $("input#title").val(),
				originalImg : originalImg,
				content : UM.getEditor('infoEditor').getContent(),
				thumMedium : thumMedium,
				thumBig : thumBig,
				thumSmall : thumSmall,
				id : $("input#id").val(),
				module : $("input#module").val()
			};
			return params;
		}
	};
}();
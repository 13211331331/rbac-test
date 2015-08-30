var RecommendPage = function() {
	return {
		init : function() {
			RecommendPage.listRecommendInfo(1, true);
			// 绑定查询按钮
			$("a#search-recommend-btn").on("click", function() {
				RecommendPage.listRecommendInfo(1, true);
			});
			$("a#update-sort-btn").on("click", function() {
				RecommendPage.updateSort();
			});
		},
		listRecommendInfo : function(curPage, flush) {
			if (!curPage) {
				curPage = 1;
			}

			var model = $("select#model").val();
			var status = $("select#status").val();
			var title = $("input#title").val();
			var params = {
				module : model,
				title : title,
				status : status,
				curPage : curPage
			};
			var remote_url = null;
			if (flush === true) {
				remote_url = window.basePath + "appRecommend/totalpage";
				$.post(remote_url, params, function(data) {
					if (data.retCode == "0") {
						var options = {
							currentPage : 1,
							totalPages : data.totalPage,
							bootstrapMajorVersion : 3,
							alignment : "center",
							onPageClicked : function(e, originalEvent, type,
									page) {
								RecommendPage.listRecommendInfo(page, false);
							}
						};
						$("#pagination-panel").bootstrapPaginator(options);
						remote_url = window.basePath + "appRecommend/list";
						$.post(remote_url, params, function(data) {
							$("div#recommend-info-list").html(data);
						});
					}
				});
			} else {
				remote_url = window.basePath + "appRecommend/list";
				$.post(remote_url, params, function(data) {
					$("div#recommend-info-list").html(data);
				});
			}
		},
		updateSort : function() {
			var idStr = $("input[name='id']").map(function() {
				return $(this).val();
			}).get().join(",");
			var sortStr = $("input[name='sortId']").map(function() {
				return $(this).val();
			}).get().join(",");

			var d = dialog({
				title : '更新推荐排序值',
				content : '排序值更新后不可恢复，确定更新吗？',
				okValue : "确定",
				ok : function() {
					var params = {
						idStr : idStr,
						sortStr : sortStr
					};
					var __dialog = this;
					__dialog.title = "正在更新...";
					var remote_url = window.basePath
							+ "appRecommend/updateSort";
					$.post(remote_url, params, function(data) {
						if (data.retCode == '0') {
							alert("更新成功");
							RecommendPage.listRecommendInfo(1, true);
							__dialog.remove();
						} else {
							__dialog.title = "更新推荐排序值";
							var d = dialog({
								title : "失败",
								content : data.message
							});
							d.show();
							setTimeout(function() {
								d.close().remove();
							}, 2000)
							__dialog.remove();
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
		}
	};
}();
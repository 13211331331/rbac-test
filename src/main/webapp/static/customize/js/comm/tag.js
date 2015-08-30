var Tag = function(){
	return {
		init:function(){
			$("label[name='tag']").on("click",function(){
				var curTag = $(this).text();
				if(!Tag.checkTagExists(curTag)){
					var val = "<label class=\"btn bluebg\" name=\"tag\" onclick=\"Tag.delTag(this)\">" + curTag + "</label>";
					$("div#tagsDiv").append(val);
					$("input#ntag").val("");
					Tag.setTags(curTag);
				}
			});
			
			$("button#btn-save-tag").on("click",function(){
				var ntag = $("input#ntag").val();
				if(ntag && $.trim(ntag) != "" ){
					if(!Tag.checkTagExists(ntag)){
						var val = "<label class=\"btn bluebg\" name=\"tag\" onclick=\"Tag.delTag(this)\">" + ntag + "</label>";
						$("div#tagsDiv").append(val);
						$("input#ntag").val("");
						Tag.setTags(ntag);
					}
				}
				if(Tag.dialog){
					Tag.dialog.remove();
					Tag.dialog = null;
	   	    	}
			});
		},
		showAddTag:function(scene){
			var d = dialog({
				title:'添加标签',
				align:"bottom left",
				quickClose:true,
				width: 550,
				onshow: function () {
    	   	    	if(!Tag.dialog){
    	   	    		Tag.dialog = this;
    	   	    	}
    	   	    	Tag.dialog.content("正在加载...");
    	   	    	var remote_url = window.basePath + "/toAddTag/"+ scene;
        			$.get(remote_url,function(data){
        				Tag.dialog.content(data);
                	});
    	   	    },
    	   	    cancelDisplay:false,
    	   	    cancel: function () {
    	   	    	if(Tag.dialog){
    	   	    		Tag.dialog = null;
    	   	    	}
    	   	    	return true;
    	   	    }
    	   	});
			d.show(document.getElementById('btn-add-tags'));
		},
		
		delTag:function(obj){
			$(obj).remove();
			var tags = $("div#tagsDiv > label");
			if(!tags || tags.length == 0){
				$("input#tags").val("");
			}
			Tag.setTags();
		},
		setTags:function(){
			var tags = "";
			var labels = $("div#tagsDiv > label");
			if(labels && labels.length>0){
				for(var i=0;i<labels.length;i++){
					var tagName = $(labels[i]).text();
					tags += tagName;
					tags += " ";
				}
			}
						
			$("input#tags").val($.trim(tags));
			if($.trim(tags) != ""){
				if($("span[for='tags']")){
					$("span[for='tags']").closest('.form-group').removeClass('has-error');
					$("span[for='tags']").text("");
				}
			}else{
				$("span[for='tags']").closest('.form-group').addClass('has-error');
				$("span[for='tags']").text("请添加标签");
			}
		},
		checkTagExists:function(curTag){
			var ntagNumber = $("input#ntag").attr("maxNumber") ;
			var labels = $("div#tagsDiv > label");
			var count = labels.length ;
			if(count >= ntagNumber) {
				return true;
			}
			
			for(var i=0; i<count; i++){
				var tagName = $(labels[i]).text();
				if(curTag == tagName){
					return true;
				}
			}
			return false;
		}
	};
}();
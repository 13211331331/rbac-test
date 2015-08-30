var Menus = function () {
    return {
    	init:function(currMenu){
    		if(!currMenu){
        		currMenu = "index";
        	}
    		var menus = $("ul.sub-menu > li");
        	if(menus){
        		for(var i=0;i<menus.length;i++){
        			var target = $(menus[i]).attr("target");
        			$(menus[i]).removeClass("active");
        			if(currMenu == target){
        				$(menus[i]).addClass("active");
        			}
        		}
        	}
    	}
    };
}();
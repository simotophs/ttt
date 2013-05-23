	var OL_blogger = {

		setViewportHeight:function(vw){
			this.ht = $("#header").height();
			this.hb = $("#footer").height();
			this.h = document.documentElement.clientHeight;
			this.vh = this.h-this.ht-this.hb;
			if(vw)
				$(vw).css("height",this.vh+"px");
			else
				$("#viewport").css("height",this.vh+"px");
		},
		setViewportWidth:function(vw,n){
			this.w = document.documentElement.clientWeight;
			this.vw = this.w-n;
			if(vw)
				$(vw).css("width",this.vh+"px");
			else
				$("#viewport").css("width",this.vh+"px");
		},
		setItemsSize:function(){
			this.setViewportHeight();
			var itemH = Math.round((this.vh-50)/4);
			var itemW = Math.round(itemH*27/13);
			$(".column").css("width",itemW+10+"px");
			$(".column_x2").css("width",itemW*2+20+"px");
			$(".items").css({width:itemW+"px",height:itemH+"px"});
			$(".items_x2").css({width:itemW+"px",height:itemH+"px"});
			$(".items_x2_c").css("width",itemW+20+"px")
			$(".items_x2_i").css({width:itemW/2-5+"px",height:itemW/2-5+"px"})
			$(".items_x4").css({width:itemW+"px",height:itemW+"px"});
			$(".items_x8").css({width:itemW*2+10+"px",height:itemW+"px"});
			$("#wall").css("width",$(".column").length*(itemW+10)+$(".column_x2").length*(itemW*2+20)+"px");
		},
		setRow:function(n,r){
			/*
			n: line
			r: width/height
			*/   
			this.setViewportHeight();
			var n = n || 3;
			var r = r || 1;
			var itemH = Math.round((this.vh-(n+1)*10)/n);
			$(".column").css("width",itemH*r+10+"px");
			$(".items").css({width:itemH*r+"px",height:itemH+"px"});
			$("#wall").css("width",$(".column").length*(itemH*r+10)+"px");
		},
		setWallWidth:function(vw){
			this.setViewportHeight(vw);
			var itemW = $("#wall").children().width();
			$("#wall").css("width",$(".column").length*(itemW)+"px");
		},
		setDressHighlight:function(){
			var itemH = Math.round(this.vh-20);
			var itemW = itemH*37/56;
			$(".column_x2").css({"width":itemW+10,"height":itemH});
			$(".items_x2").css({"width":itemW,"height":itemH});
			var ww = $("#wall").width()+(itemW+10)*2;
			$("#wall").css("width",ww);
		},
		setPhotoHighlight:function(){
			var itemH = Math.round(this.vh-20);
			var itemW = Math.ceil(itemH*76/56);
			$("#photo_hignlight").css({"width":itemW,"height":itemH});
			$("#photo_hignlight img").css({"width":itemH*37/56,"height":itemH});
			var ww = $("#wall").width()+itemW+10;
			var cache = $("#wall li").eq(0),index = 0;
			$("#wall").css("width",ww);
			$("#wall li").each(function(i,e){
				var left = [0,itemH*37/56,itemH*(50/56),itemH*(63/56)],
				width = [itemH*37/56,itemH*13/56,itemH*13/56,itemH*13/56];
				$("#wall li").eq(i).css({"width":Math.floor(width[i])});

				$(e).click(function(){
					if(index == i) return;
					$(this).css("width",itemH*37/56);
					cache.css("width",itemH*13/56);
					cache = $(e);
					index = i;
				})
			})
		},
		//Lu
		showHide:function(){
			$(".items").bind({

				mouseover:function(){
					if($(".item-title").is(":animated")){
						$(".item-title").stop();
					}
					$(this).children().filter(".mask").hide();
					// setTimeout(function(){
						$(".item-title").hide();
					// },400)
					if($(this).children().last().is("div")){
						$(".item-title").hide();
						$(this).children().last().fadeIn();
					}
				},
				mouseout:function(){
					$(this).children().filter(".mask").show();
					$(".item-title").hide();
				}
			})
		},
		lSetrow:function(){
/*
			n: line
			r: width/height
			*/   
			this.setViewportHeight(this.Nview);
			$("#viewport").css("height",(this.vh)+"px");
			var n = n || 4;
			var r = r || 1;
			var itemH=Math.round((this.vh-10-35)/4);
			$(".items").css({width:(itemH*r+10)*3+"px",height:itemH+10+"px"});
			$(".column").css("width",$(".items").css("width"));
			$(".item_s1").css({width:itemH+"px",height:itemH+"px"});
			$("#wall").css("width",$(".column").length*parseInt($(".items").css("width")));
		},
		My_set:function(args){
			num=args.Ncount;
			var nTop=args.coloum1.top;
			var nBottom=args.coloum1.bottom;
			var dFrame=args.coloum1.dFrame;
			this.setViewportHeight();
			this.vh=this.vh-args.coloum1.top-args.coloum1.bottom+args.coloum1.dMargin;
			$(dFrame).css("height",this.vh+"px");
			/*.....................................................*/
			var nAllWidth=0;
			var dItemColumn=[];
			for(var target in my_arg){
				var seedH=0;
				if(my_arg[target].mix){
					var seedH=Math.floor((this.vh-my_arg[target].nMixMarginBottom)/my_arg[target].size);
				}else{
					var borderWidth=0;
					my_arg[target].borderWidth?borderWidth=my_arg[target].borderWidth:borderWidth=0;
					seedH=(this.vh-my_arg[target].margin*(my_arg[target].size+1)-borderWidth)/my_arg[target].size;
				}
				var itemH=seedH*my_arg[target].row+my_arg[target].margin*(my_arg[target].row-1)
				;
				// var itemH=Math.floor((this.vh-my_arg[target].margin*3)/4);
				$(my_arg[target].dItemName).css({width:itemH+"px"});	
				// if(my_arg[target].row==2 && my_arg[target].square==false){
				// 	$(my_arg[target].dItemName).css({height:Math.floor((itemH-my_arg[target].margin*(my_arg[target].row-1))/2)+"px"})
				if(my_arg[target].square==false){
					// $(my_arg[target].dItemName).css({height:(itemH-my_arg[target].margin*(my_arg[target].row-1))/2+"px"})
					$(my_arg[target].dItemName).css({height:seedH+"px"})
				}else if(my_arg[target].square==true){
					if(my_arg[target].line!=1){
						var nNum=(my_arg[target].line-1)*my_arg[target].margin+itemH;
						$(my_arg[target].dItemName).css({height:nNum+"px",width:nNum+"px"})
					}else{
						$(my_arg[target].dItemName).css({height:itemH+"px"})
					}
				}
				var hItemHeight=0;
				var hSedHeight=parseInt($(my_arg[target].dItemName).css("width"))
				if(my_arg[target].mix){
					hItemHeight=hSedHeight*my_arg[target].nMixNum+my_arg[target].nMixNum*my_arg[target].margin
				}else{
					hItemHeight=hSedHeight+my_arg[target].margin;
				}
				// var hItemHeight=parseInt($(my_arg[target].dItemName).css("width"))*my_arg[target].size+my_arg[target].margin*my_arg[target].size;
				$(my_arg[target].dItemColumn).css("width",hItemHeight);
				dItemColumn[my_arg[target].dItemColumn]=hItemHeight;
			}
				for(key in dItemColumn){
					nAllWidth+=$(key).length*dItemColumn[key];
				}
				$("#wall").css("width",nAllWidth);
		},
				/*底部功能条*/ 
		btnArrowClick:function(){
			if($(".arrow").hasClass("active")){
				$(".arrow").removeClass("active");
				$(".nav_top").animate({
					top:0
				},500)
				$(".nav_body").animate({
					height:0
				},500)
			}else{
				$(".arrow").addClass("active");
				$(".nav_top").animate({
					top:-70
				},500)
				$(".nav_body").animate({
					height:70
				},500)
				$(".nav_hot").animate({
					top:0,
					height:0
				},300)
				$(".nav_search").animate({
					top:0,
					height:0
				},300)
			}
		},
		btnCloseClick:function(){
			$(".arrow").removeClass("active");
				$(".nav_top").animate({
					top:0
				},500)
				$(".nav_body").animate({
					height:0
				},500)
				$(".nav_hot").animate({
					top:0,
					height:0
				},300)
				$(".nav_search").animate({
					top:0,
					height:0
				},300,function(){
					$(".footer .arrow").show();
				})
		},
		btnClassClick:function(dom){
			if(dom==".hot"){
				$(".nav_search").hide();
				$(".nav_hot").show();
				dom=".nav_hot";
			}else{
				$(".nav_hot").hide();
				$(".nav_search").show();
				dom=".nav_search";
			}
			this.btnArrowClick();
			$(dom).animate({
				top:-70,
				height:72
			},500)
			$(".arrow").hide();
		},
		selClick:function(){
			$("#select_1").hide();
			$(".nav_search .select").animate({
				width:402
			},500)
			$("#search_text").animate({
				width:70
			},500)
			$("#select_ul").removeClass("dn");
			$("#search_text").attr("placeholder","请选择类别")
			$(".nav_search .select").css("border-left","none")
		},
		selListClick:function(e){
			var text=$(e).html();
			$("#search_text").animate({
				width:392
			},500)
			$(".nav_search .select").animate({
				width:80
			},500,function(){
				$("#select_ul").addClass("dn");
				$("#select_1").html(text);
				$(".nav_search .select").css("border-left","1px solid #eee")
				$("#search_text").attr("placeholder","请输入内容")
				$("#select_1").show();
			})
		},
		btnInit:function(){
			$("#select_ul li a").bind("click",function(){
				OL_blogger.selListClick(this);
				return false;
			})
			$(".hot").bind("click",function(){
				OL_blogger.btnClassClick(".hot");
				return false;
			})
			$(".search").bind("click",function(){
				OL_blogger.btnClassClick(".search");
				return false;
			})
			$(".arrow").bind("click",function(){
				OL_blogger.btnArrowClick();
				return false;
			})
			$(".close").bind("click",function(){
				OL_blogger.btnCloseClick();
				return false;
			})
			$("#select_1").bind("click",function(){
				OL_blogger.selClick();
				return false;
			})
		},
		/*底部功能条*/ 
		sizeInit:function(){

		},
		init:function(){
			this.btnInit()
		}
	}
	
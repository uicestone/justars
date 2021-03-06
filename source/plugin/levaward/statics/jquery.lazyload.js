(function(jQuery){
	jQuery.fn.lazyload=function(options){
		var settings = {
			threshold:0,
			failurelimit:0,
			event:"scroll",
			effect:"show",
			container:window
		};
		if(options){
			jQuery.extend(settings,options);
		}
	var elements=this;
	
	if("scroll"==settings.event){
		jQuery(settings.container).bind("scroll", function(event){
			var counter=0;
			elements.each(function(){
				if(jQuery.abovethetop(this,settings)||jQuery.leftofbegin(this,settings))
				{}else if(!jQuery.belowthefold(this,settings)&&!jQuery.rightoffold(this,settings)){
					jQuery(this).trigger("appear");
				}else{
					if(counter++ > settings.failurelimit){
						return false;
					}
				}
			});
			var temp = jQuery.grep(elements,function(element){
				return !element.loaded;
			});
			elements = jQuery(temp);
		});
	}

	this.each(function(){
	
		var self=this;
		
		if(undefined==jQuery(self).attr("original")){
			jQuery(self).attr("original", jQuery(self).attr("src"));
		}if("scroll" != settings.event||undefined == jQuery(self).attr("src")||"" == jQuery(self).attr("src")||settings.placeholder == jQuery(self).attr("src")||(jQuery.abovethetop(self,settings)||jQuery.leftofbegin(self,settings)||jQuery.belowthefold(self,settings)||jQuery.rightoffold(self,settings))){
			if(settings.placeholder){
				jQuery(self).attr("src", settings.placeholder);}else{jQuery(self).removeAttr("src");
			}
			self.loaded=false;
		}else{
			self.loaded=true;
		}
		
		jQuery(self).one("appear", function(){
			if(!this.loaded || 1 == 1){
				jQuery("<img />").bind("load", function(){
					jQuery(self).hide().attr("src", jQuery(self).attr("original"))[settings.effect](settings.effectspeed);
					self.loaded=true;
				}).attr("src", jQuery(self).attr("original"));
			};
		});
		
		if("scroll"!=settings.event){
			jQuery(self).bind(settings.event, function(event){
			if(!self.loaded){
				jQuery(self).trigger("appear");
			}
		}
		
		);}
	});

		jQuery(settings.container).trigger(settings.event);
		return this;
	};
	
	jQuery.belowthefold=function(element,settings){
		if(settings.container === undefined || settings.container === window){
			var fold = jQuery(window).height() + jQuery(window).scrollTop();
		}else{
			var fold = jQuery(settings.container).offset().top + jQuery(settings.container).height();
		}
		return fold <= jQuery(element).offset().top - settings.threshold;
	};

	jQuery.rightoffold=function(element,settings){
		if(settings.container === undefined || settings.container === window){
			var fold = jQuery(window).width() + jQuery(window).scrollLeft();
		}else{
			var fold = jQuery(settings.container).offset().left + jQuery(settings.container).width();
		}
		return fold <= jQuery(element).offset().left - settings.threshold;
	};

	jQuery.abovethetop=function(element,settings){
		if(settings.container === undefined || settings.container === window){
			var fold = jQuery(window).scrollTop();
		}else{
			var fold = jQuery(settings.container).offset().top;
		}
		return fold >= jQuery(element).offset().top + settings.threshold  + jQuery(element).height();
	};

	jQuery.leftofbegin=function(element,settings){
		if(settings.container === undefined || settings.container === window){
			var fold = jQuery(window).scrollLeft();
		}else{
			var fold = jQuery(settings.container).offset().left;
		}
		return fold >= jQuery(element).offset().left + settings.threshold + jQuery(element).width();
	};

	jQuery.extend(
		jQuery.expr[':'],
		{
			"below-the-fold" : "jQuery.belowthefold(a, {threshold : 0, container: window})",
			"above-the-fold" : "!jQuery.belowthefold(a, {threshold : 0, container: window})",
			"right-of-fold"  : "jQuery.rightoffold(a, {threshold : 0, container: window})",
			"left-of-fold"   : "!jQuery.rightoffold(a, {threshold : 0, container: window})"
		}
	);
	
})(jQuery);
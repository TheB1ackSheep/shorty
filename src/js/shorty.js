if(typeof jQuery != "undefined"){
$.loadCss = function(css, onLoaded) {
	if(typeof css === 'string')
		css = [css];
	for(var key in css){
		var current = css[key];
		$.ajax({
			url: current,
			beforeSend: function ( xhr ) {
				xhr.overrideMimeType("application/octet-stream");
				xhr.url = current;
			},
			success: function(data, status, xhr) {
				$("<link />", {
					'rel': 'stylesheet',
					'href': xhr.url
				}).appendTo('head');
				if(key == css.length-1)
					onLoaded.call(this);
			}
		});
	}

};

$.fn.tab = function(options){
	var items = this;
	$(this).each(function(k){
		var that = items[k];
		console.log(that);
		moveBar = function(tab_bar, tab_title){
			$(tab_bar).css({width:$(tab_title).width()+'px', transform:'translateX('+$(tab_title).position().left+'px)'});
		};
		moveContent = function(tab_content){
			$(tab_content).parent().css({transform:'translateX(-'+$(tab_content).position().left+'px)'});
		};
		moveBar($(that).find('.tab_bar'), $(that).find('.tab_title_active'));
		if($(that).hasClass('tab_hover')){
			$(that).find('.tab_title').on("mouseover",  function(){
				moveBar($(this).parent().find('.tab_bar'), $(this));
			});
			$(that).on("mouseout", function(){
				moveBar($(this).find('.tab_bar'), $($(this).find('.tab_title_active')));
			});
		}

		$(that).find('.tab_title').on("click", function(){
			moveBar($(this).parent().find('.tab_bar'), $(this));
			$(this).parent().find('.tab_title').removeClass('tab_title_active');
			$(this).addClass('tab_title_active');
			var tab_content = $($(this).find('a').attr('href'));
			moveContent(tab_content);
			return false;
		});
		$( window ).resize(function() {
			moveBar($(that).find('.tab_bar'), $(that).find('.tab_title_active'));
			var tab_content = $($(that).find('.tab_title_active').find('a').attr('href'));
			moveContent(tab_content);
		});
		$(window).on("orientationchange",function(){
			moveBar($(that).find('.tab_bar'), $(that).find('.tab_title_active'));
			var tab_content = $($(that).find('.tab_title_active').find('a').attr('href'));
			moveContent(tab_content);
		});
	});
	
	
};

$(document).ready(function(){
	//Load font
	var fonts = ['https://fonts.googleapis.com/css?family=Roboto:400,700,400italic,700italic', 'http://fonts.googleapis.com/earlyaccess/notosansthai.css', 'https://fonts.googleapis.com/icon?family=Material+Icons'];
	$.loadCss(fonts, function(){
		setTimeout(function(){
			$("#overlay_loading").animate({opacity: 0},function(){
				$(this).remove();
			});
		}, 1000);
	});

	//tab
	$('.tab[data-tab]').tab();
	
});
}else{
	var o = document.querySelector('#overlay_loading');
	o.innerText = 'This website cannot work offline.';
	o.className = 'overlay';
}
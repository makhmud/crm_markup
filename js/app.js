var widthAdapt = function() {
	$('#top-panel').width( $('#page').width() - $('#left-sidebar').width() );
	var finalContentOffset = $('#top-panel').width() - $('#order-list-wrapper').width();
	var maxWidth = 1204 - $('#order-list-wrapper').width();
	if ( finalContentOffset>=maxWidth) {
		finalContentOffset = maxWidth;
	}
	$('#final-content').width(finalContentOffset);
}

var heightAdapt = function() {
	var pageHeight = $('#page').outerHeight() - $('header').outerHeight();
	var topPanelHeight = $('#top-panel').outerHeight();
	var contentHeight = $('#inner-content').outerHeight() + topPanelHeight;
	var neededHeight = (pageHeight>contentHeight) ? pageHeight : contentHeight;
	console.log( pageHeight, topPanelHeight, contentHeight, neededHeight, $('#inner-content').outerHeight() );
	$('#left-sidebar').height( neededHeight );
	$('#inner-content').height( neededHeight - topPanelHeight );
}

window.onload = function() {
	widthAdapt();
	heightAdapt();
}

$(document).ready( function() {

	// widthAdapt();
	// heightAdapt();

	if (typeof( $().styler ) != 'undefined'){
		$('select, input').styler();
	}
	$('input[type="checkbox"]:checked').closest('td').addClass('checked-wrap');

	$(document).on('keyup', '#street', function() {

		$('.search-results').remove();

		var template = '<div class="search-results">';

		for(var i=0; i<5; i++){
			template += '<div class="search-item">' + $(this).val() + '</div>'
		}

		template += '</div>';

		$(this).after(template);
		$('.search-results').css({
			'position': 'absolute',
			'top' : $(this).height() + 'px',
			'left' : '0'
		})
	});

	$(document).on('blur', '#street', function() {
		$('.search-results').remove();
	})

	$('.scrollpane').jScrollPane({
		mouseWheelSpeed: 20
	});

	if (typeof( $().datepick ) != 'undefined'){
		$('#filter-range, .input-date-range').datepick({ 
		    rangeSelect: true, 
		    dateFormat: 'dd.mm.yyyy',
		    showTrigger: '.calendar-icon',
		    prevText: '<', todayText: 'MM yyyy', nextText: '>',
		    commandsAsDateFormat: true,
		    pickerClass: 'popover gray',
		    onShow: function (){
		    	window.onresize();
		    },
		    // onShow: function (){
		    // 	console.log($('.calendar-icon').offset());
		    // 	$('.datepick-popup').css({
		    // 		left: $('.calendar-icon').offset().left + 'px',
		    // 		top: $('.calendar-icon').offset().top + 'px'
		    // 	});
		    // },
		    renderer: $.extend({}, $.datepick.defaultRenderer, 
	        {picker: $.datepick.defaultRenderer.picker. 
	            replace(/\{link:clear\}/, ''). 
	            replace(/\{link:close\}/, '')}), 
		   //  onSelect: function (){
		   //  	console.log($('.datepick-selected'));
			  //   $('.datepick-selected').css({
			  //   	'border-bottom-left-radius': '10px',
					// 'border-top-left-radius': '10px'
			  //   })
		   //  }
		});
		$('.input-date-single').datepick({
		    dateFormat: 'dd.mm.yyyy',
            showTrigger: '.calendar-icon',
		    prevText: '<', todayText: 'MM yyyy', nextText: '>',
		    commandsAsDateFormat: true,
		    pickerClass: 'popover gray',
		    renderer: $.extend({}, $.datepick.defaultRenderer, 
	        {picker: $.datepick.defaultRenderer.picker. 
	            replace(/\{link:clear\}/, ''). 
	            replace(/\{link:close\}/, '')}), 
		    onShow: function (){
		    	window.onresize();
		    },
		})
}
})

window.onresize = function () {
	widthAdapt();
	heightAdapt();
}

$(document).on('click', '#main-menu-button', function(e) {
	e.preventDefault();
	$('#top-menu').slideToggle();
	$(this).toggleClass('active');
});

$(document).on('click', '#filter-button', function() {
	$('#filter-button').toggleClass('active');
	$('#filter-popover').fadeToggle();
});

$(document).on('click', '#add-more', function(e) {
	e.preventDefault();
	$('#add-more-popover').fadeToggle();
});

$(document).on('click', '#steps-menu li .text', function() {
	$(this).siblings('ul').fadeToggle();
});

$(document).on('click', '#order-cancel', function(e) {
	e.preventDefault();
	$(this).siblings('.popover').fadeToggle();
});

$(document).on('click', '.important, .vip', function(e){
    e.preventDefault();
    $(this).toggleClass('active');
});

$(document).on('change', 'input[type="checkbox"]', function(e){
	$(this).closest('td').toggleClass('checked-wrap');
});

$(document).on('click', '.switch', function(e) {
	e.preventDefault();
	var $this = $(this);
	if( $this.hasClass('on') ){
		$this.removeClass('on')
				.addClass('off')
				.text('Нет');
	} else {
		$this.removeClass('off')
				.addClass('on')
				.text('Да');
	}
});
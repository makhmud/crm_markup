var widthAdapt = function() {
	$('#top-panel').width( $('#page').width() - $('#left-sidebar').width() );
	var finalContentOffset = $('#top-panel').width() - $('#order-list-wrapper').width();
	var maxWidth = 1104 - $('#order-list-wrapper').width();
	if ( finalContentOffset>=maxWidth) {
		finalContentOffset = maxWidth;
	}
	$('#final-content').width(finalContentOffset);
}

var heightAdapt = function() {
	$('#final-content').height( $('#main').height() );
}

$(document).ready( function() {
	widthAdapt();
	heightAdapt();

	if (typeof( $().styler ) != 'undefined'){
		$('select, input').styler();
	}

	$('.scrollpane').jScrollPane();

	$('#filter-range, .input-date-range').datepick({ 
	    rangeSelect: true, 
	    dateFormat: 'dd.mm.yyyy',
	    showTrigger: '.calendar-icon',
	    prevText: '<', todayText: 'MM yyyy', nextText: '>',
	    commandsAsDateFormat: true,
	    pickerClass: 'popover gray',
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
	    showTrigger: '.input-date-single + .calendar-icon',
	    prevText: '<', todayText: 'MM yyyy', nextText: '>',
	    commandsAsDateFormat: true,
	    pickerClass: 'popover gray',
	    renderer: $.extend({}, $.datepick.defaultRenderer, 
        {picker: $.datepick.defaultRenderer.picker. 
            replace(/\{link:clear\}/, ''). 
            replace(/\{link:close\}/, '')}), 
	})
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
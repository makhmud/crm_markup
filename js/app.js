var widthAdapt = function() {
	$('#top-panel').width( $('#page').width() - $('#left-sidebar').width() );
	var finalContentOffset = $('#top-panel').width() - $('#order-list-wrapper').width();
	var maxWidth = 1204 - $('#order-list-wrapper').width();
	if ( finalContentOffset>=maxWidth) {
		finalContentOffset = maxWidth;
	}
	$('#final-content, #final-content .jspContainer').width(finalContentOffset);
}

var heightAdapt = function() {
	var pageHeight = $('#page').outerHeight() - $('header').outerHeight();
	var topPanelHeight = $('#top-panel').outerHeight();
	var contentHeight = $('#inner-content').outerHeight() + topPanelHeight;
	var neededHeight = (pageHeight>contentHeight) ? pageHeight : contentHeight;
	console.log( pageHeight, topPanelHeight, contentHeight, neededHeight, $('#inner-content').outerHeight() );
	$('#left-sidebar').height( pageHeight );
	$('#inner-content').height( pageHeight - topPanelHeight );
	$('#final-content').css({height: (pageHeight - topPanelHeight) + 'px' });
	$('#order-list-wrapper ul').height( pageHeight - topPanelHeight - $('#aside-controls').outerHeight());
}

var totalAdapt = function() {
	widthAdapt();
	heightAdapt();
	$('#final-content').jScrollPane({
		mouseWheelSpeed: 20,
		contentWidth: '0px'
	});
}

window.onload = function() {
	totalAdapt();
	$('.scrollpane').jScrollPane({
		mouseWheelSpeed: 20,
		autoReinitialise: true
	});
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

	if (typeof( $().datepick ) != 'undefined'){
		$('#filter-range, .input-date-range').datepick({ 
		    rangeSelect: true, 
		    dateFormat: 'dd.mm.yyyy',
		    showTrigger: '.calendar-icon',
		    prevText: '<', todayText: 'MM yyyy', nextText: '>',
		    commandsAsDateFormat: true,
		    pickerClass: 'popover gray',
		    renderer: $.extend({}, $.datepick.defaultRenderer, 
	        {picker: $.datepick.defaultRenderer.picker. 
	            replace(/\{link:clear\}/, ''). 
	            replace(/\{link:close\}/, '')})
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
	            replace(/\{link:close\}/, '')})
		});
}
})

$(document).on('click', '.modal-open', function(e){
    e.preventDefault();
    $('#modal').modal({
        'show':true,
        'backdrop':'static'
    });
});

$(document).on('click', '.modal-close', function(e){
    e.preventDefault();
    console.log(123);
    $('#modal').modal('hide');
})

window.onresize = function () {
	totalAdapt();
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
	var $this = $(this);
	$this.toggleClass('active');
	if( $this.hasClass('active') ){
		$this.find('.text').removeClass('ul-dotted');
		$this.find('.add-icon').removeClass('add-plus-10').addClass('add-plus-12').addClass('white');
	} else {
		$this.find('.text').addClass('ul-dotted');
		$this.find('.add-icon').addClass('add-plus-10').removeClass('add-plus-12').removeClass('white');
	}
	
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

$(document).on('click', '.popover-menu-trigger', function(e){
    e.preventDefault();
    $(this).find('[class^="type-20"]').toggleClass('active');
    $(this).siblings('.popover-menu').toggle();
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

$(document).on('click', '.amount-control', function(e){
    e.preventDefault();
    var amountValueElem = $(this).closest('.amount').find('.value');
    var amount = parseInt( amountValueElem.text() );

    if ( $(this).hasClass('increase') ){
    	amount++;
    } else {
    	amount--;
    }
    amountValueElem.text( amount >=0 ? amount : 0 );
});

$(document).on('click', '.cs-hamb', function(e){
    e.preventDefault();
    $(this).toggleClass('active');
    $(this).siblings('.popover').toggle();
})
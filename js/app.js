var workHoursTable = function(options) {
    var $self = this;
    this._table = [];
    this.options = options;

    this.setTable = function(arr){
        $self._table = arr;
    };

    this.getTable = function() {
        return $self._table;
    };

    this.parseTable = function() {
        $($self.options.tableSelector).find('tr').each( function(indx, elm) {
            if (indx != 7) {
                $self._table.push([]);
                $(elm).find('td').each( function(indx2, elm2) {
                    if(indx2 != 0) {
                        $self._table[indx].push($(elm2).find('.inc-day-time').hasClass('inactive'))
                    }
                } )
            }
        });

        return $self;
    };

    this.toggleRow = function(id) {
        console.log($('#'+id).prop('checked'));
        if ($('#'+id).prop('checked')) {
            $('label[for="' + id + '"]').closest('tr').find('.inc-day-time').addClass('inactive');
        } else {
            $('label[for="' + id + '"]').closest('tr').find('.inc-day-time').removeClass('inactive');
        }

        $self.parseTable();
    }

    this.toggleCol = function(id) {
        if ($('#'+id).prop('checked')) {
            $($self.options.tableSelector).find('tr td:nth-child(' + ( parseInt(id.split('temp')[1])+1 ) + ') .inc-day-time').addClass('inactive');
        } else {
            $($self.options.tableSelector).find('tr td:nth-child(' + ( parseInt(id.split('temp')[1])+1 ) + ') .inc-day-time').removeClass('inactive');
        }

        $self.parseTable();
    }
}

var widthAdapt = function() {
	$('#top-panel').width( $('#page').width() - $('#left-sidebar').width() );
	var finalContentOffset = $('#top-panel').width() - $('#order-list-wrapper').width();
	var maxWidth = 1204 - $('#order-list-wrapper').width();
	if ( finalContentOffset>=maxWidth) {
		finalContentOffset = maxWidth;
	}
	$('#final-content, #final-content .jspContainer').width(finalContentOffset);

    $('.cladr').css({'margin-right' : ($(document).width() - $('#final-content').width() - $('#order-list-wrapper').width() - $('#left-sidebar').width()) + 'px'})
    console.log();
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

var wt = new workHoursTable({tableSelector:'#cs-address'});

$(document).ready( function() {

	// widthAdapt();
	// heightAdapt();
    wt.parseTable();

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
});

$(document).on('change', '#cs-address tr td:first-child input', function(e){
    wt.toggleRow($(this).attr('id'));
})

$(document).on('click', '#cs-address .inc-day-time:not(inactive)', function(e){
    $(this).toggleClass('selected');
})

$(document).on('change', '#cs-address tr:last-child td input', function(e){
    wt.toggleCol($(this).attr('id'));
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

$(document).on('change', '#grade-table input[type="checkbox"]', function(e){
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
});
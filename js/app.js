var widthAdapt = function() {
	$('#top-panel').width( $('#page').width() - $('#left-sidebar').width() );
	var finalContentOffset = $('#top-panel').width() - $('#order-list-wrapper').width();
	var maxWidth = 1104 - $('#order-list-wrapper').width();
	if ( finalContentOffset>=maxWidth) {
		finalContentOffset = maxWidth;
	}
	$('#final-content').width(finalContentOffset);
}

$(document).ready( function() {

	widthAdapt();

	$('.scrollpane').jScrollPane();

	
})

window.onresize = function () {
	
	widthAdapt();
}
var widthAdapt = function() {
	$('#top-panel').width( $('#page').width() - $('#left-sidebar').width() );
	var finalContentOffset = $('#top-panel').width() - $('#order-list-wrapper').width();
	if ( finalContentOffset>=864) {
		finalContentOffset = 864;
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
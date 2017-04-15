/**
 * This file handles the calculations of the number of shares on each single post.
 *
 * @since 1.0
 */
jQuery( document ).ready(
function( $ ) {
    'use strict';
	// Request share count via Facebook Graph.
	$.ajax( {
		url: 'http://graph.facebook.com/',
		data: {
			id: window.location.href
		},
		success: function( http_response ) {
			if ( http_response.share ) {
				var  share_count = http_response.share.share_count;
				$( '#flocks-share-count' ).html( share_count.toLocaleString( 'en-US', { minimumFractionDigits: 0 } ) );
			} else {
				$( '#flocks-share-count' ).html( '0' );
			}
		}
	} );

	// Sharer
	$('.facebook-share a').click(function(e){
        e.preventDefault();
        flocksSharerPopup( flocks_sharer_js_vars.fb_sharer_url );
    });
    // TWitter
    $('.twitter-share a').click(function(e){
        e.preventDefault();
        flocksSharerPopup( flocks_sharer_js_vars.tw_sharer_url );
    });

     // LinkedIn
    $('.linkedin-share a').click(function(e){
        e.preventDefault();
        flocksSharerPopup( flocks_sharer_js_vars.li_sharer_url );
    });

    //Google+
    $('.google-plus-share a').click(function(e){
        e.preventDefault();
        flocksSharerPopup( flocks_sharer_js_vars.gp_sharer_url );
    });

    // Redit
    $('.reddit-share a').click(function(e){
        e.preventDefault();
        flocksSharerPopup( flocks_sharer_js_vars.rd_sharer_url );
    }); 

     function flocksSharerPopup( url ) {
        
        var winTop = (screen.height / 2) - (520 / 2);
        var winLeft = (screen.width / 2) - (350 / 2);

        window.open( url, 'sharer', 'top='+winTop + ',left=' + winLeft 
            + ',toolbar=0,status=0,width=520,height=350'
        );
    }
});
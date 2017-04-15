/**
 * Flocks Javascript
 *
 * This file contains Flocks javascript functions
 * and definitions, method, or any javacript function
 * that corresponds to the theme
 *
 * @package Flocks
 */
jQuery(document).ready(function($) {

    "use strict";

    /**
     * Organize buddypress members list
     * and groups list using jQuery
     * isotopes
     */
    var flocksTileBpItemList = function( $selector ) {

        if ( $selector.length >= 1 )
        {
            // check if all avatars are loaded
            if (imagesLoaded) {
                imagesLoaded($selector, function(){
                    try{
                        $selector.isotope({
                            itemSelector: 'li',
                            layoutMode: 'fitRows'
                        });
                    } catch(e) {
                        console.log('Error: Isotopes didn\'t work as expected. Flocks.js #33');
                    }
                });
            }
        }

        return true;
    }

    flocksTileBpItemList( $('ul.bp-objects-loop.type-grid') );
    flocksTileBpItemList( $('ul.products') );

    /**
     * Organize buddypress activity stream comment box
     * using jQuery
     * autogrow
     */

    var flocksAutoGrow = function() {
        // autogrow options
       var autogrowOptions = {
           animate: false,
           fixMinHeight: false,
           onInitialize: true,
       };

       $( 'textarea.ac-input.bp-suggestions' ).autogrow( autogrowOptions );

       return;
    }

    flocksAutoGrow();

    // BuddyPress activity stream comment reset
    $( '.ac-form .ac-reply-cancel' ).on( 'click', function () {
        $( '.ac-textarea .ac-input', $( this ).parents( 'form' ) ).val( '' );
        // Instantiate new instance of flocks AutoGrow when user clicks the close button
        flocksAutoGrow();
    });

    if ( flocks_global_js_vars.sticky_header ) {

        $("#masthead").sticky({
            topSpacing:0,
            zIndex: 9999999
        });

        $( window ).scroll(function() {

            var positionY = $(window).scrollTop();

            if ( positionY <= $('#site-navigation').height() ) {
                $("#masthead").sticky('update');
            }
        });

        $( window ).on('resize', function(){
            if ( $( window ).width() <= 768 ) {
                $("#masthead").unstick();
            } else {
                $("#masthead").sticky('update');
            }
        });

        if ( $( window ).width() <= 768 ) {
             $("#masthead").unstick();
        }

    }

    // Flocks header
    $('.flocks-header-search-btn').on('click', function(e){
        e.preventDefault();
        $('.header-search-form').toggleClass('active');
    });

    // Flocks Mobile sub-menu
    $('.mobile-menu .menu-item-has-children > a').append( '<span class="mobile-sub-menu-toggle fa fa-angle-down"></span>' );

    $('.mobile-sub-menu-toggle').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).removeClass('fa fa-angle-up').addClass('fa fa-angle-down');
            $(this).parent().next('ul').removeClass('active');
        } else {
            $(this).addClass('active');
            $(this).removeClass('fa fa-angle-down').addClass('fa fa-angle-up');
            $(this).parent().next('ul').addClass('active');
        }
    });

    $('#flocks-search-btn').on('click', function(e){
        e.preventDefault();
        $('#top-right-search-form').toggleClass('active');

    });

    $('#close-top-right-search-form').on('click', function(){

        if ( $('#top-right-search-form').hasClass('active') ) {

            $('#top-right-search-form').removeClass('active');

        }
    });

    $('#header-menu-toggle').on('click', function(){

        $('#header-menu-toggle').toggleClass('active');

        if ( $('#main-menu-ul').hasClass('active') ) {

            $('#main-menu-ul').removeClass('active');

        } else {

            $('#main-menu-ul').addClass('active');

        }

    });

    $('#mobile-menu-toggle').on('click', function(){

        $('#mobile-menu-toggle').toggleClass('active');

        if ( $('#mobile-main-menu-ul').hasClass('active') ) {

            $('#mobile-main-menu-ul').css({
                'display': 'none'
            }).removeClass('active');

            $('#user-navigation ').css({
                'display': 'none'
            }).removeClass('active');

        } else {

            $('#mobile-main-menu-ul').css({
                'display': 'block'
            }).addClass('active');

            $('#user-navigation ').css({
                'display': 'block'
            }).addClass('active');

        }

    });

    $('#top-menu-toggle').on('click', function(){
        $('#top-menu').toggleClass('active');
    });

    $('#bp-object-nav-toggle').on('click', function(){
        $('#object-nav').toggleClass('active');
    });
    /*
    // Swipe Sidebar on Mobile
    var hammertime = new Hammer( document.getElementById('printable-content'), {});
        hammertime.on('swipe', function(ev) {
        	//alert('test');
        });
    */

    $('#user-nav-action-avatar').on('click', function( e ){
        e.preventDefault();
        $('#nav-user-action-dropdown').toggleClass('active');
        $('#nav-user-action-notification').removeClass('active');

    });

    $('#user-nav-action-notification').on('click', function(e){
        e.preventDefault();
        $('#nav-user-action-notification').toggleClass('active');
        $('#nav-user-action-dropdown').removeClass('active');

    });


    /**
	 * Support Gears
	 */
	 if ( $('.gears-carousel-standard').length >= 1 ) {

	 	var $thrive_carousel_standard = $('.gears-carousel-standard');

	 	$.each( $thrive_carousel_standard, function() {

	 		var __this = $(this);

	 		var max_slides  = (__this.attr('data-max-slides') !== undefined && __this.attr('data-max-slides').length >= 1) ? __this.attr('data-max-slides') : 7;

	 		var min_slides  = (__this.attr('data-min-slides') !== undefined && __this.attr('data-min-slides').length >= 1) ? __this.attr('data-min-slides') : 1;

	 		var slide_width = (__this.attr('data-item-width') !== undefined && __this.attr('data-item-width').length >= 1) ? __this.attr('data-item-width') : 85;

            var slide_margin = (__this.attr('data-slide-margin') !== undefined && __this.attr('data-slide-margin').length >= 1) ? __this.attr('data-slide-margin') : 20;

	 		var prop = {
	 			minSlides: parseInt( min_slides ),
	 			maxSlides: parseInt( max_slides ),
	 			slideWidth: parseInt( slide_width ),
	 			nextText: '<i class="fa fa-arrow-right">as</i>',
	 			prevText: '<i class="fa fa-arrow-lesft">asd</i>',
                controls: false,
	 			pager: false,
	 			moveSlides: 3,
	 			slideMargin: parseInt( slide_margin ),
                pager: true
	 		};

	 		__this.bxSlider(prop);

	 		$('.gears-carousel-standard').css({
	 			'opacity': '1'
	 		});

	 	});

	 	//return;
	}

    $('.flocks-isotope').imagesLoaded(function(){
         $('.flocks-isotope').isotope({
            layoutMode: 'fitRows'
        });
    });
   

    $('#site-footer-widgets #widget-collections').isotope({
        layoutMode: 'fitRows'
    });

    $('.vc_images_carousel').css({
        display: 'block',
    });

    // BuddyPress Related Scripts.
    $("#send-to-input").focus();
    $('body.registration .editfield').each( function(){
        $(this).wrapInner('<div class="row flocks-bp-register-field"></div>');
        $('.flocks-bp-register-field>label', $(this) ).wrap('<div class="col-md-3"></div>');
        if ( $(this).find('.error').length != 0 ) {
            $(".error", $( this ) ).nextUntil("p.description + *").addBack().wrapAll("<div class='col-md-9'></div>");
        } else {
            $(".flocks_bp_edit_field", $( this ) ).nextUntil("p.description + *").addBack().wrapAll("<div class='col-md-9'></div>");
        }
    });
    $('#profile-details-section').css({
        display: 'block'
    });

    // Gears Log-in Script.
    var $remember = $('.gears-login > form > p.login-remember').html();
    var $submit = '<div class="login-submit">' + $('.gears-login > form > p.login-submit').html() + '</div>';
    var $lostpaswd =  $('#gears-login-form-lost-password').html();
    
    // Wrap the form into containers.
    $('.login-username > input').wrap('<div class="gears-flocks-login-form-element"></div>');
    $('.login-password > input').wrap('<div class="gears-flocks-login-form-element"></div>');
    
    // Remove the remember.
    $('.gears-login > form > p.login-remember').remove();

    // Remove lost password original link.
    $('#gears-login-form-lost-password').remove();
    
    // Remove the submit.
    $('.gears-login > form > p.login-submit').remove();

    // Append the 'remember' html to password login form element'.
    $('.gears-login > form > p.login-password > .gears-flocks-login-form-element').append( $remember );
    
    // Append the 'lost password link to login for element'.
    $('.gears-login > form > p.login-password > .gears-flocks-login-form-element').append( $lostpaswd );

    // Append the 'submit' html to password login form element'.
    $('.gears-login > form > p.login-password > .gears-flocks-login-form-element').append( $submit );

    // Display the form
    $('.gears-login > form').css({
        'display': 'block'
    });

    // Display the lost password link
    $('.gears-flocks-login-form-element > a#gears-login-form-lp').removeClass('hide');


    // Submitting the form.
    if ( $('#gears-login-shortcode').length >= 1 ) {

        $("#gears-login-shortcode #loginform").submit( function( e ) {

            var url = flocks_global_js_vars.ajax_url; // the script where you handle the form input.
            var username = $('#user_login').val();
            var password = $('#user_pass').val();
            var error_count = 0;
            var error_username_empty = "<?php esc_html_e('Username or Email Address is required.', 'flocks'); ?>";
            var error_password_empty = "<?php esc_html_e('Password is required.', 'flocks'); ?>";

            // disable the submit button
            $('#wp-submit').attr( 'disabled', 'disabled' );

            if ( username.length === 0 ) {
                $('#user_login').parent().append( '<span class="form-error">' + error_username_empty + '</span>' );
                error_count++;
            }

            if ( password.length === 0 ) {
                var error_pass_str = '<span class="form-error">' + error_password_empty + '</span>';
                $( error_pass_str ).insertAfter('#user_pass');
                error_count++;
            }

            setTimeout( function(){
                $('.form-error').remove();
            }, 3000 );

            if ( error_count >=1 ) {
                $('#wp-submit').removeAttr( 'disabled' );
                return false;
            }

            var form_data = $('#loginform').serialize();
                form_data += "&action=gears_login_form_submit";

            var html_response = "";
            
            var response_message_success = flocks_global_js_vars.gears_login_success;

            $.ajax({
                    type: "POST",
                    url: url,
                    dataType: 'json',
                    data: form_data, // serializes the form's elements.
                    response_html: function ( message, type ) {
                        return "<div id='signon_message_gears' class='gears-clearfix gears-alert-element gears-shortcode-element'><div class='gears-alert gears-alert-"+type+"'><p>"+message+"</p><div class='gears-alert-close'>&times;</div></div></div>";
                    },
                    success: function( response )
                    {

                        console.log( response );
                        $('#wp-submit').removeAttr( 'disabled' );

                        $('#signon_message_gears').remove();
                        // Not successful login.
                        if ( response.errors ) {

                            if ( response.errors.incorrect_password ) {
                                html_response = this.response_html( response.errors.incorrect_password[0], 'danger' );
                            }

                            if ( response.errors.invalid_username ) {
                                html_response = this.response_html( response.errors.invalid_username[0], 'danger' );
                            }

                            if ( response.errors.invalid_email ) {
                                html_response = this.response_html( response.errors.invalid_email[0], 'danger' );
                            }

                            if ( response.errors.empty_password ) {
                                html_response = this.response_html( response.errors.empty_password[0], 'danger' );
                            }

                            if ( response.errors.empty_username ) {
                                html_response = this.response_html( response.errors.empty_username[0], 'danger' );
                            }

                        }

                        // Successful login.
                        if ( response.ID ) {
                            
                            html_response = this.response_html( response_message_success, 'success' );

                            setTimeout(function() {

                                window.location.href = $( '#loginform input[name=redirect_to]' ).val();

                            }, 1000);

                        }

                        $( html_response ).insertAfter('#gears-login-form-lp');

                    },
                    error: function() {
                        
                        $('#wp-submit').removeAttr( 'disabled' );
                        $('#signon_message_gears').remove();
                        
                        alert('Http Error.');
                    }
            });
            e.preventDefault(); // Avoid to execute the actual submit of the form.
        }); // End login form submit event.
    }
});

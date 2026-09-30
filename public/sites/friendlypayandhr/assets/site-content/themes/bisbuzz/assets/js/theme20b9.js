;(function ($) {

    "use strict";
    
    var pxl_scroll_top;
    var pxl_window_height;
    var pxl_window_width;
    var pxl_scroll_status = '';
    var pxl_last_scroll_top = 0;
    $(window).on('load', function () {
        $(".pxl-loader").addClass("is-loaded");
        $('.pxl-element-slider').css('opacity', '1');
        $('.pxl-element-slider').css('transition-delay', '300ms');
        $('.pxl-gallery-scroll').parents('body').addClass('body-overflow').addClass('body-visible-sm');
        pxl_window_width = $(window).width();
        pxl_window_height = $(window).height();
        bisbuzz_header_sticky();
        bisbuzz_header_mobile();
        bisbuzz_scroll_to_top();
        bisbuzz_footer_fixed();
        bisbuzz_shop_quantity();
        bisbuzz_submenu_responsive();
    });

    $(window).on('scroll', function () {
        pxl_scroll_top = $(window).scrollTop();
        pxl_window_height = $(window).height();
        pxl_window_width = $(window).width();
        if (pxl_scroll_top < pxl_last_scroll_top) {
            pxl_scroll_status = 'up';
        } else {
            pxl_scroll_status = 'down';
        }
        pxl_last_scroll_top = pxl_scroll_top;
        bisbuzz_header_sticky();
        bisbuzz_scroll_to_top();
        bisbuzz_footer_fixed();
    });

    $(window).on('resize', function () {
        pxl_window_height = $(window).height();
        pxl_window_width = $(window).width();
        bisbuzz_submenu_responsive();
        bisbuzz_header_mobile();
    });

    $(document).ready(function () {

        $('.pxl-logo-nav').parents('#pxl-header-elementor').addClass('pxl-header-rmboxshadow');

        /* Start Menu Mobile */
        $('.pxl-header-menu li.menu-item-has-children').append('<span class="pxl-menu-toggle"></span>');
        $('.pxl-menu-toggle').on('click', function () {
            if( $(this).hasClass('active')){
                $(this).closest('ul').find('.pxl-menu-toggle.active').toggleClass('active');
                $(this).closest('ul').find('.sub-menu.active').toggleClass('active').slideToggle();    
            }else{
                $(this).closest('ul').find('.pxl-menu-toggle.active').toggleClass('active');
                $(this).closest('ul').find('.sub-menu.active').toggleClass('active').slideToggle();
                $(this).toggleClass('active');
                $(this).parent().find('> .sub-menu').toggleClass('active');
                $(this).parent().find('> .sub-menu').slideToggle();
            }      
        });
    
        $("#pxl-nav-mobile").on('click', function () {
            $(this).toggleClass('active');
            $('body').toggleClass('body-overflow');
            $('.pxl-header-menu').toggleClass('active');
        });

        $(".pxl-menu-close, .pxl-header-menu-backdrop, #pxl-header-mobile .pxl-menu-primary a.is-one-page").on('click', function () {
            $(this).parents('.pxl-header-main').find('.pxl-header-menu').removeClass('active');
            $('#pxl-nav-mobile').removeClass('active');
            $('body').toggleClass('body-overflow');
        });
        /* End Menu Mobile */

        /* Elementor Header */
        $('.pxl-type-header-clip > .elementor-container').append('<div class="pxl-header-shape"><span></span></div>');

        /* Scroll To Top */
        $('.pxl-scroll-top').click(function () {
            $('html, body').animate({scrollTop: 0}, 800);
            return false;
        });

        /* Animate Time Delay */
        $('.pxl-grid-masonry').each(function () {
            var eltime = 40;
            var elt_inner = $(this).children().length;
            var _elt = elt_inner - 1;
            $(this).find('> .pxl-grid-item > .wow').each(function (index, obj) {
                $(this).css('animation-delay', eltime + 'ms');
                if (_elt === index) {
                    eltime = 40;
                    _elt = _elt + elt_inner;
                } else {
                    eltime = eltime + 40;
                }
            });
        });

        $('.pxl-item--text').each(function () {
            var pxl_time = 0;
            var pxl_item_inner = $(this).children().length;
            var _elt = pxl_item_inner - 1;
            $(this).find('> .pxl-text--slide > .wow').each(function (index, obj) {
                $(this).css('transition-delay', pxl_time + 'ms');
                if (_elt === index) {
                    pxl_time = 0;
                    _elt = _elt + pxl_item_inner;
                } else {
                    pxl_time = pxl_time + 80;
                }
            });
        });

        /* Lightbox Popup */
        $('.btn-video, .pxl-video-popup, .pxl--link-popup').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        $('.images-light-box').each(function () {
            $(this).magnificPopup({
                delegate: 'a.light-box',
                type: 'image',
                gallery: {
                    enabled: true
                },
                mainClass: 'mfp-fade',
            });
        });

        /* Comment Reply */
        $('.comment-reply a').append( '<i class="caseicon-angle-arrow-right"></i>' );

        /* Parallax */
        if($('#pxl-page-title-default').hasClass('pxl--parallax')) {
            $(this).stellar();
        }

        /* Animate Time */
        $('.btn-nina').each(function () {
            var eltime = 0.045;
            var elt_inner = $(this).children().length;
            var _elt = elt_inner - 1;
            $(this).find('> .pxl--btn-text > span').each(function (index, obj) {
                $(this).css('transition-delay', eltime + 's');
                eltime = eltime + 0.045;
            });
        });

        /* Search Popup */
        $(".pxl-search-popup-button").on('click', function () {
            $('body').addClass('body-overflow');
            $('#pxl-search-popup').addClass('active');
            setTimeout(function(){
                $('#pxl-search-popup .search-field').focus();
            },1000);
        });
        $("#pxl-search-popup .pxl-item--overlay, #pxl-search-popup .pxl-item--close").on('click', function () {
            $('body').removeClass('body-overflow');
            $('#pxl-search-popup').removeClass('active');
        });

        /* Hidden Panel */
        $(".pxl-hidden-panel-button").on('click', function () {
            $('body').addClass('body-overflow');
            $('#pxl-hidden-panel-popup').addClass('active');
        });
        $("#pxl-hidden-panel-popup .pxl-item--overlay, #pxl-hidden-panel-popup .pxl-item--close").on('click', function () {
            $('body').removeClass('body-overflow');
            $('#pxl-hidden-panel-popup').removeClass('active');
        });

        /* Cart Sidebar Popup */
        $(".pxl-cart-sidebar-button").on('click', function () {
            $('body').addClass('body-overflow');
            $('#pxl-cart-sidebar').addClass('active');
        });
        $("#pxl-cart-sidebar .pxl-item--overlay, #pxl-cart-sidebar .pxl-item--close").on('click', function () {
            $('body').removeClass('body-overflow');
            $('#pxl-cart-sidebar').removeClass('active');
        });

        /* Popup */
        $(".pxl-popup-button").on('click', function () {
            $('body').addClass('body-overflow');
            $('#pxl-popup-elementor').addClass('active');
            $('#pxl-popup-elementor').removeClass('deactivation');
        });
        $("#pxl-popup-elementor .pxl-item--overlay, #pxl-popup-elementor .pxl-item--close, .pxl-menu-primary a.is-one-page").on('click', function () {
            $('body').removeClass('body-overflow');
            $('#pxl-popup-elementor').removeClass('active');
            $('#pxl-popup-elementor').addClass('deactivation');
        });

        /* Hover Active Item */
        $('.pxl--widget-hover').each(function () {
            $(this).hover(function () {
                $(this).parents('.elementor-row').find('.pxl--widget-hover').removeClass('pxl--item-active');
                $(this).parents('.elementor-container').find('.pxl--widget-hover').removeClass('pxl--item-active');
                $(this).addClass('pxl--item-active');
            });
        });

        /* Hover Button */
        $('.btn-plus-text').hover(function () {
            $(this).find('span').toggle(300);
        });

        /* Nav Logo */
        $(".pxl-nav-button").on('click', function () {
            $('.pxl-nav-button').toggleClass('active');
            $('.pxl-nav-button').parent().find('.pxl-nav-wrap').toggle(400);
        });

        /* Button Mask */
        $('.pxl-btn-effect4').append('<span class="pxl-btn-mask"></span>');

        /* Start Icon Bounce */
        var boxEls = $('.el-bounce, .pxl-image-effect1');
        $.each(boxEls, function(boxIndex, boxEl) {
            loopToggleClass(boxEl, 'bounce-active');
        });

        function loopToggleClass(el, toggleClass) {
            el = $(el);
            let counter = 0;
            if (el.hasClass(toggleClass)) {
                waitFor(function () {
                    counter++;
                    return counter == 2;
                }, function () {
                    counter = 0;
                    el.removeClass(toggleClass);
                    loopToggleClass(el, toggleClass);
                }, 'Deactivate', 1000);
            } else {
                waitFor(function () {
                    counter++;
                    return counter == 3;
                }, function () {
                    counter = 0;
                    el.addClass(toggleClass);
                    loopToggleClass(el, toggleClass);
                }, 'Activate', 1000);
            }
        }

        function waitFor(condition, callback, message, time) {
            if (message == null || message == '' || typeof message == 'undefined') {
                message = 'Timeout';
            }
            if (time == null || time == '' || typeof time == 'undefined') {
                time = 100;
            }
            var cond = condition();
            if (cond) {
                callback();
            } else {
                setTimeout(function() {
                    waitFor(condition, callback, message, time);
                }, time);
            }
        }
        /* End Icon Bounce */

        /* Image Effect */
        if($('.pxl-image-tilt').length){
            $('.pxl-image-tilt').parents('.elementor-top-section').addClass('pxl-image-tilt-active');
            $('.pxl-image-tilt').each(function () {
                var pxl_maxtilt = $(this).data('maxtilt'),
                    pxl_speedtilt = $(this).data('speedtilt'),
                    pxl_perspectivetilt = $(this).data('perspectivetilt');
                VanillaTilt.init(this, {
                    max: pxl_maxtilt,
                    speed: pxl_speedtilt,
                    perspective: pxl_perspectivetilt
                });
            });
        }

        /* Pricing Hover */
        $('.pxl-pricing1').each(function () {
            $(this).hover(function () {
                $(this).parents('.elementor-element').find('.pxl-pricing1').removeClass('is-popular');
                $(this).addClass('is-popular');
            });
        });

        /* Select Theme Style */
        $('.wpcf7-select').each(function(){
            var $this = $(this), numberOfOptions = $(this).children('option').length;
          
            $this.addClass('pxl-select-hidden'); 
            $this.wrap('<div class="pxl-select"></div>');
            $this.after('<div class="pxl-select-higthlight"></div>');

            var $styledSelect = $this.next('div.pxl-select-higthlight');
            $styledSelect.text($this.children('option').eq(0).text());
          
            var $list = $('<ul />', {
                'class': 'pxl-select-options'
            }).insertAfter($styledSelect);
          
            for (var i = 0; i < numberOfOptions; i++) {
                $('<li />', {
                    text: $this.children('option').eq(i).text(),
                    rel: $this.children('option').eq(i).val()
                }).appendTo($list);
            }
          
            var $listItems = $list.children('li');
          
            $styledSelect.click(function(e) {
                e.stopPropagation();
                $('div.pxl-select-higthlight.active').not(this).each(function(){
                    $(this).removeClass('active').next('ul.pxl-select-options').addClass('pxl-select-lists-hide');
                });
                $(this).toggleClass('active');
            });
          
            $listItems.click(function(e) {
                e.stopPropagation();
                $styledSelect.text($(this).text()).removeClass('active');
                $this.val($(this).attr('rel'));
            });
          
            $(document).click(function() {
                $styledSelect.removeClass('active');
            });

        });

        /* Nice Select */
        $('.woocommerce-ordering .orderby, #pxl-sidebar-area select, .variations_form.cart .variations select').each(function () {
            $(this).niceSelect();
        });

        /* Item Hover - Description */
        $( ".pxl-content-effect .pxl-item--inner" ).hover(
          function() {
            $( this ).find('.pxl-item--effect').slideToggle(400);
          }, function() {
            $( this ).find('.pxl-item--effect').slideToggle(400);
          }
        );

        /* Typewriter */
        if($('.pxl-title--typewriter').length) {
            function typewriterOut(elements, callback)
            {
                if (elements.length){
                    elements.eq(0).addClass('is-active');
                    elements.eq(0).delay( 3000 );
                    elements.eq(0).removeClass('is-active');
                    typewriterOut(elements.slice(1), callback);
                }
                else {
                    callback();
                }
            }

            function typewriterIn(elements, callback)
            {
                if (elements.length){
                    elements.eq(0).addClass('is-active');
                    elements.eq(0).delay( 3000 ).slideDown(3000, function(){
                        elements.eq(0).removeClass('is-active');
                        typewriterIn(elements.slice(1), callback);
                    });
                }
                else {
                    callback();
                }
            }

            function typewriterInfinite(){
                typewriterOut($('.pxl-title--typewriter .pxl-item--text'), function(){ 
                    typewriterIn($('.pxl-title--typewriter .pxl-item--text'), function(){
                        typewriterInfinite();
                    });
                });
            }
            $(function(){
                typewriterInfinite();
            });
        }
        /* End Typewriter */

        /* Section Particles */      
        setTimeout(function() {
            $(".pxl-row-particles").each(function() {
                particlesJS($(this).attr('id'), {
                  "particles": {
                    "number": {
                        "value": $(this).data('number'),
                    },
                    "color": {
                        "value": $(this).data('color')
                    },
                    "shape": {
                        "type": "circle",
                    },
                    "size": {
                        "value": $(this).data('size'),
                        "random": $(this).data('size-random'),
                    },
                    "line_linked": {
                        "enable": false,
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": $(this).data('move-direction'),
                        "random": true,
                        "out_mode": "out",
                    }
                  },
                  "retina_detect": true
                });
            });
        }, 400);

        /* Get checked input - Mailchimpp */
        $('.mc4wp-form input:checkbox').change(function(){
            if($(this).is(":checked")) {
                $('.mc4wp-form').addClass("pxl-input-checked");
            } else {
                $('.mc4wp-form').removeClass("pxl-input-checked");
            }
        });

        /* Alert */
        $(".pxl-alert .pxl-alert--close").on('click', function () {
            $(this).parent().fadeOut();
        });

        /* Widget remove arrow */
        $('.widget .pxl-count').parent().addClass('pxl-rm-arrow');

        /* Scroll to content */
        $('.pxl-link-to-section .btn').on('click', function(e) {
            var id_scroll = $(this).attr('href');
            var offsetScroll = $('.pxl-header-elementor-sticky').outerHeight();
            e.preventDefault();
            $("html, body").animate({ scrollTop: $(id_scroll).offset().top - offsetScroll }, 600);
        });

        /* Header Remove Index */
        $('.pxl-header--rmindex').parents('#pxl-header-elementor').addClass('pxl-header--rmindex-action');

    });
    
    jQuery(document).ajaxComplete(function(event, xhr, settings){
        bisbuzz_shop_quantity();
    });

    jQuery( document ).on( 'updated_wc_div', function() {
        bisbuzz_shop_quantity();
    } );
     
    /* Header Sticky */
    function bisbuzz_header_sticky() {
        if($('#pxl-header-elementor').hasClass('is-sticky')) {
            if (pxl_scroll_top > 100) {
                $('.pxl-header-elementor-sticky.pxl-sticky-stb').addClass('pxl-header-fixed');
                $('#pxl-header-mobile').addClass('pxl-header-mobile-fixed');
            } else {
                $('.pxl-header-elementor-sticky.pxl-sticky-stb').removeClass('pxl-header-fixed');
                $('#pxl-header-mobile').removeClass('pxl-header-mobile-fixed');
            }

            if (pxl_scroll_status == 'up' && pxl_scroll_top > 100) {
                $('.pxl-header-elementor-sticky.pxl-sticky-stt').addClass('pxl-header-fixed');
            } else {
                $('.pxl-header-elementor-sticky.pxl-sticky-stt').removeClass('pxl-header-fixed');
            }
        }

        $('.pxl-header-elementor-sticky').parents('body').addClass('pxl-header-sticky');
    }

    /* Header Mobile */
    function bisbuzz_header_mobile() {
        var h_header_mobile = $('#pxl-header-elementor').outerHeight();
        if(pxl_window_width < 1199) {
            $('#pxl-header-elementor').css('min-height', h_header_mobile + 'px');
        }
    }

    /* Scroll To Top */
    function bisbuzz_scroll_to_top() {
        if (pxl_scroll_top < pxl_window_height) {
            $('.pxl-scroll-top').addClass('pxl-off').removeClass('pxl-on');
        }
        if (pxl_scroll_top > pxl_window_height) {
            $('.pxl-scroll-top').addClass('pxl-on').removeClass('pxl-off');
        }
    }

    /* Footer Fixed */
    function bisbuzz_footer_fixed() {
        setTimeout(function(){
            var h_footer = $('.pxl-footer-fixed #pxl-footer-elementor').outerHeight() - 1;
            $('.pxl-footer-fixed #pxl-main').css('margin-bottom', h_footer + 'px');
        }, 600);
    }

    /* WooComerce Quantity */
    function bisbuzz_shop_quantity() {
        "use strict";
        $('#pxl-wapper .quantity').append('<span class="quantity-icon quantity-down pxl-icon--minus"></span><span class="quantity-icon quantity-up pxl-icon--plus"></span>');
        $('.quantity-up').on('click', function () {
            $(this).parents('.quantity').find('input[type="number"]').get(0).stepUp();
            $(this).parents('.woocommerce-cart-form').find('.actions .button').removeAttr('disabled');
        });
        $('.quantity-down').on('click', function () {
            $(this).parents('.quantity').find('input[type="number"]').get(0).stepDown();
            $(this).parents('.woocommerce-cart-form').find('.actions .button').removeAttr('disabled');
        });
        $('.quantity-icon').on('click', function () {
            var quantity_number = $(this).parents('.quantity').find('input[type="number"]').val();
            var add_to_cart_button = $(this).parents( ".product, .woocommerce-product-inner" ).find(".add_to_cart_button");
            add_to_cart_button.attr('data-quantity', quantity_number);
            add_to_cart_button.attr("href", "?add-to-cart=" + add_to_cart_button.attr("data-product_id") + "&quantity=" + quantity_number);
        });
        $('.woocommerce-cart-form .actions .button').removeAttr('disabled');
    }

    /* Menu Responsive Dropdown */
    function bisbuzz_submenu_responsive() {
        var $bisbuzz_menu = $('.pxl-header-elementor-main');
        $bisbuzz_menu.find('.pxl-menu-primary li').each(function () {
            var $bisbuzz_submenu = $(this).find('> ul.sub-menu');
            if ($bisbuzz_submenu.length == 1) {
                if ( ($bisbuzz_submenu.offset().left + $bisbuzz_submenu.width() + 200 ) > $(window).width()) {
                    $bisbuzz_submenu.addClass('pxl-sub-reverse');
                }
            }
        });
    }

})(jQuery);

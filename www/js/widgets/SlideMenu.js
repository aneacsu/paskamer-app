define([
    'jquery',
    'underscore',
    'velocity'
],

function ($, _) {
    'use strict';

    var SlideMenu = function () {
    };

    _.extend(SlideMenu.prototype, {
        init: function() {
            this.body = $('body'),
            this.mask = $('.mask'),
            this.body.append(this.mask);

            this.togglePushLeft = $( ".toggle-push-left" ),
            this.togglePushRight = $( ".toggle-push-right" ),
            this.activeNav;
               
            this.initEventHandlers();
        },

        initEventHandlers: function() {
            /* push menu left */
            this.togglePushLeft.click(_.bind(function(){
                $('nav.push-menu-left').velocity({ left: '0' });
                $('#wrapper').velocity({ left: '300px' });

                this.mask.velocity({ opacity: 0.8 }, { queue: false, display: 'block' });
                this.activeNav = "push-menu-left";
            }, this));
           
            /* push menu right */
            this.togglePushRight.click(_.bind(function(){
                $('nav.push-menu-right').velocity({ right: '0' });
                $('#wrapper').velocity({ left: '-300px' });

                this.mask.velocity({ opacity: 0.8 }, { queue: false,  display: 'block' });
                this.activeNav = "push-menu-right";
            }, this));
           
            /* hide active menu if mask is clicked */
            this.mask.click(_.bind(function(){
                this.mask.hide();
            }, this));
           
            /* hide active menu if close menu button is clicked */
            $(".close-menu").click(_.bind(function(){
                if (this.activeNav === 'push-menu-left') {
                    $('nav.' + this.activeNav + '').velocity({ left: '-300px' });
                    $('#wrapper').velocity({ left: '100%' });
                } else {
                    $('nav.' + this.activeNav + '').velocity({ right: '-300px' });
                    $('#wrapper').velocity({ left: '100%' });
                }

                this.mask.velocity({ opacity: 0 }, { display: 'none' });
            }, this));
        }
    });

    return SlideMenu;
});

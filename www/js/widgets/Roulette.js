define([
    'jquery',
    'underscore',
    'hammer',
    'velocity'
],

function($, _, Hammer) {
    'use strict';

    var Roulette = function (imageLoader) {
        this.imageLoader = imageLoader;
    };

    _.extend(Roulette.prototype, {
        init: function() {
            this.initTouchSupport();
        },
        
        initTouchSupport: function() {
            _.each(['top-image', 'center-image', 'bottom-image'], function(imageId) {
                var position = imageId.replace('-image', '');

                Hammer(
                    document.getElementById(imageId),
                    { preventDefault: true })
                    .on('swipeleft', _.bind(function(event) {
                        var params = {};
                        params[position] = {};
                        params[position]['type'] = $('.select-menu-type-' + position + ' :selected').attr('value');
                        this.imageLoader.update(params);
                    }, this)
                );

                Hammer(
                    document.getElementById(imageId),
                    { preventDefault: true })
                    .on('doubletap', _.bind(function(event) {
                        var elem = $(event.gesture.target);

                        if (elem.hasClass('scaled')) {
                            elem.removeClass('scaled');
                            elem.velocity({
                                scale: '100%'
                            });
                        } else {
                            elem.addClass('scaled');
                            elem.velocity({
                                scale: '200%'
                            });
                        }
                    }, this)
                );

//                Hammer(
//                    document.getElementById(imageId),
//                    { preventDefault: true })
//                    .on('pinchin', _.bind(function(event) {
//                                            
//                        $(event.gesture.target).velocity({ 
//                            scale: '100%'
//                        });
//                    }, this)
//                );

//                Hammer(
//                    document.getElementById(imageId),
//                    { preventDefault: true })
//                    .on('rotate', _.bind(function(event) {
//                        $(event.gesture.target).velocity({ 
//                            rotateZ: '45deg'
//                        });
//                    }, this)
//                );
            }, this);
        }
    });

    return Roulette;
});

define([
        'jquery',
        'underscore'
    ],

    function ($, _) {
        'use strict';

        var ImageLoader = function (slots) {
            this.slots = slots;
            _.each(this.slots, _.bind(function (slot) {
                slot.load(_.bind(this.show, slot));
            }, this));
        };

        _.extend(
            ImageLoader.prototype, {
                show: function () {
                    this
                        .velocity({
                            translateX: "170px"
                        }, 10)
                        .velocity({
                            translateX: "0",
                            opacity: 1
                        });
                },

                update: function (params) {
                    $.ajax({
                        type: 'GET',
                        url: 'http://149.210.145.128:8080/random',
                        data: params,
                        context: this,
                        success: function (data) {
                            if (data['top'] !== undefined) {
                                this.slots.top
                                    .velocity({
                                        translateX: "-170px",
                                        opacity: 0
                                    });

                                this.slots.top.attr('src', data['top']['imageUrl']);
                                $('#top-price').text(data['top']['price']);
                            }

                            if (data['center'] !== undefined) {
                                this.slots.center
                                    .velocity({
                                        translateX: "-170px",
                                        opacity: 0
                                    });

                                this.slots.center.attr('src', data['center']['imageUrl']);
                                $('#center-price').text(data['center']['price']);
                            }

                            if (data['bottom'] !== undefined) {
                                this.slots.bottom
                                    .velocity({
                                        translateX: "-170px",
                                        opacity: 0
                                    });

                                this.slots.bottom.attr('src', data['bottom']['imageUrl']);
                                $('#bottom-price').text(data['bottom']['price']);
                            }
                        },
                        dataType: 'json'
                    });
                }
            }
        );

        return ImageLoader;
    });
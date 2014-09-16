define([
        'jquery',
        'underscore',
        'widgets/SlideMenu',
        'widgets/ImageUploader',
        'widgets/ImageLoader',
        'widgets/Roulette',
        'savedOutfits'
    ],

    function ($, _, SlideMenu, ImageUploader, ImageLoader, Roulette) {
        var Paskamer = function () {
            this.outfits = [];
        };

        _.extend(Paskamer.prototype, {
            start: function () {
                this.imageLoader = new ImageLoader({
                    top: $('.slot-top img'),
                    center: $('.slot-center img'),
                    bottom: $('.slot-bottom img')
                });

                var menu = new SlideMenu();
                menu.init();

                this.initRandomItemButton();
                this.initRandomOutfitButton();
                this.initCreateButton();
                this.initCloseCreateFormButton();
                this.initConfirmCreateFormButton();
                this.initLockItem();
                this.initSaveOutfitButton();
                this.initRetrieveOutfit();
                this.imageUploader = new ImageUploader();
                this.imageUploader.init();
                this.initRoulette();
                this.initTabs();
//            this.initIntro();
            },

            initRoulette: function () {
                this.roulette = new Roulette(this.imageLoader);
                this.roulette.init();
            },

//        initIntro: function() {
//            $('#name-confirm-button').click(function () {
//                $('#introContainer').css('display', 'none');
//            });
//        },

            initTabs: function () {
                $('#create').parent().addClass('active-tab');

                var first = true;
                $('.tab').click(function () {
                    if (first) {
                        $('#create').parent().removeClass('active');
                        first = false;
                    }
                    // highlight tab
                    $('.tab').parent().removeClass('active-tab');
                    $(this).parent().addClass('active-tab');

                    // show content
                    $('.tab-container').addClass('display-none');
                    $('#' + $(this).attr('id') + 'Content').removeClass('display-none');
                });
            },

            initLockItem: function () {
                $('.lock').click(function () {
                    if ($(this).attr('data-locked') == 'true') {
                        $(this).attr('data-locked', 'false');
                        $(this).find('img').attr('src', 'img/unlock-icon.png');
                    } else {
                        $(this).attr('data-locked', 'true');
                        $(this).find('img').attr('src', 'img/lock-icon.png');
                    }
                });
            },

            initRandomItemButton: function () {
                $('#random-items-button').click(_.bind(function () {
                    var params = {};

                    if ($('.lock-top').attr('data-locked') == 'false') {
                        params["top"] = $('.select-menu-type-top :selected').attr('value');
                    }
                    if ($('.lock-center').attr('data-locked') == 'false') {
                        params['center'] = $('.select-menu-type-center :selected').attr('value');
                    }
                    if ($('.lock-bottom').attr('data-locked') == 'false') {
                        params['bottom'] = $('.select-menu-type-bottom :selected').attr('value');
                    }

                    $.ajax({
                        type: 'GET',
                        url: 'http://149.210.145.128:8080/random',
                        data: params,
                        success: function (data) {
                            if ($('.lock-top').attr('data-locked') == 'false') {
                                $('#top-image').attr('src', data[0]['imageUrl']);
                                $('#top-price').text(parseInt(data[0]['price']) / 100);
                            }
                            if ($('.lock-center').attr('data-locked') == 'false') {
                                $('#center-image').attr('src', data[1]['imageUrl']);
                                $('#center-price').text(parseInt(data[1]['price']) / 100);
                            }
                            if ($('.lock-bottom').attr('data-locked') == 'false') {
                                $('#bottom-image').attr('src', data[2]['imageUrl']);
                                $('#bottom-price').text(parseInt(data[2]['price']) / 100);
                            }
//                        this.imageLoader.update(params);
                        }
                    });
                }, this));
            },

            initRandomOutfitButton: function () {
                $('#random-outfit-button').click(_.bind(function () {

                    var topFilter = $('.select-menu-type-top :selected').attr('value');
                    var centerFilter = $('.select-menu-type-center :selected').attr('value');
                    var bottomFilter = $('.select-menu-type-bottom :selected').attr('value');

                    var query = "top=" + topFilter + "&center=" + centerFilter + "&bottom=" + bottomFilter;

                    var outfit = getSavedOutfit(query, parseInt($('#saved-outfit-index').attr('value')));
                    if (!$.isEmptyObject(outfit)) {
                        $('#saved-outfit-name').attr('value', outfit.name);
                        $('#saved-outfit-price').attr('value', outfit.price);
                        $('#saved-outfit-index').attr('value', parseInt($('#saved-outfit-index').attr('value')) + 1);

                        $('#explore-top-image').attr('src', outfit.imgTop);
                        $('#explore-center-image').attr('src', outfit.imgCenter);
                        $('#explore-bottom-image').attr('src', outfit.imgBottom);
                        $('#created-outfit-name').text(outfit.name + '  ' + outfit.price + ' &euro;');
                    }
                }, this));
            },

            initCreateButton: function () {
                $('#create-button').click(function () {
                    $('#create-outfit-container').css({'display': 'block'});
                    $('.outfit-name-input').focus();

                    var totalPrice = Number(parseFloat($("#top-price").text()) + parseFloat($("#center-price").text()) + parseFloat($("#bottom-price").text())).toFixed(2);
                    $('#totalValue').text(totalPrice);
                });
            },

            initSaveOutfitButton: function () {
                $('#save-outfit-button').click(_.bind(function () {
                    var newOutfit = {
                        name: $('#saved-outfit-name').val(),
                        imgTop: $('#explore-top-image').attr('src'),
                        imgCenter: $('#explore-center-image').attr('src'),
                        imgBottom: $('#explore-bottom-image').attr('src'),
                        timestamp: new Date()
                    };
                    this.outfits.push(newOutfit);

                    // populate my outfits list
                    var listItem = $('<li class="outfit-list-item">' +
                        '<span class="item-list-name">' + newOutfit['name'] + '</span>' +
                        '<span class="item-list-img item-list-img-top"><img class="item-list-thumbnail" src="' + newOutfit['imgTop'] + '"></span>' +
                        '<span class="item-list-img item-list-img-center"><img class="item-list-thumbnail" src="' + newOutfit['imgCenter'] + '"></span>' +
                        '<span class="item-list-img item-list-img-bottom"><img class="item-list-thumbnail" src="' + newOutfit['imgBottom'] + '"></span>' +
                        '<span class="item-list-img"><img class="item-list-thumbnail-fb" src="img/fb-button.png"></span>' +
                        '<span class="item-list-img"><img class="item-list-thumbnail-pinterest" src="img/pinterest-button.png"></span>' +
                        '<span class="item-list-img"><img class="item-list-thumbnail-buy" src="img/buy-button.png"></span>' +
                        '<div class=""></div>' +
                        '</li>');
                    $('#inventoryContent').append(listItem);
                }, this));
            },

            initConfirmCreateFormButton: function () {
                $('#create-confirm-button').click(_.bind(function () {
                    var newOutfit = {
                        name: $('.outfit-name-input').val(),
                        imgTop: $('#top-image').attr('src'),
                        imgCenter: $('#center-image').attr('src'),
                        imgBottom: $('#bottom-image').attr('src'),
                        timestamp: new Date()
                    };
                    this.outfits.push(newOutfit);

                    // populate my outfits list
                    var listItem = $('<li class="outfit-list-item">' +
                        '<span class="item-list-name">' + newOutfit['name'] + '</span>' +
                        '<span class="item-list-img item-list-img-top"><img class="item-list-thumbnail" src="' + newOutfit['imgTop'] + '"></span>' +
                        '<span class="item-list-img item-list-img-center"><img class="item-list-thumbnail" src="' + newOutfit['imgCenter'] + '"></span>' +
                        '<span class="item-list-img item-list-img-bottom"><img class="item-list-thumbnail" src="' + newOutfit['imgBottom'] + '"></span>' +
                        '<span class="item-list-img"><img class="item-list-thumbnail-fb" src="img/fb-button.png"></span>' +
                        '<span class="item-list-img"><img class="item-list-thumbnail-pinterest" src="img/pinterest-button.png"></span>' +
                        '<span class="item-list-img"><img class="item-list-thumbnail-buy" src="img/buy-button.png"></span>' +
                        '<div class=""></div>' +
                        '</li>');
                    $('#inventoryContent').append(listItem);

                    $('.outfit-name-input').val("");
                    $('#create-outfit-container').css({'display': 'none'});
                }, this));
            },

            initCloseCreateFormButton: function () {
                $('#create-outfit-close-button').click(function () {
                    $('#create-outfit-container').css({'display': 'none'});
                });
            },

            initRetrieveOutfit: function () {
                $("body").delegate('.outfit-list-item', 'click', function () {
                    $('#top-image').attr('src', $(this).find('.item-list-img-top img').attr('src'));

                    $('.lock-top').attr('data-locked', false);
                    $('.lock-top img').attr('src', 'img/unlock-icon.png');

                    $('#center-image').attr('src', $(this).find('.item-list-img-center img').attr('src'));

                    $('.lock-center').attr('data-locked', false);
                    $('.lock-center img').attr('src', 'img/unlock-icon.png');

                    $('#bottom-image').attr('src', $(this).find('.item-list-img-bottom img').attr('src'));

                    $('.lock-bottom').attr('data-locked', false);
                    $('.lock-bottom img').attr('src', 'img/unlock-icon.png');

                    $('#create').click();
                });
            }
        });

        return Paskamer;

    });
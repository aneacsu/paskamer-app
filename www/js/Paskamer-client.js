define([
    'jquery',
    'underscore',
    'widgets/SlideMenu',
    'widgets/ImageUploader',
    'widgets/ImageLoader',
    'widgets/Roulette'
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

            this.initCapiRandomButton();
            this.initCreateButton();
            this.initCloseCreateFormButton();
            this.initConfirmCreateFormButton();
            this.initLockItem();
            this.initRetrieveOutfit();
            this.imageUploader = new ImageUploader();
            this.imageUploader.init();
            this.initRoulette();
            this.initTabs();
            this.initIntro();
        },

        initRoulette: function() {
            this.roulette = new Roulette(this.imageLoader);
            this.roulette.init();
        },

        initIntro: function() {
            $('#name-confirm-button').click(function () {
                $('#introContainer').css('display', 'none');
            });

        },

        initTabs: function() {
            $('#create').parent().addClass('active-tab');

            var first = true;
            $('.tab').click(function() {
                if (first){
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
            $('.lock').click(function() {
                if ($(this).attr('data-locked') == 'true'){
                    $(this).attr('data-locked', 'false');
                    $(this).find('img').attr('src', 'img/unlock-icon.png');
                } else {
                    $(this).attr('data-locked', 'true');
                    $(this).find('img').attr('src', 'img/lock-icon.png');
                }
            });
        },

        initCapiRandomButton: function () {
            $('#random-items-button').click(_.bind(function () {
                var params = {};

                if ($('.lock-top').attr('data-locked') == 'false') {
                    params["top"] = {
                        'type': $('.select-menu-type-top :selected').attr('value'),
                        'size': '',
                        'condition': '',
                        'color': ''
                    };
                }
                if ($('.lock-center').attr('data-locked') == 'false') {
                    params['center'] = {
                        'type': $('.select-menu-type-center :selected').attr('value'),
                        'size': '',
                        'condition': '',
                        'color': ''
                    };
                }
                if ($('.lock-bottom').attr('data-locked') == 'false') {
                    params['bottom'] = {
                        'type': $('.select-menu-type-bottom :selected').attr('value'),
                        'size': '',
                        'condition': '',
                        'color': ''
                    };
                }

                this.imageLoader.update(params);
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

        initConfirmCreateFormButton: function () {
            $('#create-confirm-button').click(_.bind(function () {
                var newOutfit = {
                    name: $('.outfit-name-input').val(),
                    imgTop: $('.slot-top img').attr('src'),
                    imgCenter: $('.slot-center img').attr('src'),
                    imgBottom: $('.slot-bottom img').attr('src'),
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
                    '<span class="item-list-img"><img class="item-list-thumbnail-buy" src="img/buy-icon.png"></span>' +
                    '<div class=""></div>' +
                    '</li>');
                $('.push-menu-left').append(listItem);

                $('.outfit-name-input').val("")
                $('#create-outfit-container').css({'display': 'none'});
                console.log(this.outfits)

            }, this));
        },

        initCloseCreateFormButton: function(){
            $('#create-outfit-close-button').click(function () {
                $('#create-outfit-container').css({'display': 'none'});
            });
        },

        initRetrieveOutfit: function() {
            $( "body" ).delegate('.outfit-list-item', 'click', function () {
                $('.slot-top img').attr('src',$(this).find('.item-list-img-top img').attr('src'));
                $('.slot-center img').attr('src',$(this).find('.item-list-img-center img').attr('src'));
                $('.slot-bottom img').attr('src',$(this).find('.item-list-img-bottom img').attr('src'));
                
                $(".close-menu").click();
            });
        }
    });

    return Paskamer;

});

define([
    'jquery',
    'underscore'
],

function ($, _) {
    var ImageUploader = function () {
    };

    _.extend(ImageUploader.prototype, {
        init: function() {
            // #TOP IMAGE
            $("#uploadTopImage").click(function (e) {
                e.preventDefault(); //prevent default action
                if ($("#uploadTop"))
                    $("#uploadTop").click();
            });

            var topImg = document.getElementById('top-image');

            $("#uploadTop").change(function (e) {

                var fileReader = new FileReader();
                var file = this.files[0];


                fileReader.onload = (function (img) {

                    return function (e) {
                        img.src = e.target.result;
                        $('.lock-top').attr('data-locked', true);
                        $('.lock-top').find('img').attr('src', 'img/lock-icon.png');
                        $('#top-price').text(0);
                    };
                })(topImg);

                fileReader.readAsDataURL(file);
            });

            // #CENTER IMAGE
            $("#uploadCenterImage").click(function (e) {
                e.preventDefault(); //prevent default action
                if ($("#uploadCenter"))
                    $("#uploadCenter").click();
            });

            var centerImg = document.getElementById('center-image');

            $("#uploadCenter").change(function (e) {

                var fileReader = new FileReader();
                var file = this.files[0];


                fileReader.onload = (function (img) {

                    return function (e) {
                        img.src = e.target.result;
                        $('.lock-center').attr('data-locked', true);
                        $('.lock-center').find('img').attr('src', 'img/lock-icon.png');
                        $('#center-price').text(0);
                    };
                })(centerImg);

                fileReader.readAsDataURL(file);
            });

            // #BOTTOM IMAGE
            $("#uploadBottomImage").click(function (e) {
                e.preventDefault(); //prevent default action
                if ($("#uploadBottom"))
                    $("#uploadBottom").click();
            });

            var bottomImg = document.getElementById('bottom-image');

            $("#uploadBottom").change(function (e) {

                var fileReader = new FileReader();
                var file = this.files[0];


                fileReader.onload = (function (img) {

                    return function (e) {
                        img.src = e.target.result;
                        $('.lock-bottom').attr('data-locked', true);
                        $('.lock-bottom').find('img').attr('src', 'img/lock-icon.png');
                        $('#bottom-price').text(0);
                    };
                })(bottomImg);

                fileReader.readAsDataURL(file);
            });
        }
    });

    return ImageUploader;
});

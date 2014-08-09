$(document).ready(function() {

    $('.lock img').click(function() {
        if ($(this).parent().attr('data-locked') == 'true'){
            $(this).parent().attr('data-locked', 'false');
            $(this).attr('src', 'img/unlock-icon.png');
            console.log('locked');
        } else {
            $(this).parent().attr('data-locked', 'true');
            $(this).attr('src', 'img/lock-icon.png');
            console.log('unlocked');
        }
    });

});
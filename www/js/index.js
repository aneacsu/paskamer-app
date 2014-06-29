function initLockItem() {
    $('.lock').click(function() {
        if ($(this).attr('data-locked') == 'true'){
            $(this).attr('data-locked', 'false');
            $(this).find('img').attr('src', 'images/unlock-icon.png');
        } else {
            $(this).attr('data-locked', 'true');
            $(this).find('img').attr('src', 'images/lock-icon.png');
        }
    });
}

'use strict';

require.config({
    baseUrl: 'js/',

    waitSeconds: 15,

    paths: {
        jquery: 'lib/jquery.min',
        underscore: 'lib/underscore-min',
        hammer: 'lib/hammer.min',
        velocity: 'lib/jquery.velocity.min',
    },
    
    shim: {
        velocity: ['jquery']
    }
});

require(['paskamer-client'], function(Paskamer) {
    console.log('Starting Paskamer');

    document.addEventListener('deviceready', function() {
        new Paskamer().start();
    }, false);
    // add listener to make it work on browser
});

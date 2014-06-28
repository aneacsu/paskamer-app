'use strict';

require.config({
    baseUrl: '/js/',

    waitSeconds: 15,
    
    paths: {
        jquery: 'lib/ext/jquery/dist/jquery.min',
        underscore: 'lib/ext/underscore-amd/underscore-min',
        html2canvas: 'lib/html2canvas',
        hammer: 'lib/hammer.min',
        velocity: 'lib/jquery.velocity.min'
    },
    
    shim: {
        html2canvas: {
             exports: 'html2canvas'
        },
          
        facebook: {
            exports: 'FB'
        },
          
        velocity: ['jquery']
    }


});

require(['Paskamer-client'], function(Paskamer) {
    console.log('Starting Paskamer');
    new Paskamer().start();
});

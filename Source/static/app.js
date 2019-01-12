require.config({
    paths: {
        main: './main',
        viewerCesiumNavigationMixin: './static/thirdParty/navigator/standalone/viewerCesiumNavigationMixin',
    },
    shim: {
        viewerCesiumNavigationMixin: {
            deps: ['Cesium']
        },
        main: {
            deps: ['Cesium', 'viewerCesiumNavigationMixin'],
        }
    }
});

define([
    'Cesium',
    'viewerCesiumNavigationMixin',
    'main',
    // './Sandcastle-header.js',
    // 'rcss!./bucket.css',
    'domReady!',
], function () {
    'use strict';
});
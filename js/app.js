angular.module('FYITips', ['ionic',
                           'ionic.utils',
                           'firebase',
                           'ConsoleLogger',
                           'FYITips.controllers',
                           'FYITips.services',
                           'FYITips.directives'])

.run(function($ionicPlatform, PrintToConsole) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
  PrintToConsole.active = true;
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('tips', {
      url: '/tips',
      templateUrl: 'templates/tips.html',
      controller: 'TipsCtrl'
    })

    .state('tip-map', {
      url: '/tip/:tipId/map',
      templateUrl: 'templates/tip-map.html',
      controller: 'TipMapCtrl'
    })

    .state('help', {
      url: '/help',
      templateUrl: 'templates/help.html',
      controller: 'HelpCtrl'
    })
    ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tips');
})
;

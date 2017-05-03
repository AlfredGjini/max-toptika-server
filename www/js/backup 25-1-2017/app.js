angular.module('directory', ['ionic', 'directory.controllers', 'directory.services','angCamera', 'ngCordova', 'ngOpenFB', 'ionMdInput', 'ionic-material','dnd'])

.run(function($ionicPlatform, ngFB) {
  $ionicPlatform.ready(function() {
    ngFB.init({
      appId: '1791859544427676'
    });
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('index', {
      url: '/',
      templateUrl: 'templates/index-page.html',
      controller: 'EmployeeListCtrl'
    })
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'menuCtrl'
    })

  .state('app.kreu', {
    url: "/kreu",
    views: {
      'menuContent': {
        templateUrl: "templates/kreu.html",
        controller: "syzeCtrl"
      }
    }
  })

  .state('app.produkte', {
    url: "/produkte",
    views: {
      'menuContent': {
        templateUrl: "templates/produkte.html",
        controller: "produkteCtrl"
      }
    }
  })

  .state('app.produkteSinlge', {
    url: "/produkte/:productId",
    views: {
        'menuContent': {
            templateUrl: 'templates/produkte-single.html',
            controller: 'produkteSingleCtrl'
          }
    }
  })

  .state('app.oferta', {
      url: "/oferta",
      views: {
        'menuContent': {
          templateUrl: "templates/oferta.html"
        }
      }
    })

    .state('app.sherbime', {
      url: "/sherbime",
      views: {
        'menuContent': {
          templateUrl: "templates/sherbime.html",
          controller:"sherbimeCtrl"
        }
      }
    })

    .state('app.pika', {
      url: "/sherbime/pika",
      views: {
        'menuContent': {
          templateUrl: "templates/pika.html",
          controller: "geoCtrl"
        }
      }
    })
    
    .state('employee', {
      url: '/employees/:employeeId',
      templateUrl: 'templates/employee-detail.html',
      controller: 'EmployeeDetailCtrl'
    })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: "templates/login.html",
        controller: 'loginCtrl'
      }
    }
  })

  .state('app.logout', {
    url: '/logout',
    controller: 'logoutCtrl'
  })

  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: "templates/profile.html",
        controller: 'profileCtrl'
      }
    }
  })

  .state('app.wishlist', {
    cache: false,
    url: '/wishlist',
    views: {
      'menuContent': {
        templateUrl: "templates/wishlist.html",
        controller: 'wishlistCtrl'
      }
    }
  })

  .state('app.try-on', {
    cache: false,
    url: '/sherbime/try-on',
    views: {
      'menuContent': {
        templateUrl: "templates/try-on.html",
        controller: 'KamerCtrl'
      }
    }
  })

  .state('app.oauth', {
    url: '/oauthcallback.html',
    templateUrl: '../oauthcallback.html'
  })

  .state('app.kartela-klinike', {
    url: '/sherbime/kartela-klinike',
    views: {
      'menuContent': {
        templateUrl: 'templates/kartela-klinike.html',
        controller: 'kartelaCtrl'
      }
    }
  })

  .state('app.takim', {
    url: '/sherbime/takim',
    views: {
      'menuContent': {
        templateUrl: 'templates/takim.html',
        controller: 'takimCtrl'
      }
    }
  })

  .state('app.rreth-nesh', {
      url: "/rreth-nesh",
      views: {
        'menuContent': {
          templateUrl: "templates/rreth-nesh.html"
        }
      }
    })



  .state('reports', {
    url: '/employees/:employeeId/reports',
    templateUrl: 'templates/employee-reports.html',
    controller: 'EmployeeReportsCtrl'
  });


  $urlRouterProvider.otherwise('/app/kreu');

})



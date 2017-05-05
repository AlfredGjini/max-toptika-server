angular.module('directory.controllers', ['ionic', 'ngOpenFB','angCamera', 'ionMdInput', 'ionic-material', 'ngCordova'])



.controller('syzeCtrl', function($scope, $state) {
  console.log('kreu mthf');
  console.log(window.localStorage.token);
})




.controller('produkteSingleCtrl',function($scope, $state,$stateParams,$http){
  console.log($stateParams.productId);
  $http({
       method: 'POST',
       //url: 'https://tarzantest.herokuapp.com/login',
       url: 'http://localhost:5000/product-single',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       transformRequest: function(obj) {
         var str = [];
         for (var p in obj)
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
         return str.join("&");
       },
       data: {
         productId : $stateParams.productId
       }
     }).success(function(response) {
         $scope.syze = response;
      });

})

.controller('produkteCtrl', function($scope, Syze, $location, $state, $ionicLoading, $ionicPopup, $http) {
  $scope.data = {};
  /*$ionicLoading.show({
    template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Loading...'
  });*/
  //offset to get data and implement infinite scroll
  $scope.limit  = 20; //gets 20 objects the first time
  $scope.offset = 0;
  $scope.syze   = [];
  $scope.loadNextProducts = function(){
    console.log($scope.data.search);
    console.log('t');
    $ionicLoading.hide();
  /*  var params = [];
    $http.get('http://localhost:5000/kreu',{limit:$scope.limit,offset:$scope.offset})
     .success(function(response){
       console.log(response);
       $scope.limit  += 20; //gets another limt data
       $scope.offset += 20;
       $scope.push(response);
     });
     console.log('Infinite scroll on course!!!!!!');*/
     var count = 1;
     console.log('Reuqest number : ',count++);
     $http({
       method: 'POST',
       //url: 'https://tarzantest.herokuapp.com/login',
       url: 'http://localhost:5000/kreu',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       transformRequest: function(obj) {
         var str = [];
         for (var p in obj)
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
         return str.join("&");
       },
       data: {
         offset : $scope.offset
       }
     }).success(function(response) {
       $scope.$broadcast('scroll.infiniteScrollComplete');
      response.forEach(function(item){
        $scope.syze.push(item);
        console.log('tttttt');
      });
       console.log(response);
       //gets another limt data
       $scope.offset += 20;
     });

  };
  /*$scope.syze = Syze.query(function() {
    $ionicLoading.hide();
  });*/
  $scope.addToWishlist = function(item) {
    // window.localStorage eshte si session ne php
    console.log("item "+item);

    $scope.items = [];
    // Lajmeron qe produkti u shtua ne wishlistin tuaj (therritet me poshte)
    $scope.add = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'WISHLIST',
        template: '<p align="center">Produkti u shtua ne Wishlisten tuaj!</p>'
      });
    };
    // Lajmeron nqs produkti ekziston ne wishlist tuaj (therritet me poshte)
    $scope.exists = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'WISHLIST',
        template: '<p align="center">Produkti i zgjedhur ndodhet ne Wishlisten tuaj!</p>'
      });
    };
    // Nqs jane vendosur produkte ne wishlist i merr dhe i ndan me , dhe i shton tek array items
    if (window.localStorage.getItem('wishlist')) {
      $scope.items = window.localStorage.getItem('wishlist').split(",");
    }
    // Kontrollon nqs produkti qe duam te shtojme nuk ndodhet ne wishlist dhe e shton nqs eshte true. Ne te kundert lajmeron qe produkti ekziston.
    if ($scope.items.indexOf(item.target.id) == -1) {
      var id = item.target.id;
      $scope.items.push(id);
      $scope.add();
    } else {
      $scope.exists();
    }
    // Krijon localStorage dhe shton aty produktet per wishlist
    window.localStorage.setItem('wishlist', $scope.items);
  };
})

//firt login controller. switchted to ionicPopup login.....see menuCtrl login
.controller('loginCtrl', function($scope, $resource, $http, $ionicPopup, $location, $state, ngFB) {
  if (window.localStorage.token && window.localStorage.token !== undefined) {
    console.log('User already logged in');
    $state.go('app.kreu');
  } else {
    $scope.data = {};
    $scope.showAlert = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Login Failed',
        template: '<p align="center">Ju lutemi plotesoni te gjitha te dhenat!</p>'
      });
    };

    $scope.showAlertPass = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Login Failed',
        template: '<p align="center">Passwordi juaj eshte gabim!</p>'
      });
    };

    $scope.showAlertNotRegistered = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Login Failed',
        template: '<p align="center">Perdoruesi nuk eshte i regjistruar!</p>'
      });
    };

    $scope.prepareStr = function(str) {
      return str.substring(0, 3).split("").reverse().join("").toUpperCase();
    };

    $scope.login = function() {
      if ($scope.data.username === "" || $scope.data.password === "" ||
        $scope.data.username === undefined || $scope.data.password === undefined) {
        $scope.showAlert();
      } else {
        var base64Str = 'UG93ZXJlZCBieSA6IFRhcnphbiBQcmVuZ2E=';
        var d = new Date();
        var token = $scope.prepareStr($scope.data.username) + base64Str + $scope.prepareStr($scope.data.password) + d.getTime();
        window.localStorage.setItem('token', token);
        console.log(btoa($scope.data.username) + "TzAN");
        window.localStorage.setItem('username', btoa($scope.data.username) + "TzAN");
        $http({
          method: 'POST',
          //url: 'https://tarzantest.herokuapp.com/login',
          url: 'http://localhost:5000/login',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          transformRequest: function(obj) {
            var str = [];
            for (var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
          },
          data: {
            username: $scope.data.username,
            password: $scope.data.password,
            token: token
          }
        }).success(function(response) {
          $scope.response = response;
          console.log($scope.response.login);
          if ($scope.response.login === 1) {
            console.log('Logged in...');
            $scope.loggedin = true;
            console.log($scope.response.id);
            window.localStorage.setItem('id', $scope.response.id);
            $state.go('app.kreu', {}, {
              reload: true
            });
          } else if ($scope.response.login === 0) {
            $scope.showAlertPass();
          } else {
            $scope.showAlertNotRegistered();
          }
        });
      }
    };
  }

  $scope.fbLogin = function() {
    ngFB.login({
      scope: 'email,publish_actions,public_profile,user_about_me'
    }).then(
      function(response) {
        var base64Str = 'UG93ZXJlZCBieSA6IFRhcnphbiBQcmVuZ2E=';
        var d = new Date();
        var token = base64Str + d.getTime();
        if (response.status === 'connected') {
          window.localStorage.setItem('token', token);
          window.localStorage.setItem('fbl', true);
          $scope.loggedin = true;
          console.log('Facebook login succeeded');
          $state.go('app.kreu', {}, {
            reload: true,
            cache: false
          });
        } else {
          alert('Facebook login failed');
        }
      });
  };
})

//geolocation api
/*.controller('geoCtrl', function($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform) {

  $ionicPlatform.ready(function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Duke gjetur vendodhjen!'
    });

    var posOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    };

    $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
      var addToJson = [];
      var lat = position.coords.latitude;
      var long = position.coords.longitude;

      var myLatlng = new google.maps.LatLng(lat, long);
      var destLatlng = new google.maps.LatLng(lat, long);

      var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var bounds = new google.maps.LatLngBounds;
      var markersArray = [];

      var origin1 = {
        lat: lat,
        lng: long
      };

      var destination = [{
        lat: 41.3233877,
        lng: 19.8042855
      }, {
        lat: 41.312632,
        lng: 19.445885
      }, {
        lat: 41.3201939,
        lng: 19.8225954
      }, {
        lat: 41.3378682,
        lng: 19.823598
      }];
      var geocoder = new google.maps.Geocoder;
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: "Pozicioni juaj!"
      });
      var service = new google.maps.DistanceMatrixService;
      service.getDistanceMatrix({
        origins: [origin1],
        destinations: destination,
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      }, function(response, status) {
        if (status !== 'OK') {
          alert('Error was: ' + status);
        } else {
          var originList = response.originAddresses;
          var destinationList = response.destinationAddresses;
          var outputDiv = document.getElementById('output');
          outputDiv.innerHTML = '';
          deleteMarkers(markersArray);

          var showGeocodedAddressOnMap = function(asDestination) {
            // var icon = asDestination ? destinationIcon : originIcon;
            return function(results, status) {
              if (status === 'OK') {
                map.fitBounds(bounds.extend(results[0].geometry.location));
              } else {
                alert('Geocode was not successful due to: ' + status);
              }
            };
          };

          for (var i = 0; i < originList.length; i++) {
            var results = response.rows[i].elements;
            geocoder.geocode({
              'address': originList[i]
            }, showGeocodedAddressOnMap(false));
            for (var j = 0; j < results.length; j++) {
              geocoder.geocode({
                'address': destinationList[j]
              }, showGeocodedAddressOnMap(true));
              addToJson[j] = results[j].distance.value;
            }
          }

          /* Shortest route */
/*
          var min = addToJson[0];
          var index = 0;
          for (var i = 1; i < addToJson.length; i++) {
            if (min > addToJson[i]) {
              min = addToJson[i];
              index = i;
            }
          }

          var directionsService = new google.maps.DirectionsService;
          var directionsDisplay = new google.maps.DirectionsRenderer({
            draggable: true,
            map: map,
          });

          directionsDisplay.addListener('directions_changed', function() {
            computeTotalDistance(directionsDisplay.getDirections());
          });

          displayRoute(origin1, destination[index], directionsService, directionsDisplay);

          function displayRoute(origin, destination, service, display) {
            service.route({
              origin: origin,
              destination: destination,
              travelMode: 'DRIVING',
              avoidTolls: true
            }, function(response, status) {
              if (status === 'OK') {
                display.setDirections(response);
              } else {
                alert('Could not display directions due to: ' + status);
              }
            });
          }

          function computeTotalDistance(result) {
            var total = 0;
            var myroute = result.routes[0];
            for (var i = 0; i < myroute.legs.length; i++) {
              total += myroute.legs[i].distance.value;
            }
            total = total / 1000;
          }

          //end of shortest route
        }



      });

      function deleteMarkers(markersArray) {
        for (var i = 0; i < markersArray.length; i++) {
          markersArray[i].setMap(null);
        }
        markersArray = [];
      }
      $scope.map = map;
      $ionicLoading.hide();
      console.log(lat);
      console.log(long);
      console.log(addToJson);
    }, function(err) {
      $ionicLoading.hide();
      console.log(err);
    });
  });
})
*/
.controller('geoCtrl', function($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform) {
  $scope.adresses = [{
    "Dyqani": "Max Optika QTU",
    "Adresa": "Autostrada Tirane - Durres, Km 6, Kashar 1001, Tirana, Albania",
    "Email": "qtu@maxoptika.al",
    "Cel": '694000607',
    "Orari": "09:00-21:00"
  }, {
    "Dyqani": "Max Optika Citypark",
    "Adresa": "Qendra Tregetare Citypark, Tirane",
    "Email": "citypark@maxoptika.al",
    "Cel": '694000608',
    "Orari": "10:00-21:00"
  }, {
    "Dyqani": "Max Optika Myslym Shyri",
    "Adresa": "Rruga Myslym Shyri , pallati 55/1",
    "Email": "m.shyri@maxoptika.al",
    "Cel": '694000613',
    "Orari": "09:00-21:00"
  }, {
    "Dyqani": "Max Optika 21 Dhjetori",
    "Adresa": "Rruga Muhamet Gjollesha, Tirane",
    "Email": "21dhjetori@maxoptika.al",
    "Cel": '689092405',
    "Orari": "09:00-21:00"
  }, {
    "Dyqani": "Max Optika Sheshi Wilson",
    "Adresa": "Rruga Sami Frasheri, Njesia Bashkiake nr 5, tek rrethrrotullimi i Sheshit Wilson",
    "Email": "sheshi.wilson@maxoptika.al",
    "Cel": '694045454',
    "Orari": "09:00-21:00"
  }, {
    "Dyqani": "Max Optika Medrese",
    "Adresa": "Rruga Bajram Curri, pallati nr:312/12 prane Medreses.",
    "Email": "medrese@maxoptika.al",
    "Cel": '694045452',
    "Orari": "09:00-21:00"
  }, {
    "Dyqani": "Max Optika Durres",
    "Adresa": "Lagjia nr.1 Rruga Tregtare,mbrapa Bashkise,Durres",
    "Email": "durres@maxoptika.al",
    "Cel": '694000609',
    "Orari": "09:00-20:00"
  }, {
    "Dyqani": "Max Optika Lushnje",
    "Adresa": "Bulevardi kryesor, perballe Bashkise, Lushnje",
    "Email": "lushnje@maxoptika.al",
    "Cel": '694045700',
    "Orari": "09:00-21:00"
  }, {
    "Dyqani": "Max Optika Vlore",
    "Adresa": "Bulevardi Vlore-Skele, perballe pallatit te sportit, Vlore",
    "Email": "vlore@maxoptika.al",
    "Cel": '696048849',
    "Orari": "09:00-21:00"
  }, {
    "Dyqani": "Max Optika Fier",
    "Adresa": "Lagjia 11 Janari, Rruga Ramiz Aranitasi, Fier",
    "Email": "fier@maxoptika .al",
    "Cel": '694000614',
    "Orari": "09:00-21:00"
  }, {
    "Dyqani": "Max Optika Sarande",
    "Adresa": "Rruga Onhezmi, Sarande",
    "Email": "maxoptika.sarande@gmail.com",
    "Cel": '688034749',
    "Orari": "09:00-21:00"
  }, {
    "Dyqani": "Max Optika Elbasan",
    "Adresa": "Rruga Rinia, Elbasan",
    "Email": "maxoptika.elbasan@gmail.com",
    "Cel": '694057812',
    "Orari": "09:00-21:00"
  }, {
    "Dyqani": "Max Optika Korce",
    "Adresa": "Lagjja 9, Rruga Midhi Kostani, prane Bankes Kombetare, Korce",
    "Email": "korce@maxoptika.al",
    "Cel": '696098866',
    "Orari": "09:00-20:00"
  }, {
    "Dyqani": "Max Optika Pogradec",
    "Adresa": "Rruga Refik Collaku,perballe hotel Enkelana, Pogradec",
    "Email": "maxoptika.pogradec@gmail.com",
    "Cel": '694045453',
    "Orari": "09:00-20:00"
  }, {
    "Dyqani": "Max Optika Kruje",
    "Adresa": "Lagjja Sesere, qender Kruje",
    "Email": "maxoptika.kruje@gmail.com",
    "Cel": '694000611',
    "Orari": "09:00-21:00"
  }, {
    "Dyqani": "Max Optika Lezhe",
    "Adresa": "Qendra Tregetare Net Center,Lezhe",
    "Email": "lezhe@maxoptika.al",
    "Cel": '689092403',
    "Orari": "09:00-21:00"
  }, {
    "Dyqani": "Max Optika Shkoder",
    "Adresa": "Lagjja Qemal Stafa, Rruga 13 Dhjetori, Shkoder",
    "Email": "shkoder@maxoptika.al",
    "Cel": '696048850',
    "Orari": "09:00-21:00"
  }, {
    "Dyqani": "Max Optika Prishtine",
    "Adresa": "Rruga Bulevardi I Deshmoreve, prane Aleances, Prishtine",
    "Email": "prishtine@maxoptika.al",
    "Cel": '38649604623',
    "Orari": "09:00-21:00"
  }, {
    "Dyqani": "Max Optika Minimax",
    "Adresa": "Qendra tregtare Minimax, Prishtine",
    "Email": "prishtine@maxoptika.al",
    "Cel": '38649604623',
    "Orari": "09:00-21:00"
  }];
  $ionicPlatform.ready(function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Duke gjetur vendodhjen!'
    });

    var posOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    };

    $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
      var addToJson = [];
      var lat = position.coords.latitude;
      var long = position.coords.longitude;

      var myLatlng = new google.maps.LatLng(lat, long);
      var destLatlng = new google.maps.LatLng(lat, long);

      var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var bounds = new google.maps.LatLngBounds;
      var markersArray = [];

      var origin1 = {
        lat: lat,
        lng: long
      };
      //missing Pogradec, Shkoder, Lushnje, Vlore, Tirane sheshi willson
      var destination = [{
        lat: 41.353103,
        lng: 19.7471094
      }, {
        lat: 41.324609,
        lng: 19.8090161
      }, {
        lat: 41.3672165,
        lng: 19.6854735
      }, {
        lat: 41.3233631,
        lng: 19.8021845
      }, {
        lat: 41.3378682,
        lng: 19.823598
      }, {
        lat: 41.3201939,
        lng: 19.82089
      }, {
        lat: 41.3125946,
        lng: 19.443732
      }, {
        lat: 40.7228081,
        lng: 19.5543033
      }, {
        lat: 41.1207294,
        lng: 20.0778097
      }, {
        lat: 39.8749676,
        lng: 20.0035474
      }];
      var geocoder = new google.maps.Geocoder;
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: "Pozicioni juaj!"
      });
      var locations = [{
        lat: 41.3531137,
        lng: 19.749233
      }, {
        lat: 41.3246309,
        lng: 19.8110955
      }, {
        lat: 41.3672394,
        lng: 19.6875313
      }, {
        lat: 41.3233814,
        lng: 19.8042468
      }, {
        lat: 41.3378643,
        lng: 19.8256858
      }, {
        lat: 41.3201754,
        lng: 19.823003
      }, {
        lat: 41.3125908,
        lng: 19.4457867
      }, {
        lat: 40.7227959,
        lng: 19.5564198
      }, {
        lat: 41.1206899,
        lng: 20.0798976
      }, {
        lat: 39.8749266,
        lng: 20.0056631
      }];

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(41.3672165, 19.6854735),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      var infowindow = new google.maps.InfoWindow();

      var marker, i;

      for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
          map: map
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
          }
        })(marker, i));
      }
      $scope.map = map;
      $ionicLoading.hide();
      console.log(lat);
      console.log(long);
      console.log(addToJson);
    }, function(err) {
      $ionicLoading.hide();
      console.log(err);
    });
  });
})

.controller('menuCtrl', function($scope, $resource, $http, $ionicPopup, $location, $state, ngFB) {
  //$scope.loggedin = false;
  $scope.data = {};
  if (window.localStorage.token !== "empty" && window.localStorage.token !== undefined) {
    $scope.loggedin = true;
    $scope.username = atob(window.localStorage.username.substr(0, (window.localStorage.username.length - 4)));
    console.log($scope.username);
  }
  $scope.logout = function() {
    console.log('Loogggout');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('username');
    // If user has loged in with facebook then log him/her out
    if (window.localStorage.getItem('fbl')) {
      window.localStorage.removeItem('fbl');
      //$scope.loggedin = true;
      ngFB.logout();
    }
    window.location.reload(true);
  };

  $scope.showData = function() {
    ngFB.api({
      path: '/me',
      params: {
        fields: 'id,name'
      }
    }).then(
      function(user, error) {
        if (error) {
          console.log(error.error_description + " test!");
        } else {
          $scope.user = user;
          $scope.data.img = "http://graph.facebook.com/" + $scope.user.id + "/picture?width=270&height=270";
        }

      });
  };
  $scope.showData();
})

.controller('wishlistCtrl', function($scope, $http, $stateParams) {
  $scope.response = {};

  $scope.removeFromWishlist = function(item) {
    var wsh = window.localStorage.wishlist.split(',');
    var i = wsh.indexOf(item.target.id);
    wsh.splice(i, 1);
    window.localStorage.wishlist = wsh;
    item.target.hidden = true;
    item.target.parentElement.remove();
  };

  $scope.getWishlist = function() {
    var data = window.localStorage.getItem('wishlist') || "";
    if (data !== "") {
      $http({
        method: 'POST',
        url: 'http://localhost:5000/wishlist',
        cach: false,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function(obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: {
          wishlist: JSON.stringify(data.split(','))
        }
      }).success(function(response) {
        $scope.response = response;
        console.log(response.length);
        for (var i in $scope.response) {
          console.log($scope.response[i].name);
        }
      });
    };
  }
  $scope.getWishlist();

})





.controller('EmployeeReportsCtrl', function($scope, $stateParams, Employees) {
  console.log('reports');
  $scope.employee = Employees.get({
    employeeId: $stateParams.employeeId,
    data: 'reports'
  });
})

.controller('kartelaCtrl', function($scope, $stateParams, $http) {
  $scope.data = {};
  $http({
    method: 'GET',
    url: 'http://localhost:5000/kartela-klinike/?id=' + window.localStorage.id,
    cach: false,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      id: window.localStorage.id
    }
  }).success(function(response) {
    $scope.data.clinic = response[0];
    $scope.data.clinic.data_vizites = new Date(Date.parse($scope.data.clinic.data_vizites)).toDateString();
  });

})

.controller('takimCtrl', function($scope, $stateParams, $http, $ionicPopup) {
  $scope.data = {};
  $scope.data.id = window.localStorage.id;
  $scope.response = {};
  $scope.rezervo = function() {
    if ($scope.data.dyqan === undefined || $scope.data.date === undefined ||
      $scope.data.ora == undefined || $scope.data.shenime === undefined) {
      alert('Plotesoni te dhenat!');
    } else {
      console.log('Success');
      $http({
        method: 'POST',
        url: 'http://localhost:5000/takim',
        cach: false,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function(obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: {
          date: $scope.data.date,
          ora: $scope.data.ora,
          shenime: $scope.data.shenime,
          dyqan: $scope.data.dyqan,
          id: $scope.data.id
        }
      }).success(function(response) {
        console.log(response);
        console.log(response.success);
        console.log(typeof response);
        if (response.success) {
          $ionicPopup.alert({
            title: 'Rezervo Takim',
            template: '<p align="center">Rezervimi u krye me sukses!</p>'
          });
        } else {
          $ionicPopup.alert({
            title: 'Rezervo Takim',
            template: '<p align="center">Rezervimi nuk mund te kryhet per momentin. Ju lutemi provoni serisht me vone!</p>'
          });
        }
      });
    }
  };
})

.controller('sherbimeCtrl', function($scope, $stateParams) {
    $scope.loggedin = false;
    if (window.localStorage.token !== "empty" && window.localStorage.token !== undefined) {
      $scope.loggedin = true;
    }
  })
  .controller('profileCtrl', function($scope, $stateParams) {
    console.log('Profile');
  })


.controller('KamerCtrl', function($scope, $cordovaCamera, $ionicSideMenuDelegate) {
    $scope.takeImage = function() {
        var options = {
            quality: 80,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 250,
            targetHeight: 250,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
        };
         
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.srcImage = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // error
        });
    }
    $scope.loadImage = function() {
        var options = {
            quality: 80,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 250,
            targetHeight: 250,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
         
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.srcImage = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // error
        });
    }

        $scope.$on('$stateChangeSuccess', function () {
            $ionicSideMenuDelegate.canDragContent(false);
            // console.log('u thirrr 2');
          });
        $scope.$on('$stateChangeStart', function () {
            $ionicSideMenuDelegate.canDragContent(true);
            // console.log('iku');
          });


        this.rect = {
          "width":"150px",
          "height":"150px",
          "top":"147px",
          "left":"300px"
        };


        // $scope.images=[{
        //   default: "img/dummy.jpg"

        // }];
        $scope.images=['img/dummy.jpg','img/100.png','img/dummy2.jpg','img/1002.png','img/dummy3.jpg','img/1003.png'];

        $scope.shtoLart=function(fotoUrl){
          $scope.fotoUrl2=$scope.images[fotoUrl];
          console.log('test foto');

        };

});








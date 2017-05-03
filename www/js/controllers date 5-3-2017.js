angular.module('directory.controllers', ['ionic', 'ngOpenFB','angCamera', 'ionMdInput', 'ionic-material', 'ngCordova'])



.controller('syzeCtrl', function($scope, $state, $ionicSideMenuDelegate) {
      
      $ionicSideMenuDelegate.canDragContent(false);

      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
       if (numriShport[0]=="") {
        // console.log('po jam bosh');
        $scope.shportlistItemsLength=null;
       }else {
         $scope.shportlistItemsLength=numriShport.length;
       }
       }


  console.log('kreu mthf');
  console.log(window.localStorage.token);

  $scope.dergoInput=function (item){
    if (item=="" || item==undefined) {
          alert("Ju lutem shkruani dicka");
        }else {
    window.localStorage.setItem('searchiKerk', item);
    window.location = "#/app/search-results";
  }

  }

})




.controller('produkteSingleCtrl',function($scope, $state,$stateParams,$http, $ionicPopup, $rootScope, $ionicSideMenuDelegate){

    $scope.provoVirtual=function (item){
    if (item=="" || item==undefined) {
          alert("Empty");
        }else {
    window.localStorage.setItem('provoVirtualKod', item);
    window.location = "#/app/sherbime/try-on";
  }

  }
    $ionicSideMenuDelegate.canDragContent(false);
    $scope.alreadyExistWishlist=false;

      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
        for (var i = 0; i < numriWish.length; i++) {
            if (numriWish[i] === $stateParams.productId) {
                $scope.alreadyExistWishlist=true;
            }
        }
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
       if (numriShport[0]=="") {
        // console.log('po jam bosh');
        $scope.shportlistItemsLength=null;
       }else {
         $scope.shportlistItemsLength=numriShport.length;
       }
       }

  console.log($stateParams.productId);
  $http({
       method: 'POST',
       //url: 'https://tarzantest.herokuapp.com/login',
       url: 'https://maxoptica.herokuapp.com/product-single',
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
         console.log("trt"+$scope.syze);
      });




      $scope.addToWishlist = function(item) {
        $scope.alreadyExistWishlist=true;
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
        // Marrim te dhenat si string dhe i konvertojme ne objekt
          var produktD=item.target.id;
          // Objekt
          var produktD = JSON.parse(produktD);
          // console.log(produktD.kodartikulli);

           $rootScope.itemsFullData = [];
           $rootScope.itemsFullData.push(produktD);
          console.log($rootScope.itemsFullData);

        // Kontrollon nqs produkti qe duam te shtojme nuk ndodhet ne wishlist dhe e shton nqs eshte true. Ne te kundert lajmeron qe produkti ekziston.
        if ($scope.items.indexOf(produktD.kodartikulli) == -1) {
          


          // console.log(item.target);
          var id = produktD.kodartikulli;
          $scope.items.push(id);
          $scope.add();
        } else {
          $scope.exists();
        }
        // console.log( $scope.items );
        // Krijon localStorage dhe shton aty produktet per wishlist
        window.localStorage.setItem('wishlist', $scope.items);


        var numriWish=[];
        var wishlistItems=window.localStorage.getItem('wishlist');
        numriWish=wishlistItems.split(',');
        
         if (numriWish[0]=="") {
          // console.log('po jam bosh');
          $scope.wishlistItemsLength=null;
         }else {
           $scope.wishlistItemsLength=numriWish.length;
         }

      };



        $scope.shtoNeShporte = function(itemm) {
        // window.localStorage eshte si session ne php
        console.log("item "+itemm);

        $scope.items2 = [];
        // Lajmeron qe produkti u shtua ne wishlistin tuaj (therritet me poshte)
        $scope.addd = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Shporta',
            template: '<p align="center">Produkti u shtua ne shporten tuaj!</p>'
          });
        };
        // Lajmeron nqs produkti ekziston ne wishlist tuaj (therritet me poshte)
        $scope.existss = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Shporta',
            template: '<p align="center">Produkti i zgjedhur ndodhet ne shporten tuaj!</p>'
          });
        };
        // Nqs jane vendosur produkte ne wishlist i merr dhe i ndan me , dhe i shton tek array items
        if (window.localStorage.getItem('shporta')) {
          $scope.items2 = window.localStorage.getItem('shporta').split(",");
        }
        // Marrim te dhenat si string dhe i konvertojme ne objekt
          var produktD=itemm.target.id;
          console.log(produktD);
          // Objekt
          var produktD = JSON.parse(produktD);
          // console.log(produktD.kodartikulli);

           $rootScope.items2FullData = [];
           $rootScope.items2FullData.push(produktD);
          console.log($rootScope.items2FullData);

        // Kontrollon nqs produkti qe duam te shtojme nuk ndodhet ne wishlist dhe e shton nqs eshte true. Ne te kundert lajmeron qe produkti ekziston.
        if ($scope.items2.indexOf(produktD.kodartikulli) == -1) {
          


          // console.log(item.target);
          var id = produktD.kodartikulli;
          $scope.items2.push(id);
          $scope.addd();
        } else {
          $scope.existss();
        }
        // console.log( $scope.items );
        // Krijon localStorage dhe shton aty produktet per wishlist
        window.localStorage.setItem('shporta', $scope.items2);

        var numriShport=[];
        var shportlistItems=window.localStorage.getItem('shporta');
        // console.log(shportlistItems);
        numriShport=shportlistItems.split(',');
        // console.log(numriShport);
        
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
        };

       var treArrayGet = localStorage.getItem('treArray'); 
       
       $scope.treArrayAll=JSON.parse(treArrayGet);
       console.log($scope.treArrayAll);


})

.controller('produkteCtrl', function($scope, Syze, $location, $state, $ionicLoading, $ionicPopup, $http) {
      
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }

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
    $http.get('https://maxoptica.herokuapp.com/kreu',{limit:$scope.limit,offset:$scope.offset})
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
       url: 'https://maxoptica.herokuapp.com/kreu',
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

})

.controller('syzeDielliCtrl', function($scope, Syze, $location, $state, $ionicLoading, $ionicPopup, $http) {
  console.log("test");
  console.log($scope.offsetD);
      
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }

  $scope.data = {};
  /*$ionicLoading.show({
    template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Loading...'
  });*/
  //offset to get data and implement infinite scroll
  $scope.limit  = 20; //gets 20 objects the first time
  $scope.offsetD = 0;
  $scope.syzeD   = [];
  $scope.loadNextProducts = function(){
    console.log($scope.data.search);
    console.log('t');
    $ionicLoading.hide();
  /*  var params = [];
    $http.get('https://maxoptica.herokuapp.com/kreu',{limit:$scope.limit,offset:$scope.offset})
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
       url: 'https://max-optika-server.herokuapp.com/syze-dielli',
       // url: 'https://maxoptica.herokuapp.com/syze-dielli',
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
         offset : $scope.offsetD
       }
     }).success(function(response) {
      console.log(response);
       $scope.$broadcast('scroll.infiniteScrollComplete');
       var randomNumber=Math.floor(Math.random() * 10) + 4 ;
       console.log(randomNumber);
       response.forEach(function(item){
        $scope.syzeD.push(item);
        console.log('tttttt');
        $scope.treArray=$scope.syzeD.slice(randomNumber-3, randomNumber);
        

      });
       localStorage.setItem('treArray', JSON.stringify($scope.treArray));
      console.log($scope.treArray);
      
       // console.log(response);
       //gets another limt data
       $scope.offsetD += 20;
       console.log($scope.offsetD);
     });

  };
  /*$scope.syze = Syze.query(function() {
    $ionicLoading.hide();
  });*/

})

.controller('syzeOptikeCtrl', function($scope, Syze, $location, $state, $ionicLoading, $ionicPopup, $http) {
      
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }

  $scope.data = {};
  /*$ionicLoading.show({
    template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Loading...'
  });*/
  //offset to get data and implement infinite scroll
  $scope.limit  = 20; //gets 20 objects the first time
  $scope.offsetO = 0;
  $scope.syzeO   = [];
  $scope.loadNextProducts = function(){
    console.log($scope.data.search);
    console.log('t');
    $ionicLoading.hide();
  /*  var params = [];
    $http.get('https://maxoptica.herokuapp.com/kreu',{limit:$scope.limit,offset:$scope.offset})
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
       url: 'https://maxoptica.herokuapp.com/syze-optike',
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
         offset : $scope.offsetO
       }
     }).success(function(response) {
       $scope.$broadcast('scroll.infiniteScrollComplete');
      response.forEach(function(item){
        $scope.syzeO.push(item);
        console.log('tttttt');
      });
       console.log(response);
       //gets another limt data
       $scope.offsetO += 20;
     });

  };
  /*$scope.syze = Syze.query(function() {
    $ionicLoading.hide();
  });*/

})

.controller('koleksioniRiCtrl', function($scope, Syze, $location, $state, $ionicLoading, $ionicPopup, $http) {
      
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }

  $scope.data = {};
  /*$ionicLoading.show({
    template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Loading...'
  });*/
  //offset to get data and implement infinite scroll
  $scope.limit  = 20; //gets 20 objects the first time
  $scope.offsetK = 0;
  $scope.syzeK   = [];
  $scope.loadNextProducts = function(){
    console.log($scope.data.search);
    console.log('t');
    $ionicLoading.hide();
  /*  var params = [];
    $http.get('https://maxoptica.herokuapp.com/kreu',{limit:$scope.limit,offset:$scope.offset})
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
       url: 'https://maxoptica.herokuapp.com/syze-koleksion',
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
         offset : $scope.offsetK
       }
     }).success(function(response) {
       $scope.$broadcast('scroll.infiniteScrollComplete');
      response.forEach(function(item){
        $scope.syzeK.push(item);
        console.log('tttttt');
      });
       console.log(response);
       //gets another limt data
       $scope.offsetK += 20;
     });

  };
  /*$scope.syze = Syze.query(function() {
    $ionicLoading.hide();
  });*/

})

.controller('lenteCtrl', function($scope, Syze, $location, $state, $ionicLoading, $ionicPopup, $http) {
      
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }

  $scope.data = {};
  /*$ionicLoading.show({
    template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Loading...'
  });*/
  //offset to get data and implement infinite scroll
  $scope.limit  = 20; //gets 20 objects the first time
  $scope.offsetL = 0;
  $scope.syzeL   = [];
  $scope.loadNextProducts = function(){
    console.log($scope.data.search);
    console.log('t');
    $ionicLoading.hide();
  /*  var params = [];
    $http.get('https://maxoptica.herokuapp.com/kreu',{limit:$scope.limit,offset:$scope.offset})
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
       url: 'https://maxoptica.herokuapp.com/syze-lente',
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
         offset : $scope.offsetL
       }
     }).success(function(response) {
       $scope.$broadcast('scroll.infiniteScrollComplete');
      response.forEach(function(item){
        $scope.syzeL.push(item);
        console.log('tttttt');
      });
       console.log(response);
       //gets another limt data
       $scope.offsetL += 20;
     });

  };
  /*$scope.syze = Syze.query(function() {
    $ionicLoading.hide();
  });*/

})

//firt login controller. switchted to ionicPopup login.....see menuCtrl login
.controller('loginCtrl', function($scope, $resource, $http, $ionicPopup, $location, $state, ngFB, $timeout, $ionicLoading) {
      
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }


  if (window.localStorage.token && window.localStorage.token !== undefined) {
    console.log('User already logged in 2');
    // $state.go('app.kreu');
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
        template: '<p align="center">Perdoruesi nuk eshte i regjistruar ose emaili dhe fjalekalimi jane vendosur gabim</p>'
      });
    };
    $scope.showAlertLoginSuccess = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Login Success',
        template: '<p align="center">Logini perfundoi me sukses</p>'
      });
    };


    $scope.prepareStr = function(str) {
      return str.substring(0, 3).split("").reverse().join("").toUpperCase();
    };

    $scope.login = function() {
      if ($scope.data.email === "" || $scope.data.fjalekalimi === "" ||
        $scope.data.email === undefined || $scope.data.fjalekalimi === undefined) {
        $scope.showAlert();
        console.log('jam');
      } else {
        $ionicLoading.show({
            template: 'Loading',
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
          });
        console.log('nuk jam');
        // var base64Str = 'UG93ZXJlZCBieSA6IFRhcnphbiBQcmVuZ2E=';
        // var d = new Date();
        // var token = $scope.prepareStr($scope.data.username) + base64Str + $scope.prepareStr($scope.data.password) + d.getTime();
        // window.localStorage.setItem('token', token);
        // console.log(btoa($scope.data.username) + "TzAN");
        // window.localStorage.setItem('username', btoa($scope.data.username) + "TzAN");
        $http({
          method: 'POST',
          //url: 'https://tarzantest.herokuapp.com/login',
          url: 'https://maxoptica.herokuapp.com/login-real',
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
            email: $scope.data.email,
            fjalekalimi: $scope.data.fjalekalimi
          }
        }).success(function(response) {
          $ionicLoading.hide();
          $scope.responseLoggedIn = response[0];
          console.log(response);

          if ($scope.responseLoggedIn.login==1) {
            console.log('sukses');
            $scope.loggedin = true;


            
            // window.location = "#/app/kreu";

            $scope.responseLoggedIn=JSON.stringify($scope.responseLoggedIn);
            window.localStorage.setItem('loggedInSakte', $scope.responseLoggedIn);

            window.localStorage.setItem('loggedInSakte2', $scope.loggedin);

            $scope.showAlertLoginSuccess();

            $timeout(function() {
                window.location = "#/app/kreu";
              }, 400);  



          }else if ($scope.responseLoggedIn.login==0) {
            console.log('jo sukses');
            $scope.showAlertNotRegistered();
            // $scope.showAlertEmailEkziston();
          }else{
            console.log('gabim tjeter');
          }          
          // console.log($scope.response.login);
          // if ($scope.response.login === 1) {
          //   console.log('Logged in...');
          //   $scope.loggedin = true;
          //   console.log($scope.response.id);
          //   window.localStorage.setItem('id', $scope.response.id);
          //   $state.go('app.kreu', {}, {
          //     reload: true
          //   });
          // } else if ($scope.response.login === 0) {
          //   $scope.showAlertPass();
          // } else {
          //   $scope.showAlertNotRegistered();
          // }
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

.controller('forgotPasswordCtrl', function($scope, $resource, $http, $ionicPopup, $location, $state, ngFB, $timeout, $ionicLoading) {
      
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }



    $scope.dataF = {};
    $scope.showAlert = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Login Failed',
        template: '<p align="center">Ju lutemi plotesoni te dhenat!</p>'
      });
    };

    $scope.showAlertEmail = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Rikthimi deshtoi',
        template: '<p align="center">Ju lutemi vendosni nje email te vlefshem</p>'
      });
    };

    $scope.showAlertNotEmail = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Rikthimi deshtoi',
        template: '<p align="center">Llogaria me kete email nuk ekziston</p>'
      });
    };
    $scope.showAlertForgotPasswordSuccess = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Rikthimi perfundoi me sukses',
        template: '<p align="center">Ju lutemi kontrolloni emailin tuaj per fjalekalimin!</p>'
      });
    };


    $scope.prepareStr = function(str) {
      return str.substring(0, 3).split("").reverse().join("").toUpperCase();
    };

    $scope.validateEmail= function (email) {
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
      }

    $scope.forgotPassword = function() {
      var sakteEmail=$scope.validateEmail($scope.dataF.email);
      if ($scope.dataF.email === "" || $scope.dataF.email === undefined ) {
        $scope.showAlert();
        console.log('jam forgot password');
      } else if(!sakteEmail){
        $scope.showAlertEmail();
      } else {
        $ionicLoading.show({
            template: 'Loading',
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
          });
        console.log('nuk jam forgot password');
        // var base64Str = 'UG93ZXJlZCBieSA6IFRhcnphbiBQcmVuZ2E=';
        // var d = new Date();
        // var token = $scope.prepareStr($scope.data.username) + base64Str + $scope.prepareStr($scope.data.password) + d.getTime();
        // window.localStorage.setItem('token', token);
        // console.log(btoa($scope.data.username) + "TzAN");
        // window.localStorage.setItem('username', btoa($scope.data.username) + "TzAN");
        $http({
          method: 'POST',
          //url: 'https://tarzantest.herokuapp.com/login',
          url: 'https://maxoptica.herokuapp.com/forgot-password',
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
            email: $scope.dataF.email
          }
        }).success(function(response) {
          $ionicLoading.hide();
          // $scope.responseLoggedIn = response[0];
          console.log(response);
          if (response.forgot==1) {
           $scope.showAlertForgotPasswordSuccess();

          }else if (response.forgot==0) {
            $scope.showAlertNotEmail();

          }       

        });
      }
    };



})


.controller('regjistrohuCtrl', function($scope, $resource, $http, $ionicPopup, $location, $state, ngFB, $ionicLoading) {
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }


      if (window.localStorage.token && window.localStorage.token !== undefined) {
        console.log('User already logged in');
        // $state.go('app.kreu');
        alert('User already logged in register');
      } else {
        $scope.dataR = {};
        $scope.showAlert = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Login Failed',
            template: '<p align="center">Ju lutemi plotesoni te gjitha te dhenat!</p>'
          });
        };

        $scope.showAlertPassShkurter = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Regjistrimi Deshtoi',
            template: '<p align="center">Passwordi juaj eshte shume i shkurter! (Min: 6 karaktere)</p>'
          });
        };
        $scope.showAlertPassDontMatch = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Regjistrimi Deshtoi',
            template: '<p align="center">Fjalekalimi dhe konfirmimi i fjalekalimit nuk jane te njejte</p>'
          });
        };
        $scope.showAlertEmail = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Regjistrimi Deshtoi',
            template: '<p align="center">Ju lutem vendosni nje email te sakte!</p>'
          });
        };

        $scope.showAlertNotRegistered = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Login Failed',
            template: '<p align="center">Perdoruesi nuk eshte i regjistruar!</p>'
          });
        };
        $scope.showAlertRegjistrimSukses = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Regjistrimi Perfundoi',
            template: '<p align="center">Regjistrimi Perfundoi Me Sukses, Ju Lutem beni login</p>'
          });
        };
        $scope.showAlertEmailEkziston = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Regjistrimi Deshtoi',
            template: '<p align="center">Ky email ekziston njehere! Ju lutem perdorni nje tjeter.</p>'
          });
        };

        $scope.prepareStr = function(str) {
          return str.substring(0, 3).split("").reverse().join("").toUpperCase();
        };

       $scope.validateEmail= function (email) {
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
      }

      $scope.regjistrohu = function() {
        var sakteEmail=$scope.validateEmail($scope.dataR.email);

      if ($scope.dataR.emer === "" || $scope.dataR.mbiemer === "" ||
        $scope.dataR.emer === undefined || $scope.dataR.mbiemer === undefined || 
        $scope.dataR.tel === "" || $scope.dataR.tel === undefined) {
        $scope.showAlert();
      }else if(!sakteEmail){
        console.log("Invalid Email");
        $scope.showAlertEmail();

      }else if($scope.dataR.fjalekalimi === "" || $scope.dataR.fjalekalimi === undefined){
        console.log("Password too short");
        $scope.showAlertPassShkurter();

      }else if($scope.dataR.fjalekalimi!= $scope.dataR.fjalekalimiKonfirmuar){
        console.log("Password don't match");
        $scope.showAlertPassDontMatch();

      }else {
        console.log($scope.dataR);
          // Setup the loader
          $ionicLoading.show({
            template: 'Loading',
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
          });
        // var base64Str = 'UG93ZXJlZCBieSA6IFRhcnphbiBQcmVuZ2E=';
        var d = new Date().toISOString().slice(0, 19).replace('T', ' ');
        console.log(d);
        // var token = $scope.prepareStr($scope.data.username) + base64Str + $scope.prepareStr($scope.data.password) + d.getTime();
        // window.localStorage.setItem('token', token);
        // console.log(btoa($scope.data.username) + "TzAN");
        // window.localStorage.setItem('username', btoa($scope.data.username) + "TzAN");
        $http({
          method: 'POST',
          //url: 'https://tarzantest.herokuapp.com/login',
          url: 'https://maxoptica.herokuapp.com/register',
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
            emer: $scope.dataR.emer,
            mbiemer: $scope.dataR.mbiemer,
            tel: $scope.dataR.tel,
            email: $scope.dataR.email,
            fjalekalimi: $scope.dataR.fjalekalimi,
            date: d
          }
        }).success(function(response) {
          $ionicLoading.hide();
          console.log('Pergjigja ');
          console.log(response);
          // var pergjigje=JSON.parse(response);
          if (response.regjistrimi==1) {
            console.log('sukses');
            $scope.showAlertRegjistrimSukses();
            window.location = "#/app/login";
          }else if (response.regjistrimi==0) {
            console.log('jo sukses');
            $scope.showAlertEmailEkziston();
          }else{
            console.log('gabim tjeter');
          }
        });
      }
    }
  }



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
.controller('geoCtrl', function($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform, $ionicPopup) {
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }


  $scope.adresses = [{
    "Dyqani": "Max Optika QTU",
    "Adresa": "Autostrada Tirane - Durres, Km 6, Kashar 1001, Tirana, Albania",
    "Email": "qtu@maxoptika.al",
    "Cel": '694000607',
    "Orari": "09:00-21:00",
    lat:41.353877,
    long: 19.749451
  }, {
    "Dyqani": "Max Optika Citypark",
    "Adresa": "Qendra Tregetare Citypark, Tirane",
    "Email": "citypark@maxoptika.al",
    "Cel": '694000608',
    "Orari": "10:00-21:00",
    lat:41.368473,
    long: 19.686994
  }, {
    "Dyqani": "Max Optika Myslym Shyri",
    "Adresa": "Rruga Myslym Shyri , pallati 55/1",
    "Email": "m.shyri@maxoptika.al",
    "Cel": '694000613',
    "Orari": "09:00-21:00",
    lat:41.324651,
    long: 19.811193
  }, {
    "Dyqani": "Max Optika 21 Dhjetori",
    "Adresa": "Rruga Muhamet Gjollesha, Tirane",
    "Email": "21dhjetori@maxoptika.al",
    "Cel": '689092405',
    "Orari": "09:00-21:00",
    lat:41.323523,
    long: 19.804970
  }, {
    "Dyqani": "Max Optika Sheshi Wilson",
    "Adresa": "Rruga Sami Frasheri, Njesia Bashkiake nr 5, tek rrethrrotullimi i Sheshit Wilson",
    "Email": "sheshi.wilson@maxoptika.al",
    "Cel": '694045454',
    "Orari": "09:00-21:00",
    lat:41.320154,
    long: 19.823035
  }, {
    "Dyqani": "Max Optika Medrese",
    "Adresa": "Rruga Bajram Curri, pallati nr:312/12 prane Medreses.",
    "Email": "medrese@maxoptika.al",
    "Cel": '694045452',
    "Orari": "09:00-21:00",
    lat:41.337900,
    long: 19.825765
  }, {
    "Dyqani": "Max Optika Durres",
    "Adresa": "Lagjia nr.1 Rruga Tregtare,mbrapa Bashkise,Durres",
    "Email": "durres@maxoptika.al",
    "Cel": '694000609',
    "Orari": "09:00-20:00",
    lat:41.312611,
    long: 19.445931
  }, {
    "Dyqani": "Max Optika Lushnje",
    "Adresa": "Bulevardi kryesor, perballe Bashkise, Lushnje",
    "Email": "lushnje@maxoptika.al",
    "Cel": '694045700',
    "Orari": "09:00-21:00",
    lat:40.939674,
    long: 19.705657
  }, {
    "Dyqani": "Max Optika Vlore",
    "Adresa": "Bulevardi Vlore-Skele, perballe pallatit te sportit, Vlore",
    "Email": "vlore@maxoptika.al",
    "Cel": '696048849',
    "Orari": "09:00-21:00",
    lat:40.464000,
    long: 19.481678
  }, {
    "Dyqani": "Max Optika Fier",
    "Adresa": "Lagjia 11 Janari, Rruga Ramiz Aranitasi, Fier",
    "Email": "fier@maxoptika .al",
    "Cel": '694000614',
    "Orari": "09:00-21:00",
    lat:40.725935,
    long: 19.559687
  }, {
    "Dyqani": "Max Optika Sarande",
    "Adresa": "Rruga Onhezmi, Sarande",
    "Email": "maxoptika.sarande@gmail.com",
    "Cel": '688034749',
    "Orari": "09:00-21:00",
    lat:39.874918,
    long: 20.005693
  }, {
    "Dyqani": "Max Optika Elbasan",
    "Adresa": "Rruga Rinia, Elbasan",
    "Email": "maxoptika.elbasan@gmail.com",
    "Cel": '694057812',
    "Orari": "09:00-21:00",
    lat:41.122471,
    long:  20.078612
  }, {
    "Dyqani": "Max Optika Korce",
    "Adresa": "Lagjja 9, Rruga Midhi Kostani, prane Bankes Kombetare, Korce",
    "Email": "korce@maxoptika.al",
    "Cel": '696098866',
    "Orari": "09:00-20:00",
    lat:40.616302,
    long: 20.776756
  }, {
    "Dyqani": "Max Optika Pogradec",
    "Adresa": "Rruga Refik Collaku,perballe hotel Enkelana, Pogradec",
    "Email": "maxoptika.pogradec@gmail.com",
    "Cel": '694045453',
    "Orari": "09:00-20:00",
    lat:40.900274,
    long: 20.657215
  }, {
    "Dyqani": "Max Optika Kruje",
    "Adresa": "Lagjja Sesere, qender Kruje",
    "Email": "maxoptika.kruje@gmail.com",
    "Cel": '694000611',
    "Orari": "09:00-21:00",
    lat:41.511444,
    long: 19.790840
  }, {
    "Dyqani": "Max Optika Lezhe",
    "Adresa": "Qendra Tregetare Net Center,Lezhe",
    "Email": "lezhe@maxoptika.al",
    "Cel": '689092403',
    "Orari": "09:00-21:00",
    lat:41.778749,
    long: 19.649009
  }, {
    "Dyqani": "Max Optika Shkoder",
    "Adresa": "Lagjja Qemal Stafa, Rruga 13 Dhjetori, Shkoder",
    "Email": "shkoder@maxoptika.al",
    "Cel": '696048850',
    "Orari": "09:00-21:00",
    lat:42.072124,
    long:  19.515109
  }, {
    "Dyqani": "Max Optika Prishtine",
    "Adresa": "Rruga Bulevardi I Deshmoreve, prane Aleances, Prishtine",
    "Email": "prishtine@maxoptika.al",
    "Cel": '38649604623',
    "Orari": "09:00-21:00",
    lat:42.656545,
    long: 21.168937
  }, {
    "Dyqani": "Max Optika Minimax",
    "Adresa": "Qendra tregtare Minimax, Prishtine",
    "Email": "prishtine@maxoptika.al",
    "Cel": '38649604623',
    "Orari": "09:00-21:00",
    lat:42.660741,
    long: 21.141244
  }];
  $ionicPlatform.ready(function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Duke gjetur vendodhjen!'
    });

    var posOptions = {
      enableHighAccuracy: true,
      timeout: 4000,
      maximumAge: 0
    };
    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      return d;
    }

    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }

    $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
      var addToJson = [];
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      console.log("lat eshte "+lat);
      console.log("long eshte "+long);
      // lat =41.322472;
      // long =19.450777;
      // lat-null;
      // long=null;

      for (var i = 0; i < $scope.adresses.length; i++) {
        var distanca=getDistanceFromLatLonInKm(lat,long,$scope.adresses[i].lat,$scope.adresses[i].long);
        $scope.adresses[i].distanca=distanca;
        
      }
      $scope.adresses.sort(function(a, b) {
          return parseFloat(a.distanca) - parseFloat(b.distanca);
      });
      console.log($scope.adresses);
      $ionicLoading.show({
        template: 'Dyqanet jane renditur sipas distances nga pozicioni juaj!',
        duration: 1500
      });
      // $ionicPopup.alert({
      //       title: 'Rezervo Takim',
      //       template: '<p align="center">Rezervimi u krye me sukses!</p>'
      //     });


     }, function (err) {
      $ionicLoading.hide();
      alert("Ju lutem aktivizoni location");
    });

    
  });
})

.controller('menuCtrl', function($scope, $resource, $http, $ionicPopup, $location, $state, ngFB, $ionicSideMenuDelegate) {

  // Check whether is open the side bar or not and does sth everytime with it 
  $scope.$watch(function () {
    return $ionicSideMenuDelegate.getOpenRatio();
  },
    function (ratio) {
    if (ratio == 1){
     
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
       if (numriShport[0]=="") {
        // console.log('po jam bosh');
        $scope.shportlistItemsLength=null;
       }else {
         $scope.shportlistItemsLength=numriShport.length;
       }

      }
    });

  
  // console.log($scope.wishlistItems);
  //$scope.loggedin = false;
  console.log('called');
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
    console.log('logout nga menu');
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

.controller('wishlistCtrl', function($scope, $http, $stateParams, $rootScope, $timeout) {
      // Check the number of elements in the cart and wishlist
      $scope.pojamboshw=false;
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
        $scope.pojamboshw=true;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
          
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }


  $scope.response = {};

  $scope.removeFromWishlist = function(item) {
    var wsh = window.localStorage.wishlist.split(',');
    var i = wsh.indexOf(item.target.id);
    wsh.splice(i, 1);
    window.localStorage.wishlist = wsh;
    item.target.hidden = true;
    item.target.parentElement.parentElement.parentElement.remove();

    var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
        $scope.pojamboshw=true;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

  };

  $scope.getWishlist = function() {
    var data = window.localStorage.getItem('wishlist') || "";
    if ($scope.pojamboshw==false) {
      $scope.pojambosh2w=true;

    }
    // console.log(typeof(data));
    // var varg = [];
    // var res = data.split(",");
    // varg.push(res);
    
    // console.log(res[0]);
    // var wishi = JSON.stringify(data.split(','));
    // console.log(typeof(wishi));
    // for (var i = 0; i<data.length; i ++) {
    //   console.log(data[i]+" "+i);
    // };
    // console.log(wishi);
    // console.log("id :"+data);
    if (data !== "") {
      $http({
        method: 'POST',
        url: 'https://maxoptica.herokuapp.com/wishlist',
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
        $scope.pojambosh2w=false;
        $scope.response = response;
        


        for (var i in $scope.response) {
          // console.log($scope.response[i].name);
        }
      });
    };
  }
  $scope.getWishlist();

  // $scope.wishbosh=false;
  // $scope.wishbosh2=true;


  // // Hide the scroll and display message if wishlist is empty
  // $timeout(function() {
  // if (!$scope.response.length) {
  //   console.log($scope.response.length+"mnb");
  //   $scope.wishbosh2=false;
  //   $scope.wishbosh=true;


  //   }
  // }, 3000);  

  


  })


.controller('shportaCtrl', function($scope, $http, $stateParams, $rootScope, $timeout, $ionicModal,PaypalService, $cordovaGeolocation, $ionicLoading, $ionicPlatform) {

      $scope.loggedInSakte=window.localStorage.getItem('loggedInSakte');
      $scope.loggedInSakte=JSON.parse($scope.loggedInSakte);
      console.log($scope.loggedInSakte);
      $scope.loggedInSakte2=window.localStorage.getItem('loggedInSakte2');


    // Geolocation Script Start

    $scope.gjejVendodhjen=function(){

    $scope.adresses = [{
    "Dyqani": "Max Optika QTU",
    "Adresa": "Autostrada Tirane - Durres, Km 6, Kashar 1001, Tirana, Albania",
    "Email": "qtu@maxoptika.al",
    "Cel": '694000607',
    "Orari": "09:00-21:00",
    lat:41.353877,
    long: 19.749451
  }, {
    "Dyqani": "Max Optika Citypark",
    "Adresa": "Qendra Tregetare Citypark, Tirane",
    "Email": "citypark@maxoptika.al",
    "Cel": '694000608',
    "Orari": "10:00-21:00",
    lat:41.368473,
    long: 19.686994
  }, {
    "Dyqani": "Max Optika Myslym Shyri",
    "Adresa": "Rruga Myslym Shyri , pallati 55/1",
    "Email": "m.shyri@maxoptika.al",
    "Cel": '694000613',
    "Orari": "09:00-21:00",
    lat:41.324651,
    long: 19.811193
  }, {
    "Dyqani": "Max Optika 21 Dhjetori",
    "Adresa": "Rruga Muhamet Gjollesha, Tirane",
    "Email": "21dhjetori@maxoptika.al",
    "Cel": '689092405',
    "Orari": "09:00-21:00",
    lat:41.323523,
    long: 19.804970
  }, {
    "Dyqani": "Max Optika Sheshi Wilson",
    "Adresa": "Rruga Sami Frasheri, Njesia Bashkiake nr 5, tek rrethrrotullimi i Sheshit Wilson",
    "Email": "sheshi.wilson@maxoptika.al",
    "Cel": '694045454',
    "Orari": "09:00-21:00",
    lat:41.320154,
    long: 19.823035
  }, {
    "Dyqani": "Max Optika Medrese",
    "Adresa": "Rruga Bajram Curri, pallati nr:312/12 prane Medreses.",
    "Email": "medrese@maxoptika.al",
    "Cel": '694045452',
    "Orari": "09:00-21:00",
    lat:41.337900,
    long: 19.825765
  }, {
    "Dyqani": "Max Optika Durres",
    "Adresa": "Lagjia nr.1 Rruga Tregtare,mbrapa Bashkise,Durres",
    "Email": "durres@maxoptika.al",
    "Cel": '694000609',
    "Orari": "09:00-20:00",
    lat:41.312611,
    long: 19.445931
  }, {
    "Dyqani": "Max Optika Lushnje",
    "Adresa": "Bulevardi kryesor, perballe Bashkise, Lushnje",
    "Email": "lushnje@maxoptika.al",
    "Cel": '694045700',
    "Orari": "09:00-21:00",
    lat:40.939674,
    long: 19.705657
  }, {
    "Dyqani": "Max Optika Vlore",
    "Adresa": "Bulevardi Vlore-Skele, perballe pallatit te sportit, Vlore",
    "Email": "vlore@maxoptika.al",
    "Cel": '696048849',
    "Orari": "09:00-21:00",
    lat:40.464000,
    long: 19.481678
  }, {
    "Dyqani": "Max Optika Fier",
    "Adresa": "Lagjia 11 Janari, Rruga Ramiz Aranitasi, Fier",
    "Email": "fier@maxoptika .al",
    "Cel": '694000614',
    "Orari": "09:00-21:00",
    lat:40.725935,
    long: 19.559687
  }, {
    "Dyqani": "Max Optika Sarande",
    "Adresa": "Rruga Onhezmi, Sarande",
    "Email": "maxoptika.sarande@gmail.com",
    "Cel": '688034749',
    "Orari": "09:00-21:00",
    lat:39.874918,
    long: 20.005693
  }, {
    "Dyqani": "Max Optika Elbasan",
    "Adresa": "Rruga Rinia, Elbasan",
    "Email": "maxoptika.elbasan@gmail.com",
    "Cel": '694057812',
    "Orari": "09:00-21:00",
    lat:41.122471,
    long:  20.078612
  }, {
    "Dyqani": "Max Optika Korce",
    "Adresa": "Lagjja 9, Rruga Midhi Kostani, prane Bankes Kombetare, Korce",
    "Email": "korce@maxoptika.al",
    "Cel": '696098866',
    "Orari": "09:00-20:00",
    lat:40.616302,
    long: 20.776756
  }, {
    "Dyqani": "Max Optika Pogradec",
    "Adresa": "Rruga Refik Collaku,perballe hotel Enkelana, Pogradec",
    "Email": "maxoptika.pogradec@gmail.com",
    "Cel": '694045453',
    "Orari": "09:00-20:00",
    lat:40.900274,
    long: 20.657215
  }, {
    "Dyqani": "Max Optika Kruje",
    "Adresa": "Lagjja Sesere, qender Kruje",
    "Email": "maxoptika.kruje@gmail.com",
    "Cel": '694000611',
    "Orari": "09:00-21:00",
    lat:41.511444,
    long: 19.790840
  }, {
    "Dyqani": "Max Optika Lezhe",
    "Adresa": "Qendra Tregetare Net Center,Lezhe",
    "Email": "lezhe@maxoptika.al",
    "Cel": '689092403',
    "Orari": "09:00-21:00",
    lat:41.778749,
    long: 19.649009
  }, {
    "Dyqani": "Max Optika Shkoder",
    "Adresa": "Lagjja Qemal Stafa, Rruga 13 Dhjetori, Shkoder",
    "Email": "shkoder@maxoptika.al",
    "Cel": '696048850',
    "Orari": "09:00-21:00",
    lat:42.072124,
    long:  19.515109
  }, {
    "Dyqani": "Max Optika Prishtine",
    "Adresa": "Rruga Bulevardi I Deshmoreve, prane Aleances, Prishtine",
    "Email": "prishtine@maxoptika.al",
    "Cel": '38649604623',
    "Orari": "09:00-21:00",
    lat:42.656545,
    long: 21.168937
  }, {
    "Dyqani": "Max Optika Minimax",
    "Adresa": "Qendra tregtare Minimax, Prishtine",
    "Email": "prishtine@maxoptika.al",
    "Cel": '38649604623',
    "Orari": "09:00-21:00",
    lat:42.660741,
    long: 21.141244
  }];
  // $ionicPlatform.ready(function() {
  //   $ionicLoading.show({
  //     template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Duke gjetur vendodhjen!'
  //   });

    var posOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    };
    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      return d;
    }

    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }

    $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
      var addToJson = [];
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      // console.log("lat eshte "+lat);
      // console.log("long eshte "+long);
      // Keto jane koordinata statike te durresit, ne telefon keto duhet te hiqen dhe te lihen ato me siper
      // lat =41.322472;
      // long =19.450777;
      // lat-null;
      // long=null;

      for (var i = 0; i < $scope.adresses.length; i++) {
        var distanca=getDistanceFromLatLonInKm(lat,long,$scope.adresses[i].lat,$scope.adresses[i].long);
        $scope.adresses[i].distanca=distanca;
        
      }
      $scope.adresses.sort(function(a, b) {
          return parseFloat(a.distanca) - parseFloat(b.distanca);
      });
      $scope.emailiDyqAfer=$scope.adresses[0].Email
      console.log(typeof($scope.emailiDyqAfer));
      // $ionicLoading.show({
      //   template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Dyqani me afer jush u gjet!',
      //   duration: 1500
      // });


    }, function (err) {
      $scope.emailiDyqAfer="agjini@dea.com.al";
      $ionicLoading.hide();
      alert("Ju lutem aktivizoni location");
    });

    
  // });
 
  }



      // Geolocation Script Ends



      $scope.remBut=false;

      $scope.example={};
      
      

      $scope.minusElement=function (item, index, cmimi, monedha){
        
        
        $scope.example[item]=Number($scope.example[item])-1;
        if ($scope.example[item]<=0 ) {
        // not allowed to go below 1
        $scope.example[item]=1;
        }else if ($scope.example[item]>=1){
           var total = $scope.response.reduce(function (r, a) {
                return r + Number(a.cmimi) * Number($scope.example[a.kodartikulli]);
            }, 0);

          console.log( $scope.example); 
          console.log( $scope.example);
           $scope.checkoutTotal=Number(total).toFixed(2);
        }



      }

      $scope.plusElement=function (item, index, cmimi, monedha){
        // #TODO konvertimi i cmimit nga EUR, LEK ne monedhen default
        if (monedha=="LEK") {
          var cmimiLek=cmimi*1.38;
          console.log('jam lek');
          console.log(cmimiLek);
        }

        $scope.example[item]=Number($scope.example[item])+1;

        if ($scope.example[item]<=0 ) {
        // $scope.checkoutTotal=$scope.checkoutTotal*Number($scope.example[item]);
        // do nothing
        $scope.example[item]=1;
        }else if ($scope.example[item]>=1){


          var total = $scope.response.reduce(function (r, a) {
                return r + Number(a.cmimi) * Number($scope.example[a.kodartikulli]);
            }, 0);

          console.log( $scope.example); 
           $scope.checkoutTotal=Number(total).toFixed(2);

        }



      }

      // Check the number of elements in the cart and wishlist
      $scope.pojambosh=false;
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
        
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      $scope.shportaElem= shportlistItems;
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
          $scope.pojambosh=true;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }


  $scope.response = {};
  // localStorage.removeItem('shporta');

  $scope.removeFromShporta = function(item) {
    
    var wsh = window.localStorage.shporta.split(',');
    var i = wsh.indexOf(item.target.id);
    console.log("eshte"+item.target.id);
    wsh.splice(i, 1);
    window.localStorage.shporta = wsh;
    
    // item.target.parent().parent().remove();
    // child.parentNode.removeParent(item.target.parentElement);
    // angular.element(item.target).parent().remove();
    item.target.hidden = true;
    item.target.parentElement.remove();




      console.log(item.target.parentElement.id);
      console.log($scope.response);
      console.log("pos");
       var pos = $scope.response.map(function(e) { return e.kodartikulli; }).indexOf(item.target.parentElement.id);
       console.log(pos);
       $scope.checkoutTotal=$scope.checkoutTotal-($scope.response[pos].cmimi*$scope.example[item.target.parentElement.id]);
       $scope.checkoutTotal=$scope.checkoutTotal.toFixed(2);
       // console.log(item.target.parentElement.parentElement); 
       // console.log($scope.example[item.target.parentElement.id])


      // This is the code for removing an item without reloading but it also removes the "remove button from it's child".
       delete $scope.example[item.target.parentElement.id];
       // $scope.example[item.target.parentElement.id]=undefined;
       console.log($scope.response);

        for( i=$scope.response.length-1; i>=0; i--) {
        // for( i=0; i>$scope.response.length; i++) {
          if( $scope.response[i].kodartikulli == item.target.parentElement.id){
            $scope.response.splice(i,1);
            // $scope.response[i]=null;
            $scope.remBut=true;
          }
      }
      console.log($scope.response);


      var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
       if (numriShport[0]=="") {
        // console.log('po jam bosh');
        $scope.shportlistItemsLength=null;
        $scope.wishbosh3=false;
        $scope.wishbosh=true;
        // $scope.wishbosh2=false;
        $scope.pojambosh=true;
       }else {
         $scope.shportlistItemsLength=numriShport.length;
         // window.location.reload();
       }

       // $timeout(function() {
       //     var pos = $scope.response.map(function(e) { return e.kodartikulli; }).indexOf(item.target.parentElement.id);
       //     $scope.checkoutTotal=$scope.checkoutTotal-($scope.response[pos].cmimi*$scope.example[item.target.parentElement.id]);
       //     $scope.checkoutTotal=$scope.checkoutTotal.toFixed(2);
       //     // console.log(item.target.parentElement.parentElement); 
       //     // console.log($scope.example[item.target.parentElement.id])
       //     delete $scope.example[item.target.parentElement.id];
       //     // $scope.example[item.target.parentElement.id]=undefined;
       //     for( i=$scope.response.length-1; i>=0; i--) {
       //        if( $scope.response[i].kodartikulli == item.target.parentElement.id) $scope.response.splice(i,1);
       //    }


       //    }, 1000); 
       
  };

  $scope.getShporta = function() {
    var data = window.localStorage.getItem('shporta') || "";
    if ($scope.pojambosh==false) {
      $scope.pojambosh2=true;

    }
    // console.log(typeof(data));
    // var varg = [];
    // var res = data.split(",");
    // varg.push(res);
    
    // console.log(res[0]);
    // var wishi = JSON.stringify(data.split(','));
    // console.log(typeof(wishi));
    // for (var i = 0; i<data.length; i ++) {
    //   console.log(data[i]+" "+i);
    // };
    // console.log(wishi);
    // console.log("id :"+data);
    if (data !== "") {
      $http({
        method: 'POST',
        url: 'https://maxoptica.herokuapp.com/wishlist',
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
        $scope.pojambosh2=false;
        console.log(response);
        $scope.response = response;
        // console.log($scope.response[0]);
        $scope.checkoutTotal=0;
        $scope.wishbosh3=true;
        for (var i in $scope.response) {
          // console.log($scope.response[i].name);
          $scope.checkoutTotal=Number($scope.checkoutTotal)+Number($scope.response[i].cmimi);
          $scope.checkoutTotal=Number($scope.checkoutTotal).toFixed(2);


        }
        window.localStorage.setItem('cmimiFillestar', $scope.checkoutTotal);

      });

    };
  }
  $scope.getShporta();


//   $scope.wishbosh=false;
//   $scope.wishbosh2=true;
//   $scope.wishbosh3=false;

// $timeout(function() {
//   if (!$scope.response.length) {
//   $scope.wishbosh2=false;
//   $scope.wishbosh=true;
//   console.log('blabla');
  

//   }
// }, 3000); 

$scope.vazhdoPorosine= function(allCmimi){
  $scope.gjejVendodhjen();
  // alert(allCmimi);
    $ionicModal.fromTemplateUrl('templates/vazhdoPorosine.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });

      $scope.itens = [
        { title: "PayPal", checked: false },
        { title: "Pick Up On Store", checked: false },
        { title: "Pay On Delivery", checked: false },
    ];

    $scope.updateSelection = function(position, itens, title) {
        angular.forEach(itens, function(subscription, index) {
            if (position != index)
                subscription.checked = false;
                $scope.selected = title;
            }
        );
    }
    $scope.nextStep=function(){
      if ($scope.selected=="PayPal") {
        // alert("paypal");
        PaypalService.initPaymentUI().then(function () {
          PaypalService.makePayment(allCmimi, "Total").then(function (response) {

            alert("success"+JSON.stringify(response));

            }, function (error) {

            alert("Transaction Canceled");

              });
          })
      }else if ($scope.selected=="Pick Up On Store") {
        $scope.modal.hide();
        $ionicLoading.show({
              template: 'Loading...',
              delay:100
            });
        // $scope.gjejVendodhjen();
        // console.log($scope.emailiDyqAfer);
        // alert("Store");
        console.log($scope.emailiDyqAfer);
        // console.log($scope.loggedInSakte);
        var klientEmer=$scope.loggedInSakte.emer;
        var klientMbiemer=$scope.loggedInSakte.mbiemer;
        var klientTel=$scope.loggedInSakte.tel;
        var klientEmail=$scope.loggedInSakte.email;
        console.log(klientEmer+" "+klientMbiemer+" "+klientTel+" "+klientEmail);
        console.log($scope.shportaElem);


          $http({
          method: 'POST',
          //url: 'https://tarzantest.herokuapp.com/login',
          url: 'https://maxoptica.herokuapp.com/pick-up-store',
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
            emer: klientEmer,
            mbiemer: klientMbiemer,
            tel: klientTel,
            email: klientEmail,
            emailTo: $scope.emailiDyqAfer,
            shportaElem: $scope.shportaElem.toString()
          }
        }).success(function(response) {
          
          // $scope.responseLoggedIn = response[0];
          console.log(response);
          if (response.sentPickUp==1) {
           // $scope.showAlertForgotPasswordSuccess();
           $ionicLoading.show({
              template: 'Dyqani me afer jush u lajmerua per blerjen tuaj!',
              duration: 3000
            });

          }else if (response.sentPickUp==0) {
            // $scope.showAlertNotEmail();
            $ionicLoading.show({
              template: 'Lajmerimi i Dyqanit deshtoi,<br> ju lutemi provojeni perseri!',
              duration: 3000
            });

          }       

        });
        // console.log('')
        
      }else if ($scope.selected=="Pay On Delivery") {
        $scope.modal.hide();
        $ionicModal.fromTemplateUrl('templates/insertAdresa.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.modall = modal;
          $scope.modall.show();
        });
        // alert("Delivery");
        $scope.nextStepPayD=function(item){
          $scope.modall.hide();
          $ionicLoading.show({
              template: 'Loading...',
              delay:100
            });
          console.log(item);

        // console.log($scope.emailiDyqAfer);
        // console.log($scope.loggedInSakte);
        var klientAdresa=item;
        var klientEmer=$scope.loggedInSakte.emer;
        var klientMbiemer=$scope.loggedInSakte.mbiemer;
        var klientTel=$scope.loggedInSakte.tel;
        var klientEmail=$scope.loggedInSakte.email;
        console.log(klientEmer+" "+klientMbiemer+" "+klientTel+" "+klientEmail);
        console.log($scope.shportaElem);


          $http({
          method: 'POST',
          //url: 'https://tarzantest.herokuapp.com/login',
          url: 'https://maxoptica.herokuapp.com/pay-on-delivery',
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
            emer: klientEmer,
            mbiemer: klientMbiemer,
            tel: klientTel,
            email: klientEmail,
            emailTo: $scope.emailiDyqAfer,
            adresa: klientAdresa,
            shportaElem: $scope.shportaElem.toString()
          }
        }).success(function(response) {
          
          // $scope.responseLoggedIn = response[0];
          console.log(response);
          if (response.sentPayD==1) {
           // $scope.showAlertForgotPasswordSuccess();
           $ionicLoading.show({
              template: 'Qendra u lajmerua. Nje agjent i joni do te ju kontaktoje!',
              duration: 3000
            });

          }else if (response.sentPayD==0) {
            // $scope.showAlertNotEmail();
            $ionicLoading.show({
              template: 'Lajmerimi i qendres deshtoi,<br> ju lutemi provojeni perseri!',
              duration: 3000
            });

          }       

        });







        }
      }else if ($scope.selected==undefined) {
        alert("Please select one method of payment");
      }
      
    }



}


            

 


  })


.controller('searchCtrl', function($scope, $http, $stateParams, $rootScope, $timeout) {

      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }

      
      $scope.kerkimiFjala=window.localStorage.getItem('searchiKerk');
      // $scope.syzeSearch2=[];
      // $scope.syzeSearch2=window.localStorage.getItem('rezultateKerkimi');
      // $scope.syzeSearch=JSON.parse($scope.syzeSearch2);
      // console.log($scope.syzeSearch);
      // localStorage.removeItem('rezultateKerkimi');


          $scope.kerkimiFjala2=[];
          $scope.kerkimiFjala2=$scope.kerkimiFjala.split(/\s+/g);

          $scope.kerkobosh3=false;
          $scope.kerkobosh2=true;

          // Make an ajax call to database

          $http({
            method: 'POST',
            url: 'https://maxoptica.herokuapp.com/search-result',
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
              kerkimiFjala: $scope.kerkimiFjala2
            }
          }).success(function(response) {
            $scope.syzeSearch = response;
            console.log(response);
            if ($scope.syzeSearch.length==0) {
              $scope.kerkobosh2=false;
              $scope.kerkobosh3=true;
            }else{
              $scope.kerkobosh3=false;
            }
            for (var i in $scope.rezultatiKerkimi) {
              // console.log($scope.response[i].name);
            }
          });




        console.log($scope.kerkimiFjala2);


      





  $scope.response = {};
  // localStorage.removeItem('shporta');


  })






.controller('EmployeeReportsCtrl', function($scope, $stateParams, Employees) {
  console.log('reports');
  $scope.employee = Employees.get({
    employeeId: $stateParams.employeeId,
    data: 'reports'
  });
})

.controller('kartelaCtrl', function($scope, $stateParams, $http) {
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }

  $scope.data = {};
  $http({
    method: 'GET',
    url: 'https://maxoptica.herokuapp.com/kartela-klinike/?id=' + window.localStorage.id,
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

      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }

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
        url: 'https://maxoptica.herokuapp.com/takim',
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

      $scope.loggedInSakte=window.localStorage.getItem('loggedInSakte');
      $scope.loggedInSakte=JSON.parse($scope.loggedInSakte);
      console.log($scope.loggedInSakte);
      $scope.loggedInSakte2=window.localStorage.getItem('loggedInSakte2');


      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }


    $scope.loggedin = false;
    if (window.localStorage.token !== "empty" && window.localStorage.token !== undefined) {
      $scope.loggedin = true;
    }
  })
  .controller('profileCtrl', function($scope, $stateParams) {

    $scope.loggedInSakte=window.localStorage.getItem('loggedInSakte');
    $scope.loggedInSakte=JSON.parse($scope.loggedInSakte);
    console.log($scope.loggedInSakte);
    $scope.loggedInSakte2=window.localStorage.getItem('loggedInSakte2');

      
      $scope.logout = function() {
        console.log('Loogggout');
        window.localStorage.removeItem('loggedInSakte');
        window.localStorage.removeItem('loggedInSakte2');
        $scope.loggedInSakte2=false;
        // If user has loged in with facebook then log him/her out
        if (window.localStorage.getItem('fbl')) {
          window.localStorage.removeItem('fbl');
          //$scope.loggedin = true;
          ngFB.logout();
        }
        // window.location.reload(true);
      };


      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }
    console.log('Profile');
  })

  .controller('rrethNeshCtrl', function($scope, $stateParams) {
      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }
    console.log('Rreth Nesh');
  })


.controller('KamerCtrl', function($scope, $cordovaCamera, $ionicSideMenuDelegate, $ionicModal) {
  
  

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
            saveToPhotoAlbum: true,
            cameraDirection:1
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

    $scope.takeImage(); 

      // Check the number of elements in the cart and wishlist
      var numriWish=[];
      var wishlistItems=window.localStorage.getItem('wishlist');
      if (wishlistItems==null){
        $scope.wishlistItemsLength=null;
      }else {
      numriWish=wishlistItems.split(',');
      
       if (numriWish[0]=="") {
        // console.log('po jam bosh');
        $scope.wishlistItemsLength=null;
       }else {
         $scope.wishlistItemsLength=numriWish.length;
       }

       }


       var numriShport=[];
      var shportlistItems=window.localStorage.getItem('shporta');
      if (shportlistItems==null){
        $scope.shportlistItemsLength=null;
      }else {
      // console.log(shportlistItems);
      numriShport=shportlistItems.split(',');
      // console.log(numriShport);
      
         if (numriShport[0]=="") {
          // console.log('po jam bosh');
          $scope.shportlistItemsLength=null;
         }else {
           $scope.shportlistItemsLength=numriShport.length;
         }
       }

  $ionicModal.fromTemplateUrl('templates/udhezimeModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.modal.show();
  });

          

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
        $scope.images=['img/tryon/SD12203_front.png','img/tryon/SD12207_front.png','img/tryon/SD12224_front.png','img/tryon/SD12228_front.png'];

        $scope.shtoLart=function(fotoUrl){
          $scope.fotoUrl2=$scope.images[fotoUrl];
          console.log('test foto');

        };

        $scope.provoVirtualKodi=window.localStorage.getItem('provoVirtualKod');
        if ($scope.provoVirtualKodi!=null) {
          console.log('inside');
          // The real code
          // var imageFoto="img/tryon/"+$scope.provoVirtualKodi+"_front.png";
          var imageFoto="img/tryon/SD12203_front.png";
          console.log(imageFoto);
          // $scope.shtoLart(imageFoto);
          $scope.fotoUrl2=imageFoto;
          window.localStorage.removeItem('provoVirtualKod');
        }

});








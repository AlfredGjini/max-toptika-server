angular.module('directory.services', ['ngResource'])


.factory('Syze', function($resource) {
  //return $resource('https://tarzantest.herokuapp.com/kreu');
  return $resource('http://localhost:5000/kreu');
})

.factory('Test', function($resource) {
  //return $resource('https://tarzantest.herokuapp.com/test/:id');
  return $resource('http://localhost:5000/test/:id');
});




//test hit

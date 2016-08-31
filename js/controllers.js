angular.module('FYITips.controllers', [])

.controller('FYITipsCtrl', function($scope, $state, $ionicPlatform) {
  $scope.not_implemented = function() {
    alert('Not yet implemented :(');
  };
  $scope.addTip = function() {
    $state.go('tips').then(function() {
      console.log(this, arguments);
      $scope.$broadcast('addTipDialog');
    });
  };
})

.controller('HelpCtrl', function($scope, $ionicPlatform) {
  $scope.appVersion = '(Development)';
  $ionicPlatform.ready(function() {
    if (typeof(cordova) != 'undefined' && cordova.getAppVersion) {
      cordova.getAppVersion(function(version) {
        console.log('Got version: ', version);
        $scope.appVersion = version;
      });
    }
  });
  $scope.userAgent = navigator.userAgent;
})

.controller('TipsCtrl', function($scope, TipsProvider, $ionicPopup) {
  $scope.tips = TipsProvider.all();
  $scope.addTip = function() {
    $ionicPopup.prompt({
      title: 'Post a tip',
      template: 'FYI, ',
      //inputType: 'text',
      inputPlaceholder: ' Help a student, post your tip :)',
      okText: 'Post',
    }).then(function(tip) {
      if (!tip)
        return;
      navigator.geolocation.getCurrentPosition(function(pos) {
        console.log('Got pos', pos);
        var location = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          acc: pos.coords.accuracy
        };
        TipsProvider.add(tip, location);
        $scope.$apply();
      }, function(error) {
        console.log('Unable to get location: ' + error.message);
        TipsProvider.add(tip);
        $scope.$apply();
      });
    });
  };
  $scope.deleteTip = function(tip) {
    TipsProvider.del(tip);
  };
  $scope.clearRemoteTips = function() {
    console.log('Clearing tips from remote storage...');
    TipsProvider.reset();
    $ionicPopup.alert({title: 'Remote storage cleared', subTitle: 'Restart app to load defaults'});
  }
  $scope.$on('addTipDialog', $scope.addTip);
})

.controller('TipMapCtrl', function($scope, $stateParams, TipsProvider, $ionicLoading) {
  $scope.tip = TipsProvider.get($stateParams.tipId);
  
  $scope.mapCreated = function(map) {
    $scope.map = map;
  };

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };
})
;

angular.module('FYITips.services', ['ionic.utils'])

.factory('TipsProvider', function($window, $firebaseArray) {
  var sampleTips = [{
    post_dt: 1472603293440, // 2015-07-31T13:30:00-07:00
    text: 'Beat the dorm\'s 12 minutes clothes dryer limit by putting the card back in again. #laundryHacks',
    tags: ['', '', ''],
    location: {
      lat: 37.3928014,
      lon: -122.0728093,
    },
    user: {
      pic_url: null,
    },
    comments: 5,
    likes: 33,
  }, {
    post_dt: 1472603203440, // 2015-07-30T11:24:00-07:00
    text: 'Cheap $2 lunch @ 99 Ranch chinese supermarket food court. Hot & sour soup + a huge veggie pork bun. 2 min drive. Credit card accepted.',
    tags: ['', ''],
    location: {
      lat: 37.3922015,
      lon: -122.0796604,
    },
    user: {
      pic_url: null,
    },
    comments: 72,
    likes: 100,
  }, {
    post_dt: 1472603999999, // 2015-07-30T09:48:00-07:00
    text: 'The school header is actually 80 columns wide as a guide. #norminetteTips',
    tags: ['', '', ''],
    location: {
      lat: 37.3934912,
      lon: -122.0796285,
    },
    user: {
      pic_url: null,
    },
    comments: 72,
    likes: 100,
  }];
  // Firebase
  var fbaseTipsProvider = new $window.Firebase("https://fyi-tips.firebaseio.com/tips");
  tips = $firebaseArray(fbaseTipsProvider);

  // Load samples if empty
  fbaseTipsProvider.once('value', function(ss) {
    if (ss.val() !== null)  // Skip if not empty
      return;
    sampleTips.forEach(function(tip) {
      tips.$add(tip);
    });
  });

  return {
    all: function() {
      return tips;
    },
    get: function(id) {
      for (var i = 0; i < tips.length; i++) {
        if (tips[i].$id === id) {
          return tips[i];
        }
      }
      return null;
    },
    add: function(text, location) {
      var newTip = {
        post_dt: Firebase.ServerValue.TIMESTAMP,
        text: text,
        comments: 0,
        likes: 0,
      };
      if (location)
        newTip.location = location;
      tips.$add(newTip);
    },
    del: function(tipOrIndex) {
      tips.$remove(tipOrIndex);
    },
    reset: function() {
      fbaseTipsProvider.remove();
    },
  };
})

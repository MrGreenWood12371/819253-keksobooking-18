'use strict';
window.data = (function () {
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  function getPhotos() {
    return PHOTOS.slice(0, PHOTOS.length);
  }
  return {
    getNewRent: function (offerText, offerTypes, roomsNumber, guestsNumber, checkTime, offerFeatures) {
      var rents = [];

      for (var i = 1; i <= window.data.RENTS_NUMBER; i++) {
        rents.push({
          'author': {'avatar': 'img/avatars/user0' + i + '.png'},

          'offer': {
            'title': offerText[0],
            'address': '600, 350',
            'price': window.util.getRandomInt(1000, 10000),
            'type': offerTypes[window.util.getRandomValue(offerTypes)],
            'rooms': roomsNumber,
            'guests': guestsNumber,
            'checkin': checkTime[0],
            'checkout': checkTime[1],
            'features': offerFeatures[window.util.getRandomValue(offerFeatures)],
            'description': offerText[1],
            'photos': getPhotos()
          },
          'location': {
            'x': window.util.getRandomInt(window.data.X_LOCATION_START, window.data.X_LOCATION_END),
            'y': window.util.getRandomInt(window.data.Y_LOCATION_START, window.data.Y_LOCATION_END)
          }
        });
      }
      return rents;
    },
    RENTS_NUMBER: 8,
    X_LOCATION_START: 1,
    X_LOCATION_END: 1200,
    Y_LOCATION_START: 130,
    Y_LOCATION_END: 630,
    getOfferDescription: function (title, text) {
      return [title, text];
    }
  };
})();

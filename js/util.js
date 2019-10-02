'use strict';
window.util = (function () {
  return {
    ENTER_KEYCODE: 13,
    ESC_KEYCODE: 27,
    adForm: document.querySelector('.ad-form'),
    adElements: document.querySelector('.ad-form').children,
    fragment: document.createDocumentFragment(),
    OFFER_TYPES: ['palace', 'flat', 'house', 'bungalo'],
    OFFER_TIME: ['12:00', '13:00', '14:00'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    AVATAR_SIZE: 40,
    closeCard: function () {
      var mapCard = document.querySelector('.map__card');
      if (mapCard) {
        mapCard.remove();
      }
    },
    getRandomValue: function (arr) {
      return Math.floor(Math.random() * arr.length);
    },
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getOfferTime: function (checkin, checkout) {
      return [
        checkin[window.util.getRandomValue(checkin)],
        checkout[window.util.getRandomValue(checkout)],
      ];
    }
  };
})();

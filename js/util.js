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
    MAIN_PIN_SIZE: 65,
    PINS_NUMBER: 5,
    disableElem: function (arr, elem) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
          continue;
        }
        arr[i].setAttribute('disabled', '');
      }
    },
    activateCapacity: function (elem, arr) {
      for (var i = 0; i < arr.length; i++) {
        elem[arr[i]].removeAttribute('disabled');
      }
    },
    onCardEscClick: function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        window.util.closeCard();
      }
    },
    closeCard: function () {
      var mapCard = document.querySelector('.map__card');
      if (mapCard) {
        mapCard.remove();
        mapCard.querySelector('.popup__close').removeEventListener('click', window.util.closeCard);
        document.removeEventListener('keydown', window.util.onCardEscClick);
      }
    },
    getRandomValue: function (arr) {
      return Math.floor(Math.random() * arr.length);
    }
  };
})();

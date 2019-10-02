'use strict';
window.map = (function () {
  var cardFragment = document.createDocumentFragment();
  var pins = document.querySelector('.map__pins');
  var hotelAddress = document.querySelector('#address');
  var mainPin = document.querySelector('.map__pin--main');

  mainPin.addEventListener('click', openMap);
  mainPin.addEventListener('keydown', onPinEnterPress);

  function onPinEnterPress(evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      openMap();
    }
  }

  function activateElem(elem) {
    for (var i = 0; i < elem.length; i++) {
      elem[i].removeAttribute('disabled');
    }
  }

  function openPin(evt, i) {
    window.util.closeCard();
    cardFragment.appendChild(window.card.renderRentDescription(window.data.getNewRent(window.data.getOfferDescription('hi', 'kupislona'), window.util.OFFER_TYPES, 2, 2, window.util.getOfferTime(window.util.OFFER_TIME, window.util.OFFER_TIME), window.util.FEATURES), i));
    window.form.mapFilters.prepend(cardFragment);
    var openedCard = document.querySelector('.map__card');
    openedCard.querySelector('.popup__close').addEventListener('click', function () {
      openedCard.remove();
    });
    document.addEventListener('keydown', function (e) {
      if (e.keyCode === window.util.ESC_KEYCODE) {
        openedCard.remove();
      }
    });
  }

  function addPinListeners(elements) {
    elements.forEach(function (el, i) {
      elements[i].addEventListener('click', function (evt) {
        openPin(evt, i);
      });
    });
  }

  function setAddresValue() {
    hotelAddress.value = window.util.getRandomInt(window.data.X_LOCATION_START, window.data.X_LOCATION_END) + ', ' + window.util.getRandomInt(window.data.Y_LOCATION_START, window.data.Y_LOCATION_END);
  }

  function openMap() {
    window.pin.addPinToTemplate();
    window.map.MAP.classList.remove('map--faded');
    activateElem(window.util.adElements);
    activateElem(window.form.mapFilters);
    window.util.adForm.classList.remove('ad-form--disabled');
    setAddresValue();
    pins.appendChild(window.util.fragment);
    var pinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    addPinListeners(pinElements);
    mainPin.removeEventListener('click', openMap);
    mainPin.removeEventListener('keydown', onPinEnterPress);
  }

  return {
    MAP: document.querySelector('.map'),
    openMap: openMap
  };
})();

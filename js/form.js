'use strict';

window.form = (function () {
  var adSubmitButton = document.querySelector('.ad-form__submit');
  var roomsInputElement = window.util.adForm.querySelector('#room_number');
  var capacityInputElement = window.util.adForm.querySelector('#capacity');
  var capacityOptions = capacityInputElement.options;
  var roomTypeInput = window.util.adForm.querySelector('#type');
  var checkInTime = window.util.adForm.querySelector('#timein');
  var checkOutTime = window.util.adForm.querySelector('#timeout');
  var resetButton = document.querySelector('.ad-form__reset');
  var MAP = document.querySelector('.map');
  var mapFilters = window.map.MAP.querySelector('.map__filters-container');
  var mainPin = document.querySelector('.map__pin--main');
  var roomPrice = window.util.adForm.querySelector('#price');
  var hotelAddress = document.querySelector('#address');
  var START_POSITION_X = 570;
  var START_POSITION_Y = 375;
  var roomsType = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var ONE_ROOM = 1;
  var TWO_ROOMS = 2;
  var THREE_ROOMS = 3;
  var ONE_HUNDED_ROOMS = 100;
  var ONE_GUEST = 2;
  var TWO_GUESTS = 1;
  var THREE_GUEST = 0;
  var NON_GUESTS = 3;

  function disableElem(arr, elem) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === elem) {
        continue;
      }
      arr[i].setAttribute('disabled', '');
    }
  }

  function activateCapacity(elem, arr) {
    for (var i = 0; i < arr.length; i++) {
      elem[arr[i]].removeAttribute('disabled');
    }
  }

  function calculateRoomsAndCapacity() {
    var roomNumber = window.util.adForm.querySelector('#room_number').value;

    switch (+roomNumber) {
      case ONE_ROOM:
        disableElem(capacityOptions, ONE_GUEST);
        capacityOptions[ONE_GUEST].selected = true;
        activateCapacity(capacityOptions, [ONE_GUEST]);
        break;
      case TWO_ROOMS:
        disableElem(capacityOptions, TWO_GUESTS);
        activateCapacity(capacityOptions, [TWO_GUESTS, ONE_GUEST]);
        capacityOptions[TWO_GUESTS].selected = true;
        break;
      case THREE_ROOMS:
        disableElem(capacityOptions, THREE_GUEST);
        activateCapacity(capacityOptions, [THREE_GUEST, TWO_GUESTS, ONE_GUEST]);
        capacityOptions[THREE_GUEST].selected = true;
        break;
      case ONE_HUNDED_ROOMS:
        disableElem(capacityOptions, NON_GUESTS);
        activateCapacity(capacityOptions, [NON_GUESTS]);
        capacityOptions[NON_GUESTS].selected = true;
        break;
    }
  }

  roomsInputElement.addEventListener('change', onRoomsInputChange);

  adSubmitButton.addEventListener('click', onRoomsInputChange);

  function onRoomsInputChange() {
    calculateRoomsAndCapacity();
  }

  disableElem(window.util.adElements);

  disableElem(mapFilters);

  roomTypeInput.addEventListener('change', function () {
    var minPrice = roomsType[roomTypeInput.value];
    roomPrice.min = minPrice;
    roomPrice.placeholder = minPrice;
  });

  function calculateInTime() {
    switch (checkInTime.value) {
      case '12:00':
        checkOutTime.options[0].selected = true;
        break;
      case '13:00':
        checkOutTime.options[1].selected = true;
        break;
      case '14:00':
        checkOutTime.options[2].selected = true;
        break;
    }
  }

  function calculateOutTime() {
    switch (checkOutTime.value) {
      case '12:00':
        checkInTime.options[0].selected = true;
        break;
      case '13:00':
        checkInTime.options[1].selected = true;
        break;
      case '14:00':
        checkInTime.options[2].selected = true;
        break;
    }
  }

  function onInTimeChange() {
    calculateInTime();
  }

  function onOutTimeChange() {
    calculateOutTime();
  }

  checkInTime.addEventListener('change', onInTimeChange);
  checkOutTime.addEventListener('change', onOutTimeChange);

  function mapRest() {
    window.util.closeCard();
    var similarPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    MAP.classList.add('map--faded');
    disableElem(window.util.adElements);
    disableElem(window.form.mapFilters);
    similarPins.forEach(function (el) {
      el.remove();
    });
    hotelAddress.value = 602 + ', ' + 440;
    mainPin.style.top = START_POSITION_Y + 'px';
    mainPin.style.left = START_POSITION_X + 'px';
    window.util.adForm.classList.add('ad-form--disabled');
    mainPin.addEventListener('click', window.map.openMap);
  }

  resetButton.addEventListener('click', mapRest);

  return {
    mapFilters: mapFilters
  };

})();

'use strict';

window.form = (function () {
  var adSubmitButton = document.querySelector('.ad-form__submit');
  var roomsInputElement = window.util.adForm.querySelector('#room_number');
  var capacityInputElement = window.util.adForm.querySelector('#capacity');
  var capacityOptions = capacityInputElement.options;
  var roomTypeInput = window.util.adForm.querySelector('#type');
  var adTitle = window.util.adForm.querySelector('#title');
  var checkInTime = window.util.adForm.querySelector('#timein');
  var checkOutTime = window.util.adForm.querySelector('#timeout');
  var resetButton = document.querySelector('.ad-form__reset');
  var MAP = document.querySelector('.map');
  var mapFilters = window.map.MAP.querySelector('.map__filters-container');
  var mainPin = document.querySelector('.map__pin--main');
  var roomPrice = window.util.adForm.querySelector('#price');
  var hotelAddress = document.querySelector('#address');
  var description = document.querySelector('#description');
  var features = document.querySelectorAll('.feature__checkbox');
  var FLAT_OPTION = 1;
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
  var Time = {
    'twelve': '12:00',
    'thirteen': '13:00',
    'fourteen': '14:00'
  };
  var timeToOption = {
    'twelve': 0,
    'thirteen': 1,
    'fourteen': 2
  };

  function calculateRoomsAndCapacity() {
    var roomNumber = window.util.adForm.querySelector('#room_number').value;

    switch (+roomNumber) {
      case ONE_ROOM:
        window.util.disableElem(capacityOptions, ONE_GUEST);
        capacityOptions[ONE_GUEST].selected = true;
        window.util.activateCapacity(capacityOptions, [ONE_GUEST]);
        break;
      case TWO_ROOMS:
        window.util.disableElem(capacityOptions, TWO_GUESTS);
        window.util.activateCapacity(capacityOptions, [TWO_GUESTS, ONE_GUEST]);
        capacityOptions[TWO_GUESTS].selected = true;
        break;
      case THREE_ROOMS:
        window.util.disableElem(capacityOptions, THREE_GUEST);
        window.util.activateCapacity(capacityOptions, [THREE_GUEST, TWO_GUESTS, ONE_GUEST]);
        capacityOptions[THREE_GUEST].selected = true;
        break;
      case ONE_HUNDED_ROOMS:
        window.util.disableElem(capacityOptions, NON_GUESTS);
        window.util.activateCapacity(capacityOptions, [NON_GUESTS]);
        capacityOptions[NON_GUESTS].selected = true;
        break;
    }
  }

  roomsInputElement.addEventListener('change', onRoomsInputChange);

  adSubmitButton.addEventListener('click', onRoomsInputChange);

  function onRoomsInputChange() {
    calculateRoomsAndCapacity();
  }

  window.util.disableElem(window.util.adElements);

  window.util.disableElem(mapFilters);

  roomTypeInput.addEventListener('change', function () {
    var minPrice = roomsType[roomTypeInput.value];
    roomPrice.min = minPrice;
    roomPrice.placeholder = minPrice;
  });

  function calculateInTime() {
    switch (checkInTime.value) {
      case Time.twelve:
        checkOutTime.options[timeToOption.twelve].selected = true;
        break;
      case Time.thirteen:
        checkOutTime.options[timeToOption.thirteen].selected = true;
        break;
      case Time.fourteen:
        checkOutTime.options[timeToOption.fourteen].selected = true;
        break;
    }
  }

  function calculateOutTime() {
    switch (checkOutTime.value) {
      case Time.twelve:
        checkInTime.options[timeToOption.twelve].selected = true;
        break;
      case Time.thirteen:
        checkInTime.options[timeToOption.thirteen].selected = true;
        break;
      case Time.fourteen:
        checkInTime.options[timeToOption.fourteen].selected = true;
        break;
    }
  }

  function onInTimeChange() {
    calculateInTime();
  }

  function onOutTimeChange() {
    calculateOutTime();
  }

  function resetFeatures(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].checked = false;
    }
  }

  checkInTime.addEventListener('change', onInTimeChange);
  checkOutTime.addEventListener('change', onOutTimeChange);

  function mapReset() {
    window.util.closeCard();
    window.image.remove();
    window.image.deactivate();
    var similarPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    MAP.classList.add('map--faded');
    window.util.disableElem(window.util.adElements);
    window.util.disableElem(window.form.mapFilters);
    similarPins.forEach(function (el) {
      el.remove();
    });
    adTitle.value = '';
    roomTypeInput.options[FLAT_OPTION].selected = true;
    roomPrice.placeholder = '1000';
    roomPrice.value = '';
    roomsInputElement.options[0].selected = true;
    capacityInputElement.options[ONE_GUEST].selected = true;
    resetFeatures(features);
    description.value = '';
    checkInTime.options[timeToOption.twelve].selected = true;
    checkOutTime.options[timeToOption.twelve].selected = true;
    hotelAddress.value = 602 + ', ' + 440;
    mainPin.style.top = START_POSITION_Y + 'px';
    mainPin.style.left = START_POSITION_X + 'px';
    window.util.adForm.classList.add('ad-form--disabled');
    mainPin.addEventListener('click', window.map.openMap);
  }

  resetButton.addEventListener('click', mapReset);

  return {
    mapFilters: mapFilters,
    mapReset: mapReset
  };

})();

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

  function disableElem(elem) {
    for (var i = 0; i < elem.length; i++) {
      elem[i].setAttribute('disabled', '');
    }
  }

  function disableCapacity(elem, arr) {
    for (var i = 0; i < arr.length; i++) {
      elem[arr[i]].setAttribute('disabled', '');
    }
  }

  function activateCapacity(elem, arr) {
    for (var i = 0; i < arr.length; i++) {
      elem[arr[i]].removeAttribute('disabled');
    }
  }

  function calculateRoomsAndCapacity() {
    var roomNumber = window.util.adForm.querySelector('#room_number').value;

    switch (roomNumber) {
      case '1':
        disableCapacity(capacityOptions, [0, 1, 3]);
        capacityOptions[2].selected = true;
        activateCapacity(capacityOptions, [2]);
        break;
      case '2':
        disableCapacity(capacityOptions, [0, 2, 3]);
        activateCapacity(capacityOptions, [1, 2]);
        capacityOptions[1].selected = true;
        break;
      case '3':
        disableCapacity(capacityOptions, [1, 2, 3]);
        activateCapacity(capacityOptions, [0, 1, 2]);
        capacityOptions[0].selected = true;
        break;
      case '100':
        disableCapacity(capacityOptions, [0, 1, 2]);
        activateCapacity(capacityOptions, [3]);
        capacityOptions[3].selected = true;
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

  function calculateMinPrice() {
    var roomType = window.util.adForm.querySelector('#type').value;
    var roomPrice = window.util.adForm.querySelector('#price');

    switch (roomType) {
      case 'bungalo':
        roomPrice.setAttribute('min', '0');
        break;
      case 'flat':
        roomPrice.setAttribute('min', '1000');
        break;
      case 'house':
        roomPrice.setAttribute('min', '5000');
        break;
      case 'palace':
        roomPrice.setAttribute('min', '10000');
        break;
    }
  }

  function onRoomTypeChange() {
    calculateMinPrice();
  }

  roomTypeInput.addEventListener('change', onRoomTypeChange);

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
    window.util.adForm.classList.add('ad-form--disabled');
    mainPin.addEventListener('click', window.map.openMap);
  }

  resetButton.addEventListener('click', mapRest);

  return {
    mapFilters: mapFilters
  };

})();

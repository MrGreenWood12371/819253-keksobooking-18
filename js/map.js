'use strict';
window.map = (function () {
  var cardFragment = document.createDocumentFragment();
  var pins = document.querySelector('.map__pins');
  var hotelAddress = document.querySelector('#address');
  var mainPin = document.querySelector('.map__pin--main');
  var TOP_LIMIT = 65;
  var BOTTOM_LIMIT = 565;
  var LEFT_LIMIT = -25;
  var RIGHT_LIMIT = 1160;

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

  function openPin(evt, i, obj) {
    window.util.closeCard();
    cardFragment.appendChild(window.card.renderRentDescription(obj, i));
    window.form.mapFilters.prepend(cardFragment);
    var openedCard = document.querySelector('.map__card');
    openedCard.querySelector('.popup__close').addEventListener('click', window.util.closeCard);
    document.addEventListener('keydown', window.util.onCardEscClick);
  }

  function addPinListeners(elements, obj) {
    elements.forEach(function (el, i) {
      el.addEventListener('click', function (evt) {
        openPin(evt, i, obj);
      });
    });
  }


  function setAddresValue(coordsX, coordsY) {
    hotelAddress.value = coordsX + ', ' + coordsY;
  }

  function renderPins() {
    if (window.util.fragment.children) {
      pins.appendChild(window.util.fragment);
    }
  }

  function openMap() {
    window.map.MAP.classList.remove('map--faded');
    activateElem(window.util.adElements);
    activateElem(window.form.mapFilters);
    window.pin.addPinsToTemplate(window.data.rents.slice(0, 5));
    window.util.adForm.classList.remove('ad-form--disabled');
    renderPins();
    var pinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    addPinListeners(pinElements, window.data.rents);
    mainPin.removeEventListener('click', openMap);
    mainPin.removeEventListener('keydown', onPinEnterPress);
    window.filter.activate(window.data.rents);
  }

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var shift = {
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var topPin = mainPin.offsetTop - shift.y;
      var leftPin = mainPin.offsetLeft - shift.x;

      if (topPin < TOP_LIMIT) {
        topPin = TOP_LIMIT;
      } else if (topPin > BOTTOM_LIMIT) {
        topPin = BOTTOM_LIMIT;
      }

      if (leftPin < LEFT_LIMIT) {
        leftPin = LEFT_LIMIT;
      } else if (leftPin > RIGHT_LIMIT) {
        leftPin = RIGHT_LIMIT;
      }

      shift.x = startCoords.x - moveEvt.clientX;
      shift.y = startCoords.y - moveEvt.clientY;

      startCoords.x = moveEvt.clientX;
      startCoords.y = moveEvt.clientY;

      setAddresValue(mainPin.offsetLeft - shift.x + Math.floor((window.util.MAIN_PIN_SIZE / 2)), mainPin.offsetTop - shift.y + window.util.MAIN_PIN_SIZE);

      mainPin.style.top = topPin + 'px';
      mainPin.style.left = leftPin + 'px';
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      shift.x = startCoords.x - upEvt.clientX;
      shift.y = startCoords.y - upEvt.clientY;

      startCoords.x = upEvt.clientX;
      startCoords.y = upEvt.clientY;

      setAddresValue(mainPin.offsetLeft - shift.x + Math.floor((window.util.MAIN_PIN_SIZE / 2)), mainPin.offsetTop - shift.y + window.util.MAIN_PIN_SIZE);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  return {
    MAP: document.querySelector('.map'),
    openMap: openMap,
    addPinListeners: addPinListeners
  };
})();

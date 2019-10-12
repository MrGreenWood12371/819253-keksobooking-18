'use strict';
(function () {

  var houseTypeFilter = document.querySelector('#housing-type');

  function houseTypeComparator(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }

  function getRank(rent) {
    var rank = 0;

    if (rent.offer.type === houseTypeFilter.value) {
      rank += 2;
    }

    return rank;
  }

  function updatePins() {
    window.util.closeCard();
    var rentsCopy = window.data.rents.map(function (it) {
      return it;
    });
    removePins();
    var pins = document.querySelector('.map__pins');

    rentsCopy.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = houseTypeComparator(left.offer.type, right.offer.type);
      }
      return rankDiff;
    });
    for (var j = 0; j < 5; j++) {
      if (rentsCopy[j].offer.type === houseTypeFilter.value) {
        window.util.fragment.appendChild(window.pin.renderNewRent(rentsCopy[j]));
      }
      if (houseTypeFilter.value === 'any') {
        window.util.fragment.appendChild(window.pin.renderNewRent(window.data.rents[j]));
      }
    }

    pins.appendChild(window.util.fragment);

    var pinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.map.addPinListeners(pinElements, rentsCopy);
  }

  function removePins() {
    var similarPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    similarPins.forEach(function (el) {
      el.remove();
    });
  }

  houseTypeFilter.addEventListener('change', updatePins);


})();

'use strict';
(function () {

  var PINS_LIMIT = 5;

  var PriceRange = {
    LOW: {
      MIN: 0,
      MAX: 10000
    },
    MIDDLE: {
      MIN: 10000,
      MAX: 50000
    },
    HIGH: {
      MIN: 50000,
      MAX: Infinity
    }
  };

  var filter = document.querySelector('.map__filters');
  var filterItems = filter.querySelectorAll('select, input');
  var typeSelect = filter.querySelector('#housing-type');
  var priceSelect = filter.querySelector('#housing-price');
  var roomsSelect = filter.querySelector('#housing-rooms');
  var guestsSelect = filter.querySelector('#housing-guests');
  var featuresFieldset = filter.querySelector('#housing-features');
  var filteredData = [];

  var filtrationItem = function (it, item, key) {
    return it.value === 'any' ? true : it.value === item[key].toString();
  };

  var filtrationByType = function (item) {
    return filtrationItem(typeSelect, item.offer, 'type');
  };

  var filtrationByPrice = function (item) {
    var filteringPrice = PriceRange[priceSelect.value.toUpperCase()];
    return filteringPrice ? item.offer.price >= filteringPrice.MIN && item.offer.price <= filteringPrice.MAX : true;
  };

  var filtrationByRooms = function (item) {
    return filtrationItem(roomsSelect, item.offer, 'rooms');
  };

  var filtrationByGuests = function (item) {
    return filtrationItem(guestsSelect, item.offer, 'guests');
  };

  var filtrationByFeatures = function (item) {
    var checkedFeaturesItems = featuresFieldset.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesItems).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };

  function removePins() {
    var similarPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    similarPins.forEach(function (el) {
      el.remove();
    });
  }

  var onFilterChange = window.util.debounce(function () {
    var pins = document.querySelector('.map__pins');
    window.data.rents = window.data.rents.filter(filtrationByType).filter(filtrationByPrice).filter(filtrationByRooms).filter(filtrationByGuests).filter(filtrationByFeatures);

    window.util.closeCard();
    removePins();
    window.pin.addPinsToTemplate(filteredData.slice(0, PINS_LIMIT));
    pins.appendChild(window.util.fragment);
    window.filter.data = filteredData.slice(0, PINS_LIMIT);
  });

  var activateFilter = function () {
    filterItems.forEach(function (it) {
      it.disabled = false;
    });
    filter.addEventListener('change', onFilterChange);
  };

  var resetFilter = function () {
    filterItems.forEach(function (it) {
      it.value = 'any';
    });

    var featuresItems = featuresFieldset.querySelectorAll('input');
    featuresItems.forEach(function (feature) {
      feature.checked = false;
    });
  };

  var deactivateFilter = function () {
    filterItems.forEach(function (it) {
      it.disabled = true;
    });
    resetFilter();
    filter.removeEventListener('change', onFilterChange);
  };

  var activateFiltration = function () {
    activateFilter();
  };

  var deactivateFiltration = function () {
    deactivateFilter();
  };

  window.filter = {
    activate: activateFiltration,
    deactivate: deactivateFiltration
  };
})();
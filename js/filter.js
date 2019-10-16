'use strict';
(function () {

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
  var data = [];
  var filteredData = [];

  function filtrationItem(it, item, key) {
    return it.value === 'any' ? true : it.value === item[key].toString();
  }

  function filtrationByType(item) {
    return filtrationItem(typeSelect, item.offer, 'type');
  }

  function filtrationByPrice(item) {
    var filteringPrice = PriceRange[priceSelect.value.toUpperCase()];
    return filteringPrice ? item.offer.price >= filteringPrice.MIN && item.offer.price <= filteringPrice.MAX : true;
  }

  function filtrationByRooms(item) {
    return filtrationItem(roomsSelect, item.offer, 'rooms');
  }

  function filtrationByGuests(item) {
    return filtrationItem(guestsSelect, item.offer, 'guests');
  }

  function filtrationByFeatures(item) {
    var checkedFeaturesItems = featuresFieldset.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesItems).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  }

  function removePins() {
    var similarPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    similarPins.forEach(function (el) {
      el.remove();
    });
  }

  var onFilterChange = window.util.debounce(function () {
    var pins = document.querySelector('.map__pins');
    filteredData = data.slice(0);
    filteredData = filteredData.filter(filtrationByType).filter(filtrationByPrice).filter(filtrationByRooms).filter(filtrationByGuests).filter(filtrationByFeatures);
    removePins();
    window.util.closeCard();
    window.pin.addPinsToTemplate(filteredData.slice(0, window.util.PINS_NUMBER));

    pins.appendChild(window.util.fragment);

    var pinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.map.addPinListeners(pinElements, filteredData.slice(0, window.util.PINS_NUMBER));

  });

  function activateFilter() {
    filterItems.forEach(function (it) {
      it.disabled = false;
    });
    filter.addEventListener('change', onFilterChange);
  }

  function resetFilter() {
    filterItems.forEach(function (it) {
      it.value = 'any';
    });
    var featuresItems = featuresFieldset.querySelectorAll('input');
    featuresItems.forEach(function (feature) {
      feature.checked = false;
    });
  }

  function deactivateFilter() {
    filterItems.forEach(function (it) {
      it.disabled = true;
    });
    resetFilter();
    filter.removeEventListener('change', onFilterChange);
  }

  function activateFiltration(adData) {
    data = adData.slice(0);
    activateFilter();
    return adData.slice(0, window.util.PINS_NUMBER);
  }

  function deactivateFiltration() {
    deactivateFilter();
  }

  window.filter = {
    activate: activateFiltration,
    deactivate: deactivateFiltration
  };
})();

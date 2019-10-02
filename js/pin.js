'use strict';
window.pin = (function () {
  var PIN_TEMPLATE = document.querySelector('#pin').content.querySelector('.map__pin');

  for (var j = 0; j < window.data.RENTS_NUMBER; j++) {
    window.util.fragment.appendChild(renderNewRent(window.data.getNewRent(window.data.getOfferDescription('hi', 'kupislona'), window.util.OFFER_TYPES, 2, 2, window.util.getOfferTime(window.util.OFFER_TIME, window.util.OFFER_TIME), window.util.FEATURES)[j]));
  }
  function renderNewRent(objects) {
    var pinElement = PIN_TEMPLATE.cloneNode(true);
    var pinImage = pinElement.querySelector('img');

    pinElement.setAttribute('style', 'left: ' + (+objects.location.x - (window.util.AVATAR_SIZE / 2)) + 'px; ' + 'top: ' + (+objects.location.y - window.util.AVATAR_SIZE) + 'px;');
    pinImage.setAttribute('src', objects.author.avatar);
    pinElement.setAttribute('alt', objects.offer.title);

    return pinElement;
  }
})();

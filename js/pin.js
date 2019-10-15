'use strict';
window.pin = (function () {
  var PIN_TEMPLATE = document.querySelector('#pin').content.querySelector('.map__pin');
  function renderNewRent(objects) {
    var pinElement = PIN_TEMPLATE.cloneNode(true);
    var pinImage = pinElement.querySelector('img');

    pinElement.setAttribute('style', 'left: ' + (objects.location.x - (window.util.AVATAR_SIZE / 2)) + 'px; ' + 'top: ' + (objects.location.y - window.util.AVATAR_SIZE) + 'px;');
    pinImage.setAttribute('src', objects.author.avatar);
    pinElement.setAttribute('alt', objects.offer.title);

    return pinElement;
  }
  return {
    addPinsToTemplate: function (data) {
      for (var j = 0; j < window.util.PINS_NUMBER; j++) {
        window.util.fragment.appendChild(renderNewRent(data[j]));
      }
    },
    renderNewRent: renderNewRent
  };
})();

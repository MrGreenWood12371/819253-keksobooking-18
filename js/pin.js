'use strict';
window.pin = (function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  function renderNewRent(objects) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinImage = pinElement.querySelector('img');

    pinElement.setAttribute('style', 'left: ' + (objects.location.x - (window.util.AVATAR_SIZE / 2)) + 'px; ' + 'top: ' + (objects.location.y - window.util.AVATAR_SIZE) + 'px;');
    pinImage.setAttribute('src', objects.author.avatar);
    pinElement.setAttribute('alt', objects.offer.title);

    return pinElement;
  }
  return {
    addPinsToTemplate: function (data) {
      data.forEach(function (it) {
        window.util.fragment.appendChild(renderNewRent(it));
      });
    }
  };
})();

'use strict';

window.card = (function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  return {
    renderRentDescription: function (objects, i) {
      var cardElement = cardTemplate.cloneNode(true);
      var cardTitle = cardElement.querySelector('.popup__title');
      var cardAddress = cardElement.querySelector('.popup__text--address');
      var cardPrice = cardElement.querySelector('.popup__text--price');
      var cardType = cardElement.querySelector('.popup__type');
      var cardGuests = cardElement.querySelector('.popup__text--capacity');
      var cardTime = cardElement.querySelector('.popup__text--time');
      var cardFeatures = cardElement.querySelector('.popup__features');
      var cardDescription = cardElement.querySelector('.popup__description');
      var cardPhotosContainer = cardElement.querySelector('.popup__photos');
      var cardPhotos = cardElement.querySelector('.popup__photos').querySelector('img');
      var cardAvatar = cardElement.querySelector('.popup__avatar');

      cardTitle.textContent = objects[i].offer.title;
      cardAddress.textContent = objects[i].offer.address;
      cardPrice.textContent = objects[i].offer.price;
      cardType.textContent = objects[i].offer.type;
      cardGuests.textContent = objects[i].offer.rooms + ' комнаты для ' + objects[i].offer.guests + 'гостей';
      cardTime.textContent = 'заезд после ' + objects[i].offer.checkin + ', выезд до ' + objects[i].offer.checkout;
      cardFeatures.textContent = objects[i].offer.features;
      cardDescription.textContent = objects[i].offer.description;

      objects[i].offer.photos.forEach(function (item) {
        var cardImage = document.createElement('img');
        cardImage.src = item;
        cardImage.classList.add('popup__photo');
        cardImage.setAttribute('width', '45');
        cardImage.setAttribute('height', '40');
        cardImage.setAttribute('alt', 'Фотография жилья');
        cardPhotosContainer.appendChild(cardImage);
      });
      cardPhotosContainer.removeChild(cardPhotos);


      cardAvatar.setAttribute('src', objects[i].author.avatar);

      return cardElement;
    }
  };
})();

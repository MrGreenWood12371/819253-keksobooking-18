'use strict';

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
// var AVATAR_SIZE = 40;
var RENTS_NUMBER = 8;
var X_LOCATION_START = 1;
var X_LOCATION_END = 1200;
var Y_LOCATION_START = 130;
var Y_LOCATION_END = 630;
var ENTER_KEYCODE = 13;

function getRandomValue(arr) {
  return Math.floor(Math.random() * arr.length);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getOfferTime(checkin, checkout) {
  return [
    checkin[getRandomValue(checkin)],
    checkout[getRandomValue(checkout)],
  ];
}

function getOfferDescription(title, text) {
  return [title, text];
}

function getNewRent(offerText, offerTypes, roomsNumber, guestsNumber, checkTime, offerFeatures, offerPhotos) {
  var rents = [];

  for (var i = 1; i <= RENTS_NUMBER; i++) {
    rents.push({
      'author': {'avatar': 'img/avatars/user0' + i + '.png'},

      'offer': {
        'title': offerText[0],
        'address': '600, 350',
        'price': getRandomInt(1000, 10000),
        'type': offerTypes[getRandomValue(offerTypes)],
        'rooms': roomsNumber,
        'guests': guestsNumber,
        'checkin': checkTime[0],
        'checkout': checkTime[1],
        'features': offerFeatures[getRandomValue(offerFeatures)],
        'description': offerText[1],
        'photos': offerPhotos[getRandomValue(offerPhotos)]
      },
      'location': {
        'x': getRandomInt(X_LOCATION_START, X_LOCATION_END),
        'y': getRandomInt(Y_LOCATION_START, Y_LOCATION_END)
      }
    });
  }
  return rents;
}

var MAP = document.querySelector('.map');


// var PIN_TEMPLATE = document.querySelector('#pin').content.querySelector('.map__pin');
var pins = document.querySelector('.map__pins');

// function renderNewRent(objects) {
//   var pinElement = PIN_TEMPLATE.cloneNode(true);
//   var pinImage = pinElement.querySelector('img');

//   pinElement.setAttribute('style', 'left: ' + (+objects.location.x - (AVATAR_SIZE / 2)) + 'px; ' + 'top: ' + (+objects.location.y - AVATAR_SIZE) + 'px;');
//   pinImage.setAttribute('src', objects.author.avatar);
//   pinElement.setAttribute('alt', objects.offer.title);

//   return pinElement;
// }

var fragment = document.createDocumentFragment();
// for (var i = 0; i < RENTS_NUMBER; i++) {
//   fragment.appendChild(renderNewRent(getNewRent(getOfferDescription('hi', 'kupislona'), OFFER_TYPES, 2, 2, getOfferTime(OFFER_TIME, OFFER_TIME), FEATURES, PHOTOS)[i]));
// }

pins.appendChild(fragment);

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var cardFragment = document.createDocumentFragment();

function renderRentDescription(objects) {
  var cardElement = cardTemplate.cloneNode(true);
  var cardTitle = cardElement.querySelector('.popup__title');
  var cardAddress = cardElement.querySelector('.popup__text--address');
  var cardPrice = cardElement.querySelector('.popup__text--price');
  var cardType = cardElement.querySelector('.popup__type');
  var cardGuests = cardElement.querySelector('.popup__text--capacity');
  var cardTime = cardElement.querySelector('.popup__text--time');
  var cardFeatures = cardElement.querySelector('.popup__features');
  var cardDescription = cardElement.querySelector('.popup__description');
  var cardPhotos = cardElement.querySelector('.popup__photos').querySelector('img');
  var cardAvatar = cardElement.querySelector('.popup__avatar');

  cardTitle.textContent = objects[0].offer.title;
  cardAddress.textContent = objects[0].offer.address;
  cardPrice.textContent = objects[0].offer.price;
  cardType.textContent = objects[0].offer.type;
  cardGuests.textContent = objects[0].offer.rooms + ' комнаты для ' + objects[0].offer.guests + 'гостей';
  cardTime.textContent = 'заезд после ' + objects[0].offer.checkin + ', выезд до ' + objects[0].offer.checkout;
  cardFeatures.textContent = objects[0].offer.features;
  cardDescription.textContent = objects[0].offer.description;
  cardPhotos.setAttribute('src', objects[0].offer.photos);
  cardAvatar.setAttribute('src', objects[0].author.avatar);

  return cardElement;
}

cardFragment.appendChild(renderRentDescription(getNewRent(getOfferDescription('hi', 'kupislona'), OFFER_TYPES, 2, 2, getOfferTime(OFFER_TIME, OFFER_TIME), FEATURES, PHOTOS)));
// var mapFilters = MAP.querySelector('.map__filters-container');

// mapFilters.prepend(cardFragment);

function disableElem(elem) {
  for (var i = 0; i < elem.length; i++) {
    elem[i].setAttribute('disabled', '');
  }
}

function activateElem(elem) {
  for (var i = 0; i < elem.length; i++) {
    elem[i].removeAttribute('disabled');
  }
}

var adForm = document.querySelector('.ad-form');
var adElements = adForm.children;

disableElem(adElements);

var mapFilters = document.querySelector('.map__filters').children;

disableElem(mapFilters);

var mainPin = document.querySelector('.map__pin--main');
var hotelAddress = document.querySelector('#address');

function openMap() {
  MAP.classList.remove('map--faded');
  activateElem(adElements);
  activateElem(mapFilters);
  adForm.classList.remove('ad-form--disabled');
  hotelAddress.value = getRandomInt(X_LOCATION_START, X_LOCATION_END) + ', ' + getRandomInt(Y_LOCATION_START, Y_LOCATION_END);
}

function onPinEnterPress(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openMap();
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

mainPin.addEventListener('click', openMap);

mainPin.addEventListener('keydown', onPinEnterPress);

var roomsInputElement = adForm.querySelector('#room_number');
var capacityInputElement = adForm.querySelector('#capacity');
var capacityOptions = capacityInputElement.options;

function calculateRoomsAndCapacity() {
  var roomNumber = adForm.querySelector('#room_number').value;

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

function onRoomsInputChange() {
  calculateRoomsAndCapacity();
}

roomsInputElement.addEventListener('change', onRoomsInputChange);

var adSubmitButton = document.querySelector('.ad-form__submit');

adSubmitButton.addEventListener('click', onRoomsInputChange);

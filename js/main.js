'use strict';

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var AVATAR_SIZE = 40;
var RENTS_NUMBER = 8;
var X_LOCATION_START = 1;
var X_LOCATION_END = 1200;
var Y_LOCATION_START = 130;
var Y_LOCATION_END = 630;
var ENTER_KEYCODE = 13;
var MAP = document.querySelector('.map');
var pins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var cardFragment = document.createDocumentFragment();
var adForm = document.querySelector('.ad-form');
var adElements = adForm.children;
var adSubmitButton = document.querySelector('.ad-form__submit');
var mainPin = document.querySelector('.map__pin--main');
var hotelAddress = document.querySelector('#address');
var roomsInputElement = adForm.querySelector('#room_number');
var capacityInputElement = adForm.querySelector('#capacity');
var capacityOptions = capacityInputElement.options;
var PIN_TEMPLATE = document.querySelector('#pin').content.querySelector('.map__pin');
var ESC_KEYCODE = 27;
var roomTypeInput = adForm.querySelector('#type');
var checkInTime = adForm.querySelector('#timein');
var checkOutTime = adForm.querySelector('#timeout');


function getPhotos() {
  return PHOTOS.slice(0, PHOTOS.length);
}

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

function getNewRent(offerText, offerTypes, roomsNumber, guestsNumber, checkTime, offerFeatures) {
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
        'photos': getPhotos()
      },
      'location': {
        'x': getRandomInt(X_LOCATION_START, X_LOCATION_END),
        'y': getRandomInt(Y_LOCATION_START, Y_LOCATION_END)
      }
    });
  }
  return rents;
}

function renderNewRent(objects) {
  var pinElement = PIN_TEMPLATE.cloneNode(true);
  var pinImage = pinElement.querySelector('img');

  pinElement.setAttribute('style', 'left: ' + (+objects.location.x - (AVATAR_SIZE / 2)) + 'px; ' + 'top: ' + (+objects.location.y - AVATAR_SIZE) + 'px;');
  pinImage.setAttribute('src', objects.author.avatar);
  pinElement.setAttribute('alt', objects.offer.title);

  return pinElement;
}

for (var j = 0; j < RENTS_NUMBER; j++) {
  fragment.appendChild(renderNewRent(getNewRent(getOfferDescription('hi', 'kupislona'), OFFER_TYPES, 2, 2, getOfferTime(OFFER_TIME, OFFER_TIME), FEATURES)[j]));
}

function renderRentDescription(objects, i) {
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

cardFragment.appendChild(renderRentDescription(getNewRent(getOfferDescription('hi', 'kupislona'), OFFER_TYPES, 2, 2, getOfferTime(OFFER_TIME, OFFER_TIME), FEATURES), 0));
var mapFilters = MAP.querySelector('.map__filters-container');

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

disableElem(adElements);

disableElem(mapFilters);

function openPin(evt, i) {
  cardFragment.appendChild(renderRentDescription(getNewRent(getOfferDescription('hi', 'kupislona'), OFFER_TYPES, 2, 2, getOfferTime(OFFER_TIME, OFFER_TIME), FEATURES), i));
  mapFilters.prepend(cardFragment);
  var openedCard = document.querySelector('.map__card');
  openedCard.querySelector('.popup__close').addEventListener('click', function () {
    openedCard.classList.add('hidden');
  });
  document.addEventListener('keydown', function (e) {
    if (e.keyCode === ESC_KEYCODE) {
      openedCard.classList.add('hidden');
    }
  });
}

function addPinListeners(elements) {
  elements.forEach(function (el, i) {
    elements[i].addEventListener('click', function (evt) {
      openPin(evt, i);
    });
  });
}

function openMap() {
  MAP.classList.remove('map--faded');
  activateElem(adElements);
  activateElem(mapFilters);
  adForm.classList.remove('ad-form--disabled');
  hotelAddress.value = getRandomInt(X_LOCATION_START, X_LOCATION_END) + ', ' + getRandomInt(Y_LOCATION_START, Y_LOCATION_END);
  pins.appendChild(fragment);
  mapFilters.prepend(cardFragment);
  var openedCard = document.querySelector('.map__card');
  openedCard.querySelector('.popup__close').addEventListener('click', function () {
    openedCard.classList.add('hidden');
  });
  document.addEventListener('keydown', function (e) {
    if (e.keyCode === ESC_KEYCODE) {
      openedCard.classList.add('hidden');
    }
  });
  var pinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  addPinListeners(pinElements);
  mainPin.removeEventListener('click', openMap);
  mainPin.removeEventListener('keydown', onPinEnterPress);
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

adSubmitButton.addEventListener('click', onRoomsInputChange);

function calculateMinPrice() {
  var roomType = adForm.querySelector('#type').value;
  var roomPrice = adForm.querySelector('#price');

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

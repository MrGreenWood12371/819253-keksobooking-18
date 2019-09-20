'use strict';

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
var AVATAR_SIZE = 40;

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

  for (var i = 1; i <= 8; i++) {
    rents.push({
      "author": { "avatar": 'img/avatars/user0' + i + '.png'},

      "offer": {
        "title": offerText[0],
        "address": "600, 350",
        "price": getRandomInt(1000, 10000),
        "type": offerTypes[getRandomValue(offerTypes)],
        "rooms": roomsNumber,
        "guests": guestsNumber,
        "checkin": checkTime[0],
        "checkout": checkTime[1],
        "features": offerFeatures[getRandomValue(offerFeatures)],
        "description": offerText[1],
        "photos": offerPhotos[getRandomValue(offerPhotos)]
    },
    "location": {
      "x": getRandomInt(1, 1200),
      "y": getRandomInt(130, 630)
    }
    })
  }
  return rents;
}

var MAP = document.querySelector('.map');
MAP.classList.remove('map--faded');

var PIN_TEMPLATE = document.querySelector('#pin').content.querySelector('.map__pin')
var pins = document.querySelector('.map__pins');

function renderNewRent(objects) {
  var pinElement = PIN_TEMPLATE.cloneNode(true);
  var pinImage = pinElement.querySelector('img');

  pinElement.setAttribute('style', 'left: ' + (+objects.location.x - (AVATAR_SIZE / 2)) + 'px; ' + 'top: ' + (+objects.location.y - AVATAR_SIZE) + 'px;');
  pinImage.setAttribute('src', objects.author.avatar);
  pinElement.setAttribute('alt', objects.offer.title);

  return pinElement;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < 8; i++) {
  fragment.appendChild(renderNewRent(getNewRent(getOfferDescription('hi', 'kupislona'), OFFER_TYPES, 2, 2, getOfferTime(OFFER_TIME, OFFER_TIME), FEATURES, PHOTOS)[i]))
}

pins.appendChild(fragment);

'use strict';
window.data = (function () {
  var rents = [];
  var node = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  var successNode = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  var closeButton = node.querySelector('.error__button');
  var pins = document.querySelector('.map__pins');

  function onErrorButtonClick() {
    closeButton.removeEventListener('click', onErrorButtonClick);
    node.remove();
  }

  function onErrorEscPress(evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeButton.removeEventListener('click', onErrorButtonClick);
      document.removeEventListener('keydown', onErrorEscPress);
      window.removeEventListener('click', onErrorWindowClick);
      node.remove();
    }
  }

  function onSuccessEscPress(evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      document.removeEventListener('keydown', onSuccessEscPress);
      successNode.remove();
    }
  }

  function onSuccessWindowClick() {
    window.removeEventListener('click', onSuccessWindowClick);
    document.removeEventListener('keydown', onSuccessEscPress);
    successNode.remove();
  }

  function onSuccessOpen() {
    document.addEventListener('keydown', onSuccessEscPress);
    window.addEventListener('click', onSuccessWindowClick);
  }

  function onErrorWindowClick() {
    window.removeEventListener('click', onErrorWindowClick);
    closeButton.removeEventListener('click', onErrorButtonClick);
    document.removeEventListener('keydown', onErrorEscPress);
    node.remove();
  }

  function onErrorOpen() {
    closeButton.addEventListener('click', onErrorButtonClick);
    document.addEventListener('keydown', onErrorEscPress);
    window.addEventListener('click', onErrorWindowClick);
  }

  function onError(errorMessage) {
    var nodeText = node.querySelector('p');
    nodeText.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
    onErrorOpen();
  }

  function renderSuccess() {
    onSuccessOpen();
    document.body.insertAdjacentElement('afterbegin', successNode);
  }

  function onSuccess(arr) {
    arr.forEach(function (it) {
      rents.push(it);
    });
    window.pin.addToTemplate(window.data.rents.slice(0, window.util.PINS_NUMBER));
    pins.appendChild(window.util.fragment);
    window.filter.activate(window.data.rents);
    var pinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.map.addPinListeners(pinElements, window.data.rents);
  }

  var form = document.querySelector('.ad-form');
  form.addEventListener('submit', function (evt) {
    window.load.sendData(new FormData(form), function () {
      window.form.mapReset();
      renderSuccess();
    }, onError);
    evt.preventDefault();
  });

  return {
    rents: rents,
    onSuccess: onSuccess,
    onError: onError
  };
})();

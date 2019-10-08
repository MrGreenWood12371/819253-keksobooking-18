'use strict';
window.data = (function () {
  var rents = [];
  var node = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  var closeButton = node.querySelector('.error__button');
  function onErrorButtonClick() {
    closeButton.removeEventListener('click', onErrorButtonClick);
    node.remove();
  }

  function onErrorEscPress(evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeButton.removeEventListener('click', onErrorButtonClick);
      document.removeEventListener('keydown', onErrorEscPress);
      node.remove();
    }
  }

  function onWindowClick() {
    window.removeEventListener('click', onWindowClick);
    closeButton.removeEventListener('click', onErrorButtonClick);
    document.removeEventListener('keydown', onErrorEscPress);
    node.remove();
  }

  function onErrorOpen() {
    closeButton.addEventListener('click', onErrorButtonClick);
    document.addEventListener('keydown', onErrorEscPress);
    window.addEventListener('click', onWindowClick);
  }
  function onError(errorMessage) {
    var nodeText = node.querySelector('p');
    nodeText.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
    onErrorOpen();
  }

  function onSuccess(arr) {
    for (var i = 0; i < arr.length; i++) {
      rents.push(arr[i]);
    }
  }
  window.load(onSuccess, onError);

  return {
    rents: rents
  };
})();

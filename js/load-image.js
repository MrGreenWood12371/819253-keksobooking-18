'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var ImageParams = {
    WIDTH: '70px',
    HEIGHT: '70px',
    BORDER_RADIUS: '5px'
  };

  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var imagesContainer = document.querySelector('.ad-form__photo-container');
  var avatarChooser = document.querySelector('#avatar');
  var imageChooser = document.querySelector('#images');

  function filtrationByCorrectType(file) {
    return FILE_TYPES.some(function (it) {
      return file.name.toLowerCase().endsWith(it);
    });
  }

  function changeAvatar(src) {
    avatarPreview.src = src;
  }

  function removeEmptyImgWrap() {
    var emptyImgWrap = document.querySelector('.ad-form__photo--empty');
    if (emptyImgWrap) {
      emptyImgWrap.remove();
    }
  }

  function addImages(src) {
    var newImageWrap = document.createElement('div');
    var image = document.createElement('img');
    newImageWrap.classList.add('ad-form__photo');
    newImageWrap.classList.add('ad-form__photo--added');
    image.src = src;
    image.style.width = ImageParams.WIDTH;
    image.style.height = ImageParams.HEIGHT;
    image.style.borderRadius = ImageParams.BORDER_RADIUS;
    newImageWrap.appendChild(image);
    imagesContainer.appendChild(newImageWrap);
    removeEmptyImgWrap();
  }

  function loadFile(chooser, func) {
    var files = Array.from(chooser.files).filter(filtrationByCorrectType);
    if (files) {
      files.forEach(function (it) {
        var reader = new FileReader();
        reader.addEventListener('load', function (evt) {
          func(evt.target.result);
        });
        reader.readAsDataURL(it);
      });
    }
  }

  function onAvatarChange(evt) {
    loadFile(evt.target, changeAvatar);
  }

  function onPhotoChange(evt) {
    loadFile(evt.target, addImages);
  }

  function activate() {
    avatarChooser.addEventListener('change', onAvatarChange);
    imageChooser.addEventListener('change', onPhotoChange);
  }

  function deactivate() {
    avatarChooser.removeEventListener('change', onAvatarChange);
    imageChooser.removeEventListener('change', onPhotoChange);
  }

  window.image = {
    activate: activate,
    deactivate: deactivate
  };
})();

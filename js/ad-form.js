const mapForm = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');

const priceField = adForm.querySelector('[name="price"]');
const typeField = adForm.querySelector('[name="type"]');
const roomsField = adForm.querySelector('[name="rooms"]');
const capacityField = adForm.querySelector('[name="capacity"]');
const checkinTimeField = adForm.querySelector('[name="timein"]');
const checkoutTimeField = adForm.querySelector('[name="timeout"]');

const minPrices = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const accomodationTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const roomsOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

// Деактивация страницы
const disablePage = () => {
  adForm.classList.add('ad-form--disabled');
  const fieldsets = adForm.querySelectorAll('fieldset');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = true;
  });
  mapForm.classList.add('map__filters--disabled');
  for (const child of mapForm.children) {
    child.disabled = true;
  }
};

//Активация страницы
const activatePage = () => {
  adForm.classList.remove('ad-form--disabled');
  const fieldsets = adForm.querySelectorAll('fieldset');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = false;
  });

  mapForm.classList.remove('map__filters--disabled');
  for (const child of mapForm.children) {
    child.disabled = false;
  }
};

// Валидация Pristine
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help',
},
true
);

//Валидация минимльной цены в зависимости от типа жилья

function validatePrice () {
  return priceField.value >= minPrices[typeField.value];
}

function getMinPriceErrorMessage () {
  return `Минимальная цена для типа "${accomodationTypes[typeField.value]}" - ${minPrices[typeField.value]} рублей`;
}

function onPriceChange () {
  pristine.validate(priceField);
  pristine.validate(typeField);
}

function onTypeChange () {
  pristine.validate(priceField);
  pristine.validate(typeField);
}

pristine.addValidator(priceField, validatePrice, getMinPriceErrorMessage);

priceField.addEventListener('change', onPriceChange);
typeField.addEventListener('change', onTypeChange);

// Валидация количества комнат и гостей

function validateCapacity () {
  return roomsOption[roomsField.value].includes(capacityField.value);
}
function getCapacityErrorMessage () {
  return 'Вариант недоступен для выбранного количества комнат';
}
function getRoomsErrorMessage () {
  return 'Вариант недоступен для выбранного количества гостей';
}

function onCapacityChange () {
  pristine.validate(capacityField);
  pristine.validate(roomsField);
}

function onRoomsChange () {
  pristine.validate(capacityField);
  pristine.validate(roomsField);
}

pristine.addValidator(roomsField, validateCapacity, getRoomsErrorMessage);
pristine.addValidator(capacityField, validateCapacity, getCapacityErrorMessage);

roomsField.addEventListener('change', onRoomsChange);
capacityField.addEventListener('change', onCapacityChange);

// Синхронизация времени заезда и выезда

const onTimeInChange = () => {
  checkoutTimeField.value = checkinTimeField.value;
};
const onTimeOutChange = () => {
  checkinTimeField.value = checkoutTimeField.value;
};

checkinTimeField.addEventListener('change', onTimeInChange);
checkoutTimeField.addEventListener('change', onTimeOutChange);


adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

disablePage();
activatePage();

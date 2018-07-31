import h from 'hyperscript';

import './popup.css';

const renderPopup = () => {
  return h('div.popup.popup_hidden',
    h('div.popup__background',
      renderPopupBody()
    )
  );
};

const renderPopupBody = () => {
  return h('div.popup__body');
};

const showPopup = (element) => {
  const popupBody = document.querySelector('.popup__body');
  popupBody.classList.remove('hidden');
  popupBody.appendChild(element);
};

const hidePopup = () => {
  const popupBody = document.querySelector('.popup__body');
  popupBody.classList.add('hidden');
  popupBody.removeChild(popupBody.firstChild);
};

export default {
  renderPopup,
  showPopup,
  hidePopup
};

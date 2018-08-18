import h from 'hyperscript';

import renderSettingsWidget from 'components/settings-widget';

import './popup.css';

const renderPopup = () => {
  return h('div.popup.popup_hidden',
    h('div.popup__background',
      {
        onclick: (event) => {
          if (event.target.classList.contains('popup__background')) {
            hidePopup();
          }
        }
      },
      renderPopupBody()
    )
  );
};

const renderPopupBody = () => {
  return h('div.popup__body');
};

const showPopup = (element, widgetData) => {
  blurBackground();

  const popup = document.querySelector('.popup');
  const popupBody = document.querySelector('.popup__body');
  const settingsWidget = renderSettingsWidget(widgetData);

  popup.classList.remove('popup_hidden');
  popupBody.appendChild(settingsWidget);
  animateEnter(element, settingsWidget, popupBody);
};

const hidePopup = () => {
  unblurBackground();

  const popup = document.querySelector('.popup');
  const popupBody = document.querySelector('.popup__body');

  popup.classList.add('popup_hidden');
  popupBody.removeChild(popupBody.firstChild);
};

const blurBackground = () => {
  const layoutContainer = document.querySelector('.layout-container');
  layoutContainer.classList.add('layout-container_with-popup-open');
};

const unblurBackground = () => {
  const layoutContainer = document.querySelector('.layout-container');
  layoutContainer.classList.remove('layout-container_with-popup-open');
};

const animateEnter = (source, target, popupBody) => {
  const { left, top } = source.getBoundingClientRect();
  const { width, height } = target.getBoundingClientRect();
  const initialScale = 0.3;

  popupBody.animate({
    left: [`${left - (width * initialScale / 2)}px`, '50%'],
    top: [`${top - (height * initialScale)}px`, '50%'],
    transform: ['scale(0.3) translate(-50%, -50%)', 'scale(1) translate(-50%, -50%)'],
  }, {
    duration: 200,
    easing: 'ease-in'
  });
};


export default renderPopup;
export { showPopup, hidePopup };

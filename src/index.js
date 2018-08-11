import 'web-animations-js'; // polyfill for Web Animation API

import 'styles/global.css';
import 'styles/layout.css';
import 'styles/header.css';
import 'styles/main.css';
import 'styles/footer.css';

import renderMainArea from 'components/main-area';
import popupMethods from 'components/popup';

import { selectedDevices } from 'data/widgets';

document.addEventListener('DOMContentLoaded', () => {
  setupWidgets();
  initializePopup();
});

function setupWidgets() {
  const mainAreaContainer = document.querySelector('.main-area-container');
  const selectedScenariosContainer = document.querySelector('.selected-scenarios-container');
  const selectedDevicesContainer = document.querySelector('.selected-devices-container');

  mainAreaContainer.appendChild(renderMainArea());
}

function initializePopup() {
  document.body.appendChild(popupMethods.renderPopup());
}

import 'web-animations-js'; // polyfill for Web Animation API

import 'styles/global.css';
import 'styles/layout.css';
import 'styles/header.css';
import 'styles/main.css';
import 'styles/footer.css';
import 'styles/sidebar.css';

import renderMainArea from 'components/main-area';
import renderSelectedDevices from 'components/selected-devices';
import renderSelectedScenarios from 'components/selected-scenarios';
import renderPopup from 'components/popup';

import { openSidebar, closeSidebar } from 'components/sidebar';

document.addEventListener('DOMContentLoaded', () => {
  setupWidgets();
  initializePopup();
  addSidebarListeners();
});

function setupWidgets() {
  const mainAreaContainer = document.querySelector('.main-area-container');
  const selectedScenariosContainer = document.querySelector('.selected-scenarios-container');
  const selectedDevicesContainer = document.querySelector('.selected-devices-container');

  mainAreaContainer.appendChild(renderMainArea());
  selectedScenariosContainer.appendChild(renderSelectedScenarios());
  selectedDevicesContainer.appendChild(renderSelectedDevices());
}

function initializePopup() {
  document.body.appendChild(renderPopup());
}

function addSidebarListeners() {
  const headerMenuButton = document.querySelector('.header__mobile-menu-button');
  const sidebarCloseButton = document.querySelector('.sidebar__close');

  headerMenuButton.addEventListener('click', openSidebar);
  sidebarCloseButton.addEventListener('click', closeSidebar);
}

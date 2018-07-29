import 'styles/global.css';
import 'styles/layout.css';
import 'styles/header.css';
import 'styles/main.css';
import 'styles/footer.css';

import renderMainArea from 'components/main-area';

document.addEventListener('DOMContentLoaded', () => {
  setupWidgets();
})

function setupWidgets() {
  const mainAreaContainer = document.querySelector('.main-area-container');
  const selectedScenariosContainer = document.querySelector('.selected-scenarios-container');
  const selectedDevicesContainer = document.querySelector('.selected-devices-container');

  mainAreaContainer.appendChild(renderMainArea());
}

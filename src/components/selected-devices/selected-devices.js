import h from 'hyperscript';

import { selectedDevices } from 'data/widgets';

import renderDeviceWidget from 'components/device-widget';
import renderPill from 'components/pill';

import './selected-devices.css';

let filters = [
  {
    name: 'Все',
    isActive: true
  },
  {
    name: 'Кухня',
    filterField: 'location',
    filter: 'kitchen',
    isActive: false
  },
  {
    name: 'Зал',
    filterField: 'location',
    filter: 'hall',
    isActive: false
  },
  {
    name: 'Лампочки',
    filterField: 'type',
    filter: 'bulb',
    isActive: false
  },
  {
    name: 'Камеры ',
    filterField: 'type',
    filter: 'camera',
    isActive: false
  },
];

const renderSelectedDevices = () => {
  return h('.selected-devices',
    renderHeader(),
    renderWidgets(selectedDevices)
  );
};

const renderHeader = () => {
  return h('.selected-devices__header',
    renderTitle(),
    renderFilters()
  );
};

const renderTitle = () => {
  return h('.selected-devices__title',
    'Избранные устройства'
  );
};

const renderFilters = () => {
  return h('.selected-devices__filters',
    filters.map(filter => {
      return renderPill({
        content: filter.name,
        isActive: filter.isActive,
        onClick: () => setActiveFilter(filter)
      });
    })
  );
};

const renderSelector = () => {

};

const renderPager = () => {

};

const renderWidgets = (devices) => {
  return h('.selected-devices__widgets',
    devices.map(renderDeviceWidget)
  );
};

const setActiveFilter = activeFilter => {
  filters = filters.map(filter => Object.assign(
    {},
    filter,
    { isActive: filter.name === activeFilter.name })
  );
  updateFilters();
  updateWidgets(activeFilter);
};

const updateFilters = () => {
  const selectedDevicesHeader = document.querySelector('.selected-devices__header');
  const oldFiltersContainer = document.querySelector('.selected-devices__filters');
  const updatedFiltersContainer = renderFilters();

  selectedDevicesHeader.replaceChild(updatedFiltersContainer, oldFiltersContainer);
};

const updateWidgets = ({ filter, filterField }) => {
  let devices = selectedDevices;
  if (filter && filterField) {
    devices = devices.filter(device => device[filterField] === filter);
  }

  const selectedDevicesContainer = document.querySelector('.selected-devices');
  const oldWidgetsContainer = document.querySelector('.selected-devices__widgets');
  const updatedWidgetsContainer = renderWidgets(devices);

  selectedDevicesContainer.replaceChild(updatedWidgetsContainer, oldWidgetsContainer);
};

export default renderSelectedDevices;

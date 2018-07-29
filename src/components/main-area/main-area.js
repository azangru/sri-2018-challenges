import h from 'hyperscript';

import userData from 'data/user';
import miscellaneousData from 'data/miscellaneous';
import { mainAreaDevices } from 'data/widgets';

import renderDeviceWidget from 'components/device-widget';

import drizzleIconPath from 'assets/icons/cloud-drizzle.svg';

import './main-area.css';

const renderMainArea = () => {
  return h('div.main-area',
    renderSummary(),
    renderWidgets()
  );
};

const renderSummary = () => {
  return h('div.main-area__summary',
    renderSalutation(),
    renderStatus(),
    renderClimateSummary()
  );
};

const renderSalutation = () => {
  return h('div.main-area__salutation', `Привет, ${userData.name}!`);
};

const renderStatus = () => {
  return h('div.main-area__status', miscellaneousData.mainArea.summaryMessage);
};

const renderClimateSummary = () => {
  return h('div.main-area__climate-summary',
    renderIndoorsClimate(),
    renderOutdoorsClimate()
  );
};

const renderIndoorsClimate = () => {
  return h('div.main-area__indoors-climate',
    h('div.main-area__indoors-climate-label', 'Дома'),
    h('div.main-area__indoors-climate-temperature', miscellaneousData.homeClimate.temperature)
  );
};

const renderOutdoorsClimate = () => {
  return h('div.main-area__indoors-climate',
    h('div.main-area__outdoors-climate-label', 'За окном'),
    h('div.main-area__outdoors-climate-data',
      h('div.main-area__outdoors-climate-temperature', miscellaneousData.weather.temperature),
      h('div.main-area__outdoors-climate-weather-icon', renderWeatherIcon(miscellaneousData.weather.icon)),
    )
  );
};

const renderWeatherIcon = (weather) => {
  if (weather === 'rain') {
    return h('img', { src: drizzleIconPath, alt: 'drizzle' });
  }
};

const renderWidgets = () => {
  return h('div.main-area__widgets',
    renderDeviceWidget(mainAreaDevices[0])
  );
};

export default renderMainArea;

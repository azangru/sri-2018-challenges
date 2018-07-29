import h from 'hyperscript';
import Scroll from 'scroll-js';

import userData from 'data/user';
import miscellaneousData from 'data/miscellaneous';
import { mainAreaDevices } from 'data/widgets';

import renderDeviceWidget from 'components/device-widget';

import drizzleIconPath from 'assets/icons/cloud-drizzle.svg';

import './main-area.css';

const NUMBER_OF_WIDGETS_THAT_FIT_VERTICALLY = 2;
const WIDGET_HEIGHT = 120;
const WIDGET_MARGIN = 15;

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
    h('div.main-area__widgets-inner-wrapper',
      mainAreaDevices.map(renderDeviceWidget)
    ),
    renderScrollUpControl(),
    renderScrollDownControl()
  );
};

const renderScrollUpControl = () => {
  if (mainAreaDevices.length > NUMBER_OF_WIDGETS_THAT_FIT_VERTICALLY) {
    return h('div.main-area__widgets-scroll-up.main-area__widgets-scroll-up_hidden',
      { onclick: () => scrollWidgetsUp() }
    );
  }
};

const renderScrollDownControl = () => {
  if (mainAreaDevices.length > NUMBER_OF_WIDGETS_THAT_FIT_VERTICALLY) {
    return h('div.main-area__widgets-scroll-down',
      { onclick: () => scrollWidgetsDown() }
    );
  }
};

const scrollWidgetsUp = () => {
  const widgetsInnerWrapper = document.querySelector('.main-area__widgets-inner-wrapper');
  const initialScrollY = widgetsInnerWrapper.scrollTop;
  const scrollDistance = WIDGET_HEIGHT + WIDGET_MARGIN;
  const targetScrollY = initialScrollY - scrollDistance;

  const scroll = new Scroll(widgetsInnerWrapper);
  scroll.to(0, targetScrollY).then(() => checkScrollControlsDisplay());
};

const scrollWidgetsDown = () => {
  const widgetsInnerWrapper = document.querySelector('.main-area__widgets-inner-wrapper');
  const initialScrollY = widgetsInnerWrapper.scrollTop;
  const scrollDistance = WIDGET_HEIGHT + WIDGET_MARGIN;
  const targetScrollY = initialScrollY + scrollDistance;

  const scroll = new Scroll(widgetsInnerWrapper);
  scroll.to(0, targetScrollY).then(() => checkScrollControlsDisplay());
};

const checkScrollControlsDisplay = () => {
  const scrollUpControl = document.querySelector('.main-area__widgets-scroll-up');
  const scrollDownControl = document.querySelector('.main-area__widgets-scroll-down');

  if (shouldShowScrollUpControl()) {
    scrollUpControl.classList.remove('main-area__widgets-scroll-up_hidden');
  } else {
    scrollUpControl.classList.add('main-area__widgets-scroll-up_hidden');
  }

  if (shouldShowScrollDownControl()) {
    scrollDownControl.classList.remove('main-area__widgets-scroll-down_hidden');
  } else {
    scrollDownControl.classList.add('main-area__widgets-scroll-down_hidden');
  }
};

const shouldShowScrollUpControl = () => {
  const widgetsInnerWrapper = document.querySelector('.main-area__widgets-inner-wrapper');
  return widgetsInnerWrapper.scrollTop > 0;
};

const shouldShowScrollDownControl = () => {
  const widgetsInnerWrapper = document.querySelector('.main-area__widgets-inner-wrapper');
  return widgetsInnerWrapper.scrollTop + widgetsInnerWrapper.offsetHeight < widgetsInnerWrapper.scrollHeight;
};

export default renderMainArea;

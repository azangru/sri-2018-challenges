import h from 'hyperscript';

import './slider.css';

export const renderBrightnessSlider = (widgetData) => {
  return h('div.slider.slider_brightness',
    h('input', { type: 'range', min: 0, max: 100, value: 80 })
  );
};

export const renderTemperatureSlider = (widgetData) => {
  return h('div.slider.slider_temperature',
    h('input', { type: 'range', min: 0, max: 100, value: 80 })
  );
};

export default {
  renderBrightnessSlider,
  renderTemperatureSlider
};

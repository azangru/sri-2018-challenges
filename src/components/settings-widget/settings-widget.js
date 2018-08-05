import h from 'hyperscript';

import './settings-widget.css';

import renderKnob from 'components/knob';
import slider from 'components/slider';

/**
  expect widgetType to be one of three types:
  - 'temparature-knob'
  - 'light-slider'
  - 'temperature-slider'
*/

const renderSettingsWidget = (widgetData) => {
  const { widgetType } = widgetData;
  if (widgetType === 'temparature-knob') {
    return renderTemperatureKnobWidget(widgetData);
  } else if (widgetType === 'light-slider') {
    return renderLightSliderWidget(widgetData);
  } else if (widgetType === 'temperature-slider') {
    return renderTemperatureSliderWidget(widgetData);
  }
  // FIXME
  return renderTemperatureKnobWidget(widgetData);
  // return renderTemperatureKnobWidget(widgetData);
};

const renderTemperatureKnobWidget = (widgetData) => {
  const pathToIcon = require(`assets/icons/thermometer-${widgetData.isOn ? 'on' : 'off'}.svg`);

  return h('div.settings-widget',
    h('div.settings-widget__body',
      h('div.settings-widget__header',
        h('div.settings-widget__title', widgetData.name),
        h('div.settings-widget__message', widgetData.message),
        h('div.settings-widget__value', widgetData.value),
        h('div.settings-widget__icon',
          h('img', { src: pathToIcon })
        ),
      ),
      h('div.settings-widget__knob', renderKnob(widgetData))
    )
  );
};

const renderLightSliderWidget = (widgetData) => {
  const pathToIcon = require(`assets/icons/sun-${widgetData.isOn ? 'on' : 'off'}.svg`);


  return h('div.settings-widget',
    h('div.settings-widget__body',
      h('div.settings-widget__header',
        h('div.settings-widget__title', widgetData.name),
        h('div.settings-widget__message', widgetData.message),
        h('div.settings-widget__icon',
          h('img', { src: pathToIcon })
        ),
      ),
      h('div.settings-widget__slider', slider.renderBrightnessSlider(widgetData))
    )
  );
};

const renderTemperatureSliderWidget = (widgetData) => {
  const pathToIcon = require(`assets/icons/thermometer-${widgetData.isOn ? 'on' : 'off'}.svg`);

  return h('div.settings-widget',
    h('div.settings-widget__body',
      h('div.settings-widget__header',
        h('div.settings-widget__title', widgetData.name),
        h('div.settings-widget__message', widgetData.message),
        h('div.settings-widget__icon',
          h('img', { src: pathToIcon })
        ),
      ),
      h('div.settings-widget__slider', slider.renderTemperatureSlider(widgetData))
    )
  );
};

export default renderSettingsWidget;

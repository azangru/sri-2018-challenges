import h from 'hyperscript';

import './settings-widget.css';

import renderKnob from 'components/knob';
import slider from 'components/slider';
import { hidePopup } from 'components/popup';
import renderPill from 'components/pill';

/**
  expect widgetType to be one of three types:
  - 'temparature-knob'
  - 'light-slider'
  - 'temperature-slider'
*/
const temperaturePresets = [
  {
    name: 'Вручную',
    isActive: true,
    onClick: () => updateWidgetPresets(temperaturePresets, 'Вручную')
  },
  {
    name: 'Холодно',
    isActive: false,
    onClick: () => updateWidgetPresets(temperaturePresets, 'Холодно')
  },
  {
    name: 'Тепло',
    isActive: false,
    onClick: () => updateWidgetPresets(temperaturePresets, 'Тепло')
  },
  {
    name: 'Жарко',
    isActive: false,
    onClick: () => updateWidgetPresets(temperaturePresets, 'Жарко')
  }
];

const lightPresets = [
  {
    name: 'Вручную',
    isActive: true,
    onClick: () => updateWidgetPresets(lightPresets, 'Вручную')
  },
  {
    name: 'Дневной свет',
    isActive: false,
    onClick: () => updateWidgetPresets(lightPresets, 'Дневной свет')
  },
  {
    name: 'Вечерний свет',
    isActive: false,
    onClick: () => updateWidgetPresets(lightPresets, 'Вечерний свет')
  },
  {
    name: 'Рассвет',
    isActive: false,
    onClick: () => updateWidgetPresets(lightPresets, 'Рассвет')
  }
];

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
};

const renderTemperatureKnobWidget = (widgetData) => {
  const pathToIcon = require(`assets/icons/thermometer-${widgetData.isOn ? 'on' : 'off'}.svg`);
  const clonedWidgetData = Object.assign({}, widgetData);

  return h('.settings-widget',
    h('.settings-widget__body',
      h('.settings-widget__header',
        h('.settings-widget__title', widgetData.name),
        h('.settings-widget__message', widgetData.message),
        h('.settings-widget__value', widgetData.value),
        h('.settings-widget__icon',
          h('img', { src: pathToIcon })
        ),
      ),
      h('.settings-widget__knob', renderKnob(clonedWidgetData))
    ),
    renderWidgetControls(clonedWidgetData, widgetData)
  );
};

const renderLightSliderWidget = (widgetData) => {
  const pathToIcon = require(`assets/icons/sun-${widgetData.isOn ? 'on' : 'off'}.svg`);
  const clonedWidgetData = Object.assign({}, widgetData);

  return h('.settings-widget',
    h('.settings-widget__body',
      h('.settings-widget__header',
        h('.settings-widget__title', widgetData.name),
        h('.settings-widget__message', widgetData.message),
        h('.settings-widget__icon',
          h('img', { src: pathToIcon })
        ),
      ),
      renderLightWidgetPresets(),
      h('.settings-widget__slider', slider.renderBrightnessSlider(widgetData))
    ),
    renderWidgetControls(clonedWidgetData, widgetData)
  );
};

const renderTemperatureSliderWidget = (widgetData) => {
  const pathToIcon = require(`assets/icons/thermometer-${widgetData.isOn ? 'on' : 'off'}.svg`);
  const clonedWidgetData = Object.assign({}, widgetData);

  return h('.settings-widget',
    h('.settings-widget__body',
      h('.settings-widget__header',
        h('.settings-widget__title', widgetData.name),
        h('.settings-widget__message', widgetData.message),
        h('.settings-widget__icon',
          h('img', { src: pathToIcon })
        ),
      ),
      renderTemperatureWidgetPresets(),
      h('.settings-widget__slider', slider.renderTemperatureSlider(widgetData))
    ),
    renderWidgetControls(clonedWidgetData, widgetData)
  );
};

const renderWidgetControls = (tempWidgetData, originalWidgetData) => {
  return h('.settings-widget__controls',
    h('.settings-widget__apply-button',
      { onclick: () => applyNewSettings(tempWidgetData, originalWidgetData) },
      'Применить'
    ),
    h('.settings-widget__cancel-button',
      { onclick: hidePopup },
      'Закрыть'
    )
  );
};

const applyNewSettings = (tempWidgetData, originalWidgetData) => {
  Object.assign(originalWidgetData, tempWidgetData); // mutating operation
};

const renderTemperatureWidgetPresets = () => {
  return renderWidgetPresets(temperaturePresets);
};

const renderLightWidgetPresets = () => {
  return renderWidgetPresets(lightPresets);
};

const updateWidgetPresets = (presets, activePresetName) => {
  presets = presets.map(preset => {
    if (preset.name === activePresetName) {
      return Object.assign({}, preset, { isActive: true });
    } else {
      return Object.assign({}, preset, { isActive: false });
    }
  });
  if (activePresetName === 'Вручную') {
    document.querySelector('.settings-widget__slider').classList.remove('settings-widget__slider_hidden');
  } else {
    document.querySelector('.settings-widget__slider').classList.add('settings-widget__slider_hidden');
  }
  const widgetBody = document.querySelector('.settings-widget__body');
  const oldPresets = document.querySelector('.settings-widget__presets-wrapper');
  const newPresets = renderWidgetPresets(presets);
  widgetBody.replaceChild(newPresets, oldPresets);
};

const renderWidgetPresets = (presets) => {
  return h('.settings-widget__presets-wrapper',
    h('.settings-widget__presets',
      presets.map(preset => {
        return renderPill({
          content: preset.name,
          isActive: preset.isActive,
          onClick: preset.onClick
        });
      })
    )
  );
};

export default renderSettingsWidget;

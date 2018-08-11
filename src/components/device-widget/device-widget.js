import h from 'hyperscript';

import popupMethods from 'components/popup';

import './device-widget.css';

const renderDeviceWidget = (params) => {
  const { name, message, icon, isOn } = params;

  return h('div.device-widget',
    {
      onclick: (event) => onWidgetClick(event, params)
    },
    renderIcon(icon, isOn),
    renderContent(name, message)
  );
};

const renderIcon = (icon, isOn) => {
  const iconPath = require(`assets/icons/${icon}-${isOn ? "on" : "off"}.svg`);
  return h('div.device-widget__icon',
      h('img', { src: iconPath })
  );
};

const renderContent = (name, message) => {
  return h('div.device-widget__content',
    h('div.device-widget__name', name),
    h('div.device-widget__message', message),
  );
};


const onWidgetClick = (event, params) => {
  const widgetElement = event.currentTarget;
  console.log('widgetElement', widgetElement);
  popupMethods.showPopup(widgetElement, params);
};

export default renderDeviceWidget;

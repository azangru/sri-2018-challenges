import h from 'hyperscript';

import './device-widget.css';

const renderDeviceWidget = (params) => {
  const { name, message, icon, isOn } = params;

  return h('div.device-widget',
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


export default renderDeviceWidget;

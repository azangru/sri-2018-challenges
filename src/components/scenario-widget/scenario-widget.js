import h from 'hyperscript';

import './scenario-widget.css';

const renderScenarioWidget = (widgetData) => {
  const pathToIcon = require(`assets/icons/${widgetData.icon}.svg`);

  return h('.scenario-widget',
    h('img', {
      className: 'scenario-widget__icon',
      src: pathToIcon
    }),
    h('.scenario-widget__name',
      widgetData.name,
      widgetData.message && h('.scenario-widget__message', widgetData.message)
    )
  );
};


export default renderScenarioWidget;

import h from 'hyperscript';

import { selectedScenarios } from 'data/widgets';

import renderScenarioWidget from 'components/scenario-widget';

import './selected-scenarios.css';

const renderSelectedScenarios = () => {
  return h('.selected-scenarios',
    renderHeader(),
    renderWidgets(selectedScenarios)
  );
};

const renderHeader = () => {
  return h('.selected-scenarios__header',
    h('.selected-scenarios__title',
      'Избранные сценарии'
    ),
    renderPager()
  );
};

const renderPager = () => {
  const arrowPath = require('assets/icons/arrow-pager.svg');

  return h('.selected-scenarios__pager',
    h('img', {
      className: 'selected-scenarios__pager-arrow-left',
      src: arrowPath
    }),
    h('img', {
      className: 'selected-scenarios__pager-arrow-right',
      src: arrowPath
    })
  );
};

const renderWidgets = (scenarios) => {
  return h('.selected-scenarios__widgets',
    scenarios.map(renderScenarioWidget)
  );
};

export default renderSelectedScenarios;

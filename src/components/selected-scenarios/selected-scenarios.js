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

};

const renderWidgets = (scenarios) => {
  return h('.selected-scenarios__widgets',
    scenarios.map(renderScenarioWidget)
  );
};

export default renderSelectedScenarios;

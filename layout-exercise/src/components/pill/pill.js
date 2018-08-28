import h from 'hyperscript';
import classNames from 'classnames';

import './pill.css';

const noop = () => {};

const renderPill = (params) => {
  const {
    content,
    isActive,
    onClick = noop
  } = params;
  const classes = classNames(
    'pill',
    { 'pill_active': isActive }
  );

  return h('div', { className: classes, onclick: onClick }, content);
};


export default renderPill;
